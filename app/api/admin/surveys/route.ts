import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      Survey.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Survey.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: surveys
    });
  } catch (error: any) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch surveys" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const newSurvey = await Survey.create(body);

    return NextResponse.json({
      success: true,
      message: "Survey created successfully",
      data: newSurvey
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating survey:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create survey" },
      { status: 400 }
    );
  }
}
