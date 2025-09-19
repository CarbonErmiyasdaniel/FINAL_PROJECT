import mongoose from "mongoose";
import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import DonorRecord from "../models/DonorRecord.js";
import Donation from "../models/Donation.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import NurseReport from "../models/NurseReport.js";

// Register a new donor
export const registerDonor = async (req, res) => {
  console.log("Received request body:", req.body);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password, name, personalInfo, donorRecord } = req.body;
    const newUser = await User.create(
      [{ name, email, password, role: "donor" }],
      { session }
    );
    const newPersonalInfo = await PersonalInfo.create(
      [{ ...personalInfo, user: newUser[0]._id }],
      { session }
    );
    const newDonorRecord = await DonorRecord.create(
      [{ ...donorRecord, personalInfo: newPersonalInfo[0]._id }],
      { session }
    );
    await PersonalInfo.findByIdAndUpdate(
      newPersonalInfo[0]._id,
      { donorRecords: newDonorRecord[0]._id },
      { session }
    );
    await session.commitTransaction();
    res.status(201).json({ msg: "Donor registered successfully" });
  } catch (err) {
    await session.abortTransaction();
    console.error(err.message);
    res.status(500).send("Server error");
  } finally {
    session.endSession();
  }
};

// Add a new donation for an existing donor
export const addDonation = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { personalInfoId } = req.params;
    const donorRecord = await DonorRecord.findOne({
      personalInfo: personalInfoId,
    }).session(session);
    if (!donorRecord) {
      return res.status(404).json({ msg: "Donor record not found" });
    }
    const newDonation = await Donation.create(
      [{ ...req.body, dateOfDonation: new Date() }],
      { session }
    );
    donorRecord.donationRecords.push(newDonation[0]._id);
    await donorRecord.save({ session });
    await session.commitTransaction();
    res.status(201).json({
      msg: "Donation record added successfully",
      donation: newDonation[0],
    });
  } catch (err) {
    await session.abortTransaction();
    console.error(err.message);
    res.status(500).send("Server error");
  } finally {
    session.endSession();
  }
};

// Get a list of all donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await PersonalInfo.find({})
      .populate("user", "email name")
      .populate("donorRecords", "aboRh donationRecords")
      .select("firstName fatherName surname donorNumber contact.cellphone");
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Search for a single donor
export const searchDonor = async (req, res) => {
  try {
    const { phoneNumber, email, firstName, surname, donorNumber } = req.query;
    const query = {};
    if (phoneNumber) query["contact.cellphone"] = phoneNumber;
    if (email) query["contact.email"] = email;
    if (firstName) query.firstName = new RegExp(`^${firstName}$`, "i");
    if (surname) query.surname = new RegExp(`^${surname}$`, "i");
    if (donorNumber) query.donorNumber = donorNumber;
    const donor = await PersonalInfo.findOne(query)
      .populate("user", "email")
      .populate({
        path: "donorRecords",
        populate: {
          path: "donationRecords",
          model: "Donation",
        },
      });
    if (!donor) return res.status(404).json({ msg: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a donor's full history by PersonalInfo ID
export const getDonorHistory = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findById(req.params.personalInfoId);
    if (!personalInfo || !personalInfo.donorRecords) {
      return res.status(404).json({ msg: "Donor record not found." });
    }
    const donorRecord = await DonorRecord.findById(
      personalInfo.donorRecords
    ).populate("donationRecords");
    if (!donorRecord) {
      return res.status(404).json({ msg: "Donor record not found." });
    }
    res.json(donorRecord.donationRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update the nurse's own profile
export const updateNurseProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password -active");
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "Nurse profile updated successfully", user: updatedUser });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update the nurse's own password
export const updateNursePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, passwordConfirm } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isPasswordCorrect = await user.correctPassword(
      oldPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Incorrect old password" });
    }
    if (newPassword !== passwordConfirm) {
      return res.status(400).json({ msg: "New passwords do not match" });
    }
    user.password = newPassword;
    user.passwordConfirm = newPassword;
    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Log out a nurse
export const logoutNurse = async (req, res) => {
  try {
    await TokenBlacklist.create({ token: req.token });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Write a new nurse report
export const writeReport = async (req, res) => {
  try {
    const { action, details } = req.body;
    const newReport = new NurseReport({
      nurseId: req.user._id,
      reportDate: new Date(),
      action,
      details,
    });
    await newReport.save();
    res
      .status(201)
      .json({ msg: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
