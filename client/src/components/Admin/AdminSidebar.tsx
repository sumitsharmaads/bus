import React from "react";
import { AdminSidebarIcons } from "./AdminSidebarIcons";
import { Typography } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

export const AdminSidebar: React.FC<{
  viewport: {
    mobileView: boolean;
    tabView: boolean;
  };
  setIsDropdownOpen: (status: boolean) => void;
}> = ({ viewport, setIsDropdownOpen }) => {
  return (
    <section className="flex flex-1 md:flex-row h-[calc(100vh)] bg-gray-100 w-full overflow-y-auto overflow-x-hidden">
      <div
        className={`p-4 shadow-xl shadow-blue-gray-900/5 fixed md:static top-0 left-0 h-full bg-white hidden md:block`}
      >
        <div className="mb-1 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin
          </Typography>
        </div>
        <AdminSidebarIcons
          viewport={viewport}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </div>
    </section>
  );
};
