import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Components/Pages/HomePage.jsx";
import About from "./Components/Pages/public_pages/About.jsx";
import Signin from "./Components/Pages/public_pages/Signin.jsx";
import Who from "./Components/Pages/public_pages/Who.jsx";
import "./index.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import UnauthorizedPage from "./Components/Pages/Unauthorized.jsx";
import ForgotPassword from "./Components/Pages/ForgotPassword.jsx";
import ResetPassword from "./Components/Pages/public_pages/ResetPassword.jsx";
import WrappedAdminDashboard from "./Components/Pages/AdminDashboard.jsx";
import WrappedNewNurseDashboard from "./Components/Pages/NurseDashboard.jsx";
import WrappedNewDonorDashboard from "./Components/Pages/DonorDashboard.jsx";
import WrappedNewlab_technicianDashboard from "./Components/Pages/lab_technicianDashboard.jsx";
import WrappedNewPostCounselorDashboard from "./Components/Pages/post_counselor.jsx";
import WrappedNew_hospital_staff_Dashboard from "./Components/Pages/hospital_staff.jsx";
const NotFoundPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <a
        href="/home"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go Home
      </a>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/who" element={<Who />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        ////////////////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin">
            <Route index element={<WrappedAdminDashboard />} />
            <Route
              path="register-user"
              element={<WrappedAdminDashboard pageKey="/admin/register-user" />}
            />
            <Route
              path="getAllUsers"
              element={<WrappedAdminDashboard pageKey="/admin/getAllUsers" />}
            />
            <Route
              path="users/:userId"
              element={<WrappedAdminDashboard pageKey="/admin/users/:userId" />}
            />
          </Route>
          <Route
            path="NurseActivityReports"
            element={
              <WrappedAdminDashboard pageKey="/admin/NurseActivityReports" />
            }
          />
        </Route>
        /////////////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["nurse"]} />}>
          <Route path="/nurse">
            <Route index element={<WrappedNewNurseDashboard />} />
            <Route
              path="Donor_Register"
              element={
                <WrappedNewNurseDashboard pageKey="/nurse/Donor_Register" />
              }
            />
            <Route
              path="Donor_List"
              element={<WrappedNewNurseDashboard pageKey="/nurse/Donor_List" />}
            />
            <Route
              path="registerDonorInfo/:userId"
              element={
                <WrappedNewNurseDashboard pageKey="/nurse/registerDonorInfo/:userId" />
              }
            />
            <Route
              path="updateDonorInfo/:userId"
              element={
                <WrappedNewNurseDashboard pageKey="/nurse/updateDonorInfo/:userId" />
              }
            />

            <Route
              path="RegisterDonation/:userId"
              element={
                <WrappedNewNurseDashboard pageKey="/nurse/RegisterDonation/:userId" />
              }
            />
            <Route
              path="writeReport/"
              element={
                <WrappedNewNurseDashboard pageKey="/nurse/writeReport/" />
              }
            />
          </Route>
        </Route>
        ////////////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
          <Route path="/donor">
            <Route index element={<WrappedNewDonorDashboard />} />
            {/* <Route
              path="dashboard"
              element={<WrappedNewDonorDashboard pageKey="/donor/dashboard" />}
            /> */}
            <Route
              path="Profile"
              element={<WrappedNewDonorDashboard pageKey="/donor/Profile" />}
            />
            <Route
              path="request-blood"
              element={
                <WrappedNewDonorDashboard pageKey="/donor/request-blood" />
              }
            />
          </Route>
        </Route>
        ///////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["lab_technician"]} />}>
          <Route path="/lab_technician">
            <Route index element={<WrappedNewlab_technicianDashboard />} />
            {/* <Route
              path="dashboard"
              element={<WrappedNewDonorDashboard pageKey="/donor/dashboard" />}
            /> */}
            <Route
              path="Profile"
              element={
                <WrappedNewlab_technicianDashboard pageKey="/lab_technician/Profile" />
              }
            />
          </Route>
        </Route>
        /////////////////////////////////////////////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["post_counselor"]} />}>
          <Route path="/post_counselor">
            <Route index element={<WrappedNewPostCounselorDashboard />} />
            {/* <Route
              path="dashboard"
              element={<WrappedNewDonorDashboard pageKey="/donor/dashboard" />}
            /> */}
            <Route
              path="Profile"
              element={
                <WrappedNewPostCounselorDashboard pageKey="/post_counselor/Profile" />
              }
            />
          </Route>
        </Route>
        /////////////////////////////////
        <Route element={<ProtectedRoute allowedRoles={["hospital_staff"]} />}>
          <Route path="/hospital_staff">
            <Route index element={<WrappedNew_hospital_staff_Dashboard />} />
            {/* <Route
              path="dashboard"
              element={<WrappedNewDonorDashboard pageKey="/donor/dashboard" />}
            /> */}
            <Route
              path="Profile"
              element={
                <WrappedNew_hospital_staff_Dashboard pageKey="/hospital_staff/Profile" />
              }
            />
            <Route
              path="request-blood"
              element={
                <WrappedNew_hospital_staff_Dashboard pageKey="/hospital_staff/request-blood" />
              }
            />
          </Route>
        </Route>
        ///////////////////////
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* ToastContainer should be here, once */}
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
    </>
  );
};

export default App;
