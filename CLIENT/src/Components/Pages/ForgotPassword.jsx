import React, { useState } from "react";
import axios from "axios";
import { FaTint, FaArrowLeft, FaEnvelope, FaLanguage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  // State for the selected language
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 🔑 UPDATED TRANSLATION OBJECT with both languages
  const translations = {
    en: {
      title: "Forgot Password",
      instructions:
        "Enter your email address to receive a password reset link.",
      email: "Email Address",
      sendLink: "Send Reset Link",
      backToLogin: "Back to Sign In",
      fillField: "Please enter your email.",
      successMsg:
        "If a matching account was found, a password reset link has been sent to your email.",
      serverError: "Could not process request. Please check your network.",
    },
    am: {
      title: "የይለፍ ቃልን ተረስተዋል",
      instructions: "የይለፍ ቃልን ዳግም ለማስጀመር አገናኝ ለመቀበል የኢሜይል አድራሻዎን ያስገቡ።",
      email: "ኢሜይል አድራሻ",
      sendLink: "ዳግም ማስጀመሪያ አገናኝ ይላኩ",
      backToLogin: "ወደ መግቢያ ገጽ ተመለስ",
      fillField: "እባክዎ ኢሜይልዎን ያስገቡ።",
      successMsg: "የሚዛመድ መለያ ከተገኘ፣ የይለፍ ቃል ዳግም ማስጀመሪያ አገናኝ ወደ ኢሜይልዎ ተልኳል።",
      serverError: "ጥያቄውን ማከናወን አልተቻለም። እባክዎ አውታረ መረብዎን ያረጋግጡ።",
    },
  };

  const current = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error(current.fillField);
      setIsLoading(false);
      return;
    }

    try {
      // CALL THE BACKEND ROUTE (Make sure the backend is running on port 5000)
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      // Show generic success message (important for security)
      toast.success(current.successMsg, { autoClose: 5000 });

      // Redirect after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 5000);
    } catch (err) {
      // Catch server or network errors (The backend should ideally return 200 even on user not found)
      toast.error(err.response?.data?.msg || current.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 font-sans">
      {/* Language Switcher - positioned outside the card */}
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
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {current.email}
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={current.email}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 transition-all duration-300 bg-white focus:shadow-md"
            />
          </div>

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
                {current.sendLink}...
              </>
            ) : (
              <>
                <FaEnvelope className="text-xl" /> {current.sendLink}
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="flex items-center justify-center mx-auto text-sm text-gray-600 hover:text-red-700 hover:underline font-medium transition-colors duration-200 bg-transparent border-none p-0 cursor-pointer"
            >
              <FaArrowLeft className="mr-2" />
              {current.backToLogin}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default ForgotPassword;
