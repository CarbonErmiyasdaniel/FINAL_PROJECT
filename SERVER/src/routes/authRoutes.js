// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import SystemConfig from "../models/SystemConfig.js";
// import sendEmail from "../utils/sendEmail.js";
// import crypto from "crypto";
// import { authProtect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // @route   POST /api/auth/register
// // @desc    Register a new user
// // @access  Public

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingAdmin = await User.findOne({ role: "admin" });
//     const cfg = await SystemConfig.findOne();
//     const canSeed = !existingAdmin && !(cfg && cfg.adminCreated);

//     if (!canSeed) {
//       console.log(
//         "Seed not needed: admin exists or bootstrap already completed."
//       );
//       // process.exit(0);
//       return res.status(400).json({ msg: " admin already exists" });
//     }

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(12); // 12 rounds
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user with hashed password
//     user = new User({ email, password: hashedPassword });

//     // Save the user
//     await user.save();

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// // @route   POST /api/auth/login
// // @desc    Authenticate user and get token
// // @access  Public
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists and select the password field
//     let user = await User.findOne({ email }).select("+password");

//     // If user doesn't exist, return an error
//     if (!user) {
//       console.log("Login failed for user:", email);
//       return res.status(400).json({ msg: " user not found" });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password mismatch for user:", email);
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // Prepare the payload for the JWT
//     const payload = {
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name,
//       },
//     };

//     // Check if JWT_SECRET is available
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not set. Cannot create token.");
//       return res.status(500).json({ msg: "Server configuration error" });
//     }

//     // Sign the JWT and send it in the response
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       // 15 seconds for testing, change to 24h in production
//       { expiresIn: 12 * 60 * 60 }, // Token expires in 12 hours

//       (err, token) => {
//         if (err) throw err;
//         // FIX A: Set the JWT as a secure, HTTP-only cookie
//         res.cookie("jwt", token, {
//           httpOnly: true, // Prevents client-side JS (XSS) from reading the token
//           secure: process.env.NODE_ENV === "production", // Use only over HTTPS in prod
//           maxAge: 12 * 60 * 60 * 1000, // 12 hours expiry
//           sameSite: "Lax", // Good balance of security and usability
//         });
//         res.status(200).json({
//           msg: "Login successful",
//           token,
//           role: user.role,
//           name: user.name,
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   let user; // Declare user here to use in catch block

//   // console.log(" Forgot password request received:", req.body);

//   try {
//     user = await User.findOne({ email });
//     // console.log("User found:", !!user);/

//     // Always respond with success to prevent email enumeration
//     if (!user) {
//       return res.status(200).json({
//         msg: "If a matching account was found, a password reset link has been sent.",
//       });
//     }

//     // 1️ Generate reset token and save hashed version
//     const resetToken = crypto.randomBytes(20).toString("hex"); // Random token
//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save({ validateBeforeSave: false });

//     // 2️ Create reset URL using frontend environment variable
//     const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
//     const resetURL = `${frontendBaseUrl}/reset-password/${resetToken}`;
//     // console.log(" Reset URL:", resetURL);

//     // 3️Send email
//     await sendEmail({
//       email: user.email,
//       subject: "Blood Bank Password Reset Request",
//       message: `You requested a password reset.\nClick here to reset your password:\n\n${resetURL}\n\nThis link is valid for 10 minutes.`,
//     });

//     res
//       .status(200)
//       .json({ success: true, msg: "Password reset link sent to your email." });
//   } catch (err) {
//     // console.error("Error in forgot-password route:", err);

//     // Clear token if email fails
//     if (user) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save({ validateBeforeSave: false });
//     }

//     res.status(500).json({
//       success: false,
//       msg: "Error sending email. Please try again later.",
//     });
//   }
// });

// // ----------------------------------------------------------------
// // PASSWORD RESET ROUTE
// // ----------------------------------------------------------------

// // @route   PUT /api/auth/reset-password/:token
// // @desc    Accepts token and new password to reset the password
// // @access  Public
// router.put("/reset-password/:token", async (req, res) => {
//   // 1. Get the raw token from the URL and hash it for lookup
//   const resetToken = req.params.token;
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   const { password } = req.body;

//   try {
//     // 2. Find user by the hashed token and ensure it hasn't expired
//     // We MUST select the password field here if we want to run pre-save hooks,
//     // but since you are doing manual hashing, we only need to select it for the update.
//     let user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired reset token." });
//     }

//     // 3. Validate the new password
//     if (!password || password.length < 8) {
//       return res
//         .status(400)
//         .json({ msg: "Password must be at least 8 characters." });
//     }

//     // 4. EXPLICITLY HASH THE NEW PASSWORD (As requested)
//     const salt = await bcrypt.genSalt(12);
//     user.password = await bcrypt.hash(password, salt); // Store the HASHED password

//     // 5. Clear the token fields
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     // 6. Save the user
//     await user.save();

//     res.status(200).json({
//       success: true,
//       msg: "Password reset successful. You can now log in.",
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// export default router;

// // Import authProtect along with authAdmin, authNurse at the top of authRoutes.js
// // For example: import { authAdmin, authNurse, authProtect } from "../middleware/authMiddleware.js";

// // @route   POST /api/auth/logout
// // @desc    Logout user by clearing cookie and blacklisting token
// // @access  Private (Requires a token to execute)
// router.post("/logout", authProtect, async (req, res) => {
//   // ⬅ The fix is here
//   // 1. Get the token from the request object (attached by the authenticate middleware)
//   // const tokenToBlacklist = req.token;// change

//   try {
//     // 2. Add the current JWT to the blacklist model
//     // This ensures the token cannot be used again, even if an attacker intercepts the cookie before it's cleared.
//     // await TokenBlacklist.create({ token: tokenToBlacklist });/////////////////////change

//     // 3. Clear the HTTP-only cookie
//     // This is the action that logs the user out in the browser.
//     res.cookie("jwt", "loggedout", {
//       httpOnly: true,
//       expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds (immediate expiry)
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//     });

//     res.status(200).json({ success: true, msg: "Successfully logged out" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error during logout");
//   }
// });
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SystemConfig from "../models/SystemConfig.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { authProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER (Only once — first admin)
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    const cfg = await SystemConfig.findOne();
    const canSeed = !existingAdmin && !(cfg && cfg.adminCreated);

    if (!canSeed) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      role: "admin", // First user = admin
    });

    await user.save();

    // Mark admin as created
    if (!cfg) {
      await SystemConfig.create({ adminCreated: true });
    } else {
      cfg.adminCreated = true;
      await cfg.save();
    }

    res.status(201).json({ msg: "Admin created successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN — PERFECT & FINAL
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // PERFECT PAYLOAD — matches your middleware
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Secure HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login successful",
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ msg: "If account exists, reset link sent" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetURL = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset - Blood Bank System",
      message: `Reset your password here (valid 10 mins):\n\n${resetURL}`,
    });

    res.json({ msg: "Reset link sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Email could not be sent" });
  }
});

// RESET PASSWORD
router.put("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGOUT — FULLY WORKING WITH BLACKLIST
router.post("/logout", authProtect, async (req, res) => {
  try {
    // Blacklist the current token
    await TokenBlacklist.create({ token: req.token });

    // Clear cookie
    res.cookie("jwt", "loggedout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ msg: "Logout failed" });
  }
});

export default router;
