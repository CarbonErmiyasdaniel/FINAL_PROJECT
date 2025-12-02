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

import asyncHandler from "express-async-handler";
import PostCounselingQueue from "../models/PostCounselingQueue.js";
import { sendDonorNotification } from "../utils/sendNotification.js";

// GET /api/post-counselor/pending
// Shows all donors waiting for test result SMS
export const getPendingNotifications = asyncHandler(async (req, res) => {
  const pending = await PostCounselingQueue.find({ notified: false })
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
    .select("hasReactiveResult createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const sanitized = pending.map((item) => {
    const donor = item.donation?.personalInfo?.user;
    const donationId = `DON-${item.donation._id
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    return {
      _id: item._id,
      donationId,
      phone: donor?.phone || null,
      aboRh: item.donation.aboRh || "Unknown",
      testedAt: item.donation.testedAt,
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
      donor, // { name, phone }
      donationId,
      queueItem.hasReactiveResult,
      donation.screeningTests || {}
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
