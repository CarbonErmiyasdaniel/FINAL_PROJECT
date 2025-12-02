import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  Home,
  User,
  FileText,
  ClipboardList,
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import HospitalStaffProfile from "../Features/hospital_staff/hospital_staff_profile.jsx";
import HospitalRequestForm from "../Features/hospital_staff/HospitalRequestForm.jsx";
import MyRequests from "../Features/hospital_staff/MyRequests.jsx";
import HospitalStaffDashboard from "../Features/hospital_staff/HospitalStaffDashboard.jsx"; // ← NEW IMPORT

// ──────────────── Reusable Sidebar Button (Same as Admin) ────────────────
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
  const baseClasses = `relative flex items-center h-12 w-full transition-all duration-300 ease-in-out font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md`;
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
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1"></span>
      )}
      <span className="flex-shrink-0">
        {React.cloneElement(icon, {
          className: `w-5 h-5 transition-colors ${
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
        <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          {label}
        </div>
      )}
    </button>
  );
};

// ──────────────── Sidebar (Red Gradient – Same as Admin) ────────────────
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
        className={`fixed inset-y-0 left-0 z-50 h-full shadow-2xl transition-all duration-300 border-r border-red-900/50 flex flex-col
          bg-gradient-to-br from-[#A51B27] to-red-900
          ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <div
          className="space-y-6 flex-shrink-0"
          style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
        >
          <div
            className={`flex items-center justify-between transition-opacity ${
              isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
              <Heart className="h-7 w-7 mr-2 text-white fill-current" />
              <span className={isDesktop && !isOpen ? "hidden" : ""}>
                HOSPITAL STAFF
              </span>
            </h1>
            {!isDesktop && (
              <button
                onClick={onClose}
                className="p-2 text-red-200 hover:text-white rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Mini Profile */}
          <div className="pt-4 border-t border-red-700">
            <div
              className={`flex items-center rounded-lg transition-all ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-200 border-3 border-white/70 flex items-center justify-center font-bold text-red-700 text-xl">
                  HS
                </div>
                <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs">
                  {isOpen ? "Edit" : <User className="w-4 h-4" />}
                </button>
              </div>
              <div
                className={`ml-4 transition-opacity ${
                  isOpen ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <p className="font-semibold text-white">Hospital Staff</p>
                <p className="text-xs text-red-200">Blood Request Manager</p>
              </div>
            </div>
          </div>
        </div>

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

      {isOpen && !isDesktop && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60 z-40"
        ></div>
      )}
    </>
  );
};

// ──────────────── Main Component ────────────────
const HospitalStaff = ({ pageKey }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pageKey || "/hospital_staff/dashboard"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (pageKey) setCurrentPage(pageKey);
  }, [pageKey]);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 640;
      setIsDesktop(desktop);
      if (!desktop) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);
  const handleNavigate = (path) => {
    if (!isDesktop) setIsSidebarOpen(false);
    setCurrentPage(path);
    navigate(path);
  };

  const RenderPage = () => {
    switch (currentPage) {
      case "/hospital_staff/dashboard":
        return <HospitalStaffDashboard />; // ← NEW INTERACTIVE DASHBOARD
      case "/hospital_staff/Profile":
        return <HospitalStaffProfile />;
      case "/hospital_staff/request-blood":
        return <HospitalRequestForm />;
      case "/hospital_staff/my-requests":
        return <MyRequests />;
      default:
        return <HospitalStaffDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-inter">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isDesktop={isDesktop}
        onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
        onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
      >
        <SidebarButton
          onClick={() => handleNavigate("/hospital_staff/dashboard")}
          icon={<Home />}
          label="Dashboard"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/hospital_staff/dashboard"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/hospital_staff/Profile")}
          icon={<User />}
          label="My Profile"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/hospital_staff/Profile"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/hospital_staff/request-blood")}
          icon={<FileText />}
          label="Create Request"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/hospital_staff/request-blood"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/hospital_staff/my-requests")}
          icon={<ClipboardList />}
          label="My Requests"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/hospital_staff/my-requests"}
        />
      </Sidebar>

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : "sm:ml-0"
        }`}
      >
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 shadow-md sm:hidden">
          <button onClick={toggleSidebar} className="p-2 text-red-600">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold text-red-600">Hospital Staff</span>
        </header>

        {RenderPage()}
      </main>
    </div>
  );
};

const WrappedHospitalStaffDashboard = (props) => (
  <DashboardLayout>
    <HospitalStaff {...props} />
  </DashboardLayout>
);

export default WrappedHospitalStaffDashboard;
