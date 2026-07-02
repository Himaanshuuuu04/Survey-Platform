import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  
  // What generated this transaction?
  category: { 
    type: String, 
    enum: ['survey', 'game', 'redemption', 'referral_bonus', 'daily_login', 'admin_adjustment'], 
    required: true 
  },
  
  status: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
  
  // Polymorphic reference to the specific Survey, Game, or Redemption request
  referenceId: { type: mongoose.Schema.Types.ObjectId }, 
  description: { type: String }, // e.g., "Completed TapResearch Survey #1234"
  
  // For provider postbacks/webhooks tracking
  providerTransactionId: { type: String, sparse: true } 
}, { timestamps: true });

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;