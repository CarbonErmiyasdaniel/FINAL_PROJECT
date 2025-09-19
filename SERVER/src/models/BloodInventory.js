// models/BloodInventory.js
import mongoose from "mongoose";

const donationHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  din: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bp: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  hgb: {
    type: Number,
    required: true,
  },
  typeOfDonation: {
    type: String,
    required: true,
  },
  aboRh: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },
});

const bloodInventorySchema = new mongoose.Schema({
  nameOfBloodBank: {
    type: String,
    required: true,
  },
  donationHistory: [donationHistorySchema],
});

const BloodInventory = mongoose.model("BloodInventory", bloodInventorySchema);
export default BloodInventory;
