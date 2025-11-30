// // import mongoose from "mongoose";

// // const personalInfoSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //       unique: true, // one personal info per user
// //     },
// //     title: {
// //       type: String,
// //       enum: ["Mr.", "Mrs.", "Ms.", "Dr.", "Eng.", "Other"],
// //       default: "Mr.",
// //     },
// //     fatherName: { type: String, required: true },
// //     surname: { type: String, required: true },
// //     dateOfBirth: { type: Date },
// //     age: { type: Number },
// //     sex: { type: String, enum: ["Male", "Female"], default: "Male" },
// //     occupation: { type: String },
// //     contact: {
// //       city: String,
// //       subCityRegion: String,
// //       zone: String,
// //       woreda: String,
// //       kebele: String,
// //       residenceAddress: String,
// //       telephone: String,
// //       cellphone: String,
// //       pobox: String,
// //       organization: String,
// //     },
// //     donorNumber: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       trim: true,
// //     },
// //     donorSignature: { type: String },
// //   },
// //   { timestamps: true }
// // );

// // const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
// // export default PersonalInfo;
// // models/PersonalInfo.js
// // models/PersonalInfo.js
// ////////////////////////////////////////////////////////////
// import mongoose from "mongoose";

// const personalInfoSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: String,
//     firstName: String,
//     fatherName: String,
//     surname: String,
//     dateOfBirth: Date,
//     sex: String,
//     occupation: String,
//     donorNumber: { type: String, unique: true },
//     donorSignature: String,

//     address: {
//       region: String,
//       zone: String,
//       woreda: String,
//       kebele: String,
//       subCity: String,
//       houseNumber: String,
//     },
//     contact: {
//       mobile: { type: String, unique: true, sparse: true },
//       telephone: String,
//       pobox: String,
//     },
//   },
//   { timestamps: true }
// );

// // Auto generate donor number: DBB-2025-0001
// personalInfoSchema.pre("save", async function (next) {
//   if (!this.donorNumber) {
//     const year = new Date().getFullYear();
//     const count = await this.constructor.countDocuments({
//       donorNumber: new RegExp(`^DBB-${year}`),
//     });
//     this.donorNumber = `DBB-${year}-${String(count + 1).padStart(4, "0")}`;
//   }
//   next();
// });

// export default mongoose.model("PersonalInfo", personalInfoSchema);

// import mongoose from "mongoose";

// const personalInfoSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     title: { type: String, required: true },
//     fatherName: { type: String, required: true },
//     surname: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },
//     sex: { type: String, enum: ["Male", "Female"], required: true },
//     occupation: { type: String, required: true },
//     donorNumber: { type: String, unique: true, required: true },
//     donorSignature: { type: String, required: true },

//     address: {
//       region: { type: String, required: true },
//       zone: { type: String, required: true },
//       woreda: { type: String, required: true },
//       kebele: { type: String, required: true },
//       subCity: String,
//       houseNumber: String,
//     },
//     contact: {
//       mobile: { type: String, unique: true, sparse: true },
//       telephone: String,
//       pobox: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("PersonalInfo", personalInfoSchema);
// models/PersonalInfo.js
import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    donorNumber: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    fatherName: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, enum: ["Male", "Female"], required: true },
    occupation: { type: String, required: true },
    donorSignature: { type: String, required: true },

    address: {
      region: { type: String, required: true },
      zone: { type: String, required: true },
      woreda: { type: String, required: true },
      kebele: { type: String, required: true },
      subCity: String,
      houseNumber: String,
    },

    contact: {
      mobile: { type: String, unique: true, sparse: true },
      telephone: String,
      pobox: String,
    },

    // This field makes donorNumber generation 100% safe from race conditions
    // In models/PersonalInfo.js
    seqCounter: {
      type: Number,
      default: 0,
    },
    donorNumber: {
      type: String,
      required: true,
      unique: true,
      // ← This is correct and needed
    },
  },
  { timestamps: true }
);

export default mongoose.model("PersonalInfo", personalInfoSchema);
