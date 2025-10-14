// RegisterUserPage.jsx
import React, { useState } from "react";
import axios from "axios";
// NEW: Import useNavigate for post-submit redirection
import { useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "../../Pages/DashboardLayout";
// NEW: Import a basic layout component (adjust path as necessary
// import DashboardLayout from "../Layout/DashboardLayout.jsx";
// Define the allowed roles (REUSED)
const ALLOWED_ROLES = [
  "nurse",
  "lab_technician",
  "post_counselor",
  "hospital_staff",
];

// Reusable Tailwind style for inputs (REUSED)
const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

// ------------------------------------------------------------------

// MODIFIED: Component is now a standard page component, no props needed.
const RegisterUserPage = () => {
  const navigate = useNavigate(); // Initialize for redirection

  // Initial state for the new user form (REUSED)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "nurse",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes (REUSED)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (REUSED with modification to success action)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Client-side validation (REUSED)
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.role
      ) {
        toast.error("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
      }

      // API call to backend (REUSED)
      const res = await axios.post("/api/admins/createUser", formData, {
        withCredentials: true,
      });

      toast.success(`User '${res.data.data.name}' created successfully!`);

      // 💥 MODIFIED SUCCESS ACTION 💥
      // Reset form and then redirect the user after a short delay
      setFormData({ name: "", email: "", password: "", role: "nurse" });

      setTimeout(() => {
        // Redirect the admin back to the main dashboard or a user management list
        navigate("/admin");
      }, 1500);
    } catch (err) {
      // Error handling (REUSED)
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to create user. Server error.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // MODIFIED RENDER: Replaced the modal structure with a page layout
  return (
    // Wrap the content in your primary dashboard layout
    <DashboardLayout>
      {/* Container for the form, centered on the page */}
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
        {/* Title (Reused) */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
          <UserPlus className="text-red-700 w-8 h-8" /> Register New User
        </h1>
        <p className="text-gray-600 mb-8">
          Complete the form below to create a new user account (Donor or Staff).
        </p>

        {/* Form (All inputs and handleSubmit logic are REUSED) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (REUSED) */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputStyle}
              required
            />
          </div>

          {/* Email Field (REUSED) */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className={inputStyle}
              required
            />
          </div>

          {/* Password Field (REUSED) */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Password (Min 8 characters)
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={inputStyle}
              required
            />
          </div>

          {/* Role Field (Dropdown) (REUSED) */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">Role</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              // Used red-500 focus in inputStyle for visual consistency with the dashboard button
              className={inputStyle + " appearance-none"}
              required
            >
              {ALLOWED_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button (REUSED, with color adjusted for AdminDashboard red theme) */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-none text-white font-semibold transition duration-200 shadow-xl flex items-center justify-center gap-3 
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Creating...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" /> Create User Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RegisterUserPage;
