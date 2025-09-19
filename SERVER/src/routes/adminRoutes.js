// import express from "express";
// // import User from "../models/User.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// // import BloodInventory from "../models/BloodInventory.js";
// // import HospitalRequest from "../models/HospitalRequest.js";
// // import NurseReport from "../models/NurseReport.js";
// const router = express.Router();
// import {
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
//   getBloodInventory,
//   getHospitalRequests,
//   updateRequestStatus,
//   getNurseActivityReports,
// } from "../Controllers/adminController.js";

// router.get("/users", authMiddleware, getAllUsers);
// router.post("/users", authMiddleware, createUser);
// router.put("/users/:userId", authMiddleware, updateUser);
// router.delete("/users/:userId", authMiddleware, deleteUser);
// router.get("/inventory", authMiddleware, getBloodInventory);
// router.get("/requests", authMiddleware, getHospitalRequests);
// router.put("/requests/:requestId/status", authMiddleware, updateRequestStatus);
// router.get("/reports/nurse-activity", authMiddleware, getNurseActivityReports);

// export default router;

// // ############################################################################
// // // @route   GET /api/admins/users
// // // @desc    Get all users (donors, nurses, and admins)
// // // @access  Private (Admin only)
// // router.get("/users", authMiddleware, async (req, res) => {
// //   // accept req from authMiddleware
// //   const user = req.user;
// //   // ...existing code...
// //   console.log(
// //     "AdminRoutes: Authenticated user:",
// //     JSON.stringify(user, null, 2)
// //   );
// //   // ...existing code...
// //   try {
// //     // Check if the authenticated user has the "admin" role
// //     if (user.role !== "admin") {
// //       return res.status(403).json({
// //         msg: "Access denied. Only administrators can perform this action.",
// //       });
// //     }

// //     // Find all users and select the id, email, and role fields
// //     const users = await User.find().select("email role");

// //     // Send the list of users as a JSON response
// //     res.json(users);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // @route   POST /api/admins/users
// // // @desc    Create a new user
// // // @access  Private (Admin only)
// // router.post("/users", authMiddleware, async (req, res) => {
// //   try {
// //     // Extract the user data from the request body
// //     const { name, email, password, role } = req.body;

// //     // Create a new user
// //     const newUser = new User({
// //       name,
// //       email,
// //       password,
// //       role,
// //     });

// //     // Save the new user to the database
// //     await newUser.save();

// //     // Return the created user as a response
// //     res.status(201).json({
// //       success: true,
// //       data: newUser,
// //     });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //     });
// //   }
// // });

// // // @route   PUT /api/admins/users/:userId
// // // @desc    Update a user
// // // @access  Private (Admin only)
// // router.put("/users/:userId", authMiddleware, async (req, res) => {
// //   try {
// //     // Extract the user ID from the request parameters
// //     const { userId } = req.params;

// //     // Extract the updated user data from the request body
// //     const { name, email, password, role } = req.body;

// //     // Find the user by ID and update the fields
// //     let updatedUser = await User.findByIdAndUpdate(
// //       userId,
// //       { name, email, password, role },
// //       { new: true, runValidators: true }
// //     );

// //     // If the user is not found, return a 404 error
// //     if (!updatedUser) {
// //       return res.status(404).json({ msg: "User not found" });
// //     }

// //     // Return the updated user as a response
// //     res.json(updatedUser);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // // @route   DELETE /api/admins/users/:userId
// // // @desc    Delete a user
// // // @access  Private (Admin only)
// // router.delete("/users/:userId", authMiddleware, async (req, res) => {
// //   try {
// //     // Extract the user ID from the request parameters
// //     const { userId } = req.params;

// //     // Find the user by ID and delete it
// //     const deletedUser = await User.findByIdAndDelete(userId);

// //     // If the user is not found, return a 404 error
// //     if (!deletedUser) {
// //       return res.status(404).json({ msg: "User not found" });
// //     }

// //     // Return a success message
// //     res.json({ msg: "User deleted" });
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // // // @route   GET /api/admins/users/:userId
// // // // @desc    Get a user
// // // // @access  Private (Admin only)
// // // router.get("/users/:userId", authMiddleware, async (req, res) => {
// // //   try {
// // //     // Extract the user ID from the request parameters
// // //     const { userId } = req.params;

// // //     // Find the user by ID and select the id, email, and role fields
// // //     const user = await User.findById(userId).select("email role");

// // //     // If the user is not found, return a 404 error
// // //     if (!user) {
// // //       return res.status(404).json({ msg: "User not found" });
// // //     }

// // //     // Return the user as a JSON response
// // //     res.json(user);
// // //   } catch (err) {
// // //     console.error(err.message);
// // //     res.status(500).json({ msg: "Server error" });
// // //   }
// // // });

// // // @route   GET /api/admin/inventory
// // // @desc    Get detailed blood inventory
// // // @access  Private (Admin only)
// // router.get("/inventory", authMiddleware, async (req, res) => {
// //   try {
// //     // Check if the authenticated user has the "admin" role
// //     if (req.user.role !== "admin") {
// //       return res.status(403).json({
// //         msg: "Access denied. Only administrators can access the blood inventory.",
// //       });
// //     }

// //     // Retrieve the detailed blood inventory
// //     const bloodInventory = await BloodInventory.find({}, { _id: 0, __v: 0 });

// //     // Return the blood inventory as a JSON response
// //     res.json(bloodInventory);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // // @route   GET /api/admin/requests
// // // @desc    Get all hospital requests
// // // @access  Private (Admin only)
// // router.get("/requests", authMiddleware, async (req, res) => {
// //   try {
// //     // Check if the authenticated user has the "admin" role
// //     if (req.user.role !== "admin") {
// //       return res.status(403).json({
// //         msg: "Access denied. Only administrators can access hospital requests.",
// //       });
// //     }

// //     // Retrieve all hospital requests
// //     const hospitalRequests = await HospitalRequest.find({}, { _id: 0, __v: 0 });

// //     // Return the hospital requests as a JSON response
// //     res.json(hospitalRequests);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // // @route   PUT /api/admin/requests/:requestId/status
// // // @desc    Update the status of a hospital request
// // // @access  Private (Admin only)
// // router.put("/requests/:requestId/status", authMiddleware, async (req, res) => {
// //   const { requestId } = req.params;
// //   const { status } = req.body;

// //   try {
// //     // Check if the authenticated user has the "admin" role
// //     if (req.user.role !== "admin") {
// //       return res.status(403).json({
// //         msg: "Access denied. Only administrators can update request status.",
// //       });
// //     }

// //     // Validate the status
// //     const validStatuses = ["Pending", "Fulfilled", "Rejected"];
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({
// //         msg: "Invalid status. Valid statuses are: Pending, Fulfilled, or Rejected.",
// //       });
// //     }

// //     // Find the hospital request by ID and update its status
// //     const updatedRequest = await HospitalRequest.findByIdAndUpdate(
// //       requestId,
// //       { status },
// //       { new: true, fields: { _id: 0, __v: 0 } } // Return the updated request without _id and __v
// //     );

// //     if (!updatedRequest) {
// //       return res.status(404).json({ msg: "Request not found." });
// //     }

// //     // Return the updated hospital request
// //     res.json(updatedRequest);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // // @route   GET /api/admin/reports/nurse-activity
// // // @desc    Get nurse activity reports
// // // @access  Private (Admin only)
// // router.get("/reports/nurse-activity", authMiddleware, async (req, res) => {
// //   try {
// //     // Check if the authenticated user has the "admin" role
// //     if (req.user.role !== "admin") {
// //       return res.status(403).json({
// //         msg: "Access denied. Only administrators can access nurse activity reports.",
// //       });
// //     }

// //     // Retrieve all nurse reports
// //     const nurseReports = await NurseReport.find(
// //       {},
// //       { _id: 0, __v: 0 }
// //     ).populate("nurseId", "name email"); // Assuming you want to show nurse name and email

// //     // Return the nurse reports as a JSON response
// //     res.json(nurseReports);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// // export default router;
// src/routes/adminRoutes.js
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
} from "../Controllers/adminController.js";

const router = express.Router();

router.get("/users", authAdmin, getAllUsers);
router.post("/users", authAdmin, createUser);
router.put("/users/:userId", authAdmin, updateUser);
router.delete("/users/:userId", authAdmin, deleteUser);
router.get("/inventory", authAdmin, getBloodInventory);
router.get("/requests", authAdmin, getHospitalRequests);
router.put("/requests/:requestId/status", authAdmin, updateRequestStatus);
router.get("/reports/nurse-activity", authAdmin, getNurseActivityReports);

export default router;
