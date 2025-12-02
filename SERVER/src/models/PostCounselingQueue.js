// models/PostCounselingQueue.js
import mongoose from "mongoose";

const postCounselingQueueSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      unique: true,
    },
    finalResult: {
      type: String,
      enum: ["Safe", "Unsafe"],
      required: true,
    },
    hasReactiveResult: {
      type: Boolean,
      required: true,
    },
    notified: {
      type: Boolean,
      default: false,
    },
    notifiedAt: Date,
    notifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notificationLog: [
      { channel: String, status: String, to: String, error: String },
    ], // Log SMS sent/failed
  },
  { timestamps: true }
);

export default mongoose.model("PostCounselingQueue", postCounselingQueueSchema);
