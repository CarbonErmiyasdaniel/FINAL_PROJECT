// src/Components/Pages/Unauthorized.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-800">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">403 - Unauthorized Access</h1>
        <p className="text-lg mb-6">
          You do not have permission to view this page.
        </p>
        <Navigate to="/signin" replace />
      </div>
    </div>
  );
};

export default UnauthorizedPage;
