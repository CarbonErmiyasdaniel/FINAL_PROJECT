// models/SystemConfig.js
import mongoose from "mongoose";

const systemConfigSchema = new mongoose.Schema(
  {
    adminCreated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SystemConfig", systemConfigSchema);
