// // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // import {
// //   Menu,
// //   X,
// //   Heart,
// //   ClipboardList,
// //   Settings,
// //   Home,
// //   User,
// //   PlusCircle,
// //   Stethoscope, // Icon for Hospital Staff
// //   Activity, // Icon for Requests/Activity
// // } from "lucide-react";

// // // The following imports would be hospital staff-specific features
// // // import CreateHospitalRequestPage from "../Features/hospital/CreateHospitalRequestPage";
// // // import ViewHospitalRequestsPage from "../Features/hospital/ViewHospitalRequestsPage";
// // // import HospitalStaffProfilePage from "../Features/hospital/HospitalStaffProfilePage";
// // // import DashboardLayout from "./DashboardLayout";
// // // import HospitalDashboardContent from "../Features/hospital/HospitalDashboardContent"; // This can be removed if content is inline

// // // --- MetricCard Component ---
// // // (Re-using the MetricCard from the original Admin component)
// // const MetricCard = ({ title, value, icon, color = "indigo" }) => (
// //   <div
// //     className={`p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
// //   >
// //     <div className="flex items-center">
// //       <div
// //         className={`flex items-center justify-center p-3 text-white bg-${color}-600 rounded-lg mr-4`}
// //       >
// //         {icon}
// //       </div>
// //       <div>
// //         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
// //           {title}
// //         </p>
// //         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //           {value}
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // --- Sidebar Button Component ---
// // // (Re-using the SidebarButton from the original Admin component)
// // const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
// //   const baseClasses = `
// //     relative flex items-center h-12 w-full transition-all duration-300 ease-in-out
// //     font-medium text-white rounded-lg group
// //     hover:bg-red-700/50 hover:shadow-md
// //   `;
// //   const activeClasses = isActive
// //     ? "bg-red-800/80 shadow-inner ring-2 ring-white/50"
// //     : "bg-transparent";
// //   const paddingClasses = isExpanded ? "px-5 justify-start" : "justify-center";

// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`${baseClasses} ${activeClasses} ${paddingClasses}`}
// //       aria-label={label}
// //     >
// //       {isActive && isExpanded && (
// //         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full transform -translate-x-1"></span>
// //       )}

// //       <span className="flex-shrink-0">
// //         {React.cloneElement(icon, {
// //           className: `w-5 h-5 transition-colors duration-300 ${
// //             isActive ? "text-white" : "text-red-300 group-hover:text-white"
// //           }`,
// //         })}
// //       </span>

// //       <span
// //         className={`ml-4 text-sm whitespace-nowrap transition-opacity duration-300 ${
// //           isExpanded ? "opacity-100 block" : "opacity-0 hidden"
// //         }`}
// //       >
// //         {label}
// //       </span>

// //       {!isExpanded && (
// //         <div
// //           className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl
// //           opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
// //         >
// //           {label}
// //         </div>
// //       )}
// //     </button>
// //   );
// // };

// // // --- Sidebar Layout ---
// // // (Re-using the Sidebar layout from the original Admin component)
// // const Sidebar = ({
// //   isOpen,
// //   onMouseEnter,
// //   onMouseLeave,
// //   onClose,
// //   isDesktop,
// //   children,
// // }) => {
// //   const bgClasses = `
// //     bg-gradient-to-br from-[#A51B27] to-red-900 dark:from-red-900 dark:to-gray-900
// //   `;
// //   return (
// //     <>
// //       <aside
// //         onMouseEnter={onMouseEnter}
// //         onMouseLeave={onMouseLeave}
// //         className={`fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out
// //           border-r border-red-900/50 flex flex-col
// //           ${bgClasses}
// //           ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
// //           ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
// //         `}
// //       >
// //         <div
// //           className="space-y-6 flex-shrink-0"
// //           style={{
// //             padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem",
// //             paddingBottom: "1rem",
// //           }}
// //         >
// //           <div
// //             className={`flex items-center justify-between transition-opacity duration-300 ${
// //               isOpen || !isDesktop
// //                 ? "opacity-100 h-auto"
// //                 : "opacity-0 h-0 overflow-hidden"
// //             }`}
// //           >
// //             <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
// //               <Stethoscope className="h-7 w-7 mr-2 text-white fill-current" />
// //               <span
// //                 className={
// //                   isDesktop && !isOpen ? "hidden" : "transition-opacity"
// //                 }
// //               >
// //                 HOSPITAL STAFF
// //               </span>
// //             </h1>
// //             {!isDesktop && (
// //               <button
// //                 onClick={onClose}
// //                 className="p-2 text-red-200 hover:text-white rounded-lg transition-colors"
// //                 aria-label="Close sidebar"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>
// //             )}
// //           </div>

// //           <div className="pt-4 border-t border-red-700">
// //             <div
// //               className={`flex items-center rounded-lg transition-all duration-300 mb-3 ${
// //                 isOpen ? "justify-start" : "justify-center"
// //               } `}
// //             >
// //               <div className="relative group">
// //                 <img
// //                   src="https://via.placeholder.com/48/FFFFFF/A51B27?text=HS"
// //                   alt="Staff Profile"
// //                   className={`w-12 h-12 rounded-full border-3 border-white/70 transition-all duration-300 ${
// //                     !isOpen && isDesktop ? "scale-90" : "scale-100"
// //                   }`}
// //                 />
// //                 <button
// //                   className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center text-white text-xs font-semibold"
// //                   aria-label="Edit Profile"
// //                 >
// //                   {isOpen ? "View" : <User className="w-4 h-4" />}
// //                 </button>
// //               </div>

// //               <div
// //                 className={`ml-4 transition-opacity duration-300 ${
// //                   isOpen ? "opacity-100 block" : "opacity-0 hidden"
// //                 }`}
// //               >
// //                 <p className="font-semibold text-white">Staff Zewdu</p>
// //                 <p className="text-xs text-red-200">Hospital: City General</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div
// //           className="flex-1 overflow-y-auto space-y-4 custom-scrollbar"
// //           style={{
// //             padding:
// //               isOpen || !isDesktop ? "0 1.5rem 1.5rem" : "0 0.5rem 1.5rem",
// //           }}
// //         >
// //           {children}
// //         </div>
// //       </aside>

// //       {isOpen && !isDesktop && (
// //         <div
// //           onClick={onClose}
// //           className="fixed inset-0 bg-black opacity-60 z-40"
// //           aria-hidden="true"
// //         ></div>
// //       )}
// //     </>
// //   );
// // };

// // // --- Main Hospital Staff Dashboard ---
// // const HospitalStaffDashboard = () => {
// //   const [currentPage, setCurrentPage] = useState("/hospital/dashboard");
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isDesktop, setIsDesktop] = useState(false);
// //   const [language, setLanguage] = useState("EN");
// //   const [metrics, setMetrics] = useState({
// //     // Metrics relevant to a Hospital Staff
// //     pendingRequests: 0,
// //     fulfilledRequests: 0,
// //     currentStock: 0, // General Blood Bank Stock
// //     yourHospitalPatients: 0,
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // NOTE: You would adjust this API endpoint for the Hospital Staff's dashboard metrics
// //   const API_URL = "/api/hospitals/metrics";

// //   useEffect(() => {
// //     const fetchMetrics = async () => {
// //       try {
// //         // Assume this endpoint returns metrics for the *logged-in hospital*
// //         // const res = await axios.get(API_URL);
// //         // setMetrics(res.data);

// //         // --- Mock Data for Structure ---
// //         const mockData = {
// //           pendingRequests: 3,
// //           fulfilledRequests: 12,
// //           currentStock: 50,
// //           yourHospitalPatients: 215,
// //         };
// //         setMetrics(mockData);
// //         // -----------------------------

// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching dashboard metrics:", err);
// //         // setError("Failed to load dashboard data");
// //         setError(null); // Keep it clean for the structure
// //         setLoading(false);
// //       }
// //     };
// //     fetchMetrics();
// //   }, []);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const desktopMode = window.innerWidth >= 640;
// //       setIsDesktop(desktopMode);
// //       setIsSidebarOpen(false); // Close sidebar on mobile resize initially
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);

// //   const handleNavigate = (path) => {
// //     if (!isDesktop) setIsSidebarOpen(false);
// //     setCurrentPage(path);
// //   };

// //   const toggleLanguage = () =>
// //     setLanguage((prev) => (prev === "EN" ? "AM" : "EN"));

// //   const getTranslation = (key) => {
// //     const t = {
// //       EN: {
// //         title: "Hospital Blood Request Panel",
// //         subtitle: "City General Hospital Staff — Operational View",
// //         metrics_title: "Request Metrics & Stock Overview",
// //       },
// //       AM: {
// //         title: "የሆስፒታል ደም ጥያቄ ፓነል",
// //         subtitle: "የከተማው አጠቃላይ ሆስፒታል ሠራተኞች — የአሠራር እይታ",
// //         metrics_title: "የጥያቄ መለኪያዎች እና የደም ክምችት አጠቃላይ እይታ",
// //       },
// //     };
// //     return t[language][key];
// //   };

// //   const HospitalDashboardContent = () => (
// //     <>
// //       <div className="flex justify-between items-start mb-6">
// //         <div>
// //           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
// //             {getTranslation("title")}
// //           </h1>
// //           <p className="text-md text-gray-600 dark:text-gray-400">
// //             {getTranslation("subtitle")}
// //           </p>
// //         </div>
// //         <button
// //           onClick={toggleLanguage}
// //           className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-800"
// //         >
// //           {language === "EN" ? "አማርኛ" : "English"}
// //         </button>
// //       </div>

// //       <hr className="border-gray-300 dark:border-gray-600 mb-8" />

// //       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// //         {getTranslation("metrics_title")}
// //       </h2>

// //       {loading ? (
// //         <div className="text-center text-gray-500 animate-pulse">
// //           Loading metrics...
// //         </div>
// //       ) : error ? (
// //         <div className="text-center text-red-600">{error}</div>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// //           <MetricCard
// //             title="Pending Requests"
// //             value={metrics.pendingRequests}
// //             color="orange"
// //             icon={<Activity className="h-6 w-6" />}
// //           />
// //           <MetricCard
// //             title="Fulfilled Requests"
// //             value={metrics.fulfilledRequests}
// //             color="green"
// //             icon={<ClipboardList className="h-6 w-6" />}
// //           />
// //           <MetricCard
// //             title="Blood Center Stock"
// //             value={`${metrics.currentStock} U`}
// //             color="red"
// //             icon={<Heart className="h-6 w-6" />}
// //           />
// //           <MetricCard
// //             title="Hospital Patients"
// //             value={metrics.yourHospitalPatients}
// //             color="indigo"
// //             icon={<Stethoscope className="h-6 w-6" />}
// //           />
// //         </div>
// //       )}
// //     </>
// //   );

// //   const RenderPage = () => {
// //     switch (currentPage) {
// //       case "/hospital/dashboard":
// //         return <HospitalDashboardContent />;
// //       case "/hospital/create-request":
// //         // This component will contain the form to create a blood request
// //         return <CreateHospitalRequestPage />;
// //       case "/hospital/view-requests":
// //         // This component will show a table of all requests made by the hospital
// //         return <ViewHospitalRequestsPage />;
// //       case "/hospital/profile":
// //         // This component will allow the staff to view/update their profile
// //         return <HospitalStaffProfilePage />;
// //       default:
// //         return <HospitalDashboardContent />;
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-inter">
// //       <Sidebar
// //         isOpen={isSidebarOpen}
// //         onClose={toggleSidebar}
// //         isDesktop={isDesktop}
// //         onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
// //         onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
// //       >
// //         <SidebarButton
// //           onClick={() => handleNavigate("/hospital/dashboard")}
// //           icon={<Home />}
// //           label="Dashboard Home"
// //           isExpanded={isSidebarOpen}
// //           isActive={currentPage === "/hospital/dashboard"}
// //         />
// //         <SidebarButton
// //           onClick={() => handleNavigate("/hospital/create-request")}
// //           icon={<PlusCircle />}
// //           label="Create Blood Request"
// //           isExpanded={isSidebarOpen}
// //           isActive={currentPage === "/hospital/create-request"}
// //         />
// //         <SidebarButton
// //           onClick={() => handleNavigate("/hospital/view-requests")}
// //           icon={<ClipboardList />}
// //           label="My Requests Status"
// //           isExpanded={isSidebarOpen}
// //           isActive={currentPage === "/hospital/view-requests"}
// //         />
// //         <SidebarButton
// //           onClick={() => handleNavigate("/hospital/profile")}
// //           icon={<User />}
// //           label="Staff Profile"
// //           isExpanded={isSidebarOpen}
// //           isActive={currentPage === "/hospital/profile"}
// //         />
// //         {/*
// //         <SidebarButton
// //           onClick={() => handleNavigate("/hospital/settings")}
// //           icon={<Settings />}
// //           label="Settings"
// //           isExpanded={isSidebarOpen}
// //           isActive={currentPage === "/hospital/settings"}
// //         />
// //         */}
// //       </Sidebar>

// //       <main
// //         className={`flex-1 overflow-y-auto transition-all duration-300 ${
// //           isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : "sm:ml-0"
// //         } p-8`}
// //       >
// //         {RenderPage()}
// //       </main>
// //     </div>
// //   );
// // };

// // export default function WrappedHospitalStaffDashboard(props) {
// //   // Assuming DashboardLayout provides global context/structure
// //   return (
// //     <DashboardLayout>
// //       <HospitalStaffDashboard {...props} />
// //     </DashboardLayout>
// //   );
// // }
// ///////////////\\\\\\\\\\\\\\\\
// /* eslint-disable react-refresh/only-export-components */
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Heart,
//   ClipboardList,
//   Settings,
//   FileText,
//   Home,
//   User,
// } from "lucide-react";

// import DashboardLayout from "./DashboardLayout";
// import HospitalStaffProfile from "../Features/hospital_staff/hospital_staff_profile.jsx";
// import HospitalRequestForm from "../Features/hospital_staff/HospitalRequestForm.jsx";
// import MyRequests from "../Features/hospital_staff/MyRequests.jsx";

// const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => (
//   <button
//     onClick={onClick}
//     className={`group flex items-center justify-start text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300
//       ${
//         isActive
//           ? "bg-red-800 hover:bg-red-900 border-l-4 border-white"
//           : "bg-red-700 hover:bg-red-800"
//       }
//       ${!isExpanded ? "justify-center w-full" : "w-full"}
//     `}
//   >
//     {icon}
//     <span
//       className={`ml-3 transition-opacity duration-300 ${
//         isExpanded ? "opacity-100 block" : "opacity-0 hidden"
//       }`}
//     >
//       {label}
//     </span>
//   </button>
// );

// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => {
//   return (
//     <>
//       <aside
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         className={`
//           fixed inset-y-0 left-0 z-50 transform
//           h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out
//           border-r border-gray-200 dark:border-gray-700

//           sm:static sm:h-auto
//           ${isDesktop ? (isOpen ? "sm:w-80" : "sm:w-20") : "w-80"}
//           ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
//         `}
//       >
//         <div
//           className="flex flex-col h-full space-y-6 overflow-y-auto"
//           style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
//         >
//           <div
//             className={`items-center justify-between mb-4 ${
//               isDesktop ? "hidden" : "flex"
//             }`}
//           >
//             <h1 className="text-2xl font-bold text-red-600">
//               Hospital Staff Panel
//             </h1>
//             <button
//               onClick={onClose}
//               className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-lg transition-colors"
//               aria-label="Close sidebar"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
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

// const HospitalStaff = ({ pageKey }) => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(
//     pageKey || "/hospital_staff/dashboard"
//   );
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

//   useEffect(() => {
//     if (pageKey) {
//       setCurrentPage(pageKey);
//     }
//   }, [pageKey]);

//   useEffect(() => {
//     const handleResize = () => {
//       const desktopMode = window.innerWidth >= 640;
//       setIsDesktop(desktopMode);

//       if (!desktopMode) {
//         setIsSidebarOpen(false);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     if (!isDesktop) {
//       setIsSidebarOpen((prev) => !prev);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (isDesktop) {
//       setIsSidebarOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isDesktop) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleNavigate = (path) => {
//     if (!isDesktop) {
//       setIsSidebarOpen(false);
//     }
//     setCurrentPage(path);
//     navigate(path);
//   };

//   const DashboardContent = () => (
//     <>
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
//             Hospital Staff Dashboard 🏥
//           </h1>
//           <p className="text-md text-gray-600 dark:text-gray-400">
//             Manage Blood Requests for Your Hospital
//           </p>
//         </div>
//         <button
//           onClick={() => handleNavigate("/hospital_staff/request-blood")}
//           className="flex items-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:-translate-y-px"
//         >
//           <FileText className="w-5 h-5 mr-2" /> New Blood Request
//         </button>
//       </div>
//       <hr className="border-gray-300 dark:border-gray-600 mb-8" />
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Quick Actions
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
//         <button
//           onClick={() => handleNavigate("/hospital_staff/request-blood")}
//           className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-red-600 text-left"
//         >
//           <FileText className="h-8 w-8 text-red-600 mb-3" />
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             Create Blood Request
//           </h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Submit a new blood request for your hospital
//           </p>
//         </button>

//         <button
//           onClick={() => handleNavigate("/hospital_staff/my-requests")}
//           className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-blue-600 text-left"
//         >
//           <ClipboardList className="h-8 w-8 text-blue-600 mb-3" />
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             My Requests
//           </h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             View and track your blood requests
//           </p>
//         </button>
//       </div>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//           Blood Request Guidelines
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
//           <div className="flex items-start">
//             <span className="text-red-600 mr-2">•</span>
//             <p>Specify exact blood type and quantity needed</p>
//           </div>
//           <div className="flex items-start">
//             <span className="text-red-600 mr-2">•</span>
//             <p>Include urgency level and patient details</p>
//           </div>
//           <div className="flex items-start">
//             <span className="text-red-600 mr-2">•</span>
//             <p>Requests are reviewed by admin within 24 hours</p>
//           </div>
//           <div className="flex items-start">
//             <span className="text-red-600 mr-2">•</span>
//             <p>Track request status in real-time</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   const RenderPage = () => {
//     const ViewContainer = ({ children }) => (
//       <div className="p-8 lg:p-10">{children}</div>
//     );

//     switch (currentPage) {
//       case "/hospital_staff/dashboard":
//         return (
//           <ViewContainer>
//             <DashboardContent />
//           </ViewContainer>
//         );
//       case "/hospital_staff/Profile":
//         return (
//           <ViewContainer>
//             <HospitalStaffProfile />
//           </ViewContainer>
//         );
//       case "/hospital_staff/request-blood":
//         return (
//           <ViewContainer>
//             <HospitalRequestForm />
//           </ViewContainer>
//         );
//       case "/hospital_staff/my-requests":
//         return (
//           <ViewContainer>
//             <MyRequests />
//           </ViewContainer>
//         );

//       default:
//         return (
//           <ViewContainer>
//             <DashboardContent />
//           </ViewContainer>
//         );
//     }
//   };

//   return (
//     <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 font-inter">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//         isDesktop={isDesktop}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="space-y-10">
//           <SidebarButton
//             onClick={() => handleNavigate("/hospital_staff/dashboard")}
//             icon={<Home className="h-5 w-5" />}
//             label="Dashboard Overview"
//             isExpanded={isSidebarOpen}
//             isActive={currentPage === "/hospital_staff/dashboard"}
//           />
//           <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
//             <h2
//               className={`text-xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center transition-all duration-300 ${
//                 isSidebarOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <Heart className="h-6 w-6 mr-2 text-red-600" />
//               {isSidebarOpen && "My Profile"}
//             </h2>
//             <div className="flex flex-col gap-3">
//               <SidebarButton
//                 onClick={() => handleNavigate("/hospital_staff/Profile")}
//                 icon={<User className="h-5 w-5" />}
//                 label="View Profile"
//                 isExpanded={isSidebarOpen}
//                 isActive={currentPage === "/hospital_staff/Profile"}
//               />
//             </div>
//           </section>
//           <hr className="border-gray-300 dark:border-gray-600" />
//           <section>
//             <h2
//               className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
//                 isSidebarOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {isSidebarOpen && "Blood Requests"}
//             </h2>
//             {isSidebarOpen && (
//               <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
//                 Manage your hospital's blood requests.
//               </p>
//             )}
//             <div className="flex flex-col gap-4">
//               <SidebarButton
//                 onClick={() => handleNavigate("/hospital_staff/request-blood")}
//                 icon={<FileText className="h-5 w-5" />}
//                 label="Create Request"
//                 isExpanded={isSidebarOpen}
//                 isActive={currentPage === "/hospital_staff/request-blood"}
//               />
//               <SidebarButton
//                 onClick={() => handleNavigate("/hospital_staff/my-requests")}
//                 icon={<ClipboardList className="h-5 w-5" />}
//                 label="My Requests"
//                 isExpanded={isSidebarOpen}
//                 isActive={currentPage === "/hospital_staff/my-requests"}
//               />
//             </div>
//           </section>
//           <hr className="border-gray-300 dark:border-gray-600" />
//           <section>
//             <h2
//               className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
//                 isSidebarOpen ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {isSidebarOpen && "Configuration"}
//             </h2>
//             <SidebarButton
//               onClick={() => handleNavigate("/hospital_staff/settings")}
//               icon={<Settings className="h-5 w-5" />}
//               label="Manage Settings"
//               isExpanded={isSidebarOpen}
//               isActive={currentPage === "/hospital_staff/settings"}
//             />
//           </section>
//         </div>
//       </Sidebar>
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 shadow-md sm:hidden">
//           <div className="flex items-center">
//             <button
//               onClick={toggleSidebar}
//               className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-full transition-colors mr-3"
//               aria-label="Toggle sidebar"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <span className="text-xl font-bold text-red-600">
//               Hospital Staff Panel
//             </span>
//           </div>
//         </header>
//         <main className="flex-1">{RenderPage()}</main>
//       </div>
//     </div>
//   );
// };

// const WrappedNew_hospital_staff_Dashboard = (props) => (
//   <DashboardLayout>
//     <HospitalStaff {...props} />
//   </DashboardLayout>
// );

// export default WrappedNew_hospital_staff_Dashboard;
// src/pages/WrappedHospitalStaffDashboard.jsx (or wherever you keep it)
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
