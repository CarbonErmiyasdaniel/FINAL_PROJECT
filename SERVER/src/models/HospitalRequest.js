// // // models/HospitalRequest.js
// // import mongoose from "mongoose";

// // const hospitalRequestSchema = new mongoose.Schema({
// //   hospitalName: {
// //     type: String,
// //     required: true,
// //   },
// //   requestDate: {
// //     type: Date,
// //     required: true,
// //   },
// //   bloodType: {
// //     type: String,
// //     required: true,
// //   },
// //   quantityRequested: {
// //     type: Number,
// //     required: true,
// //   },
// //   status: {
// //     type: String,
// //     enum: ["Pending", "Fulfilled", "Rejected"],
// //     default: "Pending",
// //   },
// //   remarks: {
// //     type: String,
// //   },
// // });

// // const HospitalRequest = mongoose.model(
// //   "HospitalRequest",
// //   hospitalRequestSchema
// // );
// // export default HospitalRequest;

// // models/HospitalRequest.js
// import mongoose from "mongoose";

// const hospitalRequestSchema = new mongoose.Schema(
//   {
//     hospitalName: {
//       type: String,
//       required: true,
//     },
//     requestDate: {
//       type: Date,
//       required: true,
//     },
//     bloodType: {
//       type: String,
//       required: true,
//     },
//     quantityRequested: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Fulfilled", "Rejected"],
//       default: "Pending",
//     },
//     remarks: {
//       type: String,
//     },
//     rejectionReason: {
//       type: String,
//     },
//     processedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     processedAt: {
//       type: Date,
//     },
//     requestedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// const HospitalRequest = mongoose.model(
//   "HospitalRequest",
//   hospitalRequestSchema
// );
// export default HospitalRequest;

import mongoose from "mongoose";

const hospitalRequestSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true,
      index: true, // For hospital-wise filtering/search
    },
    requestDate: {
      type: Date,
      required: true,
      index: true, // For sorting by date
    },
    bloodType: {
      type: String,
      required: true,
      index: true, // Critical for blood matching
    },
    quantityRequested: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilled", "Rejected"],
      default: "Pending",
      index: true, // Most important filter
    },
    remarks: {
      type: String,
      trim: true,
    },
    rejectionReason: {
      type: String,
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true, // For admin who processed
    },
    processedAt: {
      type: Date,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // For "my requests" page
    },
  },
  {
    timestamps: true,
  }
);

// ———————————————— BEST COMPOUND INDEXES (Most Important!) ————————————————
// These make your queries 10x–100x faster
hospitalRequestSchema.index({ status: 1, requestDate: -1 }); // Admin dashboard: Pending + newest first
hospitalRequestSchema.index({ bloodType: 1, status: 1 }); // Find urgent blood needs fast
hospitalRequestSchema.index({ requestedBy: 1, requestDate: -1 }); // User's request history
hospitalRequestSchema.index({ hospitalName: 1, status: 1 }); // Hospital reports
hospitalRequestSchema.index({ status: 1, bloodType: 1, requestDate: -1 }); // Super fast urgent list

// Optional: Auto-expire old fulfilled/rejected requests after 180 days
// hospitalRequestSchema.index(
//   { processedAt: 1 },
//   {
//     expireAfterSeconds: 180 * 24 * 60 * 60,
//     partialFilterExpression: { status: { $in: ["Fulfilled", "Rejected"] } }
//   }
// );

const HospitalRequest = mongoose.model(
  "HospitalRequest",
  hospitalRequestSchema
);

export default HospitalRequest;
