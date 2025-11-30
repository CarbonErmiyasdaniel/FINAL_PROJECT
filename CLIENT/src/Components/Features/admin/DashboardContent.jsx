// // DashboardContent.jsx

// // Assuming these are the necessary imports for icons and components
// import { Users, Heart, ClipboardList, BarChart } from "lucide-react";
// import MetricCard from "./MetricCard"; // Assuming MetricCard is in the same directory or adjust path
// import {
//   getTranslation,
//   toggleLanguage,
//   language,
// } from "../context/LanguageContext"; // Adjust path for context

// // Add 'export default' here
// const DashboardContent = () => (
//   <>
//     {/* --- Header Section (Now inside Main Content Area) --- */}
//     <div className="flex justify-between items-start mb-6">
//       <div>
//         {/* Main Title */}
//         <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
//           {getTranslation("title")}
//         </h1>
//         {/* Subtitle - Displayed for context */}
//         <p className="text-md text-gray-600 dark:text-gray-400">
//           {getTranslation("subtitle")}
//         </p>
//       </div>

//       {/* --- Utility Buttons Group --- */}
//       <div className="flex space-x-4">
//         {/* --- Amharic Language Toggle Button (SHARP & RED) --- */}
//         <button
//           onClick={toggleLanguage}
//           // Sharp corners (rounded-none), RED, and professional shadow
//           className="flex items-center bg-red-700 text-white font-bold py-3 px-6 rounded-none shadow-lg transition-all duration-300 hover:bg-red-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:-translate-y-px"
//         >
//           {language === "EN"
//             ? getTranslation("lang_btn")
//             : getTranslation("lang_btn_am")}
//         </button>
//       </div>
//     </div>

//     {/* --- Horizontal Line for separation --- */}
//     <hr className="border-gray-300 dark:border-gray-600 mb-8" />

//     {/* --- Key Metrics Section --- */}
//     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//       {getTranslation("metrics_title")}
//     </h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//       {/* Metric Cards */}
//       <MetricCard
//         title="Total Donors"
//         value="1,245"
//         color="red"
//         icon={<Users className="h-6 w-6" />}
//       />
//       <MetricCard
//         title="Blood Units (In Stock)"
//         value="45 U"
//         color="blue"
//         icon={<Heart className="h-6 w-6" />}
//       />
//       <MetricCard
//         title="Active Drives"
//         value="3"
//         color="green"
//         icon={<ClipboardList className="h-6 w-6" />}
//       />
//       <MetricCard
//         title="Critical Shortages"
//         value="O- Neg"
//         color="yellow"
//         icon={<BarChart className="h-6 w-6" />}
//       />
//     </div>
//   </>
// );

// export default DashboardContent; // <--- The essential change

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
  Calendar,
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

const DashboardContent = () => {
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get("/api/admins/getAllUsers", {
          withCredentials: true,
        });
        const users = res.data;

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

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Convert stats object into array for recharts
  const chartData = Object.entries(userStats).map(([role, count]) => ({
    name: getRoleLabel(role),
    value: count,
  }));

  const totalUsers = Object.values(userStats).reduce((a, b) => a + b, 0);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold mb-2 text-red-700 dark:text-red-400">
            User Statistics Dashboard
          </h1>
          <div className="flex items-center">
            <span className="text-xl">{currentDate}</span>
            <Calendar className="ml-2 w-6 h-6" />
          </div>
        </div>
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
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 mb-6">
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

            {/* --- TODO LIST SECTION --- */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                To-Do List
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="border rounded-md p-2 w-full"
                />
                <button
                  onClick={handleAddTask}
                  className="bg-blue-500 text-white rounded-md p-2 mt-2"
                >
                  Add Task
                </button>
              </div>
              <ul className="list-disc pl-5">
                {tasks.map((task, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{task}</span>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
