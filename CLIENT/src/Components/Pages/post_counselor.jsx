// /* eslint-disable react-refresh/only-export-components */
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   MessageSquare,
//   UserCheck,
//   Settings,
//   Heart,
//   AlertTriangle,
//   CheckCircle,
//   PhoneCall,
//   Loader2,
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format } from "date-fns";
// import DashboardLayout from "./DashboardLayout";

// // === Reusable Components (Same as Admin) ===
// const MetricCard = ({ title, value, icon, color = "indigo" }) => (
//   <div
//     className={`p-5 bg-white rounded-xl shadow-xl border-l-4 border-${color}-600 transition-all hover:shadow-2xl`}
//   >
//     <div className="flex items-center">
//       <div className={`p-3 text-white bg-${color}-600 rounded-lg mr-4`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//           {title}
//         </p>
//         <p className="text-3xl font-extrabold text-gray-900">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
//   const base = `relative flex items-center h-12 w-full transition-all duration-300 rounded-lg group font-medium text-white
//     hover:bg-red-700/50 hover:shadow-md`;
//   const active = isActive
//     ? "bg-red-800/80 shadow-inner ring-2 ring-white/50"
//     : "";
//   const padding = isExpanded ? "px-5 justify-start" : "justify-center";

//   return (
//     <button
//       onClick={onClick}
//       className={`${base} ${active} ${padding}`}
//       aria-label={label}
//     >
//       {isActive && isExpanded && (
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1"></span>
//       )}
//       <span className="flex-shrink-0">
//         {React.cloneElement(icon, {
//           className: `w-5 h-5 ${
//             isActive ? "text-white" : "text-red-300 group-hover:text-white"
//           }`,
//         })}
//       </span>
//       {isExpanded && (
//         <span className="ml-4 text-sm whitespace-nowrap">{label}</span>
//       )}
//       {!isExpanded && (
//         <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
//           {label}
//         </div>
//       )}
//     </button>
//   );
// };

// const Sidebar = ({
//   isOpen,
//   onMouseEnter,
//   onMouseLeave,
//   onClose,
//   isDesktop,
//   children,
// }) => (
//   <>
//     <aside
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-br from-[#A51B27] to-red-900 text-white shadow-2xl transition-all duration-300
//         ${
//           isDesktop
//             ? isOpen
//               ? "w-72"
//               : "w-20"
//             : isOpen
//             ? "w-72"
//             : "-translate-x-full"
//         } h-full flex flex-col`}
//     >
//       <div className="space-y-6 flex-shrink-0 p-6 pb-2">
//         <div
//           className={`flex items-center justify-between ${
//             isOpen ? "" : "justify-center"
//           }`}
//         >
//           <h1
//             className={`text-2xl font-black tracking-widest uppercase flex items-center ${
//               isOpen ? "block" : "hidden"
//             }`}
//           >
//             <Heart className="h-7 w-7 mr-2 fill-white" />
//             POST-COUNSELOR
//           </h1>
//           {!isDesktop && (
//             <button
//               onClick={onClose}
//               className="p-2 text-red-200 hover:text-white"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           )}
//         </div>

//         <div className="pt-4 border-t border-red-700">
//           <div
//             className={`flex items-center ${
//               isOpen ? "justify-start" : "justify-center"
//             }`}
//           >
//             <div className="relative group">
//               <img
//                 src="https://via.placeholder.com/48/FFFFFF/A51B27?text=PC"
//                 alt="Post-Counselor"
//                 className="w-12 h-12 rounded-full border-3 border-white/70"
//               />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                 {isOpen ? "Edit" : <UserCheck className="w-5 h-5" />}
//               </div>
//             </div>
//             {isOpen && (
//               <div className="ml-4">
//                 <p className="font-semibold">Dr. Selamawit</p>
//                 <p className="text-xs text-red-200">Post-Donation Counselor</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-6">
//         {children}
//       </div>
//     </aside>

//     {!isDesktop && isOpen && (
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black opacity-60 z-40"
//       />
//     )}
//   </>
// );

// // === Main Post-Counselor Dashboard ===
// const PostCounselorDashboard = () => {
//   const navigate = useNavigate();
//   const [currentPage] = useState("/post_counselor/dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

//   const [pending, setPending] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sendingId, setSendingId] = useState(null);

//   const fetchPending = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/post-counselor/pending");
//       setPending(data.data || []);
//     } catch {
//       toast.error("Failed to load notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     const interval = setInterval(fetchPending, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   const sendSMS = async (id) => {
//     setSendingId(id);
//     try {
//       await axios.patch(`/api/post-counselor/${id}/mark-sent`);
//       toast.success("SMS sent successfully!");
//       fetchPending();
//     } catch {
//       toast.error("SMS failed");
//     } finally {
//       setSendingId(null);
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 1024;
//       setIsDesktop(desktop);
//       setIsSidebarOpen(desktop);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   return (
//     <div className="flex h-screen bg-gray-100 font-inter">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//         isDesktop={isDesktop}
//         onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
//         onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
//       >
//         <SidebarButton
//           onClick={() => navigate("/post_counselor/dashboard")}
//           icon={<Home />}
//           label="Dashboard"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/post_counselor/dashboard"}
//         />
//         <SidebarButton
//           onClick={() => navigate("/post_counselor/notifications")}
//           icon={<MessageSquare />}
//           label="SMS Notifications"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/post_counselor/notifications"}
//         />
//         <SidebarButton
//           onClick={() => navigate("/post_counselor/profile")}
//           icon={<UserCheck />}
//           label="My Profile"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/post_counselor/profile"}
//         />
//         <SidebarButton
//           onClick={() => navigate("/post_counselor/settings")}
//           icon={<Settings />}
//           label="Settings"
//           isExpanded={isSidebarOpen}
//           isActive={currentPage === "/post_counselor/settings"}
//         />
//       </Sidebar>

//       <main
//         className={`flex-1 overflow-y-auto transition-all duration-300 p-8 ${
//           isDesktop ? (isSidebarOpen ? "ml-72" : "ml-20") : ""
//         }`}
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
//               Debre Berhan Blood Center
//             </h1>
//             <p className="text-lg text-gray-600">
//               Post-Donation Counseling Panel
//             </p>
//           </div>

//           <hr className="border-gray-300 mb-8" />

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             <MetricCard
//               title="Pending SMS"
//               value={pending.length}
//               icon={<MessageSquare className="h-6 w-6" />}
//               color="red"
//             />
//             <MetricCard
//               title="Reactive Cases"
//               value={pending.filter((p) => p.hasReactiveResult).length}
//               icon={<AlertTriangle className="h-6 w-6" />}
//               color="orange"
//             />
//             <MetricCard
//               title="Safe Results"
//               value={pending.filter((p) => !p.hasReactiveResult).length}
//               icon={<CheckCircle className="h-6 w-6" />}
//               color="green"
//             />
//           </div>

//           {loading ? (
//             <div className="text-center py-20">
//               <Loader2 className="w-16 h-16 animate-spin text-red-600 mx-auto" />
//             </div>
//           ) : pending.length === 0 ? (
//             <div className="text-center py-20 bg-green-50 rounded-2xl">
//               <CheckCircle className="w-32 h-32 text-green-600 mx-auto mb-6" />
//               <p className="text-4xl font-bold text-green-700">
//                 All donors notified!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {pending.map((item) => {
//                 const { donation } = item;
//                 const donor = donation.donor;
//                 const isReactive = item.hasReactiveResult;
//                 const donationId = `DON-${donation._id
//                   .toString()
//                   .slice(-6)
//                   .toUpperCase()}`;

//                 return (
//                   <div
//                     key={item._id}
//                     className={`bg-white rounded-2xl shadow-xl p-8 border-l-8 ${
//                       isReactive ? "border-red-600" : "border-green-500"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-6">
//                       <div>
//                         <h2 className="text-4xl font-black text-gray-800">
//                           {donationId}
//                         </h2>
//                         <p>
//                           Tested:{" "}
//                           {format(
//                             new Date(donation.testedAt),
//                             "dd MMM yyyy, HH:mm"
//                           )}
//                         </p>
//                       </div>
//                       <div
//                         className={`text-3xl font-black ${
//                           isReactive ? "text-red-600" : "text-green-600"
//                         }`}
//                       >
//                         {isReactive ? "REACTIVE" : "SAFE"}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg mb-8">
//                       <div>
//                         <strong>Donor:</strong> {donor?.name || "Unknown"}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <PhoneCall className="w-5 h-5" />
//                         <strong>Phone:</strong> {donor?.phone || "N/A"}
//                       </div>
//                       <div>
//                         <strong>Blood Type:</strong>{" "}
//                         <span className="text-3xl text-red-600 font-bold">
//                           {donation.aboRh}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex justify-end">
//                       <button
//                         onClick={() => sendSMS(item._id)}
//                         disabled={sendingId === item._id || !donor?.phone}
//                         className={`px-10 py-5 rounded-xl font-black text-2xl flex items-center gap-4 shadow-xl transition-all
//                           ${
//                             donor?.phone
//                               ? "bg-blue-600 hover:bg-blue-700 text-white"
//                               : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                           }
//                           ${sendingId === item._id && "animate-pulse"}`}
//                       >
//                         {sendingId === item._id ? (
//                           <>Sending...</>
//                         ) : (
//                           <>Send SMS Now</>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default function WrappedPostCounselorDashboard(props) {
//   return (
//     <DashboardLayout>
//       <PostCounselorDashboard {...props} />
//     </DashboardLayout>
//   );
// }
// src/Components/Pages/PostCounselorDashboard.jsx
// src/Components/Pages/PostCounselorDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  UserCheck,
  Settings,
  Heart,
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import PostCounselorDashboardContent from "../Features/post_counselor/PostCounselorDashboardContent";
import PostCounselorProfile from "../Features/post_counselor/PostCounselorProfile";
import PostCounselorSettings from "../Features/post_counselor/PostCounselorSettings";

// ==================== Sidebar Button ====================
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
  const base = `relative flex items-center h-12 w-full rounded-lg group font-medium text-white hover:bg-red-700/50 transition-all`;
  const active = isActive
    ? "bg-red-800/80 shadow-inner ring-2 ring-white/50"
    : "";
  const padding = isExpanded ? "px-5 justify-start" : "justify-center";

  return (
    <button
      onClick={onClick}
      className={`${base} ${active} ${padding}`}
      aria-label={label}
    >
      {isActive && isExpanded && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1" />
      )}
      <span className="flex-shrink-0">
        {React.cloneElement(icon, {
          className: `w-5 h-5 ${
            isActive ? "text-white" : "text-red-300 group-hover:text-white"
          }`,
        })}
      </span>
      {isExpanded && (
        <span className="ml-4 text-sm whitespace-nowrap">{label}</span>
      )}
      {!isExpanded && (
        <div className="absolute left-full ml-4 p-2 min-w-max bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {label}
        </div>
      )}
    </button>
  );
};

// ==================== Sidebar ====================
const Sidebar = ({ isOpen, onClose, isDesktop, children }) => (
  <>
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-br from-[#A51B27] to-red-900 text-white shadow-2xl transition-all duration-300 flex flex-col
        ${
          isDesktop
            ? isOpen
              ? "w-72"
              : "w-20"
            : isOpen
            ? "w-72"
            : "-translate-x-full"
        } h-full`}
    >
      <div className="p-6 space-y-8 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1
            className={`text-2xl font-black uppercase flex items-center ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Heart className="h-7 w-7 mr-2 fill-white" />
            POST-COUNSELOR
          </h1>
          {!isDesktop && (
            <button onClick={onClose} className="text-red-200 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-6">
        {children}
      </div>
    </aside>

    {/* Mobile Overlay */}
    {!isDesktop && isOpen && (
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        aria-hidden="true"
      />
    )}
  </>
);

// ==================== Main Dashboard ====================
const PostCounselorDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("/post_counselor/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (path) => {
    setCurrentPage(path);
    navigate(path);
    if (!isDesktop) setIsSidebarOpen(false);
  };

  const RenderPage = () => {
    switch (currentPage) {
      case "/post_counselor/dashboard":
      case "/post_counselor/notifications":
        return <PostCounselorDashboardContent />;
      case "/post_counselor/profile":
        return <PostCounselorProfile />;
      case "/post_counselor/settings":
        return <PostCounselorSettings />;
      default:
        return <PostCounselorDashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDesktop={isDesktop}
      >
        <SidebarButton
          onClick={() => handleNavigate("/post_counselor/dashboard")}
          icon={<Home />}
          label="Dashboard"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/post_counselor/dashboard"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/post_counselor/notifications")}
          icon={<MessageSquare />}
          label="SMS Queue"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/post_counselor/notifications"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/post_counselor/profile")}
          icon={<UserCheck />}
          label="My Profile"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/post_counselor/profile"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/post_counselor/settings")}
          icon={<Settings />}
          label="Settings"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/post_counselor/settings"}
        />
      </Sidebar>

      {/* Mobile Header */}
      {!isDesktop && (
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#A51B27] to-red-800 text-white p-4 flex items-center z-50 shadow-lg">
          <button onClick={() => setIsSidebarOpen(true)} className="mr-4">
            <Menu className="w-8 h-8" />
          </button>
          <h1 className="text-xl font-bold">Post-Counselor Panel</h1>
        </header>
      )}

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 p-8 ${
          isDesktop ? (isSidebarOpen ? "ml-72" : "ml-20") : "pt-20"
        }`}
      >
        <div className="max-w-7xl mx-auto">{RenderPage()}</div>
      </main>
    </div>
  );
};

// ==================== Export with Layout ====================
export default function WrappedPostCounselorDashboard(props) {
  return (
    <DashboardLayout>
      <PostCounselorDashboard {...props} />
    </DashboardLayout>
  );
}
