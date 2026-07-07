import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import AdminAuditLog from "@/models/Adminlogs";
import mongoose from "mongoose";
import { getAuthenticatedAdmin } from "@/lib/authHelper";

export async function POST(req: NextRequest) {
  let session;
  try {
    await dbConnect();

    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, amount, rationale } = body;
    const adminId = admin._id;

    // Validation of inputs will be done against either clerkId or ObjectId
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ success: false, error: "Invalid User ID" }, { status: 400 });
    }

    if (typeof amount !== "number" || amount === 0) {
      return NextResponse.json({ success: false, error: "Amount must be a non-zero number" }, { status: 400 });
    }

    if (!rationale) {
      return NextResponse.json({ success: false, error: "Rationale is required" }, { status: 400 });
    }

    // Start a Mongoose session for the transaction
    session = await mongoose.startSession();
    session.startTransaction();

    let user = null;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await User.findById(userId).session(session);
    } else {
      user = await User.findOne({ clerkId: userId }).session(session);
    }

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // 1. Update User Balance
    user.currentPoints += amount;
    if (amount > 0) {
      user.lifetimeEarnings += amount;
    }
    
    // Ensure balance doesn't go below 0 (optional)
    if (user.currentPoints < 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "User balance cannot go below zero" }, { status: 400 });
    }
    
    await user.save({ session });

    // 2. Create Transaction Ledger
    const transactionRecord = new Transaction({
      user: user._id,
      type: amount > 0 ? "credit" : "debit",
      amount: Math.abs(amount),
      category: "admin_adjustment",
      status: "completed",
      metadata: { rationale }
    });
    await transactionRecord.save({ session });

    // 3. Create Audit Log
    const auditLog = new AdminAuditLog({
      adminId: adminId || new mongoose.Types.ObjectId(), 
      action: "MANUAL_POINTS_ADJUSTMENT",
      targetEntityId: user._id,
      targetEntityType: "User",
      details: {
        amount,
        rationale,
        previousBalance: user.currentPoints - amount,
        newBalance: user.currentPoints
      }
    });
    await auditLog.save({ session });

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      success: true,
      message: "Points adjusted successfully",
      data: {
        newBalance: user.currentPoints,
        transactionId: transactionRecord._id
      }
    });
  } catch (error: any) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error("Error adjusting points:", error);
    
    if (error.message && error.message.includes("Transaction")) {
       return NextResponse.json(
        { success: false, error: "Database transaction failed. Ensure MongoDB is running as a replica set." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to adjust points" },
      { status: 500 }
    );
  }
}
