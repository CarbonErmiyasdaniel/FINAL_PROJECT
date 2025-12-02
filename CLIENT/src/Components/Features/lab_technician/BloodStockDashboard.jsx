// components/lab/BloodStockDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { Droplet, AlertTriangle, Package, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";

const BloodStockDashboard = () => {
  const [stock, setStock] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const fetchStock = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/lab_technician/inventory/stock", {
        withCredentials: true,
      });

      setStock(res.data.stock || {});
      setDetails(res.data.details || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blood stock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
    const interval = setInterval(fetchStock, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Count expiring soon (within 7 days)
  const expiringSoon = details.filter((item) => {
    const daysLeft = differenceInDays(new Date(item.expiryDate), new Date());
    return daysLeft >= 0 && daysLeft <= 7;
  }).length;

  const totalBags = Object.values(stock).reduce((a, b) => a + b, 0);
  const totalVolume = details.reduce((sum, item) => sum + item.volume, 0);

  const getBloodTypeColor = (type) => {
    const colors = {
      "O-": "bg-red-600 text-white",
      "O+": "bg-red-500 text-white",
      "A-": "bg-orange-600 text-white",
      "A+": "bg-orange-500 text-white",
      "B-": "bg-amber-600 text-white",
      "B+": "bg-amber-500 text-white",
      "AB-": "bg-purple-600 text-white",
      "AB+": "bg-purple-500 text-white",
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Blood Inventory Stock
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time available blood units for hospital supply
          </p>
        </div>
        <button
          onClick={fetchStock}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-3"
        >
          <Package className="w-5 h-5" />
          Refresh Stock
        </button>
      </div>

      {/* Alert: Expiring Soon */}
      {expiringSoon > 0 && (
        <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-400 rounded-2xl p-6 flex items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-red-600" />
          <div>
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">
              Warning: {expiringSoon} bag{expiringSoon > 1 ? "s" : ""} expiring
              soon!
            </h3>
            <p className="text-red-700 dark:text-red-400">
              These units will expire within 7 days. Consider issuing urgently.
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Available Bags</p>
              <p className="text-4xl font-black mt-2">{totalBags}</p>
            </div>
            <Droplet className="w-16 h-16 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Volume</p>
              <p className="text-4xl font-black mt-2">{totalVolume} mL</p>
            </div>
            <Package className="w-16 h-16 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Blood Types in Stock</p>
              <p className="text-4xl font-black mt-2">
                {Object.keys(stock).filter((t) => stock[t] > 0).length}/8
              </p>
            </div>
            <Calendar className="w-16 h-16 opacity-50" />
          </div>
        </div>
      </div>

      {/* Blood Type Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bloodTypes.map((type) => {
          const count = stock[type] || 0;
          const isLow = count <= 2 && count > 0;
          const isEmpty = count === 0;

          return (
            <div
              key={type}
              className={`relative p-8 rounded-3xl shadow-xl text-center transition-all transform hover:scale-105 ${
                isEmpty
                  ? "bg-gray-100 dark:bg-gray-800 border-4 border-dashed border-gray-300"
                  : isLow
                  ? "bg-orange-50 dark:bg-orange-900/30 border-4 border-orange-500"
                  : "bg-white dark:bg-gray-800 border border-gray-200"
              }`}
            >
              <div className="absolute top-3 right-3">
                {isLow && (
                  <AlertTriangle className="w-8 h-8 text-orange-600 animate-pulse" />
                )}
              </div>

              <div
                className={`text-5xl font-black ${getBloodTypeColor(
                  type
                )} mb-4 py-3 rounded-2xl`}
              >
                {type}
              </div>

              <div className="text-4xl font-black text-gray-800 dark:text-white">
                {count}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {count === 1 ? "bag" : "bags"} available
              </p>

              {isEmpty && (
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 font-medium">
                  Out of Stock
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed List (Optional - collapsible or on separate page) */}
      {details.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Available Units Details
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {details.map((unit) => {
                const daysLeft = differenceInDays(
                  new Date(unit.expiryDate),
                  new Date()
                );
                const isExpiring = daysLeft <= 7 && daysLeft >= 0;

                return (
                  <div
                    key={unit._id}
                    className={`p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center ${
                      isExpiring ? "bg-red-50 dark:bg-red-900/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 ${getBloodTypeColor(
                          unit.bloodType
                        )} rounded-xl flex items-center justify-center text-2xl font-black text-white`}
                      >
                        {unit.bloodType}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{unit.donationId}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Collected:{" "}
                          {format(new Date(unit.collectionDate), "dd MMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{unit.volume} mL</p>
                      <p
                        className={`text-sm font-medium ${
                          isExpiring ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        Expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodStockDashboard;
