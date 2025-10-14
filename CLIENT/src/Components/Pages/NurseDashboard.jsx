import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import NurseSidebar from "./SlideBar/NurseSidebar.jsx"; // Assuming you have a NurseSidebar component

const MetricCard = ({ title, value, icon, color = "blue" }) => (
  <div
    className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
  >
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center p-3 text-white bg-${color}-600 rounded-lg mr-4`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const NurseDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleNavigate = (path) => {
    closeSidebar();
    navigate(path);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
          Nurse Dashboard
        </h1>
        <button
          onClick={openSidebar}
          className="flex items-center bg-blue-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
        >
          Open Sidebar
        </button>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 mb-8" />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Current Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Patients Treated"
          value="320"
          color="green"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v8l4 4"
              />
            </svg>
          }
        />
        <MetricCard
          title="Medications Administered"
          value="1,250"
          color="red"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4h16v16H4V4z"
              />
            </svg>
          }
        />
        <MetricCard
          title="Active Cases"
          value="45"
          color="yellow"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v8l4 4"
              />
            </svg>
          }
        />
        <MetricCard
          title="Critical Alerts"
          value="3"
          color="orange"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2L2 20h20L12 2z"
              />
            </svg>
          }
        />
      </div>

      <NurseSidebar isVisible={isSidebarOpen} onClose={closeSidebar}>
        <div className="space-y-10">
          <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">
              Patient Management
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleNavigate("/nurse/patient-records")}
                className="flex items-center justify-start bg-blue-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
              >
                View Patient Records
              </button>
              <button
                onClick={() => handleNavigate("/nurse/manage-treatments")}
                className="flex items-center justify-start bg-blue-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
              >
                Manage Treatments
              </button>
            </div>
          </section>

          <hr className="border-gray-300 dark:border-gray-600" />

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Nursing Operations
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Quickly manage operations and patient care.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigate("/nurse/add_donor")}
                className="flex items-center justify-center bg-blue-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
              >
                Add New Donor
              </button>
              <button
                onClick={() => handleNavigate("/nurse/Get_Donorlist")}
                className="flex items-center justify-center bg-blue-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
              >
                Get Donor list
              </button>
              <button
                onClick={() => handleNavigate("/nurse/settings")}
                className="flex items-center justify-center bg-blue-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800"
              >
                Manage Settings
              </button>
            </div>
          </section>
        </div>
      </NurseSidebar>
    </DashboardLayout>
  );
};

export default NurseDashboard;
