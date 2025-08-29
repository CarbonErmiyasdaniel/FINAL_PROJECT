import mongoose from "mongoose";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    // We are temporarily hardcoding the URI to bypass the .env file issue.
    const mongoURI = "mongodb://127.0.0.1:27017/BLOOD_BANK_DB";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected for seeding...");

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword123";

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("Admin user already exists. Skipping seed.");
      mongoose.connection.close();
      return;
    }

    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      passwordConfirm: adminPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log(`Admin user '${adminEmail}' created successfully!`);
  } catch (error) {
    console.error(`Error seeding admin user: ${error.message}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedAdmin();
