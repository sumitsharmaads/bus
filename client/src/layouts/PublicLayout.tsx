import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components";
import { useWebsite } from "../contexts/WebsiteProvider";
import { Footer } from "../components/Footer";
import { setAuthHandlers } from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContextProvider";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

export const PublicLayout: React.FC = () => {
  const { logout, updateUserInfo } = useAuth();
  const location = useLocation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 1.5; // 100vh + 50vh
      if (window.scrollY > scrollThreshold) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (logout && updateUserInfo) setAuthHandlers(logout, updateUserInfo);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAdminPage = useMemo(
    () => location.pathname.match("/admin"),
    [location.pathname]
  );
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAdminPage && <Footer />}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#C22A54] text-white p-3 rounded-full shadow-lg hover:bg-[#E53E3E] transition duration-300 z-50"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
