import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Find all users who were referred by the authenticated user
    const referredUsers = await User.find({ referredBy: user._id })
      .select("fullName email createdAt currentPoints status")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        referralCode: user.referralCode,
        referralEarnings: user.referralEarnings || 0,
        referredUsersCount: referredUsers.length,
        referredUsers,
      },
    });
  } catch (error: any) {
    console.error("Referrals GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve referrals details" },
      { status: 500 }
    );
  }
}
