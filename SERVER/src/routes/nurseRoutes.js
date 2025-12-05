import express from "express";
import upload from "../config/multer.js";
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
  getMyProfile,
  changeMyPassword,
  updateMyPhoto,
  updateUser,
  deleteUser,
} from "../Controllers/nurseController.js";

const router = express.Router();

// Nurse-specific routes
router.put("/users/:userId", authNurse, updateUser);
router.delete("/users/:userId", authNurse, deleteUser);
router.post("/register-donor", authNurse, registerDonor);
router.get("/get_doners", authNurse, getAllDonors_to_insert_information);
router.post("/registerDonorInfo/:userId", authNurse, registerDonorInfo);
router.get("/donorInfo/:userId", authNurse, getDonorPersonalInfo); // NEW
router.put("/updateDonorInfo/:userId", authNurse, updateDonorInfo); // NEW
router.post("/registerDonation/:donorId", authNurse, registerDonation);
router.get("/lastDonation/:donorId", authNurse, getLastDonation);
router.post("/writeReport", authNurse, writeReport);

router.get("/me", authNurse, getMyProfile);
router.patch("/change-password", authNurse, changeMyPassword);
router.patch("/photo", authNurse, upload.single("photo"), updateMyPhoto);

export default router;
