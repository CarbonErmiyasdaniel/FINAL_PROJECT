import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// Assuming DashboardLayout is at the correct path
import DashboardLayout from "../../Pages/DashboardLayout";
import { UserPen, Loader2 } from "lucide-react";

const inputStyle =
  "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150";

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

const UpdateDonorPersonalInfo = () => {
  const { donorId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const initialFormData = useMemo(
    () => ({
      title: "Mr.",
      fatherName: "",
      surname: "",
      dateOfBirth: "",
      age: "",
      sex: "Male",
      occupation: "",
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
      donorNumber: "",
      donorSignature: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);

  // States for dynamic dropdowns (Zone, Woreda, Kebele)
  const [zones, setZones] = useState([]);
  const [woredas, setWoredas] = useState([]);
  const [kebeles, setKebeles] = useState([]);

  // ***************************************************************
  // Fetch Existing Donor Data
  // ***************************************************************
  useEffect(() => {
    const fetchDonorData = async () => {
      if (!donorId) {
        setIsFetching(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/nurses/getAllDonorInfo/${donorId}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;

        // Merge fetched data with initial structure for robustness
        const updatedContact = {
          ...initialFormData.contact,
          ...(data.contact || {}),
          cellphone: data.contact?.cellphone || "+251",
        };

        const updatedFormData = {
          ...initialFormData,
          ...data,
          contact: updatedContact,
        };

        setFormData(updatedFormData);

        // NOTE: In a real app, you would call APIs here to populate
        // zones/woredas/kebeles based on the fetched city/zone/woreda.
        // For example:
        // if (updatedContact.city) fetchZones(updatedContact.city);
        // if (updatedContact.zone) fetchWoredas(updatedContact.zone);
        // if (updatedContact.woreda) fetchKebeles(updatedContact.woreda);

        // Simulating immediate population of dropdowns if data exists (for display)
        if (updatedContact.city) setZones(["Zone 1", "Zone 2", "Zone 3"]);
        if (updatedContact.zone)
          setWoredas(["Woreda 1", "Woreda 2", "Woreda 3"]);
        if (updatedContact.woreda)
          setKebeles(["Kebele 1", "Kebele 2", "Kebele 3"]);
      } catch (err) {
        console.error("Error fetching donor data:", err);
        toast.error("Failed to load existing donor information.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchDonorData();
  }, [donorId, initialFormData]);

  // ***************************************************************
  // Handle form input changes
  // ***************************************************************
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

  // ***************************************************************
  // Dynamic Location Handlers (MOCK data)
  // ***************************************************************
  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, city, zone: "", woreda: "", kebele: "" },
    }));

    // MOCK: dynamically populate zones
    if (city) {
      setZones(["Zone 1", "Zone 2", "Zone 3"]);
    } else {
      setZones([]);
    }
    setWoredas([]);
    setKebeles([]);
  };

  const handleZoneChange = (e) => {
    const zone = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, zone, woreda: "", kebele: "" },
    }));

    // MOCK: dynamically populate woredas
    if (zone) {
      setWoredas(["Woreda 1", "Woreda 2", "Woreda 3"]);
    } else {
      setWoredas([]);
    }
    setKebeles([]);
  };

  const handleWoredaChange = (e) => {
    const woreda = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, woreda, kebele: "" },
    }));

    // MOCK: dynamically populate kebeles
    if (woreda) {
      setKebeles(["Kebele 1", "Kebele 2", "Kebele 3"]);
    } else {
      setKebeles([]);
    }
  };

  // ***************************************************************
  // Handle Form Submission (PUT)
  // ***************************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/nurses/updateDonorInfo/${donorId}`, formData, {
        withCredentials: true,
      });
      toast.success("Donor personal info updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to update donor info");
    } finally {
      setIsLoading(false);
    }
  };

  // ***************************************************************
  // Render
  // ***************************************************************

  if (isFetching) {
    return (
      <DashboardLayout>
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
            <Loader2 className="animate-spin h-12 w-12 text-red-700 mb-4" />
            <p className="text-lg text-gray-700">Loading Donor Data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen flex items-start justify-center bg-gray-100 p-4">
        <div className="w-full max-w-6xl p-8 bg-white rounded-xl shadow-2xl border-t-4 border-red-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <UserPen className="text-red-700 w-8 h-8" /> Update Donor Personal
            Info (ID: {donorId})
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4" key={donorId}>
            {/* PERSONAL INFO SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Title */}
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

              {/* Father Name */}
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

              {/* Surname */}
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
              {/* Date of Birth */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              {/* Age */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Age
                  </span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className={inputStyle}
                  min="0"
                  max="150"
                />
              </div>

              {/* Sex */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Sex
                  </span>
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className={inputStyle + " appearance-none"}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Occupation
                  </span>
                </label>
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
            </div>

            {/* CONTACT INFO SECTION */}
            <div className="mt-6 p-6 border border-gray-200 rounded-xl bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                🏠 Contact & Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* City */}
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

                {/* Zone */}
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

                {/* Woreda */}
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

                {/* Kebele */}
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
                {/* Sub-City/Region */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Sub-City / Region
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contact.subCityRegion"
                    value={formData.contact.subCityRegion}
                    onChange={handleChange}
                    placeholder="Sub-City or Region"
                    className={inputStyle}
                  />
                </div>

                {/* Residence Address */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Residence Address (Specific)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contact.residenceAddress"
                    value={formData.contact.residenceAddress}
                    onChange={handleChange}
                    placeholder="E.g. House No., Street"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                {/* Telephone */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Telephone (Landline)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contact.telephone"
                    value={formData.contact.telephone}
                    onChange={handleChange}
                    placeholder="Office or Home Phone"
                    className={inputStyle}
                  />
                </div>

                {/* Cellphone */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Cellphone (+251)
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="contact.cellphone"
                    value={formData.contact.cellphone}
                    onChange={handleChange}
                    className={inputStyle}
                    pattern="\+251[0-9]{9,}" // Adjusted pattern to be more flexible
                    placeholder="+251XXXXXXXXX"
                  />
                </div>

                {/* P.O.Box */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      P.O.Box
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contact.pobox"
                    value={formData.contact.pobox}
                    onChange={handleChange}
                    placeholder="P.O.Box Number"
                    className={inputStyle}
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Organization
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contact.organization"
                    value={formData.contact.organization}
                    onChange={handleChange}
                    placeholder="Donor's Organization/Company"
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Donor Number & Signature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Donor Number
                  </span>
                </label>
                <input
                  type="text"
                  name="donorNumber"
                  value={formData.donorNumber}
                  onChange={handleChange}
                  placeholder="Donor Number"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Donor Signature (URL or Base64)
                  </span>
                </label>
                <input
                  type="text"
                  name="donorSignature"
                  value={formData.donorSignature}
                  onChange={handleChange}
                  placeholder="Signature URL or Data"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-200 shadow-xl flex items-center justify-center gap-3 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300/50"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Updating...
                  </>
                ) : (
                  <>
                    <UserPen className="h-5 w-5" /> Update Donor Info
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

export default UpdateDonorPersonalInfo;
