import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.demographicsCompleted) {
      return NextResponse.json({ success: false, error: "Demographics already completed" }, { status: 400 });
    }

    const body = await req.json();
    const {
      age,
      gender,
      employmentStatus,
      occupation,
      educationLevel,
      country,
      state,
      city,
      maritalStatus,
      householdIncome
    } = body;

    // Basic validation
    if (!age || !gender || !employmentStatus || !occupation || !educationLevel || !country || !state || !city || !maritalStatus || !householdIncome) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    if (typeof age !== 'number' || age < 18 || age > 99) {
      return NextResponse.json({ success: false, error: "Invalid age" }, { status: 400 });
    }

    // Update user profile
    user.demographicsCompleted = true;
    user.demographics = {
      age,
      gender,
      employmentStatus,
      occupation,
      educationLevel,
      country,
      state,
      city,
      maritalStatus,
      householdIncome
    };
    
    // Also save country on top level to not break existing logic if any
    user.country = country;

    await user.save();

    return NextResponse.json({ success: true, message: "Demographics updated successfully" });

  } catch (error: any) {
    console.error("Demographics API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save demographics" },
      { status: 500 }
    );
  }
}
