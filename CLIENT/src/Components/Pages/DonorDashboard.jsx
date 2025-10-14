// src/Components/Pages/DonorDashboard.jsx
import React from "react";
import DashboardLayout from "./DashboardLayout";

const DonorDashboard = () => {
  const userName = localStorage.getItem("userName") || "Donor";
  const userRole = "donor";

  return (
    <DashboardLayout userName={userName} userRole={userRole}>
      <h2 className="text-3xl font-bold mb-4">Donor Panel</h2>
      <p>
        View your donation history, upcoming appointments, and personal info
        here.
      </p>
    </DashboardLayout>
  );
};

export default DonorDashboard;
