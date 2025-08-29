import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
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
    // Password confirmation field, used for validation during registration
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // Custom validator to ensure passwordConfirm matches the password
        validator: function (el) {
          return el === this.password; // 'this' refers to the current document
        },
        message: "Passwords are not the same!", // Error message if passwords don't match
      },
    },
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
      required: true, // Role is a mandatory field
    },
    // Active status for the user account, default is true
    active: {
      type: Boolean,
      default: true, // Account is active by default
      select: false, // Prevents active status from being returned in query results by default
    },
  },
  // Options for the schema: timestamps add createdAt and updatedAt fields automatically
  { timestamps: true }
);

// Mongoose pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost factor of 12 (more rounds = more secure)
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field before saving to DB
  this.passwordConfirm = undefined;
  next();
});

// Instance method to compare candidate password with hashed password in the database
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // Compare the provided password with the stored hashed password
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
