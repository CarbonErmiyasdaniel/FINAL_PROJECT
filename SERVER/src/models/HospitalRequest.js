// models/HospitalRequest.js
import mongoose from "mongoose";

const hospitalRequestSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  requestDate: {
    type: Date,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  quantityRequested: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Fulfilled", "Rejected"],
    default: "Pending",
  },
  remarks: {
    type: String,
  },
});

const HospitalRequest = mongoose.model(
  "HospitalRequest",
  hospitalRequestSchema
);
export default HospitalRequest;
