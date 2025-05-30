import React, { useRef, useState } from "react";
import { UpcomingTours } from "../components/UpcomingTours";
import { HomePlacesExplore, TourCategories, YatraBooking } from "../components";
import { HomeCarousel } from "../components/HomeCarousel";
import WithSEO from "../SEO/WithSEO";
import TopDestinations from "../components/TopDestinations";
import PlanMyTourModal from "../components/Admin/tours/components/PlanMyTourModal";
import SearchTourBar from "../components/SearchTourBar";
import HelpWidget from "./HelpWidget";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../navigation";

const Home: React.FC = () => {
  const navigate = useNavigate();
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
          <button
            className="mt-6 px-6 py-2 bg-[#C22A54] text-white rounded-full shadow-lg hover:bg-[#E53E3E] transition duration-300"
            onClick={() => navigate(PublicRoutes.ABOUT_US)}
          >
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
