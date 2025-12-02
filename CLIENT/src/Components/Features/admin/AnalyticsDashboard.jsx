// // Features/admin/AnalyticsDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AlertCircle, Activity, CheckCircle, Heart } from "lucide-react";

// // Simple Metric Card with inline icons (no Icon prop = no ESLint error!)
// const MetricCard = ({ title, value, color = "blue" }) => (
//   <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-shadow">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-500 text-sm font-medium">{title}</p>
//         <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//       </div>
//       <div className={`p-4 rounded-full bg-${color}-100`}>
//         <Icon className={`w-8 h-8 text-${color}-600`} />
//       </div>
//     </div>
//   </div>
// );

// // Blood Stock Bar
// const BloodStockBar = ({ type, count }) => {
//   const max = 50;
//   const percentage = Math.min((count / max) * 100, 100);
//   const isCritical = count < 5;
//   const isLow = count < 10;

//   return (
//     <div className="mb-6">
//       <div className="flex justify-between text-sm mb-2">
//         <span className="font-medium">{type}</span>
//         <span
//           className={
//             isCritical
//               ? "text-red-600 font-bold"
//               : isLow
//               ? "text-orange-600 font-bold"
//               : "text-green-600 font-bold"
//           }
//         >
//           {count} bag{count !== 1 ? "s" : ""}
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
//         <div
//           className={`h-full transition-all duration-700 ease-out ${
//             isCritical ? "bg-red-500" : isLow ? "bg-orange-500" : "bg-green-500"
//           }`}
//           style={{ width: `${percentage}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// const AnalyticsDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dash, stock, requests, tests] = await Promise.all([
//           axios.get("/api/admins/analytics/dashboard"),
//           axios.get("/api/admins/analytics/blood-stock"),
//           axios.get("/api/admins/analytics/requests"),
//           axios.get("/api/admins/analytics/test-results"),
//         ]);

//         setData({
//           overview: dash.data.data,
//           stock: stock.data.stock,
//           requests: requests.data,
//           tests: tests.data,
//         });
//       } catch (err) {
//         console.error("Failed to load data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-32">
//         <div className="animate-spin rounded-full h-16 w-16 border-8 border-red-600 border-t-transparent" />
//         <p className="mt-6 text-xl text-gray-600">Loading Dashboard...</p>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="text-center py-20 text-red-600 text-2xl font-bold">
//         Failed to load data. Please try again.
//       </div>
//     );
//   }

//   const { overview, stock, requests, tests } = data;

//   return (
//     <div className="space-y-10 pb-10">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-4xl font-extrabold text-gray-900">
//           Analytics Dashboard
//         </h1>
//         <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
//           Updated:{" "}
//           {new Date().toLocaleString("en-ET", {
//             timeZone: "Africa/Addis_Ababa",
//           })}
//         </div>
//       </div>

//       {/* Key Metrics - Icons directly passed */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <MetricCard
//           title="Pending SMS"
//           value={overview.pendingNotifications}
//           icon={AlertCircle}
//           color="red"
//         />
//         <MetricCard
//           title="Monthly Requests"
//           value={overview.monthlyRequests}
//           icon={Activity}
//           color="purple"
//         />
//         <MetricCard
//           title="Safe Blood Rate"
//           value={`${tests.safePercentage}%`}
//           icon={CheckCircle}
//           color="green"
//         />
//         <MetricCard
//           title="Critical Shortages"
//           value={overview.criticalTypes.length}
//           icon={Heart}
//           color="orange"
//         />
//       </div>

//       {/* Blood Stock */}
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">
//           Current Blood Stock
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {Object.entries(stock).map(([type, count]) => (
//             <BloodStockBar key={type} type={type} count={count} />
//           ))}
//         </div>

//         {overview.criticalTypes.length > 0 && (
//           <div className="mt-10 p-6 bg-red-50 border-2 border-red-300 rounded-2xl text-center">
//             <p className="text-2xl font-bold text-red-700">Critical Alert!</p>
//             <p className="text-lg text-red-600 mt-2">
//               Low stock: {overview.criticalTypes.join(" • ")}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Request & Test Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h3 className="text-2xl font-bold mb-6">Hospital Requests</h3>
//           <div className="space-y-5 text-lg">
//             <div className="flex justify-between">
//               <span>Fulfilled</span>
//               <span className="text-green-600 font-bold">
//                 {requests.Fulfilled}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Pending</span>
//               <span className="text-orange-600 font-bold">
//                 {requests.Pending}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Rejected</span>
//               <span className="text-red-600 font-bold">
//                 {requests.Rejected}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h3 className="text-2xl font-bold mb-6">Test Results</h3>
//           <div className="space-y-5 text-lg">
//             <div className="flex justify-between">
//               <span>Safe</span>
//               <span className="text-green-600 font-bold">{tests.safe}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Unsafe</span>
//               <span className="text-red-600 font-bold">{tests.unsafe}</span>
//             </div>
//             <div className="text-center mt-8">
//               <p className="text-6xl font-extrabold text-blue-600">
//                 {tests.safePercentage}%
//               </p>
//               <p className="text-xl text-gray-600">Safe Rate</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;
// Features/admin/AnalyticsDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, AlertCircle, CheckCircle, Activity } from "lucide-react";

// Reusable Metric Card — fixed: no Icon prop, direct icon usage
const MetricCard = ({ title, value, Icon, color = "blue" }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className={`p-4 rounded-full bg-${color}-100`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
    </div>
  </div>
);

// Blood Stock Progress Bar
const BloodStockBar = ({ type, count }) => {
  const max = 50;
  const percentage = count > max ? 100 : (count / max) * 100;
  const isCritical = count < 5;
  const isLow = count < 10;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{type}</span>
        <span
          className={
            isCritical
              ? "text-red-600 font-bold"
              : isLow
              ? "text-orange-600 font-bold"
              : "text-green-600 font-bold"
          }
        >
          {count} bag{count !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ease-out ${
            isCritical ? "bg-red-500" : isLow ? "bg-orange-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [dashRes, stockRes, reqRes, testRes] = await Promise.all([
          axios.get("/api/admins/analytics/dashboard"),
          axios.get("/api/admins/analytics/blood-stock"),
          axios.get("/api/admins/analytics/requests"),
          axios.get("/api/admins/analytics/test-results"),
        ]);

        setData({
          overview: dashRes.data.data,
          stock: stockRes.data.stock,
          requests: reqRes.data,
          tests: testRes.data,
        });
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-8 border-red-600 border-t-transparent" />
        <p className="mt-6 text-xl text-gray-600">
          Loading Analytics Dashboard...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl font-bold text-red-600">Failed to Load Data</p>
        <p className="text-gray-500 mt-2">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  const { overview, stock, requests, tests } = data;

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Analytics Dashboard
        </h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
          Updated:{" "}
          {new Date().toLocaleString("en-ET", {
            timeZone: "Africa/Addis_Ababa",
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Pending SMS"
          value={overview.pendingNotifications}
          Icon={AlertCircle}
          color="red"
        />
        <MetricCard
          title="Monthly Requests"
          value={overview.monthlyRequests}
          Icon={Activity}
          color="purple"
        />
        <MetricCard
          title="Safe Blood Rate"
          value={`${tests.safePercentage}%`}
          Icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="Critical Shortages"
          value={overview.criticalTypes.length}
          Icon={Heart}
          color="orange"
        />
      </div>

      {/* Blood Stock */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Current Blood Stock
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(stock).map(([type, count]) => (
            <BloodStockBar key={type} type={type} count={count} />
          ))}
        </div>

        {overview.criticalTypes.length > 0 && (
          <div className="mt-10 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl text-center">
            <p className="text-2xl font-bold text-red-700">
              Critical Alert: Very Low Stock!
            </p>
            <p className="text-lg text-red-600 mt-2">
              {overview.criticalTypes.join(" • ")}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Hospital Requests Status
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Fulfilled</span>
              <span className="text-2xl font-bold text-green-600">
                {requests.Fulfilled}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Pending</span>
              <span className="text-2xl font-bold text-orange-600">
                {requests.Pending}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-700">Rejected</span>
              <span className="text-2xl font-bold text-red-600">
                {requests.Rejected}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Test Results Summary
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Safe (Negative)</span>
              <span className="text-2xl font-bold text-green-600">
                {tests.safe}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Reactive (Unsafe)</span>
              <span className="text-2xl font-bold text-red-600">
                {tests.unsafe}
              </span>
            </div>
            <div className="text-center mt-10">
              <p className="text-6xl font-extrabold text-blue-600">
                {tests.safePercentage}%
              </p>
              <p className="text-xl text-gray-600 mt-3 font-medium">
                Overall Safe Blood Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
