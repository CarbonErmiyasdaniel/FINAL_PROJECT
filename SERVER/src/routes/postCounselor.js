// routes/postCounselor.js
import express from "express";
import {
  getPendingNotifications,
  markAsNotified,
} from "../Controllers/postCounselorController.js";
// Assume you have auth middleware
// import { protect, roleAuth } from "../middleware/auth.js"; // Adjust to your setup
import {
  authProtect,
  authPostCounselor,
} from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(authProtect);
router.use(authPostCounselor);
router.get("/pending", authPostCounselor, getPendingNotifications);
router.patch("/:id/mark-sent", authPostCounselor, markAsNotified);

export default router;
