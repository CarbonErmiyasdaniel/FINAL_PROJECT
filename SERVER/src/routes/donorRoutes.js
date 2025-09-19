// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import PersonalInfo from "../models/PersonalInfo.js";
// import DonorRecord from "../models/DonorRecord.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // @route   POST /api/donors/register
// // @desc    Register a new donor and their personal information
// // @access  Public
// router.post("/register", async (req, res) => {
//   const {
//     email,
//     password,
//     passwordConfirm,
//     firstName,
//     fatherName,
//     surname,
//     title,
//     dateOfBirth,
//     sex,
//     age,
//     occupation,
//     contact,
//     donorNumber,
//   } = req.body;

//   try {
//     // 1. Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // 2. Create the new User
//     user = new User({ email, password, role: "donor" });
//     await user.save();

//     // 3. Create the PersonalInfo profile linked to the new User
//     const personalInfo = new PersonalInfo({
//       user: user.id,
//       firstName,
//       fatherName,
//       surname,
//       title,
//       dateOfBirth,
//       sex,
//       age,
//       occupation,
//       contact,
//       donorNumber,
//     });
//     await personalInfo.save();

//     // 4. Create and send JWT for authentication
//     const payload = {
//       user: {
//         id: user.id,
//         role: user.role,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// // @route   GET /api/donors/me
// // @desc    Get the authenticated donor's own profile and donation history
// // @access  Private (for donors only)
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const donorProfile = await PersonalInfo.findOne({ user: userId })
//       .populate("user", "email role")
//       .populate({
//         path: "donationRecords",
//         populate: {
//           path: "personalInfo",
//           select: "firstName surname",
//         },
//       });

//     if (!donorProfile) {
//       return res.status(404).json({ msg: "Donor profile not found" });
//     }

//     res.json(donorProfile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// export default router;
// {
//   "name": "Jane Doe",
//   "email": "jane.doe@example.com",
//   "password": "StrongPassword123",
//   "personalInfo": {
//     "title": "Ms.",
//     "firstName": "Jane",
//     "fatherName": "Father's Name",
//     "surname": "Doe",
//     "dateOfBirth": "1995-05-15T00:00:00.000Z",
//     "age": 30,
//     "sex": "Female",
//     "occupation": "Software Engineer",
//     "contact": {
//       "city": "Addis Ababa",
//       "subCityRegion": "Bole",
//       "zone": "Zone 1",
//       "woreda": "Woreda 3",
//       "kebele": "Kebele 10",
//       "residenceAddress": "123 Main St",
//       "telephone": "011-555-1234",
//       "cellphone": "0911555678",
//       "email": "jane.doe@example.com",
//       "pobox": "P.O. Box 5678",
//       "organization": "Example Corp"
//     },
//     "donorNumber": "DNR-12345"
//   },
//   "donorRecord": {}
// }



// {
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "password": "SecurePassword123",
//   "personalInfo": {
//     "title": "Mr.",
//     "firstName": "John",
//     "fatherName": "Smith",
//     "surname": "Doe",
//     "dateOfBirth": "1990-11-20T00:00:00.000Z",
//     "age": 35,
//     "sex": "Male",
//     "occupation": "Teacher",
//     "contact": {
//       "city": "Addis Ababa",
//       "subCityRegion": "Bole",
//       "zone": "Zone 1",
//       "woreda": "Woreda 3",
//       "kebele": "Kebele 10",
//       "residenceAddress": "123 Main Street",
//       "telephone": "011-555-1234",
//       "cellphone": "0911555678",
//       "email": "john.doe@example.com",
//       "pobox": "P.O. Box 5678",
//       "organization": "ABC School"
//     },
//     "donorNumber": "DNR-123456",
//     "donorSignature": "Base64EncodedSignatureString"
//   },
//   "donorRecord": {}
// }