import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
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

    // Fetch completed survey reference IDs for the current user
    const completedSurveyIds = await Transaction.find({
      user: user._id,
      category: "survey",
      status: "completed"
    }).distinct("referenceId");

    // 3. Build MongoDB query
    // Find active surveys that match device compatibility and country eligibility, excluding already completed ones
    const query: Record<string, any> = { 
      status: "active",
      _id: { $nin: completedSurveyIds }
    };

    if (device) {
      query.deviceCompatibility = { $in: [device] };
    }

    if (country && country !== "ALL") {
      query.countryEligibility = { $in: [country, "ALL"] };
    }

    // 2.5 Auto-seed sample surveys if none exist in the database
    const surveyCount = await Survey.countDocuments();
    if (surveyCount === 0) {
      await Survey.create([
        {
          title: "BitLabs Tech & Gadgets Survey",
          provider: "BitLabs",
          rewardPoints: 1200,
          estimatedTimeMins: 10,
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile", "ios", "android"],
          urlOrApiEndpoint: "https://example.com/survey/bitlabs/tech",
          status: "active"
        },
        {
          title: "CPX Research Consumer Preferences",
          provider: "CPX Research",
          rewardPoints: 2500,
          estimatedTimeMins: 15,
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile", "ios", "android"],
          urlOrApiEndpoint: "https://example.com/survey/cpx/consumer",
          status: "active"
        },
        {
          title: "Evo Global Media Consumption Habits",
          provider: "Manual",
          rewardPoints: 800,
          estimatedTimeMins: 8,
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile", "ios", "android"],
          urlOrApiEndpoint: "https://example.com/survey/evo/media",
          status: "active"
        },
        {
          title: "Global Finance & Mobile Banking Survey",
          provider: "BitLabs",
          rewardPoints: 3000,
          estimatedTimeMins: 20,
          countryEligibility: ["ALL"],
          deviceCompatibility: ["desktop", "mobile"],
          urlOrApiEndpoint: "https://example.com/survey/bitlabs/finance",
          status: "active"
        }
      ]);
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
