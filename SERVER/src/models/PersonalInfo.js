import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema(
  {
    // Link to the User model, representing the registered donor
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensures a one-to-one relationship with the User
    },
    // Optional link to Donor Records (if applicable)
    // donorRecords: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "DonorRecord",
    // },
    title: {
      type: String,
      enum: ["Mr.", "Mrs.", "Ms.", "Dr.", "Eng.", "Other"],
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
      email: { type: String, unique: true, sparse: true },
      city: { type: String },
      subCityRegion: { type: String },
      zone: { type: String },
      woreda: { type: String },
      kebele: { type: String },
      residenceAddress: { type: String },
      telephone: { type: String },
      cellphone: { type: String },
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
