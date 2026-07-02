import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Survey from "@/models/Survey";
import Game from "@/models/Game";
import Redemption from "@/models/Redemption";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Run count queries in parallel for performance
    const [
      totalUsers,
      activeUsers,
      activeSurveys,
      activeGames,
      pendingRedemptions
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      Survey.countDocuments({ status: "active" }),
      Game.countDocuments({ status: "active" }),
      Redemption.countDocuments({ status: "pending" })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        activeSurveys,
        activeGames,
        pendingRedemptions
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
