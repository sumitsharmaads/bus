import { useEffect, useState } from "react";
import { AdminSidebar } from "../components/Admin/AdminSidebar";
import { AdminMobileSidebar } from "../components/Admin/AdminMobileSidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewport, setViewport] = useState({
    mobileView: false,
    tabView: false,
  });
  const handleViewport = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 560) {
      setViewport({ mobileView: true, tabView: false });
    } else if (screenWidth <= 780) {
      setViewport({ mobileView: false, tabView: true });
    } else {
      setViewport({ mobileView: false, tabView: false });
    }
  };

  useEffect(() => {
    handleViewport();
    window.addEventListener("resize", handleViewport);
    return () => window.removeEventListener("resize", handleViewport);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />

      <div
        className={`flex h-screen bg-gray-100 ${
          viewport.mobileView || viewport.tabView ? "flex-col" : ""
        }`}
      >
        <div className="hidden lg:block">
          <AdminSidebar
            viewport={viewport}
            setIsDropdownOpen={() => setIsDropdownOpen(false)}
          />
        </div>
        <div className="block lg:hidden">
          <AdminMobileSidebar
            viewport={viewport}
            setIsDropdownOpen={() => setIsDropdownOpen(false)}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};
