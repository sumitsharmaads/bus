import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../navigation";
import { MobileHeader } from "./MobileHeader";
import User from "../../utils/User";
import { AvatarDropdown } from "./AvatarDropdown";
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewPort, setViewPort] = useState({
    mobileView: false,
    tabView: false,
  });

  const handleViewPort = (screenWidth: number) => {
    if (screenWidth <= 560) {
      setViewPort({
        mobileView: true,
        tabView: false,
      });
    } else if (screenWidth <= 780) {
      setViewPort({
        mobileView: false,
        tabView: true,
      });
    } else {
      setViewPort({
        mobileView: false,
        tabView: false,
      });
    }
  };

  useEffect(() => {
    const innerWidth = window.innerWidth;
    handleViewPort(innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentScreenSize = window.innerWidth;
      handleViewPort(currentScreenSize);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="p-2 flex justify-between items-center relative">
      <div className="flex items-center">
        <div className="w-[50px] md:w-[60px] flex items-center">
          <img
            src="images/logo.png"
            alt="Logo"
            className="h-[52px] object-cover"
          />
        </div>
      </div>

      {!viewPort.mobileView && !viewPort.tabView && (
        <nav className="flex space-x-4">
          <Link
            to={PublicRoutes.HOME}
            className="text-normal font-poppins capitalize hover:underline active:font-semibold"
          >
            Home
          </Link>
          <Link
            to={PublicRoutes.ABOUT_US}
            className="text-normal font-poppins capitalize hover:underline active:font-semibold"
          >
            About
          </Link>
          <Link
            to={PublicRoutes.SERVICES}
            className="text-normal font-poppins capitalize hover:underline active:font-semibold"
          >
            Services
          </Link>
          <Link
            to={PublicRoutes.CONTACT}
            className="text-normal font-poppins capitalize hover:underline active:font-semibold"
          >
            Contact
          </Link>
        </nav>
      )}

      <div className="flex items-center space-x-4">
        {viewPort.mobileView && User.isLogin && <AvatarDropdown />}
        {!viewPort.mobileView && (
          <>
            {User.isLogin ? (
              <AvatarDropdown />
            ) : (
              <>
                <Link
                  to={PublicRoutes.LOGIN}
                  className="px-4 py-2 rounded border-black border-spacing-1 border-[1px]"
                >
                  Sign In
                </Link>
                <Link
                  to={PublicRoutes.SIGNUP}
                  className="bg-[#212832] text-white px-4 py-2 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
        {!viewPort.mobileView && <span className="w-1">|</span>}
        {!viewPort.mobileView && (
          <button
            className="p-2 text-primary hover:underline"
            onClick={() => navigate(PublicRoutes.QUICK_INQUERY)}
          >
            Inquery Now
          </button>
        )}
        {(viewPort.tabView || viewPort.mobileView) && (
          <div className="col-auto items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {menuOpen && (viewPort.mobileView || viewPort.tabView) && (
        <MobileHeader
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          mobileView={viewPort.mobileView}
        />
      )}
    </header>
  );
};
