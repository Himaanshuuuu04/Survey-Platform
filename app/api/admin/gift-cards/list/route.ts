import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GiftCard from "@/models/Gift-Card";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const usdAmount = searchParams.get("usdAmount");

    const query: any = { status: "available" };
    if (brand) query.brand = brand;
    if (usdAmount) query.usdAmount = Number(usdAmount);

    const cards = await GiftCard.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: cards
    });
  } catch (error: any) {
    console.error("Error fetching gift cards:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch gift cards" },
      { status: 500 }
    );
  }
}
