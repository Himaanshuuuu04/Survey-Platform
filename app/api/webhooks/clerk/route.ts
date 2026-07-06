import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.warn("CLERK_WEBHOOK_SECRET is not set in environment. Skipping verification (only use in development).");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: any;

  // Verify signature if secret is present
  if (WEBHOOK_SECRET) {
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ success: false, error: "Missing svix headers" }, { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as any;
    } catch (err: any) {
      console.error("Error verifying webhook:", err.message);
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // Development/testing mode without secret
    evt = payload;
  }

  const { id: clerkId } = evt.data;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses, first_name, last_name, unsafe_metadata } = evt.data;

      const email = email_addresses?.[0]?.email_address;
      const fullName = [first_name, last_name].filter(Boolean).join(" ") || "Evo User";

      // Check if user already exists
      const existingUser = await User.findOne({ clerkId });
      if (existingUser) {
        return NextResponse.json({ success: true, message: "User already exists" });
      }

      // Handle referral code signup
      let referredByUserId = null;
      const referredByCode = unsafe_metadata?.referredByCode;

      if (referredByCode) {
        const referrer = await User.findOne({ referralCode: referredByCode });
        if (referrer) {
          referredByUserId = referrer._id;
        }
      }

      // Generate a unique referral code for the new user
      const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, "").substring(0, 6).toUpperCase();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const referralCode = `${cleanName}${randomSuffix}`;

      // Create new user
      await User.create({
        clerkId,
        fullName,
        email,
        isEmailVerified: true, // Clerk verified email
        referralCode,
        referredBy: referredByUserId,
        currentPoints: 0,
        lifetimeEarnings: 0,
        pendingPoints: 0,
      });

      console.log(`Created MongoDB User document for Clerk ID: ${clerkId}`);
    }

    if (eventType === "user.updated") {
      const { email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address;
      const fullName = [first_name, last_name].filter(Boolean).join(" ") || "Evo User";

      await User.findOneAndUpdate(
        { clerkId },
        { fullName, email },
        { new: true }
      );
      console.log(`Updated MongoDB User document for Clerk ID: ${clerkId}`);
    }

    if (eventType === "user.deleted") {
      // We can either delete the user or mark status as banned/suspended. 
      // Deleting is standard for GDPR / Clerk delete.
      await User.findOneAndDelete({ clerkId });
      console.log(`Deleted MongoDB User document for Clerk ID: ${clerkId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing Clerk webhook event:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
