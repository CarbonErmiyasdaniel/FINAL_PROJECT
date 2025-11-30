// import User from "../models/User.js";
// import PersonalInfo from "../models/PersonalInfo.js";
// import bcrypt from "bcryptjs";
// import Donation from "../models/Donation.js";
// import NurseReport from "../models/NurseReport.js";
// // @desc    Register a new donor
// // @route   POST /api/nurses/donors
// export const registerDonor = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }
//     // Only extract necessary information from the request body.
//     const { name, email, password } = req.body;
//     const registeredBy = req.user._id; // Example: getting the nurse's ID from the authenticated user object.
//     // A simple check to ensure we have the ID of the registering user.
//     if (!registeredBy) {
//       return res
//         .status(401)
//         .json({ msg: "Authentication required to register a donor." });
//     }
//     // Check if the donor already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }
//     // Hash the password for security
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     // Create a new user with the hardcoded 'donor' role and the registeredBy field
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "donor", // Role is automatically set to 'donor'
//       registeredBy, // Store the ID of the nurse who registered this donor
//     });
//     // Save the new donor to the database
//     await newUser.save();
//     res.status(201).json({
//       success: true,
//       data: newUser,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
// /////////////////////////////////////////////////////////////

// export const getAllDonors_to_insert_information = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }

//     // 1. Fetch Donors and select all required fields.
//     // NOTE: I've added 'firstName' and 'surname' to the .select() list
//     // because your frontend component uses them in `formatName(donor)`.
//     const donors = await User.find({
//       role: "donor",
//       registeredBy: req.user.id,
//     })
//       .select("email name createdAt updatedAt") // <<< IMPORTANT: Added firstName and surname
//       .lean(); // Use .lean() for performance

//     // **CRITICAL FIX**: The premature 'res.json(donors);' must be removed here.
//     // The rest of the logic needs to run to check for PersonalInfo.

//     // 2. Extract donor IDs
//     const donorIds = donors.map((donor) => donor._id);

//     // 3. Find all PersonalInfo documents for these donors
//     const personalInfos = await PersonalInfo.find({
//       user: { $in: donorIds },
//     })
//       .select("user")
//       .lean();

//     // 4. Create a Map for quick lookup of existing PersonalInfo
//     const personalInfoMap = personalInfos.reduce((map, info) => {
//       map[info.user.toString()] = true;
//       return map;
//     }, {});

//     // 5. Merge the existence check into the donor list
//     const donorsWithInfoFlag = donors.map((donor) => ({
//       ...donor,
//       // Check the map and set the flag
//       hasPersonalInfo: !!personalInfoMap[donor._id.toString()],
//     }));

//     // 6. Return the FINAL augmented list only once.
//     res.status(200).json(donorsWithInfoFlag); // <<< This sends the response.
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// //////////////////////////////////////////////
// export const registerDonorInfo = async (req, res) => {
//   try {
//     // Only nurses can register donors
//     if (req.user.role !== "nurse") {
//       return res
//         .status(403)
//         .json({ success: false, message: "Access denied: Nurses only" });
//     }

//     const { userId } = req.params;

//     // Validate userId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid donor ID" });
//     }

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Prevent duplicate registration
//     const existing = await PersonalInfo.findOne({ user: userId });
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Donor already registered",
//         donorNumber: existing.donorNumber,
//       });
//     }

//     // Create new donor info
//     const personalInfo = new PersonalInfo({
//       user: userId,
//       ...req.body, // Contains: firstName, fatherName, surname, address, contact, donorSignature, etc.
//     });

//     await personalInfo.save();

//     return res.status(201).json({
//       success: true,
//       message: "Donor registered successfully at Debre Berhan Blood Bank",
//       data: {
//         donorNumber: personalInfo.donorNumber,
//         name: `${personalInfo.firstName || ""} ${
//           personalInfo.fatherName || ""
//         } ${personalInfo.surname || ""}`.trim(),
//         mobile: personalInfo.contact?.mobile,
//         region: personalInfo.address?.region,
//         zone: personalInfo.address?.zone,
//         woreda: personalInfo.address?.woreda,
//         kebele: personalInfo.address?.kebele,
//       },
//     });
//   } catch (error) {
//     console.error("Donor registration error:", error);

//     // Handle duplicate mobile number or donorNumber
//     if (error.code === 11000) {
//       const field = Object.keys(error.keyValue)[0];
//       const value = error.keyValue[field];

//       let message = "";
//       if (field === "contact.mobile") {
//         message = `This mobile number is already registered: ${value}`;
//       } else if (field === "donorNumber") {
//         message = `This donor number already exists: ${value}`;
//       } else {
//         message = `Duplicate value: ${value}`;
//       }

//       return res.status(400).json({
//         success: false,
//         message,
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Server error. Please try again later.",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };
// // Get donor number for display
// export const getDonorNumber = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }
//     const { donorId } = req.params;

//     // Check if donor exists
//     const donor = await User.findById(donorId);
//     if (!donor) return res.status(404).json({ msg: "Donor not found" });

//     // Check if donor already has personal info
//     const existingInfo = await PersonalInfo.findOne({ user: donorId });
//     if (existingInfo)
//       return res.json({ donorNumber: existingInfo.donorNumber });

//     // Generate new donor number
//     const today = new Date();
//     const gregorianYear = today.getFullYear();
//     const gregorianMonth = today.getMonth() + 1;
//     const ethYear = gregorianMonth > 8 ? gregorianYear - 7 : gregorianYear - 8;
//     const yearPrefix = ethYear.toString().slice(-2);

//     const lastDonor = await PersonalInfo.findOne({
//       donorNumber: { $regex: `^${yearPrefix}` },
//     }).sort({ donorNumber: -1 });

//     let newDonorNumber;
//     if (lastDonor) {
//       const lastSeq = parseInt(lastDonor.donorNumber.slice(2), 10) || 0;
//       newDonorNumber = yearPrefix + (lastSeq + 1).toString().padStart(4, "0");
//     } else {
//       newDonorNumber = yearPrefix + "0001";
//     }

//     res.json({ donorNumber: newDonorNumber });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // Register a new donation for a donor
// export const registerDonation = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }
//     const donorId = req.params.donorId;

//     // Check if donor exists
//     const donorUser = await User.findById(donorId);
//     if (!donorUser) {
//       return res.status(404).json({ msg: "Donor not found" });
//     }

//     // Check if PersonalInfo exists
//     const personalInfo = await PersonalInfo.findOne({ user: donorId });
//     if (!personalInfo) {
//       return res
//         .status(400)
//         .json({ msg: "Donor personal information not found. Add it first." });
//     }

//     // 3-MONTH DONATION CHECK
//     const lastDonation = await Donation.findOne({
//       personalInfo: personalInfo._id,
//     }).sort({ dateOfDonation: -1 }); // get most recent donation

//     if (lastDonation) {
//       const threeMonthsAgo = new Date();
//       threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

//       if (lastDonation.dateOfDonation > threeMonthsAgo) {
//         const nextEligibleDate = new Date(lastDonation.dateOfDonation);
//         nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3);

//         return res.status(400).json({
//           success: false,
//           msg: `Donor is not eligible yet. Next donation allowed after ${nextEligibleDate.toDateString()}`,
//         });
//       }
//     }

//     // Extract donation info from request body
//     const {
//       bloodPressure,
//       hemoglobinLevel,
//       aboRh,
//       typeOfDonation,
//       quantity,
//       isDeferred,
//       deferralReason,
//       notes,
//     } = req.body || {};

//     // Automatically set dateOfDonation to now if not provided
//     const dateOfDonation = req.body?.dateOfDonation
//       ? new Date(req.body.dateOfDonation)
//       : new Date();

//     // Create new donation
//     const newDonation = new Donation({
//       personalInfo: personalInfo._id,
//       dateOfDonation,
//       bloodPressure,
//       hemoglobinLevel,
//       aboRh,
//       typeOfDonation,
//       quantity,
//       isDeferred,
//       deferralReason,
//       notes,
//     });

//     // Save to database
//     await newDonation.save();

//     res.status(201).json({
//       success: true,
//       data: newDonation,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // // Write a new nurse report
// export const writeReport = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }
//     const { action, details } = req.body;
//     const newReport = new NurseReport({
//       nurseId: req.user._id,
//       reportDate: new Date(),
//       action,
//       details,
//     });
//     await newReport.save();
//     res
//       .status(201)
//       .json({ msg: "Report submitted successfully", report: newReport });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
////////////////////////////////////////////
// Controllers/nurseController.js
// import User from "../models/User.js";
// import PersonalInfo from "../models/PersonalInfo.js";
// import Donation from "../models/Donation.js";
// import NurseReport from "../models/NurseReport.js";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";

// // ---------- Register Donor (unchanged) ----------
// export const registerDonor = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ success: false, msg: "Access denied" });
//     }
//     const { name, email, password } = req.body;
//     const registeredBy = req.user._id;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "donor",
//       registeredBy,
//     });
//     await newUser.save();

//     res.status(201).json({ success: true, data: newUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ---------- Get donors for nurse (with hasPersonalInfo flag) ----------
// export const getAllDonors_to_insert_information = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse")
//       return res.status(403).json({ success: false, msg: "Access denied" });

//     const donors = await User.find({
//       role: "donor",
//       registeredBy: req.user._id,
//     })
//       .select("name email createdAt updatedAt")
//       .lean();

//     const donorIds = donors.map((d) => d._id);
//     const infos = await PersonalInfo.find({ user: { $in: donorIds } })
//       .select("user")
//       .lean();

//     const infoMap = infos.reduce((map, i) => {
//       map[i.user.toString()] = true;
//       return map;
//     }, {});

//     const result = donors.map((d) => ({
//       ...d,
//       hasPersonalInfo: !!infoMap[d._id.toString()],
//     }));

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ---------- Helper: generate donor number ----------
// const generateDonorNumber = async () => {
//   const today = new Date();
//   const gregMonth = today.getMonth() + 1; // 1-12
//   const ethYear =
//     gregMonth > 8 ? today.getFullYear() - 7 : today.getFullYear() - 8;
//   const prefix = ethYear.toString().slice(-2);

//   const last = await PersonalInfo.findOne({
//     donorNumber: { $regex: `^${prefix}` },
//   })
//     .sort({ donorNumber: -1 })
//     .select("donorNumber");

//   let seq = 1;
//   if (last) {
//     seq = parseInt(last.donorNumber.slice(2), 10) + 1;
//   }
//   return prefix + String(seq).padStart(4, "0");
// };

// export const registerDonorInfo = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const { userId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid donor ID" });
//     }

//     const user = await User.findById(userId).select("name");
//     if (!user) return res.status(404).json({ message: "Donor not found" });

//     const existing = await PersonalInfo.findOne({ user: userId });
//     if (existing) {
//       return res.status(400).json({
//         message: "Donor already registered",
//         donorNumber: existing.donorNumber,
//       });
//     }

//     const donorNumber = await generateDonorNumber();

//     const personalInfo = new PersonalInfo({
//       user: userId,
//       donorNumber,
//       title: req.body.title,
//       fatherName: req.body.fatherName,
//       surname: req.body.surname,
//       dateOfBirth: req.body.dateOfBirth,
//       sex: req.body.sex,
//       occupation: req.body.occupation,
//       donorSignature: req.body.donorSignature,
//       address: req.body.address,
//       contact: req.body.contact,
//     });

//     await personalInfo.save();

//     await User.findByIdAndUpdate(userId, { hasPersonalInfo: true });

//     const fullName =
//       `${req.body.title} ${user.name} ${req.body.fatherName} ${req.body.surname}`.trim();

//     res.status(201).json({
//       success: true,
//       message: "Donor registered successfully!",
//       donorNumber,
//       fullName,
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error. Try again." });
//   }
// };
// // ---------- Get one donor's personal info (for Update page) ----------
// export const getDonorPersonalInfo = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse")
//       return res.status(403).json({ success: false, msg: "Access denied" });

//     const { userId } = req.params;
//     const info = await PersonalInfo.findOne({ user: userId }).lean();
//     if (!info)
//       return res
//         .status(404)
//         .json({ success: false, message: "Personal info not found" });

//     // flatten for the form
//     res.json({
//       ...info,
//       fatherName: info.firstName, // form expects fatherName
//       contact: {
//         mobile: info.contact?.mobile || "",
//         telephone: info.contact?.telephone || "",
//         pobox: info.contact?.pobox || "",
//       },
//       address: info.address || {},
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ---------- Update personal info ----------
// export const updateDonorInfo = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse")
//       return res.status(403).json({ success: false, msg: "Access denied" });

//     const { userId } = req.params;
//     const updates = {
//       firstName: req.body.fatherName,
//       fatherName: req.body.fatherName,
//       surname: req.body.surname,
//       title: req.body.title,
//       dateOfBirth: req.body.dateOfBirth,
//       sex: req.body.sex,
//       occupation: req.body.occupation,
//       donorSignature: req.body.donorSignature,
//       address: req.body.address,
//       contact: req.body.contact,
//     };

//     const info = await PersonalInfo.findOneAndUpdate(
//       { user: userId },
//       updates,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!info)
//       return res.status(404).json({ message: "Personal info not found" });

//     res.json({ success: true, data: info });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import Donation from "../models/Donation.js";
import NurseReport from "../models/NurseReport.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { generateDonorNumber } from "../utils/generateDonorNumber.js";
// ==================== REGISTER DONOR (unchanged) ====================
export const registerDonor = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { name, email, password } = req.body;
    const registeredBy = req.user._id;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Donor already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "donor",
      registeredBy,
    });

    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
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

// ==================== GENERATE DONOR NUMBER (Ethiopian Calendar Style) ====================
// const generateDonorNumber = async () => {
//   const today = new Date();
//   const gregMonth = today.getMonth() + 1;
//   const ethYear =
//     gregMonth >= 9 ? today.getFullYear() - 7 : today.getFullYear() - 8;

//   const prefix = ethYear.toString().slice(-2); // e.g., "17" for 2017 EC

//   const last = await PersonalInfo.findOne({
//     donorNumber: { $regex: `^${prefix}` },
//   })
//     .sort({ donorNumber: -1 })
//     .select("donorNumber");

//   let seq = 1;
//   if (last && last.donorNumber) {
//     seq = parseInt(last.donorNumber.slice(2), 10) + 1;
//   }

//   return prefix + String(seq).padStart(4, "0"); // e.g., "170123"
// };

// ==================== REGISTER DONOR PERSONAL INFO (100% CORRECT) ====================
// export const registerDonorInfo = async (req, res) => {
//   try {
//     if (req.user.role !== "nurse")
//       return res.status(403).json({ message: "Access denied" });

//     const { userId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(userId))
//       return res.status(400).json({ message: "Invalid donor ID" });

//     const user = await User.findById(userId).select("name");
//     if (!user) return res.status(404).json({ message: "Donor not found" });

//     const existing = await PersonalInfo.findOne({ user: userId });
//     if (existing)
//       return res.status(400).json({
//         message: "Donor already has personal info",
//         donorNumber: existing.donorNumber,
//       });

//     const donorNumber = await generateDonorNumber();

//     const personalInfo = new PersonalInfo({
//       user: userId,
//       donorNumber,
//       title: req.body.title,
//       fatherName: req.body.fatherName,
//       surname: req.body.surname,
//       dateOfBirth: req.body.dateOfBirth,
//       sex: req.body.sex,
//       occupation: req.body.occupation,
//       donorSignature: req.body.donorSignature,
//       address: req.body.address,
//       contact: req.body.contact,
//     });

//     await personalInfo.save();
//     await User.findByIdAndUpdate(userId, { hasPersonalInfo: true });

//     const fullName =
//       `${req.body.title} ${user.name} ${req.body.fatherName} ${req.body.surname}`.trim();

//     res.status(201).json({
//       success: true,
//       message: "Donor registered successfully!",
//       donorNumber,
//       fullName,
//     });
//   } catch (err) {
//     console.error("Register donor info error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
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
export const registerDonation = async (req, res) => {
  try {
    if (req.user.role !== "nurse")
      return res.status(403).json({ success: false, msg: "Access denied" });

    const { donorId } = req.params;
    const donorUser = await User.findById(donorId);
    if (!donorUser) return res.status(404).json({ msg: "Donor not found" });

    const personalInfo = await PersonalInfo.findOne({ user: donorId });
    if (!personalInfo)
      return res.status(400).json({ msg: "Add personal info first" });

    // 3-month rule
    const last = await Donation.findOne({
      personalInfo: personalInfo._id,
    }).sort({
      dateOfDonation: -1,
    });
    if (last) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      if (last.dateOfDonation > threeMonthsAgo) {
        const next = new Date(last.dateOfDonation);
        next.setMonth(next.getMonth() + 3);
        return res.status(400).json({
          success: false,
          msg: `Next donation allowed after ${next.toDateString()}`,
        });
      }
    }

    const newDonation = new Donation({
      personalInfo: personalInfo._id,
      dateOfDonation: req.body.dateOfDonation || new Date(),
      ...req.body,
    });
    await newDonation.save();

    res.status(201).json({ success: true, data: newDonation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
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
