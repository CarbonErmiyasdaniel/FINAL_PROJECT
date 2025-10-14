// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // This rule tells Vite: if a request starts with /api,
//       // forward it to http://localhost:5000 (your Express server).
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true, // For proper host header rewrites
//         secure: false, // Use false if your backend is not HTTPS
//         // rewrite: (path) => path.replace(/^\/api/, ''), // Not needed since your backend path starts with /api
//       },
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,

        // 🔑 THE FIX: The 'configure' function receives the 'proxy' and the
        // 'options' object. We use the 'proxy' to get the request (req).
        configure: (proxy, options) => {
          // 1. Rewrite the cookie domain on the *response* from the backend
          // This allows the browser to accept and set the cookie when running on a different port (Vite's port)
          options.cookieDomainRewrite = {
            "*": "",
          };

          // 2. Add the 'withCredentials' option directly to the proxy config
          // This handles forwarding cookies from the browser to the backend.
          options.ws = true; // Use WebSockets for connection
          options.auth = undefined; // Clear any auth headers to prevent issues

          // CRITICAL: Ensure the 'credentials' flag is set for proxying
          options.configure = (req, res, next) => {
            req.headers["x-forwarded-for"] = req.socket.remoteAddress;
            next();
          };
        },
      },
    },
  },
});
