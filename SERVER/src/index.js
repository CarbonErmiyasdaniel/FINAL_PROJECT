import "./startup.js"; // Loads .env + other startup checks (must be first)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import mongoose from "mongoose"; // ← ADD THIS
mongoose.set("strictPopulate", false);
import User from "./models/User.js";
import HospitalRequest from "./models/HospitalRequest.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import hospital_staffRoutes from "./routes/hospital_staffRoutes.js";
import lab_technicianRoutes from "./routes/lab_technicianRoutes.js";
import postCounselorRouter from "./routes/postCounselor.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// JWT check (good for debugging)
console.log(
  "Index.js: JWT_SECRET available:",
  process.env.JWT_SECRET ? "Yes" : "No"
);

// Routes
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/nurses", nurseRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/hospital_staff", hospital_staffRoutes);
app.use("/api/lab_technician", lab_technicianRoutes);
app.use("/api/post-counselor", postCounselorRouter);

// ———————————————— START SERVER WITH INDEX CLEANUP ————————————————
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB(); // This already logs "MongoDB Connected"

    // 2. Clean up duplicate indexes (only in development)
    if (process.env.NODE_ENV !== "production") {
      console.log("Cleaning duplicate indexes...");
      await Promise.all([
        User.syncIndexes(),
        HospitalRequest.syncIndexes(),
        // Add more models here if needed:
        // Donation.syncIndexes(),
        // BloodStock.syncIndexes(),
      ]);
      console.log("All duplicate indexes removed — server is clean!");
    }

    // 3. Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on this port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start everything
startServer();
