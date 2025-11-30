// import "./startup.js"; // This must be the very first import
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import cookieParser from "cookie-parser";
// import nurseRoutes from "./routes/nurseRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import donorRoutes from "./routes/donorRoutes.js";
// import hospital_staffRoutes from "./routes/hospital_staffRoutes.js";
// import lab_technicianRoutes from "./routes/lab_technicianRoutes.js";
// import post_counselorRoutes from "./routes/post_counselorRoutes.js";
// // import hospital_staffRoutes from "./routes/hospital_staffRoutes.js";
// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// const corsOptions = {
//   origin: "http://localhost:5173", // Explicitly allowed origin
//   credentials: true, // Allow credentials
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());
// // Add this line to check the variable
// console.log(
//   "Index.js: JWT_SECRET available:",
//   process.env.JWT_SECRET ? "Yes" : "No"
// );

// app.use("/api/auth/", authRoutes);
// app.use("/api/admins", adminRoutes);
// app.use("/api/nurses", nurseRoutes);
// app.use("/api/donor", donorRoutes);
// app.use("/api/hospital_staff", hospital_staffRoutes);
// app.use("/api/lab_technician", lab_technicianRoutes);
// app.use("/api/post_counselor", post_counselorRoutes);
// // app.use("/api/hospital_staff", hospital_staffRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on this port: ${port}`);
// });

import "./startup.js"; // Loads .env + other startup checks (must be first)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Import your models (needed for syncIndexes)
import User from "./models/User.js";
import HospitalRequest from "./models/HospitalRequest.js";
// Add other models here if you have more (e.g. Donation, BloodStock, etc.)

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import hospital_staffRoutes from "./routes/hospital_staffRoutes.js";
import lab_technicianRoutes from "./routes/lab_technicianRoutes.js";
import post_counselorRoutes from "./routes/post_counselorRoutes.js";

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
app.use("/api/post_counselor", post_counselorRoutes);

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
