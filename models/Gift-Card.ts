import mongoose from "mongoose";

const giftCardSchema = new mongoose.Schema({
  brand: { type: String, enum: ['Amazon', 'Google Play', 'Apple', 'Steam', 'Flipkart', 'PayPal'], required: true },
  usdAmount: { type: Number, required: true },
  pointsRequired: { type: Number, required: true },
  
  code: { type: String, required: true, unique: true }, // The actual PIN/Code
  expiryDate: { type: Date },
  
  status: { type: String, enum: ['available', 'used', 'expired'], default: 'available' },
  
  // Once redeemed, tie it to the user and their redemption request
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  redemptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Redemption', default: null, index: true },
  redeemedAt: { type: Date }
}, { timestamps: true });

giftCardSchema.index({ brand: 1, status: 1 });

const GiftCard = mongoose.models.GiftCard || mongoose.model("GiftCard", giftCardSchema);
export default GiftCard;