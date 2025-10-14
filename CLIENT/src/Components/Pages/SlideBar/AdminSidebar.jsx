// AdminSidebar.js
import React from "react";

const AdminSidebar = ({ isVisible, onClose, children }) => {
  // Tailwind classes for the slide-in/slide-out effect
  const sidebarClasses = `
        fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
    `;

  const overlayClasses = `
        fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
        ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
    `;

  return (
    <>
      {/* Overlay to dim the main screen and close on click */}
      <div className={overlayClasses} onClick={onClose}></div>

      {/* Sidebar Content */}
      <div className={sidebarClasses}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Tools
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* The main content (Action Center, Engagement) will be rendered here */}
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
