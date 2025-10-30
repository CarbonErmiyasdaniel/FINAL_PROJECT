import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// Define the allowed roles
const ALLOWED_ROLES = [
  "nurse",
  "lab_technician",
  "post_counselor",
  "hospital_staff",
];

// Reusable Tailwind style for inputs (Dark Mode applied)
const inputStyle =
  "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

// ------------------------------------------------------------------

const RegisterUserPage = () => {
  const navigate = useNavigate();

  // Initial state for the new user form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // Key in state is correctly set to 'phone'
    phone: "",
    password: "",
    role: "nurse",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    // This uses e.target.name to update the corresponding state key
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone || // <--- VALIDATION CHECK
        !formData.password ||
        !formData.role
      ) {
        toast.error("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
      }

      // API call
      const res = await axios.post("/api/admins/createUser", formData, {
        withCredentials: true,
      });

      toast.success(`User '${res.data.data.name}' created successfully!`);

      // Reset form and then redirect
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "nurse",
      });

      setTimeout(() => {
        navigate("/admin/getAllUsers");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to create user. Server error.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-red-700 dark:border-red-600">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <UserPlus className="text-red-700 dark:text-red-500 w-8 h-8" /> Register
        New User
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Complete the form below to create a new user account (Donor or Staff).
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">
              Name
            </span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={inputStyle}
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className={inputStyle}
            required
          />
        </div>

        {/* === PHONE NUMBER FIELD (FIXED) === */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </span>
          </label>
          <input
            type="tel"
            name="phone" // <-- FIX: Changed 'phoneNumber' to 'phone' to match the state key
            value={formData.phone}
            onChange={handleChange}
            placeholder="+251912345678"
            className={inputStyle}
            required
          />
        </div>
        {/* ================================== */}

        {/* Password Field */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">
              Password (Min 8 characters)
            </span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className={inputStyle}
            required
          />
        </div>

        {/* Role Field (Dropdown) */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">
              Role
            </span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputStyle + " appearance-none"}
            required
          >
            {ALLOWED_ROLES.map((role) => (
              <option key={role} value={role}>
                {role
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-none text-white font-semibold transition duration-200 shadow-xl flex items-center justify-center gap-3
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" /> Creating...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" /> Create User Account
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserPage;

///////////////////////////////////////////////////////
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { UserPlus, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";

// // Define the allowed roles
// const ALLOWED_ROLES = [
//   "nurse",
//   "lab_technician",
//   "post_counselor",
//   "hospital_staff",
// ];

// // E.164 Phone Number Regex: matches the server-side Mongoose validation.
// // It allows an optional '+' at the start, followed by 1 to 15 digits.
// const E164_REGEX = /^\+?[1-9]\d{1,14}$/;

// // Reusable Tailwind style for inputs (Dark Mode applied)
// const inputStyle =
//   "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

// // ------------------------------------------------------------------

// const RegisterUserPage = () => {
//   const navigate = useNavigate();

//   // Initial state for the new user form
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "nurse",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   /**
//    * Helper function to extract and format Mongoose validation errors from the server response.
//    * @param {object} err The error object from axios response.
//    * @returns {string} The formatted error message.
//    */
//   const extractErrorMessage = (err) => {
//     // 1. Check for standard API message
//     if (err.response?.data?.msg) return err.response.data.msg;
//     if (err.response?.data?.message) return err.response.data.message;

//     // 2. Check for Mongoose Validation Errors (err.response.data.errors)
//     const errors = err.response?.data?.errors;
//     if (errors) {
//       const messages = Object.values(errors).map(
//         (el) => el.message || "Validation failed."
//       );
//       return messages.join(" | ");
//     }

//     // 3. Fallback for generic network/server error
//     return "Failed to create user. Unknown server error.";
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // --- CLIENT-SIDE VALIDATION ---
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.password ||
//       !formData.role
//     ) {
//       toast.error("Please fill in all fields.");
//       setIsLoading(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error("Password must be at least 8 characters long.");
//       setIsLoading(false);
//       return;
//     }

//     // Check E.164 phone format BEFORE sending to server
//     if (!E164_REGEX.test(formData.phone)) {
//       toast.error(
//         "Phone number is invalid. Please use a format like '+251912345678' (Max 15 digits)."
//       );
//       setIsLoading(false);
//       return;
//     }
//     // --------------------------------

//     try {
//       // API call
//       const res = await axios.post("/api/admins/createUser", formData, {
//         withCredentials: true,
//       });

//       toast.success(`User '${res.data.data.name}' created successfully!`);

//       // Reset form and then redirect
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "nurse",
//       });

//       setTimeout(() => {
//         navigate("/admin/getAllUsers");
//       }, 1500);
//     } catch (err) {
//       // Use the enhanced error extraction function
//       const errorMessage = extractErrorMessage(err);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-red-700 dark:border-red-600">
//       {/* Title */}
//       <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
//         <UserPlus className="text-red-700 dark:text-red-500 w-8 h-8" /> Register
//         New User
//       </h1>
//       <p className="text-gray-600 dark:text-gray-400 mb-8">
//         Complete the form below to create a new user account (Donor or Staff).
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Field */}
//         <div>
//           <label className="label">
//             <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//               Name
//             </span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label className="label">
//             <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//               Email
//             </span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="example@domain.com"
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* Phone Number Field */}
//         <div>
//           <label className="label">
//             <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//               Phone Number (E.164 Format)
//             </span>
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="+251912345678"
//             className={inputStyle}
//             required
//           />
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             Must start with country code, e.g., +12025550101 (Max 15 digits).
//           </p>
//         </div>

//         {/* Password Field */}
//         <div>
//           <label className="label">
//             <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//               Password (Min 8 characters)
//             </span>
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="********"
//             className={inputStyle}
//             required
//           />
//         </div>

//         {/* Role Field (Dropdown) */}
//         <div>
//           <label className="label">
//             <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//               Role
//             </span>
//           </label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className={inputStyle + " appearance-none"}
//             required
//           >
//             {ALLOWED_ROLES.map((role) => (
//               <option key={role} value={role}>
//                 {role
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase())}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 px-4 rounded-none text-white font-semibold transition duration-200 shadow-xl flex items-center justify-center gap-3
//               ${
//                 isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
//               }`}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin h-5 w-5" /> Creating...
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-5 w-5" /> Create User Account
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterUserPage;

// import React, { useState } from "react";
// import axios from "axios"; // Re-enabled: Import for making API calls
// import { UserPlus, Loader2, CheckCircle, RotateCcw } from "lucide-react";
// import { toast } from "react-toastify";

// // Define the allowed roles
// const ALLOWED_ROLES = [
//   "nurse",
//   "lab_technician",
//   "post_counselor",
//   "hospital_staff",
// ];

// // E.164 Phone Number Regex: (optional '+', followed by 10 to 15 digits)
// const E164_REGEX = /^\+?[0-9]{10,15}$/;

// // Reusable Tailwind style for inputs (Dark Mode applied)
// const inputStyle =
//   "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

// // --- MAIN FORM COMPONENT ---

// const RegisterUserPage = () => {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "nurse",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   /**
//    * Resets the form and the success state.
//    */
//   const handleReset = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       role: "nurse",
//     });
//     setIsRegistered(false);
//   };

//   /**
//    * Helper function to extract and format Mongoose validation errors from the server response.
//    */
//   const extractErrorMessage = (err) => {
//     if (err.response?.data?.msg) return err.response.data.msg;
//     if (err.response?.data?.message) return err.response.data.message;

//     const errors = err.response?.data?.errors;
//     if (errors) {
//       const messages = Object.values(errors).map(
//         (el) => el.message || "Validation failed."
//       );
//       return messages.join(" | ");
//     }

//     return "Failed to create user. Unknown server error.";
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // --- CLIENT-SIDE VALIDATION ---
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.password ||
//       !formData.role
//     ) {
//       toast.error("Please fill in all fields.");
//       setIsLoading(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error("Password must be at least 8 characters long.");
//       setIsLoading(false);
//       return;
//     }

//     // Check E.164 phone format
//     if (!E164_REGEX.test(formData.phone)) {
//       toast.error(
//         "Phone number is invalid. Please use E.164 format: e.g., '+251912345678'."
//       );
//       setIsLoading(false);
//       return;
//     }
//     // --------------------------------

//     try {
//       // API CALL: This is the actual endpoint connection, now active
//       const res = await axios.post("/api/admins/createUser", formData, {
//         withCredentials: true,
//       });

//       toast.success(`User '${res.data.data.name}' created successfully!`);

//       // Set success state instead of navigating
//       setTimeout(() => {
//         setIsRegistered(true);
//       }, 500);
//     } catch (err) {
//       const errorMessage = extractErrorMessage(err);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render Success Message or Form
//   const content = isRegistered ? (
//     // Success State
//     <div className="text-center p-10">
//       <CheckCircle className="text-green-600 dark:text-green-400 w-16 h-16 mx-auto mb-6" />
//       <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
//         User Created!
//       </h2>
//       <p className="text-gray-600 dark:text-gray-400 mb-8">
//         The account was successfully registered. You can now register another
//         user.
//       </p>
//       <button
//         onClick={handleReset}
//         className="py-3 px-6 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center mx-auto gap-2"
//       >
//         <RotateCcw className="h-4 w-4" /> Register Another User
//       </button>
//     </div>
//   ) : (
//     // Form State
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Name Field */}
//       <div>
//         <label className="label">
//           <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//             Name
//           </span>
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className={inputStyle}
//           required
//         />
//       </div>

//       {/* Email Field */}
//       <div>
//         <label className="label">
//           <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//             Email
//           </span>
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="example@domain.com"
//           className={inputStyle}
//           required
//         />
//       </div>

//       {/* Phone Number Field */}
//       <div>
//         <label className="label">
//           <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//             Phone Number (E.164 Format)
//           </span>
//         </label>
//         <input
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="+251912345678"
//           className={inputStyle}
//           required
//         />
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//           Required format: `+` followed by country code and number (Max 15
//           digits).
//         </p>
//       </div>

//       {/* Password Field */}
//       <div>
//         <label className="label">
//           <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//             Password (Min 8 characters)
//           </span>
//         </label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="********"
//           className={inputStyle}
//           required
//         />
//       </div>

//       {/* Role Field (Dropdown) */}
//       <div>
//         <label className="label">
//           <span className="label-text font-medium text-gray-700 dark:text-gray-300">
//             Role
//           </span>
//         </label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className={inputStyle + " appearance-none"}
//           required
//         >
//           {ALLOWED_ROLES.map((role) => (
//             <option key={role} value={role}>
//               {role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-3 px-4 rounded-none text-white font-semibold transition duration-200 shadow-xl flex items-center justify-center gap-3
//             ${
//               isLoading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
//             }`}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="animate-spin h-5 w-5" /> Creating...
//             </>
//           ) : (
//             <>
//               <UserPlus className="h-5 w-5" /> Create User Account
//             </>
//           )}
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12">
//       <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-red-700 dark:border-red-600 w-full">
//         {/* Title */}
//         <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
//           <UserPlus className="text-red-700 dark:text-red-500 w-8 h-8" />{" "}
//           Register New User
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-8">
//           Complete the form below to create a new user account (Donor or Staff).
//         </p>
//         {content}
//       </div>
//     </div>
//   );
// };

// export default RegisterUserPage;
