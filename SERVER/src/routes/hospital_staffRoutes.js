import express from "express";
import { authHospitalStaff } from "../middleware/authMiddleware.js";
import { createHospitalRequest } from "../Controllers/hospital_staffRoutes_Controllers.js";

const router = express.Router();
////////////// complited

router.post("/Request", authHospitalStaff, createHospitalRequest);

export default router;
