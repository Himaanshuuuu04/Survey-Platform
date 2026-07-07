import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true }, // e.g., 'BitLabs', 'CPX Research', 'Manual'
  rewardPoints: { type: Number, required: true },
  estimatedTimeMins: { type: Number, required: true },
  
  // Targeting / Eligibility
  countryEligibility: [{ type: String }], // e.g., ['US', 'UK', 'CA'] or ['ALL']
  deviceCompatibility: [{ type: String, enum: ['desktop', 'mobile', 'ios', 'android'] }],
  category: { type: String, default: 'Other' },
  targetAgeRange: { type: String, enum: ['All', '18-24', '25-34', '35-44', '45+'], default: 'All' },
  targetGender: { type: String, enum: ['All', 'Male', 'Female'], default: 'All' },
  
  urlOrApiEndpoint: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  
  // Dynamic survey questions
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }]
  }]
}, { timestamps: true });

const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);
export default Survey;