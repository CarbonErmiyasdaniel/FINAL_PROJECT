// src/Controllers/adminController.js

import User from "../models/User.js";
import BloodInventory from "../models/BloodInventory.js";
import HospitalRequest from "../models/HospitalRequest.js";
import NurseReport from "../models/NurseReport.js";
import bcrypt from "bcryptjs";
import Donation from "../models/Donation.js";
import PostCounselingQueue from "../models/PostCounselingQueue.js";
import asyncHandler from "express-async-handler"; // Make sure you have this for password hashing
import fs from "fs";
import path from "path";
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
    const { name, email, password, role, phone } = req.body;

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

// Controllers/adminAnalyticsController.js

// 1. Main Dashboard Overview
export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [requests, stock, donations, queue] = await Promise.all([
    HospitalRequest.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          fulfilled: {
            $sum: { $cond: [{ $eq: ["$status", "Fulfilled"] }, 1, 0] },
          },
        },
      },
    ]),
    BloodInventory.aggregate([
      { $match: { status: "Available" } },
      { $group: { _id: "$bloodType", count: { $sum: 1 } } },
    ]),
    Donation.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    PostCounselingQueue.countDocuments({ notified: false }),
  ]);

  const stockMap = stock.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    { "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0 }
  );

  res.json({
    success: true,
    data: {
      monthlyRequests: requests[0]?.total || 0,
      fulfilledRequests: requests[0]?.fulfilled || 0,
      pendingNotifications: queue,
      totalDonationsLast30Days: donations,
      currentStock: stockMap,
      criticalTypes: Object.entries(stockMap)
        .filter(([_, count]) => count < 5)
        .map(([type]) => type),
    },
  });
});

// 2. Blood Stock Summary
export const getBloodStockSummary = asyncHandler(async (req, res) => {
  const stock = await BloodInventory.aggregate([
    { $match: { status: "Available" } },
    {
      $group: {
        _id: "$bloodType",
        bags: { $sum: 1 },
        totalVolume: { $sum: "$volume" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const map = {};
  ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].forEach((t) => {
    const found = stock.find((s) => s._id === t);
    map[t] = found ? found.bags : 0;
  });

  res.json({ success: true, stock: map });
});

// 3. Request Analytics
export const getRequestAnalytics = asyncHandler(async (req, res) => {
  const stats = await HospitalRequest.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const map = { Pending: 0, Fulfilled: 0, Rejected: 0 };
  stats.forEach((s) => {
    map[s._id] = s.count;
  });

  res.json({ success: true, ...map });
});

// 4. Test Result Analytics
export const getTestResultAnalytics = asyncHandler(async (req, res) => {
  const result = await Donation.aggregate([
    { $match: { isTested: true } },
    {
      $group: {
        _id: "$finalResult",
        count: { $sum: 1 },
      },
    },
  ]);

  const safe = result.find((r) => r._id === "Safe")?.count || 0;
  const unsafe = result.find((r) => r._id === "Unsafe")?.count || 0;

  res.json({
    success: true,
    safe,
    unsafe,
    safePercentage:
      unsafe + safe > 0 ? ((safe / (safe + unsafe)) * 100).toFixed(1) : 0,
  });
});
////////////////////////////////////////////////////////

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const profilePhoto = user.photo
      ? `${req.protocol}://${req.get("host")}/uploads/profiles/${user.photo}`
      : null;

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: profilePhoto,
        hospitalName: user.hospitalName || null,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Change password
 * @route   PATCH /api/hospital_staff/change-password
 * @access  Private (Hospital Staff)
 */
export const changeMyPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide currentPassword and newPassword",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 6 characters",
    });
  }

  try {
    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Update profile photo
 * @route   PATCH /api/hospital_staff/photo
 * @access  Private (Hospital Staff)
 */
export const updateMyPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const user = await User.findById(req.user._id);

    // Delete old photo if exists
    if (user.photo) {
      const oldPath = path.join(
        process.cwd(),
        "uploads",
        "profiles",
        user.photo
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Save new photo
    user.photo = req.file.filename;
    await user.save();

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/profiles/${
      req.file.filename
    }`;

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      data: { photo: photoUrl },
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAvailableBloodStock = async (req, res) => {
  try {
    const stock = await BloodInventory.aggregate([
      {
        $match: { status: "Available" },
      },
      {
        $group: {
          _id: "$bloodType",
          totalBags: { $sum: 1 },
          totalVolume: { $sum: "$volume" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Convert to object format: { "A+": 5, "O-": 3, ... }
    const stockMap = {};
    const allTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    allTypes.forEach((type) => {
      const found = stock.find((s) => s._id === type);
      stockMap[type] = found ? found.totalBags : 0;
    });

    res.json({
      success: true,
      stock: stockMap,
      details: await BloodInventory.find({ status: "Available" })
        .populate("testedBy", "name")
        .sort({ collectionDate: -1 }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
