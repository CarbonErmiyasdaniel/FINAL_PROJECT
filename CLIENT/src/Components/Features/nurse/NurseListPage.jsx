// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Loader2,
// //   Users,
// //   Search,
// //   HeartHandshake,
// //   CheckCircle,
// // } from "lucide-react";

// // const getFullName = (donor) => {
// //   if (!donor) return "Unknown Donor";
// //   if (donor.personalInfo) {
// //     const p = donor.personalInfo;
// //     return (
// //       `${p.title || ""} ${donor.name || ""} ${p.fatherName || ""} ${
// //         p.surname || ""
// //       }`
// //         .trim()
// //         .replace(/\s+/g, " ") || "Unnamed Donor"
// //     );
// //   }
// //   return donor.name || "Unnamed Donor";
// // };

// // const NurseListPage = () => {
// //   const [donors, setDonors] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [sortConfig, setSortConfig] = useState({
// //     key: "createdAt",
// //     direction: "descending",
// //   });
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchDonors = async () => {
// //       try {
// //         const res = await axios.get("/api/nurses/get_doners", {
// //           withCredentials: true,
// //         });
// //         setDonors(res.data || []);
// //       } catch (err) {
// //         toast.error(err.response?.data?.message || "Failed to load donors");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchDonors();
// //   }, []);

// //   const sortedAndFiltered = React.useMemo(() => {
// //     let list = [...donors];
// //     if (sortConfig.key) {
// //       list.sort((a, b) => {
// //         let aVal = a[sortConfig.key] ?? "";
// //         let bVal = b[sortConfig.key] ?? "";
// //         if (sortConfig.key.includes("At")) {
// //           aVal = new Date(aVal);
// //           bVal = new Date(bVal);
// //         }
// //         if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
// //         if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
// //         return 0;
// //       });
// //     }
// //     return list.filter(
// //       (d) =>
// //         getFullName(d).toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         d.email?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   }, [donors, sortConfig, searchTerm]);

// //   const requestSort = (key) => {
// //     setSortConfig((prev) => ({
// //       key,
// //       direction:
// //         prev.key === key && prev.direction === "ascending"
// //           ? "descending"
// //           : "ascending",
// //     }));
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <Loader2 className="animate-spin h-12 w-12 text-red-600" />
// //         <span className="ml-4 text-xl">Loading donors...</span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-gradient-to-br from-red-50 to-white min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
// //           <Users className="text-red-700 w-10 h-10" />
// //           Donor List
// //         </h1>

// //         <div className="mb-8">
// //           <div className="relative max-w-md">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //             <input
// //               type="text"
// //               placeholder="Search by name or email..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
// //             />
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// //           <table className="w-full">
// //             <thead className="bg-red-700 text-white">
// //               <tr>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
// //                 <th
// //                   className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-red-600"
// //                   onClick={() => requestSort("name")}
// //                 >
// //                   Full Name
// //                 </th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// //                   Email
// //                 </th>
// //                 <th className="px-6 py-4 text-left text-sm font-semibold">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-4 text-center text-sm font-semibold">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {sortedAndFiltered.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-12 text-gray-500">
// //                     {donors.length === 0
// //                       ? "No donors registered yet."
// //                       : "No donors match your search."}
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 sortedAndFiltered.map((donor, i) => (
// //                   <tr key={donor._id} className="hover:bg-gray-50 transition">
// //                     <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
// //                     <td className="px-6 py-4">
// //                       <div className="font-semibold text-gray-900">
// //                         {getFullName(donor)}
// //                       </div>
// //                       {donor.personalInfo?.donorNumber && (
// //                         <div className="text-xs text-gray-500">
// //                           #{donor.personalInfo.donorNumber}
// //                         </div>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4 text-gray-600">
// //                       {donor.email || "-"}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {donor.hasPersonalInfo ? (
// //                         <span className="inline-flex items-center gap-1 text-green-700 font-medium">
// //                           <CheckCircle className="w-5 h-5" /> Info Added
// //                         </span>
// //                       ) : (
// //                         <span className="text-orange-600 font-medium">
// //                           Pending Info
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4 text-center">
// //                       <div className="flex justify-center gap-2">
// //                         {!donor.hasPersonalInfo ? (
// //                           <button
// //                             onClick={() =>
// //                               navigate("/nurse/Donor_List", {
// //                                 state: {
// //                                   showRegisterInfo: true,
// //                                   donorId: donor._id,
// //                                   donorName: getFullName(donor),
// //                                 },
// //                               })
// //                             }
// //                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
// //                           >
// //                             Add Info
// //                           </button>
// //                         ) : (
// //                           <>
// //                             <button
// //                               onClick={() =>
// //                                 navigate("/nurse/Donor_List", {
// //                                   state: {
// //                                     showRegisterDonation: true,
// //                                     donorId: donor._id,
// //                                   },
// //                                 })
// //                               }
// //                               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
// //                             >
// //                               <HeartHandshake className="w-4 h-4" /> Donate
// //                             </button>
// //                             <button
// //                               onClick={() =>
// //                                 navigate("/nurse/Donor_List", {
// //                                   state: {
// //                                     showUpdateInfo: true,
// //                                     donorId: donor._id,
// //                                   },
// //                                 })
// //                               }
// //                               className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
// //                             >
// //                               Update
// //                             </button>
// //                           </>
// //                         )}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NurseListPage;

// // //////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   Loader2,
//   Users,
//   Search,
//   HeartHandshake,
//   CheckCircle,
// } from "lucide-react";

// const getFullName = (donor) => {
//   if (!donor) return "Unknown Donor";
//   if (donor.personalInfo) {
//     const p = donor.personalInfo;
//     return (
//       `${p.title || ""} ${donor.name || ""} ${p.fatherName || ""} ${
//         p.surname || ""
//       }`
//         .trim()
//         .replace(/\s+/g, " ") || "Unnamed Donor"
//     );
//   }
//   return donor.name || "Unnamed Donor";
// };

// const NurseListPage = () => {
//   const [donors, setDonors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "createdAt",
//     direction: "descending",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const res = await axios.get("/api/nurses/get_doners", {
//           withCredentials: true,
//         });
//         setDonors(res.data || []);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to load donors");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDonors();
//   }, []);

//   const sortedAndFiltered = React.useMemo(() => {
//     let list = [...donors];
//     if (sortConfig.key) {
//       list.sort((a, b) => {
//         let aVal = a[sortConfig.key] ?? "";
//         let bVal = b[sortConfig.key] ?? "";
//         if (sortConfig.key.includes("At")) {
//           aVal = new Date(aVal);
//           bVal = new Date(bVal);
//         }
//         if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
//         return 0;
//       });
//     }
//     return list.filter(
//       (d) =>
//         getFullName(d).toLowerCase().includes(searchTerm.toLowerCase()) ||
//         d.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [donors, sortConfig, searchTerm]);

//   const requestSort = (key) => {
//     setSortConfig((prev) => ({
//       key,
//       direction:
//         prev.key === key && prev.direction === "ascending"
//           ? "descending"
//           : "ascending",
//     }));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="animate-spin h-12 w-12 text-red-600" />
//         <span className="ml-4 text-xl">Loading donors...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-br from-red-50 to-white min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
//           <Users className="text-red-700 w-10 h-10" />
//           Donor List
//         </h1>

//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
//             />
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-red-700 text-white">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-red-600"
//                   onClick={() => requestSort("name")}
//                 >
//                   Full Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {sortedAndFiltered.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12 text-gray-500">
//                     {donors.length === 0
//                       ? "No donors registered yet."
//                       : "No donors match your search."}
//                   </td>
//                 </tr>
//               ) : (
//                 sortedAndFiltered.map((donor, i) => (
//                   <tr key={donor._id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
//                     <td className="px-6 py-4">
//                       <div className="font-semibold text-gray-900">
//                         {getFullName(donor)}
//                       </div>
//                       {donor.personalInfo?.donorNumber && (
//                         <div className="text-xs text-gray-500">
//                           #{donor.personalInfo.donorNumber}
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {donor.email || "-"}
//                     </td>
//                     <td className="px-6 py-4">
//                       {donor.hasPersonalInfo ? (
//                         <span className="inline-flex items-center gap-1 text-green-700 font-medium">
//                           <CheckCircle className="w-5 h-5" /> Info Added
//                         </span>
//                       ) : (
//                         <span className="text-orange-600 font-medium">
//                           Pending Info
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         {!donor.hasPersonalInfo ? (
//                           <>
//                             <button
//                               onClick={() =>
//                                 navigate("/nurse/Donor_List", {
//                                   state: {
//                                     showRegisterInfo: true,
//                                     donorId: donor._id,
//                                     donorName: getFullName(donor),
//                                   },
//                                 })
//                               }
//                               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                             >
//                               Add Info
//                             </button>
//                             {/* NEW BUTTON ADDED HERE for Pending Info */}
//                             <button
//                               onClick={() =>
//                                 navigate("/nurse/Donor_List", {
//                                   state: {
//                                     showUpdateInfo: true,
//                                     donorId: donor._id,
//                                   },
//                                 })
//                               }
//                               className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                             >
//                               Update
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() =>
//                                 navigate("/nurse/Donor_List", {
//                                   state: {
//                                     showRegisterDonation: true,
//                                     donorId: donor._id,
//                                   },
//                                 })
//                               }
//                               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
//                             >
//                               <HeartHandshake className="w-4 h-4" /> Donate
//                             </button>
//                             <button
//                               onClick={() =>
//                                 navigate("/nurse/Donor_List", {
//                                   state: {
//                                     showUpdateInfo: true,
//                                     donorId: donor._id,
//                                   },
//                                 })
//                               }
//                               className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                             >
//                               Update
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NurseListPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Users,
  Search,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";

const getFullName = (donor) => {
  if (!donor) return "Unknown Donor";
  if (donor.personalInfo) {
    const p = donor.personalInfo;
    return (
      `${p.title || ""} ${donor.name || ""} ${p.fatherName || ""} ${
        p.surname || ""
      }`
        .trim()
        .replace(/\s+/g, " ") || "Unnamed Donor"
    );
  }
  return donor.name || "Unnamed Donor";
};

const NurseListPage = () => {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("/api/nurses/get_doners", {
          withCredentials: true,
        });
        setDonors(res.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load donors");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const sortedAndFiltered = React.useMemo(() => {
    let list = [...donors];
    if (sortConfig.key) {
      list.sort((a, b) => {
        let aVal = a[sortConfig.key] ?? "";
        let bVal = b[sortConfig.key] ?? "";
        if (sortConfig.key.includes("At")) {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return list.filter(
      (d) =>
        getFullName(d).toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donors, sortConfig, searchTerm]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-red-600" />
        <span className="ml-4 text-xl">Loading donors...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Users className="text-red-700 w-10 h-10" />
          Donor List
        </h1>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-red-600"
                  onClick={() => requestSort("name")}
                >
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedAndFiltered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    {donors.length === 0
                      ? "No donors registered yet."
                      : "No donors match your search."}
                  </td>
                </tr>
              ) : (
                sortedAndFiltered.map((donor, i) => (
                  <tr key={donor._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {getFullName(donor)}
                      </div>
                      {donor.personalInfo?.donorNumber && (
                        <div className="text-xs text-gray-500">
                          #{donor.personalInfo.donorNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {donor.email || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {donor.hasPersonalInfo ? (
                        <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                          <CheckCircle className="w-5 h-5" /> Info Added
                        </span>
                      ) : (
                        <span className="text-orange-600 font-medium">
                          Pending Info
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {!donor.hasPersonalInfo ? (
                          <>
                            <button
                              onClick={() =>
                                navigate("/nurse/Donor_List", {
                                  state: {
                                    showRegisterInfo: true,
                                    donorId: donor._id,
                                    donorName: getFullName(donor),
                                  },
                                })
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                              Add Info
                            </button>
                            {/* NEW BUTTON: Update basic user info (name, phone, password) */}
                            <button
                              onClick={() =>
                                navigate("/nurse/Donor_List", {
                                  state: {
                                    showUpdateUser: true, // Use a new state key for basic user updates
                                    donorId: donor._id,
                                  },
                                })
                              }
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                              Update User
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                navigate("/nurse/Donor_List", {
                                  state: {
                                    showRegisterDonation: true,
                                    donorId: donor._id,
                                  },
                                })
                              }
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
                            >
                              <HeartHandshake className="w-4 h-4" /> Donate
                            </button>
                            {/* EXISTING BUTTON: Update detailed personal info */}
                            <button
                              onClick={() =>
                                navigate("/nurse/Donor_List", {
                                  state: {
                                    showUpdateInfo: true, // Existing state key for detailed info updates
                                    donorId: donor._id,
                                  },
                                })
                              }
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                              Update Info
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NurseListPage;
