// routes/postCounselor.js
import express from "express";
import {
  getPendingNotifications,
  markAsNotified,
  getMyProfile,
  changeMyPassword,
  updateMyPhoto,
  getFinalizedNotifications,
} from "../Controllers/postCounselorController.js";
import upload from "../config/multer.js";
// Assume you have auth middleware
// import { protect, roleAuth } from "../middleware/auth.js"; // Adjust to your setup
import {
  authProtect,
  authPostCounselor,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(authProtect);
router.use(authPostCounselor);
router.get("/finalized", authPostCounselor, getFinalizedNotifications);
router.get("/pending", authPostCounselor, getPendingNotifications);
router.patch("/:id/mark-sent", authPostCounselor, markAsNotified);
router.get("/me", authPostCounselor, getMyProfile);
router.patch("/change-password", authPostCounselor, changeMyPassword);
router.patch(
  "/photo",
  authPostCounselor,
  upload.single("photo"),
  updateMyPhoto
);

export default router;

///////////////////////
// utils/sendNotification.js
