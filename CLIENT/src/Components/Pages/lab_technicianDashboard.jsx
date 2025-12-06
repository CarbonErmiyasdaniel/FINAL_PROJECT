// // /* eslint-disable react-refresh/only-export-components */
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Menu,
// //   X,
// //   Stethoscope, // Icon for patient/treatment
// //   Heart, // Icon for lab_technician/blood
// //   ClipboardList, // Icon for records/vitals
// //   Settings,
// //   UserPlus, // Icon for Add Donor
// //   Users, // Icon for Donor List
// //   Thermometer, // Icon for Active Cases
// //   AlertTriangle, // Icon for Critical Alerts
// //   Home,
// // } from "lucide-react";

// // // Assuming these are available globally or imported from a shared file
// // import DashboardLayout from "./DashboardLayout";
// // import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
// // // --- SHARED COMPONENT: MetricCard (Styled to match AdminDashboard) ---
// // const MetricCard = ({ title, value, icon, color = "blue" }) => (
// //   <div
// //     className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-l-4 border-${color}-600 transition-all duration-300 hover:shadow-2xl`}
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

// // // --- SHARED COMPONENT: SidebarButton (Styled to match AdminDashboard) ---
// // const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => (
// //   <button
// //     onClick={onClick}
// //     className={`group flex items-center justify-start text-white font-semibold py-3 px-4 rounded-none shadow-lg transition-all duration-300
// //       ${
// //         isActive
// //           ? "bg-red-800 hover:bg-red-900 border-l-4 border-white"
// //           : "bg-red-700 hover:bg-red-800"
// //       }
// //       ${!isExpanded ? "justify-center w-full" : "w-full"}
// //     `}
// //   >
// //     {icon}
// //     <span
// //       className={`ml-3 transition-opacity duration-300 ${
// //         isExpanded ? "opacity-100 block" : "opacity-0 hidden"
// //       }`}
// //     >
// //       {label}
// //     </span>
// //   </button>
// // );

// // // --- SHARED COMPONENT: Sidebar (Adapted from AdminDashboard) ---
// // const Sidebar = ({
// //   isOpen,
// //   onMouseEnter,
// //   onMouseLeave,
// //   onClose,
// //   isDesktop,
// //   children,
// // }) => {
// //   return (
// //     <>
// //       <aside
// //         onMouseEnter={onMouseEnter}
// //         onMouseLeave={onMouseLeave}
// //         className={`
// //           fixed inset-y-0 left-0 z-50 transform
// //           h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out
// //           border-r border-gray-200 dark:border-gray-700

// //           sm:static sm:h-auto
// //           ${isDesktop ? (isOpen ? "sm:w-80" : "sm:w-20") : "w-80"}
// //           ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
// //         `}
// //       >
// //         <div
// //           className="flex flex-col h-full space-y-6 overflow-y-auto"
// //           style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
// //         >
// //           <div
// //             className={`items-center justify-between mb-4 ${
// //               isDesktop ? "hidden" : "flex"
// //             }`}
// //           >
// //             <h1 className="text-2xl font-bold text-red-600">Nurse Panel</h1>
// //             <button
// //               onClick={onClose}
// //               className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-lg transition-colors"
// //               aria-label="Close sidebar"
// //             >
// //               <X className="w-6 h-6" />
// //             </button>
// //           </div>
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

// // // --- Main Application Component () ---
// // const LabTechnician = ({ pageKey }) => {
// //   const navigate = useNavigate();
// //   const [currentPage, setCurrentPage] = useState(
// //     pageKey || "/lab_technician/dashboard"
// //   );
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isDesktop, setIsDesktop] = useState(false);

// //   useEffect(() => {
// //     if (pageKey) {
// //       setCurrentPage(pageKey);
// //     }
// //   }, [pageKey]);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const desktopMode = window.innerWidth >= 640;
// //       setIsDesktop(desktopMode);

// //       if (!desktopMode) {
// //         setIsSidebarOpen(false);
// //       }
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const toggleSidebar = () => {
// //     if (!isDesktop) {
// //       setIsSidebarOpen((prev) => !prev);
// //     }
// //   };

// //   const handleMouseEnter = () => {
// //     if (isDesktop) {
// //       setIsSidebarOpen(true);
// //     }
// //   };

// //   const handleMouseLeave = () => {
// //     if (isDesktop) {
// //       setIsSidebarOpen(false);
// //     }
// //   };

// //   const handleNavigate = (path) => {
// //     if (!isDesktop) {
// //       setIsSidebarOpen(false);
// //     }
// //     setCurrentPage(path);
// //     navigate(path);
// //   };

// //   const DashboardContent = () => (
// //     <>
// //       <div className="flex justify-between items-start mb-6">
// //         <div>
// //           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
// //             DONER Operations Panel 👩‍⚕️
// //           </h1>
// //           <p className="text-md text-gray-600 dark:text-gray-400">
// //             Real-Time Patient & Resource Management
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => handleNavigate("/lab_technician/add_donor")}
// //           className="flex items-center bg-blue-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-px"
// //         >
// //           <UserPlus className="w-5 h-5 mr-2" /> Add New Donor
// //         </button>
// //       </div>
// //       <hr className="border-gray-300 dark:border-gray-600 mb-8" />
// //       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// //         Current Patient Metrics
// //       </h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// //         <MetricCard
// //           title="Patients Assigned"
// //           color="indigo"
// //           value="18"
// //           icon={<Stethoscope className="h-6 w-6" />}
// //         />
// //         <MetricCard
// //           title="Medication Queue"
// //           value="45 Tasks"
// //           color="red"
// //           icon={<ClipboardList className="h-6 w-6" />}
// //         />
// //         <MetricCard
// //           title="Active Cases"
// //           value="4"
// //           color="yellow"
// //           icon={<Thermometer className="h-6 w-6" />}
// //         />
// //         <MetricCard
// //           title="Critical Alerts"
// //           value="1"
// //           color="orange"
// //           icon={<AlertTriangle className="h-6 w-6" />}
// //         />
// //       </div>
// //       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
// //         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Scheduled Treatments Overview
// //         </h3>
// //         <p className="text-gray-600 dark:text-gray-400">
// //           *A detailed list/table of patient vital signs and treatment schedules
// //           would go here to match the data-heavy look of an Admin dashboard.*
// //         </p>
// //       </div>
// //     </>
// //   );

// //   const RenderPage = () => {
// //     const ViewContainer = ({ children }) => (
// //       <div className="p-8 lg:p-10">{children}</div>
// //     );

// //     const SimpleContent = ({ title }) => (
// //       <ViewContainer>
// //         <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //           {title}
// //         </h1>
// //         <p className="mt-4 text-gray-600 dark:text-gray-400">
// //           Content for the **{title}** route is rendered here.
// //         </p>
// //         <p className="mt-8 text-sm font-mono text-blue-600 dark:text-blue-400">
// //           Current Simulated Route: {currentPage}
// //         </p>
// //       </ViewContainer>
// //     );

// //     switch (currentPage) {
// //       case "/lab_technician/dashboard":
// //         return (
// //           <ViewContainer>
// //             <DashboardContent />
// //           </ViewContainer>
// //         );
// //       case "/lab_technician/Profile":
// //         return (
// //           <ViewContainer>
// //             <LabTechnicianProfile />
// //           </ViewContainer>
// //         );

// //       default:
// //         return (
// //           <ViewContainer>
// //             <DashboardContent />
// //           </ViewContainer>
// //         );
// //     }
// //   };

// //   return (
// //     <div className="flex h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 font-inter">
// //       <Sidebar
// //         isOpen={isSidebarOpen}
// //         onClose={toggleSidebar}
// //         isDesktop={isDesktop}
// //         onMouseEnter={handleMouseEnter}
// //         onMouseLeave={handleMouseLeave}
// //       >
// //         <div className="space-y-10">
// //           <SidebarButton
// //             onClick={() => handleNavigate("/lab_technician/dashboard")}
// //             icon={<Home className="h-5 w-5" />}
// //             label="Dashboard Overview"
// //             isExpanded={isSidebarOpen}
// //             isActive={currentPage === "/lab_technician/dashboard"}
// //           />
// //           <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
// //             <h2
// //               className={`text-xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center transition-all duration-300 ${
// //                 isSidebarOpen ? "opacity-100" : "opacity-0"
// //               }`}
// //             >
// //               <Stethoscope className="h-6 w-6 mr-2 text-red-600" />
// //               {isSidebarOpen && "Patient Care"}
// //             </h2>
// //             <div className="flex flex-col gap-3">
// //               <SidebarButton
// //                 onClick={() => handleNavigate("/lab_technician/Profile")}
// //                 icon={<ClipboardList className="h-5 w-5" />}
// //                 label="Personal Profile"
// //                 isExpanded={isSidebarOpen}
// //                 isActive={currentPage === "/lab_technician/Profile"}
// //               />
// //               <SidebarButton
// //                 onClick={() =>
// //                   handleNavigate("/lab_technician/manage-treatments")
// //                 }
// //                 icon={<Stethoscope className="h-5 w-5" />}
// //                 label="daily plans"
// //                 isExpanded={isSidebarOpen}
// //                 isActive={currentPage === "/lab_technician/manage-treatments"}
// //               />
// //             </div>
// //           </section>
// //           <hr className="border-gray-300 dark:border-gray-600" />
// //           <section>
// //             <h2
// //               className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
// //                 isSidebarOpen ? "opacity-100" : "opacity-0"
// //               }`}
// //             >
// //               {isSidebarOpen && "Donor Operations"}
// //             </h2>
// //             {isSidebarOpen && (
// //               <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
// //                 Manage lab_technician intake and review blood stock status.
// //               </p>
// //             )}
// //             <div className="flex flex-col gap-4">
// //               <SidebarButton
// //                 onClick={() => handleNavigate("/lab_technician/Donor_Register")}
// //                 icon={<UserPlus className="h-5 w-5" />}
// //                 label="Add New Donor"
// //                 isExpanded={isSidebarOpen}
// //                 isActive={currentPage === "/lab_technician/Donor_Register"}
// //               />
// //               <SidebarButton
// //                 onClick={() => handleNavigate("/lab_technician/writeReport/")}
// //                 icon={<UserPlus className="h-5 w-5" />}
// //                 label="Daily donation report "
// //                 isExpanded={isSidebarOpen}
// //                 isActive={currentPage === "/lab_technician/writeReport/"}
// //               />
// //               <SidebarButton
// //                 onClick={() => handleNavigate("/lab_technician/Donor_List")}
// //                 icon={<Users className="h-5 w-5" />}
// //                 label="Get Donor List"
// //                 isExpanded={isSidebarOpen}
// //                 isActive={currentPage === "/lab_technician/Donor_List"}
// //               />
// //             </div>
// //           </section>
// //           <hr className="border-gray-300 dark:border-gray-600" />
// //           <section>
// //             <h2
// //               className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
// //                 isSidebarOpen ? "opacity-100" : "opacity-0"
// //               }`}
// //             >
// //               {isSidebarOpen && "Configuration"}
// //             </h2>
// //             <SidebarButton
// //               onClick={() => handleNavigate("/lab_technician/settings")}
// //               icon={<Settings className="h-5 w-5" />}
// //               label="Manage Settings"
// //               isExpanded={isSidebarOpen}
// //               isActive={currentPage === "/lab_technician/settings"}
// //             />
// //           </section>
// //         </div>
// //       </Sidebar>
// //       <div className="flex-1 flex flex-col overflow-y-auto">
// //         <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 shadow-md sm:hidden">
// //           <div className="flex items-center">
// //             <button
// //               onClick={toggleSidebar}
// //               className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 rounded-full transition-colors mr-3"
// //               aria-label="Toggle sidebar"
// //             >
// //               <Menu className="w-6 h-6" />
// //             </button>
// //             <span className="text-xl font-bold text-red-600">Nurse Panel</span>
// //           </div>
// //         </header>
// //         <main className="flex-1">{RenderPage()}</main>
// //       </div>
// //     </div>
// //   );
// // };

// // // EXPORT FIX: Wrap LabTechnician with DashboardLayout
// // const WrappedNewlab_technicianDashboard = (props) => (
// //   <DashboardLayout>
// //     <LabTechnician {...props} />
// //   </DashboardLayout>
// // );

// // export default WrappedNewlab_technicianDashboard;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   User,
//   ClipboardList,
//   Building2,
//   BarChart3,
//   Home,
//   Heart,
// } from "lucide-react";

// import DashboardLayout from "./DashboardLayout";
// // import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
// // import TestListPage from "../Features/lab_technician/TestListPage"; // Your page
// import HospitalRequests from "../Features/lab_technician/HospitalRequests";

// // --- MetricCard (Same as Admin) ---
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

// // --- SidebarButton (Same beautiful style as Admin) ---
// const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
//   const baseClasses = `relative flex items-center h-12 w-full transition-all duration-300 ease-in-out font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md`;
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
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1"></span>
//       )}
//       <span className="flex-shrink-0">
//         {React.cloneElement(icon, {
//           className: `w-5 h-5 transition-colors ${
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
//         <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
//           {label}
//         </div>
//       )}
//     </button>
//   );
// };

// // --- Sidebar Component ---
// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => {
//   const bgClasses =
//     "bg-gradient-to-br from-[#A51B27] to-red-900 dark:from-red-900 dark:to-gray-900";

//   return (
//     <>
//       <aside
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         className={`fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out border-r border-red-900/50 flex flex-col ${bgClasses}
//           ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
//           ${
//             !isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
//           }`}
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
//               <span className={isDesktop && !isOpen ? "hidden" : ""}>
//                 LAB TECHNICIAN
//               </span>
//             </h1>
//             {!isDesktop && (
//               <button
//                 onClick={onClose}
//                 className="p-2 text-red-200 hover:text-white rounded-lg"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div>

//           {/* Profile Avatar */}
//           <div
//             className={`flex items-center rounded-lg transition-all duration-300 ${
//               isOpen ? "justify-start" : "justify-center"
//             }`}
//           >
//             <div className="relative group">
//               <img
//                 src="https://via.placeholder.com/48/FFFFFF/A51B27?text=LT"
//                 alt="Technician"
//                 className={`w-12 h-12 rounded-full border-3 border-white/70 transition-all ${
//                   !isOpen && isDesktop ? "scale-90" : "scale-100"
//                 }`}
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs font-semibold">
//                 {isOpen ? "Edit" : <User className="w-4 h-4" />}
//               </div>
//             </div>
//             <div
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100 block" : "opacity-0 hidden"
//               }`}
//             >
//               <p className="font-semibold text-white">Lab Technician</p>
//               <p className="text-xs text-red-200">Role: Blood Lab</p>
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

// // --- Main Lab Technician Dashboard ---
// const LabTechnicianDashboard = () => {
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState("/lab-technician/dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 640;
//       setIsDesktop(desktop);
//       if (!desktop) setIsSidebarOpen(false);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);
//   const handleNavigate = (path) => {
//     if (!isDesktop) setIsSidebarOpen(false);
//     setCurrentPage(path);
//     navigate(path);
//   };

//   const DashboardHome = () => (
//     <div>
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
//             Lab Technician Panel
//           </h1>
//           <p className="text-md text-gray-600 dark:text-gray-400">
//             Manage blood tests, requests & statistics
//           </p>
//         </div>
//       </div>
//       <hr className="border-gray-300 dark:border-gray-600 mb-8" />
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Quick Overview
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         <MetricCard
//           title="Pending Tests"
//           value="24"
//           color="blue"
//           icon={<ClipboardList className="h-6 w-6" />}
//         />
//         <MetricCard
//           title="Today's Samples"
//           value="68"
//           color="red"
//           icon={<Heart className="h-6 w-6" />}
//         />
//         <MetricCard
//           title="Hospital Requests"
//           value="12"
//           color="yellow"
//           icon={<Building2 className="h-6 w-6" />}
//         />
//         <MetricCard
//           title="Reports Generated"
//           value="145"
//           color="green"
//           icon={<BarChart3 className="h-6 w-6" />}
//         />
//       </div>
//     </div>
//   );

//   const RenderPage = () => {
//     switch (currentPage) {
//       case "/lab-technician/dashboard":
//         return <DashboardHome />;
//       case "/lab-technician/profile":
//         return <LabTechnicianProfile />;
//       case "/lab-technician/test-list":
//         return <TestListPage />;
//       case "/lab-technician/hospital-requests":
//         return <HospitalRequests />;
//       case "/lab-technician/statistical-data":
//         return <TechnicianStats />;
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-inter">
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//         isDesktop={isDesktop}
//         onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
//         onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
//       >
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/dashboard")}
//           icon={<Home />}
//           label="Dashboard"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/dashboard"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/profile")}
//           icon={<User />}
//           label="My Profile"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/profile"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/test-list")}
//           icon={<ClipboardList />}
//           label="Test List"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/test-list"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/hospital-requests")}
//           icon={<Building2 />}
//           label="Hospital Requests"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/hospital-requests"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/statistical-data")}
//           icon={<BarChart3 />}
//           label="Statistical Data"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/statistical-data"}
//         />
//       </Sidebar>

//       {/* Mobile Header */}
//       <div className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 shadow-md sm:hidden">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 text-gray-600 hover:text-red-600"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <span className="text-xl font-bold text-red-600">Lab Technician</span>
//           <div className="w-10" />
//         </header>

//         {/* Main Content */}
//         <main
//           className={`flex-1 overflow-y-auto p-6 lg:p-10 transition-all duration-300 ${
//             isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : ""
//           }`}
//         >
//           {RenderPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Wrapped Export (for DashboardLayout)
// const WrappedLabTechnicianDashboard = (props) => (
//   <DashboardLayout>
//     <LabTechnicianDashboard {...props} />
//   </DashboardLayout>
// );

// export default WrappedLabTechnicianDashboard;
///////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   User,
//   ClipboardList,
//   Building2,
//   BarChart3,
//   Heart,
// } from "lucide-react";

// import DashboardLayout from "./DashboardLayout";
// import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
// import TestListPage from "../Features/lab_technician/TestListPage.jsx"; // Create this if not exists
// import HospitalRequests from "../Features/lab_technician/HospitalRequests";
// import TechnicianStats from "../Features/lab_technician/TechnicianStats.jsx"; // Create this if not exists
// import PendingTestsPage from "../Features/lab_technician/PendingTestsPage";
// // --- Metric Card ---
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

// // --- Sidebar Button ---
// const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
//   const baseClasses = `relative flex items-center h-12 w-full transition-all duration-300 ease-in-out font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md`;
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
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1"></span>
//       )}
//       <span className="flex-shrink-0">
//         {React.cloneElement(icon, {
//           className: `w-5 h-5 transition-colors ${
//             isActive ? "text-white" : "text-red-300 group-hover:text-white"
//           }`,
//         })}
//       </span>
//       <span
//         className={`ml-4 text-sm whitespace-nowrap transition-opacity duration-300 ${
//           isExpanded ? "opacity-100" : "opacity-0 hidden"
//         }`}
//       >
//         {label}
//       </span>
//       {!isExpanded && (
//         <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
//           {label}
//         </div>
//       )}
//     </button>
//   );
// };

// // --- Fixed Sidebar (No padding warning!) ---
// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => {
//   const headerStyle =
//     isOpen || !isDesktop
//       ? {
//           paddingTop: "1.5rem",
//           paddingLeft: "1.5rem",
//           paddingRight: "1.5rem",
//           paddingBottom: "1rem",
//         }
//       : {
//           paddingTop: "1.5rem",
//           paddingLeft: "0.5rem",
//           paddingRight: "0.5rem",
//           paddingBottom: "1rem",
//         };

//   const contentStyle = {
//     paddingLeft: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
//     paddingRight: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
//     paddingBottom: "1.5rem",
//   };

//   return (
//     <>
//       <aside
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         className={`fixed inset-y-0 left-0 z-50 transform h-full shadow-2xl transition-all duration-300 ease-in-out border-r border-red-900/50 flex flex-col bg-gradient-to-br from-[#A51B27] to-red-900
//           ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
//           ${
//             !isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
//           }`}
//       >
//         <div className="space-y-6 flex-shrink-0" style={headerStyle}>
//           <div
//             className={`flex items-center justify-between transition-opacity ${
//               isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
//             }`}
//           >
//             <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
//               <Heart className="h-7 w-7 mr-2 text-white fill-current" />
//               <span className={isDesktop && !isOpen ? "hidden" : ""}>
//                 LAB TECHNICIAN
//               </span>
//             </h1>
//             {!isDesktop && (
//               <button
//                 onClick={onClose}
//                 className="p-2 text-red-200 hover:text-white rounded-lg"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div>

//           <div
//             className={`flex items-center rounded-lg transition-all ${
//               isOpen ? "justify-start" : "justify-center"
//             }`}
//           >
//             <div className="relative group">
//               <img
//                 src="https://via.placeholder.com/48/FFFFFF/A51B27?text=LT"
//                 alt="Lab Tech"
//                 className={`w-12 h-12 rounded-full border-3 border-white/70 ${
//                   !isOpen && isDesktop ? "scale-90" : "scale-100"
//                 }`}
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs">
//                 {isOpen ? "Edit" : <User className="w-4 h-4" />}
//               </div>
//             </div>
//             <div
//               className={`ml-4 transition-opacity ${
//                 isOpen ? "opacity-100" : "opacity-0 hidden"
//               }`}
//             >
//               <p className="font-semibold text-white">Lab Technician</p>
//               <p className="text-xs text-red-200">Blood Testing Unit</p>
//             </div>
//           </div>
//         </div>

//         <div
//           className="flex-1 overflow-y-auto space-y-4 custom-scrollbar"
//           style={contentStyle}
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

// // --- Main Dashboard ---
// const LabTechnicianDashboard = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState("/lab_technician/dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 640;
//       setIsDesktop(desktop);
//       if (!desktop) setIsSidebarOpen(false);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => !isDesktop && setIsSidebarOpen((prev) => !prev);

//   const handleNavigate = (path) => {
//     if (!isDesktop) setIsSidebarOpen(false);
//     setCurrentPage(path);
//     navigate(path);
//   };

//   const DashboardHome = () => (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
//           Lab Technician Panel
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
//           Manage blood testing, hospital requests & reports
//         </p>
//       </div>
//       <hr className="border-gray-300 dark:border-gray-600 mb-8" />
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Today's Overview
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <MetricCard
//           title="Pending Tests"
//           value="24"
//           color="blue"
//           icon={<ClipboardList />}
//         />
//         <MetricCard
//           title="Samples Today"
//           value="68"
//           color="red"
//           icon={<Heart />}
//         />
//         <MetricCard
//           title="Hospital Requests"
//           value="12"
//           color="yellow"
//           icon={<Building2 />}
//         />
//         <MetricCard
//           title="Reports Issued"
//           value="145"
//           color="green"
//           icon={<BarChart3 />}
//         />
//       </div>
//     </div>
//   );

//   const RenderPage = () => {
//     switch (currentPage) {
//       case "/lab_technician/dashboard":
//         return <DashboardHome />;
//       case "/lab_technician/profile":
//         return <LabTechnicianProfile />;
//       case "/lab_technician/test-list":
//         return <TestListPage />;
//       case "/lab_technician/hospital-requests":
//         return <HospitalRequests />;
//       case "/lab_technician/statistical-data":
//         return <TechnicianStats />;
//       default:
//         return <DashboardHome />;
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
//           onClick={() => handleNavigate("/lab_technician/dashboard")}
//           icon={<Home className="w-5 h-5" />}
//           label="Dashboard"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/dashboard"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/profile")}
//           icon={<User className="w-5 h-5" />}
//           label="My Profile"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/profile"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/test-list")}
//           icon={<ClipboardList className="w-5 h-5" />}
//           label="Test List"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/test-list"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/hospital-requests")}
//           icon={<Building2 className="w-5 h-5" />}
//           label="Hospital Requests"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/hospital-requests"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/statistical-data")}
//           icon={<BarChart3 className="w-5 h-5" />}
//           label="Statistical Data"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/statistical-data"}
//         />
//       </Sidebar>

//       <div className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 shadow-md sm:hidden">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 text-gray-600 hover:text-red-600"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <span className="text-xl font-bold text-red-600">Lab Technician</span>
//           <div className="w-10" />
//         </header>

//         <main
//           className={`flex-1 overflow-y-auto p-6 lg:p-10 transition-all duration-300 ${
//             isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : ""
//           }`}
//         >
//           {RenderPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// const WrappedLabTechnicianDashboard = (props) => (
//   <DashboardLayout>
//     <LabTechnicianDashboard {...props} />
//   </DashboardLayout>
// );

// export default WrappedLabTechnicianDashboard;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   User,
//   ClipboardList,
//   Building2,
//   BarChart3,
//   Heart,
//   TestTube,
// } from "lucide-react";

// import DashboardLayout from "./DashboardLayout";
// import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
// import TestListPage from "../Features/lab_technician/TestListPage.jsx";
// import HospitalRequests from "../Features/lab_technician/HospitalRequests";
// import TechnicianStats from "../Features/lab_technician/TechnicianStats.jsx";
// import PendingTestsPage from "../Features/lab_technician/PendingTestsPage";

// // --- Metric Card Component ---
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
//   const baseClasses = `relative flex items-center h-12 w-full transition-all duration-300 ease-in-out font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md`;
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
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1" />
//       )}
//       <span className="flex-shrink-0">
//         {React.cloneElement(icon, {
//           className: `w-5 h-5 transition-colors ${
//             isActive ? "text-white" : "text-red-300 group-hover:text-white"
//           }`,
//         })}
//       </span>
//       <span
//         className={`ml-4 text-sm whitespace-nowrap transition-opacity duration-300 ${
//           isExpanded ? "opacity-100" : "opacity-0 hidden"
//         }`}
//       >
//         {label}
//       </span>
//       {!isExpanded && (
//         <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
//           {label}
//         </div>
//       )}
//     </button>
//   );
// };

// // --- Sidebar Component ---
// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => {
//   const headerStyle =
//     isOpen || !isDesktop
//       ? { padding: "1.5rem 1.5rem 1rem" }
//       : { padding: "1.5rem 0.5rem 1rem" };

//   const contentStyle = {
//     paddingLeft: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
//     paddingRight: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
//     paddingBottom: "1.5rem",
//   };

//   return (
//     <>
//       <aside
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//         className={`fixed inset-y-0 left-0 z-50 h-full shadow-2xl transition-all duration-300 ease-in-out border-r border-red-900/50 flex flex-col bg-gradient-to-br from-[#A51B27] to-red-900
//           ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
//           ${
//             !isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
//           }`}
//       >
//         <div className="space-y-6 flex-shrink-0" style={headerStyle}>
//           <div
//             className={`flex items-center justify-between ${
//               isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
//             }`}
//           >
//             <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
//               <Heart className="h-7 w-7 mr-2 text-white fill-current" />
//               <span className={isDesktop && !isOpen ? "hidden" : ""}>
//                 LAB TECHNICIAN
//               </span>
//             </h1>
//             {!isDesktop && (
//               <button
//                 onClick={onClose}
//                 className="p-2 text-red-200 hover:text-white rounded-lg"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             )}
//           </div>

//           <div
//             className={`flex items-center ${
//               isOpen ? "justify-start" : "justify-center"
//             }`}
//           >
//             <div className="relative group">
//               <img
//                 src="https://via.placeholder.com/48/FFFFFF/A51B27?text=LT"
//                 alt="Lab Tech"
//                 className={`w-12 h-12 rounded-full border-3 border-white/70 ${
//                   !isOpen && isDesktop ? "scale-90" : "scale-100"
//                 }`}
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs">
//                 {isOpen ? "Edit" : <User className="w-4 h-4" />}
//               </div>
//             </div>
//             <div
//               className={`ml-4 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
//             >
//               <p className="font-semibold text-white">Lab Technician</p>
//               <p className="text-xs text-red-200">Blood Testing Unit</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto space-y-4" style={contentStyle}>
//           {children}
//         </div>
//       </aside>

//       {isOpen && !isDesktop && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black opacity-60 z-40"
//           aria-hidden="true"
//         />
//       )}
//     </>
//   );
// };

// // --- Main Dashboard Component ---
// const LabTechnicianDashboard = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState("/lab_technician/dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 640;
//       setIsDesktop(desktop);
//       if (!desktop) setIsSidebarOpen(false);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     if (!isDesktop) setIsSidebarOpen((prev) => !prev);
//   };

//   const handleNavigate = (path) => {
//     if (!isDesktop) setIsSidebarOpen(false);
//     setCurrentPage(path);
//     navigate(path);
//   };

//   const DashboardHome = () => (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
//           Lab Technician Panel
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
//           Manage blood testing, hospital requests & reports
//         </p>
//       </div>
//       <hr className="border-gray-300 dark:border-gray-600 mb-8" />
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//         Today's Overview
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <MetricCard
//           title="Pending Tests"
//           value="24"
//           color="yellow"
//           icon={<TestTube className="w-8 h-8" />}
//         />
//         <MetricCard
//           title="Samples Today"
//           value="68"
//           color="red"
//           icon={<Heart className="w-8 h-8" />}
//         />
//         <MetricCard
//           title="Hospital Requests"
//           value="12"
//           color="blue"
//           icon={<Building2 className="w-8 h-8" />}
//         />
//         <MetricCard
//           title="Reports Issued"
//           value="145"
//           color="green"
//           icon={<BarChart3 className="w-8 h-8" />}
//         />
//       </div>
//     </div>
//   );

//   const RenderPage = () => {
//     switch (currentPage) {
//       case "/lab_technician/dashboard":
//         return <DashboardHome />;
//       case "/lab_technician/profile":
//         return <LabTechnicianProfile />;
//       case "/lab_technician/test-list":
//         return <TestListPage />;
//       case "/lab_technician/hospital-requests":
//         return <HospitalRequests />;
//       case "/lab_technician/statistical-data":
//         return <TechnicianStats />;
//       case "/lab_technician/pending-tests":
//         return <PendingTestsPage />;
//       default:
//         return <DashboardHome />;
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
//           onClick={() => handleNavigate("/lab_technician/dashboard")}
//           icon={<Home />}
//           label="Dashboard"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/dashboard"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/profile")}
//           icon={<User />}
//           label="My Profile"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/profile"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/pending-tests")}
//           icon={<TestTube />}
//           label="Pending Tests"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/pending-tests"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/test-list")}
//           icon={<ClipboardList />}
//           label="Test List"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/test-list"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/hospital-requests")}
//           icon={<Building2 />}
//           label="Hospital Requests"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/hospital-requests"}
//         />
//         <SidebarButton
//           onClick={() => handleNavigate("/lab_technician/statistical-data")}
//           icon={<BarChart3 />}
//           label="Statistical Data"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/lab_technician/statistical-data"}
//         />
//       </Sidebar>

//       <div className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 shadow-md sm:hidden">
//           <button
//             onClick={toggleSidebar}
//             className="p-2 text-gray-600 hover:text-red-600"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <span className="text-xl font-bold text-red-600">Lab Technician</span>
//           <div className="w-10" />
//         </header>

//         <main
//           className={`flex-1 overflow-y-auto p-6 lg:p-10 transition-all duration-300 ${
//             isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : ""
//           }`}
//         >
//           {RenderPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// const WrappedLabTechnicianDashboard = (props) => (
//   <DashboardLayout>
//     <LabTechnicianDashboard {...props} />
//   </DashboardLayout>
// );

// export default WrappedLabTechnicianDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  ClipboardList,
  Building2,
  BarChart3,
  Heart,
  TestTube,
  Package, // ← Added for Blood Stock
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import LabTechnicianProfile from "../Features/lab_technician/lab_technician_profile.jsx";
import TestListPage from "../Features/lab_technician/TestListPage.jsx";
import HospitalRequests from "../Features/lab_technician/HospitalRequests";
import TechnicianStats from "../Features/lab_technician/TechnicianStats.jsx";
import PendingTestsPage from "../Features/lab_technician/PendingTestsPage";
import BloodStockDashboard from "../Features/lab_technician/BloodStockDashboard.jsx"; // ← NEW IMPORT

// --- Metric Card Component ---
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
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1" />
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
          isExpanded ? "opacity-100" : "opacity-0 hidden"
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

// --- Sidebar Component ---
const Sidebar = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isDesktop,
  children,
}) => {
  const headerStyle =
    isOpen || !isDesktop
      ? { padding: "1.5rem 1.5rem 1rem" }
      : { padding: "1.5rem 0.5rem 1rem" };

  const contentStyle = {
    paddingLeft: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
    paddingRight: isOpen || !isDesktop ? "1.5rem" : "0.5rem",
    paddingBottom: "1.5rem",
  };

  return (
    <>
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`fixed inset-y-0 left-0 z-50 h-full shadow-2xl transition-all duration-300 ease-in-out border-r border-red-900/50 flex flex-col bg-gradient-to-br from-[#A51B27] to-red-900
          ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
          ${
            !isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""
          }`}
      >
        <div className="space-y-6 flex-shrink-0" style={headerStyle}>
          <div
            className={`flex items-center justify-between ${
              isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            {/* <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
              <Heart className="h-7 w-7 mr-2 text-white fill-current" />
              <span className={isDesktop && !isOpen ? "hidden" : ""}>
                LAB TECHNICIAN
              </span>
            </h1> */}
            {!isDesktop && (
              <button
                onClick={onClose}
                className="p-2 text-red-200 hover:text-white rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <div
            className={`flex items-center ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <div className="relative group">
              {/* <img
                src="https://via.placeholder.com/48/FFFFFF/A51B27?text=LT"
                alt="Lab Tech"
                className={`w-12 h-12 rounded-full border-3 border-white/70 ${
                  !isOpen && isDesktop ? "scale-90" : "scale-100"
                }`}
              /> */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white text-xs">
                {isOpen ? "Edit" : <User className="w-4 h-4" />}
              </div>
            </div>
            <div
              className={`ml-4 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
            >
              <p className="font-semibold text-white">Lab Technician</p>
              <p className="text-xs text-red-200">Blood Testing Unit</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4" style={contentStyle}>
          {children}
        </div>
      </aside>

      {isOpen && !isDesktop && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
};

// --- Main Dashboard Component ---
const LabTechnicianDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("/lab_technician/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

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

  const toggleSidebar = () => {
    if (!isDesktop) setIsSidebarOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    if (!isDesktop) setIsSidebarOpen(false);
    setCurrentPage(path);
    navigate(path);
  };

  const DashboardHome = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Lab Technician Panel
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Manage blood testing, inventory & hospital supply
        </p>
      </div>
      <hr className="border-gray-300 dark:border-gray-600 mb-8" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Today's Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Pending Tests"
          value="24"
          color="yellow"
          icon={<TestTube className="w-8 h-8" />}
        />
        <MetricCard
          title="Samples Today"
          value="68"
          color="red"
          icon={<Heart className="w-8 h-8" />}
        />
        <MetricCard
          title="Hospital Requests"
          value="12"
          color="blue"
          icon={<Building2 className="w-8 h-8" />}
        />
        <MetricCard
          title="Available Stock"
          value="156"
          color="green"
          icon={<Package className="w-8 h-8" />}
        />
      </div>
    </div>
  );

  const RenderPage = () => {
    switch (currentPage) {
      // case "/lab_technician/dashboard":
      //   return <DashboardHome />;
      case "/lab_technician/profile":
        return <LabTechnicianProfile />;
      case "/lab_technician/test-list":
        return <TestListPage />;
      case "/lab_technician/hospital-requests":
        return <HospitalRequests />;
      case "/lab_technician/statistical-data":
        return <TechnicianStats />;
      case "/lab_technician/pending-tests":
        return <PendingTestsPage />;
      case "/lab_technician/blood-stock": // ← NEW PAGE
        return <BloodStockDashboard />;
      default:
        return <PendingTestsPage />;
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
        {/* <SidebarButton
          onClick={() => handleNavigate("/lab_technician/dashboard")}
          icon={<Home />}
          label="Dashboard"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/dashboard"}
        /> */}
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/profile")}
          icon={<User />}
          label="My Profile"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/profile"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/pending-tests")}
          icon={<TestTube />}
          label="Pending Tests"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/pending-tests"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/test-list")}
          icon={<ClipboardList />}
          label="Test List"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/test-list"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/blood-stock")} // ← NEW MENU ITEM
          icon={<Package />}
          label="Blood Stock"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/blood-stock"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/hospital-requests")}
          icon={<Building2 />}
          label="Hospital Requests"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/hospital-requests"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/lab_technician/statistical-data")}
          icon={<BarChart3 />}
          label="Statistical Data"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/lab_technician/statistical-data"}
        />
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 shadow-md sm:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-red-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold text-red-600">Lab Technician</span>
          <div className="w-10" />
        </header>

        <main
          className={`flex-1 overflow-y-auto p-6 lg:p-10 transition-all duration-300 ${
            isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : ""
          }`}
        >
          {RenderPage()}
        </main>
      </div>
    </div>
  );
};

const WrappedLabTechnicianDashboard = (props) => (
  <DashboardLayout>
    <LabTechnicianDashboard {...props} />
  </DashboardLayout>
);

export default WrappedLabTechnicianDashboard;
