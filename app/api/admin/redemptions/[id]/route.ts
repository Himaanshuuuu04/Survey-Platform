import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Redemption from "@/models/Redemption";
import User from "@/models/User";
import GiftCard from "@/models/Gift-Card";
import Transaction from "@/models/Transaction";
import AdminAuditLog from "@/models/Adminlogs";
import Notification from "@/models/Notification";
import mongoose from "mongoose";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let session;
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Redemption ID" }, { status: 400 });
    }

    const body = await req.json();
    const { action, adminId, reason } = body;

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
      // Step 2: Inventory Matching
      const availableGiftCard = await GiftCard.findOneAndUpdate(
        { brand: redemption.rewardType, usdAmount: redemption.usdAmount, status: "available" },
        { $set: { status: "assigned", assignedTo: user._id } },
        { session, new: true }
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
      user.pointsBalance += redemption.pointsCost;
      await user.save({ session });
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
        rewardType: redemption.rewardType,
        usdAmount: redemption.usdAmount,
        reason: reason || "Processed by admin"
      }
    });
    await auditLog.save({ session });

    // User Notification
    const notificationContent = action === "approve" 
      ? `Your redemption for $${redemption.usdAmount} ${redemption.rewardType} has been approved! Code: ${giftCardCodeData?.code} ${giftCardCodeData?.pin ? 'PIN: '+giftCardCodeData.pin : ''}`
      : `Your redemption request was rejected. Reason: ${reason || 'Violation of terms.'}. Points have been refunded.`;

    const notification = new Notification({
      user: user._id,
      type: "system",
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
