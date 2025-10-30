import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NurseReportForm = () => {
  const [action, setAction] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/nurses/writeReport", {
        action,
        details,
      });

      // Assuming the response contains a message
      toast.success(response.data.msg);
      setAction("");
      setDetails("");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(error.response.data.msg || "Error submitting report");
      } else {
        // Network error or other issues
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Nurse Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="action"
          >
            Action
          </label>
          <input
            id="action"
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="details"
          >
            Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Report
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NurseReportForm;
