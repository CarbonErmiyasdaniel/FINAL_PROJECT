/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope, // Icon for patient/treatment
  Heart, // Icon for lab_technician/blood
  ClipboardList, // Icon for records/vitals
  Settings,
  UserPlus, // Icon for Add Donor
  Users, // Icon for Donor List
  Thermometer, // Icon for Active Cases
  AlertTriangle, // Icon for Critical Alerts
  Home,
} from "lucide-react";

// Assuming these are available globally or imported from a shared file
import DashboardLayout from "./DashboardLayout";
import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
// --- SHARED COMPONENT: MetricCard (Styled to match AdminDashboard) ---
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

// --- SHARED COMPONENT: SidebarButton (Styled to match AdminDashboard) ---
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => (
  <button
    onClick={onClick}
    className={`group flex items-center justify-start text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300
      ${
        isActive
          ? "bg-red-800 hover:bg-red-900 border-l-4 border-white"
          : "bg-red-700 hover:bg-red-800"
      }
      ${!isExpanded ? "justify-center w-full" : "w-full"}
    `}
  >
    {icon}
    <span
      className={`ml-3 transition-opacity duration-300 ${
        isExpanded ? "opacity-100 block" : "opacity-0 hidden"
      }`}
    >
      {label}
    </span>
  </button>
);

// --- SHARED COMPONENT: Sidebar (Adapted from AdminDashboard) ---
const Sidebar = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isDesktop,
  children,
}) => {
  return (
    <>
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          fixed inset-y-0 left-0 z-50 transform 
          h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out
          border-r border-gray-200 dark:border-gray-700
          
          sm:static sm:h-auto 
          ${isDesktop ? (isOpen ? "sm:w-80" : "sm:w-20") : "w-80"}
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <div
          className="flex flex-col h-full space-y-6 overflow-y-auto"
          style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
        >
          <div
            className={`items-center justify-between mb-4 ${
              isDesktop ? "hidden" : "flex"
            }`}
          >
            <h1 className="text-2xl font-bold text-red-600">Nurse Panel</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </aside>
      {isOpen && !isDesktop && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60 z-40"
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

// --- Main Application Component () ---
const LabTechnician = ({ pageKey }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pageKey || "/lab_technician/dashboard"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (pageKey) {
      setCurrentPage(pageKey);
    }
  }, [pageKey]);

  useEffect(() => {
    const handleResize = () => {
      const desktopMode = window.innerWidth >= 640;
      setIsDesktop(desktopMode);

      if (!desktopMode) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!isDesktop) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const handleNavigate = (path) => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
    setCurrentPage(path);
    navigate(path);
  };

  const DashboardContent = () => (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            DONER Operations Panel 👩‍⚕️
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Real-Time Patient & Resource Management
          </p>
        </div>
        <button
          onClick={() => handleNavigate("/lab_technician/add_donor")}
          className="flex items-center bg-blue-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-px"
        >
          <UserPlus className="w-5 h-5 mr-2" /> Add New Donor
        </button>
      </div>
      <hr className="border-gray-300 dark:border-gray-600 mb-8" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Current Patient Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Patients Assigned"
          color="indigo"
          value="18"
          icon={<Stethoscope className="h-6 w-6" />}
        />
        <MetricCard
          title="Medication Queue"
          value="45 Tasks"
          color="red"
          icon={<ClipboardList className="h-6 w-6" />}
        />
        <MetricCard
          title="Active Cases"
          value="4"
          color="yellow"
          icon={<Thermometer className="h-6 w-6" />}
        />
        <MetricCard
          title="Critical Alerts"
          value="1"
          color="orange"
          icon={<AlertTriangle className="h-6 w-6" />}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Scheduled Treatments Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          *A detailed list/table of patient vital signs and treatment schedules
          would go here to match the data-heavy look of an Admin dashboard.*
        </p>
      </div>
    </>
  );

  const RenderPage = () => {
    const ViewContainer = ({ children }) => (
      <div className="p-8 lg:p-10">{children}</div>
    );

    const SimpleContent = ({ title }) => (
      <ViewContainer>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Content for the **{title}** route is rendered here.
        </p>
        <p className="mt-8 text-sm font-mono text-blue-600 dark:text-blue-400">
          Current Simulated Route: {currentPage}
        </p>
      </ViewContainer>
    );

    switch (currentPage) {
      case "/lab_technician/dashboard":
        return (
          <ViewContainer>
            <DashboardContent />
          </ViewContainer>
        );
      case "/lab_technician/Profile":
        return (
          <ViewContainer>
            <LabTechnicianProfile />
          </ViewContainer>
        );

      default:
        return (
          <ViewContainer>
            <DashboardContent />
          </ViewContainer>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 font-inter">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isDesktop={isDesktop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="space-y-10">
          <SidebarButton
            onClick={() => handleNavigate("/lab_technician/dashboard")}
            icon={<Home className="h-5 w-5" />}
            label="Dashboard Overview"
            isExpanded={isSidebarOpen}
            isActive={currentPage === "/lab_technician/dashboard"}
          />
          <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
            <h2
              className={`text-xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <Stethoscope className="h-6 w-6 mr-2 text-red-600" />
              {isSidebarOpen && "Patient Care"}
            </h2>
            <div className="flex flex-col gap-3">
              <SidebarButton
                onClick={() => handleNavigate("/lab_technician/Profile")}
                icon={<ClipboardList className="h-5 w-5" />}
                label="Personal Profile"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/lab_technician/Profile"}
              />
              <SidebarButton
                onClick={() =>
                  handleNavigate("/lab_technician/manage-treatments")
                }
                icon={<Stethoscope className="h-5 w-5" />}
                label="daily plans"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/lab_technician/manage-treatments"}
              />
            </div>
          </section>
          <hr className="border-gray-300 dark:border-gray-600" />
          <section>
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {isSidebarOpen && "Donor Operations"}
            </h2>
            {isSidebarOpen && (
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Manage lab_technician intake and review blood stock status.
              </p>
            )}
            <div className="flex flex-col gap-4">
              <SidebarButton
                onClick={() => handleNavigate("/lab_technician/Donor_Register")}
                icon={<UserPlus className="h-5 w-5" />}
                label="Add New Donor"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/lab_technician/Donor_Register"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/lab_technician/writeReport/")}
                icon={<UserPlus className="h-5 w-5" />}
                label="Daily donation report "
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/lab_technician/writeReport/"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/lab_technician/Donor_List")}
                icon={<Users className="h-5 w-5" />}
                label="Get Donor List"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/lab_technician/Donor_List"}
              />
            </div>
          </section>
          <hr className="border-gray-300 dark:border-gray-600" />
          <section>
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {isSidebarOpen && "Configuration"}
            </h2>
            <SidebarButton
              onClick={() => handleNavigate("/lab_technician/settings")}
              icon={<Settings className="h-5 w-5" />}
              label="Manage Settings"
              isExpanded={isSidebarOpen}
              isActive={currentPage === "/lab_technician/settings"}
            />
          </section>
        </div>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 shadow-md sm:hidden">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-full transition-colors mr-3"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-red-600">Nurse Panel</span>
          </div>
        </header>
        <main className="flex-1">{RenderPage()}</main>
      </div>
    </div>
  );
};

// EXPORT FIX: Wrap LabTechnician with DashboardLayout
const WrappedNewlab_technicianDashboard = (props) => (
  <DashboardLayout>
    <LabTechnician {...props} />
  </DashboardLayout>
);

export default WrappedNewlab_technicianDashboard;
