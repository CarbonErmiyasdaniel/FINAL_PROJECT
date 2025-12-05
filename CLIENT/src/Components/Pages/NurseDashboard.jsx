import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  UserPlus,
  Users,
  FileText,
  Settings,
  Heart,
  Camera,
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import Donor_Register from "../Features/nurse/Donor_Register.jsx";
import Donor_List from "../Features/nurse/NurseListPage.jsx";
import RegisterDonorPersonalInfo from "../Features/nurse/RegisterDonorPersonalInfo.jsx";
import UpdateDonorPersonalInfo from "../Features/nurse/UpdateDonorPersonalInfo.jsx";
import RegisterDonation from "../Features/nurse/RegisterDonation.jsx";
import NurseReportForm from "../Features/nurse/NurseReport.jsx";
import NurseProfile from "../Features/nurse/NurseProfile";
/* ==================== SIDEBAR BUTTON ==================== */
const SidebarButton = ({ onClick, icon, label, isExpanded, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center h-12 w-full transition-all duration-300 font-medium text-white rounded-lg group hover:bg-red-700/50 hover:shadow-md ${
        isActive ? "bg-red-800/80 shadow-inner ring-2 ring-white/50" : ""
      } ${isExpanded ? "px-5 justify-start" : "justify-center"}`}
    >
      {isActive && isExpanded && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -translate-x-1"></span>
      )}
      <span className="flex-shrink-0">
        {React.cloneElement(icon, {
          className: `w-5 h-5 ${
            isActive ? "text-white" : "text-red-300 group-hover:text-white"
          }`,
        })}
      </span>
      <span
        className={`ml-4 text-sm ${
          isExpanded ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        {label}
      </span>
      {!isExpanded && (
        <div className="absolute left-full ml-4 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
          {label}
        </div>
      )}
    </button>
  );
};

/* ==================== SIDEBAR ==================== */
const Sidebar = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  isDesktop,
  children,
}) => {
  const [nurseName, setNurseName] = useState(
    () => localStorage.getItem("nurseName") || "Nurse Selamawit"
  );
  const [profilePic, setProfilePic] = useState(
    () => localStorage.getItem("nursePhoto") || null
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(nurseName);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setProfilePic(dataUrl);
      localStorage.setItem("nursePhoto", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const saveName = () => {
    if (tempName.trim()) {
      setNurseName(tempName.trim());
      localStorage.setItem("nurseName", tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <>
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`fixed inset-y-0 left-0 z-50 h-full shadow-2xl transition-all duration-300 border-r border-red-900/50 flex flex-col
          bg-gradient-to-br from-[#A51B27] to-red-900
          ${isDesktop ? (isOpen ? "sm:w-72" : "sm:w-20") : "w-72"}
          ${!isDesktop ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <div
          className="space-y-6 flex-shrink-0"
          style={{ padding: isOpen || !isDesktop ? "1.5rem" : "1.5rem 0.5rem" }}
        >
          <div
            className={`flex items-center justify-between ${
              isOpen || !isDesktop ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            <h1 className="text-2xl font-black tracking-widest text-white uppercase flex items-center">
              <Heart className="h-7 w-7 mr-2 fill-current" />
              NURSE PANEL
            </h1>
            {!isDesktop && (
              <button
                onClick={onClose}
                className="p-2 text-red-200 hover:text-white rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-red-700">
            <div
              className={`flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="relative group">
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <div className="w-14 h-14 rounded-full border-4 border-white/70 shadow-lg overflow-hidden">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Nurse"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center text-red-700 font-bold text-2xl">
                        NS
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="px-2 py-1 text-sm bg-red-800/50 text-white rounded border border-red-400 focus:outline-none focus:border-white"
                      onKeyPress={(e) => e.key === "Enter" && saveName()}
                      autoFocus
                    />
                    <button
                      onClick={saveName}
                      className="text-green-300 hover:text-white text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="text-red-300 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-white flex items-center gap-2">
                      {nurseName}
                      <button
                        onClick={() => {
                          setTempName(nurseName);
                          setIsEditingName(true);
                        }}
                        className="text-xs opacity-70 hover:opacity-100"
                      >
                        Edit
                      </button>
                    </p>
                    <p className="text-xs text-red-200">Blood Bank Nurse</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2 px-3 pb-4">
          {children}
        </nav>
      </aside>

      {isOpen && !isDesktop && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60 z-40"
        ></div>
      )}
    </>
  );
};

/* ==================== MAIN DASHBOARD WITH STATE SUPPORT ==================== */
const NewNurseDashboard = ({ pageKey }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = useMemo(() => location.state || {}, [location.state]);

  const [currentPage, setCurrentPage] = useState(
    pageKey || "/nurse/Donor_List"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    if (pageKey) setCurrentPage(pageKey);
  }, [pageKey]);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This is the magic: check location.state first!
  useEffect(() => {
    if (
      state.showRegisterInfo ||
      state.showRegisterDonation ||
      state.showUpdateInfo
    ) {
      setCurrentPage("dynamic-form");
    }
  }, [state]);

  const handleNavigate = (path) => {
    setCurrentPage(path);
    navigate(path);
    if (!isDesktop) setIsSidebarOpen(false);
  };

  const RenderPage = () => {
    const Container = ({ children }) => (
      <div className="p-6 lg:p-10 min-h-screen bg-gradient-to-br from-red-50 to-white">
        {children}
      </div>
    );

    // Dynamic forms from Donor List buttons
    if (state.showRegisterInfo) {
      return (
        <Container>
          <RegisterDonorPersonalInfo
            userId={state.donorId}
            donorName={state.donorName || "Donor"}
          />
        </Container>
      );
    }
    if (state.showRegisterDonation) {
      return (
        <Container>
          <RegisterDonation />
        </Container>
      );
    }
    if (state.showUpdateInfo) {
      return (
        <Container>
          <UpdateDonorPersonalInfo donorId={state.donorId} />
        </Container>
      );
    }

    // Static pages
    switch (currentPage) {
      case "/nurse/dashboard":
        return (
          <Container>
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                Welcome Back!
              </h1>
              <p className="text-xl text-gray-600">
                Select a menu from the sidebar
              </p>
            </div>
          </Container>
        );

      case "/nurse/Donor_Register":
        return (
          <Container>
            <Donor_Register />
          </Container>
        );

      case "/nurse/Donor_List":
        return (
          <Container>
            <Donor_List />
          </Container>
        );

      case "/nurse/writeReport/":
        return (
          <Container>
            <NurseReportForm />
          </Container>
        );
      case "/nurse/Profile/":
        return (
          <Container>
            <NurseProfile />
          </Container>
        );

      default:
        return (
          <Container>
            <NurseProfile />
          </Container>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onMouseEnter={() => isDesktop && setIsSidebarOpen(true)}
        onMouseLeave={() => isDesktop && setIsSidebarOpen(false)}
        onClose={() => setIsSidebarOpen(false)}
        isDesktop={isDesktop}
      >
        {/* <SidebarButton
          onClick={() => handleNavigate("/nurse/dashboard")}
          icon={<Home />}
          label="Dashboard"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/nurse/dashboard"}
        /> */}
        <SidebarButton
          onClick={() => handleNavigate("/nurse/Donor_Register")}
          icon={<UserPlus />}
          label="Add New Donor"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/nurse/Donor_Register"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/nurse/Donor_List")}
          icon={<Users />}
          label="Donor List"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/nurse/Donor_List"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/nurse/Profile")}
          icon={<Users />}
          label="My Profile"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/nurse/Profile"}
        />
        <SidebarButton
          onClick={() => handleNavigate("/nurse/writeReport/")}
          icon={<FileText />}
          label="Daily Report"
          isExpanded={isSidebarOpen}
          isActive={currentPage === "/nurse/writeReport/"}
        />
      </Sidebar>

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isDesktop ? (isSidebarOpen ? "sm:ml-72" : "sm:ml-20") : ""
        }`}
      >
        <div className="p-4 lg:p-8">
          <RenderPage />
        </div>
      </main>

      {!isDesktop && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-2xl z-40 hover:bg-red-800 transition"
        >
          <Menu className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

/* ==================== FINAL EXPORT WITH DASHBOARD LAYOUT ==================== */
const WrappedNewNurseDashboard = (props) => (
  <DashboardLayout>
    <NewNurseDashboard {...props} />
  </DashboardLayout>
);

export default WrappedNewNurseDashboard;
