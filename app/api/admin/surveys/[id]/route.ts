import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
import Transaction from "@/models/Transaction";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Survey ID" }, { status: 400 });
    }

    const body = await req.json();

    const updatedSurvey = await Survey.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedSurvey) {
      return NextResponse.json({ success: false, error: "Survey not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Survey updated successfully",
      data: updatedSurvey
    });
  } catch (error: any) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update survey" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Survey ID" }, { status: 400 });
    }

    // Check dependency in Transaction collection
    const dependentTransactions = await Transaction.findOne({ referenceId: id });

    if (dependentTransactions) {
      // Soft delete: mark as inactive
      const updatedSurvey = await Survey.findByIdAndUpdate(
        id,
        { $set: { status: "inactive" } },
        { new: true }
      );
      
      return NextResponse.json({
        success: true,
        message: "Survey soft-deleted (marked inactive) because it has dependency transaction history.",
        data: updatedSurvey,
        action: "soft_delete"
      });
    } else {
      // Physical drop
      await Survey.findByIdAndDelete(id);
      
      return NextResponse.json({
        success: true,
        message: "Survey physically deleted.",
        action: "physical_drop"
      });
    }
  } catch (error: any) {
    console.error("Error deleting survey:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete survey" },
      { status: 500 }
    );
  }
}
