import React from "react";
import DashboardLayout from "./DashboardLayout";

const HospitalStaffDashboard = () => {
  const userName = localStorage.getItem("userName") || "Hospital Staff";
  const userRole = "hospital_staff";

  return (
    <DashboardLayout userName={userName} userRole={userRole}>
      <h2 className="text-3xl font-bold mb-4">Hospital Staff Panel</h2>
      <p className="mb-6">
        Manage patient admissions, discharges, and hospital resources here.
      </p>

      {/* Slider Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Patient Admissions Rate</h3>
        <input
          type="range"
          className="range range-primary w-full"
          min="0"
          max="100"
          step="1"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Dynamic Buttons Section */}
      <div className="flex space-x-4">
        <button className="btn btn-success shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Admit Patient
        </button>
        <button className="btn btn-warning shadow-lg transition-shadow duration-300 hover:shadow-xl">
          View Patient Records
        </button>
        <button className="btn btn-error shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Discharge Patient
        </button>
        <button className="btn btn-info shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Manage Resources
        </button>
      </div>
    </DashboardLayout>
  );
};

export default HospitalStaffDashboard;
