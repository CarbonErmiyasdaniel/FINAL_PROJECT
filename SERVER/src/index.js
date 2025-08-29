// server/src/index.js (updated)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // ⬅️ IMPORT THE NEW ROUTER

// Load environment variables
// dotenv.config({ path: "../.env" });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define API routes
app.use("/api/auth", authRoutes); // ⬅️ USE THE NEW ROUTER

// Start the server
app.listen(port, () => {
  console.log(`Server is running on this port: ${port}`);
});
