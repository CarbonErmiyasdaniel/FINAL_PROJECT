// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   UserPlus,
//   Loader2,
//   Calendar,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import "react-toastify/dist/ReactToastify.css";

// const inputStyle =
//   "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-500/30 transition duration-200";

// const bloodTypes = [
//   "A+",
//   "A-",
//   "B+",
//   "B-",
//   "AB+",
//   "AB-",
//   "O+",
//   "O-",
//   "Unknown",
// ];
// const donationTypes = [
//   "Whole Blood",
//   "Plasma",
//   "Platelets",
//   "Double Red Cells",
// ];

// const RegisterDonation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const donorId = location.state?.donorId;

//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     dateOfDonation: new Date().toISOString().split("T")[0],
//     bloodPressure: "",
//     hemoglobinLevel: "",
//     aboRh: "Unknown",
//     typeOfDonation: "Whole Blood",
//     quantity: 450,
//     isDeferred: false,
//     deferralReason: "",
//     notes: "",
//   });

//   useEffect(() => {
//     if (!donorId) {
//       toast.error("Invalid Donor ID. Redirecting...");
//       setTimeout(() => navigate("/nurse/Donor_List"), 2000);
//     }
//   }, [donorId, navigate]);

//   if (!donorId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="text-center">
//           <Loader2 className="animate-spin h-16 w-16 text-red-600 mx-auto mb-6" />
//           <p className="text-2xl font-bold text-gray-800">Invalid Donor ID</p>
//           <p className="text-lg text-gray-600 mt-2">
//             Redirecting to donor list...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.dateOfDonation) {
//       toast.error("Please select a donation date");
//       return false;
//     }
//     if (formData.isDeferred && !formData.deferralReason.trim()) {
//       toast.error("Please provide a reason for deferral");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       await axios.post(`/api/nurses/registerDonation/${donorId}`, formData, {
//         withCredentials: true,
//       });
//       toast.success("Donation registered successfully!");
//       setTimeout(() => navigate("/nurse/Donor_List"), 2000);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to register donation"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-5 bg-white rounded-full px-10 py-6 shadow-2xl border-4 border-red-700">
//               <UserPlus className="w-14 h-14 text-red-700" />
//               <h1 className="text-5xl font-extrabold text-gray-900">
//                 Register Blood Donation
//               </h1>
//             </div>
//             <p className="mt-6 text-2xl text-gray-800">
//               Donor ID:{" "}
//               <span className="font-mono bg-red-100 text-red-800 px-6 py-3 rounded-2xl text-xl font-bold">
//                 {donorId}
//               </span>
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl shadow-3xl border-t-8 border-red-700 overflow-hidden">
//             <form onSubmit={handleSubmit} className="p-10 space-y-10">
//               <div>
//                 <label className="flex text-lg font-bold text-gray-800 mb-3 items-center gap-3">
//                   <Calendar className="w-6 h-6 text-red-600" />
//                   Date of Donation <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfDonation"
//                   value={formData.dateOfDonation}
//                   onChange={handleChange}
//                   required
//                   max={new Date().toISOString().split("T")[0]}
//                   className={inputStyle}
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-10">
//                 <div>
//                   <label className="block text-lg font-bold text-gray-800 mb-3">
//                     Blood Pressure
//                   </label>
//                   <input
//                     type="text"
//                     name="bloodPressure"
//                     value={formData.bloodPressure}
//                     onChange={handleChange}
//                     placeholder="120/80"
//                     className={inputStyle}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-lg font-bold text-gray-800 mb-3">
//                     Hemoglobin (g/dL)
//                   </label>
//                   <input
//                     type="number"
//                     name="hemoglobinLevel"
//                     value={formData.hemoglobinLevel}
//                     onChange={handleChange}
//                     step="0.1"
//                     placeholder="13.5"
//                     className={inputStyle}
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-10">
//                 <div>
//                   <label className="block text-lg font-bold text-gray-800 mb-3">
//                     Blood Type
//                   </label>
//                   <select
//                     name="aboRh"
//                     value={formData.aboRh}
//                     onChange={handleChange}
//                     className={inputStyle}
//                   >
//                     {bloodTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-bold text-gray-800 mb-3">
//                     Donation Type
//                   </label>
//                   <select
//                     name="typeOfDonation"
//                     value={formData.typeOfDonation}
//                     onChange={handleChange}
//                     className={inputStyle}
//                   >
//                     {donationTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-lg font-bold text-gray-800 mb-3">
//                   Quantity (ml)
//                 </label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   min="1"
//                   className={inputStyle}
//                 />
//               </div>

//               <div className="p-8 bg-red-50 border-4 border-red-300 rounded-3xl">
//                 <label className="flex items-center gap-5 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isDeferred"
//                     checked={formData.isDeferred}
//                     onChange={handleChange}
//                     className="w-7 h-7 text-red-700 rounded"
//                   />
//                   <span className="text-2xl font-bold text-red-800">
//                     Mark as Deferred
//                   </span>
//                 </label>
//                 {formData.isDeferred && (
//                   <div className="mt-6">
//                     <label className="block text-lg font-bold text-gray-800 mb-3">
//                       Deferral Reason *
//                     </label>
//                     <input
//                       type="text"
//                       name="deferralReason"
//                       value={formData.deferralReason}
//                       onChange={handleChange}
//                       placeholder="e.g., Low hemoglobin"
//                       className={`${inputStyle} border-red-500`}
//                       required
//                     />
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-lg font-bold text-gray-800 mb-3">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows="5"
//                   className={inputStyle}
//                 />
//               </div>

//               <div className="pt-10 border-t-4 border-gray-300">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full py-6 px-10 text-white font-extrabold text-3xl rounded-3xl shadow-2xl flex items-center justify-center gap-5 transition-all ${
//                     isLoading ? "bg-gray-500" : "bg-red-700 hover:bg-red-800"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="animate-spin h-12 w-12" />
//                       Registering...
//                     </>
//                   ) : (
//                     <>
//                       <UserPlus className="h-12 w-12" />
//                       Register Donation
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={8000} theme="light" />
//     </>
//   );
// };

// export default RegisterDonation;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Loader2,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

// Updated input style for better focus feedback
const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-500/30 transition duration-200";

const bloodTypes = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];
const donationTypes = [
  "Whole Blood",
  "Plasma",
  "Platelets",
  "Double Red Cells",
];

const RegisterDonation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const donorId = location.state?.donorId;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfDonation: new Date().toISOString().split("T")[0],
    bloodPressure: "",
    hemoglobinLevel: "",
    aboRh: "Unknown",
    typeOfDonation: "Whole Blood",
    quantity: 450, // Default quantity for Whole Blood
    isDeferred: false,
    deferralReason: "",
    notes: "",
  });

  // --- Start of Rule-Based Logic (Minor additions to useEffect/handleChange) ---

  // Effect to automatically update quantity based on donation type
  useEffect(() => {
    let newQuantity = formData.quantity;
    if (formData.typeOfDonation === "Whole Blood") {
      newQuantity = 450; // Standard Whole Blood donation size (fixed)
    } else if (formData.typeOfDonation === "Plasma") {
      newQuantity = 600; // Example: Plasma apheresis typically higher volume
    } else {
      newQuantity = 500; // Default for others (can be adjusted)
    }
    // Only update if the quantity actually changes to avoid unnecessary re-renders
    if (formData.quantity !== newQuantity) {
      setFormData((prev) => ({ ...prev, quantity: newQuantity }));
    }
  }, [formData.typeOfDonation]); // Dependency on typeOfDonation only

  useEffect(() => {
    if (!donorId) {
      toast.error("Invalid Donor ID. Redirecting...");
      setTimeout(() => navigate("/nurse/Donor_List"), 2000);
    }
  }, [donorId, navigate]);

  if (!donorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-16 w-16 text-red-600 mx-auto mb-6" />
          <p className="text-2xl font-bold text-gray-800">Invalid Donor ID</p>
          <p className="text-lg text-gray-600 mt-2">
            Redirecting to donor list...
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // RULE: If unchecking deferred, clear the reason
    if (name === "isDeferred" && !checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
        deferralReason: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    if (!formData.dateOfDonation) {
      toast.error("Please select a donation date");
      return false;
    }
    if (formData.isDeferred && !formData.deferralReason.trim()) {
      toast.error("Please provide a reason for deferral");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post(`/api/nurses/registerDonation/${donorId}`, formData, {
        withCredentials: true,
      });
      toast.success("Donation registered successfully!");
      setTimeout(() => navigate("/nurse/Donor_List"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register donation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check if quantity is fixed (e.g., for Whole Blood)
  const isQuantityFixed = formData.typeOfDonation === "Whole Blood";
  // The nurse can only register if NOT deferred OR if deferred but a reason is provided.
  const isSubmitDisabled =
    isLoading || (formData.isDeferred && !formData.deferralReason.trim());

  // --- End of Rule-Based Logic ---

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-5 bg-white rounded-full px-10 py-6 shadow-2xl border-4 border-red-700">
              <UserPlus className="w-14 h-14 text-red-700" />
              <h1 className="text-5xl font-extrabold text-gray-900">
                Register Blood Donation
              </h1>
            </div>
            <p className="mt-6 text-2xl text-gray-800">
              Donor ID:{" "}
              <span className="font-mono bg-red-100 text-red-800 px-6 py-3 rounded-2xl text-xl font-bold">
                {donorId}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-3xl border-t-8 border-red-700 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              {/* 1. Date of Donation */}
              <div>
                <label className="flex text-lg font-bold text-gray-800 mb-3 items-center gap-3">
                  <Calendar className="w-6 h-6 text-red-600" />
                  Date of Donation{" "}
                  <span className="text-red-600 font-extrabold text-2xl">
                    *
                  </span>
                </label>
                <input
                  type="date"
                  name="dateOfDonation"
                  value={formData.dateOfDonation}
                  onChange={handleChange}
                  required // HTML validation rule
                  max={new Date().toISOString().split("T")[0]} // Prevents future dates
                  className={inputStyle}
                />
              </div>

              {/* 2. Medical Readings */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Blood Pressure */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Blood Pressure{" "}
                    <span className="text-gray-500 font-normal text-sm">
                      (e.g., 120/80)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    placeholder="120/80"
                    // HTML Pattern Rule: enforces format (Sys/Dia)
                    pattern="\d{2,3}/\d{2,3}"
                    title="Format: Systolic/Diastolic (e.g., 120/80)"
                    className={inputStyle}
                  />
                </div>
                {/* Hemoglobin Level */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Hemoglobin (g/dL){" "}
                    <span className="text-gray-500 font-normal text-sm">
                      (Min 12.5)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="hemoglobinLevel"
                    value={formData.hemoglobinLevel}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="13.5"
                    min="5" // Low medical bound
                    max="20" // High medical bound
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* 3. Blood and Donation Type */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Blood Type */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Blood Type
                  </label>
                  <select
                    name="aboRh"
                    value={formData.aboRh}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Donation Type */}
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Donation Type
                  </label>
                  <select
                    name="typeOfDonation"
                    value={formData.typeOfDonation}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    {donationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Quantity */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  Quantity (ml)
                  {isQuantityFixed && (
                    <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      (Fixed for Whole Blood)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  max="1000" // Set a realistic max limit
                  disabled={isQuantityFixed} // UI Rule: Disable if fixed quantity
                  className={`${inputStyle} ${
                    isQuantityFixed
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>

              {/* 5. Deferral Section (Enhanced Visuals) */}
              <div
                className={`p-8 border-4 rounded-3xl ${
                  formData.isDeferred
                    ? "bg-red-100 border-red-500 shadow-xl"
                    : "bg-green-50 border-green-300"
                }`}
              >
                <label className="flex items-center gap-5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDeferred"
                    checked={formData.isDeferred}
                    onChange={handleChange}
                    // Tailwind checkbox styling
                    className={`w-7 h-7 rounded appearance-none border-4 transition duration-200 checked:bg-current checked:border-transparent focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                      formData.isDeferred
                        ? "border-red-600 bg-red-700 text-white focus:ring-red-500"
                        : "border-gray-400 bg-white text-green-700 focus:ring-green-500"
                    }`}
                  />
                  <span
                    className={`text-2xl font-bold ${
                      formData.isDeferred ? "text-red-800" : "text-green-800"
                    }`}
                  >
                    {formData.isDeferred ? (
                      <XCircle className="inline w-7 h-7 mr-3" />
                    ) : (
                      <CheckCircle className="inline w-7 h-7 mr-3" />
                    )}
                    Mark as {formData.isDeferred ? "Deferred" : "Accepted"}
                  </span>
                </label>
                {formData.isDeferred && (
                  <div className="mt-6 p-4 border-t border-red-400">
                    <label className="block text-xl font-bold text-red-800 mb-3">
                      Deferral Reason{" "}
                      <span className="text-red-600 font-extrabold text-2xl">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="deferralReason"
                      value={formData.deferralReason}
                      onChange={handleChange}
                      placeholder="e.g., Low hemoglobin, Recent travel, Medication..."
                      required // HTML validation rule
                      className={`${inputStyle} border-red-500 focus:ring-red-500`}
                    />
                  </div>
                )}
              </div>

              {/* 6. Notes */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="5"
                  className={inputStyle}
                  maxLength="500" // Set a max length for professional input
                  placeholder="Additional context about the donor or donation process (Max 500 characters)."
                />
              </div>

              {/* 7. Submit Button */}
              <div className="pt-10 border-t-4 border-gray-300">
                <button
                  type="submit"
                  disabled={isSubmitDisabled} // Disable based on loading OR missing deferral reason
                  className={`w-full py-6 px-10 text-white font-extrabold text-3xl rounded-3xl shadow-2xl flex items-center justify-center gap-5 transition-all ${
                    isSubmitDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-12 w-12" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-12 w-12" />
                      Register Donation
                    </>
                  )}
                </button>
                {formData.isDeferred && !formData.deferralReason.trim() && (
                  <p className="text-center mt-3 text-lg text-red-600 font-semibold">
                    ⚠️ Please provide a Deferral Reason to complete
                    registration.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={8000} theme="light" />
    </>
  );
};

export default RegisterDonation;
