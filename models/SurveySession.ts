import mongoose from "mongoose";

const surveySessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  
  // Unique session ID passed to the supplier
  sessionId: { type: String, required: true, unique: true, index: true }, 
  supplierName: { type: String, required: true },
  
  // Screener Details
  preScreenerPassed: { type: Boolean, default: false },
  
  // Journey Status
  status: { 
    type: String, 
    enum: [
      'initiated',         // Started pre-screener
      'screener_failed',   // Failed our internal screener
      'redirected',        // Passed screener, sent to supplier
      'completed',         // Callback received: Success
      'screened_out',      // Callback received: Terminated by supplier
      'quota_full',        // Callback received: Quota met
      'security_failure',  // Callback received: Fraud/Quality failed
      'abandoned'          // Never received callback after X hours
    ],
    default: 'initiated'
  },
  
  // Reward details (snapshot at time of attempt)
  potentialReward: { type: Number, required: true },
  
  // Callback Audit Trail
  callbackReceived: { type: Boolean, default: false },
  callbackData: { type: mongoose.Schema.Types.Mixed }, // Store raw JSON/Query dump for disputes
  
  // Security
  ipAddress: { type: String }, // User's IP at start
  
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
}, { timestamps: true });

// Compound index to prevent users from repeating the same survey rapidly
surveySessionSchema.index({ user: 1, survey: 1, status: 1 });

const SurveySession = mongoose.models.SurveySession || mongoose.model("SurveySession", surveySessionSchema);
export default SurveySession;
