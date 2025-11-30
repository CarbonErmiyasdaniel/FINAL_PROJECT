// import express from "express";
// import { authDonor } from "../middleware/authMiddleware.js";
// import { getDonorProfile } from "../Controllers/donorController.js";

// const router = express.Router();
// ////////////// complited

// router.put("/me", authDonor, getDonorProfile);

// export default router;
// routes/donorRoutes.js
import express from "express";
import { authDonor } from "../middleware/authMiddleware.js";
import {
  getDonorProfile,
  getDonationHistory,
} from "../Controllers/donorController.js";

const router = express.Router();

// Protected routes - only logged-in donors
router.get("/me", authDonor, getDonorProfile);
router.get("/donations", authDonor, getDonationHistory);

export default router;
