// // src/Features/lab_technician/lab_technician_profile.jsx
// import React from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   IdCard,
//   Building,
//   Award,
// } from "lucide-react";

// const LabTechnicianProfile = () => {
//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           My Profile
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           Laboratory technician information and credentials
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Profile Card */}
//         <div className="lg:col-span-1">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
//             <div className="relative inline-block">
//               <img
//                 src="https://via.placeholder.com/150/4B5565/FFFFFF?text=LT"
//                 alt="Technician"
//                 className="w-32 h-32 rounded-full mx-auto border-4 border-red-600"
//               />
//               <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">
//               Dr. Selamawit Tesfaye
//             </h2>
//             <p className="text-red-600 font-semibold">Senior Lab Technician</p>
//             <p className="text-gray-500 mt-2">
//               Blood Testing & Screening Department
//             </p>

//             <div className="mt-6 space-y-3">
//               <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
//                 <IdCard className="w-5 h-5" />
//                 <span>ID: LT-2024-087</span>
//               </div>
//               <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
//                 <Award className="w-5 h-5" />
//                 <span>Certified since 2018</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//               Personal Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                   <User className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Full Name
//                   </p>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     Selamawit Tesfaye Worku
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                   <Mail className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Email
//                   </p>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     selamawit@bloodcenter.et
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                   <Phone className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Phone
//                   </p>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     +251 911 234 567
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                   <Calendar className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Joined
//                   </p>
//                   <p className="font-semibold text-gray-900 dark:text-white">
//                     March 15, 2018
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//               Professional Summary
//             </h3>
//             <div className="space-y-4 text-gray-600 dark:text-gray-400">
//               <p>
//                 Experienced laboratory technician with over 7 years in blood
//                 screening and infectious disease testing.
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-start gap-3">
//                   <span className="text-green-600 mt-1">Check</span>
//                   <span>
//                     Expert in HIV, HBV, HCV, and Syphilis screening using ELISA
//                     and rapid tests
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="text-green-600 mt-1">Check</span>
//                   <span>
//                     Trained 12 junior technicians in blood safety protocols
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="text-green-600 mt-1">Check</span>
//                   <span>
//                     Maintained 99.8% accuracy rate in test results (2024)
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LabTechnicianProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const LabTechnicianProfile = () => {
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
      const res = await axios.get("/api/lab_technician/me", {
        // Updated endpoint
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
      const res = await axios.patch("/api/lab_technician/photo", formData, {
        // Updated endpoint
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
        "/api/lab_technician/change-password", // Updated endpoint
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 relative">
                <div className="absolute inset-0 bg-black opacity-10"></div>
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
                      {/* Upload photo SVG */}
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
                    {user.hospitalName || "Admin"}
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

export default LabTechnicianProfile;
