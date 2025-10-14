// EditUserModal.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Save, Loader2 } from "lucide-react";

// Define the allowed roles (must match your user registration/update logic)
const ALLOWED_ROLES = [
  "admin",
  "nurse",
  "lab_technician",
  "post_counselor",
  "hospital_staff",
  "donor",
];

// Utility function to format the role string (Reused from UserListPage)
const formatRole = (role) => {
  return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Reusable Tailwind style for inputs
const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

const UpdateUser = ({ user, onClose, onUserUpdated }) => {
  // Initialize state with the user data passed from the parent
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "donor",
    password: "", // Password is blank by default and only sent if changed
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.role) {
        toast.error("Name, Email, and Role are required.");
        setIsLoading(false);
        return;
      }

      if (formData.password && formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long, if changed.");
        setIsLoading(false);
        return;
      }

      // Prepare data for the API call
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Only include password if the field is not empty
      if (formData.password) {
        updateData.password = formData.password;
      }

      // API call to the backend update endpoint (PUT /api/admins/users/:userId)
      const res = await axios.put(`/api/admins/users/${user._id}`, updateData, {
        withCredentials: true,
      });

      toast.success(`User '${res.data.name}' updated successfully!`);

      // 1. Call the callback to refresh the parent list state
      onUserUpdated(res.data);
      // 2. Close the modal
      onClose();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.msg || "Failed to update user. Server error.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal structure (using fixed positioning and backdrop)
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        onClick={() => {
          toast.info("Edit cancelled");
          onClose();
        }}
      ></div>

      {/* Modal Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all relative">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Edit User: {user.name}
            </h2>
            <button
              onClick={() => {
                toast.info("Edit cancelled");
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name Field */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Email Field */}
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
                className={inputStyle}
                required
              />
            </div>

            {/* Role Field */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Role
                </span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputStyle + " appearance-none"}
                required
              >
                {ALLOWED_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {formatRole(role)}
                  </option>
                ))}
              </select>
            </div>

            {/* Password Field (Optional update) */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  New Password (Leave blank to keep existing)
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className={inputStyle}
              />
            </div>

            {/* Footer / Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 shadow-lg flex items-center justify-center gap-3 
                  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300/50"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
