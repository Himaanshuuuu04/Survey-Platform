import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  
  thumbnailUrl: { type: String, required: true },
  trackingUrl: { type: String, required: true },
  
  deviceCompatibility: [{ type: String, enum: ['ios', 'android', 'desktop'] }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);