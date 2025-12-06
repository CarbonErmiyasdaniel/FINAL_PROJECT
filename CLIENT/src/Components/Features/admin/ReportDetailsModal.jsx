// src/Features/donor/ReportDetailsModal.jsx (Example Path)
import React from "react";
import { X, BookOpen, User, Calendar, MessageSquare } from "lucide-react";

const ReportDetailsModal = ({ report, onClose }) => {
  if (!report) return null;

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose} // Close modal when clicking backdrop
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="sticky top-0 bg-blue-700 p-5 rounded-t-xl flex justify-between items-center shadow-md">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BookOpen className="w-6 h-6 mr-3" />
            Report Details: {report.action}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition duration-150 p-1 rounded-full hover:bg-blue-600"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Report Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Nurse</p>
                <p className="text-lg font-semibold text-gray-800">
                  {report.nurseId?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {report.nurseId?.email || "No Email"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Report Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatDate(report.reportDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Report Action */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-medium text-blue-700 mb-1 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" /> Action Performed
            </p>
            <p className="text-xl font-bold text-gray-900">{report.action}</p>
          </div>

          {/* Report Details (The full message) */}
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Detailed Notes:
            </p>
            <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap border border-gray-200">
              <p className="text-gray-800 leading-relaxed font-mono text-sm">
                {report.details || "No detailed notes provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-gray-50 rounded-b-xl border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
