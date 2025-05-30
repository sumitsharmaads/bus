import { useEffect, useState } from "react";
import { AdminSidebar } from "../components/Admin/AdminSidebar";
import { AdminMobileSidebar } from "../components/Admin/AdminMobileSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#C22A54", // Tailwind 'primary' color
    },
    secondary: {
      main: "#202542", // Tailwind 'secondary' color
    },
    background: {
      default: "#f8f9fa", // Light background for admin
      paper: "#ffffff", // Paper background
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Volkhov', sans-serif", // Tailwind fonts
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      color: "#202542", // Secondary text color
    },
    button: {
      textTransform: "none", // Disable uppercase for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem", // Match Tailwind's rounded-md
          fontFamily: "'Poppins', sans-serif",
          textTransform: "none",
          padding: "8px 16px",
        },
        containedPrimary: {
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem", // Match Tailwind's rounded-lg
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Tailwind-style shadow-md
        },
      },
    },
  },
});

export const AdminLayout: React.FC = () => {
  const location = useLocation();
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
    <ThemeProvider theme={adminTheme} key={location.pathname}>
      <CssBaseline />
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />

      <div
        className={`flex h-[calc(100vh-5rem)] bg-gray-100 overflow-y-hidden ${
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
        <div className="flex-1 sm:p-0 sm:pt-10 sm:pb-0 sm:px-0 md:px-6 md:py-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};
