import express from "express";
import {
  authProtect,
  authLabTechnician,
} from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import {
  getHospitalRequests,
  updateRequestStatus,
  getPendingDonations,
  getTestedDonations,
  submitTestResults,
  getAvailableBloodStock,
  updateDonationBloodType,
  getFinalizedNotifications,
  getMyProfile,
  changeMyPassword,
  updateMyPhoto,
} from "../Controllers/lab_technicianController.js";

const router = express.Router();

// All routes require login
router.use(authProtect);

// All routes below require Lab Technician role
router.use(authLabTechnician);

// Hospital Requests
router.get("/hospital-requests", authLabTechnician, getHospitalRequests);
router.put(
  "/hospital-requests/:id/status",
  authLabTechnician,
  updateRequestStatus
); // Fixed: :id not :requestId
router.get("/inventory/stock", authLabTechnician, getAvailableBloodStock);
// Donations for testing
router.get("/finalized", authLabTechnician, getFinalizedNotifications);
router.get("/donations/pending", authLabTechnician, getPendingDonations);
router.get("/donations/tested", authLabTechnician, getTestedDonations);
router.post("/donations/:id/test", authLabTechnician, submitTestResults);
router.patch(
  "/donations/:id/bloodtype",
  authProtect,
  authLabTechnician,
  updateDonationBloodType
);
router.get("/me", authLabTechnician, getMyProfile);
router.patch("/change-password", authLabTechnician, changeMyPassword);
router.patch(
  "/photo",
  authLabTechnician,
  upload.single("photo"),
  updateMyPhoto
); // Changed to POST + fixed path
export default router;
