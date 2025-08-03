import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import clsx from "clsx";
import { Tour } from "./TourDetailPage";

interface ItineraryItem {
  title: string;
  shortDescription: string;
  sightseeing: string[];
  toggles?: string[];
}

const itineraryData: ItineraryItem[] = [
  {
    title: "Day 1: Departure from Delhi",
    shortDescription:
      "Board the AC bus and begin your journey toward Guptkashi.",
    sightseeing: ["Evening snacks", "Dinner on route"],
    toggles: ["Transfer", "Meals"],
  },
  {
    title: "Day 2: Arrival at Guptkashi",
    shortDescription: "Check-in at hotel and visit nearby temples.",
    sightseeing: ["Check-in", "Kashi Vishwanath Darshan", "Evening aarti"],
    toggles: ["Hotel", "Sightseeing"],
  },
  {
    title: "Day 3: Kedarnath Trek",
    shortDescription:
      "Early morning start for Kedarnath trek, Darshan and back.",
    sightseeing: ["Kedarnath Temple", "Mandakini River"],
    toggles: ["Sightseeing", "Transfer"],
  },
];

const badgeColor = {
  Transfer: "bg-blue-100 text-blue-700",
  Meals: "bg-yellow-100 text-yellow-700",
  Hotel: "bg-green-100 text-green-700",
  Sightseeing: "bg-purple-100 text-purple-700",
};

const ItinerarySection = ({ itenary }: { itenary: Tour["itenary"] }) => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Day-wise Itinerary
      </h2>
      <div className="space-y-10">
        {itenary?.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col md:flex-row gap-4"
          >
            {/* Day Badge */}
            <div className="absolute -top-4 left-4 bg-[#C22A54] text-white w-10 h-10 flex items-center justify-center font-semibold text-sm rounded-full shadow-md">
              {index + 1}
            </div>

            {/* Details */}
            <div className="flex-1 mt-6 md:mt-0">
              <h4 className="text-lg font-medium text-gray-800">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {item.shortDescription}
              </p>

              {/* Sightseeing list */}
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                {item.sightseeing.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.toggles?.map((toggle, idx) => (
                  <span
                    key={idx}
                    className={clsx(
                      "text-xs font-medium px-2.5 py-1 rounded-full",
                      badgeColor[toggle as keyof typeof badgeColor] ||
                        "bg-gray-200 text-gray-700"
                    )}
                  >
                    {toggle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItinerarySection;
