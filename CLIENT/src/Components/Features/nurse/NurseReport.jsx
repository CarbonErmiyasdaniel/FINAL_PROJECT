// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const NurseReportForm = () => {
//   const [action, setAction] = useState("");
//   const [details, setDetails] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/nurses/writeReport", {
//         action,
//         details,
//       });

//       // Assuming the response contains a message
//       toast.success(response.data.msg);
//       setAction("");
//       setDetails("");
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a status other than 200 range
//         toast.error(error.response.data.msg || "Error submitting report");
//       } else {
//         // Network error or other issues
//         toast.error("Server error. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Submit Nurse Report</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="action"
//           >
//             Action
//           </label>
//           <input
//             id="action"
//             type="text"
//             value={action}
//             onChange={(e) => setAction(e.target.value)}
//             required
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="details"
//           >
//             Details
//           </label>
//           <textarea
//             id="details"
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             required
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             rows="4"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
//         >
//           Submit Report
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default NurseReportForm;
// src/Components/NurseReportForm.jsx or any path you use
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NurseReportForm = () => {
  const [action, setAction] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/nurses/writeReport", {
        action,
        details,
      });

      toast.success(response.data.msg || "Report submitted successfully!");
      setAction("");
      setDetails("");
    } catch (error) {
      toast.error(
        error.response?.data?.msg ||
          "Failed to submit report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* White Card with Border */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Nurse Daily Report
            </h1>
            <p className="mt-3 text-lg opacity-90">Submit your shift summary</p>
          </div>

          {/* Form Body */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Action Field */}
              <div>
                <label
                  htmlFor="action"
                  className="block text-lg font-semibold text-gray-800 mb-3"
                >
                  Action Taken
                </label>
                <input
                  id="action"
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="e.g., Collected blood from 12 donors, assisted in registration"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-200 disabled:bg-gray-100"
                />
              </div>

              {/* Details Field */}
              <div>
                <label
                  htmlFor="details"
                  className="block text-lg font-semibold text-gray-800 mb-3"
                >
                  Detailed Report
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  disabled={loading}
                  rows={8}
                  placeholder="Write about donor reactions, equipment status, any issues, observations, etc..."
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-200 resize-none disabled:bg-gray-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 text-xl font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                }`}
              >
                {loading ? "Submitting Report..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default NurseReportForm;
