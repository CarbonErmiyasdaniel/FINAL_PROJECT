// // authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const authMiddleware = async (req, res, next) => {
//   // Get token from header
//   const token = req.header("x-auth-token");

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user by ID and populate the role field
//     const user = await User.findById(decoded.user.id).select("role");

//     // Check if the user has the "admin" role
//     if (user.role !== "admin") {
//       return res.status(403).json({
//         msg: "Access denied. Only administrators can perform this action.",
//       });
//     }

//     // Attach the user object to the request
//     req.user = user;

//     // Call the next middleware
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// const authNurse = async (req, res, next) => {
//   // Get token from header
//   const token = req.header("x-auth-token");

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user by ID and populate the role field
//     const user = await User.findById(decoded.user.id).select("role");

//     // Check if the user has the "admin" role
//     if (user.role !== "nurse") {
//       return res.status(403).json({
//         msg: "Access denied. Only administrators can perform this action.",
//       });
//     }

//     // Attach the user object to the request
//     req.user = user;

//     // Call the next middleware
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// export { authMiddleware, authNurse };
// src/middleware/authMiddleware.js
// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../models/TokenBlacklist.js";

// /**
//  * Middleware factory to authenticate users with a specific role.
//  * @param {string} requiredRole - The role the user must have to access the route.
//  * @returns {Function} Express middleware function.
//  */
const authenticate = (requiredRole) => async (req, res, next) => {
  let token;

  // Check for the token in the standard Authorization header (Bearer)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.header("x-auth-token")) {
    // Fallback to the custom x-auth-token header
    token = req.header("x-auth-token");
  }

  // If no token is found, authorization is denied
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Check if the token is blacklisted (e.g., after a logout)
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ msg: "Token is blacklisted, authorization denied" });
    }

    // Verify the token's authenticity and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Corrected line: Access the 'id' directly from the decoded payload
    const user = await User.findById(decoded.user.id).select("role");

    // Check if the user exists and has the required role
    if (!user || user.role !== requiredRole) {
      return res.status(403).json({
        msg: `Access denied. Only a ${requiredRole} can perform this action.`,
      });
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    // Handle invalid or expired tokens
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Export specific middleware functions for each role
export const authAdmin = authenticate("admin");
export const authNurse = authenticate("nurse");
