import React, { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../Pages/DashboardLayout";
import { UserPen, Loader2 } from "lucide-react";

const occupations = [
  "Teacher",
  "Farmer",
  "Doctor",
  "Engineer",
  "Nurse",
  "Driver",
  "Merchant",
  "Government Employee",
  "Student",
  "Housewife",
  "Unemployed",
];

const ethiopianCities = [
  "Addis Ababa",
  "Debre Brehan",
  "Bahir Dar",
  "Gondar",
  "Mekelle",
  "Hawassa",
  "Adama",
  "Dire Dawa",
];

const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

const RegisterDonorPersonalInfo = () => {
  const { userId } = useParams();

  if (!userId) {
    toast.error("User ID is missing in the URL!");
  }

  const initialFormData = useMemo(
    () => ({
      title: "Mr.",
      fatherName: "",
      surname: "",
      dateOfBirth: "",
      age: "",
      sex: "Male",
      occupation: "",
      donorNumber: "",
      donorSignature: "",
      contact: {
        city: "",
        subCityRegion: "",
        zone: "",
        woreda: "",
        kebele: "",
        residenceAddress: "",
        telephone: "",
        cellphone: "+251",
        pobox: "",
        organization: "",
      },
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // Dynamic dropdowns
  const [zones, setZones] = useState([]);
  const [woredas, setWoredas] = useState([]);
  const [kebeles, setKebeles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Dynamic Location Handlers (MOCK)
  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, city, zone: "", woreda: "", kebele: "" },
    }));

    if (city) setZones(["Zone 1", "Zone 2", "Zone 3"]);
    else setZones([]);
    setWoredas([]);
    setKebeles([]);
  };

  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, zone, woreda: "", kebele: "" },
    }));

    if (zone) setWoredas(["Woreda 1", "Woreda 2", "Woreda 3"]);
    else setWoredas([]);
    setKebeles([]);
  };

  const handleWoredaChange = (e) => {
    const woreda = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, woreda, kebele: "" },
    }));

    if (woreda) setKebeles(["Kebele 1", "Kebele 2", "Kebele 3"]);
    else setKebeles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `/api/nurses/registerDonorInfo/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(data.message || "Personal information saved!");
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to register info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen flex items-start justify-center bg-gray-100 p-4">
        <div className="w-full max-w-6xl p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <UserPen className="text-red-700 w-8 h-8" /> Register Donor Personal
            Info
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PERSONAL INFO SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Title
                  </span>
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputStyle + " appearance-none"}
                >
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                  <option>Eng.</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Father Name
                  </span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Father's Full Name"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Surname
                  </span>
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Surname"
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={inputStyle}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className={inputStyle}
              />
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={inputStyle + " appearance-none"}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Select Occupation</option>
                {occupations.map((job, idx) => (
                  <option key={idx} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>

            {/* CONTACT INFO SECTION */}
            <div className="mt-6 p-6 border border-gray-200 rounded-xl bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                🏠 Contact & Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      City
                    </span>
                  </label>
                  <select
                    name="contact.city"
                    value={formData.contact.city}
                    onChange={handleCityChange}
                    className={inputStyle}
                  >
                    <option value="">Select City</option>
                    {ethiopianCities.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Zone
                    </span>
                  </label>
                  <select
                    name="contact.zone"
                    value={formData.contact.zone}
                    onChange={handleZoneChange}
                    className={inputStyle}
                    disabled={!formData.contact.city && zones.length === 0}
                  >
                    <option value="">Select Zone</option>
                    {zones.map((zone, idx) => (
                      <option key={idx} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Woreda
                    </span>
                  </label>
                  <select
                    name="contact.woreda"
                    value={formData.contact.woreda}
                    onChange={handleWoredaChange}
                    className={inputStyle}
                    disabled={!formData.contact.zone && woredas.length === 0}
                  >
                    <option value="">Select Woreda</option>
                    {woredas.map((w, idx) => (
                      <option key={idx} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Kebele
                    </span>
                  </label>
                  <select
                    name="contact.kebele"
                    value={formData.contact.kebele}
                    onChange={handleChange}
                    className={inputStyle}
                    disabled={!formData.contact.woreda && kebeles.length === 0}
                  >
                    <option value="">Select Kebele</option>
                    {kebeles.map((k, idx) => (
                      <option key={idx} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="contact.subCityRegion"
                  value={formData.contact.subCityRegion}
                  onChange={handleChange}
                  placeholder="Sub-City / Region"
                  className={inputStyle}
                />
                <input
                  type="text"
                  name="contact.residenceAddress"
                  value={formData.contact.residenceAddress}
                  onChange={handleChange}
                  placeholder="Residence Address"
                  className={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <input
                  type="text"
                  name="contact.telephone"
                  value={formData.contact.telephone}
                  onChange={handleChange}
                  placeholder="Telephone"
                  className={inputStyle}
                />
                <input
                  type="tel"
                  name="contact.cellphone"
                  value={formData.contact.cellphone}
                  onChange={handleChange}
                  placeholder="+251XXXXXXXXX"
                  className={inputStyle}
                />
                <input
                  type="text"
                  name="contact.pobox"
                  value={formData.contact.pobox}
                  onChange={handleChange}
                  placeholder="P.O.Box"
                  className={inputStyle}
                />
                <input
                  type="text"
                  name="contact.organization"
                  value={formData.contact.organization}
                  onChange={handleChange}
                  placeholder="Organization"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Donor Number & Signature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <input
                type="text"
                name="donorNumber"
                value={formData.donorNumber}
                onChange={handleChange}
                placeholder="Donor Number"
                className={inputStyle}
              />
              <input
                type="text"
                name="donorSignature"
                value={formData.donorSignature}
                onChange={handleChange}
                placeholder="Donor Signature (URL/Base64)"
                className={inputStyle}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-200 shadow-xl flex items-center justify-center gap-3 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Saving...
                  </>
                ) : (
                  <>
                    <UserPen className="h-5 w-5" /> Submit Information
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegisterDonorPersonalInfo;
