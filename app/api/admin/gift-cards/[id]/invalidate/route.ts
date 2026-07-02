import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GiftCard from "@/models/Gift-Card";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Gift Card ID" }, { status: 400 });
    }

    // Attempt to update only if the card is 'available' to prevent invalidating active redemptions
    const invalidatedCard = await GiftCard.findOneAndUpdate(
      { _id: id, status: "available" },
      { $set: { status: "expired" } },
      { new: true }
    );

    if (!invalidatedCard) {
      // Check why it failed
      const existingCard = await GiftCard.findById(id);
      if (!existingCard) {
        return NextResponse.json({ success: false, error: "Gift card not found" }, { status: 404 });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: `Cannot invalidate this gift card. Current status is '${existingCard.status}', not 'available'.` 
          }, 
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Gift card invalidated successfully",
      data: invalidatedCard
    });
  } catch (error: any) {
    console.error("Error invalidating gift card:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to invalidate gift card" },
      { status: 500 }
    );
  }
}
