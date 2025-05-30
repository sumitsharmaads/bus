import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckIcon from "@mui/icons-material/Check";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const mockTour = {
  tourname: "Kedarnath Devotional Yatra",
  duration: "5 Days / 4 Nights",
  startDate: "2025-04-08",
  endDate: "2025-04-12",
  minfair: "6999",
  inclusive: ["Bus", "Meals", "Hotel", "Sightseeing"],
  places: [
    { name: "Kedarnath", state: "Uttarakhand" },
    { name: "Guptkashi", state: "Uttarakhand" },
  ],
  source: [
    {
      location: {
        name: "Delhi",
        state: "Delhi",
      },
      fare: 6999,
      onBoarding: ["Kashmiri Gate - 7:00 AM", "Majnu Ka Tila - 7:30 AM"],
    },
  ],
  stayDescription: [
    { nights: 1, place: "Guptkashi" },
    { nights: 2, place: "Kedarnath" },
  ],
  itenary: [
    {
      title: "Departure from Delhi",
      shortDescription: "Board your bus and begin your journey to Kedarnath.",
      toggles: ["Transfer", "Meals"],
      sightseeing: ["Bus Journey", "Dinner on route"],
    },
    {
      title: "Arrival at Guptkashi",
      shortDescription: "Check-in and relax. Dinner and overnight stay.",
      toggles: ["Hotel", "Meals"],
      sightseeing: ["Evening aarti"],
    },
    {
      title: "Kedarnath Trek",
      shortDescription: "Early start for temple trek and return.",
      toggles: ["Sightseeing", "Transfer"],
      sightseeing: ["Darshan", "Mandakini River"],
    },
  ],
  description:
    "Join us on a spiritual journey to Kedarnath with guided temple visits, scenic treks, and peaceful stays in the Himalayas.",
};

const TourDetailPage: React.FC = () => {
  const tour = mockTour;

  return (
    <div className="relative font-sans">
      {/* Sticky Top CTA Bar */}
      <div className="sticky top-0 z-50 bg-white shadow px-4 py-2 flex justify-between items-center border-b">
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          {tour.tourname}
        </h2>
        <div className="flex gap-2 text-sm">
          <button className="text-[#C22A54] border px-3 py-1 rounded-full">
            <PhoneIcon fontSize="small" /> Call
          </button>
          <button className="text-[#C22A54] border px-3 py-1 rounded-full">
            <QuestionAnswerIcon fontSize="small" /> Query
          </button>
          <button className="bg-[#C22A54] text-white px-4 py-1 rounded-full">
            <ShoppingCartIcon fontSize="small" /> Book Now
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-end p-8 text-white"
        style={{ backgroundImage: `url('/images/heroImage.png')` }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded">
          <h1 className="text-3xl font-bold">{tour.tourname}</h1>
          <p className="text-sm">{tour.duration}</p>
          <div className="flex gap-4 items-center mt-1 text-yellow-300 text-sm">
            <CalendarMonthIcon fontSize="small" />
            {new Date(tour.startDate).toDateString()} —{" "}
            {new Date(tour.endDate).toDateString()}
            <CurrencyRupeeIcon fontSize="small" />
            <span className="font-bold text-white">
              ₹ {tour.minfair} / person
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Boarding & Stay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-[#C22A54] mb-2">
              Boarding & Fare
            </h3>
            <p className="text-gray-700 flex items-center gap-1">
              <LocationOnIcon fontSize="small" />
              {tour.source[0].location.name}, {tour.source[0].location.state}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <CurrencyRupeeIcon fontSize="small" className="text-[#C22A54]" />₹{" "}
              {tour.source[0].fare}
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm text-gray-500">
              {tour.source[0].onBoarding.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#C22A54] mb-2">
              Stay Details
            </h3>
            {tour.stayDescription.map((stay, i) => (
              <p
                key={i}
                className="text-sm flex items-center gap-1 text-gray-700"
              >
                <HotelIcon fontSize="small" />
                {stay.nights} Night(s) in {stay.place}
              </p>
            ))}
          </div>
        </div>

        {/* Inclusions */}
        <div>
          <h3 className="text-xl font-semibold text-[#C22A54] mb-2">
            Inclusions
          </h3>
          <div className="flex flex-wrap gap-3">
            {tour.inclusive.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-pink-50 text-[#C22A54] px-3 py-1 rounded-full text-sm border border-[#C22A54]"
              >
                <CheckIcon fontSize="small" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Places Covered */}
        <div>
          <h3 className="text-xl font-semibold text-[#C22A54] mb-2">
            Places Covered
          </h3>
          <div className="flex gap-2 flex-wrap">
            {tour.places.map((p, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 border"
              >
                {p.name}, {p.state}
              </span>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <h3 className="text-xl font-semibold text-[#C22A54] mb-4">
            Day-wise Itinerary
          </h3>
          <ol className="relative border-l-4 border-[#C22A54] space-y-6">
            {tour.itenary.map((day, i) => (
              <li key={i} className="ml-4">
                <div className="absolute -left-3 top-1.5 w-6 h-6 bg-[#C22A54] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <h4 className="text-md font-semibold text-[#C22A54]">
                  {day.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {day.shortDescription}
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-500 space-y-1">
                  {day.sightseeing.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {day.toggles.map((t, k) => (
                    <span
                      key={k}
                      className="bg-pink-100 text-[#C22A54] px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* About Tour */}
        <div>
          <h3 className="text-xl font-semibold text-[#C22A54] mb-2">
            About the Tour
          </h3>
          <p className="text-sm text-gray-700">{tour.description}</p>
        </div>

        {/* Sticky Bottom CTA (Mobile) */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around py-2 px-4 lg:hidden z-50">
          <button className="bg-[#C22A54] text-white px-4 py-2 rounded-full text-sm">
            📞 Call
          </button>
          <button className="bg-[#C22A54] text-white px-4 py-2 rounded-full text-sm">
            ❓ Query
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
            🛒 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
