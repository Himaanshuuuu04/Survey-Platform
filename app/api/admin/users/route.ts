import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// GET: List all users
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch all users (sorting by creation date descending)
    const users = await User.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    console.error("Error fetching users for admin:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST: Update user role or status
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, role, status } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required to perform an update" },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {};
    if (role) {
      if (!["user", "admin"].includes(role)) {
        return NextResponse.json(
          { success: false, error: "Invalid role value. Must be 'user' or 'admin'" },
          { status: 400 }
        );
      }
      updates.role = role;
    }

    if (status) {
      if (!["active", "suspended", "banned"].includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status value. Must be 'active', 'suspended', or 'banned'" },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid update fields provided (role or status)" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user for admin:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}
