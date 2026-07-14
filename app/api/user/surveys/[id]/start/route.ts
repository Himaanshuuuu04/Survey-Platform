import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
import SurveySession from "@/models/SurveySession";
import { getAuthenticatedUser } from "@/lib/authHelper";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getAuthenticatedUser(req);
    
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const survey = await Survey.findById(id);
    if (!survey) {
      return NextResponse.json({ success: false, error: "Survey not found" }, { status: 404 });
    }

    // Check if the user already has a pending or completed session for this survey
    const existingSession = await SurveySession.findOne({
      user: user._id,
      survey: survey._id,
      status: { $in: ['initiated', 'completed', 'redirected'] }
    });

    if (existingSession && existingSession.status === 'completed') {
      return NextResponse.json({ success: false, error: "You have already completed this survey." }, { status: 403 });
    }

    if (existingSession && existingSession.status === 'redirected') {
      // Allow them to continue if it was recently redirected, but let's just generate a new session for simplicity 
      // or return the existing one. For simplicity and fraud prevention, we'll let them start a new screener
      // but maybe it's better to just use a new session ID for each attempt.
    }

    // Return the screener questions
    return NextResponse.json({
      success: true,
      surveyId: survey._id,
      provider: survey.provider,
      title: survey.title,
      questions: survey.questions.map((q: any) => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options
      }))
    });

  } catch (error: any) {
    console.error("Survey Start API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to start survey" },
      { status: 500 }
    );
  }
}
