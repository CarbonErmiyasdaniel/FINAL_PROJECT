// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   List,
//   Loader2,
//   Stethoscope,
//   ChevronUp,
//   ChevronDown,
//   Search,
// } from "lucide-react";

// // The component is designed for displaying Nurse Activity Reports
// const NurseActivityReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "reportDate",
//     direction: "descending", // Default to newest first
//   });

//   // 1. Fetch Reports from Backend
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get("/api/admins/reports/nurse-activity"); // Original endpoint
//         setReports(response.data);
//       } catch (err) {
//         const errorMsg = err.response?.data?.msg || "Error fetching reports";
//         setError(errorMsg);
//         toast.error(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   // Handler: To view the report
//   const handleViewReport = (reportId) => {
//     console.log("View report with ID:", reportId);
//     // You can implement navigation or modal logic here
//     toast.info(`Attempting to view report ${reportId}`);
//   };

//   // 2. Sorting Logic
//   const sortedReports = React.useMemo(() => {
//     let sortableItems = [...reports];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         let aValue, bValue;

//         if (sortConfig.key === "nurseName") {
//           aValue = String(a.nurseId?.name || "").toLowerCase();
//           bValue = String(b.nurseId?.name || "").toLowerCase();
//         } else if (sortConfig.key === "reportDate") {
//           aValue = new Date(a.reportDate).getTime();
//           bValue = new Date(b.reportDate).getTime();
//         } else {
//           aValue = String(a[sortConfig.key] || "").toLowerCase();
//           bValue = String(b[sortConfig.key] || "").toLowerCase();
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [reports, sortConfig]);

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === "ascending" ? (
//       <ChevronDown className="h-4 w-4 inline ml-1" />
//     ) : (
//       <ChevronUp className="h-4 w-4 inline ml-1" />
//     );
//   };

//   // 3. Filtering Logic
//   const filteredReports = sortedReports.filter(
//     (report) =>
//       String(report.action).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       String(report.details).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       String(report.nurseId?.name || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       String(report.nurseId?.email || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   // 4. Loading/Error State Render
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full min-h-[50vh] bg-white rounded-xl shadow-lg">
//         <Loader2 className="animate-spin h-8 w-8 text-blue-700" />
//         <p className="ml-3 text-lg text-gray-600">
//           Loading nurse activity reports...
//         </p>
//       </div>
//     );
//   }

//   if (error && !loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500">
//         <h1 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
//           <List className="w-6 h-6" /> Activity Reports
//         </h1>
//         <p className="text-red-700 font-medium">Error: {error}</p>
//         <p className="text-red-500 mt-2">
//           Could not retrieve nurse activity data. Please try again later.
//         </p>
//         <ToastContainer />
//       </div>
//     );
//   }

//   // 5. Main Content Render (Table)
//   return (
//     <div className="p-4 sm:p-8 bg-white rounded-xl shadow-2xl border-t-4 border-blue-700">
//       <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
//         <Stethoscope className="text-blue-700 w-8 h-8" /> Nurse Activity Reports
//       </h1>
//       <p className="text-gray-600 mb-6">
//         Detailed logs of activities performed by nurses in the system.
//       </p>

//       {/* Report Count Card */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500 flex items-center justify-between col-span-1 md:col-span-1">
//           <div>
//             <p className="text-sm font-medium text-blue-500 uppercase">
//               Total Reports
//             </p>
//             <p className="text-2xl font-bold text-blue-700">{reports.length}</p>
//           </div>
//           <List className="w-8 h-8 text-blue-400" />
//         </div>
//       </div>

//       {/* Search Input */}
//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search by action, details, or nurse name/email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
//         />
//       </div>

//       {/* Table Container */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               {/* # Column */}
//               <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 #
//               </th>
//               {/* Action Header */}
//               <th
//                 className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
//                 onClick={() => requestSort("action")}
//               >
//                 Action {getSortIcon("action")}
//               </th>
//               {/* Details Header */}
//               <th
//                 className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100 hidden sm:table-cell"
//                 onClick={() => requestSort("details")}
//               >
//                 Details {getSortIcon("details")}
//               </th>
//               {/* Nurse Name Header (NEW) */}
//               <th
//                 className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
//                 onClick={() => requestSort("nurseName")}
//               >
//                 Nurse Name {getSortIcon("nurseName")}
//               </th>
//               {/* Date Header */}
//               <th
//                 className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
//                 onClick={() => requestSort("reportDate")}
//               >
//                 Date {getSortIcon("reportDate")}
//               </th>
//               {/* Actions Header */}
//               <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {filteredReports.length > 0 ? (
//               filteredReports.map((report, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-50 transition duration-100"
//                 >
//                   {/* # Cell */}
//                   <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
//                     {index + 1}
//                   </td>
//                   {/* Action Cell */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {report.action}
//                   </td>
//                   {/* Details Cell */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
//                     {report.details}
//                   </td>
//                   {/* Nurse Name Cell (NEW) */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="font-semibold">
//                       {report.nurseId?.name || "N/A"}
//                     </div>
//                     <div className="text-gray-500 text-xs">
//                       {report.nurseId?.email || "No Email"}
//                     </div>
//                   </td>
//                   {/* Date Cell */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(report.reportDate).toLocaleDateString()}
//                   </td>
//                   {/* Actions Cell */}
//                   <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                     <button
//                       onClick={() => handleViewReport(report._id)}
//                       className="text-blue-600 hover:text-blue-900 transition duration-150 p-2 rounded-md border border-blue-500 hover:border-blue-700"
//                     >
//                       View Report
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6" // Updated colspan to 6
//                   className="px-6 py-10 text-center text-gray-500 text-lg"
//                 >
//                   {reports.length > 0
//                     ? "No reports match your search criteria."
//                     : "No nurse activity reports found in the system."}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default NurseActivityReports;
/////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  List,
  Loader2,
  Stethoscope,
  ChevronUp,
  ChevronDown,
  Search,
  BookOpen, // Added for the modal icon
} from "lucide-react";
// Import the new Modal component
import ReportDetailsModal from "./ReportDetailsModal";

const NurseActivityReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "reportDate",
    direction: "descending", // Default to newest first
  });

  // NEW STATE: To control the modal visibility and content
  const [selectedReport, setSelectedReport] = useState(null);

  // 1. Fetch Reports from Backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Assuming the response data is an array of reports
        const response = await axios.get("/api/admins/reports/nurse-activity");
        setReports(response.data);
      } catch (err) {
        const errorMsg = err.response?.data?.msg || "Error fetching reports";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handler: To view the report
  const handleViewReport = (report) => {
    // Now accepts the full report object
    setSelectedReport(report); // Set the report to display in the modal
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  // 2. Sorting Logic (No changes needed)
  const sortedReports = React.useMemo(() => {
    let sortableItems = [...reports];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key === "nurseName") {
          aValue = String(a.nurseId?.name || "").toLowerCase();
          bValue = String(b.nurseId?.name || "").toLowerCase();
        } else if (sortConfig.key === "reportDate") {
          aValue = new Date(a.reportDate).getTime();
          bValue = new Date(b.reportDate).getTime();
        } else {
          aValue = String(a[sortConfig.key] || "").toLowerCase();
          bValue = String(b[sortConfig.key] || "").toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [reports, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    );
  };

  // 3. Filtering Logic (No changes needed)
  const filteredReports = sortedReports.filter(
    (report) =>
      String(report.action).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(report.details).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(report.nurseId?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(report.nurseId?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // 4. Loading/Error State Render (No changes needed)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh] bg-white rounded-xl shadow-lg">
        <Loader2 className="animate-spin h-8 w-8 text-blue-700" />
        <p className="ml-3 text-lg text-gray-600">
          Loading nurse activity reports...
        </p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <List className="w-6 h-6" /> Activity Reports
        </h1>
        <p className="text-red-700 font-medium">Error: {error}</p>
        <p className="text-red-500 mt-2">
          Could not retrieve nurse activity data. Please try again later.
        </p>
        <ToastContainer />
      </div>
    );
  }

  // 5. Main Content Render (Table)
  return (
    <div className="p-4 sm:p-8 bg-white rounded-xl shadow-2xl border-t-4 border-blue-700">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
        <Stethoscope className="text-blue-700 w-8 h-8" /> Nurse Activity Reports
      </h1>
      <p className="text-gray-600 mb-6">
        Detailed logs of activities performed by nurses in the system.
      </p>

      {/* Report Count Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500 flex items-center justify-between col-span-1 md:col-span-1">
          <div>
            <p className="text-sm font-medium text-blue-500 uppercase">
              Total Reports
            </p>
            <p className="text-2xl font-bold text-blue-700">{reports.length}</p>
          </div>
          <List className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by action, details, or nurse name/email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              {/* # Column */}
              <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              {/* Action Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
                onClick={() => requestSort("action")}
              >
                Action {getSortIcon("action")}
              </th>
              {/* Details Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100 hidden sm:table-cell"
                onClick={() => requestSort("details")}
              >
                Details {getSortIcon("details")}
              </th>
              {/* Nurse Name Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
                onClick={() => requestSort("nurseName")}
              >
                Nurse Name {getSortIcon("nurseName")}
              </th>
              {/* Date Header */}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-blue-100"
                onClick={() => requestSort("reportDate")}
              >
                Date {getSortIcon("reportDate")}
              </th>
              {/* Actions Header */}
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr
                  key={report._id || index} // Use _id if available
                  className="hover:bg-gray-50 transition duration-100"
                >
                  {/* # Cell */}
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {index + 1}
                  </td>
                  {/* Action Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.action}
                  </td>
                  {/* Details Cell (Truncated for table view) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell truncate max-w-xs">
                    {report.details?.length > 50
                      ? `${report.details.substring(0, 50)}...`
                      : report.details}
                  </td>
                  {/* Nurse Name Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-semibold">
                      {report.nurseId?.name || "N/A"}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {report.nurseId?.email || "No Email"}
                    </div>
                  </td>
                  {/* Date Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.reportDate).toLocaleDateString()}
                  </td>
                  {/* Actions Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      // PASS THE FULL REPORT OBJECT to open the modal
                      onClick={() => handleViewReport(report)}
                      className="text-blue-600 hover:text-blue-900 transition duration-150 p-2 rounded-md border border-blue-500 hover:border-blue-700 flex items-center justify-center mx-auto"
                      title="View Full Report Details"
                    >
                      <BookOpen className="w-4 h-4 mr-1" /> View Report
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-gray-500 text-lg"
                >
                  {reports.length > 0
                    ? "No reports match your search criteria."
                    : "No nurse activity reports found in the system."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 💥 MODAL COMPONENT RENDERED HERE 💥 */}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={handleCloseModal}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default NurseActivityReports;
