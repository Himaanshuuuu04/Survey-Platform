import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30"); // Default to last 30 days

    // Calculate the date `days` ago from now
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const aggregationPipeline = [
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1 as const,
          "_id.month": 1 as const,
          "_id.day": 1 as const
        }
      }
    ];

    const results = await User.aggregate(aggregationPipeline);

    // Format for charting libraries (e.g., Recharts or Chart.js)
    const formattedData = results.map(item => {
      const dateLabel = `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`;
      return {
        date: dateLabel,
        newUsers: item.count
      };
    });

    return NextResponse.json({
      success: true,
      days,
      data: formattedData
    });
  } catch (error: any) {
    console.error("Error fetching user growth analytics:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user growth data" },
      { status: 500 }
    );
  }
}
