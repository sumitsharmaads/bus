import React, { useState } from "react";
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
import PlanMyTourModal from "../components/Admin/tours/components/PlanMyTourModal";

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
              <label className="text-white text-sm">Destination</label>
              <div className="flex items-center">
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
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="pl-10 pr-4 py-2 w-full bg-transparent text-white placeholder-white outline-none border-b-[2px] border-primary"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="ml-4 px-4 py-2 bg-[#C22A54] text-white rounded-full shadow-md hover:bg-[#E53E3E] transition">
              Search
            </button>
          </div>
        </div>
      </section>
      <div className="h-10 bg-[#1A1D2E]"></div>
      <UpcomingTours />
      <TopDestinations />
      {/* LIMITED SPOTS SECTION */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-gradient-to-r from-[#C22A54] to-[#E53E3E] rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold">
                ⏳ Hurry! Only <span className="underline">6 spots</span> left
                for <span className="italic">Kedarnath Yatra</span>
              </h2>
              <p className="text-sm mt-2">
                Trip starts on <strong>08 Apr, 2025</strong>. Book before it's
                full!
              </p>
            </div>
            <button className="bg-white text-[#C22A54] px-6 py-3 mt-4 md:mt-0 rounded-full font-semibold hover:bg-gray-100 transition">
              Book Your Spot →
            </button>
          </div>
        </div>
      </section>

      {/* TOUR CATEGORIES */}
      <section className="bg-[#F9FAFB] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Explore Tour Types
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <FamilyRestroomIcon />, label: "Family Tours" },
              { icon: <TempleBuddhistIcon />, label: "Devotional Yatra" },
              { icon: <TerrainIcon />, label: "Hill Stations" },
              { icon: <WeekendIcon />, label: "Weekend Getaways" },
              { icon: <DirectionsBusIcon />, label: "Adventure Trips" },
              { icon: <HotelIcon />, label: "Luxury Packages" },
              { icon: <VolunteerActivismIcon />, label: "Pilgrimage" },
              { icon: <ForestIcon />, label: "Wildlife Tours" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white hover:bg-[#F4F4F5] rounded-xl shadow p-6 flex flex-col items-center transition duration-300 hover:shadow-xl"
              >
                <div className="text-[#C22A54] text-3xl mb-2">{item.icon}</div>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* BOOKING STEPS */}
      <section className="bg-[#F9FAFB] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            How to Book a Tour
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Select Tour",
                desc: "Choose from upcoming or featured tours.",
              },
              {
                step: "2",
                title: "Fill Details",
                desc: "Tell us your travel info & preferences.",
              },
              {
                step: "3",
                title: "Confirm Booking",
                desc: "Get instant confirmation & updates.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl text-[#C22A54] font-bold mb-2">
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <HomePlacesExplore /> */}
      <YatraBooking />
      {/* PLAN MY TOUR CTA */}
      {/* <section className="bg-[#F9FAFB] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Want a Customized Tour?</h2>
          <p className="text-gray-700 mb-6">
            Can’t find a tour that suits your needs? Let us plan a personalized
            journey just for you.
          </p>
          <button className="bg-[#C22A54] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E53E3E] transition">
            Plan My Tour
          </button>
        </div>
      </section> */}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto bg-[#FDF2F8] border border-[#C22A54]/20 rounded-2xl shadow p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#C22A54]">
            Want a Customized Tour?
          </h2>
          <p className="text-gray-700 mb-6">
            Tell us your preferences and we’ll help plan a perfect journey, just
            for you.
          </p>
          <button
            className="bg-[#C22A54] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E53E3E] transition"
            onClick={() => setOpenTourForm(true)}
          >
            Plan My Tour
          </button>
        </div>
      </section>

      {/* <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto p-10 rounded-xl bg-gradient-to-br from-[#fff] to-[#FFF0F3] shadow text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#C22A54]">
            Let Us Help You Plan
          </h2>
          <p className="text-gray-700 mb-6">
            Still not sure what to book? We'll help craft the perfect tour for
            your journey.
          </p>
          <button className="bg-[#C22A54] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E53E3E] transition">
            Plan My Tour
          </button>
        </div>
      </section> */}
      <HomeCarousel />
      <PlanMyTourModal
        open={openTourForm}
        onClose={() => setOpenTourForm(false)}
      />
    </>
  );
};

export default WithSEO(Home, { title: "Dadhich Bus Services | Home" });
