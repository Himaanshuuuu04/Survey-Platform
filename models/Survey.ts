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
  targetAgeRange: [{ type: String, default: 'All' }], // e.g. ['All'] or ['18-24', '25-34']
  targetGender: [{ type: String, default: 'All' }],
  targetEmploymentStatus: [{ type: String, default: 'All' }],
  targetOccupation: [{ type: String, default: 'All' }],
  targetEducationLevel: [{ type: String, default: 'All' }],
  targetState: [{ type: String, default: 'All' }],
  targetCity: [{ type: String, default: 'All' }],
  targetMaritalStatus: [{ type: String, default: 'All' }],
  targetHouseholdIncome: [{ type: String, default: 'All' }],
  
  urlOrApiEndpoint: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  
  // Dynamic survey questions
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    acceptedAnswers: [{ type: String }] // The answers that qualify the user
  }]
}, { timestamps: true });

const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);
export default Survey;