import React, { useEffect, useState } from "react";
import axios from "axios";

const LabTechnicianProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null); // State for the uploaded photo
  const [photoPreview, setPhotoPreview] = useState(null); // State for the image preview

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/donors/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store JWT in local storage
          },
        });
        setUser(response.data.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile);

    // Create a preview of the selected image
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPhotoPreview(objectUrl);
    }
  };

  // Remove photo preview and reset state
  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Donor Profile</h2>
      <div className="mb-4">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-4">
        <strong>Role:</strong> {user.role}
      </div>
      <div className="mb-4">
        <strong>Profile Photo:</strong>
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full mt-2"
          />
        ) : user.photo ? (
          <img
            src={user.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full mt-2"
          />
        ) : (
          <p className="text-gray-500">No photo uploaded</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="mb-4"
      />
      {photo && (
        <div className="mb-4">
          <button
            onClick={handleRemovePhoto}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default LabTechnicianProfile;
