// src/context/apiClient.js (New File)

import axios from "axios";

// Use the Vite proxy path. This will correctly route to http://localhost:5000/api
const API_URL = "/api/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  // 🔑 CRITICAL: Tells the browser to include the HTTP-only cookie
  // for cross-origin requests routed through the proxy.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
