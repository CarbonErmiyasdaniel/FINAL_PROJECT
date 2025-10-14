import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one personal info per user
    },
    title: {
      type: String,
      enum: ["Mr.", "Mrs.", "Ms.", "Dr.", "Eng.", "Other"],
      default: "Mr.",
    },
    fatherName: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date },
    age: { type: Number },
    sex: { type: String, enum: ["Male", "Female"], default: "Male" },
    occupation: { type: String },
    contact: {
      city: String,
      subCityRegion: String,
      zone: String,
      woreda: String,
      kebele: String,
      residenceAddress: String,
      telephone: String,
      cellphone: String,
      pobox: String,
      organization: String,
    },
    donorNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    donorSignature: { type: String },
  },
  { timestamps: true }
);

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
export default PersonalInfo;
