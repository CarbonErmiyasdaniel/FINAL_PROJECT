import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    dateOfDonation: {
      type: Date,
      required: true,
    },
    bloodPressure: {
      type: String,
    },
    hemoglobinLevel: {
      type: Number,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    typeOfDonation: {
      type: String,
      enum: ["Whole Blood", "Plasma", "Platelets", "Double Red Cells"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 450, // Default to 450ml for whole blood donation
    },
    isDeferred: {
      type: Boolean,
      default: false,
    },
    deferralReason: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
