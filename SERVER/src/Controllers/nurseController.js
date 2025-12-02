import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import Donation from "../models/Donation.js";
import NurseReport from "../models/NurseReport.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { generateDonorNumber } from "../utils/generateDonorNumber.js";
// ==================== REGISTER DONOR (unchanged) ====================
// export const registerDonor = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse")
//       return res.status(403).json({ success: false, msg: "Access denied" });

//     const { name, email, password } = req.body;
//     const registeredBy = req.user._id;

//     if (!name || !email || !password)
//       return res.status(400).json({ msg: "All fields required" });

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "Donor already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role: "donor",
//       registeredBy,
//     });

//     await user.save();
//     res.status(201).json({ success: true, data: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// ==================== REGISTER DONOR - BY EMAIL OR PHONE ====================
export const registerDonor = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { name, email, phone, password } = req.body;
    const registeredBy = req.user._id;

    // Must provide name and password
    if (!name || !password) {
      return res.status(400).json({ msg: "Name and password are required" });
    }

    // At least one of email or phone must be provided
    if (!email && !phone) {
      return res
        .status(400)
        .json({ msg: "Please provide either email or phone number" });
    }

    // Check for existing user by email (if provided)
    if (email) {
      const existingEmail = await User.findOne({
        email: email.toLowerCase(),
      });
      if (existingEmail) {
        return res.status(400).json({ msg: "Email already registered" });
      }
    }

    // Check for existing user by phone (if provided)
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({ msg: "Phone number already registered" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name.trim(),
      email: email ? email.toLowerCase() : undefined,
      phone: phone || undefined,
      password: hashedPassword,
      role: "donor",
      registeredBy,
    });

    await user.save();

    // Return safe data
    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      donor: {
        id: user._id,
        name: user.name,
        email: user.email || null,
        phone: user.phone || null,
      },
    });
  } catch (err) {
    console.error("Register donor error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ==================== GET ALL DONORS (BEST WAY - with populate) ====================
export const getAllDonors_to_insert_information = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const donors = await User.find({
      role: "donor",
      registeredBy: req.user._id,
    })
      .select("name email createdAt updatedAt")
      .populate("personalInfo", "title fatherName surname donorNumber") // This is magic
      .lean();

    // Add hasPersonalInfo flag
    const result = donors.map((d) => ({
      ...d,
      hasPersonalInfo: !!d.personalInfo,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const registerDonorInfo = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ message: "Access denied. Nurses only." });
    }

    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid donor ID" });
    }

    // Check if donor already has personal info
    const existing = await PersonalInfo.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({
        message: "Donor already registered",
        donorNumber: existing.donorNumber,
      });
    }

    // Generate safe donor number (atomic)
    const donorNumber = await generateDonorNumber();

    // Create personal info
    const personalInfo = await PersonalInfo.create({
      user: userId,
      donorNumber,
      title: req.body.title,
      fatherName: req.body.fatherName,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      sex: req.body.sex,
      occupation: req.body.occupation,
      donorSignature: req.body.donorSignature,
      address: req.body.address,
      contact: req.body.contact,
    });

    // Update user
    await User.findByIdAndUpdate(userId, {
      hasPersonalInfo: true,
      personalInfo: personalInfo._id,
    });

    const fullName =
      `${req.body.title} ${req.user.name} ${req.body.fatherName} ${req.body.surname}`.trim();

    res.status(201).json({
      success: true,
      message: "Donor registered successfully!",
      donorNumber,
      fullName,
    });
  } catch (err) {
    console.error("Register donor error:", err);

    // Handle duplicate donor number (very rare, but safe)
    if (err.code === 11000) {
      return res.status(500).json({
        message: "Donor number conflict. Please try again.",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
// ==================== GET ONE DONOR'S INFO (for Update page) ====================
export const getDonorPersonalInfo = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { userId } = req.params;
    const info = await PersonalInfo.findOne({ user: userId });

    if (!info)
      return res.status(404).json({ message: "Personal info not found" });

    res.json({
      title: info.title,
      fatherName: info.fatherName,
      surname: info.surname,
      dateOfBirth: info.dateOfBirth
        ? info.dateOfBirth.toISOString().split("T")[0]
        : "",
      sex: info.sex,
      occupation: info.occupation,
      donorSignature: info.donorSignature,
      address: info.address || {},
      contact: {
        mobile: info.contact?.mobile || "",
        telephone: info.contact?.telephone || "",
        pobox: info.contact?.pobox || "",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== UPDATE DONOR INFO (FIXED!) ====================
export const updateDonorInfo = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { userId } = req.params;

    const updates = {
      title: req.body.title,
      fatherName: req.body.fatherName,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      sex: req.body.sex,
      occupation: req.body.occupation,
      donorSignature: req.body.donorSignature,
      address: req.body.address,
      contact: req.body.contact,
    };

    const info = await PersonalInfo.findOneAndUpdate(
      { user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!info) return res.status(404).json({ message: "Donor info not found" });

    res.json({ success: true, message: "Updated successfully", data: info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== REGISTER DONATION (unchanged, good) ====================

// ---------- Register Donation (unchanged, only tiny cleanup) ----------
//
// controllers/nurseController.js
// nurseController.js
export const registerDonation = async (req, res) => {
  try {
    // 1. Nurse check
    if (!req.user || req.user.role !== "nurse") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Nurses only." });
    }

    const { donorId } = req.params;

    // 2. Validate donorId format FIRST (this prevents the CastError)
    if (
      !donorId ||
      donorId === "undefined" ||
      !/^[0-9a-fA-F]{24}$/.test(donorId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Donor ID. Please select a valid donor.",
      });
    }

    // 3. Now safe to query
    const donorUser = await User.findById(donorId);
    if (!donorUser) {
      return res
        .status(404)
        .json({ success: false, message: "Donor not found" });
    }

    const personalInfo = await PersonalInfo.findOne({ user: donorId });
    if (!personalInfo) {
      return res.status(400).json({
        success: false,
        message: "Donor has no personal info. Register first.",
      });
    }

    // 4. 3-Month Rule
    const lastDonation = await Donation.findOne({
      personalInfo: personalInfo._id,
    }).sort({ dateOfDonation: -1 });

    if (lastDonation) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      if (lastDonation.dateOfDonation > threeMonthsAgo) {
        const nextAllowed = new Date(lastDonation.dateOfDonation);
        nextAllowed.setMonth(nextAllowed.getMonth() + 3);

        return res.status(400).json({
          success: false,
          message: `Donor can donate again only after ${nextAllowed.toDateString()}`,
          nextEligibleDate: nextAllowed,
        });
      }
    }

    // 5. Create donation
    const newDonation = new Donation({
      personalInfo: personalInfo._id,
      dateOfDonation: req.body.dateOfDonation || new Date(),
      bloodPressure: req.body.bloodPressure || null,
      hemoglobinLevel: req.body.hemoglobinLevel
        ? Number(req.body.hemoglobinLevel)
        : null,
      aboRh: req.body.aboRh,
      typeOfDonation: req.body.typeOfDonation,
      quantity: req.body.quantity || 450,
      isDeferred: req.body.isDeferred || false,
      deferralReason: req.body.deferralReason || null,
      notes: req.body.notes || null,
    });

    await newDonation.save();

    const nextAllowed = new Date(newDonation.dateOfDonation);
    nextAllowed.setMonth(nextAllowed.getMonth() + 3);

    return res.status(201).json({
      success: true,
      message: "Donation registered successfully!",
      data: newDonation,
      nextEligibleDate: nextAllowed.toDateString(),
    });
  } catch (err) {
    console.error("Register Donation Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
// In your nurse routes file
export const getLastDonation = async (req, res) => {
  try {
    console.log("🔍 Fetching last donation for:", req.params.donorId);

    if (req.user.role !== "nurse") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const personalInfo = await PersonalInfo.findOne({
      user: req.params.donorId,
    });
    if (!personalInfo) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    const lastDonation = await Donation.findOne({
      personalInfo: personalInfo._id,
    })
      .sort({ dateOfDonation: -1 })
      .select("dateOfDonation typeOfDonation quantity")
      .lean();

    console.log("📋 Last donation result:", lastDonation);

    res.json({
      success: true,
      lastDonation: lastDonation || null,
    });
  } catch (error) {
    console.error("Error fetching last donation:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ---------- Write Report ----------
export const writeReport = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { action, details } = req.body;
    const report = new NurseReport({
      nurseId: req.user._id,
      action,
      details,
    });
    await report.save();
    res.status(201).json({ msg: "Report saved", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
