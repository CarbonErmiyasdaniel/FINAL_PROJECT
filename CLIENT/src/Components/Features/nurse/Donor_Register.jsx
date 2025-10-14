// RegisterDonor.jsx
import React, { useState } from "react";
import axios from "axios";
import { UserPlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import DashboardLayout from "../../Pages/DashboardLayout";

const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        setIsLoading(false);
        return;
      }

      const res = await axios.post("/api/nurses/register-donor", formData, {
        withCredentials: true,
      });

      toast.success(
        `Donor '${
          res.data.data?.name || formData.name
        }' registered successfully!`
      );

      // Reset form but stay on the page (no redirect)
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      const status = err.response?.status;
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to register donor. Server error.";

      if (status === 409) {
        toast.warn("A donor with this email is already registered.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
          <UserPlus className="text-red-700 w-8 h-8" /> Register Donor
        </h1>
        <p className="text-gray-600 mb-8">
          Fill in the details below to register a new donor.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Password (Min 6 characters)
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

          {/* Submit */}
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
                  <Loader2 className="animate-spin h-5 w-5" /> Registering...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" /> Register Donor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RegisterDonor;
