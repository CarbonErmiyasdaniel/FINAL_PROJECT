import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Heart, Home, User, Calendar, Droplet } from "lucide-react";

import DonorProfile from "../Features/donor/DonorProfile.jsx";
import DonorDashboardHome from "../Features/donor/DonorDashboardHome.jsx";
import DonationHistory from "../Features/donor/DonationHistory.jsx";

// ──────────────── Sidebar Button ────────────────
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
  const baseClasses = `relative flex items-center h-12 w-full transition-all duration-300 font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md`;
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
          className: `w-5 h-5 ${
            isActive ? "text-white" : "text-red-300 group-hover:text-white"
          }`,
        })}
      </span>
      <span
        className={`ml-4 text-sm transition-opacity ${
          isExpanded ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        {label}
      </span>
      {!isExpanded && (
        <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {label}
        </div>
      )}
    </button>
  );
};

// ──────────────── Sidebar ────────────────
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
            className={`flex items-center justify-between ${
              isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
              <Droplet className="h-7 w-7 mr-2 fill-current" />
              DONOR PORTAL
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

          <div className="pt-4 border-t border-red-700">
            <div
              className={`flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-200 border-3 border-white/70 flex items-center justify-center font-bold text-red-700 text-xl">
                D
              </div>
              <div
                className={`ml-4 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <p className="font-semibold text-white">Blood Donor</p>
                <p className="text-xs text-red-200">Life Saver</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto space-y-4"
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

// ──────────────── Main Donor Dashboard (No DashboardLayout needed) ────────────────
const DonorDashboard = ({ pageKey }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(pageKey || "/donor/dashboard");
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
      case "/donor/dashboard":
        return <DonorDashboardHome />;
      case "/donor/profile":
        return <DonorProfile />;
      case "/donor/history":
        return <DonationHistory />;
      default:
        return <DonorDashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isDesktop={isDesktop}
        onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
        onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
      >
        <SidebarButton
          onClick={() => handleNavigate("/donor/dashboard")}
          icon={<Home />}
          label="Dashboard"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/donor/dashboard"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/donor/profile")}
          icon={<User />}
          label="My Profile"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/donor/profile"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/donor/history")}
          icon={<Calendar />}
          label="Donation History"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/donor/history"}
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
          <span className="text-xl font-bold text-red-600 flex items-center gap-2">
            <Heart className="w-6 h-6" /> Donor Portal
          </span>
        </header>

        {RenderPage()}
      </main>
    </div>
  );
};

// NO MORE WrappedDonorDashboard → just export the main component
export default DonorDashboard;
