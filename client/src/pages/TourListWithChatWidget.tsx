// FINAL TourList.tsx with integrated HelpWidget 💬

import React, { useEffect, useState } from "react";
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
import HelpWidget from "./HelpWidget"; // ✅ Chat-style widget

const categories = [
  { label: "All", count: 20 },
  { label: "Devotional", count: 6 },
  { label: "Family", count: 5 },
  { label: "Adventure", count: 4 },
  { label: "Luxury", count: 5 },
];

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

const TourList: React.FC = () => {
  const [tours, setTours] = useState([...Array(10).keys()]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const fetchMoreTours = () => {
    setTimeout(() => {
      const next = [...Array(6).keys()].map((_, i) => i + tours.length);
      setTours([...tours, ...next]);
      if (tours.length > 30) setHasMore(false);
    }, 1500);
  };

  return (
    <>
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full">
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
        </div>
      </div>

      {/* Help Widget Always Mounted */}
      <HelpWidget />
    </>
  );
};

export default TourList;
