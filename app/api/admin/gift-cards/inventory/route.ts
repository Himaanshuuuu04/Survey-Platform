import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GiftCard from "@/models/Gift-Card";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Aggregate only available gift cards
    const inventoryStats = await GiftCard.aggregate([
      {
        $match: {
          status: "available"
        }
      },
      {
        $group: {
          _id: {
            brand: "$brand",
            usdAmount: "$usdAmount"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.brand": 1 as const,
          "_id.usdAmount": 1 as const
        }
      }
    ]);

    // Format the response and identify low stock levels
    const formattedData = inventoryStats.map(stat => {
      const isLowStock = stat.count < 5;
      return {
        brand: stat._id.brand,
        usdAmount: stat._id.usdAmount,
        availableCount: stat.count,
        status: isLowStock ? "Low Stock" : "Healthy"
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedData
    });
  } catch (error: any) {
    console.error("Error fetching gift card inventory:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}
