// import express from "express";
// import { authHospitalStaff } from "../middleware/authMiddleware.js";
// import {
//   createHospitalRequest,
//   getMyRequests,
// } from "../Controllers/hospital_Controller.js";

// const router = express.Router();

// // Hospital Staff routes
// router.post("/requests", authHospitalStaff, createHospitalRequest);
// router.get("/my-requests", authHospitalStaff, getMyRequests);

// export default router;
///////////\\\\\\\\\
// routes/hospital_staff_routes.js
import express from "express";
import { authHospitalStaff } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js"; // ← Make sure this file exists!

import {
  createHospitalRequest,
  getMyRequests,
  getMyProfile, // ← NEW
  changeMyPassword, // ← NEW
  updateMyPhoto, // ← NEW
} from "../Controllers/hospital_Controller.js";

const router = express.Router();

// ────── Existing Routes ──────
router.post("/requests", authHospitalStaff, createHospitalRequest);
router.get("/my-requests", authHospitalStaff, getMyRequests);

// ────── NEW Profile Routes ──────
router.get("/me", authHospitalStaff, getMyProfile);
router.patch("/change-password", authHospitalStaff, changeMyPassword);
router.patch(
  "/photo",
  authHospitalStaff,
  upload.single("photo"),
  updateMyPhoto
);

export default router;
