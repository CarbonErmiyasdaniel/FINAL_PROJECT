// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   List,
//   Loader2,
//   Users,
//   Search,
//   ChevronUp,
//   ChevronDown,
//   HeartHandshake,
//   CheckCircle,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import DashboardLayout from "../../Pages/DashboardLayout";
// import { useNavigate } from "react-router-dom";
// // could you create a nurse list page with the ability to sort and search through the list of nurses. The page should fetch the list of nurses from an API endpoint and display them in a table format. Each row in the table should have options to view, edit, or delete the nurse's information.
// // st
// // Safe formatting for donor names
// const formatName = (donor) => {
//   if (!donor) return "Unknown";
//   const name =
//     donor.name || `${donor.firstName || ""} ${donor.surname || ""}`.trim();
//   return name || "Unknown";
// };

// const NurseListPage = () => {
//   const [donors, setDonors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "name",
//     direction: "ascending",
//   });

//   const navigate = useNavigate();

//   // Fetch donors
//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const res = await axios.get("/api/nurses/get_doners", {
//           withCredentials: true,
//         });
//         setDonors(res.data);
//         setError(null);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message ||
//           err.response?.data ||
//           "Failed to fetch donors.";
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDonors();
//   }, []);

//   // Sorting
//   const sortedDonors = React.useMemo(() => {
//     let sortable = [...donors];
//     if (sortConfig.key) {
//       sortable.sort((a, b) => {
//         let aValue = a[sortConfig.key];
//         let bValue = b[sortConfig.key];

//         if (sortConfig.key.includes("At")) {
//           aValue = new Date(aValue);
//           bValue = new Date(bValue);
//         } else {
//           aValue = String(aValue || "").toLowerCase();
//           bValue = String(bValue || "").toLowerCase();
//         }

//         if (aValue < bValue)
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         if (aValue > bValue)
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortable;
//   }, [donors, sortConfig]);

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

//   // Filter donors
//   const filteredDonors = sortedDonors.filter(
//     (donor) =>
//       formatName(donor).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handlers
//   const handleAddPersonalInfo = (donor) => {
//     navigate(`/nurse/registerDonorInfo/${donor._id}`);
//   };
//   const handleUpdateDonorInfo = (donor) => {
//     navigate(`/nurse/updateDonorInfo/${donor._id}`);
//   };
//   const handleRegisterDonation = (donor) => {
//     if (donor.hasPersonalInfo) {
//       navigate(`/nurse/registerDonation/${donor._id}`);
//     } else {
//       toast.warn("Please add the donor's personal information first.");
//     }
//   };

//   // Loading state
//   if (isLoading)
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-full min-h-[50vh] bg-white rounded-xl shadow-lg">
//           <Loader2 className="animate-spin h-8 w-8 text-red-700" />
//           <p className="ml-3 text-lg text-gray-600">Loading donor data...</p>
//         </div>
//       </DashboardLayout>
//     );

//   // Error state
//   if (error)
//     return (
//       <DashboardLayout>
//         <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500">
//           <h1 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
//             <List className="w-6 h-6" /> Donor List
//           </h1>
//           <p className="text-red-700 font-medium">Error: {error}</p>
//         </div>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout>
//       <div className="p-4 sm:p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
//           <Users className="text-red-700 w-8 h-8" /> Donor List (Registered by
//           Nurses)
//         </h1>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500 flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-blue-500 uppercase">
//                 Total Donors
//               </p>
//               <p className="text-2xl font-bold text-blue-700">
//                 {donors.length}
//               </p>
//             </div>
//             <HeartHandshake className="w-8 h-8 text-blue-400" />
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150"
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-red-50">
//               <tr>
//                 <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   #
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-red-100"
//                   onClick={() => requestSort("name")}
//                 >
//                   Name {getSortIcon("name")}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-red-100 hidden sm:table-cell"
//                   onClick={() => requestSort("email")}
//                 >
//                   Email {getSortIcon("email")}
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Created
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Updated
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {filteredDonors.length > 0 ? (
//                 filteredDonors.map((donor, index) => (
//                   <tr
//                     key={donor._id}
//                     className="hover:bg-gray-50 transition duration-100"
//                   >
//                     <td className="px-3 py-4 text-sm text-gray-500 text-center">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       {formatName(donor)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
//                       {donor.email || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(donor.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(donor.updatedAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-center text-sm font-medium">
//                       <div className="inline-flex items-center space-x-2">
//                         {donor.hasPersonalInfo ? (
//                           <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
//                             <CheckCircle className="w-4 h-4 mr-1" /> Info Added
//                           </span>
//                         ) : (
//                           <button
//                             className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                             onClick={() => handleAddPersonalInfo(donor)}
//                           >
//                             Add Info
//                           </button>
//                         )}

//                         <button
//                           className={`inline-flex items-center px-3 py-2 text-xs font-medium text-white rounded-lg transition focus:outline-none focus:ring-2 ${
//                             donor.hasPersonalInfo
//                               ? "bg-red-600 hover:bg-red-700 focus:ring-red-400 cursor-pointer"
//                               : "bg-gray-400 cursor-not-allowed"
//                           }`}
//                           onClick={() => handleRegisterDonation(donor)}
//                           disabled={!donor.hasPersonalInfo}
//                         >
//                           <HeartHandshake className="w-4 h-4 mr-1" />
//                           Donate
//                         </button>

//                         <button
//                           className={`inline-flex items-center px-3 py-2 text-xs font-medium text-white rounded-lg transition focus:outline-none focus:ring-2 ${
//                             donor.hasPersonalInfo
//                               ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 cursor-pointer"
//                               : "bg-gray-400 cursor-not-allowed"
//                           }`}
//                           onClick={() => handleUpdateDonorInfo(donor)}
//                           disabled={!donor.hasPersonalInfo}
//                         >
//                           <Users className="w-4 h-4 mr-1" />
//                           Update
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-6 py-10 text-center text-gray-500 text-lg"
//                   >
//                     {donors.length > 0
//                       ? "No donors match your search criteria."
//                       : "No donors found in the system."}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default NurseListPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  Loader2,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
// import DashboardLayout from "../../Pages/DashboardLayout"; // REMOVED
import { useNavigate } from "react-router-dom";
// could you create a nurse list page with the ability to sort and search through the list of nurses. The page should fetch the list of nurses from an API endpoint and display them in a table format. Each row in the table should have options to view, edit, or delete the nurse's information.
// st
// Safe formatting for donor names
const formatName = (donor) => {
  if (!donor) return "Unknown";
  const name =
    donor.name || `${donor.firstName || ""} ${donor.surname || ""}`.trim();
  return name || "Unknown";
};

const NurseListPage = () => {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const navigate = useNavigate();

  // Fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("/api/nurses/get_doners", {
          withCredentials: true,
        });
        setDonors(res.data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to fetch donors.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonors();
  }, []);

  // Sorting
  const sortedDonors = React.useMemo(() => {
    let sortable = [...donors];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key.includes("At")) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = String(aValue || "").toLowerCase();
          bValue = String(bValue || "").toLowerCase();
        }

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [donors, sortConfig]);

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

  // Filter donors
  const filteredDonors = sortedDonors.filter(
    (donor) =>
      formatName(donor).toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  // const handleAddPersonalInfo = (donor) => {
  //   navigate(`/nurse/registerDonorInfo/${donor._id}`);
  // };
  // After: Add console logging
  const handleAddPersonalInfo = (donor) => {
    const donorId = donor?._id;

    // 🐛 STEP 1: Check the ID
    console.log("Attempting to navigate for Donor:", donor);
    console.log("Navigating to ID:", donorId);

    if (!donorId) {
      // 🐛 STEP 2: Handle missing ID gracefully
      console.error("Error: Donor ID is missing. Cannot navigate.");
      toast.error("Donor ID is missing. Cannot proceed with registration.");
      return;
    }

    // If the ID is present, navigate.
    navigate(`/nurse/registerDonorInfo/${donorId}`);
  };
  const handleUpdateDonorInfo = (donor) => {
    navigate(`/nurse/updateDonorInfo/${donor._id}`);
  };
  const handleRegisterDonation = (donor) => {
    if (donor.hasPersonalInfo) {
      navigate(`/nurse/registerDonation/${donor._id}`);
    } else {
      toast.warn("Please add the donor's personal information first.");
    }
  };

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh] bg-white rounded-xl shadow-lg">
        <Loader2 className="animate-spin h-8 w-8 text-red-700" />
        <p className="ml-3 text-lg text-gray-600">Loading donor data...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500">
        <h1 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <List className="w-6 h-6" /> Donor List
        </h1>
        <p className="text-red-700 font-medium">Error: {error}</p>
      </div>
    );

  return (
    // Removed <DashboardLayout> tags
    <div className="p-4 sm:p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
        <Users className="text-red-700 w-8 h-8" /> Donor List (Registered by
        Nurses)
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-500 uppercase">
              Total Donors
            </p>
            <p className="text-2xl font-bold text-blue-700">{donors.length}</p>
          </div>
          <HeartHandshake className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50">
            <tr>
              <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-red-100"
                onClick={() => requestSort("name")}
              >
                Name {getSortIcon("name")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-red-100 hidden sm:table-cell"
                onClick={() => requestSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <tr
                  key={donor._id}
                  className="hover:bg-gray-50 transition duration-100"
                >
                  <td className="px-3 py-4 text-sm text-gray-500 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatName(donor)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {donor.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(donor.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(donor.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <div className="inline-flex items-center space-x-2">
                      {donor.hasPersonalInfo ? (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          <CheckCircle className="w-4 h-4 mr-1" /> Info Added
                        </span>
                      ) : (
                        <button
                          className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          onClick={() => handleAddPersonalInfo(donor)}
                        >
                          Add Info
                        </button>
                      )}

                      <button
                        className={`inline-flex items-center px-3 py-2 text-xs font-medium text-white rounded-lg transition focus:outline-none focus:ring-2 ${
                          donor.hasPersonalInfo
                            ? "bg-red-600 hover:bg-red-700 focus:ring-red-400 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => handleRegisterDonation(donor)}
                        disabled={!donor.hasPersonalInfo}
                      >
                        <HeartHandshake className="w-4 h-4 mr-1" />
                        Donate
                      </button>

                      <button
                        className={`inline-flex items-center px-3 py-2 text-xs font-medium text-white rounded-lg transition focus:outline-none focus:ring-2 ${
                          donor.hasPersonalInfo
                            ? "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => handleUpdateDonorInfo(donor)}
                        disabled={!donor.hasPersonalInfo}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500 text-lg"
                >
                  {donors.length > 0
                    ? "No donors match your search criteria."
                    : "No donors found in the system."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    // Removed </DashboardLayout>
  );
};

export default NurseListPage;
