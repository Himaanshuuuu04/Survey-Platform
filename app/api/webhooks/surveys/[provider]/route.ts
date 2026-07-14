import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SurveySession from "@/models/SurveySession";
import ProviderConfig from "@/models/ProviderConfig";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  return handleCallback(req, provider);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  // Some providers use GET for callbacks
  const { provider } = await params;
  return handleCallback(req, provider);
}

async function handleCallback(req: NextRequest, providerName: string) {
  try {
    await dbConnect();
    
    // Parse query params and body
    const searchParams = new URL(req.url).searchParams;
    let data: any = {};
    for (const [key, value] of searchParams.entries()) {
      data[key] = value;
    }
    
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        data = { ...data, ...body };
      } catch (e) {
        // Body might be urlencoded or empty
      }
    }

    const providerConfig = await ProviderConfig.findOne({ 
      providerName: { $regex: new RegExp(`^${providerName}$`, 'i') },
      isActive: true 
    });

    if (!providerConfig) {
      console.warn(`Provider config not found or inactive for: ${providerName}`);
      return NextResponse.json({ error: "Provider not configured" }, { status: 400 });
    }

    // IP Whitelisting Validation (if configured)
    if (providerConfig.whitelistedIps && providerConfig.whitelistedIps.length > 0) {
      const clientIp = req.headers.get("x-forwarded-for") || req.ip;
      if (clientIp && !providerConfig.whitelistedIps.includes(clientIp)) {
        return NextResponse.json({ error: "IP not whitelisted" }, { status: 403 });
      }
    }

    // Example Hash Validation: 
    // This logic depends on the specific provider. For this generic implementation, 
    // we assume the provider sends `hash` and we hash `sessionId + secretKey` with MD5.
    // If you add a real provider, update this logic to match their docs.
    const providedHash = data.hash;
    const sessionId = data.uid || data.subid || data.session_id;
    const statusParam = (data.status || 'completed').toString().toLowerCase(); // e.g. 1=complete, 2=screenout

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    if (providedHash && providerConfig.secretKey) {
      const expectedString = `${sessionId}${providerConfig.secretKey}`;
      const expectedHash = crypto.createHash('md5').update(expectedString).digest('hex');
      
      if (providedHash.toLowerCase() !== expectedHash.toLowerCase()) {
        console.error(`Hash mismatch for session ${sessionId}`);
        return NextResponse.json({ error: "Invalid hash" }, { status: 403 });
      }
    }

    // Find the session
    const session = await SurveySession.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Save callback audit data
    session.callbackReceived = true;
    session.callbackData = data;
    
    // Idempotency check
    if (['completed', 'screened_out', 'quota_full', 'security_failure', 'manual_review'].includes(session.status)) {
      await session.save();
      // Already processed, return 200 OK so provider stops retrying
      return NextResponse.json({ success: true, message: "Already processed" }, { status: 200 });
    }

    // Determine final status
    let finalStatus = 'completed';
    if (statusParam.includes('screenout') || statusParam === '2') finalStatus = 'screened_out';
    else if (statusParam.includes('quota') || statusParam === '3') finalStatus = 'quota_full';
    else if (statusParam.includes('security') || statusParam === '4') finalStatus = 'security_failure';

    // Fraud Prevention: Compare User IPs
    const supplierProvidedUserIp = data.user_ip || data.ip;
    if (finalStatus === 'completed' && supplierProvidedUserIp && session.ipAddress) {
      if (supplierProvidedUserIp !== session.ipAddress) {
        console.warn(`IP Mismatch for session ${sessionId}. Expected ${session.ipAddress}, got ${supplierProvidedUserIp}`);
        // Flag for manual review instead of rewarding immediately
        finalStatus = 'security_failure';
      }
    }

    session.status = finalStatus;
    session.completedAt = new Date();
    await session.save();

    // Reward the user if completed
    if (finalStatus === 'completed') {
      const rewardAmount = session.potentialReward;

      // Create transaction
      const transaction = new Transaction({
        user: session.user,
        type: 'credit',
        amount: rewardAmount,
        category: 'survey',
        status: 'completed',
        referenceId: session.survey,
        description: `Completed ${session.supplierName} Survey`
      });
      await transaction.save();

      // Update User
      await User.findByIdAndUpdate(session.user, {
        $inc: { 
          currentPoints: rewardAmount, 
          lifetimeEarnings: rewardAmount,
          surveysCompleted: 1
        }
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error(`Webhook Error [${providerName}]:`, error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
