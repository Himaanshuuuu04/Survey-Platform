import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Game from "@/models/Game";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [games, total] = await Promise.all([
      Game.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Game.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: games
    });
  } catch (error: any) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch games" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const newGame = await Game.create(body);

    return NextResponse.json({
      success: true,
      message: "Game created successfully",
      data: newGame
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create game" },
      { status: 400 } 
    );
  }
}
