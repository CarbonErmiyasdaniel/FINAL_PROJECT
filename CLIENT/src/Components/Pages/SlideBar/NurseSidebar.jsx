import React from "react";

/**
 * NurseSidebar Component
 * A slide-in sidebar for the Nurse panel, providing navigation links
 * relevant to daily operations like appointments, record management, and inventory.
 *
 * @param {object} props
 * @param {boolean} props.isVisible - Controls the visibility of the sidebar.
 * @param {function} props.onClose - Function to close the sidebar.
 * @param {React.ReactNode} props.children - Content to display inside the sidebar (e.g., action buttons).
 */
const NurseSidebar = ({ isVisible, onClose, children }) => {
  return (
    // Backdrop overlay
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Main Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-r-4 border-red-700 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        // Prevent clicks inside the sidebar from closing it via the backdrop
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header and Close Button */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-2xl font-extrabold text-red-700 dark:text-red-500">
              Nurse Control Panel
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 transition-colors"
              aria-label="Close menu"
            >
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

          {/* Sidebar Content (Buttons from Dashboard) */}
          <div className="flex-grow overflow-y-auto">{children}</div>

          {/* Footer/Signature */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
            <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
              Powered by Debre Berhan Blood Center System
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NurseSidebar;
