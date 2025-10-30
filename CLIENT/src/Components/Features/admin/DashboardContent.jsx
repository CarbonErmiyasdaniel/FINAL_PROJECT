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
