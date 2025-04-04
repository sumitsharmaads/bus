// Import Section (same as before)
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import HelpWidget from "./HelpWidget"; // ✅ Chat-style widget

// Dummy category filters
const categories = [
  { label: "All", count: 20 },
  { label: "Devotional", count: 6 },
  { label: "Family", count: 5 },
  { label: "Adventure", count: 4 },
  { label: "Luxury", count: 5 },
];

// TourCard Component
const TourCard: React.FC = () => {
  return (
    <div className="bg-white shadow hover:shadow-lg rounded-xl overflow-hidden transition duration-300 border border-gray-100 relative">
      <div className="relative group overflow-hidden h-48">
        <img
          src="/images/tours/kedarnath.jpg"
          alt="Kedarnath Yatra"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-[#C22A54] text-white text-xs px-3 py-1 rounded-full shadow">
          Best Seller
        </span>

        {/* Wishlist & Compare */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="bg-white rounded-full p-1 shadow hover:text-[#C22A54] transition">
            <FavoriteBorderIcon fontSize="small" />
          </button>
          <button className="bg-white rounded-full p-1 shadow hover:text-[#C22A54] transition">
            <CompareArrowsIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-[#C22A54]">
          Kedarnath Devotional Yatra
        </h3>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <LocationOnIcon fontSize="small" />
          <span>Delhi → Kedarnath</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <AccessTimeIcon fontSize="small" />
          <span>5 Days / 4 Nights</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <CalendarMonthIcon fontSize="small" />
          <span>Starts 08 Apr, 2025</span>
        </div>
        <div className="flex items-center text-yellow-500 text-sm gap-1">
          <StarIcon fontSize="small" />
          4.5
        </div>
        <div className="flex items-center text-[#C22A54] font-semibold mt-2 text-base">
          <CurrencyRupeeIcon fontSize="small" className="mr-1" />
          6,999 / person
        </div>

        <div className="flex justify-between items-center mt-4">
          <button className="text-sm font-medium text-[#C22A54] hover:underline">
            View Details
          </button>
          <button className="bg-[#C22A54] text-white px-4 py-1.5 text-sm rounded-full hover:bg-[#E53E3E] transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Sidebar Filters
const SidebarFilters: React.FC<{
  onApply?: () => void;
  onClear?: () => void;
}> = ({ onApply, onClear }) => {
  const tourTypes = ["Family", "Devotional", "Adventure", "Luxury"];
  const inclusions = ["Bus", "Hotel", "Meals", "Flight"];

  return (
    <aside className="bg-white p-4 rounded-xl shadow border border-gray-100 sticky top-6">
      <h3 className="text-lg font-semibold mb-4 text-[#C22A54]">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Tour Types</h4>
        <div className="space-y-2">
          {tourTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Inclusions</h4>
        <div className="space-y-2">
          {inclusions.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <p className="text-sm text-gray-500 mb-1">₹2,000 - ₹15,000</p>
        <input type="range" min="2000" max="15000" className="w-full" />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onClear}
          className="text-sm text-gray-600 hover:underline"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="bg-[#C22A54] text-white text-sm px-4 py-1.5 rounded-full hover:bg-[#E53E3E] transition"
        >
          Apply
        </button>
      </div>
    </aside>
  );
};

// Mobile Slide-in Filters
const SlideInMobileFilter: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#C22A54]">Filter Tours</h2>
        <button onClick={onClose} className="text-sm text-gray-600">
          Close
        </button>
      </div>
      <div className="overflow-y-auto p-4 h-full">
        <SidebarFilters onApply={onClose} onClear={() => {}} />
      </div>
    </div>
  );
};

// Main TourList Component
const TourListPage: React.FC = () => {
  const [tours, setTours] = useState([...Array(10).keys()]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem("helpPopupClosedAt");
    const now = Date.now();
    const shouldShow = !lastClosed || now - Number(lastClosed) > 15 * 60 * 1000;

    if (!shouldShow) return;

    let idleTimer: NodeJS.Timeout;
    let lastInteraction = Date.now();

    const resetTimer = () => {
      lastInteraction = Date.now();
    };

    const checkIdle = () => {
      const now = Date.now();
      if (now - lastInteraction >= 30000) {
        setShowHelpModal(true);
        clearInterval(idleTimer);
      }
    };

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("scroll", resetTimer);
    document.addEventListener("touchstart", resetTimer);

    idleTimer = setInterval(checkIdle, 5000);

    return () => {
      clearInterval(idleTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("scroll", resetTimer);
      document.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  const handleHelpClose = () => {
    setShowHelpModal(false);
    localStorage.setItem("helpPopupClosedAt", Date.now().toString());
  };

  const fetchMoreTours = () => {
    setTimeout(() => {
      const next = [...Array(6).keys()].map((_, i) => i + tours.length);
      setTours([...tours, ...next]);
      if (tours.length > 30) setHasMore(false);
    }, 1500);
  };

  return (
    <>
      {/* HERO */}
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url('/images/heroImage.png')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Tours</h1>
          <p className="text-sm mt-2">
            Discover the best experiences across India with Dadhich Travels.
          </p>
        </div>
      </section>

      {/* FILTER CHIPS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 overflow-x-auto">
        <div className="flex gap-3 whitespace-nowrap text-sm font-medium">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`relative px-4 py-2 rounded-full border ${
                selectedCategory === cat.label
                  ? "bg-[#C22A54] text-white"
                  : "border-gray-300 text-[#C22A54]"
              } hover:bg-[#C22A54]/10 transition`}
            >
              {cat.label}
              <span
                className={`absolute -top-2 -right-3 text-[10px] font-semibold rounded-full px-1.5 py-[2px] ${
                  selectedCategory === cat.label
                    ? "bg-white text-[#C22A54]"
                    : "bg-red-600 text-white"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SORT + FILTER BUTTON (Mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center lg:hidden">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex items-center gap-1 text-[#C22A54] font-medium"
        >
          <FilterListIcon /> Filters
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-700">
          Sort by <ArrowDropDownIcon />
        </button>
      </div>

      {/* PAGE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-full lg:w-1/4">
          <SidebarFilters />
        </aside>

        {/* Tour Cards */}
        <div className="w-full lg:w-3/4">
          {showNoData ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">
                No tours found for this filter.
              </p>
              <button className="bg-[#C22A54] text-white px-6 py-2 rounded-full">
                Let Us Help You Plan
              </button>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={tours.length}
              next={fetchMoreTours}
              hasMore={hasMore}
              loader={
                <p className="text-center py-4 text-sm text-gray-500">
                  Loading...
                </p>
              }
              endMessage={
                <p className="text-center text-gray-500 py-4">No more tours!</p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tours.map((id) => (
                  <TourCard key={id} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>

      {/* Mobile Filter */}
      <SlideInMobileFilter
        open={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
      />

      {/* Mobile Bottom Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 lg:hidden z-50">
        <button className="text-sm text-[#C22A54] font-medium">Contact</button>
        <button className="text-sm text-[#C22A54] font-medium">Query</button>
        <button className="text-sm text-[#C22A54] font-medium">WhatsApp</button>
      </div>

      {/* Help Widget Always Mounted */}
      <HelpWidget />
      {/* Help Modal */}
      <Dialog open={showHelpModal} onClose={handleHelpClose}>
        <div className="p-6 w-[90vw] max-w-md transition-all duration-500 transform animate-slide-up bg-white rounded-xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#C22A54]">Need Help?</h3>
            <button onClick={handleHelpClose}>
              <CloseIcon />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Let us help you plan your perfect tour! Fill in your details below.
          </p>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target as HTMLFormElement);

              const data = {
                name: form.get("name")?.toString().trim() || "",
                email: form.get("email")?.toString().trim() || "",
                phone: form.get("phone")?.toString().trim() || "",
                adults: form.get("adults")?.toString() || "1",
                children: form.get("children")?.toString() || "0",
                destination: form.get("destination")?.toString().trim() || "",
              };

              if (!data.name || !data.email || !data.phone) {
                alert("Please fill in Name, Email, and Phone Number.");
                return;
              }

              // Save to localStorage
              localStorage.setItem("helpFormData", JSON.stringify(data));
              localStorage.setItem("helpPopupClosedAt", Date.now().toString());

              console.log("Submitted:", data);
              setShowHelpModal(false);
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              defaultValue={
                JSON.parse(localStorage.getItem("helpFormData") || "{}").name ||
                ""
              }
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              defaultValue={
                JSON.parse(localStorage.getItem("helpFormData") || "{}")
                  .email || ""
              }
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              defaultValue={
                JSON.parse(localStorage.getItem("helpFormData") || "{}")
                  .phone || ""
              }
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />

            <div className="flex gap-2">
              <input
                type="number"
                name="adults"
                min={1}
                placeholder="Adults"
                defaultValue={
                  JSON.parse(localStorage.getItem("helpFormData") || "{}")
                    .adults || "1"
                }
                className="w-1/2 border px-3 py-2 rounded text-sm"
              />

              <input
                type="number"
                name="children"
                min={0}
                placeholder="Children"
                defaultValue={
                  JSON.parse(localStorage.getItem("helpFormData") || "{}")
                    .children || "0"
                }
                className="w-1/2 border px-3 py-2 rounded text-sm"
              />
            </div>

            <input
              type="text"
              name="destination"
              placeholder="Preferred Destination"
              defaultValue={
                JSON.parse(localStorage.getItem("helpFormData") || "{}")
                  .destination || ""
              }
              className="w-full border px-3 py-2 rounded text-sm"
            />

            <button
              type="submit"
              className="w-full bg-[#C22A54] text-white px-4 py-2 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default TourListPage;
