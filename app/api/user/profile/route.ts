import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch email from query parameter
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Try to find the user
    let user = await User.findOne({ email });

    // If user doesn't exist, create a mock user for demonstration / testing
    if (!user) {
      user = await User.create({
        fullName: "Jane Doe",
        email: email.toLowerCase(),
        clerkId: `mock_clerk_${Math.floor(100000 + Math.random() * 900000)}`,
        role: "user",
        status: "active",
        currentPoints: 1250,
        lifetimeEarnings: 25.5,
        pendingPoints: 100,
        surveysCompleted: 3,
        referralCode: `JANE${Math.floor(1000 + Math.random() * 9000)}`,
        preferences: {
          darkMode: true,
          emailNotifications: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Error in User Profile API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
