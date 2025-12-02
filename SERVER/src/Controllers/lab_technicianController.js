import Donation from "../models/Donation.js";
import HospitalRequest from "../models/HospitalRequest.js";
import BloodInventory from "../models/BloodInventory.js";
import asyncHandler from "express-async-handler";
import PostCounselingQueue from "../models/PostCounselingQueue.js";
// GET: Hospital blood requests
export const getHospitalRequests = async (req, res) => {
  try {
    const requests = await HospitalRequest.find({})
      .populate("requestedBy", "name email phone hospitalName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (err) {
    console.error("Get hospital requests error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Controllers/lab_technicianController.js

export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const requestId = req.params.id;

  if (!["Fulfilled", "Rejected"].includes(status)) {
    return res.status(400).json({ success: false, msg: "Invalid status" });
  }

  try {
    const request = await HospitalRequest.findById(requestId).populate(
      "requestedBy",
      "name hospitalName"
    );

    if (!request) {
      return res.status(404).json({ success: false, msg: "Request not found" });
    }

    // If Rejected → just update status
    if (status === "Rejected") {
      request.status = "Rejected";
      request.processedBy = req.user._id;
      request.processedAt = new Date();
      await request.save();

      return res.json({
        success: true,
        msg: "Request rejected",
        data: request,
      });
    }

    // === FULFILL REQUEST – CHECK & ISSUE BLOOD ===
    if (status === "Fulfilled") {
      const { bloodType, quantityRequested } = request;

      // Find available bags of this blood type (oldest first)
      const availableBags = await BloodInventory.find({
        bloodType,
        status: "Available",
      }).sort({ collectionDate: 1 }); // FIFO

      const totalAvailable = availableBags.length;

      if (totalAvailable < quantityRequested) {
        return res.status(400).json({
          success: false,
          msg: `Not enough ${bloodType} blood! Only ${totalAvailable} bag(s) available, ${quantityRequested} requested.`,
        });
      }

      // Issue the required number of bags
      const bagsToIssue = availableBags.slice(0, quantityRequested);

      for (const bag of bagsToIssue) {
        bag.status = "Issued";
        bag.issuedTo = request._id;
        bag.issuedBy = req.user._id;
        bag.issuedAt = new Date();
        await bag.save();
      }

      // Update request
      request.status = "Fulfilled";
      request.processedBy = req.user._id;
      request.processedAt = new Date();
      await request.save();

      return res.json({
        success: true,
        msg: `Successfully issued ${quantityRequested} unit(s) of ${bloodType}`,
        issuedBags: bagsToIssue.length,
        data: request,
      });
    }
  } catch (err) {
    console.error("Update request status error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
// GET: Pending (not tested) donations — NO personal info leaked
export const getPendingDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ isTested: false })
      .select("-personalInfo -__v") // Hide donor personal info completely
      .populate("collectedBy", "name")
      .sort({ dateOfDonation: -1 });

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (err) {
    console.error("Get pending donations error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// GET: Already tested donations — safe to show results
export const getTestedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ isTested: true })
      .select("-personalInfo -__v")
      .populate("collectedBy", "name")
      .populate("testedBy", "name")
      .sort({ testedAt: -1 });

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (err) {
    console.error("Get tested donations error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// POST: Submit screening test results
// Controllers/lab_technicianController.js

// ← ADD THIS IMPORT

// Controllers/lab_technicianController.js

//
// controllers/labTechnicianController.js (or wherever your lab routes are)

// ← Added

export const submitTestResults = asyncHandler(async (req, res) => {
  const { screeningTests } = req.body;

  if (!screeningTests || typeof screeningTests !== "object") {
    return res.status(400).json({
      success: false,
      msg: "screeningTests object is required",
    });
  }

  let alreadyInInventory = false;

  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, msg: "Donation not found" });
    }

    if (donation.isTested) {
      return res
        .status(400)
        .json({ success: false, msg: "This unit was already tested" });
    }

    // Save test results
    donation.screeningTests = {
      hiv: screeningTests.hiv,
      hepatitisB: screeningTests.hepatitisB,
      hepatitisC: screeningTests.hepatitisC,
      syphilis: screeningTests.syphilis,
    };

    donation.testedBy = req.user._id;
    donation.testedAt = new Date();
    donation.isTested = true;

    // Determine Safe / Unsafe
    const hasIssue = Object.values(screeningTests).some((result) =>
      ["Positive", "Inconclusive"].includes(result)
    );
    donation.finalResult = hasIssue ? "Unsafe" : "Safe";

    await donation.save();

    // ADD TO INVENTORY IF SAFE
    if (donation.finalResult === "Safe") {
      const existing = await BloodInventory.findOne({ donation: donation._id });

      if (existing) {
        alreadyInInventory = true;
      } else {
        const expiryDate = new Date(donation.dateOfDonation);
        expiryDate.setDate(expiryDate.getDate() + 42);

        await BloodInventory.create({
          donation: donation._id,
          donationId: `DON-${donation._id.toString().slice(-6).toUpperCase()}`,
          bloodType: donation.aboRh,
          componentType: donation.typeOfDonation || "Whole Blood",
          volume: donation.quantity || 450,
          collectionDate: donation.dateOfDonation,
          expiryDate,
          testedBy: req.user._id,
          testedAt: donation.testedAt,
          status: "Available",
        });

        console.log(`Safe blood ${donation._id} added to inventory!`);
      }
    }

    // ADD TO POST-COUNSELING QUEUE (Safe OR Unsafe → must notify donor via SMS)
    try {
      await PostCounselingQueue.create({
        donation: donation._id,
        finalResult: donation.finalResult,
        hasReactiveResult: hasIssue,
      });
      console.log(`Donation ${donation._id} added to post-counseling queue`);
    } catch (queueErr) {
      console.error("Failed to add to post-counseling queue:", queueErr);
      // Don't fail the whole request — SMS will still be sent later by counselor
    }

    // Return clean response
    const safeDonation = await Donation.findById(donation._id)
      .select("-personalInfo -__v")
      .populate("testedBy", "name");

    return res.status(200).json({
      success: true,
      msg: "Test results submitted successfully",
      finalResult: donation.finalResult,
      addedToInventory: donation.finalResult === "Safe" && !alreadyInInventory,
      donation: safeDonation,
    });
  } catch (err) {
    console.error("Submit test results error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});
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

// Controllers/lab_technicianController.js
// ← Add this function at the bottom of your file

export const updateDonationBloodType = async (req, res) => {
  try {
    const { aboRh } = req.body;

    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (!aboRh || !validBloodTypes.includes(aboRh)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid or missing blood type. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",
      });
    }

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, msg: "Donation not found" });
    }

    // Only allow update if not yet tested (optional safety)
    if (donation.isTested) {
      return res.status(400).json({
        success: false,
        msg: "Cannot change blood type after testing is completed",
      });
    }

    donation.aboRh = aboRh;
    await donation.save();

    res.status(200).json({
      success: true,
      msg: "Blood type updated successfully",
      bloodType: aboRh,
    });
  } catch (err) {
    console.error("Update blood type error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
