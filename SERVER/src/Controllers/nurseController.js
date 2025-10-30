import User from "../models/User.js";
import PersonalInfo from "../models/PersonalInfo.js";
import bcrypt from "bcryptjs";
import Donation from "../models/Donation.js";
import NurseReport from "../models/NurseReport.js";
// @desc    Register a new donor
// @route   POST /api/nurses/donors
export const registerDonor = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }
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
/////////////////////////////////////////////////////////////

export const getAllDonors_to_insert_information = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }

    // 1. Fetch Donors and select all required fields.
    // NOTE: I've added 'firstName' and 'surname' to the .select() list
    // because your frontend component uses them in `formatName(donor)`.
    const donors = await User.find({
      role: "donor",
      registeredBy: req.user.id,
    })
      .select("email name createdAt updatedAt") // <<< IMPORTANT: Added firstName and surname
      .lean(); // Use .lean() for performance

    // **CRITICAL FIX**: The premature 'res.json(donors);' must be removed here.
    // The rest of the logic needs to run to check for PersonalInfo.

    // 2. Extract donor IDs
    const donorIds = donors.map((donor) => donor._id);

    // 3. Find all PersonalInfo documents for these donors
    const personalInfos = await PersonalInfo.find({
      user: { $in: donorIds },
    })
      .select("user")
      .lean();

    // 4. Create a Map for quick lookup of existing PersonalInfo
    const personalInfoMap = personalInfos.reduce((map, info) => {
      map[info.user.toString()] = true;
      return map;
    }, {});

    // 5. Merge the existence check into the donor list
    const donorsWithInfoFlag = donors.map((donor) => ({
      ...donor,
      // Check the map and set the flag
      hasPersonalInfo: !!personalInfoMap[donor._id.toString()],
    }));

    // 6. Return the FINAL augmented list only once.
    res.status(200).json(donorsWithInfoFlag); // <<< This sends the response.
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
////////////////////////////////////////////////////////////

//  create a registerDonorInfo api to add personal info for a registered donor by  using id
// Server-Side Code (Node.js/Express)

// Assuming your model is defined like this (or similar):
// const User = require('../models/User');
// (or whatever your Donor/User model is called)

// @desc Register personal info by user ID
// @route POST /api/personal-info/:userId
// @access Private (Authenticated)
export const registerDonorInfo = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }
    const { userId } = req.params;

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingInfo = await PersonalInfo.findOne({ user: userId });
    if (existingInfo)
      return res.status(400).json({ message: "Personal info already exists" });

    const newInfo = new PersonalInfo({ user: userId, ...req.body });
    await newInfo.save();

    return res.status(201).json({
      message: "Personal information registered successfully",
      data: newInfo,
    });
  } catch (error) {
    console.error("Error registering personal info:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get donor number for display
export const getDonorNumber = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }
    const { donorId } = req.params;

    // Check if donor exists
    const donor = await User.findById(donorId);
    if (!donor) return res.status(404).json({ msg: "Donor not found" });

    // Check if donor already has personal info
    const existingInfo = await PersonalInfo.findOne({ user: donorId });
    if (existingInfo)
      return res.json({ donorNumber: existingInfo.donorNumber });

    // Generate new donor number
    const today = new Date();
    const gregorianYear = today.getFullYear();
    const gregorianMonth = today.getMonth() + 1;
    const ethYear = gregorianMonth > 8 ? gregorianYear - 7 : gregorianYear - 8;
    const yearPrefix = ethYear.toString().slice(-2);

    const lastDonor = await PersonalInfo.findOne({
      donorNumber: { $regex: `^${yearPrefix}` },
    }).sort({ donorNumber: -1 });

    let newDonorNumber;
    if (lastDonor) {
      const lastSeq = parseInt(lastDonor.donorNumber.slice(2), 10) || 0;
      newDonorNumber = yearPrefix + (lastSeq + 1).toString().padStart(4, "0");
    } else {
      newDonorNumber = yearPrefix + "0001";
    }

    res.json({ donorNumber: newDonorNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Assuming PersonalInfo and User models are already imported
// const PersonalInfo = require('../models/PersonalInfo');
// const User = require('../models/User');
// export const getAllDonorInfo = async (req, res) => {
// //////////////////////////////////////////////////////
//     // 1. Get the ID from the URL parameter (assuming the route is /api/donors/:id)
//     const personalInfoId = req.params.id;

//     // 2. Find the specific document by its ID in the PersonalInfo collection.
//     // We still use .populate('user', 'firstName lastName email')
//     // to include basic donor details from the User model.
//     const donorInfo = await PersonalInfo.findById(personalInfoId)
//       // Populate the related 'user' field with essential identifying details
//       .populate("user", ""); // Including first/last names and email

//     // 3. Check if the specific record was found
//     if (!donorInfo) {
//       return res
//         .status(404)
//         .json({ msg: "Donor personal information not found" });
//     }

//     // 4. Send the single record back to the frontend
//     res.status(200).json({
//       success: true,
//       data: donorInfo,
//     });
//   } catch (err) {
//     // Handle potential errors, including invalid MongoDB ID format
//     console.error(err.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error or invalid ID format",
//     });
//   }
// };

////////////////////////////////////////////////////////////
// export const getAllDonorInfo = async (req, res) => {
//   try {
//     // Find all documents in the PersonalInfo collection.
//     // .populate('user') tells Mongoose to replace the 'user' ID
//     // with the actual user document from the 'User' collection.
//     const allPersonalInfo = await PersonalInfo.find({})
//       .populate("user", " ") // Specify which fields from the User model to include
//       .sort({ createdAt: -1 }); // Optional: sort by creation date (newest first)

//     // Check if any records were found
//     if (!allPersonalInfo || allPersonalInfo.length === 0) {
//       return res
//         .status(404)
//         .json({ msg: "No donor personal information records found" });
//     }

//     // Send the data back to the frontend
//     res.status(200).json({
//       success: true,
//       count: allPersonalInfo.length,
//       data: allPersonalInfo,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
/////////////////////////

// export const updateDonorInfo = async (req, res) => {
//   try {
//     const donorId = req.params.donorId;
//     const updateFields = req.body;

//     // 1. Check if a user with the provided donorId exists (Optional but good for data integrity)
//     const donorUser = await User.findById(donorId);
//     if (!donorUser) {
//       return res.status(404).json({ msg: "Donor not found" });
//     }

//     // 2. Find the existing personal info record
//     // We update based on the donorId associated with the PersonalInfo document
//     let existingInfo = await PersonalInfo.findOne({ user: donorId });

//     if (!existingInfo) {
//       return res.status(404).json({
//         msg: "Personal information for this donor does not exist. Please register first.",
//       });
//     }

//     // 3. Prepare the update object and handle nested fields like 'contact'
//     const updatePayload = { ...updateFields };

//     // Handle nested 'contact' object updates safely
//     if (updateFields.contact) {
//       // Merge existing contact fields with new ones, BUT preserve the email from User model
//       // This is consistent with how you handled it in registerDonorInfo
//       const updatedContact = {
//         ...existingInfo.contact.toObject(), // Get existing contact fields
//         ...updateFields.contact, // Override with new contact fields from body
//         email: donorUser.email, // Ensure email remains consistent with the User model
//       };
//       updatePayload.contact = updatedContact;
//     }

//     // 4. Update the document in the database
//     // We use findOneAndUpdate to find the document and apply updates in one step.
//     const updatedInfo = await PersonalInfo.findOneAndUpdate(
//       { user: donorId }, // Find by the user field
//       { $set: updatePayload }, // Use $set to update fields
//       { new: true, runValidators: true } // Return the updated document ('new: true') and run schema validators
//     );

//     // 5. Respond with the updated document
//     res.status(200).json({
//       success: true,
//       data: updatedInfo,
//     });
//   } catch (err) {
//     console.error(err.message);
//     // Handle validation errors or other server issues
//     res.status(500).json({
//       success: false,
//       message: "Server error during update",
//     });
//   }
// };

/////////////////////////////////
export const registerDonation = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }
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

// Get a list of all donors
// export const getAllDonors = async (req, res) => {
//   try {
//     const donors = await PersonalInfo.find({})
//       // .populate("personalInfo", "age gender address")
//       .populate("user", "email name")
//       .select("fatherName surname donorNumber contact.cellphone");
//     res.json(donors);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// Search for a single donor by various criteria?
// export const searchDonor = async (req, res) => {
//   try {
//     const { phoneNumber, email, firstName, surname, donorNumber } = req.body;

//     // Build query dynamically
//     const query = {};
//     if (phoneNumber) query["contact.cellphone"] = phoneNumber;
//     if (email) query["contact.email"] = email;
//     if (firstName) query.firstName = new RegExp(`^${firstName}$`, "i");
//     if (surname) query.surname = new RegExp(`^${surname}$`, "i");
//     if (donorNumber) query.donorNumber = donorNumber;

//     // 1️⃣ Find donor info
//     const donor = await PersonalInfo.findOne(query).populate(
//       "user",
//       "email name"
//     );

//     if (!donor) {
//       return res.status(404).json({ msg: "Donor not found" });
//     }

//     // 2️⃣ Fetch related donations
//     const donations = await Donation.find({ personalInfo: donor._id });

//     // 3️⃣ Return combined response
//     res.json({
//       ...donor.toObject(),
//       donations,
//     });
//   } catch (err) {
//     console.error("Error searching donor:", err.message);
//     res.status(500).send("Server error");
//   }
// };

// // Update nurse profile OR password in one controller
// export const updateNurseAccount = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("+password");
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // ========== PROFILE UPDATES ==========
//     if (req.body.name) user.name = req.body.name;
//     if (req.body.email) user.email = req.body.email;

//     // ========== PASSWORD UPDATES ==========
//     if (
//       req.body.oldPassword ||
//       req.body.newPassword ||
//       req.body.passwordConfirm
//     ) {
//       const { oldPassword, newPassword, passwordConfirm } = req.body;

//       // check old password
//       const isPasswordCorrect = await user.correctPassword(
//         oldPassword,
//         user.password
//       );
//       if (!isPasswordCorrect) {
//         return res.status(401).json({ msg: "Incorrect old password" });
//       }

//       // confirm new passwords
//       if (newPassword !== passwordConfirm) {
//         return res.status(400).json({ msg: "New passwords do not match" });
//       }

//       user.password = newPassword;
//       user.passwordConfirm = newPassword;
//     }

//     await user.save();

//     // exclude password from response
//     const safeUser = user.toObject();
//     delete safeUser.password;

//     res.status(200).json({
//       msg: "Nurse account updated successfully",
//       user: safeUser,
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({ msg: "Email already exists" });
//     }
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

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
export const writeReport = async (req, res) => {
  try {
    if (req.user.role !== "nurse") {
      return res.status(403).json({ success: false, msg: "Access denied" });
    }
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
