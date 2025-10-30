import HospitalRequest from "../models/HospitalRequest.js";

/**
 * @desc    Create a new hospital blood request
 * @route   POST /api/hospital-requests
 * @access  Public (or Protected)
 */
export const createHospitalRequest = async (req, res) => {
  try {
    const { hospitalName, requestDate, bloodType, quantityRequested, remarks } =
      req.body;

    //  Input validation
    if (!hospitalName || !requestDate || !bloodType || !quantityRequested) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }
    //  Create new request
    const newRequest = new HospitalRequest({
      hospitalName,
      requestDate,
      bloodType,
      quantityRequested,
      remarks,
    });

    // Save to database
    await newRequest.save();

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
