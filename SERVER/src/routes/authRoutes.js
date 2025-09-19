import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SystemConfig from "../models/SystemConfig.js";

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
      process.exit(0);
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
      { expiresIn: 24 * 60 * 60 * 30 }, // Token expires in 30 days
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: "Login successful", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
