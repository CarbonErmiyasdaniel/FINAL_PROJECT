import React from "react";
// 1. Import the useAuth hook (assuming the relative path is correct)
import { useAuth } from "../../context/useAuth.js";

const DashboardLayout = ({ children }) => {
  // You can keep useNavigate, though it's not strictly necessary for logout
  // since the logic is inside AuthProvider, but it doesn't hurt anything.
  // Removed unused 'navigate' variable.

  // 2. Get user data and the logout function directly from the context
  const { user, logout } = useAuth();

  // Use values from the context state
  const userRole = user.role || "guest";
  // Fallback to "User" if userName is not yet set in context/localStorage
  const userName = user.userName || "User";

  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Navbar/Header */}
      <nav className="bg-red-700 p-4 text-white shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          {/* Dashboard Title */}
          <h1 className="text-2xl font-extrabold tracking-wide">
            {capitalizedRole} Dashboard
          </h1>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-6">
            <span className="text-lg font-medium">
              Hello, <span className="font-bold">{userName}</span>!
            </span>
            <button
              // 🔑 THE FIX: Call the context's 'logout' function directly.
              // The context function handles the API call, state cleanup,
              // AND the final navigation to /sign-in.
              onClick={logout}
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6 mt-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
