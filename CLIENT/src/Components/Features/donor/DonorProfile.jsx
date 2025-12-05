// // // src/Features/donor/DonorProfile.jsx
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const DonorProfile = () => {
// //   const [profile, setProfile] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .get("/api/donor/me", { withCredentials: true })
// //       .then((res) => setProfile(res.data.data.profile));
// //   }, []);

// //   if (!profile) {
// //     return (
// //       <div className="p-10 text-center text-gray-500">Loading profile...</div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 lg:p-10 max-w-4xl mx-auto">
// //       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
// //         My Profile
// //       </h1>

// //       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
// //         <div className="flex items-center gap-6 mb-8">
// //           <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
// //             {profile.name.charAt(0)}
// //           </div>
// //           <div>
// //             <h2 className="text-2xl font-bold">{profile.name}</h2>
// //             <p className="text-gray-600 dark:text-gray-400">
// //               Blood Donor • {profile.donorNumber}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Email
// //             </label>
// //             <p className="mt-1 text-lg">{profile.email}</p>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Phone
// //             </label>
// //             <p className="mt-1 text-lg">{profile.phone}</p>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Blood Type
// //             </label>
// //             <p className="mt-1 text-lg font-bold text-red-600">
// //               {profile.bloodType}
// //             </p>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Date of Birth
// //             </label>
// //             <p className="mt-1 text-lg">
// //               {profile.dateOfBirth
// //                 ? new Date(profile.dateOfBirth).toLocaleDateString()
// //                 : "—"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DonorProfile;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";

// const DonorProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   // Photo states
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);

//   // Password states
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       // CHANGED: API endpoint from hospital_staff/me to donors/me
//       const res = await axios.get("/api/donors/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//       if (res.data.data.photo) {
//         setPhotoPreview(res.data.data.photo);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUploadPhoto = async () => {
//     if (!photo) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("photo", photo);

//     try {
//       const token = localStorage.getItem("token");
//       // CHANGED: API endpoint from hospital_staff/photo to donors/photo
//       const res = await axios.patch("/api/donors/photo", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUser((prev) => ({ ...prev, photo: res.data.data.photo }));
//       setPhotoPreview(res.data.data.photo);
//       setPhoto(null);
//       toast.success("Profile photo updated!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword)
//       return toast.error("Passwords don't match");
//     if (newPassword.length < 6) return toast.error("Password too short");

//     setPasswordLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       // CHANGED: API endpoint from hospital_staff/change-password to donors/change-password
//       await axios.patch(
//         "/api/donors/change-password",
//         { currentPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password changed successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to change password");
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-2xl text-gray-600">Loading profile...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-white pt-10 pb-20">
//         <div className="max-w-6xl mx-auto px-4">
//           {/* Side-by-Side Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left: Profile Card */}
//             <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//               {/* Gradient Header */}
//               <div className="h-48 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative">
//                 <div className="absolute inset-0 bg-black opacity-10"></div>

//                 {/* Icons */}
//                 <div className="absolute top-6 left-6 text-white">
//                   <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="white"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="absolute top-6 right-6 text-white">
//                   <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="white"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Profile Info */}
//               <div className="relative px-8 pb-10 -mt-20">
//                 <div className="flex flex-col items-center">
//                   <div className="relative">
//                     <img
//                       src={
//                         photoPreview ||
//                         "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Photo"
//                       }
//                       alt="Profile"
//                       className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl"
//                     />
//                     <label
//                       htmlFor="photo-upload"
//                       className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-100 transition"
//                     >
//                       <svg
//                         className="w-6 h-6 text-pink-600"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </label>
//                     <input
//                       id="photo-upload"
//                       type="file"
//                       accept="image/*"
//                       onChange={handlePhotoChange}
//                       className="hidden"
//                     />
//                   </div>

//                   <h2 className="mt-6 text-2xl font-bold text-gray-900">
//                     {user.name}
//                   </h2>
//                   <p className="text-lg text-pink-600 font-medium">Donor</p>
//                   <p className="text-gray-600 mt-1 flex items-center gap-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     {user.bloodType
//                       ? `Blood Type: ${user.bloodType}`
//                       : "Blood Type Not Set"}
//                   </p>
//                 </div>

//                 {photo && (
//                   <div className="mt-8 text-center">
//                     <button
//                       onClick={handleUploadPhoto}
//                       disabled={uploading}
//                       className="px-12 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
//                     >
//                       {uploading ? "Uploading..." : "Update Photo"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right: Change Password */}
//             <div className="bg-white rounded-3xl shadow-2xl p-8">
//               <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
//                 Change Password
//               </h3>
//               <form onSubmit={handleChangePassword} className="space-y-6">
//                 <input
//                   type="password"
//                   placeholder="Current Password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   required
//                   className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//                 />
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                   minLength="6"
//                   className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Confirm New Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//                 />
//                 <button
//                   type="submit"
//                   disabled={passwordLoading}
//                   className="w-full py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
//                 >
//                   {passwordLoading ? "Updating..." : "Update Password"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DonorProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const DonorProfile = () => {
  // Profile Data and Loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Photo Upload States
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- API Calls ---

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token storage
      const res = await axios.get("/api/donors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // The backend now returns data.profile and data.stats under data
      setUser(res.data.data.profile);
      // We need to merge profile and stats for display if we want all info easily
      setUser({ ...res.data.data.profile, ...res.data.data.stats });

      if (res.data.data.profile.photo) {
        // Check for photo field
        setPhotoPreview(res.data.data.profile.photo);
      }
    } catch (err) {
      // In a real app, you might use an interceptor to handle 401/403 errors
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadPhoto = async () => {
    if (!photo) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch("/api/donors/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the user state with the new photo URL returned by the server
      setUser((prev) => ({ ...prev, photo: res.data.data.photo }));
      setPhotoPreview(res.data.data.photo);
      setPhoto(null);
      toast.success("Profile photo updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword)
      return toast.error("New passwords do not match.");
    if (newPassword.length < 6)
      return toast.error("New password must be at least 6 characters.");

    setPasswordLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "/api/donors/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully!");
      // Reset form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // --- Rendering ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  // Ensure user data is available before accessing properties
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-500">Error loading profile data.</div>
      </div>
    );
  }

  const profileName = user.name || "N/A";
  const bloodType = user.bloodType || "Unknown";
  const totalDonations =
    user.totalDonations !== undefined ? user.totalDonations : "N/A";
  const lastDonationDate = user.lastDonationDate
    ? new Date(user.lastDonationDate).toDateString()
    : "N/A";
  const daysUntilNext =
    user.daysUntilNext !== undefined ? user.daysUntilNext : "N/A";
  const canDonateNow = user.canDonateNow === true;

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-white pt-10 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
            Donor Dashboard 🩸
          </h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Profile Card (Takes 1/3) */}
            <div className="lg:col-span-1 bg-white rounded-3xl shadow-2xl overflow-hidden h-fit">
              <div className="h-48 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                {/* Back and Settings Icons (kept for UI consistency) */}
                <div className="absolute top-6 left-6 text-white">
                  {/* Back Button SVG */}
                </div>
                <div className="absolute top-6 right-6 text-white">
                  {/* Settings Button SVG */}
                </div>
              </div>

              <div className="relative px-8 pb-10 -mt-20">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={
                        photoPreview ||
                        "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Photo"
                      }
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                      {/* Camera SVG Icon */}
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 115.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {profileName}
                  </h2>
                  <p className="text-lg text-pink-600 font-medium">Donor</p>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    {/* Blood Drop Icon SVG */}
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Blood Type: **{bloodType}**
                  </p>
                </div>

                {photo && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleUploadPhoto}
                      disabled={uploading}
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                    >
                      {uploading ? "Uploading..." : "Update Photo"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Column 2 & 3: Stats and Password (Takes 2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                  Donation Status & Statistics 📊
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  <p className="font-semibold text-gray-700">
                    Total Donations:
                  </p>
                  <p className="text-pink-600 font-extrabold">
                    {totalDonations}
                  </p>

                  <p className="font-semibold text-gray-700">
                    Last Donation Date:
                  </p>
                  <p className="text-gray-600">{lastDonationDate}</p>

                  <p className="font-semibold text-gray-700">
                    Next Eligibility:
                  </p>
                  <p
                    className={`${
                      canDonateNow
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }`}
                  >
                    {canDonateNow
                      ? "Eligible to Donate Now!"
                      : `${daysUntilNext} days until eligible`}
                  </p>
                </div>
              </div>

              {/* Change Password Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 border-b pb-2">
                  Change Password 🔑
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
                  />
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorProfile;
