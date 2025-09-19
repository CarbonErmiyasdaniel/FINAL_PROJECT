// models/NurseReport.js
import mongoose from "mongoose";

const nurseReportSchema = new mongoose.Schema({
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model for nurses
    required: true,
  },
  reportDate: {
    type: Date,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

const NurseReport = mongoose.model("NurseReport", nurseReportSchema);
export default NurseReport;
 