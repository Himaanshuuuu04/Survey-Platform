import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { getAuthenticatedUser } from "@/lib/authHelper";

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

    const category = searchParams.get("category"); // optional filter
    const type = searchParams.get("type"); // 'credit' | 'debit'

    const query: Record<string, any> = { user: user._id };
    if (category) query.category = category;
    if (type) query.type = type;

    const totalTransactions = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      balance: {
        currentPoints: user.currentPoints,
        usdBalance: user.currentPoints / 1000,
        pendingPoints: user.pendingPoints || 0,
        lifetimeEarnings: user.lifetimeEarnings || 0,
      },
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
        totalTransactions,
      },
      data: transactions,
    });
  } catch (error: any) {
    console.error("Wallet API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve wallet information" },
      { status: 500 }
    );
  }
}
