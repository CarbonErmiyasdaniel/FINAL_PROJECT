import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    // Email field with validation for uniqueness and format
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true, // Ensures each email is unique in the database
      lowercase: true, // Converts email to lowercase before saving
      validate: [validator.isEmail, "Please provide a valid email"], // Uses the 'validator' library for email format
    },
    // Password field with minimum length and not selected by default in queries
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8, // Minimum password length of 8 characters
      select: false, // Prevents password from being returned in query results by default
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    // 🔑 2. NEW FIELDS FOR PASSWORD RESET TOKEN AND EXPIRY
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Role field with a predefined set of allowed values (enum)
    role: {
      type: String,
      enum: [
        "admin",
        "nurse",
        "lab_technician",
        "post_counselor",
        "hospital_staff",
        "donor",
      ],
      default: "nurse",
      required: true, // Role is a mandatory field
    },
    // Active status for the user account, default is true
    active: {
      type: Boolean,
      default: true, // Account is active by default
      select: false, // Prevents active status from being returned in query results by default
    },
    // Field to store the ID of the user who registered this user
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
    },
  },
  // Options for the schema: timestamps add createdAt and updatedAt fields automatically
  { timestamps: true }
);

// 🔑 3. METHOD TO GENERATE PASSWORD RESET TOKEN
userSchema.methods.getResetPasswordToken = function () {
  // Generate a raw random token (This is the one sent in the email link)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and store the *hashed* version in the database (for security)
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiry  1 day from now
  this.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;

  // this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 24 hrs

  // Return the *unhashed* token (the one you send via email)
  return resetToken;
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);
export default User;
