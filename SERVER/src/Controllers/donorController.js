// Example in a controller file (e.g., 'userController.js')
import User from "../models/User.js"; // Assuming the provided schema is in userModel.js

/**
 * @desc Get the profile data for the current logged-in donor
 * @route GET /api/v1/users/me
 * @access Private (Donor/Authenticated)
 */
export const getDonorProfile = async (req, res, next) => {
  try {
    // 1. Get the user ID from the request object (assuming 'protect' middleware adds 'req.user')
    const userId = req.user.id;

    // 2. Find the user by ID
    // We select('-__v') to exclude internal Mongoose fields and use the 'select: false' defaults
    const user = await User.findById(userId).select("-__v");

    // 3. Check if the user exists and their role is 'donor'
    if (!user || user.role !== "donor") {
      // If user is not found or is not a donor, create and pass a 404 error
      const error = new Error(
        "User not found or is not authorized as a donor."
      );
      error.statusCode = 404;
      return next(error);
    }

    // 4. Send the successful response
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    // 5. Catch any operational or database errors and pass them to the global error handler
    next(err);
  }
};
