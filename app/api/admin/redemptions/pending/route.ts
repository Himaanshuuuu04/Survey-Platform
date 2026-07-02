import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Redemption from "@/models/Redemption";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [pendingRedemptions, total] = await Promise.all([
      Redemption.find({ status: "pending" })
        .populate("user", "name email status")
        .sort({ createdAt: 1 }) // Chronological order (oldest first)
        .skip(skip)
        .limit(limit)
        .lean(),
      Redemption.countDocuments({ status: "pending" })
    ]);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: pendingRedemptions
    });
  } catch (error: any) {
    console.error("Error fetching pending redemptions:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch pending redemptions" },
      { status: 500 }
    );
  }
}
