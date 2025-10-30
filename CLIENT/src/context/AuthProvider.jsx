// // import React, { useState, useEffect } from "react";
// // import { AuthContext } from "./AuthContext";

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState({
// //     isAuthenticated: !!localStorage.getItem("token"),
// //     role: localStorage.getItem("userRole") || null,
// //     userName: localStorage.getItem("userName") || null,
// //     isLoading: true,
// //   });

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setUser((current) => ({ ...current, isLoading: false }));
// //     }, 100);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const login = (token, role, userName) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("userRole", role);
// //     localStorage.setItem("userName", userName);
// //     setUser({
// //       isAuthenticated: true,
// //       role: role,
// //       userName: userName,
// //     });
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userRole");
// //     localStorage.removeItem("userName");
// //     setUser({
// //       isAuthenticated: false,
// //       userName: null,
// //       role: null,
// //       isLoading: false,
// //     });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// // 🔑 NEW: Import apiClient for the API call
// import apiClient from "./apiClient";
// // 🔑 NEW: Import useNavigate to handle redirection
// import { useNavigate } from "react-router-dom";
// // 🔑 NEW: Import toast for user feedback
// import { toast } from "react-toastify";

// export const AuthProvider = ({ children }) => {
//   // 🔑 Use useNavigate hook here
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     isAuthenticated: !!localStorage.getItem("token"),
//     role: localStorage.getItem("userRole") || null,
//     userName: localStorage.getItem("userName") || null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setUser((current) => ({ ...current, isLoading: false }));
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const login = (token, role, userName) => {
//     // NOTE: Since your backend sets the cookie, the client doesn't need to store the raw 'token'
//     // in localStorage, but we'll keep it for now as it's part of your existing implementation.
//     localStorage.setItem("token", token);
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("userName", userName);
//     setUser({
//       isAuthenticated: true,
//       role: role,
//       userName: userName,
//     });
//   };

//   // 🔑 UPDATED LOGOUT FUNCTION
//   const logout = async () => {
//     try {
//       // 1. Call the backend API: This blacklists the token and clears the HTTP-only cookie.
//       // This is the action that logs the user out across ALL open tabs.
//       await apiClient.post("/logout");
//       toast.success("Successfully logged out.", { toastId: "logout-success" });
//     } catch (error) {
//       // Log the error, but proceed to clear client state anyway to prevent hanging session
//       console.error(
//         "Backend Logout failed, forcing client-side logout:",
//         error.response?.data?.msg || error.message
//       );
//       // We use toast.error only if the response gives a specific failure message
//       toast.warning("Server error during logout. Logged out locally.", {
//         toastId: "logout-warning",
//       });
//     }

//     // 2. Clear all local state (Done regardless of backend success/failure)
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userName");

//     setUser({
//       isAuthenticated: false,
//       userName: null,
//       role: null,
//       isLoading: false,
//     });

//     // 3. Navigate to the sign-in page
//     navigate("/sign-in");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// /////////////////////////////////////////////////
// src/context/AuthProvider.jsx

import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "./apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("userRole") || null,
    userName: localStorage.getItem("userName") || null,
    isLoading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser((current) => ({ ...current, isLoading: false }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = (token, role, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", userName);
    setUser({
      isAuthenticated: true,
      role: role,
      userName: userName,
    });
  };

  // Centralized function for client-side state cleanup and redirection
  const performClientLogout = useCallback(() => {
    // 1. Clear all local state. This action triggers the 'storage' event in other tabs.
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    // 2. Update React state
    setUser({
      isAuthenticated: false,
      userName: null,
      role: null,
      isLoading: false,
    });

    // 3. Navigate to the sign-in page if not already there
    if (window.location.pathname !== "/sign-in") {
      navigate("/sign-in");
    }
  }, [navigate]);

  // Cross-tab logout synchronization using the 'storage' event
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only trigger action if the 'token' key was cleared by another tab (e.newValue is null)
      if (e.key === "token" && e.newValue === null) {
        console.log("Logout detected in another tab. Forcing local cleanup.");
        // Force a local, client-side logout in this tab
        performClientLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [performClientLogout]); // Run only once on mount unless performClientLogout changes

  // UPDATED LOGOUT FUNCTION to use the centralized cleanup
  const logout = async () => {
    try {
      // 1. Call the backend API: This clears the HTTP-only cookie.
      await apiClient.post("/logout");
      toast.success("Successfully logged out.", { toastId: "logout-success" });
    } catch (error) {
      console.error(
        "Backend Logout failed, forcing client-side logout:",
        error.response?.data?.msg || error.message
      );
      toast.warning("Server error during logout. Logged out locally.", {
        toastId: "logout-warning",
      });
    }

    // 2. Perform the client-side state cleanup and trigger cross-tab sync
    performClientLogout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
