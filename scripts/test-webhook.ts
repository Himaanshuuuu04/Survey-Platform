import mongoose from 'mongoose';
import crypto from 'crypto';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';
import Survey from '../models/Survey';
import SurveySession from '../models/SurveySession';
import ProviderConfig from '../models/ProviderConfig';
import Transaction from '../models/Transaction';
import { config } from 'dotenv';
import path from 'path';

// Load env vars
config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Connected to database.");

    // 1. Create a dummy ProviderConfig
    const providerName = 'testprovider4';
    const secretKey = 'mysecretkey4';
    
    console.log("Setting up test data...");
    await ProviderConfig.deleteOne({ providerName });
    const providerConfig = await ProviderConfig.create({
      providerName,
      isActive: true,
      secretKey,
      whitelistedIps: [] // Allowing all for test
    });

    // 2. Create a dummy User
    const user = await User.create({
      clerkId: 'test_clerk_id_' + Date.now(),
      email: 'test_4' + Date.now() + '@example.com',
      username: 'tester_' + Date.now(),
      fullName: 'Test User',
      referralCode: 'REF_' + Date.now(),
      currentPoints: 0,
      lifetimeEarnings: 0
    });

    // 3. Create a dummy Survey
    const survey = await Survey.create({
      title: 'Test Survey 4',
      provider: providerName,
      rewardPoints: 100,
      estimatedTimeMins: 10,
      urlOrApiEndpoint: 'http://example.com'
    });

    // 4. Create a dummy SurveySession
    const sessionId = crypto.randomUUID();
    const session = await SurveySession.create({
      user: user._id,
      survey: survey._id,
      sessionId,
      supplierName: providerName,
      status: 'redirected',
      potentialReward: survey.rewardPoints,
      ipAddress: '127.0.0.1'
    });
    
    console.log(`Test session created with ID: ${sessionId}`);

    // 5. Generate the callback URL and payload
    // Expected Hash: MD5(sessionId + secretKey)
    const expectedString = `${sessionId}${secretKey}`;
    const hash = crypto.createHash('md5').update(expectedString).digest('hex');
    
    const callbackUrl = `http://localhost:3000/api/webhooks/surveys/${providerName}`;
    const payload = {
      uid: sessionId,
      status: '1', // 1=complete for our test
      hash: hash,
      ip: '127.0.0.1' // Match session IP for fraud prevention
    };

    console.log("Sending POST request to webhook...", callbackUrl);
    
    const response = await fetch(callbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(`Webhook response status: ${response.status}`);
    console.log("Webhook response data:", result);

    if (response.ok && result.success) {
      console.log("✅ Webhook called successfully!");
      
      // 6. Verify Database Changes
      const updatedSession = await SurveySession.findOne({ sessionId });
      console.log(`Session status is now: ${updatedSession?.status}`);
      
      if (updatedSession?.status === 'completed') {
        console.log("✅ Session status updated to completed.");
      } else {
        console.log("❌ Session status was NOT updated correctly.");
      }

      const updatedUser = await User.findById(user._id);
      console.log(`User points: ${updatedUser?.currentPoints}`);
      if (updatedUser?.currentPoints === 100) {
        console.log("✅ User was rewarded 100 points.");
      } else {
        console.log("❌ User was NOT rewarded correctly.");
      }

      const transaction = await Transaction.findOne({ user: user._id });
      if (transaction && transaction.amount === 100 && transaction.status === 'completed') {
         console.log("✅ Transaction was created successfully.");
      } else {
         console.log("❌ Transaction creation failed.");
      }
    } else {
      console.log("❌ Webhook failed:", result);
    }

    // Cleanup
    console.log("Cleaning up test data...");
    await ProviderConfig.findByIdAndDelete(providerConfig._id);
    await User.findByIdAndDelete(user._id);
    await Survey.findByIdAndDelete(survey._id);
    await SurveySession.findByIdAndDelete(session._id);
    await Transaction.deleteMany({ user: user._id });
    console.log("Cleanup complete.");

  } catch (error) {
    console.error("Test script failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTest();
