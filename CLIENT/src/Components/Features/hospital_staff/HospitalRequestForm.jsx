// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// // 🚨 FIX APPLIED HERE: Changed "Toastify.css" to "ReactToastify.css"
// import "react-toastify/dist/ReactToastify.css";

// // Default export React component so it can be previewed/imported easily
// export default function HospitalRequestForm() {
//   const [form, setForm] = useState({
//     hospitalName: "",
//     requestDate: "",
//     bloodType: "O+",
//     quantityRequested: "",
//     remarks: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.hospitalName.trim()) return "Hospital name is required.";
//     if (!form.requestDate) return "Request date is required.";
//     if (!form.bloodType) return "Blood type is required.";
//     if (!form.quantityRequested || Number(form.quantityRequested) <= 0)
//       return "Quantity requested must be a number greater than 0.";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const err = validate();
//     if (err) {
//       toast.error(err);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         hospitalName: form.hospitalName.trim(),
//         requestDate: form.requestDate,
//         bloodType: form.bloodType,
//         quantityRequested: Number(form.quantityRequested),
//         remarks: form.remarks?.trim() || undefined,
//       };

//       const res = await axios.post(
//         "http://localhost:5000/api/hospital_staff/requests",
//         payload,
//         { withCredentials: true }
//       );

//       if (res?.data?.success) {
//         toast.success(res.data.message || "Request created successfully!");
//         // clear form
//         setForm({
//           hospitalName: "",
//           requestDate: "",
//           bloodType: "O+",
//           quantityRequested: "",
//           remarks: "",
//         });
//       } else {
//         toast.error(res?.data?.message || "Unexpected response from server.");
//       }
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Server error. Could not create hospital request.";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto lg:p-4">
//       <ToastContainer
//         position="top-right"
//         hideProgressBar={false}
//         newestOnTop
//         theme="dark"
//       />

//       {/* Primary Card Container: Darker background for depth, strong shadow, and theme-matching border */}
//       <div className="bg-gray-900 shadow-2xl rounded-2xl p-6 md:p-10 border border-red-900/50">
//         {/* Header Section */}
//         <div className="flex items-center mb-8 border-b border-red-900 pb-4">
//           <span className="p-2 bg-red-700 rounded-full mr-4 shadow-lg">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//             </svg>
//           </span>
//           <h2 className="text-3xl font-extrabold text-red-500 tracking-wide">
//             EMERGENCY BLOOD REQUEST
//           </h2>
//         </div>

//         {/* Form Fields */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Hospital Name Input */}
//           <div>
//             <label className="block text-sm font-medium text-red-300 mb-1">
//               Hospital Name<span className="text-red-500"> *</span>
//             </label>
//             <input
//               name="hospitalName"
//               value={form.hospitalName}
//               onChange={handleChange}
//               type="text"
//               placeholder="Debre Berhan General Hospital"
//               className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out shadow-inner"
//             />
//           </div>

//           {/* Date and Blood Type Group */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-red-300 mb-1">
//                 Request Date<span className="text-red-500"> *</span>
//               </label>
//               <input
//                 name="requestDate"
//                 value={form.requestDate}
//                 onChange={handleChange}
//                 type="date"
//                 className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out shadow-inner"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-red-300 mb-1">
//                 Blood Type<span className="text-red-500"> *</span>
//               </label>
//               <select
//                 name="bloodType"
//                 value={form.bloodType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out shadow-inner appearance-none pr-8"
//               >
//                 {bloodTypes.map((bt) => (
//                   <option key={bt} value={bt}>
//                     {bt}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Quantity Requested Input */}
//           <div>
//             <label className="block text-sm font-medium text-red-300 mb-1">
//               Quantity Requested (Units)<span className="text-red-500"> *</span>
//             </label>
//             <input
//               name="quantityRequested"
//               value={form.quantityRequested}
//               onChange={handleChange}
//               type="number"
//               min="1"
//               placeholder="e.g. 10"
//               className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out shadow-inner"
//             />
//           </div>

//           {/* Remarks Textarea */}
//           <div>
//             <label className="block text-sm font-medium text-red-300 mb-1">
//               Remarks (Reason for Request)
//             </label>
//             <textarea
//               name="remarks"
//               value={form.remarks}
//               onChange={handleChange}
//               rows={4}
//               placeholder="Optional notes (e.g. urgent surgery, specific patient ID, contact person)"
//               className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-150 ease-in-out shadow-inner"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-end pt-8">
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-extrabold text-lg px-8 py-3 rounded-xl shadow-red-700/50 shadow-2xl transition-all duration-300 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {loading ? (
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//               ) : (
//                 <span>Send Urgent Request</span>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// src/components/HospitalRequestForm.jsx or wherever you use it

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Hospital,
  Calendar,
  Droplet,
  Hash,
  FileText,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function HospitalRequestForm() {
  const [form, setForm] = useState({
    hospitalName: "",
    requestDate: "",
    bloodType: "O+",
    quantityRequested: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.hospitalName.trim()) return "Hospital name is required";
    if (!form.requestDate) return "Request date is required";
    if (!form.quantityRequested || Number(form.quantityRequested) <= 0)
      return "Please enter a valid quantity";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        hospitalName: form.hospitalName.trim(),
        requestDate: form.requestDate,
        bloodType: form.bloodType,
        quantityRequested: Number(form.quantityRequested),
        remarks: form.remarks.trim() || undefined,
      };

      const res = await axios.post(
        "/api/hospital_staff/requests", // Use relative path (Vite proxy handles it)
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Blood request sent successfully!");
        setForm({
          hospitalName: "",
          requestDate: "",
          bloodType: "O+",
          quantityRequested: "",
          remarks: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="dark" autoClose={4000} />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-600 rounded-full shadow-2xl animate-pulse">
                <Droplet className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 tracking-tight">
              EMERGENCY BLOOD REQUEST
            </h1>
            <p className="mt-3 text-lg text-red-200">
              Submit urgent blood requirement from your hospital
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-gray-900/95 backdrop-blur-xl border border-red-800/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-800/50 to-red-900/30 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hospital Name */}
                <div className="relative">
                  <label className="flex items-center gap-3 text-red-300 font-semibold text-lg mb-3">
                    <Hospital className="w-6 h-6" />
                    Hospital Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={form.hospitalName}
                    onChange={handleChange}
                    placeholder="e.g. Tikur Anbessa Hospital"
                    className="w-full px-5 py-4 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  />
                  <Hospital className="absolute left-4 top-14 w-6 h-6 text-red-500" />
                </div>

                {/* Date & Blood Type - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Request Date */}
                  <div className="relative">
                    <label className="flex items-center gap-3 text-red-300 font-semibold text-lg mb-3">
                      <Calendar className="w-6 h-6" />
                      Required By Date
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="requestDate"
                      value={form.requestDate}
                      onChange={handleChange}
                      className="w-full px-5 py-4 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      required
                    />
                    <Calendar className="absolute left-4 top-14 w-6 h-6 text-red-500" />
                  </div>

                  {/* Blood Type */}
                  <div className="relative">
                    <label className="flex items-center gap-3 text-red-300 font-semibold text-lg mb-3">
                      <Droplet className="w-6 h-6" />
                      Blood Type
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="bloodType"
                      value={form.bloodType}
                      onChange={handleChange}
                      className="w-full px-5 py-4 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition appearance-none"
                    >
                      {bloodTypes.map((bt) => (
                        <option key={bt} value={bt}>
                          {bt}
                        </option>
                      ))}
                    </select>
                    <Droplet className="absolute left-4 top-14 w-6 h-6 text-red-500" />
                  </div>
                </div>

                {/* Quantity */}
                <div className="relative">
                  <label className="flex items-center gap-3 text-red-300 font-semibold text-lg mb-3">
                    <Hash className="w-6 h-6" />
                    Quantity Requested (Units)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantityRequested"
                    value={form.quantityRequested}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 5"
                    className="w-full px-5 py-4 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    required
                  />
                  <Hash className="absolute left-4 top-14 w-6 h-6 text-red-500" />
                </div>

                {/* Remarks */}
                <div className="relative">
                  <label className="flex items-center gap-3 text-red-300 font-semibold text-lg mb-3">
                    <FileText className="w-6 h-6" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Patient condition, urgency level, contact person..."
                    className="w-full px-5 py-4 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                  />
                  <FileText className="absolute left-4 top-14 w-6 h-6 text-red-500" />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto mx-auto flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xl rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Emergency Request
                      </>
                    )}
                  </button>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-red-300 flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    This request will be processed immediately by the blood bank
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
