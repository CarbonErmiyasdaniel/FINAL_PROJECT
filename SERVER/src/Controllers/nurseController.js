// import mongoose from "mongoose";

import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import bcrypt from "bcryptjs";
// import DonorRecord from "../models/DonorRecord.js";
import Donation from "../models/Donation.js";
// import TokenBlacklist from "../models/TokenBlacklist.js";
// import NurseReport from "../models/NurseReport.js";
// Middleware to parse JSON request bodies

// @desc    Register a new donor
// @route   POST /api/nurses/donors
export const registerDonor = async (req, res) => {
  try {
    // Only extract necessary information from the request body.
    const { name, email, password } = req.body;
    const registeredBy = req.user._id; // Example: getting the nurse's ID from the authenticated user object.
    // A simple check to ensure we have the ID of the registering user.
    if (!registeredBy) {
      return res
        .status(401)
        .json({ msg: "Authentication required to register a donor." });
    }
    // Check if the donor already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user with the hardcoded 'donor' role and the registeredBy field
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "donor", // Role is automatically set to 'donor'
      registeredBy, // Store the ID of the nurse who registered this donor
    });
    // Save the new donor to the database
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// create a registerDonorInfo api to add personal info for a registered donor
export const registerDonorInfo = async (req, res) => {
  try {
    const donorId = req.params.donorId;
    // Check if a user with the provided donorId exists
    const donorUser = await User.findById(donorId);
    if (!donorUser) {
      return res.status(404).json({ msg: "Donor not found" });
    }
    // Prevent a user from having multiple personal info records
    const existingInfo = await PersonalInfo.findOne({ user: donorId });
    if (existingInfo) {
      return res
        .status(400)
        .json({ msg: "Personal information for this donor already exists" });
    }

    //  Extract contact from request body
    const { contact, ...otherFields } = req.body;

    // create new PersonalInfo document
    const newPersonalInfo = new PersonalInfo({
      user: donorId,
      ...otherFields,
      contact: {
        ...contact, // keep all other contact fields
        email: donorUser.email, // use actual email from User collection
      },
    });

    //  Save to DB
    await newPersonalInfo.save();

    res.status(201).json({
      success: true,
      data: newPersonalInfo,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
/////////////////////////////////////

export const registerDonation = async (req, res) => {
  try {
    const donorId = req.params.donorId;

    // Check if donor exists
    const donorUser = await User.findById(donorId);
    if (!donorUser) {
      return res.status(404).json({ msg: "Donor not found" });
    }

    // Check if PersonalInfo exists
    const personalInfo = await PersonalInfo.findOne({ user: donorId });
    if (!personalInfo) {
      return res
        .status(400)
        .json({ msg: "Donor personal information not found. Add it first." });
    }

    // 3-MONTH DONATION CHECK
    const lastDonation = await Donation.findOne({
      personalInfo: personalInfo._id,
    }).sort({ dateOfDonation: -1 }); // get most recent donation

    if (lastDonation) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      if (lastDonation.dateOfDonation > threeMonthsAgo) {
        const nextEligibleDate = new Date(lastDonation.dateOfDonation);
        nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3);

        return res.status(400).json({
          success: false,
          msg: `Donor is not eligible yet. Next donation allowed after ${nextEligibleDate.toDateString()}`,
        });
      }
    }

    // Extract donation info from request body
    const {
      bloodPressure,
      hemoglobinLevel,
      aboRh,
      typeOfDonation,
      quantity,
      isDeferred,
      deferralReason,
      notes,
    } = req.body || {};

    // Automatically set dateOfDonation to now if not provided
    const dateOfDonation = req.body?.dateOfDonation
      ? new Date(req.body.dateOfDonation)
      : new Date();

    // Create new donation
    const newDonation = new Donation({
      personalInfo: personalInfo._id,
      dateOfDonation,
      bloodPressure,
      hemoglobinLevel,
      aboRh,
      typeOfDonation,
      quantity,
      isDeferred,
      deferralReason,
      notes,
    });

    // Save to database
    await newDonation.save();

    res.status(201).json({
      success: true,
      data: newDonation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

////////////////////////////////////////////////////////
// export const registerDonation = async (req, res) => {
//   try {
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

// Get a list of all donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await PersonalInfo.find({})
      // .populate("personalInfo", "age gender address")
      .populate("user", "email name")
      .select("fatherName surname donorNumber contact.cellphone");
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Search for a single donor by various criteria?
export const searchDonor = async (req, res) => {
  try {
    const { phoneNumber, email, firstName, surname, donorNumber } = req.body;

    // Build query dynamically
    const query = {};
    if (phoneNumber) query["contact.cellphone"] = phoneNumber;
    if (email) query["contact.email"] = email;
    if (firstName) query.firstName = new RegExp(`^${firstName}$`, "i");
    if (surname) query.surname = new RegExp(`^${surname}$`, "i");
    if (donorNumber) query.donorNumber = donorNumber;

    // 1️⃣ Find donor info
    const donor = await PersonalInfo.findOne(query).populate(
      "user",
      "email name"
    );

    if (!donor) {
      return res.status(404).json({ msg: "Donor not found" });
    }

    // 2️⃣ Fetch related donations
    const donations = await Donation.find({ personalInfo: donor._id });

    // 3️⃣ Return combined response
    res.json({
      ...donor.toObject(),
      donations,
    });
  } catch (err) {
    console.error("Error searching donor:", err.message);
    res.status(500).send("Server error");
  }
};

// Update nurse profile OR password in one controller
export const updateNurseAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ========== PROFILE UPDATES ==========
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    // ========== PASSWORD UPDATES ==========
    if (
      req.body.oldPassword ||
      req.body.newPassword ||
      req.body.passwordConfirm
    ) {
      const { oldPassword, newPassword, passwordConfirm } = req.body;

      // check old password
      const isPasswordCorrect = await user.correctPassword(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ msg: "Incorrect old password" });
      }

      // confirm new passwords
      if (newPassword !== passwordConfirm) {
        return res.status(400).json({ msg: "New passwords do not match" });
      }

      user.password = newPassword;
      user.passwordConfirm = newPassword;
    }

    await user.save();

    // exclude password from response
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      msg: "Nurse account updated successfully",
      user: safeUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// // Log out a nurse
// export const logoutNurse = async (req, res) => {
//   try {
//     await TokenBlacklist.create({ token: req.token });
//     res.status(200).json({ msg: "Logged out successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Write a new nurse report
// export const writeReport = async (req, res) => {
//   try {
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
