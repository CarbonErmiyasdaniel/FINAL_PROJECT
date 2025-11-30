// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HospitalStaffProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [photo, setPhoto] = useState(null); // State for the uploaded photo
//   const [photoPreview, setPhotoPreview] = useState(null); // State for the image preview

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("/api/donors/me", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store JWT in local storage
//           },
//         });
//         setUser(response.data.data.user);
//       } catch (err) {
//         setError(err.response?.data?.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handlePhotoChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setPhoto(selectedFile);

//     // Create a preview of the selected image
//     if (selectedFile) {
//       const objectUrl = URL.createObjectURL(selectedFile);
//       setPhotoPreview(objectUrl);
//     }
//   };

//   // Remove photo preview and reset state
//   const handleRemovePhoto = () => {
//     setPhoto(null);
//     setPhotoPreview(null);
//   };

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Post Counselor Profile</h2>
//       <div className="mb-4">
//         <strong>Name:</strong> {user.name}
//       </div>
//       <div className="mb-4">
//         <strong>Email:</strong> {user.email}
//       </div>
//       <div className="mb-4">
//         <strong>Role:</strong> {user.role}
//       </div>
//       <div className="mb-4">
//         <strong>Profile Photo:</strong>
//         {photoPreview ? (
//           <img
//             src={photoPreview}
//             alt="Profile Preview"
//             className="w-24 h-24 rounded-full mt-2"
//           />
//         ) : user.photo ? (
//           <img
//             src={user.photo}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mt-2"
//           />
//         ) : (
//           <p className="text-gray-500">No photo uploaded</p>
//         )}
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handlePhotoChange}
//         className="mb-4"
//       />
//       {photo && (
//         <div className="mb-4">
//           <button
//             onClick={handleRemovePhoto}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Remove Photo
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HospitalStaffProfile;
/////////////////////////////\\\\\\\\\\\\\\\
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Optional: for nice alerts

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
        setPhotoPreview(res.data.data.photo); // Show current photo
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

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(user.photo || null);
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
      toast.success("Photo updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

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
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Hospital Staff Profile
        </h2>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-semibold">{user.email || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="text-lg font-semibold capitalize">
              {user.role.replace(/_/g, " ")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Hospital</p>
            <p className="text-lg font-semibold">
              {user.hospitalName || "Not set"}
            </p>
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="shrink-0">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
              <div className="mt-3 flex gap-3">
                {photo && (
                  <>
                    <button
                      onClick={handleUploadPhoto}
                      disabled={uploading}
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-6">Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HospitalStaffProfile;
