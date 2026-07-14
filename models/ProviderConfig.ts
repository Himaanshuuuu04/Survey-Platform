import mongoose from "mongoose";

const providerConfigSchema = new mongoose.Schema({
  providerName: { type: String, required: true, unique: true, index: true }, // e.g., 'bitlabs', 'cpx'
  secretKey: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  
  // Whitelisted IP addresses for callbacks
  whitelistedIps: [{ type: String }],
}, { timestamps: true });

const ProviderConfig = mongoose.models.ProviderConfig || mongoose.model("ProviderConfig", providerConfigSchema);
export default ProviderConfig;
