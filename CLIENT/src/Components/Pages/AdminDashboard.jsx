// AdminDashboard.jsx
import React, { useState } from "react";
// 👈 NEW IMPORT
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
// REMOVED: import AddUserModal from "../Features/admin/AddUserModal";
import AdminSidebar from "./SlideBar/AdminSidebar.jsx";

// --- Metric Card Component (RETAINED) ---
const MetricCard = ({ title, value, icon, color = "red" }) => (
  <div
    // Sharp corners (rounded-lg) and deep shadow (shadow-xl)
    className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
  >
    <div className="flex items-center">
      <div
        // Sharp corners for the icon background
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
// -----------------------------------

const AdminDashboard = () => {
  // 1. Initialize Navigation
  const navigate = useNavigate(); // 👈 ADDED

  // REMOVED: State for controlling the Add User modal visibility (isModalOpen)
  // REMOVED: Handlers for Add User modal (openModal, closeModal)
  // REMOVED: Function to handle post-creation logic (handleUserCreated)

  // Controls the SIDEBAR visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // NEW STATE: Language control (Default is English)
  const [language, setLanguage] = useState("EN");

  // Handlers for Sidebar
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // NEW HANDLER: Toggle language between EN (English) and AM (Amharic)
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "EN" ? "AM" : "EN"));
    console.log(`Language switched to: ${language === "EN" ? "AM" : "EN"}`);
  };

  // --- New Navigation Handler (Cleaner implementation) ---
  const handleNavigate = (path) => {
    closeSidebar(); // Always close sidebar after clicking a button
    navigate(path);
  };
  // ------------------------------------------------------

  const getTranslation = (key) => {
    const translations = {
      EN: {
        title: "Debre Berhan Blood Center 🩸",
        subtitle: "Head Administrator Panel — Strategic Overview",
        open_panel: "Open Control Panel",
        lang_btn: "Change to Amharic (AM)",
        lang_btn_am: "ወደ እንግሊዝኛ ቀይር (EN)",
        metrics_title: "Current Operational Metrics",
        // ... other translations
      },
      AM: {
        title: "የደብረ ብርሃን ደም ማዕከል 🩸",
        subtitle: "ዋና አስተዳዳሪ ፓነል — ስትራቴጂክ አጠቃላይ እይታ",
        open_panel: "የመቆጣጠሪያ ፓነልን ክፈት",
        lang_btn: "Change to Amharic (AM)",
        lang_btn_am: "ወደ እንግሊዝኛ ቀይር (EN)",
        metrics_title: "የአሁን የአሠራር መለኪያዎች",
        // ... other translations
      },
    };
    // Use EN as a fallback if the key isn't in AM, but for this specific component, we stick to the language
    return (
      (translations[language] && translations[language][key]) ||
      translations["EN"][key]
    );
  };

  return (
    <DashboardLayout>
      {/* --- Header Section (No Change) --- */}
      <div className="flex justify-between items-start mb-6">
        <div>
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            {getTranslation("title")}
          </h1>
          {/* Subtitle - HIDING the original subtitle */}
          <p className="text-md text-gray-600 dark:text-gray-400 hidden">
            {getTranslation("subtitle")}
          </p>
        </div>

        {/* --- Utility Buttons Group (No Change) --- */}
        <div className="flex space-x-4">
          {/* --- Amharic Language Toggle Button (SHARP & RED) --- */}
          <button
            onClick={toggleLanguage}
            // Sharp corners (rounded-none), RED, and professional shadow
            className="flex items-center bg-red-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:-translate-y-px"
          >
            {language === "EN"
              ? getTranslation("lang_btn")
              : getTranslation("lang_btn_am")}
          </button>

          {/* --- Sidebar Open Button (SHARP & RED) --- */}
          <button
            onClick={openSidebar}
            // Sharp corners (rounded-none), RED, and professional shadow
            className="flex items-center bg-red-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:-translate-y-px"
          >
            {/* Menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {getTranslation("open_panel")}
          </button>
        </div>
      </div>

      {/* --- Horizontal Line for separation --- */}
      <hr className="border-gray-300 dark:border-gray-600 mb-8" />

      {/* --- Key Metrics Section (No Change) --- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {getTranslation("metrics_title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Metric Cards remain visible */}
        <MetricCard
          title="Total Donors"
          value="1,245"
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
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07m0 0l-1.353-2.029a1.5 1.5 0 00-1.272-.614h-3.392a1.5 1.5 0 00-1.272.614L6.786 16.055m0 0a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
              />
            </svg>
          }
        />
        <MetricCard
          title="Blood Units (In Stock)"
          value="45 U"
          color="blue"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
        />
        <MetricCard
          title="Active Drives"
          value="3"
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
        />
        <MetricCard
          title="Critical Shortages"
          value="O- Neg"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0v1a1 1 0 001 1h2a1 1 0 001-1v-1m-4-6h4m-4 0v-4m4 4v-4m-4 4h4"
              />
            </svg>
          }
        />
      </div>

      {/* --- Admin Sidebar Component (MODIFIED BUTTONS) --- */}
      <AdminSidebar isVisible={isSidebarOpen} onClose={closeSidebar}>
        <div className="space-y-10">
          {/* SECTION: Profile Management */}
          <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Staff & User Management
            </h2>
            <div className="flex flex-col gap-3">
              {/* Button 1: Manage Staff Roles (MODIFIED) */}
              <button
                onClick={() => handleNavigate("/admin/manage-staff")}
                className="flex items-center justify-start bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 01-4 4H6"
                  />
                </svg>
                Manage Staff Roles
              </button>
              {/* Button 2: View Donation History (MODIFIED) */}
              <button
                onClick={() => handleNavigate("/admin/history")}
                className="flex items-center justify-start bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Donation History
              </button>
            </div>
          </section>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Action Center Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Core Operations
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Quickly manage donor records and critical inventory.
            </p>

            {/* Dynamic Buttons Section */}
            <div className="flex flex-col gap-4">
              {/* Add User - Primary Action (MODIFIED to use navigation) */}
              <button
                onClick={() => handleNavigate("/admin/register-user")}
                className="flex items-center justify-center bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-xl transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Register New Donor
              </button>

              {/* View Reports - Secondary Action (MODIFIED) */}
              <button
                onClick={() => handleNavigate("/admin/getAllUsers")}
                className="flex items-center justify-center bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-4-6a2 2 0 100-4 2 2 0 000 4zm7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                getAllUsers
              </button>

              {/* Configure Settings - Tertiary Action (MODIFIED) */}
              <button
                onClick={() => handleNavigate("/admin/settings")}
                className="flex items-center justify-center bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317C10.665 3.12 12.335 3.12 12.675 4.317l.638 2.302a.75.75 0 00.413.491l2.435 1.516c1.077.67 1.393 2.053.766 3.107l-1.076 1.777a.75.75 0 00.32 1.056l2.364 1.258c1.096.582 1.206 1.956.244 2.656l-2.094 1.503a.75.75 0 00-.28.809l.666 2.356c.34.82-.416 1.547-1.284 1.107l-2.316-1.158a.75.75 0 00-.77 0l-2.316 1.158c-.868.44-1.624-.287-1.284-1.107l.666-2.356a.75.75 0 00-.28-.809l-2.094-1.503c-.962-.7-.852-2.074.244-2.656l2.364-1.258a.75.75 0 00.32-1.056l-1.076-1.777c-.627-1.054-.311-2.437.766-3.107l2.435-1.516a.75.75 0 00.413-.491l.638-2.302zM12 15a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
                Manage Center Settings
              </button>

              {/* Data Cleanup Utility (MODIFIED) */}
              <button
                onClick={() => handleNavigate("/admin/archive")}
                className="flex items-center justify-center bg-red-700 text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Archive Old Records
              </button>
            </div>
          </section>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Donor Engagement Section (No Change) */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Donor Engagement Overview
            </h2>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Monthly Donor Goal Progress
              </h3>

              {/* Progress Bar Visual (Red color for theme, Sharp badge) */}
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-right">
                    {/* Badge uses sharp corners (rounded-none) and red background */}
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-none text-white bg-red-600 dark:text-red-200 dark:bg-red-800 shadow-md">
                      75% Target Achieved
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-red-200 dark:bg-gray-700">
                  <div
                    style={{ width: "75%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </AdminSidebar>

      {/* REMOVED: AddUserModal component */}
    </DashboardLayout>
  );
};

export default AdminDashboard;
