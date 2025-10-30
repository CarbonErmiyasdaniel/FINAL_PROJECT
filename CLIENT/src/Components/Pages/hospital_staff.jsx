/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope, // Icon for patient/treatment
  Heart, // Icon for postCounselor/blood
  ClipboardList, // Icon for records/vitals
  Settings,
  UserPlus, // Icon for Add Donor or Upload
  Users, // Icon for Donor List
  Thermometer, // Icon for Active Cases
  AlertTriangle, // Icon for Critical Alerts
  Home,
  Briefcase, // Icon for Daily Plans (more professional than Stethoscope)
  User, // Icon for Personal Profile
  FileText, // Icon for Daily Donation Report
} from "lucide-react";

// Assuming these are available globally or imported from a shared file
import DashboardLayout from "./DashboardLayout";
import HospitalStaffProfile from "../Features/hospital_staff/hospital_staff_profile.jsx";
import HospitalRequestForm from "../Features/hospital_staff/HospitalRequestForm.jsx";

// --- INFERRED COMPONENT: TopBar (Handles top navigation and toggles) ---
const TopBar = ({ toggleSidebar, isDesktop, userName, currentPageLabel }) => (
  <header className="flex items-center justify-between p-4 bg-red-700 h-16 shadow-lg flex-shrink-0">
    <div className="flex items-center">
      {/* Menu Toggle (Mobile Only) */}
      {!isDesktop && (
        <button
          onClick={toggleSidebar}
          className="p-2 text-white hover:bg-red-600 rounded-full transition-colors mr-3"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      {/* Title/Page Label - Updated for a cohesive look */}
      <div className="text-xl font-bold text-white flex items-center">
        <Heart className="h-5 w-5 mr-2 fill-current" /> BLOODNET
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <p className="text-sm text-red-100 hidden sm:block">
        Hello, <span className="font-bold uppercase">{userName}</span> |{" "}
        <span className="font-mono">{currentPageLabel}</span> | Current Time:{" "}
        {new Date().toLocaleTimeString()}
      </p>
      <button
        onClick={() => {
          /* Handle Logout */
        }}
        className="bg-red-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors hover:bg-red-900"
      >
        Logout
      </button>
    </div>
  </header>
);

// --- SHARED COMPONENT: MetricCard (Styled to match AdminDashboard) ---
const MetricCard = ({ title, value, icon, color = "indigo" }) => (
  <div
    className={`p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
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

// --- IMPROVED COMPONENT: SidebarButton (Styled for Professionalism) ---
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
  const baseClasses = `
    relative flex items-center h-12 w-full transition-all duration-300 ease-in-out
    font-medium text-white rounded-lg group
    hover:bg-red-700/50 hover:shadow-md
  `;
  const activeClasses = isActive
    ? "bg-red-800/80 shadow-inner ring-2 ring-white/50"
    : "bg-transparent";
  const paddingClasses = isExpanded ? "px-5 justify-start" : "justify-center";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${paddingClasses}`}
      aria-label={label}
    >
      {isActive && isExpanded && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full transform -translate-x-1"></span>
      )}
      <span className="flex-shrink-0">
        {React.cloneElement(icon, {
          className: `w-5 h-5 transition-colors duration-300 ${
            isActive ? "text-white" : "text-red-300 group-hover:text-white"
          }`,
        })}
      </span>
      <span
        className={`ml-4 text-sm whitespace-nowrap transition-opacity duration-300 ${
          isExpanded ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        {label}
      </span>
      {!isExpanded && (
        <div
          className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        >
          {label}
        </div>
      )}
    </button>
  );
};

// --- IMPROVED COMPONENT: Sidebar (Fixed Photo & Scrollable Menu) ---
const Sidebar = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isDesktop,
  children,
}) => {
  // Thematic Blood Bank Background: Deep Red with a subtle dark gradient
  const bgClasses = `
    bg-gradient-to-br from-[#A51B27] to-red-900 dark:from-red-900 dark:to-gray-900
  `;

  return (
    <>
      {/* Sidebar Container: Fixed, High Z-Index, and Column Flex */}
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out
          border-r border-red-900/50 flex flex-col
          ${bgClasses}
          ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        {/* TOP FIXED SECTION: Logo, Photo, Upload (Non-Scrolling) */}
        <div
          className="space-y-6 flex-shrink-0"
          style={{
            padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem",
            paddingBottom: "1rem",
          }}
        >
          {/* Header/Logo */}
          <div
            className={`flex items-center justify-between transition-opacity duration-300 ${
              isOpen || !isDesktop
                ? "opacity-100 h-auto"
                : "opacity-0 h-0 overflow-hidden"
            }`}
          >
            <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
              <Heart className="h-7 w-7 mr-2 text-white fill-current" />
              <span
                className={
                  isDesktop && !isOpen ? "hidden" : "transition-opacity"
                }
              >
                BLOODNET
              </span>
            </h1>
            {/* Close Button (Mobile Only) */}
            {!isDesktop && (
              <button
                onClick={onClose}
                className="p-2 text-red-200 hover:text-white rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* FIXED PROFILE PHOTO & UPLOAD AREA */}
          <div className="pt-4 border-t border-red-700">
            <div
              className={`flex items-center rounded-lg transition-all duration-300 mb-3 ${
                isOpen ? "justify-start" : "justify-center"
              } `}
            >
              <div className="relative group">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Nurse Profile"
                  className={`w-12 h-12 rounded-full border-3 border-white/70 transition-all duration-300 ${
                    !isOpen && isDesktop ? "scale-90" : "scale-100"
                  }`}
                />
                <button
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  aria-label="Upload Profile Image"
                >
                  {isOpen ? "Upload" : <UserPlus className="w-4 h-4" />}
                </button>
              </div>

              <div
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <p className="font-semibold text-white">Nurse Shima</p>
                <p className="text-xs text-red-200">ID: N-4589</p>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLLABLE MENU AREA: Navigation Links (Scrollable) */}
        <div
          className="flex-1 overflow-y-auto space-y-4 custom-scrollbar"
          style={{
            padding:
              isOpen || !isDesktop ? "0 1.5rem 1.5rem" : "0 0.5rem 1.5rem",
          }}
        >
          {children}
        </div>
      </aside>
      {/* Mobile Overlay */}
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
const HospitalStaff = ({ pageKey }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pageKey || "/hospital_staff/dashboard"
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
      } else {
        // Automatically open sidebar on desktop on load if it wasn't explicitly closed before
        setIsSidebarOpen(true);
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
    if (isDesktop && !isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const handleNavigate = (path) => {
    // Acknowledging Saved Information: Proceeding to the next step (front end part) is fine.
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
    setCurrentPage(path);
    navigate(path);
  };

  const DashboardContent = () => (
    // ... Dashboard Content (unchanged)
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            DONOR Operations Panel 👩‍⚕️
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Real-Time Patient & Resource Management
          </p>
        </div>
        <button
          onClick={() => handleNavigate("/post_counselor/add_donor")}
          className="flex items-center bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-red-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:-translate-y-px"
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

    switch (currentPage) {
      case "/hospital_staff/dashboard":
        return (
          <ViewContainer>
            <DashboardContent />
          </ViewContainer>
        );
      case "/hospital_staff/Profile":
        return (
          <ViewContainer>
            <HospitalStaffProfile />
          </ViewContainer>
        );
      case "/hospital_staff/request-blood":
        return (
          <ViewContainer>
            <HospitalRequestForm />
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-inter">
      {/* 1. Sidebar - Fixed with high z-index (z-50) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isDesktop={isDesktop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation links */}
        <div className="space-y-4">
          {/* ... Navigation Sections (Omitted for brevity) ... */}
          <SidebarButton
            onClick={() => handleNavigate("/hospital_staff/dashboard")}
            icon={<Home className="h-5 w-5" />}
            label="Dashboard Overview"
            isExpanded={isSidebarOpen}
            isActive={currentPage === "/hospital_staff/dashboard"}
          />
          <section className="pt-4 border-t border-red-700">
            <h2
              className={`text-sm font-semibold text-red-200 uppercase tracking-wider mb-2 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100 block px-4" : "opacity-0 hidden"
              }`}
            >
              Patient Care
            </h2>
            <div className="flex flex-col gap-1">
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/Profile")}
                icon={<User className="h-5 w-5" />}
                label="Personal Profile"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/Profile"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/request-blood")}
                icon={<Briefcase className="h-5 w-5" />}
                label="Daily Plans & Tasks"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/request-blood"}
              />
            </div>
          </section>
          <section className="pt-4 border-t border-red-700">
            <h2
              className={`text-sm font-semibold text-red-200 uppercase tracking-wider mb-2 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100 block px-4" : "opacity-0 hidden"
              }`}
            >
              Donor Operations
            </h2>
            <div className="flex flex-col gap-1">
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/Donor_Register")}
                icon={<UserPlus className="h-5 w-5" />}
                label="Register New Donor"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/Donor_Register"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/writeReport/")}
                icon={<FileText className="h-5 w-5" />}
                label="Daily Donation Report"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/writeReport/"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/Donor_List")}
                icon={<Users className="h-5 w-5" />}
                label="Donor Management"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/Donor_List"}
              />
              <SidebarButton
                onClick={() => handleNavigate("/hospital_staff/blood_stock")}
                icon={<Heart className="h-5 w-5" />}
                label="Current Blood Stock"
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/hospital_staff/blood_stock"}
              />
            </div>
          </section>
          <section className="pt-4 border-t border-red-700">
            <h2
              className={`text-sm font-semibold text-red-200 uppercase tracking-wider mb-2 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100 block px-4" : "opacity-0 hidden"
              }`}
            >
              System
            </h2>
            <SidebarButton
              onClick={() => handleNavigate("/hospital_staff/settings")}
              icon={<Settings className="h-5 w-5" />}
              label="Manage Settings"
              isExpanded={isSidebarOpen}
              isActive={currentPage === "/hospital_staff/settings"}
            />
          </section>
        </div>
      </Sidebar>

      {/* 2. Main Content Area - Uses margin to prevent overlap */}
      <div
        className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 
          ${isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : "ml-0"}
          `}
      >
        {/* TopBar (now integrated into the main content wrapper) */}
        <TopBar
          toggleSidebar={toggleSidebar}
          isDesktop={isDesktop}
          userName="MERN!"
          currentPageLabel="Hospital Staff Dashboard"
        />

        <main className="flex-1">{RenderPage()}</main>
      </div>
    </div>
  );
};

// 3. EXPORT FIX: DashboardLayout is the outermost wrapper, ensuring it provides the main structure.
const WrappedNew_hospital_staff_Dashboard = (props) => (
  <DashboardLayout>
    <HospitalStaff {...props} />
  </DashboardLayout>
);

export default WrappedNew_hospital_staff_Dashboard;
