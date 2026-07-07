import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Redemption from "@/models/Redemption";
import Transaction from "@/models/Transaction";
import { getAuthenticatedUser } from "@/lib/authHelper";

// GET: Fetch redemption history
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalRedemptions = await Redemption.countDocuments({ user: user._id, requestedBrand: { $ne: "PayPal" } });
    const redemptions = await Redemption.find({ user: user._id, requestedBrand: { $ne: "PayPal" } })
      .populate("deliveredGiftCard")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRedemptions / limit),
        totalRedemptions,
      },
      data: redemptions,
    });
  } catch (error: any) {
    console.error("Redemption history GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve redemption history" },
      { status: 500 }
    );
  }
}

// POST: Request a new redemption
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { brand, usdAmount } = body;

    // 1. Basic validation
    if (!brand || !usdAmount || isNaN(usdAmount)) {
      return NextResponse.json(
        { success: false, error: "brand and usdAmount (numeric) are required" },
        { status: 400 }
      );
    }

    const allowedBrands = ["Amazon", "Google Play", "Apple", "Steam", "Flipkart"];
    if (!allowedBrands.includes(brand)) {
      return NextResponse.json(
        { success: false, error: `Invalid brand. Must be one of: ${allowedBrands.join(", ")}` },
        { status: 400 }
      );
    }

    const pointsRequired = usdAmount * 1000;

    // Minimum redemption limit: 5,000 points ($5)
    if (pointsRequired < 5000) {
      return NextResponse.json(
        { success: false, error: "Minimum redemption value is $5 (5,000 Evo Points)" },
        { status: 400 }
      );
    }

    // 2. Atomic balance check and deduction to avoid race conditions
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, currentPoints: { $gte: pointsRequired } },
      { $inc: { currentPoints: -pointsRequired } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "Insufficient Evo Points balance" },
        { status: 400 }
      );
    }

    // 3. Create Redemption request document
    const redemption = await Redemption.create({
      user: user._id,
      requestedBrand: brand,
      usdAmount,
      pointsDeducted: pointsRequired,
      status: "pending",
    });

    // 4. Create Transaction record (debit)
    await Transaction.create({
      user: user._id,
      type: "debit",
      amount: pointsRequired,
      category: "redemption",
      status: "pending",
      referenceId: redemption._id,
      description: `Redeemed ${usdAmount} USD ${brand} Gift Card`,
    });

    return NextResponse.json({
      success: true,
      message: "Redemption request submitted successfully. Pending admin approval.",
      data: redemption,
      newBalance: updatedUser.currentPoints,
    });
  } catch (error: any) {
    console.error("Redemption POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit redemption request" },
      { status: 500 }
    );
  }
}
