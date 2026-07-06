import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Notification from "@/models/Notification";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Authenticate user
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { surveyId } = body;

    if (!surveyId) {
      return NextResponse.json({ success: false, error: "surveyId is required" }, { status: 400 });
    }

    // 3. Find survey in DB
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return NextResponse.json({ success: false, error: "Survey not found" }, { status: 404 });
    }

    // 4. Update User's balance atomically
    const rewardPoints = survey.rewardPoints;
    const usdEquivalent = rewardPoints / 1000;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $inc: {
          currentPoints: rewardPoints,
          lifetimeEarnings: usdEquivalent,
          surveysCompleted: 1,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User update failed" }, { status: 500 });
    }

    // Check and process referral bonus if this is the referred user's first completed survey
    if (updatedUser.surveysCompleted === 1 && updatedUser.referredBy) {
      try {
        const referrer = await User.findById(updatedUser.referredBy);
        if (referrer) {
          referrer.currentPoints = (referrer.currentPoints || 0) + 500;
          referrer.lifetimeEarnings = (referrer.lifetimeEarnings || 0) + 0.50;
          referrer.referralEarnings = (referrer.referralEarnings || 0) + 500;
          await referrer.save();

          // Create transaction for referrer
          await Transaction.create({
            user: referrer._id,
            type: "credit",
            amount: 500,
            category: "referral",
            status: "completed",
            referenceId: updatedUser._id,
            description: `Referral bonus for inviting ${updatedUser.fullName || "Friend"}`,
          });

          // Create notification for referrer
          await Notification.create({
            user: referrer._id,
            type: "points_credited",
            title: "Referral Bonus Credited!",
            message: `You earned 500 Evo Points ($0.50) because your referred friend ${updatedUser.fullName || "Friend"} completed their first survey!`,
            isRead: false,
          });
        }
      } catch (err) {
        console.error("Error processing referral credit:", err);
        // Do not crash the entire endpoint if referral processing fails
      }
    }

    // 5. Create Transaction record (credit)
    const transaction = await Transaction.create({
      user: user._id,
      type: "credit",
      amount: rewardPoints,
      category: "survey",
      status: "completed",
      referenceId: survey._id,
      description: `Completed Survey: ${survey.title}`,
    });

    // 6. Create Notification record
    await Notification.create({
      user: user._id,
      type: "points_credited",
      title: "Points Credited!",
      message: `You earned ${rewardPoints} Evo Points ($${usdEquivalent.toFixed(2)}) for completing "${survey.title}".`,
      isRead: false,
    });

    return NextResponse.json({
      success: true,
      message: "Survey completed and points credited successfully.",
      data: {
        pointsCredited: rewardPoints,
        newPointsBalance: updatedUser.currentPoints,
        newUsdBalance: updatedUser.currentPoints / 1000,
        surveysCompleted: updatedUser.surveysCompleted,
        transaction,
      },
    });
  } catch (error: any) {
    console.error("Survey completion API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process survey completion" },
      { status: 500 }
    );
  }
}
