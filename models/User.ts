import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Authentication & Profile
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: false }, // Optional if using Google Login
  googleId: { type: String, sparse: true, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },

  // Wallet & Earnings
  currentPoints: { type: Number, default: 0 },
  lifetimeEarnings: { type: Number, default: 0 },
  pendingPoints: { type: Number, default: 0 },
  
  // Platform Statistics
  surveysCompleted: { type: Number, default: 0 },
  gamesCompleted: { type: Number, default: 0 },
  
  // Referral System
  referralCode: { type: String, unique: true, index: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  referralEarnings: { type: Number, default: 0 },

  // Security & Fraud Detection
  lastLoginIp: { type: String },
  deviceFingerprint: { type: String }, // For Duplicate Account Prevention
  vpnDetected: { type: Boolean, default: false },
  country: { type: String },

  // Preferences
  preferences: {
    darkMode: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);