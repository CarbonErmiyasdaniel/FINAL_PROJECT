// import HospitalRequest from "../models/HospitalRequest.js";

// /**
//  * @desc    Create a new hospital blood request
//  * @route   POST /api/hospital_staff/requests
//  * @access  Private (Hospital Staff)
//  */
// export const createHospitalRequest = async (req, res) => {
//   try {
//     const { hospitalName, requestDate, bloodType, quantityRequested, remarks } =
//       req.body;

//     // Validate hospital name (non-empty, non-whitespace)
//     if (
//       !hospitalName ||
//       typeof hospitalName !== "string" ||
//       hospitalName.trim().length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Hospital name is required and must be a non-empty string.",
//       });
//     }

//     // Validate request date
//     if (!requestDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Request date is required.",
//       });
//     }

//     const parsedDate = new Date(requestDate);
//     if (isNaN(parsedDate.getTime())) {
//       return res.status(400).json({
//         success: false,
//         message: "Request date must be a valid date.",
//       });
//     }

//     // Validate blood type
//     const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//     if (!bloodType || !validBloodTypes.includes(bloodType)) {
//       return res.status(400).json({
//         success: false,
//         message: `Blood type must be one of: ${validBloodTypes.join(", ")}.`,
//       });
//     }

//     // Validate quantity requested
//     if (!quantityRequested || typeof quantityRequested !== "number") {
//       return res.status(400).json({
//         success: false,
//         message: "Quantity requested is required and must be a number.",
//       });
//     }

//     if (!Number.isInteger(quantityRequested) || quantityRequested <= 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Quantity requested must be a positive integer greater than zero.",
//       });
//     }

//     //  Create new request
//     const newRequest = new HospitalRequest({
//       hospitalName: hospitalName.trim(),
//       requestDate: parsedDate,
//       bloodType,
//       quantityRequested,
//       remarks: remarks?.trim() || undefined,
//       requestedBy: req.user._id,
//     });

//     // Save to database
//     await newRequest.save();

//     console.log("Hospital request created successfully:", {
//       id: newRequest._id,
//       hospital: hospitalName,
//       bloodType,
//       quantity: quantityRequested,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Hospital request created successfully.",
//       data: newRequest,
//     });
//   } catch (error) {
//     console.error("Error creating hospital request:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error. Could not create hospital request.",
//     });
//   }
// };

// /**
//  * @desc    Get all requests made by the logged-in hospital staff
//  * @route   GET /api/hospital_staff/my-requests
//  * @access  Private (Hospital Staff)
//  */
// export const getMyRequests = async (req, res) => {
//   try {
//     const requests = await HospitalRequest.find({
//       requestedBy: req.user._id,
//     }).sort({ requestDate: -1 });

//     res.status(200).json({
//       success: true,
//       count: requests.length,
//       data: requests,
//     });
//   } catch (error) {
//     console.error("Error fetching requests:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
/////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Controllers/hospital_Controller.js
import User from "../models/User.js";
import HospitalRequest from "../models/HospitalRequest.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

/**
 * @desc    Create a new hospital blood request
 * @route   POST /api/hospital_staff/requests
 * @access  Private (Hospital Staff)
 */
export const createHospitalRequest = async (req, res) => {
  try {
    const { hospitalName, requestDate, bloodType, quantityRequested, remarks } =
      req.body;

    // Validate hospital name
    if (
      !hospitalName ||
      typeof hospitalName !== "string" ||
      hospitalName.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Hospital name is required and must be a non-empty string.",
      });
    }

    // Validate request date
    if (!requestDate) {
      return res.status(400).json({
        success: false,
        message: "Request date is required.",
      });
    }
    const parsedDate = new Date(requestDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Request date must be a valid date.",
      });
    }

    // Validate blood type
    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    if (!bloodType || !validBloodTypes.includes(bloodType)) {
      return res.status(400).json({
        success: false,
        message: `Blood type must be one of: ${validBloodTypes.join(", ")}.`,
      });
    }

    // Validate quantity
    if (!quantityRequested || typeof quantityRequested !== "number") {
      return res.status(400).json({
        success: false,
        message: "Quantity requested is required and must be a number.",
      });
    }
    if (!Number.isInteger(quantityRequested) || quantityRequested <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity requested must be a positive integer greater than zero.",
      });
    }

    const newRequest = new HospitalRequest({
      hospitalName: hospitalName.trim(),
      requestDate: parsedDate,
      bloodType,
      quantityRequested,
      remarks: remarks?.trim() || undefined,
      requestedBy: req.user._id,
    });

    await newRequest.save();

    console.log("Hospital request created:", {
      id: newRequest._id,
      hospital: hospitalName,
      bloodType,
      quantity: quantityRequested,
    });

    return res.status(201).json({
      success: true,
      message: "Hospital request created successfully.",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating hospital request:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not create hospital request.",
    });
  }
};

/**
 * @desc    Get all requests made by the logged-in hospital staff
 * @route   GET /api/hospital_staff/my-requests
 * @access  Private (Hospital Staff)
 */
export const getMyRequests = async (req, res) => {
  try {
    const requests = await HospitalRequest.find({
      requestedBy: req.user._id,
    }).sort({ requestDate: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Get logged-in staff profile
 * @route   GET /api/hospital_staff/me
 * @access  Private (Hospital Staff)
 */
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
