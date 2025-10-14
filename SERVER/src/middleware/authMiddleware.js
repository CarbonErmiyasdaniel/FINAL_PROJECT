// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import TokenBlacklist from "../models/TokenBlacklist.js";

// // /**
// //  * Middleware factory to authenticate users with a specific role.
// //  * @param {string} requiredRole - The role the user must have to access the route.
// //  * @returns {Function} Express middleware function.
// //  */
// const authenticate = (requiredRole) => async (req, res, next) => {
//   let token;

//   // Check for the token in the standard Authorization header (Bearer)
//   //FIX: Check for token in the HTTP-only cookie first
//   if (req.cookies && req.cookies.jwt) {
//     token = req.cookies.jwt;
//   } else if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.header("x-auth-token")) {
//     // Fallback to the custom x-auth-token header
//     token = req.header("x-auth-token");
//   }

//   // If no token is found, authorization is denied
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     // Check if the token is blacklisted (e.g., after a logout)
//     const isBlacklisted = await TokenBlacklist.findOne({ token });
//     if (isBlacklisted) {
//       return res
//         .status(401)
//         .json({ msg: "Token is blacklisted, authorization denied" });
//     }

//     // Verify the token's authenticity and decode the payload
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Corrected line: Access the 'id' directly from the decoded payload
//     const user = await User.findById(decoded.user.id).select("role");

//     // Check if the user exists and has the required role
//     if (!user || user.role !== requiredRole) {
//       return res.status(403).json({
//         msg: `Access denied. Only a ${requiredRole} can perform this action.`,
//       });
//     }

//     // Attach the user and token to the request object
//     req.user = user;
//     req.token = token;

//     next();
//   } catch (err) {
//     // Handle invalid or expired tokens
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// // Export specific middleware functions for each role
// export const authAdmin = authenticate("admin");
// export const authNurse = authenticate("nurse");

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../models/TokenBlacklist.js";

// -----------------------------------------------------------------
// ROLE-SPECIFIC AUTHENTICATION FACTORY (Original Code)
// -----------------------------------------------------------------

/**
 * Middleware factory to authenticate users with a specific role.
 * @param {string} requiredRole - The role the user must have to access the route.
 * @returns {Function} Express middleware function.
 */
const authenticate = (requiredRole) => async (req, res, next) => {
  let token;

  // Check for the token in the standard Authorization header (Bearer)
  //FIX: Check for token in the HTTP-only cookie first
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
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

// -----------------------------------------------------------------
// GENERIC AUTHENTICATION MIDDLEWARE (New Code)
// -----------------------------------------------------------------

/**
 * Middleware to authenticate any logged-in user.
 * It checks token validity but IGNORES the user role.
 * @returns {Function} Express middleware function.
 */
export const authProtect = async (req, res, next) => {
  let token;

  // Check for the token in the HTTP-only cookie first
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.header("x-auth-token")) {
    // Fallback to the custom x-auth-token header
    token = req.header("x-auth-token");
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // 1. Check if the token is blacklisted
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ msg: "Token is blacklisted, authorization denied" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user (only to confirm they still exist)
    const user = await User.findById(decoded.user.id).select("role");

    if (!user) {
      return res
        .status(401)
        .json({ msg: "User associated with token no longer exists." });
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token; // IMPORTANT: This is the token we need to blacklist

    next();
  } catch (err) {
    // Handle invalid or expired tokens
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// -----------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------

// Export specific middleware functions for each role (Original Exports)
export const authAdmin = authenticate("admin");
export const authNurse = authenticate("nurse");
// authProtect is also exported above.
