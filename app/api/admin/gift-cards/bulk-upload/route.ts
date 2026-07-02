import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GiftCard from "@/models/Gift-Card";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { cards } = body; // Expecting { cards: [...] }

    if (!Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json(
        { success: false, error: "An array of gift cards is required" },
        { status: 400 }
      );
    }

    // Prepare documents for insert
    const documents = cards.map(card => {
      // Basic validation
      if (!card.code || !card.brand || !card.usdAmount) {
        throw new Error("Missing required fields (code, brand, usdAmount) in one or more cards");
      }
      
      return {
        brand: card.brand,
        usdAmount: card.usdAmount,
        code: card.code,
        pin: card.pin, // optional
        status: "available", // override any status passed in
      };
    });

    // Highly efficient bulk insert
    const insertedCards = await GiftCard.insertMany(documents, { ordered: false });

    return NextResponse.json({
      success: true,
      message: `${insertedCards.length} gift cards successfully vaulted.`,
      data: {
        insertedCount: insertedCards.length
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error bulk uploading gift cards:", error);
    
    // Handle partial success/duplicate codes gracefully
    if (error.name === 'BulkWriteError' && error.result) {
       return NextResponse.json(
        { 
          success: false, 
          error: "Partial success during bulk upload (possible duplicate codes).",
          insertedCount: error.result.nInserted
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to bulk upload gift cards" },
      { status: 500 }
    );
  }
}
