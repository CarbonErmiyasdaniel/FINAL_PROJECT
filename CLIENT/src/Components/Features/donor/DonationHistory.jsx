// src/Features/donor/DonationHistory.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Droplet } from "lucide-react";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/donor/donations", { withCredentials: true })
      .then((res) => {
        setDonations(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="p-10 text-center">Loading history...</div>;

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Donation History
      </h1>

      {donations.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Droplet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No donations recorded yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {donations.map((d) => (
            <div
              key={d._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <Droplet className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {new Date(d.dateOfDonation).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {d.typeOfDonation || "Whole Blood"} • {d.quantity}ml
                    </p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full font-medium">
                  {d.aboRh}
                </span>
              </div>
              {d.notes && (
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Note: {d.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
