import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SurveySession from "@/models/SurveySession";

export async function GET(req: Request) {
  try {
    // Optional: Secure this cron route using Vercel CRON secret
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await SurveySession.updateMany(
      {
        status: { $in: ['initiated', 'redirected'] },
        createdAt: { $lt: twentyFourHoursAgo }
      },
      {
        $set: { status: 'abandoned' }
      }
    );

    return NextResponse.json({
      success: true,
      message: `Abandoned sessions cleanup completed. Modified: ${result.modifiedCount}`
    });

  } catch (error: any) {
    console.error("Cron Error [abandoned-sessions]:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
