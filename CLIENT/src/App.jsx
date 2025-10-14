// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import HomePage from "./Components/Pages/HomePage.jsx";
// import About from "./Components/Pages/About.jsx";
// import Signin from "./Components/Pages/Signin.jsx";
// import Who from "./Components/Pages/Who.jsx";
// import "./index.css";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import AdminDashboard from "./Components/Pages/AdminDashboard.jsx";
// import NurseDashboard from "./Components/Pages/NurseDashboard.jsx";
// import DonorDashboard from "./Components/Pages/DonorDashboard.jsx";
// import UnauthorizedPage from "./Components/Pages/Unauthorized.jsx";
// import LabTechnicianDashboard from "./Components/Pages/lab_technician.jsx";
// import PostCounselorDashboard from "./Components/Pages/post_counselor.jsx";
// import HospitalStaffDashboard from "./Components/Pages/hospital_staff.jsx";
// import ForgotPassword from "./Components/Pages/ForgotPassword.jsx";
// import ResetPassword from "./Components/Pages/ResetPassword.jsx";
// import RegisterUserPage from "./Components/Features/admin/RegisterUserPage.jsx";
// import UserListPage from "./Components/Features/admin/UserListPage.jsx";
// import UpdateUser from "./Components/Features/admin/updateUser.jsx";
// import Donor_Register from "./Components/Features/nurse/Donor_Register.jsx";
// import NurseListPage from "./Components/Features/nurse/NurseListPage.jsx";
// const NotFoundPage = () => (
//   <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
//     <div className="text-center p-8 bg-white rounded-lg shadow-lg">
//       <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//       <p className="text-lg mb-6">
//         The page you are looking for does not exist.
//       </p>
//       <a
//         href="/home"
//         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//       >
//         Go Home
//       </a>
//     </div>
//   </div>
// );

// const App = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/sign-in" element={<Signin />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />
//       <Route path="/home" element={<HomePage />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/who" element={<Who />} />
//       <Route path="/" element={<Navigate to="/home" replace />} />

//       {/* Protected Role-based Routes */}
//       <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//         <Route path="/admin">
//           <Route index element={<AdminDashboard />} />
//           <Route path="register-user" element={<RegisterUserPage />} />
//           <Route path="getAllUsers" element={<UserListPage />} />
//           <Route path="users/:userId" element={<UpdateUser />} />
//         </Route>
//       </Route>

//       <Route element={<ProtectedRoute allowedRoles={["nurse"]} />}>
//         <Route path="/nurse" element={<NurseDashboard />} />
//         <Route path="/nurse/add_donor" element={<Donor_Register />} />
//         <Route path="/nurse/Get_Donorlist" element={<NurseListPage />} />
//       </Route>

//       <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
//         <Route path="/dashboard/donor" element={<DonorDashboard />} />
//       </Route>

//       <Route element={<ProtectedRoute allowedRoles={["lab_technician"]} />}>
//         <Route
//           path="/dashbord/lab_technician"
//           element={<LabTechnicianDashboard />}
//         />
//       </Route>
//       <Route element={<ProtectedRoute allowedRoles={["post_counselor"]} />}>
//         <Route
//           path="/dashbord/post_counselor"
//           element={<PostCounselorDashboard />}
//         />
//       </Route>
//       <Route element={<ProtectedRoute allowedRoles={["hospital_staff"]} />}>
//         <Route
//           path="/dashbord/hospital_staff"
//           element={<HospitalStaffDashboard />}
//         />
//       </Route>

//       {/* Unauthorized Page */}
//       <Route path="/unauthorized" element={<UnauthorizedPage />} />

//       {/* Catch-all */}
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./Components/Pages/HomePage.jsx";
import About from "./Components/Pages/About.jsx";
import Signin from "./Components/Pages/Signin.jsx";
import Who from "./Components/Pages/Who.jsx";
import "./index.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import AdminDashboard from "./Components/Pages/AdminDashboard.jsx";
import NurseDashboard from "./Components/Pages/NurseDashboard.jsx";
import DonorDashboard from "./Components/Pages/DonorDashboard.jsx";
import UnauthorizedPage from "./Components/Pages/Unauthorized.jsx";
import LabTechnicianDashboard from "./Components/Pages/lab_technician.jsx";
import PostCounselorDashboard from "./Components/Pages/post_counselor.jsx";
import HospitalStaffDashboard from "./Components/Pages/hospital_staff.jsx";
import ForgotPassword from "./Components/Pages/ForgotPassword.jsx";
import ResetPassword from "./Components/Pages/ResetPassword.jsx";
import RegisterUserPage from "./Components/Features/admin/RegisterUserPage.jsx";
import UserListPage from "./Components/Features/admin/UserListPage.jsx";
import UpdateUser from "./Components/Features/admin/updateUser.jsx";
import Donor_Register from "./Components/Features/nurse/Donor_Register.jsx";
import NurseListPage from "./Components/Features/nurse/NurseListPage.jsx";
import RegisterDonorPersonalInfo from "./Components/Features/nurse/RegisterDonorPersonalInfo.jsx";
import RegisterDonation from "./Components/Features/nurse/RegisterDonation.jsx";
import UpdateDonorPersonalInfo from "./Components/Features/nurse/UpdateDonorPersonalInfo.jsx";

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

        {/* Protected Role-based Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route path="register-user" element={<RegisterUserPage />} />
            <Route path="getAllUsers" element={<UserListPage />} />
            <Route path="users/:userId" element={<UpdateUser />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["nurse"]} />}>
          <Route path="/nurse" element={<NurseDashboard />} />
          <Route path="/nurse/add_donor" element={<Donor_Register />} />
          <Route path="/nurse/Get_Donorlist" element={<NurseListPage />} />
          <Route
            path="/nurse/registerDonorInfo/:userId"
            element={<RegisterDonorPersonalInfo />}
          />
          <Route
            path="/nurse/updateDonorInfo/:donorId"
            element={<UpdateDonorPersonalInfo />}
          />
          <Route
            path="/nurse/registerDonation/:donorId"
            element={<RegisterDonation />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
          <Route path="/dashboard/donor" element={<DonorDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["lab_technician"]} />}>
          <Route
            path="/dashbord/lab_technician"
            element={<LabTechnicianDashboard />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["post_counselor"]} />}>
          <Route
            path="/dashbord/post_counselor"
            element={<PostCounselorDashboard />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["hospital_staff"]} />}>
          <Route
            path="/dashbord/hospital_staff"
            element={<HospitalStaffDashboard />}
          />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Catch-all */}
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
