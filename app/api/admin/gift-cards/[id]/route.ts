import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GiftCard from "@/models/Gift-Card";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Gift Card ID" }, { status: 400 });
    }

    const card = await GiftCard.findById(id);
    if (!card) {
      return NextResponse.json({ success: false, error: "Gift card not found" }, { status: 404 });
    }

    if (card.status !== "available") {
      return NextResponse.json(
        { success: false, error: `Cannot delete this gift card. Current status is '${card.status}', not 'available'.` },
        { status: 400 }
      );
    }

    await GiftCard.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gift card deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting gift card:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete gift card" },
      { status: 500 }
    );
  }
}
