import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Survey from "@/models/Survey";
import Game from "@/models/Game";
import Redemption from "@/models/Redemption";
import GiftCard from "@/models/Gift-Card";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Run count and aggregation queries in parallel for performance
    const [
      totalUsers,
      activeUsers,
      activeSurveys,
      activeGames,
      pendingRedemptions,
      availableGiftCards,
      userEconomyStats,
      redemptionStats
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      Survey.countDocuments({ status: "active" }),
      Game.countDocuments({ status: "active" }),
      Redemption.countDocuments({ status: "pending" }),
      GiftCard.countDocuments({ status: "available" }),
      User.aggregate([
        {
          $group: {
            _id: null,
            outstandingPoints: { $sum: "$currentPoints" },
            lifetimePoints: { $sum: "$lifetimeEarnings" }
          }
        }
      ]),
      Redemption.aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: null,
            totalRedeemedUSD: { $sum: "$usdAmount" }
          }
        }
      ])
    ]);

    const outstandingPoints = userEconomyStats[0]?.outstandingPoints || 0;
    const lifetimePoints = userEconomyStats[0]?.lifetimePoints || 0;
    const totalRedeemedUSD = redemptionStats[0]?.totalRedeemedUSD || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        activeSurveys,
        activeGames,
        pendingRedemptions,
        availableGiftCards,
        outstandingPoints,
        lifetimePoints,
        totalRedeemedUSD
      }
    });
  } catch (error: any) {
    console.error("Error fetching dashboard metrics:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
