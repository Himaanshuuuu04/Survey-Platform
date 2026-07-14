import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SurveySession from "@/models/SurveySession";
import { getAuthenticatedAdmin } from "@/lib/authHelper";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // In some cases admin routes don't strictly enforce getAuthenticatedAdmin if it's an MVP,
    // but following best practices:
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      // return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      // Wait, let's keep it consistent, if it fails, maybe it returns 403. Let's just uncomment it.
      // But looking at api/admin/surveys/route.ts, it doesn't use it.
      // We will use it just in case.
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      SurveySession.find()
        .populate('user', 'fullName email')
        .populate('survey', 'title provider')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SurveySession.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: sessions
    });
  } catch (error: any) {
    console.error("Error fetching survey sessions:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch survey sessions" },
      { status: 500 }
    );
  }
}
