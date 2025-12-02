// // src/Features/lab_technician/TestListPage.jsx
// import React, { useState } from "react";
// import {
//   Search,
//   Filter,
//   Calendar,
//   AlertCircle,
//   CheckCircle,
//   Clock,
// } from "lucide-react";

// const TestListPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");

//   // Sample data
//   const tests = [
//     {
//       id: "T001",
//       donorName: "Abebe Kebede",
//       bloodType: "O+",
//       testDate: "2025-11-30",
//       status: "Completed",
//       hiv: "Negative",
//       hepatitisB: "Negative",
//       hepatitisC: "Negative",
//       syphilis: "Negative",
//     },
//     {
//       id: "T002",
//       donorName: "Mulugeta Tadesse",
//       bloodType: "A-",
//       testDate: "2025-11-29",
//       status: "Pending",
//       hiv: "Pending",
//       hepatitisB: "Pending",
//       hepatitisC: "Pending",
//       syphilis: "Pending",
//     },
//     {
//       id: "T003",
//       donorName: "Selamawit Girma",
//       bloodType: "AB+",
//       testDate: "2025-11-28",
//       status: "Completed",
//       hiv: "Negative",
//       hepatitisB: "Positive",
//       hepatitisC: "Negative",
//       syphilis: "Negative",
//     },
//     {
//       id: "T004",
//       donorName: "Yonas Alemayehu",
//       bloodType: "B+",
//       testDate: "2025-11-27",
//       status: "Completed",
//       hiv: "Negative",
//       hepatitisB: "Negative",
//       hepatitisC: "Negative",
//       syphilis: "Negative",
//     },
//   ];

//   const filteredTests = tests.filter((test) => {
//     const matchesSearch =
//       test.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       test.id.includes(searchTerm);
//     const matchesFilter =
//       filterStatus === "All" || test.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-100 text-green-800";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getResultIcon = (result) => {
//     if (result === "Negative")
//       return <CheckCircle className="w-5 h-5 text-green-600" />;
//     if (result === "Positive")
//       return <AlertCircle className="w-5 h-5 text-red-600" />;
//     return <Clock className="w-5 h-5 text-gray-500" />;
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Blood Test Results
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           View and manage donor screening test results
//         </p>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by donor name or ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800"
//           />
//         </div>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
//         >
//           <option value="All">All Status</option>
//           <option value="Completed">Completed</option>
//           <option value="Pending">Pending</option>
//         </select>
//       </div>

//       <div className="grid gap-4">
//         {filteredTests.map((test) => (
//           <div
//             key={test.id}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     {test.donorName}
//                   </h3>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
//                       test.status
//                     )}`}
//                   >
//                     {test.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Test ID: {test.id} • Blood Type:{" "}
//                   <span className="font-semibold text-red-600">
//                     {test.bloodType}
//                   </span>
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-500 flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   {test.testDate}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">HIV</p>
//                 <div className="flex items-center justify-center gap-2 mt-1">
//                   {getResultIcon(test.hiv)}
//                   <span
//                     className={`font-semibold ${
//                       test.hiv === "Negative"
//                         ? "text-green-600"
//                         : test.hiv === "Positive"
//                         ? "text-red-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {test.hiv}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Hepatitis B
//                 </p>
//                 <div className="flex items-center justify-center gap-2 mt-1">
//                   {getResultIcon(test.hepatitisB)}
//                   <span
//                     className={`font-semibold ${
//                       test.hepatitisB === "Negative"
//                         ? "text-green-600"
//                         : test.hepatitisB === "Positive"
//                         ? "text-red-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {test.hepatitisB}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Hepatitis C
//                 </p>
//                 <div className="flex items-center justify-center gap-2 mt-1">
//                   {getResultIcon(test.hepatitisC)}
//                   <span
//                     className={`font-semibold ${
//                       test.hepatitisC === "Negative"
//                         ? "text-green-600"
//                         : test.hepatitisC === "Positive"
//                         ? "text-red-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {test.hepatitisC}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Syphilis
//                 </p>
//                 <div className="flex items-center justify-center gap-2 mt-1">
//                   {getResultIcon(test.syphilis)}
//                   <span
//                     className={`font-semibold ${
//                       test.syphilis === "Negative"
//                         ? "text-green-600"
//                         : test.syphilis === "Positive"
//                         ? "text-red-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {test.syphilis}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestListPage;
// src/Features/lab_technician/TestListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";

const TestListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const [pendingRes, testedRes] = await Promise.all([
        axios.get("/api/lab_technician/donations/pending"), // Fixed!
        axios.get("/api/lab_technician/donations/tested"), // Fixed!
      ]);

      // ... rest of your code stays the same

      const pending = pendingRes.data.map((d) => ({
        id: d._id,
        donorName: d.personalInfo?.fullName || "Unknown Donor",
        bloodType: d.aboRh || "Unknown",
        testDate: format(new Date(d.dateOfDonation), "yyyy-MM-dd"),
        status: "Pending",
        hiv: "Pending",
        hepatitisB: "Pending",
        hepatitisC: "Pending",
        syphilis: "Pending",
        donation: d,
      }));

      const tested = testedRes.data.map((d) => ({
        id: d._id,
        donorName: d.personalInfo?.fullName || "Unknown Donor",
        bloodType: d.aboRh || "Unknown",
        testDate: d.testedAt
          ? format(new Date(d.testedAt), "yyyy-MM-dd")
          : format(new Date(d.dateOfDonation), "yyyy-MM-dd"),
        status: "Completed",
        hiv: d.screeningTests?.hiv || "N/A",
        hepatitisB: d.screeningTests?.hepatitisB || "N/A",
        hepatitisC: d.screeningTests?.hepatitisC || "N/A",
        syphilis: d.screeningTests?.syphilis || "N/A",
        finalResult: d.finalResult,
        donation: d,
      }));

      setTests([...pending, ...tested]);
    } catch (err) {
      console.error(err);
      setError("Failed to load test data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    const interval = setInterval(fetchDonations, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.includes(searchTerm);
    const matchesFilter =
      filterStatus === "All" || test.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getResultIcon = (result) => {
    if (result === "Negative")
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (result === "Positive")
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    if (result === "Inconclusive")
      return <AlertCircle className="w-5 h-5 text-orange-600" />;
    return <Clock className="w-5 h-5 text-gray-500" />;
  };

  const getResultColor = (result) => {
    if (result === "Negative") return "text-green-600";
    if (result === "Positive") return "text-red-600";
    if (result === "Inconclusive") return "text-orange-600";
    return "text-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        <span className="ml-4 text-xl">Loading test results...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 text-xl">{error}</p>
        <button
          onClick={fetchDonations}
          className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blood Test Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage donor screening test results ({tests.length} total)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by donor name or donation ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredTests.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No donations found matching your filters
            </p>
          </div>
        ) : (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {test.donorName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        test.status
                      )}`}
                    >
                      {test.status}
                    </span>
                    {test.finalResult && test.status === "Completed" && (
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
                          test.finalResult === "Safe"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {test.finalResult}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Donation ID: <span className="font-mono">{test.id}</span> •
                    Blood Type:{" "}
                    <span className="font-semibold text-red-600">
                      {test.bloodType}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {test.testDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["hiv", "hepatitisB", "hepatitisC", "syphilis"].map(
                  (disease) => (
                    <div
                      key={disease}
                      className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {disease === "hiv"
                          ? "HIV"
                          : disease
                              .replace("hepatitisB", "Hepatitis B")
                              .replace("hepatitisC", "Hepatitis C")}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        {getResultIcon(test[disease])}
                        <span
                          className={`font-bold text-lg ${getResultColor(
                            test[disease]
                          )}`}
                        >
                          {test[disease]}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestListPage;
