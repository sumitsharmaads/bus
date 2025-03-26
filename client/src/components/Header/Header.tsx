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

  const isActive = useCallback(
    (route: string) => {
      return location.hash === `#${route}`;
    },
    [location.pathname]
  );

  const classname = (route: string, homeFlag?: boolean) => {
    const homeRoute = isActive("/") || isActive("");
    return `relative inline-block font-poppins capitalize hover:font-semibold active:font-semibold
              ${
                isActive(route) || (homeFlag && homeRoute)
                  ? "font-semibold text-[#C22A54]"
                  : ""
              }`;
  };
  return (
    <header className="p-2 flex justify-between items-center relative">
      <div className="flex items-center">
        <div className="w-[50px] md:w-[60px] flex items-center">
          <Link to={PublicRoutes.HOME}>
            <img
              src="images/logo.png"
              alt="Logo"
              className="h-[52px] object-cover"
            />
          </Link>
        </div>
      </div>

      {!viewPort.mobileView && !viewPort.tabView && (
        <nav className="flex space-x-4">
          <Link
            to={PublicRoutes.HOME}
            onMouseEnter={() => import("../../pages/Home")}
            className={classname(PublicRoutes.HOME, true)}
          >
            Home
          </Link>
          <Link
            to={PublicRoutes.ABOUT_US}
            onMouseEnter={() => import("../../pages/AboutUs")}
            className={classname(PublicRoutes.ABOUT_US)}
          >
            About
          </Link>
          <Link
            to={PublicRoutes.SERVICES}
            onMouseEnter={() => import("../../pages/Servies")}
            className={classname(PublicRoutes.SERVICES)}
          >
            Services
          </Link>
          <Link
            to={PublicRoutes.CONTACT}
            onMouseEnter={() => import("../../pages/Contact")}
            className={classname(PublicRoutes.CONTACT)}
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
                  onMouseEnter={() => import("../../pages/Signin")}
                  className="px-4 py-2 rounded border-black border-spacing-1 border-[1px]"
                >
                  Sign In
                </Link>
                <Link
                  to={PublicRoutes.SIGNUP}
                  onMouseEnter={() => import("../../pages/Signup")}
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
