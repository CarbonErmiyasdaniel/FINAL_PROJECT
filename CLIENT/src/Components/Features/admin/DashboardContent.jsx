// // import React from "react";
// // import { Users, Heart, ClipboardList, BarChart } from "lucide-react";

// // const DashboardContent = ({
// //   metrics,
// //   loading,
// //   error,
// //   toggleLanguage,
// //   language,
// //   getTranslation,
// // }) => (
// //   <>
// //     <div className="flex justify-between items-start mb-6">
// //       <div>
// //         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
// //           {getTranslation("title")}
// //         </h1>
// //         <p className="text-md text-gray-600 dark:text-gray-400">
// //           {getTranslation("subtitle")}
// //         </p>
// //       </div>
// //       <button
// //         onClick={toggleLanguage}
// //         className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-800"
// //       >
// //         {language === "EN" ? "አማርኛ" : "English"}
// //       </button>
// //     </div>

// //     <hr className="border-gray-300 dark:border-gray-600 mb-8" />

// //     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// //       {getTranslation("metrics_title")}
// //     </h2>

// //     {loading ? (
// //       <div className="text-center text-gray-500 animate-pulse">
// //         Loading metrics...
// //       </div>
// //     ) : error ? (
// //       <div className="text-center text-red-600">{error}</div>
// //     ) : (
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
// //         <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-indigo-600 transition-all duration-300 hover:shadow-2xl">
// //           <div className="flex items-center">
// //             <div className="flex items-center justify-center p-3 text-white bg-indigo-600 rounded-lg mr-4">
// //               <Users className="h-6 w-6" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
// //                 Total Donors
// //               </p>
// //               <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //                 {metrics.totalDonors}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-red-600 transition-all duration-300 hover:shadow-2xl">
// //           <div className="flex items-center">
// //             <div className="flex items-center justify-center p-3 text-white bg-red-600 rounded-lg mr-4">
// //               <Heart className="h-6 w-6" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
// //                 Blood Units (In Stock)
// //               </p>
// //               <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //                 {metrics.bloodUnits} U
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-green-600 transition-all duration-300 hover:shadow-2xl">
// //           <div className="flex items-center">
// //             <div className="flex items-center justify-center p-3 text-white bg-green-600 rounded-lg mr-4">
// //               <ClipboardList className="h-6 w-6" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
// //                 Active Drives
// //               </p>
// //               <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //                 {metrics.activeDrives}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-orange-600 transition-all duration-300 hover:shadow-2xl">
// //           <div className="flex items-center">
// //             <div className="flex items-center justify-center p-3 text-white bg-orange-600 rounded-lg mr-4">
// //               <BarChart className="h-6 w-6" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
// //                 Critical Shortages
// //               </p>
// //               <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
// //                 {metrics.criticalShortages}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )}
// //   </>
// // );

// // export default DashboardContent;
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   Droplet,
//   AlertTriangle,
//   Package,
//   Calendar,
//   Activity,
//   CheckCircle,
//   Clock,
//   BarChart,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// const AdminDashboardContent = () => {
//   const [data, setData] = useState(null);
//   const [stock, setStock] = useState(null);
//   const [requests, setRequests] = useState(null);
//   const [testResults, setTestResults] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch function for all analytics data
//   const fetchAllAnalytics = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Using Promise.all to fetch all necessary data concurrently
//       const [dashboardRes, stockRes, requestsRes, testRes] = await Promise.all([
//         axios.get("/api/admins/analytics/dashboard"),
//         axios.get("/api/admins/analytics/blood-stock"),
//         axios.get("/api/admins/analytics/requests"),
//         axios.get("/api/admins/analytics/test-results"),
//       ]);

//       setData(dashboardRes.data.data);
//       setStock(stockRes.data.stock);
//       setRequests(requestsRes.data);
//       setTestResults(testRes.data);
//     } catch (err) {
//       console.error("Error fetching analytics:", err);
//       setError("Failed to load dashboard data. Check API status.");
//       toast.error("Error loading dashboard data.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllAnalytics();
//     // Optional: Auto-refresh data every 5 minutes (300000 ms)
//     const interval = setInterval(fetchAllAnalytics, 300000);
//     return () => clearInterval(interval);
//   }, [fetchAllAnalytics]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800">
//         <RefreshCw className="animate-spin h-10 w-10 text-red-600" />
//         <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
//           Loading Dashboard...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
//         <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
//       </div>
//     );
//   }

//   // --- Helper Components ---

//   const DashboardCard = ({ title, value, icon, className = "" }) => (
//     <div
//       className={`p-6 bg-white dark:bg-gray-800 shadow-xl rounded-none border-l-4 border-red-600 ${className}`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
//             {title}
//           </p>
//           <p className="text-4xl font-extrabold mt-1 text-gray-900 dark:text-white">
//             {value}
//           </p>
//         </div>
//         {icon &&
//           React.cloneElement(icon, {
//             className: "w-8 h-8 text-red-400 opacity-70",
//           })}
//       </div>
//     </div>
//   );

//   const BloodTypeItem = ({ type, count, isCritical }) => (
//     <div
//       className={`p-4 border shadow-sm text-center rounded-none ${
//         isCritical
//           ? "bg-red-50 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200"
//           : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
//       }`}
//     >
//       <div className="text-2xl font-black">{type}</div>
//       <div className="text-xl font-bold mt-1">{count} bags</div>
//       {isCritical && (
//         <AlertTriangle className="w-4 h-4 inline text-red-700 mr-1" />
//       )}
//       {isCritical && <span className="text-xs font-semibold">Critical</span>}
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen dark:bg-gray-900">
//       <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-3 mb-6 flex items-center gap-2">
//         <BarChart className="w-7 h-7 text-red-600" /> Admin Dashboard Overview
//       </h1>
//       ---
//       {/* Section 1: System Overview and Critical Alerts */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
//           <Activity className="w-6 h-6 text-red-500" /> System Activity Summary
//           (Last 30 Days)
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <DashboardCard
//             title="Total Requests"
//             value={data.monthlyRequests}
//             icon={<Package />}
//           />
//           <DashboardCard
//             title="Requests Fulfilled"
//             value={data.fulfilledRequests}
//             icon={<CheckCircle />}
//             className="border-l-4 border-green-600"
//           />
//           <DashboardCard
//             title="Total Donations"
//             value={data.totalDonationsLast30Days}
//             icon={<Droplet />}
//           />
//           <DashboardCard
//             title="Pending Notifications"
//             value={data.pendingNotifications}
//             icon={<Clock />}
//             className="border-l-4 border-yellow-600"
//           />
//         </div>
//       </section>
//       ---
//       {/* Section 2: Blood Stock Summary */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
//           <Droplet className="w-6 h-6 text-red-500" /> Real-Time Blood Stock
//           (Bags)
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
//           {Object.entries(stock).map(([type, count]) => (
//             <BloodTypeItem
//               key={type}
//               type={type}
//               count={count}
//               isCritical={data.criticalTypes.includes(type)}
//             />
//           ))}
//         </div>
//         {data.criticalTypes.length > 0 && (
//           <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
//             <AlertTriangle className="w-4 h-4 inline mr-1" />
//             Critical Alert: The following blood types have less than 5 bags:{" "}
//             {data.criticalTypes.join(", ")}.
//           </p>
//         )}
//       </section>
//       ---
//       {/* Section 3: Request & Test Analytics */}
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Sub-Section 3.1: Hospital Request Status */}
//         <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-none">
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
//             Hospital Request Status
//           </h3>
//           <div className="space-y-3">
//             <RequestStatusItem
//               label="Pending"
//               count={requests.Pending}
//               color="text-yellow-600"
//             />
//             <RequestStatusItem
//               label="Fulfilled"
//               count={requests.Fulfilled}
//               color="text-green-600"
//             />
//             <RequestStatusItem
//               label="Rejected"
//               count={requests.Rejected}
//               color="text-red-600"
//             />
//           </div>
//         </div>

//         {/* Sub-Section 3.2: Blood Test Result Breakdown */}
//         <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-none">
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
//             Blood Test Results (Safe vs. Unsafe)
//           </h3>
//           <TestResultItem
//             label="Safe Units"
//             count={testResults.safe}
//             percentage={testResults.safePercentage}
//             color="bg-green-600"
//           />
//           <TestResultItem
//             label="Unsafe Units"
//             count={testResults.unsafe}
//             percentage={(100 - parseFloat(testResults.safePercentage)).toFixed(
//               1
//             )}
//             color="bg-red-600"
//           />
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
//             Total Tested Units: {testResults.safe + testResults.unsafe}
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Sub-component for Request Status
// const RequestStatusItem = ({ label, count, color }) => (
//   <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
//     <span className={`flex items-center font-medium ${color}`}>
//       <Calendar className="w-4 h-4 mr-2" />
//       {label} Requests
//     </span>
//     <span className="text-xl font-bold text-gray-900 dark:text-white">
//       {count}
//     </span>
//   </div>
// );

// // Sub-component for Test Results
// const TestResultItem = ({ label, count, percentage, color }) => (
//   <div className="mb-4">
//     <div className="flex justify-between text-sm font-semibold text-gray-800 dark:text-white mb-1">
//       <span>
//         {label} ({count})
//       </span>
//       <span>{percentage}%</span>
//     </div>
//     <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
//       <div
//         className={`h-2 rounded-full ${color}`}
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//   </div>
// );

// export default AdminDashboardContent;
// //
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Droplet,
  AlertTriangle,
  Package,
  Calendar,
  Activity,
  CheckCircle,
  Clock,
  BarChart,
  RefreshCw, // <--- 💡 FIX: This icon is now correctly imported
} from "lucide-react";
import { toast } from "react-hot-toast";

// Renamed the component to follow convention if it was originally 'AdminDashboard.jsx'
const AdminDashboardContent = () => {
  const [data, setData] = useState(null);
  const [stock, setStock] = useState(null);
  const [requests, setRequests] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function for all analytics data
  const fetchAllAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Using Promise.all to fetch all necessary data concurrently
      const [dashboardRes, stockRes, requestsRes, testRes] = await Promise.all([
        axios.get("/api/admins/analytics/dashboard"),
        axios.get("/api/admins/analytics/blood-stock"),
        axios.get("/api/admins/analytics/requests"),
        axios.get("/api/admins/analytics/test-results"),
      ]);

      setData(dashboardRes.data.data);
      setStock(stockRes.data.stock);
      setRequests(requestsRes.data);
      setTestResults(testRes.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      // NOTE: Network errors like 'ERR_NAME_NOT_RESOLVED' will often land here.
      // Ensure your backend server running the '/api/admins/' routes is active and accessible.
      setError(
        "Failed to load dashboard data. Ensure the API server is running."
      );
      toast.error("Error loading dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllAnalytics();
    // Optional: Auto-refresh data every 5 minutes (300000 ms)
    const interval = setInterval(fetchAllAnalytics, 300000);
    return () => clearInterval(interval);
  }, [fetchAllAnalytics]);

  // --- Helper Components ---

  const DashboardCard = ({ title, value, icon, className = "" }) => (
    <div
      className={`p-6 bg-white dark:bg-gray-800 shadow-xl rounded-none border-l-4 border-red-600 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
            {title}
          </p>
          <p className="text-4xl font-extrabold mt-1 text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon &&
          React.cloneElement(icon, {
            className: "w-8 h-8 text-red-400 opacity-70",
          })}
      </div>
    </div>
  );

  const BloodTypeItem = ({ type, count, isCritical }) => (
    <div
      className={`p-4 border shadow-sm text-center rounded-none ${
        isCritical
          ? "bg-red-50 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200"
          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
      }`}
    >
      <div className="text-2xl font-black">{type}</div>
      <div className="text-xl font-bold mt-1">{count} bags</div>
      {isCritical && (
        <AlertTriangle className="w-4 h-4 inline text-red-700 mr-1" />
      )}
      {isCritical && <span className="text-xs font-semibold">Critical</span>}
    </div>
  );

  // Sub-component for Request Status
  const RequestStatusItem = ({ label, count, color }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
      <span className={`flex items-center font-medium ${color}`}>
        <Calendar className="w-4 h-4 mr-2" />
        {label} Requests
      </span>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        {count}
      </span>
    </div>
  );

  // Sub-component for Test Results
  const TestResultItem = ({ label, count, percentage, color }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-semibold text-gray-800 dark:text-white mb-1">
        <span>
          {label} ({count})
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  // --- Main Render Logic ---

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800">
        {/* RefreshCw is now defined/imported */}
        <RefreshCw className="animate-spin h-10 w-10 text-red-600" />
        <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
        <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Please verify the API routes (`/api/admins/analytics/...`) are
          correctly configured and the backend server is running.
        </p>
      </div>
    );
  }

  // Ensure data structure exists before accessing properties
  if (!data || !stock || !requests || !testResults) {
    return (
      <div className="p-8 text-center bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
        <p className="text-yellow-700 dark:text-yellow-300 font-medium">
          Data Structure Incomplete. One or more analytics endpoints returned
          null or invalid data.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-3 mb-6 flex items-center gap-2">
        <BarChart className="w-7 h-7 text-red-600" /> Admin Dashboard Overview
      </h1>
      ---
      {/* Section 1: System Overview and Critical Alerts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
          <Activity className="w-6 h-6 text-red-500" /> System Activity Summary
          (Last 30 Days)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Requests"
            value={data.monthlyRequests}
            icon={<Package />}
          />
          <DashboardCard
            title="Requests Fulfilled"
            value={data.fulfilledRequests}
            icon={<CheckCircle />}
            className="border-l-4 border-green-600"
          />
          <DashboardCard
            title="Total Donations"
            value={data.totalDonationsLast30Days}
            icon={<Droplet />}
          />
          <DashboardCard
            title="Pending Notifications"
            value={data.pendingNotifications}
            icon={<Clock />}
            className="border-l-4 border-yellow-600"
          />
        </div>
      </section>
      ---
      {/* Section 2: Blood Stock Summary */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
          <Droplet className="w-6 h-6 text-red-500" /> Real-Time Blood Stock
          (Bags)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Object.entries(stock).map(([type, count]) => (
            <BloodTypeItem
              key={type}
              type={type}
              count={count}
              isCritical={data.criticalTypes.includes(type)}
            />
          ))}
        </div>
        {data.criticalTypes.length > 0 && (
          <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            **Critical Alert**: The following blood types have less than 5 bags:{" "}
            {data.criticalTypes.join(", ")}.
          </p>
        )}
      </section>
      ---
      {/* Section 3: Request & Test Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sub-Section 3.1: Hospital Request Status */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-none">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Hospital Request Status
          </h3>
          <div className="space-y-3">
            <RequestStatusItem
              label="Pending"
              count={requests.Pending}
              color="text-yellow-600"
            />
            <RequestStatusItem
              label="Fulfilled"
              count={requests.Fulfilled}
              color="text-green-600"
            />
            <RequestStatusItem
              label="Rejected"
              count={requests.Rejected}
              color="text-red-600"
            />
          </div>
        </div>

        {/* Sub-Section 3.2: Blood Test Result Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-none">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Blood Test Results (Safe vs. Unsafe)
          </h3>
          <TestResultItem
            label="Safe Units"
            count={testResults.safe}
            percentage={testResults.safePercentage}
            color="bg-green-600"
          />
          <TestResultItem
            label="Unsafe Units"
            count={testResults.unsafe}
            percentage={(100 - parseFloat(testResults.safePercentage)).toFixed(
              1
            )}
            color="bg-red-600"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Total Tested Units: **{testResults.safe + testResults.unsafe}**
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardContent;
