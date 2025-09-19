import mongoose from "mongoose";

const donorRecordSchema = new mongoose.Schema(
  {
    personalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalInfo",
      required: true,
      unique: true,
    },
    donationRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    aboRh: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      default: "Unknown",
    },
  },
  { timestamps: true }
);

const DonorRecord = mongoose.model("DonorRecord", donorRecordSchema);
export default DonorRecord;
