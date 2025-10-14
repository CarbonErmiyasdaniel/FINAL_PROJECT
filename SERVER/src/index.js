import "./startup.js"; // This must be the very first import
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import nurseRoutes from "./routes/nurseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// import donorRoutes from "./routes/donorRoutes.js";
// import lab_technicianRoutes from "./routes/lab_technicianRoutes.js";
// import post_counselorRoutes from "./routes/post_counselorRoutes.js";
// import hospital_staffRoutes from "./routes/hospital_staffRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

connectDB();

const corsOptions = {
  origin: "http://localhost:5173", // Explicitly allowed origin
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// Add this line to check the variable
console.log(
  "Index.js: JWT_SECRET available:",
  process.env.JWT_SECRET ? "Yes" : "No"
);

app.use("/api/auth/", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/nurses", nurseRoutes);
// app.use("/api/donors", donorRoutes);
// app.use("/api/lab_technician", lab_technicianRoutes);
// app.use("/api/post_counselor", post_counselorRoutes);
// app.use("/api/hospital_staff", hospital_staffRoutes);

app.listen(port, () => {
  console.log(`Server is running on this port: ${port}`);
});
