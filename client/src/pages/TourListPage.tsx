import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Dialog,
  Checkbox,
  FormControlLabel,
  Slider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import HelpWidget from "./HelpWidget";

// Enhanced Brand Colors
const BRAND_COLOR = "#C22A54";
const BRAND_COLOR_HOVER = "#A82046"; // Darker for hover
const BRAND_TEXT_COLOR = "#C22A54"; // For text
const BRAND_COLOR_LIGHT = "#FDECF2"; // Lighter shade for backgrounds/accents (Tailwind pink-50 equivalent)
const BRAND_COLOR_ULTRALIGHT_HOVER = "#FCE7F3"; // Slightly darker light for hover (Tailwind pink-100)

// "Best Seller" Tag Styling
const BEST_SELLER_BG = `bg-[${BRAND_COLOR_LIGHT}]`;
const BEST_SELLER_TEXT = `text-[${BRAND_TEXT_COLOR}]`;
const BEST_SELLER_BORDER = `border border-[${BRAND_COLOR}]/30`; // Subtle border

const MUTED_ICON_COLOR = "text-gray-500";

const categories = [
  { label: "All", count: 20 },
  { label: "Devotional", count: 6 },
  { label: "Family", count: 5 },
  { label: "Adventure", count: 4 },
  { label: "Luxury", count: 5 },
];

// --- Tour Options Dialog ---
const TourOptionsDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  tourTitle: string;
}> = ({ open, onClose, tourTitle }) => {
  const dummyOptions = [
    {
      id: 1,
      name: "Standard Bus (Volvo)",
      priceModifier: 0,
      details: "Comfortable AC Volvo bus.",
    },
    {
      id: 2,
      name: "Sleeper Bus Option",
      priceModifier: 300,
      details: "Overnight sleeper bus for more comfort.",
    },
    {
      id: 3,
      name: "Tempo Traveller (Group)",
      priceModifier: -200,
      details: "Shared Tempo Traveller, cost-effective.",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          minWidth: { xs: "90vw", sm: "380px" },
          m: 2,
        },
      }}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h3
            className="text-lg font-semibold"
            style={{ color: BRAND_TEXT_COLOR }}
          >
            {tourTitle} - Options
          </h3>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary", mr: -1.5, mt: -1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Select your preferred travel or package option.
        </p>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {dummyOptions.map((option) => (
            <div
              key={option.id}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {option.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {option.details}
                  </p>
                </div>
                <button
                  className="text-xs text-white px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ml-2"
                  style={{ backgroundColor: BRAND_COLOR }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_COLOR)
                  }
                >
                  Select
                </button>
              </div>
              {option.priceModifier !== 0 && (
                <p
                  className={`text-xs mt-1 ${
                    option.priceModifier > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {option.priceModifier > 0
                    ? `+ ₹${option.priceModifier}`
                    : `- ₹${Math.abs(option.priceModifier)}`}{" "}
                  / person
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

// --- Tour Card ---
interface TourCardProps {
  id: number;
  title: string;
  imageSrc: string;
  location: string;
  duration: string;
  startDate: string;
  rating: number;
  reviewsCount: number;
  price: number;
  optionsCount?: number;
  isBestSeller?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  imageSrc,
  location,
  duration,
  startDate,
  rating,
  reviewsCount,
  price,
  optionsCount = 1,
  isBestSeller = false,
}) => {
  const [optionsDialogOpen, setOptionsDialogOpen] = useState(false);

  const handleOpenOptionsDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsDialogOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 group border border-gray-100 flex flex-col h-full">
        <div className="relative">
          <div className="relative overflow-hidden h-48 md:h-52 group">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {isBestSeller && (
              <span
                className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm ${BEST_SELLER_BG} ${BEST_SELLER_TEXT} ${BEST_SELLER_BORDER}`}
              >
                BEST SELLER
              </span>
            )}

            {optionsCount > 1 && (
              <button
                onClick={handleOpenOptionsDialog}
                className="absolute bottom-2.5 right-2.5 bg-black/60 hover:bg-black/80 text-white text-[10px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 backdrop-blur-sm shadow group-hover:opacity-100 opacity-80"
                title="View Options"
              >
                {optionsCount} Options
              </button>
            )}
          </div>
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <IconButton
              size="small"
              title="Add to Wishlist"
              sx={{
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                  color: BRAND_COLOR,
                },
                color: "text.secondary",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "5px",
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              title="Compare/Share"
              sx={{
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                  color: BRAND_COLOR,
                },
                color: "text.secondary",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: "5px",
              }}
            >
              <LinkIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow space-y-2.5">
          <h3
            className="text-md font-semibold text-gray-800 cursor-pointer line-clamp-2 hover:text-[${BRAND_TEXT_COLOR}]"
            title={title}
          >
            {title}
          </h3>

          <div
            className={`flex items-center text-xs ${MUTED_ICON_COLOR} gap-1.5`}
          >
            <LocationOnIcon sx={{ fontSize: 15, mt: "-1px" }} />{" "}
            <span className="text-gray-700">{location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 gap-1.5">
            <AccessTimeIcon
              sx={{ fontSize: 15, mt: "-1px", color: MUTED_ICON_COLOR }}
            />{" "}
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 gap-1.5">
            <CalendarMonthIcon
              sx={{ fontSize: 15, mt: "-1px", color: MUTED_ICON_COLOR }}
            />{" "}
            <span>{startDate}</span>
          </div>

          <div className="flex items-center text-xs gap-1 pt-0.5">
            <StarIcon sx={{ fontSize: 16, color: "#FACC15" }} />{" "}
            {/* Tailwind yellow-400 */}
            <span className="font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>
            <span className="text-gray-400 text-[11px]">
              ({reviewsCount} reviews)
            </span>
          </div>

          <div className="pt-2 mt-auto">
            {" "}
            {/* Pushes price and button to bottom */}
            <div>
              <span
                className="text-xl font-bold"
                style={{ color: BRAND_TEXT_COLOR }}
              >
                <CurrencyRupeeIcon
                  sx={{ fontSize: 19, mb: "2px", mr: "-2px" }}
                />
                {price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-0.5">/ person</span>
              {optionsCount > 1 && (
                <span className="text-[11px] text-gray-400 ml-1">
                  (starting)
                </span>
              )}
            </div>
            <button
              className="w-full mt-2.5 text-white px-4 py-2 text-[13px] rounded-lg transition-colors shadow-md hover:shadow-lg font-semibold"
              style={{ backgroundColor: BRAND_COLOR }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_COLOR)
              }
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      {optionsCount > 1 && (
        <TourOptionsDialog
          open={optionsDialogOpen}
          onClose={() => setOptionsDialogOpen(false)}
          tourTitle={title}
        />
      )}
    </>
  );
};

// --- SidebarFilters (Small tweaks for color consistency) ---
const SidebarFilters: React.FC<{
  onApply?: () => void;
  onClear?: () => void;
}> = ({ onApply, onClear }) => {
  const tourTypes = ["Family", "Devotional", "Adventure", "Luxury"];
  const inclusions = ["Bus", "Hotel", "Meals", "Flight"];
  const [priceRange, setPriceRange] = useState<number[]>([2000, 15000]);
  const handlePriceChange = (event: Event, newValue: number | number[]) =>
    setPriceRange(newValue as number[]);

  return (
    <aside className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 sticky top-6">
      <div
        className="h-1.5 rounded-t-md -mt-5 -mx-5 mb-4"
        style={{ backgroundColor: BRAND_COLOR }}
      />
      <h3 className="text-lg font-semibold mb-5 text-gray-800">Filters</h3>
      {/* Tour Types */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">Tour Types</h4>
        <div className="space-y-0.5">
          {tourTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    "&.Mui-checked": { color: BRAND_COLOR },
                    p: "4px 8px 4px 0px",
                  }}
                />
              }
              label={<span className="text-xs text-gray-700">{type}</span>}
            />
          ))}
        </div>
      </div>
      {/* Inclusions */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">Inclusions</h4>
        <div className="space-y-0.5">
          {inclusions.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    "&.Mui-checked": { color: BRAND_COLOR },
                    p: "4px 8px 4px 0px",
                  }}
                />
              }
              label={<span className="text-xs text-gray-700">{item}</span>}
            />
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-1 text-sm">Price Range</h4>
        <p className="text-xs text-gray-500 mb-2">
          ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </p>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={35000}
          step={500}
          size="small"
          sx={{
            color: BRAND_COLOR,
            "& .MuiSlider-thumb": { width: 14, height: 14 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
              backgroundColor: BRAND_COLOR_HOVER,
            },
          }}
        />
      </div>
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-1 text-sm">Duration</h4>
        <p className="text-xs text-gray-500 mb-2">
          {priceRange[0].toLocaleString()}N - {priceRange[1].toLocaleString()}N
        </p>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={15}
          step={500}
          size="small"
          sx={{
            color: BRAND_COLOR,
            "& .MuiSlider-thumb": { width: 14, height: 14 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
              backgroundColor: BRAND_COLOR_HOVER,
            },
          }}
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClear}
          className={`text-sm font-medium px-5 py-1.5 rounded-lg border transition hover:bg-[${BRAND_COLOR_ULTRALIGHT_HOVER}]`}
          style={{ borderColor: BRAND_COLOR, color: BRAND_TEXT_COLOR }}
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="text-white text-sm px-5 py-1.5 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
          style={{ backgroundColor: BRAND_COLOR }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = BRAND_COLOR)
          }
        >
          Apply
        </button>
      </div>
    </aside>
  );
};

// --- SlideInMobileFilter (Ensuring consistency) ---
const SlideInMobileFilter: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => (
  <div
    className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold" style={{ color: BRAND_TEXT_COLOR }}>
        Filter Tours
      </h2>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ color: "text.secondary" }}
      >
        <CloseIcon />
      </IconButton>
    </div>
    <div className="overflow-y-auto p-4 h-[calc(100%-60px)]">
      <SidebarFilters onApply={onClose} onClear={() => {}} />
    </div>
  </div>
);

// --- Main TourList Page ---
const TourListPage: React.FC = () => {
  // Dummy tour data with new fields
  const initialTourData: TourCardProps[] = [
    {
      id: 1,
      title: "Spiritual Kedarnath Yatra",
      imageSrc: "/images/tours/kedarnath.jpg",
      location: "Delhi → Kedarnath",
      duration: "5 Days / 4 Nights",
      startDate: "08 Apr, 2025",
      rating: 4.7,
      reviewsCount: 150,
      price: 6999,
      optionsCount: 3,
      isBestSeller: true,
    },
    {
      id: 2,
      title: "Vaishno Devi Darshan",
      imageSrc: "/images/tours/vaishno-devi.jpg",
      location: "Jammu → Katra",
      duration: "3 Days / 2 Nights",
      startDate: "15 May, 2025",
      rating: 4.9,
      reviewsCount: 210,
      price: 4500,
      isBestSeller: true,
    },
    {
      id: 3,
      title: "Golden Temple Amritsar Tour",
      imageSrc: "/images/tours/amritsar.jpg",
      location: "Amritsar City",
      duration: "2 Days / 1 Night",
      startDate: "20 Jun, 2025",
      rating: 4.6,
      reviewsCount: 95,
      price: 3200,
      optionsCount: 2,
    },
    {
      id: 4,
      title: "Rishikesh Adventure Camp",
      imageSrc: "/images/tours/rishikesh.jpg",
      location: "Rishikesh River Side",
      duration: "3 Days / 2 Nights",
      startDate: "10 Jul, 2025",
      rating: 4.8,
      reviewsCount: 180,
      price: 5500,
      optionsCount: 4,
    },
    {
      id: 5,
      title: "Char Dham Yatra Special",
      imageSrc: "/images/tours/char-dham.jpg",
      location: "Uttarakhand Circuit",
      duration: "10 Days / 9 Nights",
      startDate: "01 Sep, 2025",
      rating: 4.5,
      reviewsCount: 75,
      price: 18500,
      isBestSeller: false,
    },
    {
      id: 6,
      title: "Haridwar Ganga Aarti Trip",
      imageSrc: "/images/tours/haridwar.jpg",
      location: "Haridwar Ghats",
      duration: "2 Days / 1 Night",
      startDate: "05 Oct, 2025",
      rating: 4.7,
      reviewsCount: 110,
      price: 2800,
    },
  ];

  const [tours, setTours] = useState<TourCardProps[]>(initialTourData);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    /* Idle timer logic from previous code */
    const lastClosed = localStorage.getItem("helpPopupClosedAt");
    const now = Date.now();
    const shouldShowInitially =
      !lastClosed || now - Number(lastClosed) > 1 * 60 * 1000;
    if (!shouldShowInitially) return;
    let idleTimer: NodeJS.Timeout;
    let lastInteraction = Date.now();
    const resetTimer = () => {
      lastInteraction = Date.now();
      if (document.querySelector('.MuiDialog-root[role="dialog"]')) return;
    };
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastInteraction >= 30000) {
        if (!document.querySelector('.MuiDialog-root[role="dialog"]')) {
          setShowHelpModal(true);
        }
        clearInterval(idleTimer);
      }
    };
    const eventTypes: (keyof DocumentEventMap)[] = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];
    eventTypes.forEach((type) => document.addEventListener(type, resetTimer));
    idleTimer = setInterval(checkIdle, 5000);
    return () => {
      clearInterval(idleTimer);
      eventTypes.forEach((type) =>
        document.removeEventListener(type, resetTimer)
      );
    };
  }, []);

  const handleHelpClose = () => {
    setShowHelpModal(false);
    localStorage.setItem("helpPopupClosedAt", Date.now().toString());
  };

  const fetchMoreTours = useCallback(() => {
    if (tours.length >= 12) {
      setHasMore(false);
      return;
    } // Max 12 tours for demo
    setTimeout(() => {
      const moreTours: TourCardProps[] = [
        // Example of adding more tours
        {
          id: tours.length + 1,
          title: `New Tour ${tours.length + 1}`,
          imageSrc: "/images/tours/kedarnath.jpg",
          location: "New Location",
          duration: "X Days / Y Nights",
          startDate: "Future Date",
          rating: 4.2,
          reviewsCount: 30,
          price: 5000 + tours.length * 100,
          optionsCount: Math.floor(Math.random() * 3) + 1,
        },
        {
          id: tours.length + 2,
          title: `Another Tour ${tours.length + 2}`,
          imageSrc: "/images/tours/amritsar.jpg",
          location: "Another Spot",
          duration: "A Days / B Nights",
          startDate: "Some Date",
          rating: 4.4,
          reviewsCount: 40,
          price: 6000 + tours.length * 100,
          isBestSeller: Math.random() > 0.7,
        },
      ];
      setTours((prevTours) => [...prevTours, ...moreTours]);
    }, 800);
  }, [tours.length]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url('/images/heroImage.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold [text-shadow:0_2px_5px_rgba(0,0,0,0.5)]">
            Explore Our Tours
          </h1>
          <p className="text-md md:text-lg mt-3 text-white/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] max-w-xl mx-auto">
            Discover the best experiences across India with Dadhich Travels.
          </p>
        </div>
      </section>

      {/* MOBILE: SORT + FILTER BUTTON */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center lg:hidden border-b border-gray-200 bg-slate-50 sticky top-0 z-30">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[${BRAND_TEXT_COLOR}] p-2 rounded-md hover:bg-[${BRAND_COLOR_ULTRALIGHT_HOVER}] transition-colors"
        >
          <FilterListIcon fontSize="small" /> Filters
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[${BRAND_TEXT_COLOR}] p-2 rounded-md hover:bg-[${BRAND_COLOR_ULTRALIGHT_HOVER}] transition-colors">
          Sort by <ArrowDropDownIcon />
        </button>
      </div>

      {/* FILTER CHIPS (CATEGORIES) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 overflow-x-auto">
        <div className="flex gap-2.5 whitespace-nowrap pb-1.5">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm
                ${
                  selectedCategory === cat.label
                    ? `text-white border-transparent`
                    : `bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:text-gray-800`
                }`}
              style={
                selectedCategory === cat.label
                  ? { backgroundColor: BRAND_COLOR }
                  : {}
              }
            >
              {cat.label}
              <span
                className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5
                  ${
                    selectedCategory === cat.label
                      ? "bg-white/25 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PAGE LAYOUT: SIDEBAR + TOUR CARDS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-10 flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-full lg:w-[280px] flex-shrink-0">
          {" "}
          {/* Fixed width for sidebar */}
          <SidebarFilters />
        </aside>
        <main className="w-full">
          {showNoData ? (
            /* ... No Data Message ... */ <div />
          ) : (
            <InfiniteScroll
              dataLength={tours.length}
              next={fetchMoreTours}
              hasMore={hasMore}
              loader={
                <div className="text-center py-6 flex flex-col items-center justify-center text-gray-500">
                  <CircularProgress
                    size={28}
                    sx={{ color: BRAND_COLOR, mb: "10px" }}
                  />
                  <p className="text-xs">Loading...</p>
                </div>
              }
              endMessage={
                <p className="text-center text-gray-400 py-6 text-xs">
                  You've explored all tours!
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </main>
      </div>

      {/* Mobile Filter Backdrop & Drawer */}
      {showMobileFilter && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setShowMobileFilter(false)}
        />
      )}
      <SlideInMobileFilter
        open={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
      />

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-stretch py-1.5 px-1 lg:hidden z-40 shadow-top">
        {[
          {
            label: "Contact",
            icon: <CallIcon sx={{ fontSize: 18, mb: 0.25 }} />,
          },
          {
            label: "Query",
            icon: <QuestionAnswerIcon sx={{ fontSize: 18, mb: 0.25 }} />,
          },
          {
            label: "WhatsApp",
            icon: <WhatsAppIcon sx={{ fontSize: 18, mb: 0.25 }} />,
          },
        ].map((item) => (
          <button
            key={item.label}
            className="flex-1 flex flex-col items-center text-[11px] font-medium p-1.5 rounded-md transition-colors"
            style={{ color: BRAND_TEXT_COLOR }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                BRAND_COLOR_ULTRALIGHT_HOVER)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* HELP WIDGET & MODAL */}
      <HelpWidget />
      <Dialog
        open={showHelpModal}
        onClose={handleHelpClose}
        PaperProps={{
          className:
            "w-[90vw] max-w-sm transition-all duration-300 transform animate-slide-up !rounded-xl !shadow-2xl !m-0",
        }}
        sx={{
          "& .MuiDialog-container": { alignItems: "flex-end" },
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="p-5 bg-white rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h3
              className="text-lg font-semibold"
              style={{ color: BRAND_TEXT_COLOR }}
            >
              Need Help Planning?
            </h3>
            <IconButton
              onClick={handleHelpClose}
              size="small"
              sx={{ color: "text.secondary", mr: -1, mt: -0.5 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            Let us help you plan your perfect tour! Fill in your details.
          </p>
          <form
            className="space-y-3.5"
            onSubmit={(e) => {
              /* ... form submission logic ... */ e.preventDefault();
              handleHelpClose();
            }}
          >
            {[
              { name: "name", placeholder: "Your Name", type: "text" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "phone", placeholder: "Phone Number", type: "tel" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                defaultValue={
                  JSON.parse(localStorage.getItem("helpFormData") || "{}")[
                    field.name
                  ] || ""
                }
                className="w-full border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm focus:ring-1 focus:outline-none transition-all duration-150"
                style={{ "--tw-ring-color": BRAND_COLOR } as any}
                onFocus={(e) => {
                  e.target.style.borderColor = BRAND_COLOR;
                  e.target.style.boxShadow = `0 0 0 1px ${BRAND_COLOR}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgb(209 213 219)";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
            ))}
            <div className="flex gap-3">
              <input
                type="number"
                name="adults"
                min={1}
                placeholder="Adults"
                defaultValue={
                  JSON.parse(localStorage.getItem("helpFormData") || "{}")
                    .adults || "1"
                }
                className="w-1/2 border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm focus:ring-1 focus:outline-none transition-all duration-150"
                style={{ "--tw-ring-color": BRAND_COLOR } as any}
                onFocus={(e) => {
                  e.target.style.borderColor = BRAND_COLOR;
                  e.target.style.boxShadow = `0 0 0 1px ${BRAND_COLOR}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgb(209 213 219)";
                  e.target.style.boxShadow = "none";
                }}
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
                className="w-1/2 border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm focus:ring-1 focus:outline-none transition-all duration-150"
                style={{ "--tw-ring-color": BRAND_COLOR } as any}
                onFocus={(e) => {
                  e.target.style.borderColor = BRAND_COLOR;
                  e.target.style.boxShadow = `0 0 0 1px ${BRAND_COLOR}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgb(209 213 219)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <input
              type="text"
              name="destination"
              placeholder="Preferred Destination (Optional)"
              defaultValue={
                JSON.parse(localStorage.getItem("helpFormData") || "{}")
                  .destination || ""
              }
              className="w-full border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm focus:ring-1 focus:outline-none transition-all duration-150"
              style={{ "--tw-ring-color": BRAND_COLOR } as any}
              onFocus={(e) => {
                e.target.style.borderColor = BRAND_COLOR;
                e.target.style.boxShadow = `0 0 0 1px ${BRAND_COLOR}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgb(209 213 219)";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              className="w-full text-white px-4 py-2.5 rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg text-sm"
              style={{ backgroundColor: BRAND_COLOR }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = BRAND_COLOR)
              }
            >
              Submit My Request
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default TourListPage;
