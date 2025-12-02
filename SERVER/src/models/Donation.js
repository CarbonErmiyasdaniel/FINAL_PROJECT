import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    personalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalInfo",
      required: true,
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Nurse who collected
    },
    dateOfDonation: { type: Date, required: true },
    bloodPressure: String,
    hemoglobinLevel: Number,
    aboRh: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
      default: "Unknown",
    },
    typeOfDonation: {
      type: String,
      enum: ["Whole Blood", "Plasma", "Platelets", "Double Red Cells"],
    },
    quantity: { type: Number, required: true, default: 450 },
    isDeferred: { type: Boolean, default: false },
    deferralReason: String,
    notes: String,

    // ======== LAB TESTING SECTION ========
    isTested: {
      type: Boolean,
      default: false,
    },
    testedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Lab technician
    },
    testedAt: Date,

    screeningTests: {
      hiv: { type: String, enum: ["Negative", "Positive", "Inconclusive"] },
      hepatitisB: {
        type: String,
        enum: ["Negative", "Positive", "Inconclusive"],
      },
      hepatitisC: {
        type: String,
        enum: ["Negative", "Positive", "Inconclusive"],
      },
      syphilis: {
        type: String,
        enum: ["Negative", "Positive", "Inconclusive"],
      },
    },
    finalResult: {
      type: String,
      enum: ["Safe", "Unsafe", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
