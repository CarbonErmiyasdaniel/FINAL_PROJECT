import express from "express";
import { authAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getBloodInventory,
  getHospitalRequests,
  updateRequestStatus,
  getNurseActivityReports,
  getNurseReportById,
} from "../Controllers/adminController.js";

const router = express.Router();
////////////// complited
router.post("/createUser", authAdmin, createUser);
router.get("/getAllUsers", authAdmin, getAllUsers);
router.put("/users/:userId", authAdmin, updateUser);
router.delete("/users/:userId", authAdmin, deleteUser);
////////////////
// router.get("/inventory", authAdmin, getBloodInventory);
// router.get("/requests", authAdmin, getHospitalRequests);
// router.put("/requests/:requestId/status", authAdmin, updateRequestStatus);
router.get("/reports/nurse-activity", authAdmin, getNurseActivityReports);
router.get(
  "/reports/getNurseReportById/:reportId",
  authAdmin,
  getNurseReportById
);

export default router;
