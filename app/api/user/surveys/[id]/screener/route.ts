import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Survey from "@/models/Survey";
import SurveySession from "@/models/SurveySession";
import { getAuthenticatedUser } from "@/lib/authHelper";
import crypto from "crypto";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getAuthenticatedUser(req);
    
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { answers } = await req.json(); // { questionId: 'answer_text' }
    
    const { id } = await params;
    const survey = await Survey.findById(id);
    if (!survey) {
      return NextResponse.json({ success: false, error: "Survey not found" }, { status: 404 });
    }

    let passed = true;
    
    // Evaluate answers
    if (survey.questions && survey.questions.length > 0) {
      for (let i = 0; i < survey.questions.length; i++) {
        const question = survey.questions[i];
        const key = `q${i + 1}`;
        const userAnswer = answers[key];
        
        // If there are accepted answers defined and the user's answer isn't in them
        if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
          if (!userAnswer || !question.acceptedAnswers.includes(userAnswer)) {
            passed = false;
            break;
          }
        }
      }
    }

    if (!passed) {
      await SurveySession.create({
        user: user._id,
        survey: survey._id,
        sessionId: crypto.randomUUID(),
        supplierName: survey.provider,
        preScreenerPassed: false,
        status: 'screener_failed',
        potentialReward: survey.rewardPoints,
        ipAddress: req.headers.get("x-forwarded-for") || "unknown"
      });

      return NextResponse.json({ 
        success: false, 
        passed: false,
        message: "Unfortunately, you do not qualify for this survey based on your answers." 
      });
    }

    // Passed screener - Create Session
    const sessionId = crypto.randomUUID();
    
    const session = await SurveySession.create({
      user: user._id,
      survey: survey._id,
      sessionId,
      supplierName: survey.provider,
      preScreenerPassed: true,
      status: 'redirected',
      potentialReward: survey.rewardPoints,
      ipAddress: req.headers.get("x-forwarded-for") || req.ip || "unknown"
    });

    // Construct redirect URL
    // e.g. "https://example.com/survey/bitlabs/tech?uid=123-456"
    const urlObj = new URL(survey.urlOrApiEndpoint);
    
    // Append the sessionId. Most providers use 'uid' or 'subid'. 
    // We can assume 'uid' for this implementation, but it could be dynamic based on provider.
    urlObj.searchParams.set("uid", sessionId);
    
    return NextResponse.json({
      success: true,
      passed: true,
      redirectUrl: urlObj.toString(),
      sessionId
    });

  } catch (error: any) {
    console.error("Survey Screener API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process screener" },
      { status: 500 }
    );
  }
}
