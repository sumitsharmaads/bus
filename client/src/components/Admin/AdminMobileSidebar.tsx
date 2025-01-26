import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Typography } from "@material-tailwind/react";
import { AdminSidebarIcons } from "./AdminSidebarIcons";

export const AdminMobileSidebar: React.FC<{
  viewport: {
    mobileView: boolean;
    tabView: boolean;
  };
  setIsDropdownOpen: (status: boolean) => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}> = ({ toggleDropdown, viewport, isDropdownOpen, setIsDropdownOpen }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownStyles, setDropdownStyles] = useState({ top: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({ top: rect.bottom - 130 });
    }
  }, [isDropdownOpen]);

  return (
    <section className="flex flex-col">
      <div className="flex flex-col md:flex-row h-full bg-gray-100 relative">
        {/* Dropdown Button */}
        {(viewport.mobileView || viewport.tabView) && (
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className="p-4 text-gray-600 absolute top-2 left-2 z-50"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        )}

        {/* Dropdown Sidebar */}
        {isDropdownOpen && (
          <div
            className={`absolute left-0 max-w-[220px] w-full bg-white shadow-lg overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out ${
              isDropdownOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{
              top: dropdownStyles.top, // Dynamically set top position
              height: `calc(100vh - ${dropdownStyles.top}px)`, // Take remaining height
            }}
          >
            <div className="p-4 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Admin Panel
              </Typography>
              {/* Close Button */}
              <button
                onClick={toggleDropdown}
                className="text-gray-600 p-1 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <AdminSidebarIcons
              viewport={viewport}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>
        )}

        {/* Backdrop for Dropdown */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDropdown}
          ></div>
        )}
      </div>
    </section>
  );
};
