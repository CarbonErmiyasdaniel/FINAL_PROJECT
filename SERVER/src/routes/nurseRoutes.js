import express from "express";
import { authNurse } from "../middleware/authMiddleware.js";
import {
  registerDonor,
  addDonation,
  getAllDonors,
  searchDonor,
  getDonorHistory,
  updateNurseProfile,
  updateNursePassword,
  logoutNurse,
  writeReport,
} from "../Controllers/nurseController.js";

const router = express.Router();

// Nurse-specific routes
router.post("/register-donor", authNurse, registerDonor);
router.post("/add-donation/:personalInfoId", authNurse, addDonation);
router.get("/donors", authNurse, getAllDonors);
router.get("/donors/search", authNurse, searchDonor);
router.get("/donors/:personalInfoId/history", authNurse, getDonorHistory);

// Nurse profile management
router.patch("/me", authNurse, updateNurseProfile);
router.patch("/update-password", authNurse, updateNursePassword);
router.post("/logout", authNurse, logoutNurse);

// Nurse reporting
router.post("/report", authNurse, writeReport);

export default router;
