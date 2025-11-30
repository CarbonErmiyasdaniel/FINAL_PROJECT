// // Example in a controller file (e.g., 'userController.js')
// import User from "../models/User.js"; // Assuming the provided schema is in userModel.js

// /**
//  * @desc Get the profile data for the current logged-in donor
//  * @route GET /api/v1/users/me
//  * @access Private (Donor/Authenticated)
//  */
// export const getDonorProfile = async (req, res, next) => {
//   try {
//     // 1. Get the user ID from the request object (assuming 'protect' middleware adds 'req.user')
//     const userId = req.user.id;

//     // 2. Find the user by ID
//     // We select('-__v') to exclude internal Mongoose fields and use the 'select: false' defaults
//     const user = await User.findById(userId).select("-__v");

//     // 3. Check if the user exists and their role is 'donor'
//     if (!user || user.role !== "donor") {
//       // If user is not found or is not a donor, create and pass a 404 error
//       const error = new Error(
//         "User not found or is not authorized as a donor."
//       );
//       error.statusCode = 404;
//       return next(error);
//     }

//     // 4. Send the successful response
//     res.status(200).json({
//       status: "success",
//       data: {
//         user: user,
//       },
//     });
//   } catch (err) {
//     // 5. Catch any operational or database errors and pass them to the global error handler
//     next(err);
//   }
// };
/////////
// Controllers/donorController.js
import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import Donation from "../models/Donation.js";

// GET /api/donor/me
export const getDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user || user.role !== "donor") {
      return res.status(404).json({ message: "Donor not found" });
    }

    const personalInfo = await PersonalInfo.findOne({ user: userId });

    const latestDonation = await Donation.findOne({
      personalInfo: personalInfo?._id,
    })
      .sort({ dateOfDonation: -1 })
      .select("dateOfDonation");

    let nextEligibleDate = null;
    let daysUntilNext = null;

    if (latestDonation) {
      const last = new Date(latestDonation.dateOfDonation);
      nextEligibleDate = new Date(last);
      nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3); // 90 days rule

      const diff = nextEligibleDate - new Date();
      daysUntilNext = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    const totalDonations = await Donation.countDocuments({
      personalInfo: personalInfo?._id,
    });

    res.json({
      success: true,
      data: {
        profile: {
          name:
            `${personalInfo?.firstName || ""} ${
              personalInfo?.fatherName || ""
            } ${personalInfo?.surname || ""}`.trim() || user.name,
          email: user.email,
          phone: personalInfo?.contact?.mobile || "-",
          donorNumber: personalInfo?.donorNumber || "Not assigned",
          bloodType: personalInfo?.aboRh || "Unknown",
          dateOfBirth: personalInfo?.dateOfBirth,
          sex: personalInfo?.sex,
          address: personalInfo?.address,
        },
        stats: {
          totalDonations,
          lastDonationDate: latestDonation?.dateOfDonation || null,
          nextEligibleDate,
          daysUntilNext,
          canDonateNow: !latestDonation || daysUntilNext === 0,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/donor/donations
export const getDonationHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const personalInfo = await PersonalInfo.findOne({ user: userId });
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }

    const donations = await Donation.find({
      personalInfo: personalInfo._id,
    })
      .sort({ dateOfDonation: -1 })
      .select(
        "dateOfDonation aboRh typeOfDonation quantity hemoglobinLevel bloodPressure notes isDeferred deferralReason"
      );

    res.json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
