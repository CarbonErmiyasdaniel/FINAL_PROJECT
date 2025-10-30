// src/Controllers/adminController.js

import User from "../models/User.js";
import BloodInventory from "../models/BloodInventory.js";
import HospitalRequest from "../models/HospitalRequest.js";
import NurseReport from "../models/NurseReport.js";
import bcrypt from "bcryptjs"; // Make sure you have this for password hashing

// @route   GET /api/admins/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("email role name");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const registeredBy = req.user._id;

    if (!registeredBy) {
      return res.status(401).json({ msg: "Authentication required." });
    }

    // Prevent admin from creating donors
    if (role === "donor") {
      return res
        .status(403)
        .json({ msg: "Admin is not allowed to register donor accounts." });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user (only staff roles allowed)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role, // allowed roles only (nurse, lab_technician, etc.)
      registeredBy,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Update a user
// @route   PUT /api/admins/users/:userId
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, role } = req.body;

    const updateFields = { name, email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admins/users/:userId
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Get detailed blood inventory
// @route   GET /api/admin/inventory
export const getBloodInventory = async (req, res) => {
  try {
    const bloodInventory = await BloodInventory.find({}, { _id: 0, __v: 0 });
    res.json(bloodInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Get all hospital requests
// @route   GET /api/admin/requests
export const getHospitalRequests = async (req, res) => {
  try {
    const hospitalRequests = await HospitalRequest.find({}, { _id: 0, __v: 0 });
    res.json(hospitalRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Update the status of a hospital request
// @route   PUT /api/admin/requests/:requestId/status
export const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ["Pending", "Fulfilled", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        msg: "Invalid status. Valid statuses are: Pending, Fulfilled, or Rejected.",
      });
    }

    const updatedRequest = await HospitalRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true, fields: { _id: 0, __v: 0 } }
    );

    if (!updatedRequest) {
      return res.status(404).json({ msg: "Request not found." });
    }

    res.json(updatedRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @desc    Get nurse activity reports
// @route   GET /api/admin/reports/nurse-activity

export const getNurseActivityReports = async (req, res) => {
  try {
    // Fetch all nurse reports and populate nurseId with name and email
    const nurseReports = await NurseReport.find(
      {},
      { _id: 0, __v: 0 }
    ).populate("nurseId", "name email"); // Populate nurseId with name and email

    // Check if reports were found
    if (!nurseReports || nurseReports.length === 0) {
      return res.status(404).json({ msg: "No reports found" });
    }

    // Return the list of nurse reports
    res.status(200).json(nurseReports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getNurseReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    // Fetch the nurse report by ID and populate nurseId with name and email
    const nurseReport = await NurseReport.findById(reportId).populate(
      "nurseId",
      "name email"
    ); // Populate nurseId with name and email

    if (!nurseReport) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.status(200).json(nurseReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
