import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Redemption from "@/models/Redemption";
import User from "@/models/User";
import GiftCard from "@/models/Gift-Card";
import Transaction from "@/models/Transaction";
import AdminAuditLog from "@/models/Adminlogs";
import Notification from "@/models/Notification";
import mongoose from "mongoose";
import { getAuthenticatedAdmin } from "@/lib/authHelper";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let session;
  try {
    await dbConnect();

    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Redemption ID" }, { status: 400 });
    }

    const body = await req.json();
    const { action, reason, giftCardId } = body;
    const adminId = admin._id;

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: "Invalid action. Must be 'approve' or 'reject'" }, { status: 400 });
    }

    session = await mongoose.startSession();
    session.startTransaction();

    // 1. Fetch Redemption and User
    const redemption = await Redemption.findById(id).session(session);
    if (!redemption) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "Redemption not found" }, { status: 404 });
    }

    if (redemption.status !== "pending") {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: `Redemption is already ${redemption.status}` }, { status: 400 });
    }

    const user = await User.findById(redemption.user).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, error: "Associated user not found" }, { status: 404 });
    }

    // Step 1: Fraud & Security Verification
    if (user.status === "suspended" || user.status === "banned") {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ 
        success: false, 
        error: `Cannot process redemption. User is currently ${user.status}.` 
      }, { status: 403 });
    }

    let giftCardCodeData = null;

    if (action === "approve") {
      if (!giftCardId) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ success: false, error: "giftCardId is required to approve redemption." }, { status: 400 });
      }

      // Step 2: Inventory Matching (Manual Selection)
      const availableGiftCard = await GiftCard.findOneAndUpdate(
        { _id: giftCardId, status: "available" },
        { $set: { status: "used", assignedTo: user._id, redemptionId: redemption._id, redeemedAt: new Date() } },
        { session, returnDocument: 'after' }
      );

      if (!availableGiftCard) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ 
          success: false, 
          error: "Inventory Depleted. No available gift cards match this request." 
        }, { status: 400 });
      }

      // Step 3 (Approve): Database State Transaction Entry
      redemption.status = "completed";
      redemption.deliveredGiftCard = availableGiftCard._id;
      await redemption.save({ session });

      await Transaction.findOneAndUpdate(
        { user: user._id, referenceId: redemption._id, type: "debit" },
        { $set: { status: "completed" } },
        { session }
      );
      
      giftCardCodeData = availableGiftCard;

    } else if (action === "reject") {
      // Step 3 (Reject): Database State Transaction Entry
      redemption.status = "rejected";
      await redemption.save({ session });

      await Transaction.findOneAndUpdate(
        { user: user._id, referenceId: redemption._id, type: "debit" },
        { $set: { status: "rejected" } },
        { session }
      );

      // Restore Points
      user.currentPoints += redemption.pointsDeducted;
      await user.save({ session });

      // Create Refund Transaction (credit)
      const refundTx = new Transaction({
        user: user._id,
        type: "credit",
        amount: redemption.pointsDeducted,
        category: "redemption",
        status: "completed",
        referenceId: redemption._id,
        description: `Refund: Rejected ${redemption.usdAmount} USD ${redemption.requestedBrand} Gift Card`,
      });
      await refundTx.save({ session });
    }

    // Step 4: Notification & Audit Triggering
    
    // Audit Log
    const auditLog = new AdminAuditLog({
      adminId: adminId || new mongoose.Types.ObjectId(),
      action: action === "approve" ? "REDEMPTION_APPROVED" : "REDEMPTION_REJECTED",
      targetEntityId: redemption._id,
      targetEntityType: "Redemption",
      details: {
        userId: user._id,
        requestedBrand: redemption.requestedBrand,
        usdAmount: redemption.usdAmount,
        reason: reason || "Processed by admin"
      }
    });
    await auditLog.save({ session });

    // User Notification
    const notificationContent = action === "approve" 
      ? `Your redemption for $${redemption.usdAmount} ${redemption.requestedBrand} has been approved! Code: ${giftCardCodeData?.code} ${giftCardCodeData?.pin ? 'PIN: '+giftCardCodeData.pin : ''}`
      : `Your redemption request was rejected. Reason: ${reason || 'Violation of terms.'}. Points have been refunded.`;

    const notification = new Notification({
      user: user._id,
      type: "redemption_update",
      title: action === "approve" ? "Redemption Approved!" : "Redemption Rejected",
      message: notificationContent,
      isRead: false
    });
    await notification.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      success: true,
      message: `Redemption successfully ${action}ed.`,
      data: {
        redemptionId: redemption._id,
        status: redemption.status
      }
    });

  } catch (error: any) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error("Error processing redemption:", error);
    
    if (error.message && error.message.includes("Transaction")) {
       return NextResponse.json(
        { success: false, error: "Database transaction failed. Ensure MongoDB is running as a replica set." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to process redemption" },
      { status: 500 }
    );
  }
}
