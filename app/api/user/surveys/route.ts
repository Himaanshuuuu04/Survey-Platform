import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    // 1. Detect Country
    // Check query param first, then vercel header, default to 'ALL' or user's country if stored
    const queryCountry = searchParams.get("country");
    const headerCountry = req.headers.get("x-vercel-ip-country");
    const country = (queryCountry || headerCountry || user.country || "ALL").toUpperCase();

    // 2. Detect Device Type
    const queryDevice = searchParams.get("device"); // 'desktop' | 'mobile' | 'ios' | 'android'
    const userAgent = req.headers.get("user-agent") || "";
    let detectedDevice = "desktop";

    if (/android/i.test(userAgent)) {
      detectedDevice = "android";
    } else if (/ipad|iphone|ipod/i.test(userAgent)) {
      detectedDevice = "ios";
    } else if (/mobile/i.test(userAgent)) {
      detectedDevice = "mobile";
    }

    const device = queryDevice || detectedDevice;

    // 3. Build MongoDB query
    // Find active surveys that match device compatibility and country eligibility
    const query: Record<string, any> = { status: "active" };

    if (device) {
      query.deviceCompatibility = { $in: [device] };
    }

    if (country && country !== "ALL") {
      query.countryEligibility = { $in: [country, "ALL"] };
    }

    const surveys = await Survey.find(query).sort({ rewardPoints: -1 });

    return NextResponse.json({
      success: true,
      count: surveys.length,
      filtersUsed: {
        country,
        device,
      },
      data: surveys,
    });
  } catch (error: any) {
    console.error("Surveys API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve surveys" },
      { status: 500 }
    );
  }
}
