// // // Example in a controller file (e.g., 'userController.js')
// // import User from "../models/User.js"; // Assuming the provided schema is in userModel.js

// // /**
// //  * @desc Get the profile data for the current logged-in donor
// //  * @route GET /api/v1/users/me
// //  * @access Private (Donor/Authenticated)
// //  */
// // export const getDonorProfile = async (req, res, next) => {
// //   try {
// //     // 1. Get the user ID from the request object (assuming 'protect' middleware adds 'req.user')
// //     const userId = req.user.id;

// //     // 2. Find the user by ID
// //     // We select('-__v') to exclude internal Mongoose fields and use the 'select: false' defaults
// //     const user = await User.findById(userId).select("-__v");

// //     // 3. Check if the user exists and their role is 'donor'
// //     if (!user || user.role !== "donor") {
// //       // If user is not found or is not a donor, create and pass a 404 error
// //       const error = new Error(
// //         "User not found or is not authorized as a donor."
// //       );
// //       error.statusCode = 404;
// //       return next(error);
// //     }

// //     // 4. Send the successful response
// //     res.status(200).json({
// //       status: "success",
// //       data: {
// //         user: user,
// //       },
// //     });
// //   } catch (err) {
// //     // 5. Catch any operational or database errors and pass them to the global error handler
// //     next(err);
// //   }
// // };
// /////////
// // Controllers/donorController.js
// // import User from "../models/User.js";
// import PersonalInfo from "../models/PersonalInfo.js";
// import Donation from "../models/Donation.js";
// import bcrypt from "bcryptjs";
// import fs from "fs";
// import path from "path";

// /**
//  * @desc    Get logged-in donor profile and stats
//  * @route   GET /api/donors/me
//  * @access  Private (Donor)
//  */
// export const getDonorProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId).select("-password");
//     if (!user || user.role !== "donor") {
//       return res.status(404).json({ message: "Donor not found" });
//     }

//     const personalInfo = await PersonalInfo.findOne({ user: userId });

//     const latestDonation = await Donation.findOne({
//       personalInfo: personalInfo?._id,
//     })
//       .sort({ dateOfDonation: -1 })
//       .select("dateOfDonation");

//     let nextEligibleDate = null;
//     let daysUntilNext = null;

//     if (latestDonation) {
//       const last = new Date(latestDonation.dateOfDonation);
//       nextEligibleDate = new Date(last);
//       nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3); // Approx. 90 days rule

//       const diff = nextEligibleDate - new Date();
//       daysUntilNext = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
//     }

//     const totalDonations = await Donation.countDocuments({
//       personalInfo: personalInfo?._id,
//     });

//     res.json({
//       success: true,
//       data: {
//         profile: {
//           name:
//             `${personalInfo?.firstName || ""} ${
//               personalInfo?.fatherName || ""
//             } ${personalInfo?.surname || ""}`.trim() || user.name,
//           email: user.email,
//           phone: personalInfo?.contact?.mobile || "-",
//           donorNumber: personalInfo?.donorNumber || "Not assigned",
//           bloodType: personalInfo?.aboRh || "Unknown",
//           dateOfBirth: personalInfo?.dateOfBirth,
//           sex: personalInfo?.sex,
//           address: personalInfo?.address,
//         },
//         stats: {
//           totalDonations,
//           lastDonationDate: latestDonation?.dateOfDonation || null,
//           nextEligibleDate,
//           daysUntilNext,
//           canDonateNow: !latestDonation || daysUntilNext === 0,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching donor profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * @desc    Get logged-in donor's donation history
//  * @route   GET /api/donors/donations
//  * @access  Private (Donor)
//  */
// export const getDonationHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const personalInfo = await PersonalInfo.findOne({ user: userId });
//     if (!personalInfo) {
//       return res.status(404).json({ message: "Personal info not found" });
//     }

//     const donations = await Donation.find({
//       personalInfo: personalInfo._id,
//     })
//       .sort({ dateOfDonation: -1 })
//       .select(
//         "dateOfDonation aboRh typeOfDonation quantity hemoglobinLevel bloodPressure notes isDeferred deferralReason"
//       );

//     res.json({
//       success: true,
//       count: donations.length,
//       data: donations,
//     });
//   } catch (error) {
//     console.error("Error fetching donation history:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * @desc    Update donor's profile photo
//  * @route   PATCH /api/donors/photo
//  * @access  Private (Donor)
//  */
// export const updateMyPhoto = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload an image",
//       });
//     }

//     // Use req.user.id from the authentication middleware
//     const user = await User.findById(req.user.id);

//     // Delete old photo if exists
//     if (user.photo) {
//       const oldPath = path.join(
//         process.cwd(),
//         "uploads",
//         "profiles",
//         user.photo
//       );
//       if (fs.existsSync(oldPath)) {
//         fs.unlinkSync(oldPath);
//       }
//     }

//     // Save new photo
//     user.photo = req.file.filename;
//     await user.save();

//     const photoUrl = `${req.protocol}://${req.get("host")}/uploads/profiles/${
//       req.file.filename
//     }`;

//     res.status(200).json({
//       success: true,
//       message: "Profile photo updated successfully",
//       data: { photo: photoUrl },
//     });
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /**
//  * @desc    Change donor password
//  * @route   PATCH /api/donors/change-password
//  * @access  Private (Donor)
//  */
// export const changeMyPassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   if (!currentPassword || !newPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide currentPassword and newPassword",
//     });
//   }

//   if (newPassword.length < 6) {
//     return res.status(400).json({
//       success: false,
//       message: "New password must be at least 6 characters",
//     });
//   }

//   try {
//     // Note: req.user.id comes from the authDonor middleware
//     const user = await User.findById(req.user.id).select("+password");

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Current password is incorrect",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

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
