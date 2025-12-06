import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const DonorProfile = () => {
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
      const res = await axios.get("/api/donor/me", {
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
      const res = await axios.patch("/api/donor/photo", formData, {
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
        "/api/donor/change-password", // Updated endpoint
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
                    {user.hospitalName || ""}
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

export default DonorProfile;
