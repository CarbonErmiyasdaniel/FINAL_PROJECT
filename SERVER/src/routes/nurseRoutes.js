import express from "express";
import { authNurse } from "../middleware/authMiddleware.js";
import {
  registerDonor,
  registerDonorInfo,
  registerDonation,
  getAllDonors,
  searchDonor,
  updateNurseAccount,
  // logoutNurse,
  // writeReport,
} from "../Controllers/nurseController.js";

const router = express.Router();

// Nurse-specific routes
router.post("/register-donor", authNurse, registerDonor);
router.post("/registerDonorInfo/:donorId", authNurse, registerDonorInfo);
router.post("/registerDonation/:donorId", authNurse, registerDonation);
router.get("/getAllDonors", authNurse, getAllDonors);
router.post("/searchDonor", authNurse, searchDonor);
router.patch("/updateNurseAccount", authNurse, updateNurseAccount);
// router.post("/addDonationRecord/:donorId", authNurse, addDonationRecord);

// router.get("/donors", authNurse, getAllDonors);
// router.get("/donors/search", authNurse, searchDonor);
// router.get("/donors/:personalInfoId/history", authNurse, getDonorHistory);

// // Nurse profile management
// router.patch("/me", authNurse, updateNurseProfile);
// router.patch("/update-password", authNurse, updateNursePassword);
// router.post("/logout", authNurse, logoutNurse);

// // Nurse reporting
// router.post("/report", authNurse, writeReport);

export default router;
