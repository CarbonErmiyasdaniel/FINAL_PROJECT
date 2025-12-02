// models/BloodInventory.js

import mongoose from "mongoose";

const bloodInventorySchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      unique: true, // One donation = one bag in inventory
    },
    donationId: {
      type: String,
      required: true,
      // Example: DON-ABC123
    },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    componentType: {
      type: String,
      enum: ["Whole Blood", "Packed Red Cells", "Plasma", "Platelets"],
      default: "Whole Blood",
    },
    volume: {
      type: Number,
      required: true,
      default: 450,
    },
    collectionDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
      // Whole blood: 35–42 days, Plasma: 1 year, etc.
    },
    status: {
      type: String,
      enum: ["Available", "Issued", "Expired", "Discarded"],
      default: "Available",
    },
    issuedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HospitalRequest",
      default: null,
    },
    issuedAt: Date,
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Lab technician who issued
    },
    testedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for fast lookup by blood type + status
bloodInventorySchema.index({ bloodType: 1, status: 1 });
bloodInventorySchema.index({ expiryDate: 1 });

export default mongoose.model("BloodInventory", bloodInventorySchema);
