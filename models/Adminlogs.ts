import mongoose from "mongoose";

const adminAuditLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "MANUAL_POINTS_CREDIT", "USER_BANNED"
  targetEntityId: { type: mongoose.Schema.Types.ObjectId }, // ID of the user, survey, or redemption affected
  targetEntityType: { type: String }, // e.g., "User", "Redemption"
  details: { type: mongoose.Schema.Types.Mixed } // Stores a JSON snapshot of the change
}, { timestamps: true });

const AdminAuditLog = mongoose.models.AdminAuditLog || mongoose.model("AdminAuditLog", adminAuditLogSchema);
export default AdminAuditLog;