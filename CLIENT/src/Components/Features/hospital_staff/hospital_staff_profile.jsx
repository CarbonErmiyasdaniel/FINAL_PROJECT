// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast"; // Optional: for nice alerts

// const HospitalStaffProfile = () => {
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
//       const res = await axios.get("/api/hospital_staff/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//       if (res.data.data.photo) {
//         setPhotoPreview(res.data.data.photo); // Show current photo
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

//   const handleRemovePhoto = () => {
//     setPhoto(null);
//     setPhotoPreview(user.photo || null);
//   };

//   const handleUploadPhoto = async () => {
//     if (!photo) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("photo", photo);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.patch("/api/hospital_staff/photo", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUser((prev) => ({ ...prev, photo: res.data.data.photo }));
//       setPhotoPreview(res.data.data.photo);
//       setPhoto(null);
//       toast.success("Photo updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to upload photo");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }
//     if (newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     setPasswordLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch(
//         "/api/hospital_staff/change-password",
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
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading profile...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster position="top-right" />
//       <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
//         <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
//           Hospital Staff Profile
//         </h2>

//         {/* Profile Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <p className="text-sm text-gray-600">Name</p>
//             <p className="text-lg font-semibold">{user.name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Email</p>
//             <p className="text-lg font-semibold">{user.email || "—"}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Role</p>
//             <p className="text-lg font-semibold capitalize">
//               {user.role.replace(/_/g, " ")}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Hospital</p>
//             <p className="text-lg font-semibold">
//               {user.hospitalName || "Not set"}
//             </p>
//           </div>
//         </div>

//         {/* Profile Photo Section */}
//         <div className="mb-10">
//           <h3 className="text-xl font-semibold mb-4">Profile Photo</h3>
//           <div className="flex items-center gap-6">
//             <div className="shrink-0">
//               {photoPreview ? (
//                 <img
//                   src={photoPreview}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
//                 />
//               ) : (
//                 <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-dashed border-gray-400 flex items-center justify-center">
//                   <span className="text-gray-500">No Photo</span>
//                 </div>
//               )}
//             </div>

//             <div className="flex-1">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//               />
//               <div className="mt-3 flex gap-3">
//                 {photo && (
//                   <>
//                     <button
//                       onClick={handleUploadPhoto}
//                       disabled={uploading}
//                       className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//                     >
//                       {uploading ? "Uploading..." : "Upload Photo"}
//                     </button>
//                     <button
//                       onClick={handleRemovePhoto}
//                       className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Change Password Section */}
//         <div className="border-t pt-8">
//           <h3 className="text-xl font-semibold mb-6">Change Password</h3>
//           <form onSubmit={handleChangePassword} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 minLength="6"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={passwordLoading}
//               className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
//             >
//               {passwordLoading ? "Changing..." : "Change Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HospitalStaffProfile;
////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";

// const HospitalStaffProfile = () => {
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
//       const res = await axios.get("/api/hospital_staff/me", {
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
//       const res = await axios.patch("/api/hospital_staff/photo", formData, {
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
//       await axios.patch(
//         "/api/hospital_staff/change-password",
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
//         <div className="max-w-md mx-auto">
//           {/* Beautiful Profile Card */}
//           <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//             {/* Gradient Header */}
//             <div className="h-48 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative">
//               <div className="absolute inset-0 bg-black opacity-10"></div>

//               {/* Back & Settings Icons */}
//               <div className="absolute top-6 left-6 text-white">
//                 <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="white"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 19l-7-7 7-7"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="absolute top-6 right-6 text-white">
//                 <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="white"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Profile Photo & Info */}
//             <div className="relative px-8 pb-10 -mt-20">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <img
//                     src={
//                       photoPreview ||
//                       "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Photo"
//                     }
//                     alt="Profile"
//                     className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl"
//                   />
//                   {/* Fixed the parsing error here */}
//                   <label
//                     htmlFor="photo-upload"
//                     className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-100 transition"
//                   >
//                     <svg
//                       className="w-6 h-6 text-pink-600"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </label>
//                   <input
//                     id="photo-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </div>

//                 <h2 className="mt-6 text-2xl font-bold text-gray-900">
//                   {user.name}
//                 </h2>
//                 <p className="text-lg text-pink-600 font-medium">
//                   {user.role.replace(/_/g, " ")}
//                 </p>
//                 <p className="text-gray-600 mt-1 flex items-center gap-1">
//                   <svg
//                     className="w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {user.hospitalName || "Hospital Not Set"}
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-8 mt-10 text-center">
//                 <div>
//                   <p className="text-3xl font-bold text-pink-600">1,755</p>
//                   <p className="text-gray-600 text-sm">Appreciations</p>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-orange-600">800</p>
//                   <p className="text-gray-600 text-sm">Followers</p>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-purple-600">231</p>
//                   <p className="text-gray-600 text-sm">Following</p>
//                 </div>
//               </div>

//               {/* About */}
//               <div className="mt-10 text-center">
//                 <h3 className="text-xl font-bold text-gray-800 mb-3">
//                   About {user.name.split(" ")[0]}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Hospital staff member managing blood requests and patient care
//                   with dedication. Committed to saving lives through efficient
//                   coordination and timely response.
//                 </p>
//               </div>

//               {/* Upload Button */}
//               {photo && (
//                 <div className="mt-8 text-center">
//                   <button
//                     onClick={handleUploadPhoto}
//                     disabled={uploading}
//                     className="px-12 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
//                   >
//                     {uploading ? "Uploading Photo..." : "Update Profile Photo"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Change Password Section */}
//           <div className="bg-white rounded-3xl shadow-2xl p-8 mt-10">
//             <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
//               Change Password
//             </h3>
//             <form onSubmit={handleChangePassword} className="space-y-6">
//               <input
//                 type="password"
//                 placeholder="Current Password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//                 className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//               />
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 minLength="6"
//                 className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition"
//               />
//               <button
//                 type="submit"
//                 disabled={passwordLoading}
//                 className="w-full py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
//               >
//                 {passwordLoading ? "Updating..." : "Update Password"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HospitalStaffProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const HospitalStaffProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Photo states
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/hospital_staff/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
      if (res.data.data.photo) {
        setPhotoPreview(res.data.data.photo);
      }
    } catch (err) {
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
      const res = await axios.patch("/api/hospital_staff/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
      return toast.error("Passwords don't match");
    if (newPassword.length < 6) return toast.error("Password too short");

    setPasswordLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "/api/hospital_staff/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-white pt-10 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Gradient Header */}
              <div className="h-48 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>

                {/* Icons */}
                <div className="absolute top-6 left-6 text-white">
                  <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-6 right-6 text-white">
                  <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Profile Info */}
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
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
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
                    {user.name}
                  </h2>
                  <p className="text-lg text-pink-600 font-medium">
                    {user.role.replace(/_/g, " ")}
                  </p>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {user.hospitalName || "Hospital Not Set"}
                  </p>
                </div>

                {photo && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleUploadPhoto}
                      disabled={uploading}
                      className="px-12 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                    >
                      {uploading ? "Uploading..." : "Update Photo"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Change Password */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Change Password
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
    </>
  );
};

export default HospitalStaffProfile;
