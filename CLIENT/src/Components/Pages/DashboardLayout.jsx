// import { useAuth } from "../../context/useAuth.js";
// const DashboardLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const userName = user?.userName || "User";
//   const userRole = user?.role || "guest";
//   const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);
//   return (
//     <div className="font-inter">
//       <nav className="bg-red-700 py-[12px] px-4 text-white shadow-xl fixed w-full top-0 z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-extrabold tracking-wide">
//             {capitalizedRole} Dashboard
//           </h1>
//           <div className="flex items-center space-x-6">
//             <span className="text-lg font-medium">
//               Hello, <span className="font-bold">{userName}</span>!
//             </span>
//             <button
//               onClick={logout}
//               className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//       <main className="pt-16">{children}</main>
//     </div>
//   );
// };
// export default DashboardLayout;
import { useAuth } from "../../context/useAuth.js";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const userName = user?.userName || "User";
  const userRole = user?.role || "guest";
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  const [currentTime, setCurrentTime] = useState("");

  // Function to update the current time
  const updateCurrentTime = () => {
    const options = {
      timeZone: "Africa/Addis_Ababa", // Ethiopian time zone
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };
    const time = new Intl.DateTimeFormat("en-US", options).format(new Date());
    setCurrentTime(time);
  };

  // Update time every second
  useEffect(() => {
    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="font-inter">
      <nav className="bg-red-700 py-[12px] px-4 text-white shadow-xl fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">
            {capitalizedRole} Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-medium">
              Hello, <span className="font-bold">{userName}</span>!
            </span>
            <span className="text-lg font-medium">
              Current Time: <span className="font-bold">{currentTime}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default DashboardLayout;
