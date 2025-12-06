import express from "express";
import { authDonor } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js"; /// Assuming you have this middleware
import {
  getMyProfile,
  updateMyPhoto,
  changeMyPassword,
  getDonorPersonalInfo,
  updateDonorPersonalInfo,
  getMyPersonalInfo,
  getDonationHistory,
} from "../Controllers/donorController.js";

const router = express.Router();

router.get("/me", authDonor, getMyProfile);
router.patch("/change-password", authDonor, changeMyPassword);
router.patch("/photo", authDonor, upload.single("photo"), updateMyPhoto);
router.get("/personal-info", authDonor, getDonorPersonalInfo);
router.patch("/personal-info", authDonor, updateDonorPersonalInfo);
router.get("/me/personal-info", authDonor, getMyPersonalInfo);
router.get("/me/history", authDonor, getDonationHistory);
export default router;
