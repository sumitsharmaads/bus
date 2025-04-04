import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import MapIcon from "@mui/icons-material/Map";
import {
  FlightTakeoff,
  DirectionsCar,
  Restaurant,
  Hotel,
  TravelExplore,
} from "@mui/icons-material";
import AboutTourSection from "./AboutTourSection";
import ItinerarySection from "./ItinerarySection";
import BookingSidebar from "./admin/BookingSlideBox";

const tour = {
  tourName: "Kedarnath yatra",
  image: { url: "/images/heroImage.png" },
  price: "6999",
  inclusions: ["Bus", "Meals", "Hotel", "Sightseeing"],
  types: ["Family", "Group", "Hills"],
  description:
    "Join us on a spiritual journey to Kedarnath with guided temple visits, scenic treks, and peaceful stays in the Himalayas. Explore the beauty of the Himalayas, immerse in spiritual vibes, and create memories of a lifetime. Suitable for all age groups.",
};

const inclusions = [
  { label: "Flight", icon: <FlightTakeoff /> },
  { label: "Transfer", icon: <DirectionsCar /> },
  { label: "Breakfast", icon: <Restaurant /> },
  { label: "Hotel", icon: <Hotel /> },
  { label: "Sightseeing", icon: <TravelExplore /> },
];

const BookingBox = () => (
  <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
    <div className="flex justify-around text-[#C22A54]">
      <div className="flex flex-col items-center text-sm">
        <PhoneIcon fontSize="small" />
        <span>Call</span>
      </div>
      <div className="flex flex-col items-center text-sm">
        <HelpOutlineIcon fontSize="small" />
        <span>Query</span>
      </div>
    </div>
    <div className="text-center">
      <p className="text-xl font-bold text-[#C22A54]">₹ {tour.price}</p>
      <p className="text-xs text-gray-500">per person</p>
    </div>
    <button className="bg-[#C22A54] hover:bg-[#a92044] text-white w-full py-2 rounded-full flex items-center justify-center gap-1">
      <ShoppingCartIcon fontSize="small" />
      Book Now
    </button>
  </div>
);

const TourDetailPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
    {/* ===================== Hero Section ===================== */}
    <section className="relative w-full mb-12">
      <img
        src={tour.image.url}
        alt="Kedarnath Tour"
        className="w-full h-[45vh] sm:h-[60vh] md:h-[65vh] object-cover rounded-2xl shadow-lg"
      />
      {/* Tour Name and Types (with Icons) */}
      <div className="absolute top-16 left-4 sm:left-6 md:left-8 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold">{tour.tourName}</h1>
        <div className="flex gap-3 mt-2">
          {tour.types.map((type) => (
            <span
              key={type}
              className="bg-[#C22A54] text-white rounded-full px-3 py-1 text-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      {/* Floating Booking Box - Responsive */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-auto md:bottom-10 md:right-12 w-44 sm:w-56 bg-white text-gray-800 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center gap-3 border border-gray-200">
        <div className="flex justify-between w-full text-xs sm:text-sm text-center text-[#C22A54]">
          <div className="flex flex-col items-center">
            <PhoneIcon fontSize="small" />
            <span className="mt-1">Call</span>
          </div>
          <div className="flex flex-col items-center">
            <HelpOutlineIcon fontSize="small" />
            <span className="mt-1">Query</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold text-[#C22A54]">
            ₹ {tour.price}
          </p>
          <p className="text-xs text-gray-500">per person</p>
        </div>
        <button className="bg-[#C22A54] hover:bg-[#a92044] text-white text-sm rounded-full px-4 py-1.5 w-full flex items-center justify-center gap-1">
          <ShoppingCartIcon fontSize="small" />
          Book Now
        </button>
      </div>
    </section>

    {/* ========== Mobile/Tablet: Booking Box BEFORE Content ========== */}
    <div className="block lg:hidden mb-8">
      <BookingSidebar />
    </div>

    {/* ===================== Main Content Grid ===================== */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Tour Content */}
      <div className="lg:col-span-2 space-y-10">
        {/* ===================== About Section ===================== */}
        <section>
          <AboutTourSection description={tour.description} />
        </section>

        {/* ===================== Inclusions Section ===================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Inclusions
          </h3>
          <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-wrap sm:flex-nowrap justify-between items-center text-center gap-6">
            {inclusions.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center text-gray-700 hover:text-[#C22A54] transition-all duration-300 ease-in-out w-1/2 sm:w-auto flex-1"
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =======================Itenary */}
        <ItinerarySection />
      </div>

      {/* RIGHT: Sticky Booking Box (desktop only) */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <BookingSidebar />
        </div>
      </div>
    </div>
  </div>
);

export default TourDetailPage;
