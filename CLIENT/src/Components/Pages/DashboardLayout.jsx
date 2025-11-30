// import { useAuth } from "../../context/useAuth.js";
// import { useEffect, useState } from "react";
// import { LogOut, LayoutDashboard, Settings } from "lucide-react"; // Added icons for design

// const DashboardLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const userName = user?.userName || "User";
//   const userRole = user?.role || "guest";
//   const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

//   const [currentTime, setCurrentTime] = useState("");
//   const [hovered, setHovered] = useState(false); // State for the 'dynamic' subtle move effect

//   // Function to update the current time
//   const updateCurrentTime = () => {
//     const options = {
//       timeZone: "Africa/Addis_Ababa", // Ethiopian time zone
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false, // Use 24-hour format
//     };
//     const time = new Intl.DateTimeFormat("en-GB", options).format(new Date());
//     setCurrentTime(time);
//   };

//   // Update time every second
//   useEffect(() => {
//     updateCurrentTime();
//     const intervalId = setInterval(updateCurrentTime, 1000); // Update every second
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="font-inter min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
//       {/* 1. Floating Layout: fixed top-4, left-1/2, transform: -translate-x-1/2, width: fit-content.
//         2. UI Professionalism: bg-black/80 backdrop-blur-md, rounded-2xl, subtle border/shadow.
//         3. Dynamic Feature: Subtle Y-axis movement on hover (simulating movability).
//       */}
//       <nav
//         className={`
//           fixed top-4 left-1/2 transform -translate-x-1/2 z-50
//           w-fit py-3 px-6
//           bg-black/80 backdrop-blur-lg text-white
//           shadow-2xl shadow-purple-900/50
//           rounded-2xl border border-white/10
//           transition-all duration-500 ease-out
//           ${hovered ? "translate-y-1" : ""}
//         `}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="flex justify-between items-center space-x-12">
//           {/* Dashboard/Role Title - Styled for Professionalism */}
//           <div className="flex items-center space-x-3">
//             <LayoutDashboard className="w-6 h-6 text-purple-400" />
//             <h1 className="text-xl font-extrabold tracking-tight whitespace-nowrap">
//               {capitalizedRole} Dashboard
//             </h1>
//           </div>

//           {/* Right-side Content (Greeting, Time, Logout) */}
//           <div className="flex items-center space-x-6">
//             <span className="text-sm font-medium hidden md:inline-block whitespace-nowrap">
//               Hello,{" "}
//               <span className="font-bold text-green-400">{userName}</span>!
//             </span>

//             {/* Dynamic Clock - Enhanced professionalism and color */}
//             <span className="text-sm font-light border-l border-white/20 pl-4 hidden sm:inline-block whitespace-nowrap">
//               Time:{" "}
//               <span className="font-semibold text-yellow-400">
//                 {currentTime}
//               </span>
//             </span>

//             {/* Logout Button - Styled for the new aesthetic */}
//             <button
//               onClick={logout}
//               className={`
//                 flex items-center space-x-2
//                 bg-red-600 hover:bg-red-700 text-white
//                 font-medium py-2 px-3 rounded-xl
//                 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]
//                 whitespace-nowrap
//               `}
//               title="Logout"
//             >
//               <LogOut className="w-4 h-4" />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Increased padding-top (pt-24) to account for the fixed floating nav and margin */}
//       <main className="pt-24 px-4 md:px-8">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;
import { useAuth } from "../../context/useAuth.js";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const userName = user?.userName || "User";
  const userRole = user?.role || "guest";
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  const [currentTime, setCurrentTime] = useState("");
  const [hovered, setHovered] = useState(false);

  // -------------------------------
  // Ethiopian Time Conversion Logic
  // -------------------------------
  const updateCurrentTime = () => {
    const now = new Date();

    const options = {
      timeZone: "Africa/Addis_Ababa",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    // Get Addis Ababa local time
    const etTime = new Intl.DateTimeFormat("en-GB", options).format(now);
    let [hour, minute, second] = etTime.split(":").map(Number);

    // Convert to Ethiopian clock (subtract 6 hours)
    hour = (hour + 18) % 12 || 12;

    const formatted = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;

    setCurrentTime(formatted);
  };

  // Update every second
  useEffect(() => {
    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-inter min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <nav
        className={`
          fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
          w-fit py-3 px-6 
          bg-black/80 backdrop-blur-lg text-white 
          shadow-2xl shadow-purple-900/50 
          rounded-2xl border border-white/10
          transition-all duration-500 ease-out 
          ${hovered ? "translate-y-1" : ""} 
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex justify-between items-center space-x-12">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-extrabold tracking-tight whitespace-nowrap">
              {capitalizedRole} Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium hidden md:inline-block whitespace-nowrap">
              Hello,{" "}
              <span className="font-bold text-green-400">{userName}</span>!
            </span>

            <span className="text-sm font-light border-l border-white/20 pl-4 hidden sm:inline-block whitespace-nowrap">
              Time:{" "}
              <span className="font-semibold text-yellow-400">
                {currentTime}
              </span>
            </span>

            <button
              onClick={logout}
              className={`
                flex items-center space-x-2 
                bg-red-600 hover:bg-red-700 text-white 
                font-medium py-2 px-3 rounded-xl 
                transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]
                whitespace-nowrap
              `}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 px-4 md:px-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
