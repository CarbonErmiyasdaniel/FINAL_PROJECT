// import React, { useState, useEffect, useCallback } from "react";

// // NOTE: Replace this with your actual backend base URL
// const API_BASE_URL = "/api/post-counselor/finalized";

// const FinalizedNotificationsList = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("Safe"); // Default filter: 'Safe'

//   // Function to fetch data from the backend
//   const fetchData = useCallback(async (resultType) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Construct the URL with the filter parameter
//       const response = await fetch(`${API_BASE_URL}?result=${resultType}`);

//       if (!response.ok) {
//         // Handle non-200 responses (e.g., 400 Bad Request if filter is invalid)
//         const errorData = await response.json();
//         throw new Error(
//           errorData.msg || `HTTP error! Status: ${response.status}`
//         );
//       }

//       const json = await response.json();

//       if (json.success) {
//         setData(json.data);
//       } else {
//         // Handle success: false from the backend structure
//         throw new Error(json.msg || "Failed to fetch data.");
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       setError(err.message);
//       setData([]); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Run fetchData whenever the filter state changes
//   useEffect(() => {
//     fetchData(filter);
//   }, [filter, fetchData]);

//   // Helper to format Date objects
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString();
//   };

//   // --- Render Logic ---

//   return (
//     <div className="finalized-notifications-container">
//       <h2>Finalized Donor Notifications</h2>

//       {/* Filter Buttons */}
//       <div className="filter-controls">
//         <button
//           onClick={() => setFilter("Safe")}
//           // Example of simple styling for active state
//           style={{ backgroundColor: filter === "Safe" ? "green" : "lightgray" }}
//         >
//            Safe Results ({filter === "Safe" ? data.length : "..."})
//         </button>
//         <button
//           onClick={() => setFilter("Unsafe")}
//           style={{ backgroundColor: filter === "Unsafe" ? "red" : "lightgray" }}
//         >
//           Unsafe Results ({filter === "Unsafe" ? data.length : "..."})
//         </button>
//       </div>

//       <p>
//         Showing **{filter}** Donors (Total: {data.length})
//       </p>

//       {/* Loading & Error States */}
//       {loading && <p>Loading donor data...</p>}
//       {error && <p style={{ color: "red" }}>Error fetching data: {error}</p>}

//       {/* Data Table */}
//       {!loading && data.length > 0 && (
//         <table className="notifications-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Donor Name</th>
//               <th>Blood Type (ABO/Rh)</th>
//               <th>Result</th>
//               <th>SMS Status</th>
//               <th>Notified At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr
//                 key={item._id}
//                 style={{
//                   backgroundColor:
//                     item.finalResult === "Unsafe" ? "#fdd" : "#dfd",
//                 }}
//               >
//                 <td>{item.donationId}</td>
//                 <td>{item.name}</td>
//                 <td>
//                   <strong>{item.aboRh}</strong>
//                 </td>
//                 <td>
//                   <span
//                     style={{
//                       fontWeight: "bold",
//                       color:
//                         item.finalResult === "Unsafe" ? "darkred" : "darkgreen",
//                     }}
//                   >
//                     {item.finalResult}
//                   </span>
//                 </td>
//                 <td>{item.smsStatus === "sent" ? "Sent" : "Failed"}</td>
//                 <td>{formatDate(item.notifiedAt)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {!loading && data.length === 0 && !error && (
//         <p>No **{filter}** notifications found.</p>
//       )}
//     </div>
//   );
// };

// export default FinalizedNotificationsList;
import React, { useState, useEffect, useCallback } from "react";
// Assuming you have 'axios' imported elsewhere or use fetch. Sticking with 'fetch' as per your original code.
import { Loader2 } from "lucide-react"; // Using Lucide React for a modern spinner/icon

// NOTE: Replace this with your actual backend base URL
const API_BASE_URL = "/api/post-counselor/finalized";

// Helper component for the mobile-only detail view
const MobileDetails = ({ item }) => (
  <div className="p-4 bg-base-200 rounded-box border-l-4 border-primary/50 text-sm">
    <p className="mb-1">
      <strong className="font-semibold">ID:</strong>{" "}
      <span className="text-primary">{item.donationId}</span>
    </p>
    <p className="mb-1">
      <strong className="font-semibold">Phone:</strong> {item.phone || "N/A"}
    </p>
    <p>
      <strong className="font-semibold">Notified:</strong>{" "}
      {new Date(item.notifiedAt).toLocaleString()}
    </p>
  </div>
);

const FinalizedNotificationsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Safe"); // Default filter: 'Safe'
  const [expandedRow, setExpandedRow] = useState(null); // State for mobile interactivity

  // Function to fetch data from the backend
  const fetchData = useCallback(async (resultType) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(`${API_BASE_URL}?result=${resultType}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.msg || `HTTP error! Status: ${response.status}`
        );
      }

      const json = await response.json();

      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.msg || "Failed to fetch data.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setExpandedRow(null);
    }
  }, []);

  useEffect(() => {
    fetchData(filter);
  }, [filter, fetchData]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const toggleDetails = (_id) => {
    setExpandedRow(expandedRow === _id ? null : _id);
  };

  // --- Render Logic ---

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Finalized Donor Notifications
      </h2>

      {/* Filter Buttons (DaisyUI segmented controls) */}
      <div className="btn-group mb-6 shadow-md">
        <button
          onClick={() => setFilter("Safe")}
          className={`btn ${
            filter === "Safe"
              ? "btn-success hover:bg-success-focus text-white"
              : "btn-ghost"
          }`}
        >
          ✅ Safe ({filter === "Safe" ? data.length : "..."})
        </button>
        <button
          onClick={() => setFilter("Unsafe")}
          className={`btn ${
            filter === "Unsafe"
              ? "btn-error hover:bg-error-focus text-white"
              : "btn-ghost"
          }`}
        >
          🛑 Unsafe ({filter === "Unsafe" ? data.length : "..."})
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">Showing **{filter}** Donors.</p>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex items-center justify-center p-8 bg-base-100 rounded-lg shadow">
          <Loader2 className="animate-spin mr-3 h-6 w-6 text-primary" />
          <p className="text-lg text-primary">Loading donor data...</p>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      {/* Data Table */}
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-lg">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="bg-base-200">
                <th className="hidden md:table-cell">ID</th>
                <th>Blood Type</th>
                <th>Result</th>
                <th className="hidden md:table-cell">Phone</th>
                <th>SMS Status</th>
                <th className="hidden md:table-cell">Notified At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item._id}>
                  <tr
                    onClick={() => toggleDetails(item._id)}
                    className={`cursor-pointer transition-colors hover:bg-base-300 ${
                      item.finalResult === "Unsafe"
                        ? "bg-red-50/50"
                        : "bg-green-50/50"
                    }`}
                  >
                    {/* Donation ID - Hidden on mobile */}
                    <td className="hidden md:table-cell text-sm font-mono">
                      {item.donationId}
                    </td>
                    {/* Blood Type */}
                    <td className="font-bold text-lg">{item.aboRh}</td>
                    {/* Result */}
                    <td>
                      <div
                        className={`badge ${
                          item.finalResult === "Unsafe"
                            ? "badge-error"
                            : "badge-success"
                        } badge-lg text-white font-semibold`}
                      >
                        {item.finalResult}
                      </div>
                    </td>
                    {/* Phone - Hidden on mobile */}
                    <td className="hidden md:table-cell text-sm">
                      {item.phone || "N/A"}
                    </td>
                    {/* SMS Status */}
                    <td>
                      <span
                        className={`text-sm font-semibold ${
                          item.smsStatus === "sent"
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {item.smsStatus === "sent" ? "SENT" : "FAILED"}
                      </span>
                    </td>
                    {/* Notified At - Hidden on mobile */}
                    <td className="hidden md:table-cell text-sm">
                      {formatDate(item.notifiedAt)}
                    </td>
                  </tr>

                  {/* Mobile-only expanded row for extra details */}
                  <tr
                    className={`${
                      expandedRow === item._id ? "table-row" : "hidden"
                    }`}
                  >
                    <td colSpan="5" className="p-0 md:hidden">
                      <MobileDetails item={item} />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data.length === 0 && !error && (
        <p className="text-center text-gray-500 p-6 bg-base-100 rounded-lg shadow">
          No **{filter}** notifications found.
        </p>
      )}
    </div>
  );
};

export default FinalizedNotificationsList;
