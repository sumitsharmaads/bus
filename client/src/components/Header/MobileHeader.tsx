import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../navigation";
import User from "../../utils/User";

export const MobileHeader: React.FC<{
  toggleMenu: () => void;
  menuOpen: boolean;
  mobileView: boolean;
}> = ({ toggleMenu, menuOpen, mobileView }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    toggleMenu(); // Close the menu when a link is clicked
  };

  const isActive = useCallback(
    (route: string) => {
      return location.hash === `#${route}`;
    },
    [location.pathname]
  );

  const classname = (route: string, homeFlag?: boolean) => {
    const homeRoute = isActive("/") || isActive("");
    return `block p-2 hover:font-semibold active:font-semibold
                ${
                  isActive(route) || (homeFlag && homeRoute)
                    ? "font-semibold text-[#C22A54]"
                    : ""
                }`;
  };

  return (
    <div
      ref={ref}
      className={`z-50 absolute h-[calc(100vh-140px)] top-16 right-0 max-w-[500px] w-[300px] md:w-[50vw] bg-gray-200 p-4 transition-opacity duration-300 ease-in-out delay-200 transform ${
        menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="border-b-2 border-primary mb-2 animate-pulse" />
      <Link
        to={PublicRoutes.HOME}
        className={classname(PublicRoutes.HOME, true)}
        onClick={handleLinkClick}
        onMouseEnter={() => import("../../pages/Signup")}
      >
        Home
      </Link>
      <Link
        to={PublicRoutes.TOURS}
        className={classname(PublicRoutes.TOURS, true)}
        onClick={handleLinkClick}
        onMouseEnter={() => import("../../pages/TourListPage")}
      >
        Book Tours
      </Link>
      <Link
        to={PublicRoutes.ABOUT_US}
        className={classname(PublicRoutes.ABOUT_US)}
        onClick={handleLinkClick}
        onMouseEnter={() => import("../../pages/AboutUs")}
      >
        About
      </Link>
      <Link
        to={PublicRoutes.SERVICES}
        className={classname(PublicRoutes.SERVICES)}
        onClick={handleLinkClick}
        onMouseEnter={() => import("../../pages/Servies")}
      >
        Services
      </Link>
      <Link
        to={PublicRoutes.CONTACT}
        className={classname(PublicRoutes.CONTACT)}
        onClick={handleLinkClick}
        onMouseEnter={() => import("../../pages/Contact")}
      >
        Contact
      </Link>
      {mobileView && (
        <button
          className="p-2 text-primary hover:underline"
          onMouseEnter={() => import("../../pages/Inquery")}
          onClick={() => navigate(PublicRoutes.QUICK_INQUERY)}
        >
          Inquery Now
        </button>
      )}
      {mobileView && (
        <>
          {!User.isLogin && (
            <>
              <div className="block mt-2 p-2">
                <Link
                  to={PublicRoutes.LOGIN}
                  onClick={handleLinkClick}
                  onMouseEnter={() => import("../../pages/Signin")}
                  className="px-4 py-2 rounded border-black border-spacing-1 border-[1px] items-center"
                >
                  Sign In
                </Link>
              </div>
              <div className="block mt-2 p-2">
                <Link
                  to={PublicRoutes.SIGNUP}
                  onClick={handleLinkClick}
                  onMouseEnter={() => import("../../pages/Signup")}
                  className="bg-[#212832] text-white px-4 py-2 rounded items-center"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
