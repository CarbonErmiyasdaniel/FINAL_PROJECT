// src/Features/donor/DonorProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DonorProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("/api/donor/me", { withCredentials: true })
      .then((res) => setProfile(res.data.data.profile));
  }, []);

  if (!profile) {
    return (
      <div className="p-10 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Blood Donor • {profile.donorNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <p className="mt-1 text-lg">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <p className="mt-1 text-lg">{profile.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Blood Type
            </label>
            <p className="mt-1 text-lg font-bold text-red-600">
              {profile.bloodType}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <p className="mt-1 text-lg">
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
