import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Fetch email and other details from query parameter
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const clerkId = searchParams.get("clerkId");
    const fullName = searchParams.get("fullName") || "Anonymous User";
    const referredByCode = searchParams.get("referredByCode");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Try to find the user by email or clerkId
    let user = null;
    if (clerkId) {
      user = await User.findOne({ clerkId });
    }
    if (!user) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    // If user doesn't exist, create it dynamically
    if (!user) {
      // Find referrer by code if provided
      let referredByUserId = null;
      if (referredByCode) {
        const referrer = await User.findOne({ referralCode: referredByCode });
        if (referrer) {
          referredByUserId = referrer._id;
        }
      }

      // Generate a random referral code
      const referralCode = `${fullName.slice(0, 4).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      
      user = await User.create({
        fullName: fullName,
        email: email.toLowerCase(),
        clerkId: clerkId || `mock_clerk_${Math.floor(100000 + Math.random() * 900000)}`,
        role: "user",
        status: "active",
        currentPoints: 0, // Initial sign-up balance
        lifetimeEarnings: 0,
        pendingPoints: 0,
        surveysCompleted: 0,
        referralCode: referralCode,
        referredBy: referredByUserId,
        preferences: {
          darkMode: true,
          emailNotifications: true,
        },
      });
    } else if (clerkId && !user.clerkId) {
      // Sync clerk ID if it was missing
      user.clerkId = clerkId;
      await user.save();
    }

    // Sync role to Clerk publicMetadata if not matched (non-blocking)
    if (user && clerkId) {
      import("@clerk/nextjs/server").then(async ({ createClerkClient }) => {
        try {
          const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
          const clerkUser = await clerkClient.users.getUser(clerkId);
          if (clerkUser.publicMetadata?.role !== user.role) {
            await clerkClient.users.updateUserMetadata(clerkId, {
              publicMetadata: { role: user.role }
            });
            console.log(`Synced role ${user.role} to Clerk for user ${clerkId}`);
          }
        } catch (err) {
          console.error("Error syncing role to Clerk in GET profile:", err);
        }
      }).catch(err => {
        console.error("Failed to import Clerk in GET profile:", err);
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
export async function POST(req: NextRequest) {
  // Sync endpoint using POST as well
  try {
    await dbConnect();
    const { email, clerkId, fullName, referredByCode } = await req.json();

    if (!email || !clerkId) {
      return NextResponse.json({ success: false, error: "email and clerkId are required" }, { status: 400 });
    }

    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      let referredByUserId = null;
      if (referredByCode) {
        const referrer = await User.findOne({ referralCode: referredByCode });
        if (referrer) {
          referredByUserId = referrer._id;
        }
      }

      const referralCode = `${(fullName || "USER").slice(0, 4).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      user = await User.create({
        fullName: fullName || "Anonymous User",
        email: email.toLowerCase(),
        clerkId,
        role: "user",
        status: "active",
        currentPoints: 0,
        lifetimeEarnings: 0,
        pendingPoints: 0,
        surveysCompleted: 0,
        referralCode,
        referredBy: referredByUserId,
        preferences: {
          darkMode: true,
          emailNotifications: true,
        },
      });
    } else {
      user.clerkId = clerkId;
      if (fullName) user.fullName = fullName;
      await user.save();
    }

    // Sync role to Clerk publicMetadata if not matched (non-blocking)
    if (user && clerkId) {
      import("@clerk/nextjs/server").then(async ({ createClerkClient }) => {
        try {
          const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
          const clerkUser = await clerkClient.users.getUser(clerkId);
          if (clerkUser.publicMetadata?.role !== user.role) {
            await clerkClient.users.updateUserMetadata(clerkId, {
              publicMetadata: { role: user.role }
            });
            console.log(`Synced role ${user.role} to Clerk for user ${clerkId}`);
          }
        } catch (err) {
          console.error("Error syncing role to Clerk in POST profile:", err);
        }
      }).catch(err => {
        console.error("Failed to import Clerk in POST profile:", err);
      });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    // Verify authentication header
    const clerkId = req.headers.get("x-clerk-user-id");
    if (!clerkId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, country, preferences } = body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (fullName) user.fullName = fullName;
    
    // One-time fields: Only allow updating if they are not already set
    if (country !== undefined && !user.country) user.country = country;

    if (preferences) {
      user.preferences = {
        ...user.preferences,
        ...preferences
      };
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Error in User Profile PUT API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
