// src/Features/donor/DonorDashboardHome.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Calendar, Droplet, User } from "lucide-react";

const DonorDashboardHome = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/donor/me", { withCredentials: true })
      .then((res) => {
        setDonor(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600"></div>
      </div>
    );
  }

  const { profile, stats } = donor || {};

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Welcome back, {profile?.name || "Donor"}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thank you for saving lives
        </p>
      </div>

      {/* Next Donation Card */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Next Eligible Donation</h2>
            {stats?.canDonateNow ? (
              <p className="text-4xl font-black">You can donate TODAY!</p>
            ) : (
              <p className="text-4xl font-black">
                {stats?.daysUntilNext || "?"} days left
              </p>
            )}
            <p className="mt-2 text-lg opacity-90">
              {stats?.nextEligibleDate
                ? new Date(stats.nextEligibleDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No record yet"}
            </p>
          </div>
          <Heart className="w-24 h-24 opacity-30" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 border-red-600">
          <div className="flex items-center">
            <Droplet className="w-10 h-10 text-red-600 mr-4" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Blood Type</p>
              <p className="text-2xl font-bold">{profile?.bloodType || "—"}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 border-blue-600">
          <div className="flex items-center">
            <Calendar className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Total Donations
              </p>
              <p className="text-2xl font-bold">{stats?.totalDonations || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-l-4 border-green-600">
          <div className="flex items-center">
            <User className="w-10 h-10 text-green-600 mr-4" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Donor ID</p>
              <p className="text-xl font-mono font-bold">
                {profile?.donorNumber || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">
          Every donation can save up to{" "}
          <span className="font-bold text-red-600">3 lives</span>
        </p>
      </div>
    </div>
  );
};

export default DonorDashboardHome;
