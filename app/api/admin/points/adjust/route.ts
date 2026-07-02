import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import AdminAuditLog from "@/models/Adminlogs";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  let session;
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, amount, rationale, adminId } = body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
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

    const user = await User.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // 1. Update User Balance
    user.pointsBalance += amount;
    if (amount > 0) {
      user.lifetimePoints += amount;
    }
    
    // Ensure balance doesn't go below 0 (optional)
    if (user.pointsBalance < 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "User balance cannot go below zero" }, { status: 400 });
    }
    
    await user.save({ session });

    // 2. Create Transaction Ledger
    const transactionRecord = new Transaction({
      user: userId,
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
      targetEntityId: userId,
      targetEntityType: "User",
      details: {
        amount,
        rationale,
        previousBalance: user.pointsBalance - amount,
        newBalance: user.pointsBalance
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
        newBalance: user.pointsBalance,
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
