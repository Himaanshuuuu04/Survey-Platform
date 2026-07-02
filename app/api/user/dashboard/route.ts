import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import GiftCard from "@/models/Gift-Card";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch user dashboard stats
    const stats = {
      fullName: user.fullName,
      email: user.email,
      currentPoints: user.currentPoints,
      usdBalance: user.currentPoints / 1000,
      lifetimeEarnings: user.lifetimeEarnings || 0,
      pendingPoints: user.pendingPoints || 0,
      surveysCompleted: user.surveysCompleted || 0,
      referralCode: user.referralCode,
      referralEarnings: user.referralEarnings || 0,
      status: user.status,
    };

    // 2. Fetch available gift cards count by brand
    const availableGiftCards = await GiftCard.aggregate([
      { $match: { status: "available" } },
      { $group: { _id: "$brand", count: { $sum: 1 } } }
    ]);

    const giftCardsSummary = availableGiftCards.map(item => ({
      brand: item._id,
      count: item.count,
    }));

    // 3. Fetch recent activity (latest 5 transactions)
    const recentActivity = await Transaction.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        giftCardsInventory: giftCardsSummary,
        recentActivity,
      },
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
