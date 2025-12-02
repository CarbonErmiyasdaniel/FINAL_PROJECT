// // src/Features/lab_technician/TechnicianStats.jsx
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { TrendingUp, Activity, Droplet, AlertTriangle } from "lucide-react";

// const TechnicianStats = () => {
//   const monthlyData = [
//     { month: "Jan", tested: 245, safe: 238, rejected: 7 },
//     { month: "Feb", tested: 280, safe: 272, rejected: 8 },
//     { month: "Mar", tested: 310, safe: 305, rejected: 5 },
//     { month: "Apr", tested: 290, safe: 280, rejected: 10 },
//     { month: "May", tested: 330, safe: 325, rejected: 5 },
//     { month: "Jun", tested: 360, safe: 352, rejected: 8 },
//   ];

//   const bloodTypeData = [
//     { type: "O+", percentage: 38 },
//     { type: "A+", percentage: 28 },
//     { type: "B+", percentage: 20 },
//     { type: "AB+", percentage: 8 },
//     { type: "O-", percentage: 3 },
//     { type: "A-", percentage: 2 },
//     { type: "B-", percentage: 1 },
//     { type: "AB-", percentage: 0.5 },
//   ];

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Statistical Reports
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           Blood testing trends and laboratory performance
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-blue-100">Total Tests (2025)</p>
//               <p className="text-3xl font-bold mt-2">1,815</p>
//             </div>
//             <Activity className="w-12 h-12 opacity-80" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-green-100">Safe for Donation</p>
//               <p className="text-3xl font-bold mt-2">1,772</p>
//               <p className="text-sm mt-1">97.6%</p>
//             </div>
//             <Droplet className="w-12 h-12 opacity-80" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-red-100">Rejected Samples</p>
//               <p className="text-3xl font-bold mt-2">43</p>
//               <p className="text-sm mt-1">2.4%</p>
//             </div>
//             <AlertTriangle className="w-12 h-12 opacity-80" />
//           </div>
//         </div>
//         <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-purple-100">This Month</p>
//               <p className="text-3xl font-bold mt-2">360</p>
//               <p className="text-sm mt-1 flex items-center gap-1">
//                 <TrendingUp className="w-4 h-4" /> +12%
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Monthly Testing Trend
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="tested"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//                 name="Tested"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="safe"
//                 stroke="#10b981"
//                 strokeWidth={3}
//                 name="Safe"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="rejected"
//                 stroke="#ef4444"
//                 strokeWidth={3}
//                 name="Rejected"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Blood Type Distribution
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={bloodTypeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="type" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="percentage" fill="#dc2626" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechnicianStats;
// src/Features/lab_technician/TechnicianStats.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, isAfter } from "date-fns";
import {
  Droplet,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Activity,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TechnicianStats = () => {
  const [stats, setStats] = useState({
    totalTested: 0,
    safeThisMonth: 0,
    rejectedThisMonth: 0,
    totalSafe: 0,
    totalRejected: 0,
  });

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [inventoryRes, donationsRes] = await Promise.all([
        axios.get("/api/lab_technician/blood-stock", { withCredentials: true }),
        axios.get("/api/lab_technician/donations/all", {
          withCredentials: true,
        }),
      ]);

      // Process inventory
      const stock = inventoryRes.data?.data || [];
      const availableStock = stock.filter((b) => b.status === "Available");

      // Group by blood type
      const bloodStockMap = {};
      const today = new Date();
      const nextWeek = addDays(today, 7);
      let expiringSoon = 0;

      availableStock.forEach((bag) => {
        if (!bloodStockMap[bag.bloodType]) {
          bloodStockMap[bag.bloodType] = { count: 0, bags: [] };
        }
        bloodStockMap[bag.bloodType].count += 1;
        bloodStockMap[bag.bloodType].bags.push(bag);

        // Check expiry
        if (
          bag.expiryDate &&
          isAfter(new Date(bag.expiryDate), today) &&
          new Date(bag.expiryDate) <= nextWeek
        ) {
          expiringSoon++;
        }
      });

      const bloodStockData = Object.entries(bloodStockMap)
        .map(([type, data]) => ({
          type,
          count: data.count,
        }))
        .sort((a, b) => b.count - a.count);

      const minStock =
        bloodStockData.length > 0
          ? bloodStockData[bloodStockData.length - 1]
          : null;
      const maxStock = bloodStockData.length > 0 ? bloodStockData[0] : null;

      // Process donations
      const donations = donationsRes.data?.data || [];
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();

      const thisMonthDonations = donations.filter((d) => {
        const date = new Date(d.testedAt || d.createdAt);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      });

      const safeThisMonth = thisMonthDonations.filter(
        (d) => d.finalResult === "Safe"
      ).length;
      const rejectedThisMonth = thisMonthDonations.filter(
        (d) => d.finalResult === "Unsafe"
      ).length;

      const totalSafe = donations.filter(
        (d) => d.finalResult === "Safe"
      ).length;
      const totalRejected = donations.filter(
        (d) => d.finalResult === "Unsafe"
      ).length;

      setInventory({
        stockData: bloodStockData,
        totalBags: availableStock.length,
        minStock,
        maxStock,
        expiringSoon,
      });

      setStats({
        totalTested: donations.length,
        safeThisMonth,
        rejectedThisMonth,
        totalSafe,
        totalRejected,
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">
          Laboratory Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Real-time blood inventory and testing statistics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Tests (All Time)</p>
              <p className="text-4xl font-black mt-2">{stats.totalTested}</p>
            </div>
            <Activity className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Safe This Month</p>
              <p className="text-4xl font-black mt-2">{stats.safeThisMonth}</p>
            </div>
            <Droplet className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Rejected This Month</p>
              <p className="text-4xl font-black mt-2">
                {stats.rejectedThisMonth}
              </p>
            </div>
            <AlertTriangle className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Available Bags</p>
              <p className="text-4xl font-black mt-2">{inventory.totalBags}</p>
            </div>
            <Package className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {(inventory.expiringSoon > 0 ||
        (inventory.minStock && inventory.minStock.count < 5)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inventory.expiringSoon > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-500 p-6 rounded-2xl flex items-center gap-4">
              <Clock className="w-12 h-12 text-orange-600 animate-pulse" />
              <div>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                  {inventory.expiringSoon} Bag(s) Expiring Soon!
                </p>
                <p className="text-orange-700 dark:text-orange-400">
                  Will expire within 7 days
                </p>
              </div>
            </div>
          )}

          {inventory.minStock && inventory.minStock.count < 5 && (
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-500 p-6 rounded-2xl flex items-center gap-4">
              <AlertTriangle className="w-12 h-12 text-red-600 animate-pulse" />
              <div>
                <p className="text-2xl font-bold text-red-800 dark:text-red-300">
                  Low Stock: {inventory.minStock.type}
                </p>
                <p className="text-red-700 dark:text-red-400">
                  Only {inventory.minStock.count} bag(s) left
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stock Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blood Type Stock Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Droplet className="w-8 h-8 text-red-600" />
            Current Blood Stock by Type
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={inventory.stockData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
              <XAxis dataKey="type" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Bar
                dataKey="count"
                fill="#dc2626"
                radius={[12, 12, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
              <p className="text-sm text-green-700 dark:text-green-300">
                Highest Stock
              </p>
              <p className="text-3xl font-black text-green-600 dark:text-green-400">
                {inventory.maxStock?.type || "-"} (
                {inventory.maxStock?.count || 0})
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300">
                Lowest Stock
              </p>
              <p className="text-3xl font-black text-red-600 dark:text-red-400">
                {inventory.minStock?.type || "-"} (
                {inventory.minStock?.count || 0})
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Testing Efficiency</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Safe Rate (All Time)</span>
                <span className="text-3xl font-black">
                  {stats.totalTested > 0
                    ? ((stats.totalSafe / stats.totalTested) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rejection Rate</span>
                <span className="text-3xl font-black">
                  {stats.totalTested > 0
                    ? ((stats.totalRejected / stats.totalTested) * 100).toFixed(
                        1
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Today's Summary
            </h3>
            <div className="space-y-5 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Available
                </span>
                <span className="font-bold text-2xl">
                  {inventory.totalBags} bags
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Expiring Soon
                </span>
                <span
                  className={`font-bold text-2xl ${
                    inventory.expiringSoon > 0
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {inventory.expiringSoon}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Last Updated
                </span>
                <span className="font-bold">{format(new Date(), "HH:mm")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianStats;
