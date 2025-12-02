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
//         "/api/lab_technician/hospital-requests", // Use relative path (Vite/React Proxy will handle it)
//         { withCredentials: true }
//       );

//       // THIS IS THE FIX
//       const requestsData = response.data?.data || response.data || [];
//       // Ensure it's always an array
//       setRequests(Array.isArray(requestsData) ? requestsData : []);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       toast.error("Failed to load hospital requests");
//       setRequests([]); // Prevent crash
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRequestStatus = async (requestId, newStatus) => {
//     try {
//       await axios.put(
//         `/api/lab_technician/hospital-requests/${requestId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       toast.success(`Request ${newStatus.toLowerCase()} successfully`);
//       fetchRequests();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.error("Failed to update request");
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

//   // Safe filtering – requests is always an array now
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
//                       {request.hospitalName || "Unknown Hospital"}
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
//                       <p className="text-sm text-gray-500">Blood Type</p>
//                       <p className="text-lg font-semibold text-red-600">
//                         {request.bloodType}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Quantity</p>
//                       <p className="text-lg font-semibold">
//                         {request.quantityRequested} units
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Request Date</p>
//                       <p className="text-sm">
//                         {new Date(
//                           request.requestDate || request.createdAt
//                         ).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Submitted By</p>
//                       <p className="text-sm">
//                         {request.requestedBy?.name || "N/A"}
//                       </p>
//                     </div>
//                   </div>

//                   {request.remarks && (
//                     <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                       <p className="text-sm font-medium text-gray-600">
//                         Remarks:
//                       </p>
//                       <p className="text-sm mt-1">{request.remarks}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {request.status === "Pending" && (
//                   <div className="flex flex-col gap-3 ml-6">
//                     <button
//                       onClick={() =>
//                         updateRequestStatus(request._id, "Fulfilled")
//                       }
//                       className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
//                     >
//                       <CheckCircle className="w-4 h-4" />
//                       Approve
//                     </button>
//                     <button
//                       onClick={() =>
//                         updateRequestStatus(request._id, "Rejected")
//                       }
//                       className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition"
//                     >
//                       <XCircle className="w-4 h-4" />
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
//         <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-xl">
//           <p className="text-yellow-700 dark:text-yellow-300">Pending</p>
//           <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
//             {requests.filter((r) => r.status === "Pending").length}
//           </p>
//         </div>
//         <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl">
//           <p className="text-green-700 dark:text-green-300">Fulfilled</p>
//           <p className="text-3xl font-bold text-green-800 dark:text-green-200">
//             {requests.filter((r) => r.status === "Fulfilled").length}
//           </p>
//         </div>
//         <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-xl">
//           <p className="text-red-700 dark:text-red-300">Rejected</p>
//           <p className="text-3xl font-bold text-red-800 dark:text-red-200">
//             {requests.filter((r) => r.status === "Rejected").length}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalRequests;
// Features/lab_technician/HospitalRequests.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

const HospitalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/api/lab_technician/hospital-requests",
        {
          withCredentials: true,
        }
      );
      setRequests(data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    if (newStatus === "Fulfilled") {
      const confirm = window.confirm(
        "Issue blood from inventory? This will reduce stock permanently."
      );
      if (!confirm) return;
    }

    setProcessingId(requestId);

    try {
      const { data } = await axios.put(
        `/api/lab_technician/hospital-requests/${requestId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.msg);
        fetchRequests();
      }
    } catch (error) {
      const msg = error.response?.data?.msg || "Operation failed";
      toast.error(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatus = (status) => {
    const map = {
      Pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
      Fulfilled: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      Rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    };
    return (
      map[status] || {
        icon: AlertCircle,
        color: "text-gray-600",
        bg: "bg-gray-100",
      }
    );
  };

  const filteredRequests = requests.filter((r) =>
    filter === "All" ? true : r.status === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Hospital Blood Requests
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Approve or reject blood supply requests with real-time inventory
            control
          </p>
        </div>
        <button
          onClick={fetchRequests}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-3 transition"
        >
          <Package className="w-5 h-5" />
          Refresh Requests
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 flex-wrap">
        {["All", "Pending", "Fulfilled", "Rejected"].map((f) => {
          const count = requests.filter((r) => r.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {f} {f !== "All" && <span className="ml-2">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No requests found</p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const Status = getStatus(req.status);
            return (
              <div
                key={req._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-l-8 border-gray-300 hover:border-red-500 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <Status.icon className={`w-8 h-8 ${Status.color}`} />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {req.hospitalName}
                        </h3>
                        <p className="text-gray-600">
                          by {req.requestedBy?.name || "Unknown"}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${Status.bg} ${Status.color}`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="text-3xl font-black text-red-600">
                          {req.bloodType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Units Requested</p>
                        <p className="text-3xl font-black text-gray-800 dark:text-white">
                          {req.quantityRequested}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Request Date</p>
                        <p className="font-bold">
                          {new Date(
                            req.requestDate || req.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Urgency</p>
                        <p className="font-bold text-orange-600">
                          {req.urgency || "Normal"}
                        </p>
                      </div>
                    </div>

                    {req.remarks && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <p className="font-medium text-blue-800 dark:text-blue-200">
                          Remarks: {req.remarks}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {req.status === "Pending" && (
                    <div className="flex flex-col gap-4 ml-8">
                      <button
                        onClick={() =>
                          updateRequestStatus(req._id, "Fulfilled")
                        }
                        disabled={processingId === req._id}
                        className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition"
                      >
                        {processingId === req._id ? (
                          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <CheckCircle className="w-6 h-6" />
                        )}
                        Approve & Issue
                      </button>

                      <button
                        onClick={() => updateRequestStatus(req._id, "Rejected")}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition"
                      >
                        <XCircle className="w-6 h-6" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {["Pending", "Fulfilled", "Rejected"].map((status) => (
          <div
            key={status}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">{status}</p>
            <p className="text-5xl font-black mt-3 text-gray-900 dark:text-white">
              {requests.filter((r) => r.status === status).length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalRequests;
