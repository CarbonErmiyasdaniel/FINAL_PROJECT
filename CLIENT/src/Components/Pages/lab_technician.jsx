import React from "react";
import DashboardLayout from "./DashboardLayout";

const LabTechnicianDashboard = () => {
  const userName = localStorage.getItem("userName") || "Lab Technician";
  const userRole = "lab_technician";

  return (
    <DashboardLayout userName={userName} userRole={userRole}>
      <h2 className="text-3xl font-bold mb-4">Lab Technician Panel</h2>
      <p className="mb-6">
        Manage lab tests, view results, and update patient records here.
      </p>

      {/* Slider Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Test Completion Rate</h3>
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
          Add Test Result
        </button>
        <button className="btn btn-warning shadow-lg transition-shadow duration-300 hover:shadow-xl">
          View Test Results
        </button>
        <button className="btn btn-error shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Delete Test Record
        </button>
        <button className="btn btn-info shadow-lg transition-shadow duration-300 hover:shadow-xl">
          Update Patient Records
        </button>
      </div>
    </DashboardLayout>
  );
};

export default LabTechnicianDashboard;
