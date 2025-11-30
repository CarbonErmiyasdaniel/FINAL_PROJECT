// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FileText,
//   Calendar,
//   Droplet,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMyRequests = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/hospital_staff/my-requests",
//           {
//             withCredentials: true,
//           }
//         );
//         setRequests(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch requests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyRequests();
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Fulfilled":
//         return <CheckCircle className="w-5 h-5 text-green-600" />;
//       case "Rejected":
//         return <XCircle className="w-5 h-5 text-red-600" />;
//       case "Pending":
//       default:
//         return <Clock className="w-5 h-5 text-yellow-600" />;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const baseClasses =
//       "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2";
//     switch (status) {
//       case "Fulfilled":
//         return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
//       case "Rejected":
//         return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
//       case "Pending":
//       default:
//         return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
//           <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           My Blood Requests
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Track the status of your blood requests
//         </p>
//       </div>

//       {requests.length === 0 ? (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
//           <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//           <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
//             No Requests Yet
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">
//             You haven't submitted any blood requests yet.
//           </p>
//           <button
//             onClick={() =>
//               (window.location.href = "/hospital_staff/request-blood")
//             }
//             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Create New Request
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center justify-between">
//             <p className="text-blue-800 dark:text-blue-300 font-semibold">
//               Total Requests: {requests.length}
//             </p>
//             <div className="flex gap-4 text-sm">
//               <span className="text-yellow-700 dark:text-yellow-400">
//                 Pending: {requests.filter((r) => r.status === "Pending").length}
//               </span>
//               <span className="text-green-700 dark:text-green-400">
//                 Fulfilled:{" "}
//                 {requests.filter((r) => r.status === "Fulfilled").length}
//               </span>
//               <span className="text-red-700 dark:text-red-400">
//                 Rejected:{" "}
//                 {requests.filter((r) => r.status === "Rejected").length}
//               </span>
//             </div>
//           </div>

//           {requests.map((request, index) => (
//             <div
//               key={request._id}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center">
//                   <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
//                     <Droplet className="w-6 h-6 text-red-600 dark:text-red-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {request.hospitalName}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Request #{requests.length - index}
//                     </p>
//                   </div>
//                 </div>
//                 <span className={getStatusBadge(request.status)}>
//                   {getStatusIcon(request.status)}
//                   {request.status}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                 <div className="flex items-center">
//                   <Droplet className="w-5 h-5 text-gray-400 mr-2" />
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Blood Type
//                     </p>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {request.bloodType}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <FileText className="w-5 h-5 text-gray-400 mr-2" />
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Quantity
//                     </p>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {request.quantityRequested} units
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Calendar className="w-5 h-5 text-gray-400 mr-2" />
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Request Date
//                     </p>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {new Date(request.requestDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Clock className="w-5 h-5 text-gray-400 mr-2" />
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Submitted
//                     </p>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {new Date(request.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {request.remarks && (
//                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     <span className="font-semibold">Remarks:</span>{" "}
//                     {request.remarks}
//                   </p>
//                 </div>
//               )}

//               {request.status === "Pending" && (
//                 <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
//                   <p className="text-sm text-yellow-800 dark:text-yellow-400 flex items-start">
//                     <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
//                     This request is awaiting admin approval. You will be
//                     notified once it's processed.
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyRequests;
///////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  Calendar,
  Droplet,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Activity,
  Bell,
  Search,
  Filter,
} from "lucide-react";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hospital_staff/my-requests",
          {
            withCredentials: true,
          }
        );
        setRequests(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  // Filter and search logic
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Fulfilled":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "Pending":
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm";
    switch (status) {
      case "Fulfilled":
        return `${baseClasses} bg-gradient-to-r from-green-100 to-green-200 text-green-800`;
      case "Rejected":
        return `${baseClasses} bg-gradient-to-r from-red-100 to-red-200 text-red-800`;
      case "Pending":
      default:
        return `${baseClasses} bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="animate-pulse">
          <Heart className="w-16 h-16 text-red-600 animate-ping" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-red-100 to-red-200 border border-red-300 text-red-800 px-6 py-4 rounded-xl flex items-start shadow-lg">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with modern gradient and icons */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-3 flex items-center justify-center gap-3">
            <Heart className="w-12 h-12 text-red-600 animate-pulse" />
            My Blood Requests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor and manage all your blood requests in one elegant dashboard.
            Stay updated with real-time status.
          </p>
        </div>

        {/* Stats Cards with gradients and shadows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <Activity className="w-10 h-10 mb-3 opacity-90" />
            <p className="text-sm font-medium opacity-90">Total Requests</p>
            <p className="text-3xl font-bold">{requests.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <Clock className="w-10 h-10 mb-3 opacity-90" />
            <p className="text-sm font-medium opacity-90">Pending</p>
            <p className="text-3xl font-bold">
              {requests.filter((r) => r.status === "Pending").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <CheckCircle className="w-10 h-10 mb-3 opacity-90" />
            <p className="text-sm font-medium opacity-90">Fulfilled</p>
            <p className="text-3xl font-bold">
              {requests.filter((r) => r.status === "Fulfilled").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <XCircle className="w-10 h-10 mb-3 opacity-90" />
            <p className="text-sm font-medium opacity-90">Rejected</p>
            <p className="text-3xl font-bold">
              {requests.filter((r) => r.status === "Rejected").length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital or blood type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 shadow-md focus:border-red-500 focus:ring-4 focus:ring-red-100 transition duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 shadow-md focus:border-red-500 focus:ring-4 focus:ring-red-100 transition duration-200 appearance-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-pink-700 transition-all flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notify Me
          </button>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center transform hover:scale-105 transition-transform">
            <Droplet className="w-24 h-24 mx-auto text-red-200 mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Requests Found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {requests.length === 0
                ? "Start by creating your first blood request to save lives."
                : "Try adjusting your search or filter to find what you're looking for."}
            </p>
            <button
              onClick={() =>
                (window.location.href = "/hospital_staff/request-blood")
              }
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-pink-700 transition-all"
            >
              Create New Request
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((request, index) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-red-100 to-pink-100 p-4 rounded-2xl mr-5 shadow-md">
                      <Droplet className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900">
                        {request.hospitalName}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Request #{filteredRequests.length - index}
                      </p>
                    </div>
                  </div>
                  <span className={getStatusBadge(request.status)}>
                    {getStatusIcon(request.status)}
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
                    <div className="flex items-center">
                      <Droplet className="w-6 h-6 text-red-500 mr-3" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Type
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {request.bloodType}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
                    <div className="flex items-center">
                      <FileText className="w-6 h-6 text-blue-500 mr-3" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {request.quantityRequested} units
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
                    <div className="flex items-center">
                      <Calendar className="w-6 h-6 text-green-500 mr-3" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Request Date
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {new Date(request.requestDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-purple-500 mr-3" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted On
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {request.remarks && (
                  <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
                    <p className="text-base text-gray-700 italic flex items-start">
                      <span className="font-bold text-gray-900 mr-2">
                        Notes:
                      </span>
                      {request.remarks}
                    </p>
                  </div>
                )}

                {request.status === "Pending" && (
                  <div className="mt-6 bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 rounded-xl p-4 flex items-start shadow-md">
                    <AlertCircle className="w-5 h-5 text-yellow-700 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-yellow-800 font-medium">
                      Your request is under review. We'll notify you via email
                      or dashboard once a decision is made. Thank you for your
                      patience!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
