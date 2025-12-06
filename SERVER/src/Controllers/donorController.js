import User from "../models/User.js";

import PersonalInfo from "../models/PersonalInfo.js";
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

// Add this function to your Donor Controller file (e.g., donorController.js)
// Make sure to import the PersonalInfo model

/**
 * @desc    Get the personal information associated with the logged-in donor
 * @route   GET /api/donors/personal-info
 * @access  Private (Donor)
 */
export const getDonorPersonalInfo = async (req, res) => {
  try {
    // 1. Get the authenticated user's ID from the request object
    const donorId = req.user._id;

    // 2. Find the PersonalInfo document linked to this user ID
    const personalInfo = await PersonalInfo.findOne({ user: donorId }).select(
      "-__v -user -createdAt -updatedAt" // Exclude internal fields
    );

    if (!personalInfo) {
      return res.status(404).json({
        success: false,
        message:
          "Personal information not found. Please complete your profile.",
      });
    }

    // 3. Return the personal information data
    res.status(200).json({
      success: true,
      data: personalInfo,
    });
  } catch (error) {
    console.error("Error fetching donor personal info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Update donor's personal information
 * @route   PATCH /api/donors/personal-info
 * @access  Private (Donor)
 */
export const updateDonorPersonalInfo = async (req, res) => {
  try {
    const donorId = req.user._id;
    const updates = req.body;

    // Remove immutable fields to prevent accidental changes
    delete updates.donorNumber;
    delete updates.user;
    delete updates.seqCounter;

    // Find the PersonalInfo document and update it
    const personalInfo = await PersonalInfo.findOneAndUpdate(
      { user: donorId },
      { $set: updates }, // Use $set to update only the fields provided
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on the updated fields
        // upsert: true, // You might consider this if you want to create if it doesn't exist
      }
    ).select("-__v -user -createdAt -updatedAt");

    if (!personalInfo) {
      return res.status(404).json({
        success: false,
        message: "Personal information not found. Cannot update.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Personal information updated successfully.",
      data: personalInfo,
    });
  } catch (error) {
    // Handle validation errors (e.g., required fields missing) and other server errors
    console.error("Error updating donor personal info:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update personal info.",
    });
  }
};
////////////////////////////////////////

/**
 * @desc    Get donor's own personal information
 * @route   GET /api/donor/me/personal-info
 * @access  Private (Donor)
 */
export const getMyPersonalInfo = async (req, res) => {
  try {
    // 1. Get the PersonalInfo document using the logged-in user's ID
    const info = await PersonalInfo.findOne({ user: req.user._id });

    if (!info) {
      // A donor might not have personal info registered yet (if only registered via email/phone)
      return res.status(404).json({
        success: false,
        message:
          "Your personal information has not been registered yet. Please contact a nurse.",
        isRegistered: false,
      });
    }

    // 2. Format the data for the frontend
    // Note: DateOfBirth is formatted back to 'YYYY-MM-DD' for form display
    res.status(200).json({
      success: true,
      isRegistered: true,
      data: {
        donorNumber: info.donorNumber,
        title: info.title,
        fatherName: info.fatherName,
        surname: info.surname,
        dateOfBirth: info.dateOfBirth
          ? info.dateOfBirth.toISOString().split("T")[0]
          : null,
        sex: info.sex,
        occupation: info.occupation,
        donorSignature: info.donorSignature,
        address: info.address || {},
        contact: {
          mobile: info.contact?.mobile || null,
          telephone: info.contact?.telephone || null,
          pobox: info.contact?.pobox || null,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching donor info:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//////////////////////////
// controllers/donorController.js (Add this to the file from the previous response)

// Utility function to calculate the next eligible date (90 days/3 months rule)
const calculateNextEligibleDate = (lastDonationDate) => {
  if (!lastDonationDate) return null;

  const nextAllowed = new Date(lastDonationDate);
  // Add 3 months to the last donation date
  nextAllowed.setMonth(nextAllowed.getMonth() + 3);

  // We also use 90 days as a safe minimum, but 3 months is typical for Whole Blood
  // nextAllowed.setDate(nextAllowed.getDate() + 90);

  // Check if the calculated date is in the past, if so, the donor is currently eligible
  if (nextAllowed <= new Date()) {
    return { isEligible: true, nextDate: null, daysRemaining: 0 };
  }

  const today = new Date();
  const msRemaining = nextAllowed.getTime() - today.getTime();
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  return {
    isEligible: false,
    nextDate: nextAllowed.toISOString().split("T")[0],
    daysRemaining: daysRemaining,
  };
};

/**
 * @desc    Get donor's complete donation history and next eligibility
 * @route   GET /api/donor/me/history
 * @access  Private (Donor)
 */
export const getDonationHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Find the donor's PersonalInfo ID
    const personalInfo = await PersonalInfo.findOne({ user: userId }).select(
      "_id"
    );

    if (!personalInfo) {
      return res.status(404).json({
        success: false,
        message: "Please register your full personal details first.",
      });
    }

    const personalInfoId = personalInfo._id;

    // 2. Fetch all donations for this donor, sorted newest first
    const history = await Donation.find({ personalInfo: personalInfoId })
      .select(
        "dateOfDonation typeOfDonation quantity isDeferred deferralReason aboRh"
      )
      .sort({ dateOfDonation: -1 }) // Newest first
      .lean();

    // 3. Determine last donation date for eligibility calculation
    const lastDonation = history.length > 0 ? history[0] : null;
    const lastDonationDate = lastDonation ? lastDonation.dateOfDonation : null;

    // 4. Calculate eligibility
    const eligibility = calculateNextEligibleDate(lastDonationDate);

    res.status(200).json({
      success: true,
      history: history,
      eligibility: eligibility,
      message: eligibility.isEligible
        ? "You are currently eligible to donate."
        : null,
    });
  } catch (err) {
    console.error("Error fetching donation history:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
