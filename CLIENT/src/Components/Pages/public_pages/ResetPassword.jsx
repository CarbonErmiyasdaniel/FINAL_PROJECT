import React, { useState } from "react";
import axios from "axios";
import { FaTint, FaLock, FaLanguage } from "react-icons/fa"; // 👈 Added FaLanguage
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [language, setLanguage] = useState("en"); // 👈 Added language state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  // 🔑 UPDATED TRANSLATION OBJECT with both languages
  const translations = {
    en: {
      title: "Reset Password",
      instructions: "Enter your new password below.",
      newPassword: "New Password (min 8 chars)",
      confirmPassword: "Confirm Password",
      reset: "Reset Password",
      passwordMatchError: "Passwords do not match.",
      passwordLengthError: "Password must be at least 8 characters.",
      tokenError: "Invalid or missing token.",
      successMsg: "Password reset successful! Redirecting to login.",
      serverError: "Error resetting password. Token may be invalid or expired.",
    },
    am: {
      title: "የይለፍ ቃል ዳግም ማስጀመር",
      instructions: "አዲሱን የይለፍ ቃልዎን ያስገቡ።",
      newPassword: "አዲስ የይለፍ ቃል (ዝቅተኛ 8 ቁምፊዎች)",
      confirmPassword: "የይለፍ ቃሉን ያረጋግጡ",
      reset: "የይለፍ ቃል ዳግም ያስጀምሩ",
      passwordMatchError: "የይለፍ ቃሎች አይዛመዱም።",
      passwordLengthError: "የይለፍ ቃል ቢያንስ 8 ቁምፊዎች መሆን አለበት።",
      tokenError: "ልክ ያልሆነ ወይም የጠፋ ምልክት።",
      successMsg: "የይለፍ ቃል ዳግም ማስጀመር ተሳክቷል! ወደ መግቢያ ገጽ በመሄድ ላይ።",
      serverError:
        "የይለፍ ቃል ዳግም ማስጀመር ላይ ስህተት ተፈጥሯል። ምልክቱ ልክ ያልሆነ ወይም ጊዜው ያለፈ ሊሆን ይችላል።",
    },
  };

  const current = translations[language]; // 👈 Using the current language object

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // ... (rest of handleSubmit logic remains the same)
    if (!token) {
      toast.error(current.tokenError);
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error(current.passwordLengthError);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(current.passwordMatchError);
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      toast.success(current.successMsg, { autoClose: 3000 });

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.msg || current.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 font-sans">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLanguage(language === "en" ? "am" : "en")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          <FaLanguage className="text-red-500" />
          <span className="text-sm font-semibold">
            {language === "en" ? "አማርኛ" : "English"}
          </span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white shadow-2xl p-8 sm:p-12 border border-gray-200">
        <div className="text-center mb-10">
          <FaTint className="mx-auto text-6xl text-red-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {current.title}
          </h1>
          <p className="text-gray-500 text-sm">{current.instructions}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {current.newPassword}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={current.newPassword}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 transition-all duration-300 bg-white focus:shadow-md"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {current.confirmPassword}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={current.confirmPassword}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 transition-all duration-300 bg-white focus:shadow-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-[1.01] hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <>
                <div className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></div>{" "}
                {current.reset}...
              </>
            ) : (
              <>
                <FaLock className="text-xl" /> {current.reset}
              </>
            )}
          </button>
        </form>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default ResetPassword;
