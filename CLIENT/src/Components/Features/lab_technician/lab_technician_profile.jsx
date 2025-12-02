// src/Features/lab_technician/lab_technician_profile.jsx
import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  IdCard,
  Building,
  Award,
} from "lucide-react";

const LabTechnicianProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Laboratory technician information and credentials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="relative inline-block">
              <img
                src="https://via.placeholder.com/150/4B5565/FFFFFF?text=LT"
                alt="Technician"
                className="w-32 h-32 rounded-full mx-auto border-4 border-red-600"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">
              Dr. Selamawit Tesfaye
            </h2>
            <p className="text-red-600 font-semibold">Senior Lab Technician</p>
            <p className="text-gray-500 mt-2">
              Blood Testing & Screening Department
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
                <IdCard className="w-5 h-5" />
                <span>ID: LT-2024-087</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
                <Award className="w-5 h-5" />
                <span>Certified since 2018</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <User className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Selamawit Tesfaye Worku
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    selamawit@bloodcenter.et
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    +251 911 234 567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    March 15, 2018
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Summary
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Experienced laboratory technician with over 7 years in blood
                screening and infectious disease testing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">Check</span>
                  <span>
                    Expert in HIV, HBV, HCV, and Syphilis screening using ELISA
                    and rapid tests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">Check</span>
                  <span>
                    Trained 12 junior technicians in blood safety protocols
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">Check</span>
                  <span>
                    Maintained 99.8% accuracy rate in test results (2024)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTechnicianProfile;
