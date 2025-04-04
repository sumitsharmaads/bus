import React, { useRef, useState } from "react";
import { UpcomingTours } from "../components/UpcomingTours";
import { HomePlacesExplore, YatraBooking } from "../components";
import { HomeCarousel } from "../components/HomeCarousel";
import WithSEO from "../SEO/WithSEO";
import TopDestinations from "../components/TopDestinations";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import TerrainIcon from "@mui/icons-material/Terrain";
import WeekendIcon from "@mui/icons-material/Weekend";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ForestIcon from "@mui/icons-material/Forest";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import PlanMyTourModal from "../components/Admin/tours/components/PlanMyTourModal";
import SearchTourBar from "../components/SearchTourBar";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TourCategorySlider from "./admin/TourCategories";
import { Box } from "@mui/material";
import HelpWidget from "./HelpWidget";

const categories = [
  {
    name: "Family Tours",
    icon: <FamilyRestroomIcon />,
    bg: "bg-pink-200",
  },
  {
    name: "Devotional Yatra",
    icon: <TempleHinduIcon />,
    bg: "bg-yellow-100",
  },
  {
    name: "Hill Stations",
    icon: <TerrainIcon />,
    bg: "bg-blue-200",
  },
  {
    name: "Weekend Getaways",
    icon: <WeekendIcon />,
    bg: "bg-green-200",
  },
  {
    name: "Adventure Trips",
    icon: <DirectionsBusIcon />,
    bg: "bg-purple-200",
  },
];

const TourCategories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box className="relative w-full overflow-hidden px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Tour Types
        </h2>
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          {/* Categories Scrollable Wrapper */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth space-x-6 pb-4 scrollbar-hide"
          >
            {categories.map((category, i) => (
              <Box
                key={i}
                className={`min-w-[180px] h-[120px] rounded-2xl shadow-md flex flex-col justify-center items-center ${category.bg}`}
              >
                <Box className="text-rose-600 text-3xl">{category.icon}</Box>
                <span className="font-medium text-sm p-4">{category.name}</span>
              </Box>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </Box>
  );
};

const Home: React.FC = () => {
  const [openTourForm, setOpenTourForm] = useState(false);
  return (
    <>
      <section
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('images/heroImage.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 md:px-8">
          <h3 className="text-sm md:text-base font-semibold text-[#C22A54] tracking-wider uppercase font-poppins">
            Best Destinations Around the World
          </h3>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            The World Awaits: Travel with Us
          </h1>
          <p className="text-sm md:text-lg mt-4 max-w-xl mx-auto">
            Manage the planning; focused on making memories. Our friendly team
            makes sure that everything is taken care of, helping you to have a
            hassle-free and delightful trip.
          </p>
          <button className="mt-6 px-6 py-2 bg-[#C22A54] text-white rounded-full shadow-lg hover:bg-[#E53E3E] transition duration-300">
            Know More
          </button>
        </div>

        {/* Simplified Search Bar */}
        <div className="absolute -bottom-8 flex justify-center w-full px-4 md:px-8">
          <div className="bg-[#202542] bg-opacity-90 p-4 rounded-full flex items-center w-full max-w-lg">
            {/* Destination Input */}
            <div className="flex flex-col items-start relative flex-grow">
              <div className="flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white absolute left-3 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h4l3 10h4l3-8h4"
                  />
                </svg>
                <SearchTourBar />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-10 bg-[#1A1D2E]"></div>
      <UpcomingTours />
      <TopDestinations />

      {/* TOUR CATEGORIES */}
      <TourCategories />

      {/* REGIONS */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Explore India by Region</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "North India",
              "South India",
              "West India",
              "East India",
              "North-East",
              "Central India",
            ].map((region, i) => (
              <span
                key={i}
                className="px-6 py-2 bg-[#C22A54]/10 text-[#C22A54] font-semibold rounded-full text-sm"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING STEPS & HomePlacesExplore  */}
      <YatraBooking />
      <section className="py-16 px-4 bg-[#F5FAFB]">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center bg-[#E1F4F6] rounded-xl shadow-lg p-10 text-center">
          <div className="flex justify-center mb-6">
            {/* Icon for Plan Your Own Tour */}
            <div className="p-4 bg-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#00A6A6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7M5 19l7-7-7-7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#00A6A6] mb-4">
            Plan Your Own Tour
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Customize your trip according to your preferences
          </p>
          <button
            className="bg-[#00A6A6] text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-[#007E7E] transition duration-300"
            onClick={() => setOpenTourForm(true)}
          >
            Get Started
          </button>
        </div>
      </section>
      <HomeCarousel />
      <PlanMyTourModal
        open={openTourForm}
        onClose={() => setOpenTourForm(false)}
      />
      <HelpWidget />
    </>
  );
};

export default WithSEO(Home, { title: "Dadhich Bus Services | Home" });
