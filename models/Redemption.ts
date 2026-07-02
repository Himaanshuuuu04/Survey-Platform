import mongoose from "mongoose";

const redemptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  requestedBrand: { type: String, required: true },
  usdAmount: { type: Number, required: true },
  pointsDeducted: { type: Number, required: true }, // Must be >= 5000
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'], 
    default: 'pending' 
  },
  
  // Linked when Admin approves and assigns a card from the Gift Card Inventory
  deliveredGiftCard: { type: mongoose.Schema.Types.ObjectId, ref: 'GiftCard' },
  
  adminRemarks: { type: String }, // Reason for rejection or manual notes
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who approved/rejected
  processedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Redemption', redemptionSchema);