import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Redemption from "@/models/Redemption";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Aggregate historical redemptions (completed payouts) grouped by brand
    const brandPerformance = await Redemption.aggregate([
      { $match: { status: "completed" } },
      { 
        $group: {
          _id: "$rewardType",
          totalPayoutAmount: { $sum: "$usdAmount" },
          totalPointsBurned: { $sum: "$pointsCost" },
          redemptionCount: { $sum: 1 }
        }
      },
      { $sort: { totalPayoutAmount: -1 as const } }
    ]);

    // Format the response
    const formattedData = brandPerformance.map(stat => ({
      brand: stat._id,
      totalPayoutAmount: stat.totalPayoutAmount,
      totalPointsBurned: stat.totalPointsBurned,
      redemptionCount: stat.redemptionCount
    }));

    return NextResponse.json({
      success: true,
      data: {
        brandPerformance: formattedData
      }
    });
  } catch (error: any) {
    console.error("Error generating report data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate report data" },
      { status: 500 }
    );
  }
}
