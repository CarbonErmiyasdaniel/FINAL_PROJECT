import express from "express";
import { authDonor } from "../middleware/authMiddleware.js";
import { getDonorProfile } from "../Controllers/donorController.js";

const router = express.Router();
////////////// complited

router.put("/me", authDonor, getDonorProfile);

export default router;
