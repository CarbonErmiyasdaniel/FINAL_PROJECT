import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  HeartHandshake,
  Stethoscope,
  User,
  Building2,
  Activity,
} from "lucide-react";
import { toast } from "react-toastify";

// 🎨 Colors for each role (Pie slices)
const COLORS = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#14B8A6",
];

const roleIcons = {
  admin: <User className="w-6 h-6" />,
  donor: <HeartHandshake className="w-6 h-6" />,
  nurse: <Stethoscope className="w-6 h-6" />,
  hospital_staff: <Building2 className="w-6 h-6" />,
  lab_technician: <Activity className="w-6 h-6" />,
};

const getRoleLabel = (role) =>
  role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const UserStatsDashboard = () => {
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get("/api/admins/getAllUsers", {
          withCredentials: true,
        });
        const users = res.data;

        // 🔢 Count users by role
        const counts = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        setUserStats(counts);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch user statistics. Check your backend.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  // Convert stats object into array for recharts
  const chartData = Object.entries(userStats).map(([role, count]) => ({
    name: getRoleLabel(role),
    value: count,
  }));

  const totalUsers = Object.values(userStats).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2 text-red-700 dark:text-red-400">
          User Statistics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Overview of all registered users by their roles
        </p>

        {/* --- METRIC CARDS --- */}
        {isLoading ? (
          <div className="text-center py-20 animate-pulse text-gray-500">
            Loading user statistics...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {Object.entries(userStats).map(([role, count]) => (
                <div
                  key={role}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border-l-4 border-red-600"
                >
                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      {getRoleLabel(role)}
                    </h2>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                      {count}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-gray-700 rounded-full text-red-700 dark:text-red-400">
                    {roleIcons[role] || <Users className="w-6 h-6" />}
                  </div>
                </div>
              ))}
              {/* Total Users Summary */}
              <div className="flex items-center justify-between bg-red-700 text-white shadow-lg rounded-xl p-5 border-l-4 border-red-900">
                <div>
                  <h2 className="text-sm font-semibold uppercase opacity-90">
                    Total Users
                  </h2>
                  <p className="text-3xl font-extrabold mt-1">{totalUsers}</p>
                </div>
                <div className="p-3 bg-red-800 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* --- PIE CHART SECTION --- */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                User Distribution by Role
              </h2>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderRadius: "10px",
                        border: "none",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserStatsDashboard;
/////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Users,
//   HeartHandshake,
//   Stethoscope,
//   Building2,
//   Activity,
// } from "lucide-react";
// import { toast } from "react-toastify";

// // 🎨 Colors for each role (Pie slices)
// const COLORS = [
//   "#EF4444",
//   "#3B82F6",
//   "#10B981",
//   "#F59E0B",
//   "#8B5CF6",
//   "#14B8A6",
// ];

// const getRoleLabel = (role) =>
//   role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

// const UserStatsDashboard = () => {
//   const [userStats, setUserStats] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const res = await axios.get("/api/admins/getAllUsers", {
//           withCredentials: true,
//         });
//         const users = res.data;

//         // 🔢 Count users by role
//         const counts = users.reduce((acc, user) => {
//           acc[user.role] = (acc[user.role] || 0) + 1;
//           return acc;
//         }, {});

//         setUserStats(counts);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         toast.error("Failed to fetch user statistics. Check your backend.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserStats();
//   }, []);

//   // Convert stats object into array for recharts
//   const chartData = Object.entries(userStats).map(([role, count]) => ({
//     name: getRoleLabel(role),
//     value: count,
//   }));

//   return (
//     <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-extrabold mb-2 text-red-700 dark:text-red-400">
//           User Statistics Dashboard
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-8">
//           Overview of all registered users by their roles
//         </p>

//         {/* --- METRIC CARDS --- */}
//         {isLoading ? (
//           <div className="text-center py-20 animate-pulse text-gray-500">
//             Loading user statistics...
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//               {/* Metric Cards */}
//               {/* ... */}
//             </div>

//             {/* --- PIE CHART SECTION --- */}
//             <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 mt-10">
//               <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
//                 User Distribution by Role
//               </h2>
//               <div className="w-full h-[500px]">
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={120}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) =>
//                         `${name}: ${(percent * 100).toFixed(0)}%`
//                       }
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         borderRadius: "10px",
//                         border: "none",
//                         color: "#fff",
//                       }}
//                     />
//                     <Legend
//                       iconType="circle"
//                       iconSize={12}
//                       layout="horizontal"
//                       align="center"
//                       verticalAlign="bottom"
//                       wrapperStyle={{
//                         fontSize: "14px",
//                         fontWeight: "bold",
//                         color: "#6B7280",
//                       }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserStatsDashboard;
