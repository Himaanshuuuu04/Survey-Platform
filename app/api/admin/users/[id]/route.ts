import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Redemption from "@/models/Redemption";
import mongoose from "mongoose";

// GET: Fetch detailed user profile (Admin view)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    let queryId = id;
    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id).select("-password").lean();
    } else {
      user = await User.findOne({ clerkId: id }).select("-password").lean();
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    queryId = user._id;

    // Run queries in parallel
    const [pointHistory, redemptions] = await Promise.all([
      Transaction.find({ user: queryId }).sort({ createdAt: -1 }).limit(100).lean(),
      Redemption.find({ user: queryId }).sort({ createdAt: -1 }).populate("deliveredGiftCard").lean()
    ]);

    // Extract completed offers from transactions
    const completedOffers = pointHistory.filter((tx: any) => 
      tx.type === "credit" && (tx.category === "survey" || tx.category === "game")
    );

    return NextResponse.json({
      success: true,
      data: {
        profile: user,
        history: {
          transactions: pointHistory,
          completedOffers,
          redemptions
        }
      }
    });
  } catch (error: any) {
    console.error("Error fetching admin user details:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user details" },
      { status: 500 }
    );
  }
}

// PATCH: Update user status or metadata
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Ensure the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid User ID" }, { status: 400 });
    }

    const body = await req.json();
    const { status, fullName, email, role } = body;

    const updates: Record<string, any> = {};
    
    if (status) {
      if (!["active", "suspended", "banned"].includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status value" },
          { status: 400 }
        );
      }
      updates.status = status;
      // Note: If status is 'banned', any active JWTs should be invalidated by middleware checking this DB status
    }

    if (role) {
      if (!["user", "admin"].includes(role)) {
        return NextResponse.json(
          { success: false, error: "Invalid role value" },
          { status: 400 }
        );
      }
      updates.role = role;
    }

    if (fullName) updates.fullName = fullName;
    if (email) updates.email = email;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields provided to update" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE: Delete user profile and associated data (Admin view)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    // Ensure the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid User ID" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Try deleting from Clerk first
    if (user.clerkId) {
      try {
        const { createClerkClient } = await import("@clerk/nextjs/server");
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        await clerkClient.users.deleteUser(user.clerkId);
        console.log(`Deleted Clerk user: ${user.clerkId}`);
      } catch (clerkError: any) {
        console.error("Failed to delete user from Clerk:", clerkError);
        // We will continue and delete from MongoDB anyway to keep DB in sync
      }
    }

    // Delete user and associated transactions and redemptions in parallel
    await Promise.all([
      User.findByIdAndDelete(id),
      Transaction.deleteMany({ user: id }),
      Redemption.deleteMany({ user: id })
    ]);

    return NextResponse.json({
      success: true,
      message: "User and all associated data deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
