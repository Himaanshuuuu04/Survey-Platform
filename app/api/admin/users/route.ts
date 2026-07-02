import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// GET: List all users with pagination, search, and filtering
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    
    // Pagination params
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Search & Filter params
    const search = searchParams.get("search"); // email or fullName
    const status = searchParams.get("status"); // active, suspended, banned
    const country = searchParams.get("country");
    const startDate = searchParams.get("startDate"); // ISO Date string
    const endDate = searchParams.get("endDate"); // ISO Date string

    const query: any = {};

    // 1. Text Search (fullName or email)
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // 2. Exact Match Filters
    if (status) {
      query.status = status;
    }
    if (country) {
      query.country = country;
    }

    // 3. Date Range Filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Execute queries in parallel
    const [users, totalCount] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-password"), // Do not return passwords
      User.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      },
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
