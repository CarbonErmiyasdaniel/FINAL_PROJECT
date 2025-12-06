import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import {
  Droplet,
  AlertTriangle,
  Package,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminBloodStockDashboard = () => {
  const [stock, setStock] = useState({});
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Use useCallback for fetchStock to ensure stability in useEffect dependency array
  const fetchStock = useCallback(async () => {
    try {
      setLoading(true);
      // Ensure this API endpoint and credentials are correctly configured in the environment
      const res = await axios.get("/api/admins/inventory/stock", {
        withCredentials: true,
      });

      setStock(res.data.stock || {});
      setDetails(res.data.details || []);
    } catch (err) {
      console.error("API Error fetching stock:", err);
      // Using react-hot-toast for notification
      toast.error("Failed to load blood stock. Check network and API.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchStock();
    // Set up auto-refresh
    const interval = setInterval(fetchStock, 60000); // Refresh every minute
    return () => clearInterval(interval); // Cleanup function
  }, [fetchStock]); // Depend on fetchStock

  // Count expiring soon (within 7 days)
  const expiringSoon = details.filter((item) => {
    const daysLeft = differenceInDays(new Date(item.expiryDate), new Date());
    return daysLeft >= 0 && daysLeft <= 7;
  }).length;

  const totalBags = Object.values(stock).reduce((a, b) => a + b, 0);
  const totalVolume = details.reduce((sum, item) => sum + item.volume, 0);

  // Original color map (used sparingly for the blood type tag)
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

  if (loading && details.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-none shadow-lg">
        <RefreshCw className="animate-spin h-12 w-12 text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Blood Inventory Stock 🩸
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Real-time available blood units for hospital supply. Last updated:{" "}
            {format(new Date(), "hh:mm:ss a")}
          </p>
        </div>
        <button
          onClick={fetchStock}
          className="mt-4 md:mt-0 px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold shadow-md transition duration-200 border border-red-900 text-sm flex items-center gap-2 rounded-none" // Sharp edges
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh Stock"}
        </button>
      </div>
      ---
      {/* Alert: Expiring Soon */}
      {expiringSoon > 0 && (
        <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-700 p-4 flex items-center gap-4 shadow-lg rounded-none">
          <AlertTriangle className="w-8 h-8 text-red-700 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-red-800 dark:text-red-200">
              URGENT: {expiringSoon} bag{expiringSoon > 1 ? "s" : ""} expiring
              soon!
            </h3>
            <p className="text-red-700 dark:text-red-400 text-sm">
              These units will expire within 7 days. Action is required.
            </p>
          </div>
        </div>
      )}
      ---
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Bags (Red Focus) */}
        <div className="bg-white dark:bg-gray-800 border-t-4 border-red-700 p-6 shadow-xl rounded-none transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                Total Available Bags
              </p>
              <p className="text-5xl font-extrabold mt-2 text-red-700">
                {totalBags}
              </p>
            </div>
            <Droplet className="w-10 h-10 text-red-400 opacity-70" />
          </div>
        </div>

        {/* Card 2: Total Volume (Gray/Blue Focus) */}
        <div className="bg-white dark:bg-gray-800 border-t-4 border-gray-400 p-6 shadow-xl rounded-none transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                Total Volume
              </p>
              <p className="text-5xl font-extrabold mt-2 text-gray-800 dark:text-white">
                {totalVolume} mL
              </p>
            </div>
            <Package className="w-10 h-10 text-gray-400 opacity-70" />
          </div>
        </div>

        {/* Card 3: Blood Types Count (Gray/Green Focus) */}
        <div className="bg-white dark:bg-gray-800 border-t-4 border-emerald-600 p-6 shadow-xl rounded-none transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                Blood Types in Stock
              </p>
              <p className="text-5xl font-extrabold mt-2 text-emerald-600">
                {Object.keys(stock).filter((t) => stock[t] > 0).length}/8
              </p>
            </div>
            <Calendar className="w-10 h-10 text-emerald-400 opacity-70" />
          </div>
        </div>
      </div>
      ---
      {/* Blood Type Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {bloodTypes.map((type) => {
          const count = stock[type] || 0;
          const isLow = count <= 2 && count > 0;
          const isEmpty = count === 0;

          return (
            <div
              key={type}
              className={`relative p-6 md:p-8 shadow-md text-center transition-all transform hover:scale-[1.02] duration-200 border-b-4 ${
                isEmpty
                  ? "bg-gray-100 dark:bg-gray-800 border-dashed border-gray-400"
                  : isLow
                  ? "bg-white dark:bg-gray-800 border-orange-500"
                  : "bg-white dark:bg-gray-800 border-green-600"
              } rounded-none`}
            >
              <div className="absolute top-3 right-3">
                {isLow && (
                  <AlertTriangle className="w-6 h-6 text-orange-600 animate-bounce" />
                )}
              </div>

              {/* Minimized color band for blood type */}
              <div
                className={`text-3xl font-black ${getBloodTypeColor(
                  type
                )} mb-4 py-2 px-2 inline-block rounded-none border border-current`}
              >
                {type}
              </div>

              <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {count}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {count === 1 ? "bag" : "bags"} available
              </p>

              {isEmpty && (
                <p className="text-red-500 text-xs mt-3 font-medium">
                  Out of Stock - Order Now
                </p>
              )}
            </div>
          );
        })}
      </div>
      ---
      {/* Detailed List */}
      {details.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-300">
            Available Units Details
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl overflow-hidden rounded-none border border-gray-200">
            <div className="max-h-[30rem] overflow-y-auto">
              {/* List Header for Desktop */}
              <div className="hidden md:flex p-4 border-b bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm">
                <span className="w-1/12">Type</span>
                <span className="w-3/12">Unit ID</span>
                <span className="w-3/12">Collection Date</span>
                <span className="w-2/12 text-right">Volume</span>
                <span className="w-3/12 text-right">Expiration</span>
              </div>

              {details.map((unit) => {
                const daysLeft = differenceInDays(
                  new Date(unit.expiryDate),
                  new Date()
                );
                const isExpiring = daysLeft <= 7 && daysLeft >= 0;
                const statusClasses = isExpiring
                  ? "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 hover:bg-red-100"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700";

                return (
                  <div
                    key={unit._id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 transition duration-150 cursor-pointer ${statusClasses}`}
                  >
                    {/* Desktop View */}
                    <div className="hidden md:flex justify-between items-center text-gray-800 dark:text-gray-200">
                      <span className="w-1/12">
                        <span
                          className={`text-sm font-black ${getBloodTypeColor(
                            unit.bloodType
                          )} px-2 py-1 inline-block rounded-none`}
                        >
                          {unit.bloodType}
                        </span>
                      </span>
                      <span className="w-3/12 font-medium text-sm">
                        {unit.donationId}
                      </span>
                      <span className="w-3/12 text-sm">
                        {format(new Date(unit.collectionDate), "dd MMM yyyy")}
                      </span>
                      <span className="w-2/12 text-right font-bold">
                        {unit.volume} mL
                      </span>
                      <span
                        className={`w-3/12 text-right font-bold text-sm ${
                          isExpiring
                            ? "text-red-700"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                      </span>
                    </div>

                    {/* Mobile/Tablet View (Stacked) */}
                    <div className="md:hidden space-y-2 text-sm">
                      <div className="flex justify-between items-center font-bold">
                        <span
                          className={`text-lg font-black ${getBloodTypeColor(
                            unit.bloodType
                          )} px-3 py-1 inline-block rounded-none`}
                        >
                          {unit.bloodType}
                        </span>
                        <span
                          className={`font-bold ${
                            isExpiring ? "text-red-700" : "text-gray-700"
                          }`}
                        >
                          {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Unit ID:</span>{" "}
                        {unit.donationId}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Collected:</span>{" "}
                        {format(new Date(unit.collectionDate), "dd MMM yyyy")}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Volume:</span>{" "}
                        {unit.volume} mL
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

export default AdminBloodStockDashboard;
