// import asyncHandler from "express-async-handler";
// import PostCounselingQueue from "../models/PostCounselingQueue.js";
// import { sendDonorNotification } from "../utils/sendNotification.js";

// // GET /api/post-counselor/pending
// // export const getPendingNotifications = asyncHandler(async (req, res) => {
// //   const pending = await PostCounselingQueue.find({ notified: false })
// //     .populate({
// //       path: "donation",
// //       select: "aboRh testedAt donor",
// //       populate: { path: "donor", select: "phone" },
// //     })
// //     .select("donation hasReactiveResult createdAt")
// //     .sort({ createdAt: -1 })
// //     .lean();

// //   // Transform data: hide donor name, generate donation ID
// //   const sanitized = pending.map((item) => {
// //     const donationId = `DON-${item.donation._id
// //       .toString()
// //       .slice(-6)
// //       .toUpperCase()}`;
// //     const phone = item.donation.donor?.phone || null;

// //     return {
// //       _id: item._id,
// //       donationId,
// //       phone,
// //       aboRh: item.donation.aboRh,
// //       testedAt: item.donation.testedAt,
// //       hasReactiveResult: item.hasReactiveResult,
// //       createdAt: item.createdAt,
// //     };
// //   });

// //   res.json({ success: true, data: sanitized });
// // });
// // Controllers/postCounselorController.js

// export const getPendingNotifications = asyncHandler(async (req, res) => {
//   const pending = await PostCounselingQueue.find({ notified: false })
//     .populate({
//       path: "donation",
//       select: "aboRh testedAt dateOfDonation screeningTests",
//       populate: {
//         path: "personalInfo",
//         select: "user",
//         populate: {
//           path: "user",
//           select: "name phone",
//         },
//       },
//     })
//     .select("hasReactiveResult createdAt")
//     .sort({ createdAt: -1 })
//     .lean();

//   const sanitized = pending.map((item) => {
//     const donation = item.donation;
//     const donorUser = donation?.personalInfo?.user;

//     const donationId = `DON-${item.donation._id
//       .toString()
//       .slice(-6)
//       .toUpperCase()}`;

//     return {
//       _id: item._id,
//       donationId,
//       phone: donorUser?.phone || null,
//       name: donorUser?.name || "Donor", // Needed for SMS template
//       aboRh: donation.aboRh,
//       testedAt: donation.testedAt,
//       hasReactiveResult: item.hasReactiveResult,
//       screeningTests: donation.screeningTests || {},
//       createdAt: item.createdAt,
//     };
//   });

//   res.json({ success: true, data: sanitized });
// });
// // PATCH /api/post-counselor/:id/mark-sent
// // export const markAsNotified = asyncHandler(async (req, res) => {
// //   const queueItem = await PostCounselingQueue.findById(req.params.id).populate({
// //     path: "donation",
// //     populate: { path: "donor", select: "name phone" }, // Need name here for SMS
// //   });

// //   if (!queueItem || queueItem.notified) {
// //     return res
// //       .status(400)
// //       .json({ success: false, msg: "Invalid or already notified" });
// //   }

// //   const donation = queueItem.donation;
// //   const donor = donation.donor;
// //   const donationId = `DON-${donation._id.toString().slice(-6).toUpperCase()}`;

// //   // Send SMS (name is used only here — never exposed to frontend)
// //   const notificationResults = await sendDonorNotification(
// //     donor,
// //     donationId,
// //     queueItem.hasReactiveResult,
// //     donation.screeningTests
// //   );

// //   // Mark as sent
// //   queueItem.notified = true;
// //   queueItem.notifiedAt = new Date();
// //   queueItem.notifiedBy = req.user._id;
// //   queueItem.notificationLog = notificationResults;
// //   await queueItem.save();

// //   res.json({
// //     success: true,
// //     msg: "SMS sent successfully",
// //     sentVia: notificationResults,
// //   });
// // });
// Controllers/postCounselorController.js
// //pppppppppppppppppppppppppppppppppppppppppp
// import asyncHandler from "express-async-handler";
// import PostCounselingQueue from "../models/PostCounselingQueue.js";
// import { sendDonorNotification } from "../utils/sendNotification.js";
// import User from "../models/User.js";
// // GET /api/post-counselor/pending
// // Shows all donors waiting for test result SMS
// export const getPendingNotifications = asyncHandler(async (req, res) => {
//   const pending = await PostCounselingQueue.find({ notified: false })
//     .populate({
//       path: "donation",
//       select: "aboRh testedAt screeningTests dateOfDonation",
//       populate: {
//         path: "personalInfo",
//         populate: {
//           path: "user",
//           select: "name phone",
//         },
//       },
//     })
//     .select("hasReactiveResult createdAt")
//     .sort({ createdAt: -1 })
//     .lean();

//   const sanitized = pending.map((item) => {
//     const donor = item.donation?.personalInfo?.user;
//     const donationId = `DON-${item.donation._id
//       .toString()
//       .slice(-6)
//       .toUpperCase()}`;

//     return {
//       _id: item._id,
//       donationId,
//       phone: donor?.phone || null,
//       aboRh: item.donation.aboRh || "Unknown",
//       testedAt: item.donation.testedAt,
//       hasReactiveResult: item.hasReactiveResult,
//       createdAt: item.createdAt,
//     };
//   });

//   res.json({
//     success: true,
//     count: sanitized.length,
//     data: sanitized,
//   });
// });
// //ppppppppppppppppppppppppppppppppppppppppp
import asyncHandler from "express-async-handler";
import PostCounselingQueue from "../models/PostCounselingQueue.js";
import User from "../models/User.js";
import { sendDonorNotification } from "../utils/sendNotification.js";
export const getPendingNotifications = asyncHandler(async (req, res) => {
  const pending = await PostCounselingQueue.find({ notified: false })
    .populate({
      path: "donation",
      // Ensure 'aboRh' and 'dateOfDonation' are selected
      select: "aboRh testedAt screeningTests dateOfDonation",
      populate: {
        path: "personalInfo",
        populate: {
          path: "user",
          select: "name phone",
        },
      },
    })
    .select("hasReactiveResult createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const sanitized = pending.map((item) => {
    // Safely access donor information
    const donor = item.donation?.personalInfo?.user;

    // --- FIX APPLIED HERE: Safely access item.donation's _id ---
    const donationId = item.donation?._id
      ? `DON-${item.donation._id.toString().slice(-6).toUpperCase()}`
      : "N/A - Missing Donation";

    // Safely access aboRh and testedAt
    const aboRh = item.donation?.aboRh || "Unknown";
    const testedAt = item.donation?.testedAt;

    return {
      _id: item._id,
      donationId,
      phone: donor?.phone || null,
      aboRh,
      testedAt, // Now safely accessed
      hasReactiveResult: item.hasReactiveResult,
      createdAt: item.createdAt,
    };
  });

  res.json({
    success: true,
    count: sanitized.length,
    data: sanitized,
  });
});
// PATCH /api/post-counselor/:id/mark-sent
// Sends SMS and marks as notified
// export const markAsNotified = asyncHandler(async (req, res) => {
//   const queueItem = await PostCounselingQueue.findById(req.params.id).populate({
//     path: "donation",
//     select: "aboRh testedAt screeningTests",
//     populate: {
//       path: "personalInfo",
//       populate: {
//         path: "user",
//         select: "name phone",
//       },
//     },
//   });

//   // Basic checks
//   if (!queueItem) {
//     return res.status(404).json({
//       success: false,
//       msg: "Notification not found",
//     });
//   }

//   if (queueItem.notified) {
//     return res.status(400).json({
//       success: false,
//       msg: "SMS already sent for this donor",
//     });
//   }

//   const donation = queueItem.donation;
//   if (!donation || !donation.personalInfo || !donation.personalInfo.user) {
//     return res.status(400).json({
//       success: false,
//       msg: "Donor information not found",
//     });
//   }

//   const donor = donation.personalInfo.user;

//   if (!donor.phone) {
//     return res.status(400).json({
//       success: false,
//       msg: "Donor has no phone number. Cannot send SMS.",
//     });
//   }

//   const donationId = `DON-${donation._id.toString().slice(-6).toUpperCase()}`;

//   try {
//     // Send SMS via Twilio
//     const notificationResults = await sendDonorNotification(
//       donor, // { name, phone }
//       donationId,
//       queueItem.hasReactiveResult,
//       donation.screeningTests || {}
//     );

//     // Mark as successfully sent
//     queueItem.notified = true;
//     queueItem.notifiedAt = new Date();
//     queueItem.notifiedBy = req.user._id;
//     queueItem.notificationLog = notificationResults;

//     await queueItem.save();

//     res.json({
//       success: true,
//       msg: "SMS sent successfully!",
//       donationId,
//       phone: donor.phone,
//       result: queueItem.hasReactiveResult ? "REACTIVE" : "SAFE",
//       sentVia: notificationResults,
//     });
//   } catch (error) {
//     console.error("SMS Send Failed:", error.message);

//     res.status(500).json({
//       success: false,
//       msg: "Failed to send SMS. Twilio error or invalid number.",
//       error: error.message,
//     });
//   }
// });
export const markAsNotified = asyncHandler(async (req, res) => {
  const queueItem = await PostCounselingQueue.findById(req.params.id).populate({
    path: "donation",
    select: "aboRh testedAt screeningTests",
    populate: {
      path: "personalInfo",
      populate: {
        path: "user",
        select: "name phone",
      },
    },
  });

  // Basic checks
  if (!queueItem) {
    return res.status(404).json({
      success: false,
      msg: "Notification not found",
    });
  }

  if (queueItem.notified) {
    return res.status(400).json({
      success: false,
      msg: "SMS already sent for this donor",
    });
  }

  const donation = queueItem.donation;
  if (!donation || !donation.personalInfo || !donation.personalInfo.user) {
    return res.status(400).json({
      success: false,
      msg: "Donor information not found",
    });
  }

  const donor = donation.personalInfo.user;

  if (!donor.phone) {
    return res.status(400).json({
      success: false,
      msg: "Donor has no phone number. Cannot send SMS.",
    });
  }

  const donationId = `DON-${donation._id.toString().slice(-6).toUpperCase()}`;

  try {
    // Send SMS via Twilio
    const notificationResults = await sendDonorNotification(
      donor, // 1st argument: { name, phone }
      donationId, // 2nd argument
      queueItem.hasReactiveResult, // 3rd argument
      donation.screeningTests || {}, // 4th argument: screeningTests
      donation.aboRh // <--- 5th argument: THE BLOOD TYPE IS NOW CORRECTLY PASSED
    );

    // Mark as successfully sent
    queueItem.notified = true;
    queueItem.notifiedAt = new Date();
    queueItem.notifiedBy = req.user._id;
    queueItem.notificationLog = notificationResults;

    await queueItem.save();

    res.json({
      success: true,
      msg: "SMS sent successfully!",
      donationId,
      phone: donor.phone,
      result: queueItem.hasReactiveResult ? "REACTIVE" : "SAFE",
      sentVia: notificationResults,
    });
  } catch (error) {
    console.error("SMS Send Failed:", error.message);

    res.status(500).json({
      success: false,
      msg: "Failed to send SMS. Twilio error or invalid number.",
      error: error.message,
    });
  }
});

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
////////////////////////////////////////////////
////////////////////////////////
export const getFinalizedNotifications = asyncHandler(async (req, res) => {
  // 1. Validate the query parameter
  const { result } = req.query; // Get the filter from the URL query
  const validResults = ["Safe", "Unsafe"];

  if (!result || !validResults.includes(result)) {
    return res.status(400).json({
      success: false,
      msg: "Invalid or missing 'result' query parameter. Must be 'Safe' or 'Unsafe'.",
    });
  } // 2. Fetch data, filtering by finalResult and ensuring notification has happened

  const finalized = await PostCounselingQueue.find({
    notified: true, // Only show those who have been notified
    finalResult: result, // Filter by 'Safe' or 'Unsafe' as requested
  })
    .populate({
      path: "donation",
      select: "aboRh testedAt screeningTests dateOfDonation",
      populate: {
        path: "personalInfo",
        populate: {
          path: "user",
          select: "name phone",
        },
      },
    })
    .select(
      "hasReactiveResult finalResult notifiedAt notificationLog createdAt"
    )
    .sort({ notifiedAt: -1 })
    .lean(); // 3. Sanitize and structure the data for the response

  const sanitized = finalized.map((item) => {
    const donor = item.donation?.personalInfo?.user;

    // 🛑 FIX 1: Safely access _id using conditional logic/optional chaining
    const donationId = item.donation?._id
      ? `DON-${item.donation._id.toString().slice(-6).toUpperCase()}`
      : "N/A - Missing Donation"; // Placeholder for corrupted entry // Extracting relevant log info for display

    const latestLog =
      item.notificationLog?.find((log) => log.status === "sent") ||
      item.notificationLog?.[0] ||
      {};

    return {
      _id: item._id,
      donationId,
      phone: donor?.phone || null,
      name: donor?.name || "Unknown Donor",
      // 🛑 FIX 2: Safely access aboRh using optional chaining
      aboRh: item.donation?.aboRh || "Unknown",
      finalResult: item.finalResult,
      // 🛑 FIX 3: Safely access testedAt using optional chaining
      testedAt: item.donation?.testedAt,
      notifiedAt: item.notifiedAt,
      smsStatus: latestLog.status, // You can add more fields from notificationLog here if needed (e.g., latestLog.to)
    };
  }); // 4. Send the response

  res.json({
    success: true,
    count: sanitized.length,
    data: sanitized,
  });
});
