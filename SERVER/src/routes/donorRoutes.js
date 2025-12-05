// // import express from "express";
// // import { authDonor } from "../middleware/authMiddleware.js";
// // import { getDonorProfile } from "../Controllers/donorController.js";

// // const router = express.Router();
// // ////////////// complited

// // router.put("/me", authDonor, getDonorProfile);

// // export default router;
// // routes/donorRoutes.js
// import express from "express";
// import { authDonor } from "../middleware/authMiddleware.js";
// import {
//   getDonorProfile,
//   getDonationHistory,
//   updateMyPhoto,
// } from "../Controllers/donorController.js";

// const router = express.Router();

// // Protected routes - only logged-in donors
// router.get("/me", authDonor, getDonorProfile);
// router.get("/donations", authDonor, getDonationHistory);
// router.patch("/photo", authDonor, updateMyPhoto);
// export default router;
import express from "express";
import { authDonor } from "../middleware/authMiddleware.js"; // Assuming you have this middleware
import {
  getMyProfile,
  updateMyPhoto,
  changeMyPassword,
} from "../Controllers/donorController.js";

// Assuming you have a file upload middleware (e.g., multer) configured for '/photo' routes
// For simplicity here, we assume the photo middleware is applied before updateMyPhoto
// Example: import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Protected routes - only logged-in donors
router.get("/me", authDonor, getMyProfile); // GET /api/donors/me

// Note: In a real app, this route needs file handling middleware (e.g., router.patch("/photo", authDonor, upload.single('photo'), updateMyPhoto))
router.patch("/photo", authDonor, updateMyPhoto); // PATCH /api/donors/photo
router.patch("/change-password", authDonor, changeMyPassword); // PATCH /api/donors/change-password

export default router;
