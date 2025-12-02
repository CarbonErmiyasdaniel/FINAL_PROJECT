import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Loader2,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-500/30 transition duration-200";

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
  const location = useLocation();
  const navigate = useNavigate();
  const donorId = location.state?.donorId;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfDonation: new Date().toISOString().split("T")[0],
    bloodPressure: "",
    hemoglobinLevel: "",
    aboRh: "Unknown",
    typeOfDonation: "Whole Blood",
    quantity: 450,
    isDeferred: false,
    deferralReason: "",
    notes: "",
  });

  useEffect(() => {
    if (!donorId) {
      toast.error("Invalid Donor ID. Redirecting...");
      setTimeout(() => navigate("/nurse/Donor_List"), 2000);
    }
  }, [donorId, navigate]);

  if (!donorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-16 w-16 text-red-600 mx-auto mb-6" />
          <p className="text-2xl font-bold text-gray-800">Invalid Donor ID</p>
          <p className="text-lg text-gray-600 mt-2">
            Redirecting to donor list...
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.dateOfDonation) {
      toast.error("Please select a donation date");
      return false;
    }
    if (formData.isDeferred && !formData.deferralReason.trim()) {
      toast.error("Please provide a reason for deferral");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.post(`/api/nurses/registerDonation/${donorId}`, formData, {
        withCredentials: true,
      });
      toast.success("Donation registered successfully!");
      setTimeout(() => navigate("/nurse/Donor_List"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register donation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-5 bg-white rounded-full px-10 py-6 shadow-2xl border-4 border-red-700">
              <UserPlus className="w-14 h-14 text-red-700" />
              <h1 className="text-5xl font-extrabold text-gray-900">
                Register Blood Donation
              </h1>
            </div>
            <p className="mt-6 text-2xl text-gray-800">
              Donor ID:{" "}
              <span className="font-mono bg-red-100 text-red-800 px-6 py-3 rounded-2xl text-xl font-bold">
                {donorId}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-3xl border-t-8 border-red-700 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              <div>
                <label className="flex text-lg font-bold text-gray-800 mb-3 items-center gap-3">
                  <Calendar className="w-6 h-6 text-red-600" />
                  Date of Donation <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfDonation"
                  value={formData.dateOfDonation}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className={inputStyle}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    placeholder="120/80"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Hemoglobin (g/dL)
                  </label>
                  <input
                    type="number"
                    name="hemoglobinLevel"
                    value={formData.hemoglobinLevel}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="13.5"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Blood Type
                  </label>
                  <select
                    name="aboRh"
                    value={formData.aboRh}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Donation Type
                  </label>
                  <select
                    name="typeOfDonation"
                    value={formData.typeOfDonation}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    {donationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Quantity (ml)
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className={inputStyle}
                />
              </div>

              <div className="p-8 bg-red-50 border-4 border-red-300 rounded-3xl">
                <label className="flex items-center gap-5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDeferred"
                    checked={formData.isDeferred}
                    onChange={handleChange}
                    className="w-7 h-7 text-red-700 rounded"
                  />
                  <span className="text-2xl font-bold text-red-800">
                    Mark as Deferred
                  </span>
                </label>
                {formData.isDeferred && (
                  <div className="mt-6">
                    <label className="block text-lg font-bold text-gray-800 mb-3">
                      Deferral Reason *
                    </label>
                    <input
                      type="text"
                      name="deferralReason"
                      value={formData.deferralReason}
                      onChange={handleChange}
                      placeholder="e.g., Low hemoglobin"
                      className={`${inputStyle} border-red-500`}
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="5"
                  className={inputStyle}
                />
              </div>

              <div className="pt-10 border-t-4 border-gray-300">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-6 px-10 text-white font-extrabold text-3xl rounded-3xl shadow-2xl flex items-center justify-center gap-5 transition-all ${
                    isLoading ? "bg-gray-500" : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-12 w-12" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-12 w-12" />
                      Register Donation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={8000} theme="light" />
    </>
  );
};

export default RegisterDonation;
