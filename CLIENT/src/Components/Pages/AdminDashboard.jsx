import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Users,
  Heart,
  ClipboardList,
  Settings,
  Archive,
  PlusCircle,
  BarChart,
  Home,
} from "lucide-react";
import RegisterUserPage from "../Features/admin/RegisterUserPage";
import UserListPage from "../Features/admin/UserListPage";
import DashboardLayout from "./DashboardLayout";
import NurseActivityReports from "../Features/admin/NurseActivityReports";
// Import the layout component and wrap AdminDashboard's export
// Assuming correct relative path to the layout

// --- Metric Card Component (RETAINED) ---
// ... (MetricCard component code remains the same)
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

// --- Sidebar Component (RETAINED) ---
// ... (Sidebar component code remains the same)
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
      {/* Sidebar Panel */}
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // The key is the transition and conditional width/positioning based on state and screen size
        className={`
          fixed inset-y-0 left-0 z-50 transform 
          h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out
          border-r border-gray-200 dark:border-gray-700
          
          // Desktop (sm: and up): Static position, controlled width
          sm:static sm:h-auto 
          ${isDesktop ? (isOpen ? "sm:w-80" : "sm:w-20") : "w-80"}

          // Mobile (Below sm): Fixed position, full width, sliding
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <div
          // Use flex-col and overflow-y-auto to manage content scrolling
          className="flex flex-col h-full space-y-6 overflow-y-auto"
          // Conditional Padding based on desktop state (full pad when open, minimal when collapsed)
          style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
        >
          {/* Sidebar Header (Close Button on Mobile) */}
          <div
            className={`items-center justify-between mb-4 ${
              isDesktop ? "hidden" : "flex"
            }`}
          >
            <h1 className="text-2xl font-bold text-red-600">Control Panel</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Content (Children - now using conditional rendering internally) */}
          {children}
        </div>
      </aside>

      {/* Backdrop (for Mobile Only when sidebar is open) */}
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
// -----------------------------------

// --- Sidebar Button Component (RETAINED) ---
// ... (SidebarButton component code remains the same)
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => (
  <button
    onClick={onClick}
    // Use a group utility to ensure hover applies to the whole row
    className={`group flex items-center justify-start text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300
        ${
          isActive
            ? "bg-red-800 hover:bg-red-900 border-l-4 border-white"
            : "bg-red-700 hover:bg-red-800"
        }
        // Ensures button content is centered when collapsed
        ${!isExpanded ? "justify-center w-full" : "w-full"}
    `}
  >
    {icon}
    {/* Text Label: Visible only when sidebar is expanded */}
    <span
      className={`ml-3 transition-opacity duration-300 ${
        isExpanded ? "opacity-100 block" : "opacity-0 hidden"
      }`}
    >
      {label}
    </span>
  </button>
);
// -----------------------------------

// --- Main Application Component (AdminDashboard) ---
const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState("/admin/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [language, setLanguage] = useState("EN");

  // --- Core Logic: State and Responsiveness (RETAINED) ---
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
  // ---------------------------------------------

  // Language Handlers (RETAINED)
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "EN" ? "AM" : "EN"));
  };

  // Simulated Navigation Handler (RETAINED)
  const handleNavigate = (path) => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
    setCurrentPage(path);
  };
  // ------------------------------------------------------

  // Translation function (RETAINED)
  const getTranslation = (key) => {
    const translations = {
      EN: {
        title: "Debre Berhan Blood Center 🩸",
        subtitle: "Head Administrator Panel — Strategic Overview",
        lang_btn: "Change to Amharic (AM)",
        lang_btn_am: "ወደ እንግሊዝኛ ቀይር (EN)",
        metrics_title: "Current Operational Metrics",
        staff_title: "Staff & User Management",
        core_ops_title: "Core Operations",
        donor_eng_title: "Donor Engagement Overview",
        donor_goal: "75% Target Achieved",
        donor_desc: "Quickly manage donor records and critical inventory.",
        register_user: "Register New Donor",
        view_history: "View Donation History",
        view_users: "View All Users",
        center_settings: "Manage Center Settings",
        archive_records: "Nurse activity reports",
        manage_staff: "Manage Staff Roles",
      },
      AM: {
        title: "የደብረ ብርሃን ደም ማዕከል 🩸",
        subtitle: "ዋና አስተዳዳሪ ፓነል — ስትራቴጂክ አጠቃላይ እይታ",
        lang_btn: "Change to Amharic (AM)",
        lang_btn_am: "ወደ እንግሊዝኛ ቀይር (EN)",
        metrics_title: "የአሁን የአሠራር መለኪያዎች",
        staff_title: "የሰራተኞች እና ተጠቃሚ አስተዳደር",
        core_ops_title: "ዋና ተግባራት",
        donor_eng_title: "የለጋሽ ተሳትፎ አጠቃላይ እይታ",
        donor_goal: "75% ኢላማ ተሳክቷል",
        donor_desc: "የለጋሽ መዝገቦችን እና ወሳኝ የደም ክምችትን በፍጥነት ያስተዳድሩ።",
        register_user: "አዲስ ለጋሽ ይመዝግቡ",
        view_history: "የልገሳ ታሪክ ይመልከቱ",
        view_users: "ሁሉንም ተጠቃሚዎች ይመልከቱ",
        center_settings: "የማዕከል ቅንብሮችን ያስተዳድሩ",
        archive_records: "የቀድሞ መዝገቦችን በማህደር ያስቀምጡ",
        manage_staff: "የሰራተኛ ሚናዎችን ያስተዳድሩ",
      },
    };
    return (
      (translations[language] && translations[language][key]) ||
      translations["EN"][key]
    );
  };

  // Content for the main dashboard body (RETAINED)
  const DashboardContent = () => (
    <>
      {/* --- Header Section (Now inside Main Content Area) --- */}
      <div className="flex justify-between items-start mb-6">
        <div>
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            {getTranslation("title")}
          </h1>
          {/* Subtitle - Displayed for context */}
          <p className="text-md text-gray-600 dark:text-gray-400">
            {getTranslation("subtitle")}
          </p>
        </div>

        {/* --- Utility Buttons Group --- */}
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
        </div>
      </div>

      {/* --- Horizontal Line for separation --- */}
      <hr className="border-gray-300 dark:border-gray-600 mb-8" />

      {/* --- Key Metrics Section --- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {getTranslation("metrics_title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Metric Cards */}
        <MetricCard
          title="Total Donors"
          value="1,245"
          color="red"
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="Blood Units (In Stock)"
          value="45 U"
          color="blue"
          icon={<Heart className="h-6 w-6" />}
        />
        <MetricCard
          title="Active Drives"
          value="3"
          color="green"
          icon={<ClipboardList className="h-6 w-6" />}
        />
        <MetricCard
          title="Critical Shortages"
          value="O- Neg"
          color="yellow"
          icon={<BarChart className="h-6 w-6" />}
        />
      </div>
    </>
  );

  // --- NEW: Function to conditionally render the correct page content (RETAINED) ---
  const RenderPage = () => {
    // Wrap all views in a consistent container for styling
    const ViewContainer = ({ children }) => (
      <div className="p-8 lg:p-10">{children}</div>
    );

    // Non-dashboard pages get a simpler content wrapper
    const SimpleContent = ({ title }) => (
      <ViewContainer>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Content for the {title} route is rendered here.
        </p>
        <p className="mt-8 text-sm font-mono text-blue-600 dark:text-blue-400">
          Current Simulated Route: {currentPage}
        </p>
      </ViewContainer>
    );

    switch (currentPage) {
      case "/admin/dashboard":
        return (
          <ViewContainer>
            <DashboardContent />
          </ViewContainer>
        );
      case "/admin/register-user":
        return (
          <ViewContainer>
            <RegisterUserPage />
          </ViewContainer>
        );
      case "/admin/getAllUsers":
        return (
          <ViewContainer>
            <UserListPage />
          </ViewContainer>
        );
      case "/admin/NurseActivityReports":
        return (
          <ViewContainer>
            <NurseActivityReports />
          </ViewContainer>
        );
      case "/admin/manage-staff":
        return <SimpleContent title={getTranslation("manage_staff")} />;
      case "/admin/history":
        return <SimpleContent title={getTranslation("view_history")} />;

      case "/admin/settings":
        return <SimpleContent title={getTranslation("center_settings")} />;

      default:
        return (
          <ViewContainer>
            <DashboardContent />
          </ViewContainer>
        );
    }
  };
  // --------------------------------------------------------------------

  return (
    // MODIFIED: The main container is now a flexbox for the sidebar and main content.
    // This container is now the 'children' of DashboardLayout.
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 font-inter">
      {/* 1. Sidebar Component (Fixed/Sliding/Hover) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isDesktop={isDesktop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sidebar Content. All text labels are conditionally rendered based on isSidebarOpen (RETAINED) */}
        <div className="space-y-10">
          {/* Dashboard Home Link (RETAINED) */}
          <SidebarButton
            onClick={() => handleNavigate("/admin/dashboard")}
            icon={<Home className="h-5 w-5" />}
            label="Dashboard Home"
            isExpanded={isSidebarOpen}
            isActive={currentPage === "/admin/dashboard"}
          />

          {/* SECTION: Profile Management (RETAINED) */}
          <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
            <h2
              className={`text-xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <Users className="h-6 w-6 mr-2 text-red-600" />
              {isSidebarOpen && getTranslation("staff_title")}
            </h2>
            <div className="flex flex-col gap-3">
              {/* Button 1: Manage Staff Roles (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/manage-staff")}
                icon={<Users className="h-5 w-5" />}
                label={getTranslation("manage_staff")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/manage-staff"}
              />
              {/* Button 2: View Donation History (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/history")}
                icon={<ClipboardList className="h-5 w-5" />}
                label={getTranslation("view_history")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/history"}
              />
            </div>
          </section>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Action Center Section (RETAINED) */}
          <section>
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {isSidebarOpen && getTranslation("core_ops_title")}
            </h2>
            {isSidebarOpen && (
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                {getTranslation("donor_desc")}
              </p>
            )}

            {/* Dynamic Buttons Section (RETAINED) */}
            <div className="flex flex-col gap-4">
              {/* Add User - Primary Action (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/register-user")}
                icon={<PlusCircle className="h-5 w-5" />}
                label={getTranslation("register_user")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/register-user"}
              />

              {/* View Reports - Secondary Action (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/getAllUsers")}
                icon={<Users className="h-5 w-5" />}
                label={getTranslation("view_users")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/getAllUsers"}
              />

              {/* Configure Settings - Tertiary Action (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/settings")}
                icon={<Settings className="h-5 w-5" />}
                label={getTranslation("center_settings")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/settings"}
              />

              {/* Data Cleanup Utility (RETAINED) */}
              <SidebarButton
                onClick={() => handleNavigate("/admin/NurseActivityReports")}
                icon={<Archive className="h-5 w-5" />}
                label={getTranslation("archive_records")}
                isExpanded={isSidebarOpen}
                isActive={currentPage === "/admin/NurseActivityReports"}
              />
            </div>
          </section>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Donor Engagement Section (RETAINED) */}
          <section>
            <h2
              className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {isSidebarOpen && getTranslation("donor_eng_title")}
            </h2>
            {isSidebarOpen && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Monthly Donor Goal Progress
                </h3>

                {/* Progress Bar Visual (RETAINED) */}
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="text-right">
                      {/* Badge uses sharp corners (rounded-none) and red background */}
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-none text-white bg-red-600 dark:text-red-200 dark:bg-red-800 shadow-md">
                        {getTranslation("donor_goal")}
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
            )}
          </section>
        </div>
      </Sidebar>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Main Header Bar (ONLY for Mobile toggle) - This is NOW RETAINED as it holds the Menu button for mobile! */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 shadow-md sm:hidden">
          <div className="flex items-center">
            {/* Menu Toggle Button (Only visible on small screens) */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-full transition-colors mr-3"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-red-600">DBBC Admin</span>
          </div>
        </header>

        {/* Content Body Area: NOW USES RenderPage() */}
        <main className="flex-1">{RenderPage()}</main>
      </div>
    </div>
  );
};

// EXPORT FIX: Wrap AdminDashboard with DashboardLayout
// This places the DashboardLayout header *above* the AdminDashboard content.
const WrappedAdminDashboard = (props) => (
  <DashboardLayout>
    <AdminDashboard {...props} />
  </DashboardLayout>
);

export default WrappedAdminDashboard;
