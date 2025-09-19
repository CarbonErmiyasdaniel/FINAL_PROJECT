import mongoose from "mongoose";
import validator from "validator";

const personalInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    donorRecords: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonorRecord",
      required: false,
    },
    title: {
      type: String,
      enum: ["Mr.", "Mrs.", "Ms.", "Dr.", "Eng.", "Other"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide the donor's first name"],
    },
    fatherName: {
      type: String,
      required: [true, "Please provide the donor's father's name"],
    },
    surname: {
      type: String,
      required: [true, "Please provide the donor's surname"],
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    occupation: {
      type: String,
    },
    contact: {
      city: { type: String },
      subCityRegion: { type: String },
      zone: { type: String },
      woreda: { type: String },
      kebele: { type: String },
      residenceAddress: { type: String },
      telephone: { type: String },
      cellphone: { type: String },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
      },
      pobox: { type: String },
      organization: { type: String },
    },
    donorNumber: {
      type: String,
      unique: true,
    },
    donorSignature: {
      type: String,
    },
  },
  { timestamps: true }
);

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

export default PersonalInfo;
