import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const timeWindow = searchParams.get("timeWindow") || "monthly"; // daily, weekly, monthly
    const limit = parseInt(searchParams.get("limit") || "12"); // default 12 periods

    let groupBy: any = {};
    if (timeWindow === "daily") {
      groupBy = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      };
    } else if (timeWindow === "weekly") {
      groupBy = {
        year: { $isoWeekYear: "$createdAt" },
        week: { $isoWeek: "$createdAt" }
      };
    } else { // monthly
      groupBy = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      };
    }

    const aggregationPipeline = [
      {
        $match: {
          status: "completed"
        }
      },
      {
        $group: {
          _id: groupBy,
          pointsIssued: {
            $sum: {
              $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0]
            }
          },
          pointsRedeemed: {
            $sum: {
              $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $addFields: {
          netProfit: { $subtract: ["$pointsIssued", "$pointsRedeemed"] }
        }
      },
      {
        $sort: {
          "_id.year": -1 as const,
          "_id.month": -1 as const,
          "_id.week": -1 as const,
          "_id.day": -1 as const
        }
      },
      {
        $limit: limit
      }
    ];

    const results = await Transaction.aggregate(aggregationPipeline);

    // Calculate totals over the entire dataset
    const totalsPipeline = [
      {
        $match: {
          status: "completed"
        }
      },
      {
        $group: {
          _id: null,
          totalPointsIssued: {
            $sum: {
              $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0]
            }
          },
          totalPointsRedeemed: {
            $sum: {
              $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0]
            }
          }
        }
      }
    ];

    const totalsResult = await Transaction.aggregate(totalsPipeline);
    const totals = totalsResult.length > 0 ? totalsResult[0] : { totalPointsIssued: 0, totalPointsRedeemed: 0 };
    totals.totalNetProfit = totals.totalPointsIssued - totals.totalPointsRedeemed;
    delete totals._id;

    // Formatting results to be more chart-friendly (ascending order and flattened dates)
    const formattedData = results.reverse().map(item => {
      let label = "";
      if (timeWindow === "daily") {
        label = `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`;
      } else if (timeWindow === "weekly") {
        label = `${item._id.year}-W${String(item._id.week).padStart(2, '0')}`;
      } else {
        label = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;
      }

      return {
        label,
        pointsIssued: item.pointsIssued,
        pointsRedeemed: item.pointsRedeemed,
        netProfit: item.netProfit
      };
    });


    return NextResponse.json({
      success: true,
      timeWindow,
      totals,
      data: formattedData
    });
  } catch (error: any) {
    console.error("Error fetching financial analytics:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch financial data" },
      { status: 500 }
    );
  }
}
