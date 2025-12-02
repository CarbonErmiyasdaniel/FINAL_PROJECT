// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   Package,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// const HospitalRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:5000/api/admins/requests",
//         {
//           withCredentials: true,
//         }
//       );
//       setRequests(response.data);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       toast.error("Failed to load hospital requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRequestStatus = async (requestId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/admins/requests/${requestId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       toast.success(`Request ${newStatus.toLowerCase()} successfully`);
//       fetchRequests(); // Refresh the list
//     } catch (error) {
//       console.error("Error updating request:", error);
//       toast.error("Failed to update request status");
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending":
//         return <Clock className="w-5 h-5 text-yellow-500" />;
//       case "Fulfilled":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "Rejected":
//         return <XCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <AlertCircle className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const colors = {
//       Pending: "bg-yellow-100 text-yellow-800",
//       Fulfilled: "bg-green-100 text-green-800",
//       Rejected: "bg-red-100 text-red-800",
//     };
//     return colors[status] || "bg-gray-100 text-gray-800";
//   };

//   const filteredRequests = requests.filter((req) =>
//     filter === "All" ? true : req.status === filter
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Hospital Blood Requests
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Manage and approve blood requests from hospitals
//           </p>
//         </div>
//         <button
//           onClick={fetchRequests}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//         >
//           Refresh
//         </button>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
//         {["All", "Pending", "Fulfilled", "Rejected"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status)}
//             className={`px-4 py-2 font-medium transition-colors ${
//               filter === status
//                 ? "text-red-600 border-b-2 border-red-600"
//                 : "text-gray-600 hover:text-red-600"
//             }`}
//           >
//             {status}
//             {status !== "All" && (
//               <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
//                 {requests.filter((r) => r.status === status).length}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Requests List */}
//       {filteredRequests.length === 0 ? (
//         <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
//           <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-400">
//             No {filter !== "All" ? filter.toLowerCase() : ""} requests found
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredRequests.map((request) => (
//             <div
//               key={request._id}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-3 mb-2">
//                     {getStatusIcon(request.status)}
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       {request.hospitalName}
//                     </h3>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
//                         request.status
//                       )}`}
//                     >
//                       {request.status}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Blood Type
//                       </p>
//                       <p className="text-lg font-semibold text-red-600">
//                         {request.bloodType}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Quantity
//                       </p>
//                       <p className="text-lg font-semibold text-gray-900 dark:text-white">
//                         {request.quantityRequested} units
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Request Date
//                       </p>
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {new Date(request.requestDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Submitted
//                       </p>
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {new Date(request.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   {request.remarks && (
//                     <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                         Remarks:
//                       </p>
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {request.remarks}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {request.status === "Pending" && (
//                   <div className="flex flex-col space-y-2 ml-4">
//                     <button
//                       onClick={() =>
//                         updateRequestStatus(request._id, "Fulfilled")
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       <span>Approve</span>
//                     </button>
//                     <button
//                       onClick={() =>
//                         updateRequestStatus(request._id, "Rejected")
//                       }
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
//                     >
//                       <XCircle className="w-4 h-4" />
//                       <span>Reject</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//         <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
//           <p className="text-sm text-yellow-600 dark:text-yellow-400">
//             Pending Requests
//           </p>
//           <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
//             {requests.filter((r) => r.status === "Pending").length}
//           </p>
//         </div>
//         <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
//           <p className="text-sm text-green-600 dark:text-green-400">
//             Fulfilled Requests
//           </p>
//           <p className="text-2xl font-bold text-green-700 dark:text-green-300">
//             {requests.filter((r) => r.status === "Fulfilled").length}
//           </p>
//         </div>
//         <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
//           <p className="text-sm text-red-600 dark:text-red-400">
//             Rejected Requests
//           </p>
//           <p className="text-2xl font-bold text-red-700 dark:text-red-300">
//             {requests.filter((r) => r.status === "Rejected").length}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalRequests;
