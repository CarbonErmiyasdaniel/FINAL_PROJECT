// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { toast } from "react-hot-toast";
// // // import { Edit, Save, AlertTriangle, User, Home, Phone } from "lucide-react";

// // // // Initial state structure based on your Mongoose Schema
// // // const initialFormState = {
// // //   donorNumber: "",
// // //   title: "",
// // //   fatherName: "",
// // //   surname: "",
// // //   dateOfBirth: "",
// // //   sex: "",
// // //   occupation: "",
// // //   donorSignature: "",
// // //   address: {
// // //     region: "",
// // //     zone: "",
// // //     woreda: "",
// // //     kebele: "",
// // //     subCity: "",
// // //     houseNumber: "",
// // //   },
// // //   contact: {
// // //     mobile: "",
// // //     telephone: "",
// // //     pobox: "",
// // //   },
// // // };

// // // const DonorPersonalInfo = () => {
// // //   const [formData, setFormData] = useState(initialFormState);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   // --- Data Fetching ---
// // //   useEffect(() => {
// // //     const fetchPersonalInfo = async () => {
// // //       try {
// // //         const response = await axios.get("/api/donors/personal-info");
// // //         // Convert date string to YYYY-MM-DD format for input type="date"
// // //         const data = response.data.data;
// // //         if (data.dateOfBirth) {
// // //           data.dateOfBirth = new Date(data.dateOfBirth)
// // //             .toISOString()
// // //             .split("T")[0];
// // //         }
// // //         setFormData((prev) => ({ ...prev, ...data }));
// // //         setError(null);
// // //       } catch (err) {
// // //         if (err.response && err.response.status === 404) {
// // //           setError("Profile not yet completed. Click 'Edit' to start.");
// // //         } else {
// // //           setError("Failed to fetch personal data. Check API.");
// // //         }
// // //         console.error("Fetch Error:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchPersonalInfo();
// // //   }, []);

// // //   // --- Handlers ---
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;

// // //     // Handle nested fields (address, contact)
// // //     if (name.includes(".")) {
// // //       const [parent, child] = name.split(".");
// // //       setFormData((prev) => ({
// // //         ...prev,
// // //         [parent]: {
// // //           ...prev[parent],
// // //           [child]: value,
// // //         },
// // //       }));
// // //     } else {
// // //       setFormData((prev) => ({
// // //         ...prev,
// // //         [name]: value,
// // //       }));
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);
// // //     try {
// // //       const response = await axios.patch("/api/donors/personal-info", formData);
// // //       toast.success(response.data.message);
// // //       setIsEditing(false); // Exit editing mode on success
// // //       // Re-fetch or update state directly from response for consistency
// // //       const updatedData = response.data.data;
// // //       if (updatedData.dateOfBirth) {
// // //         updatedData.dateOfBirth = new Date(updatedData.dateOfBirth)
// // //           .toISOString()
// // //           .split("T")[0];
// // //       }
// // //       setFormData((prev) => ({ ...prev, ...updatedData }));
// // //     } catch (err) {
// // //       const msg =
// // //         err.response?.data?.message || "Update failed due to a server error.";
// // //       toast.error(msg);
// // //       console.error("Update Error:", err);
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // --- Render State Checks ---
// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center p-10 text-gray-600">
// // //         <Save className="w-6 h-6 animate-pulse mr-2 text-red-500" />
// // //         Loading personal profile...
// // //       </div>
// // //     );
// // //   }

// // //   if (error && error !== "Profile not yet completed. Click 'Edit' to start.") {
// // //     return (
// // //       <div className="p-4 bg-red-100 text-red-700 rounded-lg">
// // //         <AlertTriangle className="w-5 h-5 inline mr-2" /> {error}
// // //       </div>
// // //     );
// // //   }

// // //   // --- Helper for Input Fields ---
// // //   const renderInputField = (
// // //     label,
// // //     name,
// // //     value,
// // //     type = "text",
// // //     required = true
// // //   ) => (
// // //     <div className="flex flex-col space-y-1">
// // //       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // //         {label} {required && <span className="text-red-500">*</span>}
// // //       </label>
// // //       <input
// // //         type={type}
// // //         name={name}
// // //         value={value || ""}
// // //         onChange={handleInputChange}
// // //         disabled={!isEditing}
// // //         required={required}
// // //         className={`p-2 border rounded-md transition duration-150 ease-in-out ${
// // //           isEditing
// // //             ? "bg-white dark:bg-gray-700 border-red-300 focus:ring-red-500 focus:border-red-500"
// // //             : "bg-gray-100 dark:bg-gray-800 border-gray-200 text-gray-500 cursor-not-allowed"
// // //         }`}
// // //       />
// // //     </div>
// // //   );

// // //   // --- Component JSX ---
// // //   return (
// // //     <form
// // //       onSubmit={handleSubmit}
// // //       className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg space-y-8"
// // //     >
// // //       <div className="flex justify-between items-center border-b pb-4 mb-4">
// // //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
// // //           <User className="w-6 h-6 mr-2 text-red-500" /> Donor Personal
// // //           Information
// // //         </h2>
// // //         <button
// // //           type={isEditing ? "submit" : "button"}
// // //           onClick={() => !isEditing && setIsEditing(true)}
// // //           disabled={isSubmitting}
// // //           className={`px-4 py-2 rounded-md text-white font-semibold transition duration-200 ${
// // //             isEditing
// // //               ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
// // //               : "bg-red-600 hover:bg-red-700"
// // //           }`}
// // //         >
// // //           {isSubmitting ? (
// // //             "Saving..."
// // //           ) : isEditing ? (
// // //             <>
// // //               <Save className="w-4 h-4 inline mr-2" /> Save Changes
// // //             </>
// // //           ) : (
// // //             <>
// // //               <Edit className="w-4 h-4 inline mr-2" /> Edit Profile
// // //             </>
// // //           )}
// // //         </button>
// // //       </div>

// // //       {/* --- Main Info Section --- */}
// // //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2">
// // //         <User className="w-5 h-5 inline mr-2" /> Basic Details
// // //       </h3>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {renderInputField(
// // //           "Donor Number (Read Only)",
// // //           "donorNumber",
// // //           formData.donorNumber,
// // //           "text",
// // //           false
// // //         )}
// // //         {renderInputField("Title", "title", formData.title)}
// // //         {renderInputField("Surname", "surname", formData.surname)}
// // //         {renderInputField("Father's Name", "fatherName", formData.fatherName)}

// // //         {/* Date of Birth Input */}
// // //         {renderInputField(
// // //           "Date of Birth",
// // //           "dateOfBirth",
// // //           formData.dateOfBirth,
// // //           "date"
// // //         )}

// // //         {/* Sex Dropdown */}
// // //         <div className="flex flex-col space-y-1">
// // //           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // //             Sex <span className="text-red-500">*</span>
// // //           </label>
// // //           <select
// // //             name="sex"
// // //             value={formData.sex || ""}
// // //             onChange={handleInputChange}
// // //             disabled={!isEditing}
// // //             required
// // //             className={`p-2 border rounded-md transition duration-150 ease-in-out ${
// // //               isEditing
// // //                 ? "bg-white dark:bg-gray-700 border-red-300 focus:ring-red-500 focus:border-red-500"
// // //                 : "bg-gray-100 dark:bg-gray-800 border-gray-200 text-gray-500 cursor-not-allowed"
// // //             }`}
// // //           >
// // //             <option value="">Select Sex</option>
// // //             <option value="Male">Male</option>
// // //             <option value="Female">Female</option>
// // //           </select>
// // //         </div>

// // //         {renderInputField("Occupation", "occupation", formData.occupation)}
// // //         {renderInputField(
// // //           "Donor Signature (Digital)",
// // //           "donorSignature",
// // //           formData.donorSignature
// // //         )}
// // //       </div>

// // //       {/* --- Address Section --- */}
// // //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2 pt-4">
// // //         <Home className="w-5 h-5 inline mr-2" /> Address Details
// // //       </h3>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {renderInputField("Region", "address.region", formData.address.region)}
// // //         {renderInputField("Zone", "address.zone", formData.address.zone)}
// // //         {renderInputField("Woreda", "address.woreda", formData.address.woreda)}
// // //         {renderInputField("Kebele", "address.kebele", formData.address.kebele)}
// // //         {renderInputField(
// // //           "Sub-City (Optional)",
// // //           "address.subCity",
// // //           formData.address.subCity,
// // //           "text",
// // //           false
// // //         )}
// // //         {renderInputField(
// // //           "House Number (Optional)",
// // //           "address.houseNumber",
// // //           formData.address.houseNumber,
// // //           "text",
// // //           false
// // //         )}
// // //       </div>

// // //       {/* --- Contact Section --- */}
// // //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2 pt-4">
// // //         <Phone className="w-5 h-5 inline mr-2" /> Contact Information
// // //       </h3>
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         {renderInputField(
// // //           "Mobile",
// // //           "contact.mobile",
// // //           formData.contact.mobile,
// // //           "tel",
// // //           false
// // //         )}
// // //         {renderInputField(
// // //           "Telephone (Optional)",
// // //           "contact.telephone",
// // //           formData.contact.telephone,
// // //           "tel",
// // //           false
// // //         )}
// // //         {renderInputField(
// // //           "P.O. Box (Optional)",
// // //           "contact.pobox",
// // //           formData.contact.pobox,
// // //           "text",
// // //           false
// // //         )}
// // //       </div>
// // //     </form>
// // //   );
// // // };

// // // export default DonorPersonalInfo;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { AlertTriangle, User, Home, Phone } from "lucide-react";

// // // Initial state structure based on your Mongoose Schema
// // const initialFormState = {
// //   donorNumber: "",
// //   title: "",
// //   fatherName: "",
// //   surname: "",
// //   dateOfBirth: "",
// //   sex: "",
// //   occupation: "",
// //   donorSignature: "",
// //   address: {
// //     region: "",
// //     zone: "",
// //     woreda: "",
// //     kebele: "",
// //     subCity: "",
// //     houseNumber: "",
// //   },
// //   contact: {
// //     mobile: "",
// //     telephone: "",
// //     pobox: "",
// //   },
// // };

// // const DonorPersonalInfo = () => {
// //   const [data, setData] = useState(initialFormState);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // --- Data Fetching ---
// //   useEffect(() => {
// //     const fetchPersonalInfo = async () => {
// //       try {
// //         const response = await axios.get("/api/donors/personal-info");
// //         const fetchedData = response.data.data;

// //         // Format Date of Birth for display (e.g., to a readable locale string)
// //         if (fetchedData.dateOfBirth) {
// //           fetchedData.dateOfBirth = new Date(
// //             fetchedData.dateOfBirth
// //           ).toLocaleDateString();
// //         }

// //         setData(fetchedData);
// //         setError(null);
// //       } catch (err) {
// //         if (err.response && err.response.status === 404) {
// //           setError(
// //             "Profile not yet completed. Please contact admin to complete your profile."
// //           );
// //         } else {
// //           setError(
// //             "Failed to fetch personal data. Check API or network connection."
// //           );
// //         }
// //         console.error("Fetch Error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPersonalInfo();
// //   }, []);

// //   // --- Render State Checks ---
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center p-10 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
// //         <User className="w-6 h-6 animate-pulse mr-2 text-red-500" />
// //         Loading personal profile...
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-lg">
// //         <AlertTriangle className="w-5 h-5 inline mr-2" /> {error}
// //       </div>
// //     );
// //   }

// //   // --- Helper for Displaying Data ---
// //   const renderDisplayField = (label, value, isRequired = true) => (
// //     <div className="flex flex-col space-y-1">
// //       <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
// //         {label} {isRequired && <span className="text-red-500">*</span>}
// //       </label>
// //       <div className="p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md font-semibold text-gray-800 dark:text-white break-words">
// //         {value || "N/A"}
// //       </div>
// //     </div>
// //   );

// //   // --- Component JSX ---
// //   return (
// //     <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg space-y-8">
// //       <div className="flex justify-between items-center border-b pb-4 mb-4">
// //         <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
// //           <User className="w-6 h-6 mr-2 text-red-500" /> Donor Personal
// //           Information
// //         </h2>
// //         {/* Removed Edit/Save button */}
// //       </div>

// //       {/* --- Basic Details Section --- */}
// //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2">
// //         <User className="w-5 h-5 inline mr-2" /> Basic Details
// //       </h3>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {renderDisplayField("Donor Number", data.donorNumber)}
// //         {renderDisplayField("Title", data.title)}
// //         {renderDisplayField("Surname", data.surname)}
// //         {renderDisplayField("Father's Name", data.fatherName)}

// //         {renderDisplayField("Date of Birth", data.dateOfBirth)}
// //         {renderDisplayField("Sex", data.sex)}
// //         {renderDisplayField("Occupation", data.occupation)}
// //         {renderDisplayField("Donor Signature", data.donorSignature)}
// //       </div>

// //       {/* --- Address Section --- */}
// //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2 pt-4">
// //         <Home className="w-5 h-5 inline mr-2" /> Address Details
// //       </h3>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {renderDisplayField("Region", data.address.region)}
// //         {renderDisplayField("Zone", data.address.zone)}
// //         {renderDisplayField("Woreda", data.address.woreda)}
// //         {renderDisplayField("Kebele", data.address.kebele)}
// //         {renderDisplayField("Sub-City", data.address.subCity, false)}
// //         {renderDisplayField("House Number", data.address.houseNumber, false)}
// //       </div>

// //       {/* --- Contact Section --- */}
// //       <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 border-b pb-2 pt-4">
// //         <Phone className="w-5 h-5 inline mr-2" /> Contact Information
// //       </h3>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {renderDisplayField("Mobile", data.contact.mobile, false)}
// //         {renderDisplayField("Telephone", data.contact.telephone, false)}
// //         {renderDisplayField("P.O. Box", data.contact.pobox, false)}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DonorPersonalInfo;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Utility function to fetch the JWT token from storage (e.g., localStorage)
// const getToken = () => localStorage.getItem("token");

// const DonorPersonalInfo = () => {
//   const [info, setInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchInfo = async () => {
//       const token = getToken();
//       if (!token) {
//         setError("You must be logged in to view your info.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Hitting the new endpoint
//         const response = await axios.get("/api/donor/me/personal-info", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setInfo(response.data.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         // The 404 handler from the controller
//         if (err.response && err.response.status === 404) {
//           setError("Your personal information is not fully registered.");
//         } else {
//           setError("Failed to fetch personal information.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInfo();
//   }, []);

//   if (loading) {
//     return <div className="p-4">Loading personal data...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600 p-4">Error: {error}</div>;
//   }

//   // Safety check just in case
//   if (!info) {
//     return <div className="p-4">No data available.</div>;
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-6 border-b pb-2">
//         👤 My Personal Information
//       </h2>
//       <div className="space-y-4">
//         <p>
//           <span className="font-semibold block text-gray-700">
//             Donor Number:
//           </span>
//           <span className="text-xl text-indigo-600">{info.donorNumber}</span>
//         </p>
//         <p>
//           <span className="font-semibold block text-gray-700">Full Name:</span>
//           {info.title} {info.fatherName} {info.surname}
//         </p>
//         <p>
//           <span className="font-semibold block text-gray-700">
//             Date of Birth:
//           </span>
//           {info.dateOfBirth} ({info.sex})
//         </p>

//         <h3 className="font-semibold text-lg mt-4 pt-2 border-t">📍 Address</h3>
//         <p>
//           {info.address.kebele}, {info.address.woreda}, {info.address.zone},{" "}
//           {info.address.region}
//         </p>

//         <h3 className="font-semibold text-lg mt-4 pt-2 border-t">📞 Contact</h3>
//         <p>
//           Mobile: {info.contact.mobile || "N/A"} | Telephone:{" "}
//           {info.contact.telephone || "N/A"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DonorPersonalInfo;
import React, { useState, useEffect } from "react";
import axios from "axios";
// Import the necessary icons
import { User, Calendar, MapPin, Phone, CreditCard } from "lucide-react";

// Utility function to fetch the JWT token from storage (e.g., localStorage)
const getToken = () => localStorage.getItem("token");

const DonorPersonalInfo = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const token = getToken();
      if (!token) {
        setError("You must be logged in to view your info.");
        setLoading(false);
        return;
      }

      try {
        // Hitting the new endpoint
        const response = await axios.get("/api/donor/me/personal-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInfo(response.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        // The 404 handler from the controller
        if (err.response && err.response.status === 404) {
          setError("Your personal information is not fully registered.");
        } else {
          setError("Failed to fetch personal information.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  // --- Loading, Error, and Missing Info States ---
  if (loading) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-gray-50 rounded-lg shadow-xl animate-pulse text-center">
        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <p className="mt-4 text-gray-500">Loading personal data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-red-50 border border-red-300 rounded-lg text-red-700 text-center shadow-md">
        <p className="font-semibold text-lg">⚠️ Error: {error}</p>
        {error === "Your personal information is not fully registered." && (
          <p className="mt-2 text-sm">
            Please ask the nurse to complete your registration.
          </p>
        )}
      </div>
    );
  }

  if (!info) {
    return (
      <div className="p-4 max-w-lg mx-auto text-gray-700 bg-yellow-100 rounded-lg shadow-md">
        No data available.
      </div>
    );
  }
  // -----------------------------------------------

  // Helper function for consistent data display rows
  // FIX: Destructure the icon prop directly as IconComponent, which is standard React pattern for components
  const DataRow = ({ icon: IconComponent, title, value }) => (
    <div className="flex items-start py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0 mr-3 text-indigo-500">
        <IconComponent size={20} />
      </div>
      <div>
        <span className="font-semibold text-sm block text-gray-500">
          {title}
        </span>
        <span className="text-gray-800 font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-2xl hover:shadow-indigo-300/50 transition-shadow duration-300 rounded-xl p-8 max-w-xl mx-auto border-t-4 border-indigo-600">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
          <User size={30} className="mr-3 text-indigo-600" />
          My Personal Profile
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Details as recorded by the hospital staff.
        </p>
      </div>

      {/* Donor Number Card (Highlighted) */}
      <div className="bg-indigo-50 p-4 mb-6 rounded-lg flex items-center justify-between shadow-inner">
        <div className="flex items-center">
          <CreditCard size={24} className="text-indigo-600 mr-3" />
          <span className="font-semibold text-base text-indigo-700">
            Donor Registration ID:
          </span>
        </div>
        <span className="text-2xl font-extrabold text-indigo-900 tracking-wider">
          {info.donorNumber}
        </span>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <DataRow
          icon={User}
          title="Full Name"
          value={`${info.title} ${info.fatherName} ${info.surname}`}
        />

        <DataRow
          icon={Calendar}
          title="Date of Birth (Sex)"
          value={`${info.dateOfBirth} (${info.sex})`}
        />
      </div>

      {/* Address Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-bold text-lg text-gray-700 mb-3 flex items-center">
          <MapPin size={20} className="mr-2 text-red-500" />
          Registered Address
        </h3>
        <p className="bg-gray-50 p-3 rounded-md text-gray-800 font-mono text-sm shadow-inner">
          **Kebele:** {info.address.kebele}, **Woreda:** {info.address.woreda}
          <br />
          **Zone:** {info.address.zone}, **Region:** {info.address.region}
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-bold text-lg text-gray-700 mb-3 flex items-center">
          <Phone size={20} className="mr-2 text-green-500" />
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-md">
            <span className="font-semibold text-sm block text-gray-600">
              Mobile
            </span>
            <span className="text-green-800 font-mono font-medium">
              {info.contact.mobile || "Not Provided"}
            </span>
          </div>
          <div className="p-3 bg-green-50 rounded-md">
            <span className="font-semibold text-sm block text-gray-600">
              Telephone
            </span>
            <span className="text-green-800 font-mono font-medium">
              {info.contact.telephone || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorPersonalInfo;
