import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";

const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

const bloodTypes = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];
const donationTypes = [
  "Whole Blood",
  "Plasma",
  "Platelets",
  "Double Red Cells",
];

const RegisterDonation = () => {
  const { donorId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    dateOfDonation: "",
    bloodPressure: "",
    hemoglobinLevel: "",
    aboRh: "Unknown",
    typeOfDonation: "Whole Blood",
    quantity: 450,
    isDeferred: false,
    deferralReason: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`/api/nurses/registerDonation/${donorId}`, formData, {
        withCredentials: true,
      });

      toast.success("Donation registered successfully!");
      setFormData({
        dateOfDonation: "",
        bloodPressure: "",
        hemoglobinLevel: "",
        aboRh: "Unknown",
        typeOfDonation: "Whole Blood",
        quantity: 450,
        isDeferred: false,
        deferralReason: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Failed to register donation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
          <UserPlus className="text-red-700 w-8 h-8" /> Register Donation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Donation Date */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Date of Donation
              </span>
            </label>
            <input
              type="date"
              name="dateOfDonation"
              value={formData.dateOfDonation}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Blood Pressure */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Blood Pressure
              </span>
            </label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="e.g., 120/80 mmHg"
              className={inputStyle}
            />
          </div>

          {/* Hemoglobin Level */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Hemoglobin Level (g/dL)
              </span>
            </label>
            <input
              type="number"
              name="hemoglobinLevel"
              value={formData.hemoglobinLevel}
              onChange={handleChange}
              placeholder="e.g., 13.5"
              className={inputStyle}
              step="0.1"
            />
          </div>

          {/* ABO/Rh */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                ABO/Rh
              </span>
            </label>
            <select
              name="aboRh"
              value={formData.aboRh}
              onChange={handleChange}
              className={inputStyle + " appearance-none"}
            >
              {bloodTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Type of Donation */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Type of Donation
              </span>
            </label>
            <select
              name="typeOfDonation"
              value={formData.typeOfDonation}
              onChange={handleChange}
              className={inputStyle + " appearance-none"}
            >
              {donationTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Quantity (ml)
              </span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={inputStyle}
              min="0"
            />
          </div>

          {/* Deferred */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDeferred"
              checked={formData.isDeferred}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <label className="font-medium text-gray-700">Is Deferred?</label>
          </div>

          {/* Deferral Reason */}
          {formData.isDeferred && (
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Deferral Reason
                </span>
              </label>
              <input
                type="text"
                name="deferralReason"
                value={formData.deferralReason}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Reason for deferral"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Notes
              </span>
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Any additional notes"
              rows="3"
            />
          </div>

          {/* Submit */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white font-semibold rounded-none transition duration-200 shadow-xl flex items-center justify-center gap-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Registering...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" /> Register Donation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDonation;
