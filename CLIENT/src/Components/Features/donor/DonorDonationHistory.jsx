import React, { useState, useEffect } from "react";
import axios from "axios";

const getToken = () => localStorage.getItem("token");

// Helper function to determine the color/status of the test result
const getTestStatus = (finalResult) => {
  switch (finalResult) {
    case "Safe":
      return { text: "Safe", className: "bg-green-600" };
    case "Unsafe":
      return { text: "Unsafe", className: "bg-red-600" };
    case "Pending":
    default:
      return { text: "Pending", className: "bg-yellow-600" };
  }
};

const DonorDonationHistory = () => {
  const [history, setHistory] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = getToken();
      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        // Hitting the new endpoint
        const response = await axios.get("/api/donor/me/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(response.data.history);
        setEligibility(response.data.eligibility);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message || "Failed to fetch donation history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading donation history...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 p-6 text-center border border-red-300 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
        🩸 My Donation History
      </h2>

      {/* Eligibility Card */}
      <div
        className={`p-4 mb-6 rounded-lg ${
          eligibility?.isEligible
            ? "bg-green-100 border-l-4 border-green-600"
            : "bg-yellow-100 border-l-4 border-yellow-600"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">
          Next Donation Eligibility
        </h3>
        {eligibility?.isEligible ? (
          <p className="text-green-700 font-bold text-lg">
            🎉 You are **currently eligible** to donate!
          </p>
        ) : (
          <>
            {eligibility?.nextDate ? (
              <p className="text-yellow-800">
                You can donate again on or after:{" "}
                <span className="font-bold text-lg">
                  {eligibility.nextDate}
                </span>
              </p>
            ) : (
              <p className="text-yellow-800">
                No previous donation found. You are eligible to donate for the
                first time!
              </p>
            )}
            {eligibility?.daysRemaining > 0 && (
              <p className="text-sm mt-1">
                That's **{eligibility.daysRemaining} days** remaining until
                eligibility.
              </p>
            )}
          </>
        )}
      </div>

      <h3 className="text-2xl font-semibold mb-4 border-t pt-4">
        Past Donations ({history.length})
      </h3>

      {history.length === 0 && (
        <p className="text-gray-500">No past donations recorded yet.</p>
      )}

      <ul className="space-y-4">
        {history.map((donation) => {
          // FIX: Removed the unused 'index' variable here
          const status = getTestStatus(donation.finalResult);
          return (
            <li
              key={donation._id}
              className="border p-4 rounded-md shadow-lg hover:shadow-xl transition duration-200"
            >
              <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="font-bold text-xl text-gray-800">
                  {new Date(donation.dateOfDonation).toDateString()}
                </span>
                <span
                  className={`text-white px-3 py-1 text-sm font-bold rounded ${status.className}`}
                >
                  Result: {status.text}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm">
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {donation.typeOfDonation || "N/A"} ({donation.quantity}ml)
                </p>
                <p>
                  <span className="font-semibold">Blood Group:</span>{" "}
                  {donation.aboRh}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-2 py-0.5 ml-1 text-xs font-medium rounded-full ${
                      donation.isDeferred
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {donation.isDeferred ? "Deferred" : "Successful Collection"}
                  </span>
                </p>
              </div>

              {donation.isDeferred && (
                <p className="text-sm text-red-600 mt-2">
                  <span className="font-bold">Deferral Reason:</span> *
                  {donation.deferralReason}*
                </p>
              )}

              {/* Detailed Test Results (Optional for Donor) */}
              {donation.isTested &&
                donation.screeningTests &&
                status.text !== "Pending" && (
                  <div className="mt-3 pt-2 border-t text-xs text-gray-600">
                    <span className="font-bold">Screening Tests: </span>
                    {Object.entries(donation.screeningTests).map(
                      ([test, result]) => (
                        <span
                          key={test}
                          className={`ml-3 ${
                            result === "Positive"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {test.toUpperCase()}: {result}
                        </span>
                      )
                    )}
                  </div>
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DonorDonationHistory;
