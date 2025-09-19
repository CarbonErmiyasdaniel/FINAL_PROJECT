import "./startup.js"; // This must be the very first import
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import donorRoutes from "./routes/donorRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Add this line to check the variable
console.log(
  "Index.js: JWT_SECRET available:",
  process.env.JWT_SECRET ? "Yes" : "No"
);

app.use("/api/auth/", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/nurses", nurseRoutes);
// app.use("/api/donors", donorRoutes);

app.listen(port, () => {
  console.log(`Server is running on this port: ${port}`);
});
