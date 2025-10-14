import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import SystemConfig from "../models/SystemConfig.js";
import connectDB from "../config/db.js"; // function that connects to MongoDB
import dotenv from "dotenv";

dotenv.config();
console.log("Seeder loaded MONGO_URI:", process.env.MONGO_URI);

async function run() {
  try {
    // Call the connectDB function directly
    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin" });
    const cfg = await SystemConfig.findOne();
    const canSeed = !existingAdmin && !(cfg && cfg.adminCreated);

    if (!canSeed) {
      console.log(
        "Seed not needed: admin exists or bootstrap already completed."
      );
      process.exit(0);
    }

    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Safety check for critical fields
    if (!adminName || !adminEmail || !adminPassword) {
      console.error(
        "Critical environment variables (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD) are missing or empty."
      );
      process.exit(1);
    } // ⭐️ FIX: Hashing the password using bcrypt ⭐️

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const newAdmin = new User({
      name: adminName, // Now correctly using the name variable
      email: adminEmail,
      password: hashedPassword, // ⭐️ Use the HASHED password for security ⭐️
      role: "admin",
    });

    await newAdmin.save(); // Mark bootstrap complete

    if (!cfg) {
      await SystemConfig.create({ adminCreated: true });
    } else {
      cfg.adminCreated = true;
      await cfg.save();
    }

    console.log(
      "Initial admin created:",
      newAdmin.email,
      "Name:",
      newAdmin.name
    );
    process.exit(0);
  } catch (err) {
    console.error("Seed admin failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
