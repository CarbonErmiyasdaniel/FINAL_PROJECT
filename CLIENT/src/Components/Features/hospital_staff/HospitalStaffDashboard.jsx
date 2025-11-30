// // // src/Features/hospital_staff/HospitalStaffDashboard.jsx
// // import React, { useState, useEffect } from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import {
// //   FileText,
// //   CheckCircle,
// //   XCircle,
// //   Clock,
// //   TrendingUp,
// //   AlertCircle,
// // } from "lucide-react";

// // const HospitalStaffDashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalRequests: 0,
// //     pending: 0,
// //     accepted: 0,
// //     fulfilled: 0,
// //     rejected: 0,
// //   });
// //   const [chartData, setChartData] = useState([]);
// //   const [bloodTypeData, setBloodTypeData] = useState([]);
// //   const [monthlyData, setMonthlyData] = useState([]);

// //   useEffect(() => {
// //     // Replace this later with real API call
// //     const mockData = {
// //       totalRequests: 48,
// //       pending: 12,
// //       accepted: 18,
// //       fulfilled: 15,
// //       rejected: 3,
// //       bloodTypes: [
// //         { name: "O+", value: 14, color: "#ef4444" },
// //         { name: "A+", value: 11, color: "#f97316" },
// //         { name: "B+", value: 9, color: "#eab308" },
// //         { name: "AB+", value: 6, color: "#22c55e" },
// //         { name: "O-", value: 4, color: "#3b82f6" },
// //         { name: "A-", value: 2, color: "#8b5cf6" },
// //         { name: "B-", value: 1, color: "#ec4899" },
// //         { name: "AB-", value: 1, color: "#6b7280" },
// //       ],
// //       monthly: [
// //         { month: "Jan", requests: 8 },
// //         { month: "Feb", requests: 12 },
// //         { month: "Mar", requests: 15 },
// //         { month: "Apr", requests: 10 },
// //         { month: "May", requests: 18 },
// //         { month: "Jun", requests: 22 },
// //       ],
// //     };

// //     setStats({
// //       totalRequests: mockData.totalRequests,
// //       pending: mockData.pending,
// //       accepted: mockData.accepted,
// //       fulfilled: mockData.fulfilled,
// //       rejected: mockData.rejected,
// //     });

// //     setChartData([
// //       { name: "Pending", value: mockData.pending, color: "#f59e0b" },
// //       { name: "Accepted", value: mockData.accepted, color: "#3b82f6" },
// //       { name: "Fulfilled", value: mockData.fulfilled, color: "#22c55e" },
// //       { name: "Rejected", value: mockData.rejected, color: "#ef4444" },
// //     ]);

// //     setBloodTypeData(mockData.bloodTypes);
// //     setMonthlyData(mockData.monthly);
// //   }, []);

// //   const StatCard = ({ title, value, icon, color }) => {
// //     const Icon = icon;
// //     return (
// //       <div
// //         className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}
// //       >
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
// //               {title}
// //             </p>
// //             <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
// //               {value}
// //             </p>
// //           </div>
// //           <div
// //             className={`p-4 rounded-full bg-${
// //               color.split("-")[1]
// //             }-100 dark:bg-${color.split("-")[1]}-900/50`}
// //           >
// //             <Icon className={`w-8 h-8 text-${color.split("-")[1]}-600`} />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="p-6 lg:p-10 space-y-8">
// //       <div>
// //         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
// //           Hospital Blood Request Dashboard
// //         </h1>
// //         <p className="text-lg text-gray-600 dark:text-gray-400">
// //           Real-time insights into your blood requests and fulfillment status
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
// //         <StatCard
// //           title="Total Requests"
// //           value={stats.totalRequests}
// //           icon={FileText}
// //           color="border-blue-600"
// //         />
// //         <StatCard
// //           title="Pending"
// //           value={stats.pending}
// //           icon={Clock}
// //           color="border-yellow-600"
// //         />
// //         <StatCard
// //           title="Accepted"
// //           value={stats.accepted}
// //           icon={TrendingUp}
// //           color="border-blue-600"
// //         />
// //         <StatCard
// //           title="Fulfilled"
// //           value={stats.fulfilled}
// //           icon={CheckCircle}
// //           color="border-green-600"
// //         />
// //         <StatCard
// //           title="Rejected"
// //           value={stats.rejected}
// //           icon={XCircle}
// //           color="border-red-600"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
// //           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //             Request Status Overview
// //           </h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart>
// //               <Pie
// //                 data={chartData}
// //                 cx="50%"
// //                 cy="50%"
// //                 labelLine={false}
// //                 label={({ name, value }) => `${name}: ${value}`}
// //                 outerRadius={100}
// //                 fill="#8884d8"
// //                 dataKey="value"
// //               >
// //                 {chartData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
// //           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //             Blood Type Requests
// //           </h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={bloodTypeData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#ef4444">
// //                 {bloodTypeData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Bar>
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
// //         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
// //           Monthly Request Trend
// //         </h3>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={monthlyData}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="month" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line
// //               type="monotone"
// //               dataKey="requests"
// //               stroke="#ef4444"
// //               strokeWidth={4}
// //               dot={{ fill: "#ef4444" }}
// //               activeDot={{ r: 8 }}
// //             />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {stats.pending > 10 && (
// //         <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl shadow-2xl flex items-center">
// //           <AlertCircle className="w-10 h-10 mr-4" />
// //           <div>
// //             <h4 className="text-xl font-bold">High Pending Requests</h4>
// //             <p>
// //               You have {stats.pending} requests awaiting approval. Please follow
// //               up!
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HospitalStaffDashboard;

// //////////\\\\\\\\
// // src/Features/hospital_staff/HospitalStaffDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   TrendingUp,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// const HospitalStaffDashboard = () => {
//   const [stats, setStats] = useState({
//     totalRequests: 0,
//     pending: 0,
//     accepted: 0,
//     fulfilled: 0,
//     rejected: 0,
//   });
//   const [chartData, setChartData] = useState([]);
//   const [bloodTypeData, setBloodTypeData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No authentication token found");

//         // Get all requests for this hospital staff
//         const response = await axios.get("/api/hospital_staff/my-requests", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const requests = response.data.data || [];

//         // === Calculate Stats ===
//         const total = requests.length;
//         const pending = requests.filter((r) => r.status === "pending").length;
//         const accepted = requests.filter((r) => r.status === "accepted").length;
//         const fulfilled = requests.filter(
//           (r) => r.status === "fulfilled"
//         ).length;
//         const rejected = requests.filter((r) => r.status === "rejected").length;

//         setStats({
//           totalRequests: total,
//           pending,
//           accepted,
//           fulfilled,
//           rejected,
//         });

//         // === Pie Chart: Status ===
//         setChartData(
//           [
//             { name: "Pending", value: pending, color: "#f59e0b" },
//             { name: "Accepted", value: accepted, color: "#3b82f6" },
//             { name: "Fulfilled", value: fulfilled, color: "#22c55e" },
//             { name: "Rejected", value: rejected, color: "#ef4444" },
//           ].filter((item) => item.value > 0)
//         );

//         // === Blood Type Distribution ===
//         const bloodCount = {};
//         requests.forEach((r) => {
//           const type = r.bloodType || "Unknown";
//           bloodCount[type] = (bloodCount[type] || 0) + 1;
//         });

//         const bloodColors = {
//           "O+": "#ef4444",
//           "A+": "#f97316",
//           "B+": "#eab308",
//           "AB+": "#22c55e",
//           "O-": "#3b82f6",
//           "A-": "#8b5cf6",
//           "B-": "#ec4899",
//           "AB-": "#6b7280",
//         };

//         const bloodTypeArray = Object.keys(bloodCount).map((type) => ({
//           name: type,
//           value: bloodCount[type],
//           color: bloodColors[type] || "#94a3b8",
//         }));

//         setBloodTypeData(bloodTypeArray);

//         // === Monthly Trend (Last 6 Months) ===
//         const now = new Date();
//         const monthly = [];

//         for (let i = 5; i >= 0; i--) {
//           const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//           const monthName = date.toLocaleString("default", { month: "short" });
//           const year = date.getFullYear();

//           const count = requests.filter((r) => {
//             const reqDate = new Date(r.createdAt);
//             return (
//               reqDate.getMonth() === date.getMonth() &&
//               reqDate.getFullYear() === year
//             );
//           }).length;

//           monthly.push({ month: monthName, requests: count });
//         }

//         setMonthlyData(monthly);

//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load dashboard data:", err);
//         setError(
//           err.response?.data?.message || "Failed to load dashboard data"
//         );
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const StatCard = ({ title, value, icon, color }) => {
//     const Icon = icon;
//     return (
//       <div
//         className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
//               {title}
//             </p>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
//               {value}
//             </p>
//           </div>
//           <div
//             className={`p-4 rounded-full bg-${
//               color.split("-")[1]
//             }-100 dark:bg-${color.split("-")[1]}-900/50`}
//           >
//             <Icon className={`w-8 h-8 text-${color.split("-")[1]}-600`} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
//           <p className="text-xl text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-10 text-center">
//         <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//         <p className="text-xl text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 lg:p-10 space-y-8">
//       <div>
//         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
//           Hospital Blood Request Dashboard
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-400">
//           Real-time insights into your blood requests and fulfillment status
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard
//           title="Total Requests"
//           value={stats.totalRequests}
//           icon={FileText}
//           color="border-blue-600"
//         />
//         <StatCard
//           title="Pending"
//           value={stats.pending}
//           icon={Clock}
//           color="border-yellow-600"
//         />
//         <StatCard
//           title="Accepted"
//           value={stats.accepted}
//           icon={TrendingUp}
//           color="border-blue-600"
//         />
//         <StatCard
//           title="Fulfilled"
//           value={stats.fulfilled}
//           icon={CheckCircle}
//           color="border-green-600"
//         />
//         <StatCard
//           title="Rejected"
//           value={stats.rejected}
//           icon={XCircle}
//           color="border-red-600"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Request Status Overview
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, value }) => `${name}: ${value}`}
//                 outerRadius={100}
//                 dataKey="value"
//               >
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Blood Type Requests
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={bloodTypeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value">
//                 {bloodTypeData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Monthly Trend */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//           Monthly Request Trend (Last 6 Months)
//         </h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="requests"
//               stroke="#ef4444"
//               strokeWidth={4}
//               dot={{ fill: "#ef4444" }}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Urgent Alert */}
//       {stats.pending > 10 && (
//         <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl shadow-2xl flex items-center animate-pulse">
//           <AlertCircle className="w-10 h-10 mr-4" />
//           <div>
//             <h4 className="text-xl font-bold">URGENT: High Pending Requests</h4>
//             <p className="text-lg">
//               You have {stats.pending} requests awaiting approval!
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HospitalStaffDashboard;
///////////\\\\\\\\\
// src/Features/hospital_staff/HospitalStaffDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Loader2,
  Droplet,
} from "lucide-react";

const HospitalStaffDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    accepted: 0,
    fulfilled: 0,
    rejected: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [bloodTypeData, setBloodTypeData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // SAME API as MyRequests — 100% compatible
        const response = await axios.get(
          "http://localhost:5000/api/hospital_staff/my-requests",
          { withCredentials: true }
        );

        const requests = response.data.data || [];

        // === Calculate Stats ===
        const total = requests.length;
        const pending = requests.filter((r) => r.status === "Pending").length;
        const accepted = requests.filter((r) => r.status === "Accepted").length;
        const fulfilled = requests.filter(
          (r) => r.status === "Fulfilled"
        ).length;
        const rejected = requests.filter((r) => r.status === "Rejected").length;

        setStats({
          totalRequests: total,
          pending,
          accepted,
          fulfilled,
          rejected,
        });

        // === Pie Chart: Status Distribution ===
        const statusData = [
          { name: "Pending", value: pending, color: "#f59e0b" },
          { name: "Accepted", value: accepted, color: "#3b82f6" },
          { name: "Fulfilled", value: fulfilled, color: "#22c55e" },
          { name: "Rejected", value: rejected, color: "#ef4444" },
        ].filter((item) => item.value > 0);

        setChartData(statusData);

        // === Blood Type Distribution ===
        const bloodCount = {};
        requests.forEach((r) => {
          const type = r.bloodType || "Unknown";
          bloodCount[type] = (bloodCount[type] || 0) + 1;
        });

        const bloodColors = {
          "A+": "#ef4444",
          "A-": "#dc2626",
          "B+": "#f97316",
          "B-": "#ea580c",
          "AB+": "#eab308",
          "AB-": "#ca8a04",
          "O+": "#22c55e",
          "O-": "#16a34a",
        };

        const bloodTypeArray = Object.keys(bloodCount)
          .map((type) => ({
            name: type,
            value: bloodCount[type],
            color: bloodColors[type] || "#94a3b8",
          }))
          .sort((a, b) => b.value - a.value);

        setBloodTypeData(bloodTypeArray);

        // === Monthly Trend (Last 6 Months) ===
        const now = new Date();
        const monthly = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthName = date.toLocaleString("default", { month: "short" });

          const count = requests.filter((r) => {
            const reqDate = new Date(r.createdAt);
            return (
              reqDate.getMonth() === date.getMonth() &&
              reqDate.getFullYear() === date.getFullYear()
            );
          }).length;

          monthly.push({ month: monthName, requests: count });
        }

        setMonthlyData(monthly);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => {
    const Icon = icon;
    return (
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </p>
          </div>
          <div
            className={`p-4 rounded-full bg-${
              color.split("-")[1]
            }-100 dark:bg-${color.split("-")[1]}-900/50`}
          >
            <Icon className={`w-8 h-8 text-${color.split("-")[1]}-600`} />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading your live data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Blood Request Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Live analytics from your hospital's blood requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Requests"
          value={stats.totalRequests}
          icon={FileText}
          color="border-blue-600"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="border-yellow-600"
        />
        <StatCard
          title="Accepted"
          value={stats.accepted}
          icon={TrendingUp}
          color="border-blue-600"
        />
        <StatCard
          title="Fulfilled"
          value={stats.fulfilled}
          icon={CheckCircle}
          color="border-green-600"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          color="border-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-red-600" />
            Request Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={110}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Type Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Most Requested Blood Types
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {bloodTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Request Trend (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#ef4444"
              strokeWidth={5}
              dot={{ fill: "#ef4444", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Urgent Alert */}
      {stats.pending > 5 && (
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl shadow-2xl flex items-center animate-pulse">
          <AlertCircle className="w-12 h-12 mr-4" />
          <div>
            <h4 className="text-2xl font-bold">Attention Required</h4>
            <p className="text-lg">
              You have {stats.pending} pending blood requests!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalStaffDashboard;
