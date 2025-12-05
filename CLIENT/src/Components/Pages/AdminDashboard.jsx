import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  X,
  Users,
  Heart,
  ClipboardList,
  Settings,
  PlusCircle,
  BarChart,
  Home,
  User,
  Briefcase,
} from "lucide-react";

import RegisterUserPage from "../Features/admin/RegisterUserPage";
import UserListPage from "../Features/admin/UserListPage";
import DashboardLayout from "./DashboardLayout";
import NurseActivityReports from "../Features/admin/NurseActivityReports";
import UserStatsDashboard from "../Features/admin/UserStatsDashboard";
import AdminProfile from "../Features/admin/AdminProfile"; // Added
import DashboardContent from "../Features/admin/DashboardContent";
// --- MetricCard Component ---
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

// --- Sidebar Button Component ---
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

// --- Sidebar Layout ---
const Sidebar = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isDesktop,
  children,
}) => {
  const bgClasses = `
    bg-gradient-to-br from-[#A51B27] to-red-900 dark:from-red-900 dark:to-gray-900
  `;
  return (
    <>
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out
          border-r border-red-900/50 flex flex-col
          ${bgClasses}
          ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <div
          className="space-y-6 flex-shrink-0"
          style={{
            padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem",
            paddingBottom: "1rem",
          }}
        >
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
                DBBC ADMIN
              </span>
            </h1>
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

          <div className="pt-4 border-t border-red-700">
            <div
              className={`flex items-center rounded-lg transition-all duration-300 mb-3 ${
                isOpen ? "justify-start" : "justify-center"
              } `}
            >
              <div className="relative group">
                <img
                  src="https://via.placeholder.com/48/FFFFFF/A51B27?text=AD"
                  alt="Admin Profile"
                  className={`w-12 h-12 rounded-full border-3 border-white/70 transition-all duration-300 ${
                    !isOpen && isDesktop ? "scale-90" : "scale-100"
                  }`}
                />
                <button
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  aria-label="Edit Profile"
                >
                  {isOpen ? "Edit" : <User className="w-4 h-4" />}
                </button>
              </div>

              <div
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <p className="font-semibold text-white">Admin Selam</p>
                <p className="text-xs text-red-200">Role: Head Admin</p>
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
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

// --- Main Admin Dashboard ---
const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState("/admin/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [metrics, setMetrics] = useState({
    totalDonors: 0,
    bloodUnits: 0,
    activeDrives: 0,
    criticalShortages: "N/A",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "/api/admins/getAllUsers";

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(API_URL);
        setMetrics(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard metrics:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const desktopMode = window.innerWidth >= 640;
      setIsDesktop(desktopMode);
      setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);

  const handleNavigate = (path) => {
    if (!isDesktop) setIsSidebarOpen(false);
    setCurrentPage(path);
  };

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "EN" ? "AM" : "EN"));

  const getTranslation = (key) => {
    const t = {
      EN: {
        title: "Debre Berhan Blood Center",
        subtitle: "Head Administrator Panel — Strategic Overview",
        metrics_title: "Current Operational Metrics",
      },
      AM: {
        title: "የደብረ ብርሃን ደም ማዕከል",
        subtitle: "ዋና አስተዳዳሪ ፓነል — አጠቃላይ እይታ",
        metrics_title: "የአሁኑ የአሰራር መለኪያዎች",
      },
    };
    return t[language][key];
  };

  const DashboardContent = () => (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
            {getTranslation("title")}
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {getTranslation("subtitle")}
          </p>
        </div>
        <button
          onClick={toggleLanguage}
          className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-800"
        >
          {language === "EN" ? "አማርኛ" : "English"}
        </button>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 mb-8" />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {getTranslation("metrics_title")}
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading metrics...
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Total Donors"
            value={metrics.totalDonors}
            color="indigo"
            icon={<Users className="h-6 w-6" />}
          />
          <MetricCard
            title="Blood Units (In Stock)"
            value={`${metrics.bloodUnits} U`}
            color="red"
            icon={<Heart className="h-6 w-6" />}
          />
          <MetricCard
            title="Active Drives"
            value={metrics.activeDrives}
            color="green"
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <MetricCard
            title="Critical Shortages"
            value={metrics.criticalShortages}
            color="orange"
            icon={<BarChart className="h-6 w-6" />}
          />
        </div>
      )}
    </>
  );

  const RenderPage = () => {
    switch (currentPage) {
      case "/admin/dashboard":
        return <DashboardContent />;
      case "/admin/register-user":
        return <RegisterUserPage />;
      case "/admin/getAllUsers":
        return <UserListPage />;
      case "/admin/NurseActivityReports":
        return <NurseActivityReports />;
      case "/admin/UserStatsDashboard":
        return <UserStatsDashboard />;

      case "/admin/profile": // Added this
        return <AdminProfile />;
      default:
        return <DashboardContent />;
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
          onClick={() => handleNavigate("/admin/dashboard")}
          icon={<Home />}
          label="Dashboard Home"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/dashboard"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/admin/getAllUsers")}
          icon={<Users />}
          label="View Users"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/getAllUsers"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/admin/register-user")}
          icon={<PlusCircle />}
          label="Register User"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/register-user"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/admin/NurseActivityReports")}
          icon={<ClipboardList />}
          label="Nurse Activity Reports"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/NurseActivityReports"}
        />

        <SidebarButton
          onClick={() => handleNavigate("/admin/profile")} // Changed this
          icon={<User />}
          label="Admin Profile" // Changed this
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/profile"} // Changed this
        />

        <SidebarButton
          onClick={() => handleNavigate("/admin/UserStatsDashboard")}
          icon={<BarChart />}
          label="User Statistics"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/admin/UserStatsDashboard"}
        />
      </Sidebar>

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : "sm:ml-0"
        } p-8`}
      >
        {RenderPage()}
      </main>
    </div>
  );
};

export default function WrappedAdminDashboard(props) {
  return (
    <DashboardLayout>
      <AdminDashboard {...props} />
    </DashboardLayout>
  );
}
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Menu,
//   X,
//   Users,
//   Heart,
//   ClipboardList,
//   Settings,
//   PlusCircle,
//   BarChart,
//   Home,
//   User,
//   Briefcase,
// } from "lucide-react";

// import RegisterUserPage from "../Features/admin/RegisterUserPage";
// import UserListPage from "../Features/admin/UserListPage";
// import DashboardLayout from "./DashboardLayout";
// import NurseActivityReports from "../Features/admin/NurseActivityReports";
// import UserStatsDashboard from "../Features/admin/UserStatsDashboard";
// import AdminProfile from "../Features/admin/AdminProfile"; // Added
// import DashboardContent from "../Features/admin/DashboardContent"; // Import the new DashboardContent component

// // --- MetricCard Component ---
// const MetricCard = ({ title, value, icon, color = "indigo" }) => (
//   <div
//     className={`p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
//   >
//     <div className="flex items-center">
//       <div
//         className={`flex items-center justify-center p-3 text-white bg-${color}-600 rounded-lg mr-4`}
//       >
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//           {title}
//         </p>
//         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
//           {value}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// // --- Sidebar Button Component ---
// const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
//   const baseClasses = `
//     relative flex items-center h-12 w-full transition-all duration-300 ease-in-out
//     font-medium text-white rounded-lg group
//     hover:bg-red-700/50 hover:shadow-md
//   `;
//   const activeClasses = isActive
//     ? "bg-red-800/80 shadow-inner ring-2 ring-white/50"
//     : "bg-transparent";
//   const paddingClasses = isExpanded ? "px-5 justify-start" : "justify-center";

//   return (
//     <button
//       onClick={onClick}
//       className={`${baseClasses} ${activeClasses} ${paddingClasses}`}
//       aria-label={label}
//     >
//       {isActive && isExpanded && (
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full transform -translate-x-1"></span>
//       )}

//       <span className="flex-shrink-0">
//         {React.cloneElement(icon, {
//           className: `w-5 h-5 transition-colors duration-300 ${
//             isActive ? "text-white" : "text-red-300 group-hover:text-white"
//           }`,
//         })}
//       </span>

//       <span
//         className={`ml-4 text-sm whitespace-nowrap transition-opacity duration-300 ${
//           isExpanded ? "opacity-100 block" : "opacity-0 hidden"
//         }`}
//       >
//         {label}
//       </span>

//       {!isExpanded && (
//         <div
//           className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl
//           opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
//         >
//           {label}
//         </div>
//       )}
//     </button>
//   );
// };

// // --- Sidebar Layout ---
// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => {
//   const bgClasses = `
//     bg-gradient-to-br from-[#A51B27] to-red-900 dark:from-red-900 dark:to-gray-900
//   `;
//   return (
//     <>
//       <aside
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         className={`fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out
//           border-r border-red-900/50 flex flex-col
//           ${bgClasses}
//           ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
//           ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
//         `}
//       >
//         <div
//           className="space-y-6 flex-shrink-0"
//           style={{
//             padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem",
//             paddingBottom: "1rem",
//           }}
//         >
//           <div
//             className={`flex items-center justify-between transition-opacity duration-300 ${
//               isOpen || !isDesktop
//                 ? "opacity-100 h-auto"
//                 : "opacity-0 h-0 overflow-hidden"
//             }`}
//           >
//             <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
//               <Heart className="h-7 w-7 mr-2 text-white fill-current" />
//               <span
//                 className={
//                   isDesktop && !isOpen ? "hidden" : "transition-opacity"
//                 }
//               >
//                 DBBC ADMIN
//               </span>
//             </h1>
//             {!isDesktop && (
//               <button
//                 onClick={onClose}
//                 className="p-2 text-red-200 hover:text-white rounded-lg transition-colors"
//                 aria-label="Close sidebar"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div>

//           <div className="pt-4 border-t border-red-700">
//             <div
//               className={`flex items-center rounded-lg transition-all duration-300 mb-3 ${
//                 isOpen ? "justify-start" : "justify-center"
//               } `}
//             >
//               <div className="relative group">
//                 <img
//                   src="https://via.placeholder.com/48/FFFFFF/A51B27?text=AD"
//                   alt="Admin Profile"
//                   className={`w-12 h-12 rounded-full border-3 border-white/70 transition-all duration-300 ${
//                     !isOpen && isDesktop ? "scale-90" : "scale-100"
//                   }`}
//                 />
//                 <button
//                   className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center text-white text-xs font-semibold"
//                   aria-label="Edit Profile"
//                 >
//                   {isOpen ? "Edit" : <User className="w-4 h-4" />}
//                 </button>
//               </div>

//               <div
//                 className={`ml-4 transition-opacity duration-300 ${
//                   isOpen ? "opacity-100 block" : "opacity-0 hidden"
//                 }`}
//               >
//                 <p className="font-semibold text-white">Admin Selam</p>
//                 <p className="text-xs text-red-200">Role: Head Admin</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="flex-1 overflow-y-auto space-y-4 custom-scrollbar"
//           style={{
//             padding:
//               isOpen || !isDesktop ? "0 1.5rem 1.5rem" : "0 0.5rem 1.5rem",
//           }}
//         >
//           {children}
//         </div>
//       </aside>

//       {isOpen && !isDesktop && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black opacity-60 z-40"
//           aria-hidden="true"
//         ></div>
//       )}
//     </>
//   );
// };

// // --- Main Admin Dashboard ---
// const AdminDashboard = () => {
//   const [currentPage, setCurrentPage] = useState("/admin/dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [language, setLanguage] = useState("EN");
//   const [metrics, setMetrics] = useState({
//     totalDonors: 0,
//     bloodUnits: 0,
//     activeDrives: 0,
//     criticalShortages: "N/A",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = "/api/admins/getAllUsers";

//   useEffect(() => {
//     const fetchMetrics = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setMetrics(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching dashboard metrics:", err);
//         setError("Failed to load dashboard data");
//         setLoading(false);
//       }
//     };
//     fetchMetrics();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const desktopMode = window.innerWidth >= 640;
//       setIsDesktop(desktopMode);
//       setIsSidebarOpen(false);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);

//   const handleNavigate = (path) => {
//     if (!isDesktop) setIsSidebarOpen(false);
//     setCurrentPage(path);
//   };

//   const toggleLanguage = () =>
//     setLanguage((prev) => (prev === "EN" ? "AM" : "EN"));

//   const getTranslation = (key) => {
//     const t = {
//       EN: {
//         title: "Debre Berhan Blood Center",
//         subtitle: "Head Administrator Panel — Strategic Overview",
//         metrics_title: "Current Operational Metrics",
//       },
//       AM: {
//         title: "የደብረ ብርሃን ደም ማዕከል",
//         subtitle: "ዋና አስተዳዳሪ ፓነል — አጠቃላይ እይታ",
//         metrics_title: "የአሁኑ የአሰራር መለኪያዎች",
//       },
//     };
//     return t[language][key];
//   };

//   const RenderPage = () => {
//     switch (currentPage) {
//       case "/admin/dashboard":
//         return (
//           <DashboardContent
//             metrics={metrics}
//             loading={loading}
//             error={error}
//             toggleLanguage={toggleLanguage}
//             language={language}
//             getTranslation={getTranslation}
//           />
//         );
//       case "/admin/register-user":
//         return <RegisterUserPage />;
//       case "/admin/getAllUsers":
//         return <UserListPage />;
//       case "/admin/NurseActivityReports":
//         return <NurseActivityReports />;
//       case "/admin/UserStatsDashboard":
//         return <UserStatsDashboard />;
//       case "/admin/profile":
//         return <AdminProfile />;
//       default:
//         return (
//           <DashboardContent
//             metrics={metrics}
//             loading={loading}
//             error={error}
//             toggleLanguage={toggleLanguage}
//             language={language}
//             getTranslation={getTranslation}
//           />
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-inter">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//         isDesktop={isDesktop}
//         onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
//         onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
//       >
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/dashboard")}
//           icon={<Home />}
//           label="Dashboard Home"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/dashboard"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/getAllUsers")}
//           icon={<Users />}
//           label="View Users"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/getAllUsers"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/register-user")}
//           icon={<PlusCircle />}
//           label="Register User"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/register-user"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/NurseActivityReports")}
//           icon={<ClipboardList />}
//           label="Nurse Activity Reports"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/NurseActivityReports"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/profile")}
//           icon={<User />}
//           label="Admin Profile"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/profile"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/admin/UserStatsDashboard")}
//           icon={<BarChart />}
//           label="User Statistics"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/admin/UserStatsDashboard"}
//         />
//       </Sidebar>

//       <main
//         className={`flex-1 overflow-y-auto transition-all duration-300 ${
//           isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : "sm:ml-0"
//         } p-8`}
//       >
//         {RenderPage()}
//       </main>
//     </div>
//   );
// };

// export default function WrappedAdminDashboard(props) {
//   return (
//     <DashboardLayout>
//       <AdminDashboard {...props} />
//     </DashboardLayout>
//   );
// }
