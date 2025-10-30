import { useState } from "react";
import axios from "axios";
// Import FaTint for the logo, removed FaSpinner from the static import as we'll use a custom spinner class
import { FaLanguage, FaSignInAlt, FaTint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/useAuth.js";

// NOTE: Ensure your tailwind.config.js still contains the 'slide-in' animation for the left panel.

const Signin = () => {
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const translations = {
    // ... (rest of translations object remains unchanged)
    en: {
      title: "Sign In",
      email: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      welcome: "Welcome to Blood Bank", // Text with slide-in animation
      subtitle: "Manage donors, hospitals, and donations in one place.",
      loginSuccess: "Login successful!",
      fillFields: "Please fill in all fields",
      serverError: "Server error or Invalid credentials",
    },
    am: {
      title: "መግቢያ",
      email: "ኢሜይል አድራሻ",
      password: "የይለፍ ቃል",
      forgotPassword: "የይለፍ ቃልን ተረስተዋል?",
      signIn: "ግባ",
      welcome: "እንኳን ወደ የደም ባንክ በደህና መጡ",
      subtitle: "የለጋሾችን፣ ሆስፒታሎችን እና ለጋ ሂደቶችን በአንድ ቦታ ያቀናብሩ።",
      loginSuccess: "ግባ ተሳክቷል!",
      fillFields: "እባክዎ ሁሉንም መስኮች ይሙሉ",
      serverError: "የአገልጋይ ስህተት ወይም የተሳሳተ መረጃ",
    },
  };

  const current = translations[language];

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast.error(current.fillFields);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      const role = res.data.role;
      const token = res.data.token || "HTTP-ONLY-TOKEN-PLACEHOLDER";
      const username = res.data.name || "Unknown User";
      login(token, role, username); // Pass username to login function
      toast.success(current.loginSuccess, { autoClose: 1500 });

      // Role-based redirect after toast
      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "nurse") navigate("/nurse");
        else if (role === "donor") navigate("/donor");
        else if (role === "lab_technician") navigate("/lab_technician");
        else if (role === "post_counselor") navigate("/post_counselor");
        else if (role === "hospital_staff") navigate("/hospital_staff");
        else navigate("/hospital_staff"); // Default fallback
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || current.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Base layout changed to use sharp corners and a strong shadow
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden font-sans shadow-2xl">
      {/* Left Section - Sliding Motion and Red Theme */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-2xl">
        {/* The container for the sliding animation */}
        <div className="animate-slide-in">
          <div className="mb-8">
            {/* Logo with a slight dynamic pulse/scale on hover */}
            <FaTint className="text-6xl text-white mb-4 transition-transform duration-500 hover:scale-110" />
          </div>
          {/* Text with Motion */}
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            {current.welcome}
          </h1>
          <p className="text-xl text-red-200">{current.subtitle}</p>
          <p className="mt-8 text-sm text-red-300 italic">
            — Save a life, donate blood.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form with Sharp Edges and Strong Shadow */}
      <div className="flex items-center justify-center w-full lg:w-1/2 relative p-4 sm:p-8">
        {/* Language Switcher - Dynamic Hover Effect */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            // Added hover:shadow-xl and hover:translate-y-[-2px] for a subtle lift effect
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaLanguage className="text-red-500" />
            <span className="text-sm font-semibold">
              {language === "en" ? "አማርኛ" : "English"}
            </span>
          </button>
        </div>

        {/* Login Card - Subtle floating animation on the card itself */}
        <div className="w-full max-w-lg bg-white shadow-2xl p-8 sm:p-12 border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
          {/* Logo + Title */}
          <div className="text-center mb-10">
            {/* Logo remains circular for design contrast, added subtle pulsating border */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4 border-2 border-transparent hover:border-red-300 transition-all duration-300">
              <FaTint className="text-4xl animate-pulse-slow" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {current.title}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field - Dynamic Border and Shadow on Focus */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                {current.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={current.email}
                // Added a transition and subtle hover effect to make inputs feel interactive
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-300 bg-white focus:shadow-md hover:border-red-400"
              />
            </div>

            {/* Password Field - Dynamic Border and Shadow on Focus */}
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
                // Added a transition and subtle hover effect to make inputs feel interactive
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-300 bg-white focus:shadow-md hover:border-red-400"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium transition-colors duration-200"
              >
                {current.forgotPassword}
              </a>
            </div>

            {/* Submit Button - Dynamic lift, sharp edges and stronger shadow */}
            <button
              type="submit"
              disabled={isLoading}
              // Enhanced hover effect with a slight scale and larger shadow
              className={`w-full py-3 px-4 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform ${
                isLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-[1.01] hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  {/* Custom spinning animation for better control */}
                  <div className="border-t-2 border-white border-solid w-5 h-5 rounded-full animate-spin"></div>{" "}
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Signin;
