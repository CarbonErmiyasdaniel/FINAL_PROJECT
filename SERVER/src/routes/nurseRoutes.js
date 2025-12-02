import express from "express";
import { authNurse } from "../middleware/authMiddleware.js";
import {
  registerDonor,
  getAllDonors_to_insert_information,
  registerDonorInfo,
  getDonorPersonalInfo,
  updateDonorInfo,
  registerDonation,
  writeReport,
  getLastDonation,
} from "../Controllers/nurseController.js";

const router = express.Router();

// Nurse-specific routes
router.post("/register-donor", authNurse, registerDonor);
router.get("/get_doners", authNurse, getAllDonors_to_insert_information);
router.post("/registerDonorInfo/:userId", authNurse, registerDonorInfo);
router.get("/donorInfo/:userId", authNurse, getDonorPersonalInfo); // NEW
router.put("/updateDonorInfo/:userId", authNurse, updateDonorInfo); // NEW
router.post("/registerDonation/:donorId", authNurse, registerDonation);
router.get("/lastDonation/:donorId", authNurse, getLastDonation);
router.post("/writeReport", authNurse, writeReport);

export default router;
