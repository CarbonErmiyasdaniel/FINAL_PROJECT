// src/Components/ProtectedRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from "../context/useAuth";
/**
 * Protects routes based on authentication and optional role-based authorization.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth(); // 👈 Use the synchronized state

  // 1️ Check loading state first
  if (user.isLoading) {
    return <div className="text-center p-20">Loading security check...</div>;
  }

  // 2️heck authentication
  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // 3️ Check role authorization
  if (allowedRoles && allowedRoles.length > 0) {
    if (!user.role || !allowedRoles.includes(user.role)) {
      // Unauthorized access
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 4️ Authorized → render the nested route
  return <Outlet />;
};

export default ProtectedRoute;
