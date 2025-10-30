import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SystemConfig from "../models/SystemConfig.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { authProtect } from "../middleware/authMiddleware.js";
import TokenBlacklist from "../models/TokenBlacklist.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    const cfg = await SystemConfig.findOne();
    const canSeed = !existingAdmin && !(cfg && cfg.adminCreated);

    if (!canSeed) {
      console.log(
        "Seed not needed: admin exists or bootstrap already completed."
      );
      // process.exit(0);
      return res.status(400).json({ msg: " admin already exists" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12); // 12 rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    user = new User({ email, password: hashedPassword });

    // Save the user
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and select the password field
    let user = await User.findOne({ email }).select("+password");

    // If user doesn't exist, return an error
    if (!user) {
      console.log("Login failed for user:", email);
      return res.status(400).json({ msg: " user not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Prepare the payload for the JWT
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };

    // Check if JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set. Cannot create token.");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    // Sign the JWT and send it in the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // 15 seconds for testing, change to 24h in production
      { expiresIn: 12 * 60 * 60 }, // Token expires in 12 hours

      (err, token) => {
        if (err) throw err;
        // FIX A: Set the JWT as a secure, HTTP-only cookie
        res.cookie("jwt", token, {
          httpOnly: true, // Prevents client-side JS (XSS) from reading the token
          secure: process.env.NODE_ENV === "production", // Use only over HTTPS in prod
          maxAge: 12 * 60 * 60 * 1000, // 12 hours expiry
          sameSite: "Lax", // Good balance of security and usability
        });
        res.status(200).json({
          msg: "Login successful",
          token,
          role: user.role,
          name: user.name,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Accepts email and sends password reset link
// @access  Public
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // 1. Find the user
  // 👇 ADD THE JSDOC COMMENT HERE TO HINT THE TYPE
  // /** @type {import("../models/User.js").UserDoc} */

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Respond with generic success message to prevent email enumeration
      return res.status(200).json({
        msg: "If a matching account was found, a password reset link has been sent.",
      });
    }

    // 1. Generate and save the reset token (hashed)
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // 2. Create the full reset URL (Use your frontend URL here!)
    // Replace req.get('host') with your actual frontend domain in production!
    const frontendBaseUrl = "http://localhost:5173";
    const resetURL = `${frontendBaseUrl}/reset-password/${resetToken}`;

    const message = `You requested a password reset. Click this link to reset your password:\n\n${resetURL}\n\nThis link is valid for 10 minutes.`;

    // 3. Send the email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res
      .status(200)
      .json({ success: true, msg: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    // Clear token fields if email sending fails
    if (User) {
      User.resetPasswordToken = undefined;
      User.resetPasswordExpire = undefined;
      await User.save({ validateBeforeSave: false });
    }
    res.status(500).json({
      success: false,
      msg: "Error sending email. Please try again later.",
    });
  }
});

// ----------------------------------------------------------------
// PASSWORD RESET ROUTE
// ----------------------------------------------------------------

// @route   PUT /api/auth/reset-password/:token
// @desc    Accepts token and new password to reset the password
// @access  Public
router.put("/reset-password/:token", async (req, res) => {
  // 1. Get the raw token from the URL and hash it for lookup
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const { password } = req.body;

  try {
    // 2. Find user by the hashed token and ensure it hasn't expired
    // We MUST select the password field here if we want to run pre-save hooks,
    // but since you are doing manual hashing, we only need to select it for the update.
    let user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token." });
    }

    // 3. Validate the new password
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters." });
    }

    // 4. EXPLICITLY HASH THE NEW PASSWORD (As requested)
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt); // Store the HASHED password

    // 5. Clear the token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // 6. Save the user
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Password reset successful. You can now log in.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;

// Import authProtect along with authAdmin, authNurse at the top of authRoutes.js
// For example: import { authAdmin, authNurse, authProtect } from "../middleware/authMiddleware.js";

// @route   POST /api/auth/logout
// @desc    Logout user by clearing cookie and blacklisting token
// @access  Private (Requires a token to execute)
router.post("/logout", authProtect, async (req, res) => {
  // ⬅️ The fix is here
  // 1. Get the token from the request object (attached by the authenticate middleware)
  // const tokenToBlacklist = req.token;// change

  try {
    // 2. Add the current JWT to the blacklist model
    // This ensures the token cannot be used again, even if an attacker intercepts the cookie before it's cleared.
    // await TokenBlacklist.create({ token: tokenToBlacklist });/////////////////////change

    // 3. Clear the HTTP-only cookie
    // This is the action that logs the user out in the browser.
    res.cookie("jwt", "loggedout", {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds (immediate expiry)
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({ success: true, msg: "Successfully logged out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error during logout");
  }
});
