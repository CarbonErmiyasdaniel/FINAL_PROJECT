// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { format } from "date-fns";
// import {
//   TestTube,
//   Droplet,
//   Calendar,
//   HeartPulse,
//   FileText,
//   AlertTriangle,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   Save,
// } from "lucide-react";
// import { toast } from "react-toastify";

// const PendingTestsPage = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submittingId, setSubmittingId] = useState(null);
//   const [selectedDonation, setSelectedDonation] = useState(null);

//   const fetchDonations = async () => {
//     try {
//       setLoading(true);

//       const [pendingRes, testedRes] = await Promise.all([
//         axios
//           .get("/api/lab_technician/donations/pending")
//           .catch(() => ({ data: { data: [] } })),
//         axios
//           .get("/api/lab_technician/donations/tested")
//           .catch(() => ({ data: { data: [] } })),
//       ]);

//       // Safely extract data — works whether backend returns { data: [...] } or direct array
//       const pendingData = Array.isArray(pendingRes.data)
//         ? pendingRes.data
//         : pendingRes.data?.data || pendingRes.data?.donations || [];

//       const testedData = Array.isArray(testedRes.data)
//         ? testedRes.data
//         : testedRes.data?.data || testedRes.data?.donations || [];

//       const allDonations = [...pendingData, ...testedData].map((d) => ({
//         id: d._id || d.id,
//         donationId: `DON-${(d._id || d.id).toString().slice(-6).toUpperCase()}`,
//         dateOfDonation: format(
//           new Date(d.dateOfDonation),
//           "dd MMM yyyy, HH:mm"
//         ),
//         bloodType: d.aboRh || "Unknown",
//         typeOfDonation: d.typeOfDonation || "Whole Blood",
//         quantity: d.quantity || 450,
//         bloodPressure: d.bloodPressure || "Not recorded",
//         hemoglobinLevel: d.hemoglobinLevel
//           ? `${d.hemoglobinLevel} g/dL`
//           : "Not recorded",
//         notes: d.notes || "No notes",
//         isDeferred: d.isDeferred || false,
//         deferralReason: d.deferralReason || null,
//         isTested: d.isTested || false,
//         finalResult: d.finalResult || "Pending",
//         testedAt: d.testedAt
//           ? format(new Date(d.testedAt), "dd MMM yyyy, HH:mm")
//           : null,
//         screeningTests: {
//           hiv: d.screeningTests?.hiv || null,
//           hepatitisB: d.screeningTests?.hepatitisB || null,
//           hepatitisC: d.screeningTests?.hepatitisC || null,
//           syphilis: d.screeningTests?.syphilis || null,
//         },
//       }));

//       // Sort: pending first
//       allDonations.sort((a, b) =>
//         a.isTested === b.isTested ? 0 : a.isTested ? 1 : -1
//       );
//       setDonations(allDonations);
//     } catch (err) {
//       console.error("Fetch donations error:", err);
//       toast.error(
//         "Failed to load donations. Check your connection or backend."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDonations();
//     const interval = setInterval(fetchDonations, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const openTestModal = (donation) => {
//     setSelectedDonation({
//       ...donation,
//       screeningTests: {
//         hiv: donation.screeningTests.hiv || "Negative",
//         hepatitisB: donation.screeningTests.hepatitisB || "Negative",
//         hepatitisC: donation.screeningTests.hepatitisC || "Negative",
//         syphilis: donation.screeningTests.syphilis || "Negative",
//       },
//     });
//   };

//   const handleSubmitTest = async () => {
//     if (!selectedDonation) return;

//     setSubmittingId(selectedDonation.id);

//     try {
//       const response = await axios.post(
//         `/api/lab_technician/donations/${selectedDonation.id}/test`,
//         {
//           screeningTests: selectedDonation.screeningTests,
//         }
//       );

//       const updatedDonation = response.data?.donation || response.data;

//       toast.success(
//         `Test submitted → ${updatedDonation.finalResult || "Done"}`
//       );

//       setDonations((prev) =>
//         prev.map((d) =>
//           d.id === selectedDonation.id
//             ? {
//                 ...d,
//                 isTested: true,
//                 finalResult: updatedDonation.finalResult || "Safe",
//                 testedAt: format(new Date(), "dd MMM yyyy, HH:mm"),
//                 screeningTests:
//                   updatedDonation.screeningTests ||
//                   selectedDonation.screeningTests,
//               }
//             : d
//         )
//       );

//       setSelectedDonation(null);
//     } catch (err) {
//       console.error("Submit error:", err);
//       toast.error(
//         err.response?.data?.message || err.message || "Failed to submit test"
//       );
//     } finally {
//       setSubmittingId(null);
//     }
//   };

//   const pendingCount = donations.filter((d) => !d.isTested).length;

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96">
//         <Loader2 className="w-16 h-16 animate-spin text-red-600 mb-4" />
//         <p className="text-xl text-gray-600">
//           Loading blood units for testing...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 p-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-4xl font-black text-gray-900 dark:text-white">
//             Blood Screening Lab
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
//             Review collection details and perform infectious disease screening
//           </p>
//         </div>
//         <div className="text-right">
//           <div className="text-6xl font-black text-red-600">{pendingCount}</div>
//           <p className="text-lg font-medium text-gray-500">Pending Tests</p>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="space-y-6">
//         {donations.length === 0 ? (
//           <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl">
//             <TestTube className="w-24 h-24 text-gray-400 mx-auto mb-4" />
//             <p className="text-xl text-gray-500">
//               No blood units available for testing
//             </p>
//           </div>
//         ) : (
//           donations.map((donation) => (
//             <div
//               key={donation.id}
//               className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-l-8 transition-all hover:shadow-2xl ${
//                 donation.isTested
//                   ? donation.finalResult === "Safe"
//                     ? "border-green-500"
//                     : "border-red-600"
//                   : "border-yellow-500"
//               }`}
//             >
//               <div className="flex justify-between items-start mb-6">
//                 <div className="flex items-center gap-5">
//                   <h2 className="text-4xl font-black text-gray-800 dark:text-white">
//                     {donation.donationId}
//                   </h2>
//                   {!donation.isTested ? (
//                     <span className="px-5 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold flex items-center gap-2">
//                       <Clock className="w-5 h-5" />
//                       Awaiting Test
//                     </span>
//                   ) : (
//                     <span
//                       className={`px-6 py-3 rounded-full font-bold text-lg flex items-center gap-3 ${
//                         donation.finalResult === "Safe"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {donation.finalResult === "Safe" ? (
//                         <CheckCircle className="w-6 h-6" />
//                       ) : (
//                         <XCircle className="w-6 h-6" />
//                       )}
//                       {donation.finalResult}
//                     </span>
//                   )}
//                 </div>

//                 {!donation.isTested && (
//                   <button
//                     onClick={() => openTestModal(donation)}
//                     className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-3 text-lg transition"
//                   >
//                     <TestTube className="w-6 h-6" />
//                     Start Screening
//                   </button>
//                 )}
//               </div>

//               {/* Collection Details */}
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-lg">
//                 <div>
//                   <p className="text-gray-500 flex items-center gap-2">
//                     <Calendar className="w-5 h-5" /> Collected
//                   </p>
//                   <p className="font-bold">{donation.dateOfDonation}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Blood Type</p>
//                   <p className="font-black text-2xl text-red-600">
//                     {donation.bloodType}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 flex items-center gap-2">
//                     <Droplet className="w-5 h-5" /> Volume
//                   </p>
//                   <p className="font-bold">{donation.quantity} mL</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Type</p>
//                   <p className="font-bold">{donation.typeOfDonation}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 flex items-center gap-2">
//                     <HeartPulse className="w-5 h-5" /> BP
//                   </p>
//                   <p className="font-bold">{donation.bloodPressure}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Hemoglobin</p>
//                   <p className="font-bold">{donation.hemoglobinLevel}</p>
//                 </div>
//                 {donation.isDeferred && (
//                   <div className="col-span-full">
//                     <p className="text-orange-600 flex items-center gap-2">
//                       <AlertTriangle className="w-5 h-5" /> Deferred:{" "}
//                       {donation.deferralReason}
//                     </p>
//                   </div>
//                 )}
//                 {donation.notes !== "No notes" && (
//                   <div className="col-span-full mt-4">
//                     <p className="text-gray-500 flex items-center gap-2">
//                       <FileText className="w-5 h-5" /> Nurse Notes
//                     </p>
//                     <p className="italic bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                       {donation.notes}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Test Results */}
//               {donation.isTested && (
//                 <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
//                   <h3 className="text-xl font-bold mb-4">Screening Results</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {["HIV", "Hepatitis B", "Hepatitis C", "Syphilis"].map(
//                       (test) => {
//                         const key = test.toLowerCase().replace(" ", "");
//                         const value =
//                           donation.screeningTests[
//                             key
//                               .replace("hepatitisb", "hepatitisB")
//                               .replace("hepatitisc", "hepatitisC")
//                           ] || "—";
//                         return (
//                           <div
//                             key={test}
//                             className={`p-4 rounded-xl text-center font-bold text-lg ${
//                               value === "Negative"
//                                 ? "bg-green-100 text-green-800"
//                                 : value === "Positive"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-orange-100 text-orange-800"
//                             }`}
//                           >
//                             {test}
//                             <div className="text-2xl mt-2">{value}</div>
//                           </div>
//                         );
//                       }
//                     )}
//                   </div>
//                   {donation.testedAt && (
//                     <p className="text-sm text-gray-500 text-right mt-4">
//                       Tested: {donation.testedAt}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal */}
//       {selectedDonation && !selectedDonation.isTested && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full p-10 max-h-screen overflow-y-auto">
//             <h2 className="text-4xl font-black text-center mb-8">
//               Infectious Disease Screening
//               <div className="text-6xl text-red-600 mt-4">
//                 {selectedDonation.donationId}
//               </div>
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {[
//                 { key: "hiv", label: "HIV" },
//                 { key: "hepatitisB", label: "Hepatitis B" },
//                 { key: "hepatitisC", label: "Hepatitis C" },
//                 { key: "syphilis", label: "Syphilis" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <label className="text-2xl font-bold block mb-4">
//                     {label}
//                   </label>
//                   <select
//                     value={selectedDonation.screeningTests[key]}
//                     onChange={(e) =>
//                       setSelectedDonation((prev) => ({
//                         ...prev,
//                         screeningTests: {
//                           ...prev.screeningTests,
//                           [key]: e.target.value,
//                         },
//                       }))
//                     }
//                     className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:outline-none transition"
//                   >
//                     <option value="Negative">Negative</option>
//                     <option value="Positive">Positive</option>
//                     <option value="Inconclusive">Inconclusive</option>
//                   </select>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-center gap-8 mt-12">
//               <button
//                 onClick={() => setSelectedDonation(null)}
//                 className="px-10 py-5 border-2 border-gray-400 rounded-2xl text-xl font-bold hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitTest}
//                 disabled={!!submittingId}
//                 className="px-12 py-6 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-black text-2xl rounded-2xl flex items-center gap-4 shadow-2xl transition"
//               >
//                 {submittingId ? (
//                   <>
//                     <Loader2 className="animate-spin w-8 h-8" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-8 h-8" />
//                     Submit Results
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingTestsPage;
// Features/lab_technician/PendingTestsPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  TestTube,
  Droplet,
  Calendar,
  HeartPulse,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  Edit3,
} from "lucide-react";
import { toast } from "react-toastify";

const PendingTestsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // For editing blood type
  const [editingBloodType, setEditingBloodType] = useState(false);
  const [tempBloodType, setTempBloodType] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const fetchDonations = async () => {
    try {
      setLoading(true);

      const [pendingRes, testedRes] = await Promise.all([
        axios
          .get("/api/lab_technician/donations/pending")
          .catch(() => ({ data: { data: [] } })),
        axios
          .get("/api/lab_technician/donations/tested")
          .catch(() => ({ data: { data: [] } })),
      ]);

      const pendingData = pendingRes.data?.data || [];
      const testedData = testedRes.data?.data || [];

      const allDonations = [...pendingData, ...testedData].map((d) => ({
        id: d._id,
        donationId: `DON-${d._id.toString().slice(-6).toUpperCase()}`,
        dateOfDonation: format(
          new Date(d.dateOfDonation),
          "dd MMM yyyy, HH:mm"
        ),
        bloodType: d.aboRh || "Unknown",
        typeOfDonation: d.typeOfDonation || "Whole Blood",
        quantity: d.quantity || 450,
        bloodPressure: d.bloodPressure || "Not recorded",
        hemoglobinLevel: d.hemoglobinLevel
          ? `${d.hemoglobinLevel} g/dL`
          : "Not recorded",
        notes: d.notes || "No notes",
        isDeferred: d.isDeferred || false,
        deferralReason: d.deferralReason || null,
        isTested: d.isTested || false,
        finalResult: d.finalResult || "Pending",
        testedAt: d.testedAt
          ? format(new Date(d.testedAt), "dd MMM yyyy, HH:mm")
          : null,
        screeningTests: {
          hiv: d.screeningTests?.hiv || null,
          hepatitisB: d.screeningTests?.hepatitisB || null,
          hepatitisC: d.screeningTests?.hepatitisC || null,
          syphilis: d.screeningTests?.syphilis || null,
        },
      }));

      allDonations.sort((a, b) =>
        a.isTested === b.isTested ? 0 : a.isTested ? 1 : -1
      );
      setDonations(allDonations);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load blood units");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    const interval = setInterval(fetchDonations, 30000);
    return () => clearInterval(interval);
  }, []);

  const openTestModal = (donation) => {
    setSelectedDonation({
      ...donation,
      screeningTests: {
        hiv: donation.screeningTests.hiv || "Negative",
        hepatitisB: donation.screeningTests.hepatitisB || "Negative",
        hepatitisC: donation.screeningTests.hepatitisC || "Negative",
        syphilis: donation.screeningTests.syphilis || "Negative",
      },
    });
    setTempBloodType(donation.bloodType);
    setEditingBloodType(false);
  };

  const saveBloodType = async () => {
    if (!tempBloodType || tempBloodType === "Unknown") {
      toast.error("Please select a valid blood type");
      return;
    }

    try {
      await axios.patch(
        `/api/lab_technician/donations/${selectedDonation.id}/bloodtype`,
        { aboRh: tempBloodType },
        { withCredentials: true }
      );

      toast.success("Blood type updated successfully!");
      setSelectedDonation((prev) => ({ ...prev, bloodType: tempBloodType }));
      setEditingBloodType(false);
      fetchDonations(); // Refresh list
    } catch (err) {
      toast.error("Failed to update blood type");
      console.error(err);
    }
  };

  const handleSubmitTest = async () => {
    if (!selectedDonation) return;

    if (selectedDonation.bloodType === "Unknown") {
      toast.error("Please fix the blood type before submitting results");
      return;
    }

    setSubmittingId(selectedDonation.id);

    try {
      const res = await axios.post(
        `/api/lab_technician/donations/${selectedDonation.id}/test`,
        { screeningTests: selectedDonation.screeningTests },
        { withCredentials: true }
      );

      toast.success(`Test completed → ${res.data.finalResult}`);

      setDonations((prev) =>
        prev.map((d) =>
          d.id === selectedDonation.id
            ? {
                ...d,
                isTested: true,
                finalResult: res.data.finalResult,
                testedAt: format(new Date(), "dd MMM yyyy, HH:mm"),
                screeningTests:
                  res.data.donation?.screeningTests || d.screeningTests,
              }
            : d
        )
      );

      setSelectedDonation(null);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Submit failed");
    } finally {
      setSubmittingId(null);
    }
  };

  const pendingCount = donations.filter((d) => !d.isTested).length;

  0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-16 h-16 animate-spin text-red-600 mb-4" />
        <p className="text-xl text-gray-600">Loading blood units...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Blood Screening Lab
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Perform infectious disease testing and manage blood inventory
          </p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-black text-red-600">{pendingCount}</div>
          <p className="text-lg font-medium text-gray-500">Pending Tests</p>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="space-y-6">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-l-8 transition-all hover:shadow-2xl ${
              donation.isTested
                ? donation.finalResult === "Safe"
                  ? "border-green-500"
                  : "border-red-600"
                : "border-yellow-500"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-5">
                <h2 className="text-4xl font-black text-gray-800 dark:text-white">
                  {donation.donationId}
                </h2>
                {!donation.isTested ? (
                  <span className="px-5 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Awaiting Test
                  </span>
                ) : (
                  <span
                    className={`px-6 py-3 rounded-full font-bold text-lg flex items-center gap-3 ${
                      donation.finalResult === "Safe"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donation.finalResult === "Safe" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                    {donation.finalResult}
                  </span>
                )}
              </div>

              {!donation.isTested && (
                <button
                  onClick={() => openTestModal(donation)}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-3 text-lg transition"
                >
                  <TestTube className="w-6 h-6" />
                  Start Screening
                </button>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-lg">
              <div>
                <p className="text-gray-500 flex items-center gap-2">
                  <Calendar className="w-5 h-5 inline" /> Collected
                </p>
                <p className="font-bold">{donation.dateOfDonation}</p>
              </div>
              <div>
                <p className="text-gray-500">Blood Type</p>
                <p
                  className={`font-black text-2xl ${
                    donation.bloodType === "Unknown"
                      ? "text-red-600"
                      : "text-red-600"
                  }`}
                >
                  {donation.bloodType}
                </p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center gap-2">
                  <Droplet className="w-5 h-5" /> Volume
                </p>
                <p className="font-bold">{donation.quantity} mL</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-bold">{donation.typeOfDonation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL WITH BLOOD TYPE EDIT */}
      {selectedDonation && !selectedDonation.isTested && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto p-10">
            <h2 className="text-4xl font-black text-center mb-8">
              Infectious Disease Screening
              <div className="text-6xl text-red-600 mt-4">
                {selectedDonation.donationId}
              </div>
            </h2>

            {/* Blood Type Editor */}
            <div className="mb-10 p-6 bg-orange-50 dark:bg-orange-900/30 rounded-2xl border-2 border-orange-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-3">
                    Blood Type
                  </p>
                  {editingBloodType ? (
                    <select
                      value={tempBloodType}
                      onChange={(e) => setTempBloodType(e.target.value)}
                      className="px-6 py-4 text-2xl font-bold border-4 border-orange-500 rounded-xl focus:outline-none focus:border-red-600"
                    >
                      <option value="">Select Blood Type</option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-5xl font-black">
                      {selectedDonation.bloodType === "Unknown" ? (
                        <span className="text-red-600 animate-pulse">
                          UNKNOWN – MUST FIX!
                        </span>
                      ) : (
                        selectedDonation.bloodType
                      )}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  {editingBloodType ? (
                    <>
                      <button
                        onClick={saveBloodType}
                        className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-3 text-lg"
                      >
                        <Save className="w-6 h-6" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingBloodType(false);
                          setTempBloodType(selectedDonation.bloodType);
                        }}
                        className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingBloodType(true)}
                      className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl flex items-center gap-3 text-lg"
                    >
                      <Edit3 className="w-6 h-6" />
                      Edit Blood Type
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Test Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {[
                { key: "hiv", label: "HIV" },
                { key: "hepatitisB", label: "Hepatitis B" },
                { key: "hepatitisC", label: "Hepatitis C" },
                { key: "syphilis", label: "Syphilis" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-2xl font-bold block mb-4">
                    {label}
                  </label>
                  <select
                    value={selectedDonation.screeningTests[key]}
                    onChange={(e) =>
                      setSelectedDonation((prev) => ({
                        ...prev,
                        screeningTests: {
                          ...prev.screeningTests,
                          [key]: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:outline-none"
                  >
                    <option>Negative</option>
                    <option>Positive</option>
                    <option>Inconclusive</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-12 py-5 border-2 border-gray-400 rounded-2xl text-xl font-bold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                disabled={
                  submittingId || selectedDonation.bloodType === "Unknown"
                }
                className="px-16 py-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black text-2xl rounded-2xl flex items-center gap-4 shadow-2xl transition"
              >
                {submittingId ? (
                  <>
                    <Loader2 className="animate-spin w-8 h-8" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-8 h-8" />
                    Submit Results
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTestsPage;
