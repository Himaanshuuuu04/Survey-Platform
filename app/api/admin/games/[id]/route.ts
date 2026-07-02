import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";
import Transaction from "@/models/Transaction";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Game ID" }, { status: 400 });
    }

    const body = await req.json();

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Game updated successfully",
      data: updatedGame
    });
  } catch (error: any) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Game ID" }, { status: 400 });
    }

    // Check dependency in Transaction collection
    const dependentTransactions = await Transaction.findOne({ referenceId: id });

    if (dependentTransactions) {
      // Soft delete: mark as inactive
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { $set: { status: "inactive" } },
        { new: true }
      );
      
      return NextResponse.json({
        success: true,
        message: "Game soft-deleted (marked inactive) because it has dependency transaction history.",
        data: updatedGame,
        action: "soft_delete"
      });
    } else {
      // Physical drop
      await Game.findByIdAndDelete(id);
      
      return NextResponse.json({
        success: true,
        message: "Game physically deleted.",
        action: "physical_drop"
      });
    }
  } catch (error: any) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete game" },
      { status: 500 }
    );
  }
}
