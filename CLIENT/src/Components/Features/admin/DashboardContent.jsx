import React from "react";
import { Users, Heart, ClipboardList, BarChart } from "lucide-react";

const DashboardContent = ({
  metrics,
  loading,
  error,
  toggleLanguage,
  language,
  getTranslation,
}) => (
  <>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
          {getTranslation("title")}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          {getTranslation("subtitle")}
        </p>
      </div>
      <button
        onClick={toggleLanguage}
        className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-800"
      >
        {language === "EN" ? "አማርኛ" : "English"}
      </button>
    </div>

    <hr className="border-gray-300 dark:border-gray-600 mb-8" />

    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      {getTranslation("metrics_title")}
    </h2>

    {loading ? (
      <div className="text-center text-gray-500 animate-pulse">
        Loading metrics...
      </div>
    ) : error ? (
      <div className="text-center text-red-600">{error}</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-indigo-600 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center p-3 text-white bg-indigo-600 rounded-lg mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Donors
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {metrics.totalDonors}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-red-600 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center p-3 text-white bg-red-600 rounded-lg mr-4">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Blood Units (In Stock)
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {metrics.bloodUnits} U
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-green-600 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center p-3 text-white bg-green-600 rounded-lg mr-4">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Active Drives
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {metrics.activeDrives}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-l-4 border-orange-600 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center">
            <div className="flex items-center justify-center p-3 text-white bg-orange-600 rounded-lg mr-4">
              <BarChart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Critical Shortages
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {metrics.criticalShortages}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

export default DashboardContent;
