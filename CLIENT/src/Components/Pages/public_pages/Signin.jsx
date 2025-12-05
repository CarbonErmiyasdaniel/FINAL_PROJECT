import { useState } from "react";
import axios from "axios";
import {
  FaLanguage,
  FaSignInAlt,
  FaTint,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/useAuth.js";

const Signin = () => {
  const [language, setLanguage] = useState("en");
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "phone"
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const translations = {
    en: {
      title: "Sign In",
      identifier: "Email or Phone",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      welcome: "Welcome to Debre Berhan Blood Bank", // ← Updated
      subtitle: "Manage donors, hospitals, and donations in one place.",
      loginSuccess: "Login successful! Redirecting...",
      fillFields: "Please fill in all fields",
      serverError: "Invalid credentials or server error",
      loginWith: "Login with:",
    },
    am: {
      title: "መግቢያ",
      identifier: "ኢሜይል ወይም ስልክ",
      email: "ኢሜይል አድራሻ",
      phone: "ስልክ ቁጥር",
      password: "የይለፍ ቃል",
      forgotPassword: "የይለፍ ቃልን ተረስተዋል?",
      signIn: "ግባ",
      welcome: "እንኳን ወደ ደብረ ብርሃን የደም ባንክ በደህና መጡ", // ← Updated Amharic
      subtitle: "የለጋሾችን፣ ሆስፒታሎችን እና ለጋ ሂደቶችን በአንድ ቦታ ያቀናብሩ።",
      loginSuccess: "ግባ ተሳክቷል! እየተዛወረ ነው...",
      fillFields: "እባክዎ ሁሉንም መስኮች ይሙሉ",
      serverError: "የተሳሳተ መረጃ ወይም የአገልጋይ ስህተት",
      loginWith: "በዚህ ይግቡ:",
    },
  };

  const current = translations[language];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.identifier || !formData.password) {
      toast.error(current.fillFields);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "/api/auth/login",
        {
          identifier: formData.identifier.trim(),
          password: formData.password,
        },
        { withCredentials: true }
      );

      const { role, name } = res.data;

      login(res.data.token || "cookie-based", role, name);
      toast.success(current.loginSuccess, { autoClose: 1200 });

      setTimeout(() => {
        const dashboard =
          role === "admin"
            ? "/admin"
            : role === "nurse"
            ? "/nurse"
            : role === "donor"
            ? "/donor"
            : role === "lab_technician"
            ? "/lab_technician"
            : role === "post_counselor"
            ? "/post_counselor"
            : "/hospital_staff";

        window.location.href = dashboard;
      }, 1300);
    } catch (err) {
      toast.error(err.response?.data?.msg || current.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden font-sans shadow-2xl">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-2xl">
        <div className="animate-slide-in">
          <div className="mb-8">
            <FaTint className="text-6xl text-white mb-4 transition-transform duration-500 hover:scale-110" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            {current.welcome}
          </h1>
          <p className="text-xl text-red-200">{current.subtitle}</p>
          <p className="mt-8 text-sm text-red-300 italic">
            — Save a life, donate blood.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center w-full lg:w-1/2 relative p-4 sm:p-8">
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:shadow-xl"
          >
            <FaLanguage className="text-red-500" />
            <span className="text-sm font-semibold">
              {language === "en" ? "አማርኛ" : "English"}
            </span>
          </button>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-lg bg-white shadow-2xl p-8 sm:p-12 border border-gray-200">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
              <FaTint className="text-4xl animate-pulse-slow" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {current.title}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Method Toggle */}
            <div className="flex justify-center gap-6 mb-4">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
                  loginMethod === "email"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaEnvelope /> {current.email}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
                  loginMethod === "phone"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaMobileAlt /> {current.phone}
              </button>
            </div>

            {/* Identifier Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                {loginMethod === "email" ? current.email : current.phone}
              </label>
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder={
                  loginMethod === "email"
                    ? "name@example.com"
                    : "+967 771234567"
                }
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 text-gray-900 placeholder-gray-400 transition-all duration-300 bg-white focus:shadow-md hover:border-red-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                {current.password}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={current.password}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-300 bg-white focus:shadow-md hover:border-red-400"
                required
              />
            </div>

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium"
              >
                {current.forgotPassword}
              </a>
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
                  <div className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></div>
                  {current.signIn}...
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-xl" /> {current.signIn}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Signin;
