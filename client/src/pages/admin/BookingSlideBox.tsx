import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tour } from "../TourDetailPage";
import { useWebsite } from "../../contexts/WebsiteProvider";

const BookingSidebar = (params: {
  source?: Tour["source"];
  places?: Tour["places"];
  days?: number;
  night?: number;
  minfair?: number | string;
  contact?: string;
}) => {
  const { websiteInfo } = useWebsite();
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 space-y-4 w-full sticky top-24 z-10">
      {/* Destination & Duration */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col text-sm text-gray-700">
          <div className="flex items-center gap-2 font-semibold">
            <LocationOnIcon fontSize="small" className="text-[#C22A54]" />
            <span>
              From:{" "}
              {params?.source?.map((data) => data.location.name).join(", ")}
            </span>
          </div>
          <p className="text-xs mt-1 text-gray-500">
            <strong>
              <b>To:</b>
            </strong>{" "}
            {params?.places?.map((data) => data.name).join(" & ")}
          </p>
        </div>
        <div className="flex items-center text-xs gap-2 bg-gray-50 border rounded-full px-3 py-1 text-gray-600">
          <NightsStayIcon fontSize="small" />
          {params?.night} Nights
          <WbSunnyIcon fontSize="small" />
          {params?.days} Days
        </div>
      </div>

      {/* Session Info */}
      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircleIcon fontSize="small" className="text-green-600" />
          Best Months: Jan - Dec
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon fontSize="small" className="text-green-600" />
          Free Cancellation
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon fontSize="small" className="text-green-600" />
          Part Payment Available
        </div>
      </div>

      {/* Availability Button */}
      <div className="pt-3">
        <button className="w-full border border-[#C22A54] hover:bg-[#C22A54]/10 text-[#C22A54] font-semibold text-sm rounded-full py-2 transition-all duration-300">
          Check Availability
        </button>
      </div>

      {/* Gradient Price Block */}
      <div className="rounded-xl bg-gradient-to-br from-[#FF6B6B] via-[#FC466B] to-[#C22A54] text-white px-4 py-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <GroupIcon fontSize="small" />
              <span>5 Travelers</span>
            </div>
            <p className="line-through text-xs opacity-70 mt-1">
              ₹ {5 * Number(params?.minfair || 0)}
            </p>
            <p className="bg-white text-[#C22A54] rounded-full text-xs font-semibold px-2 py-0.5 w-max mt-1">
              Save 3%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl font-bold leading-none">
              ₹ {params.minfair}
            </p>
            <p className="text-xs text-white/80">+ taxes per person</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <a
            className="bg-white text-[#C22A54] hover:text-[#691930]/10 font-semibold text-sm rounded-lg py-2 flex justify-center items-center gap-1 transition-all duration-300"
            href={`tel:${websiteInfo?.phone || params.contact}`}
          >
            <PhoneIcon fontSize="small" /> Call
          </a>
          <button className="bg-white text-[#C22A54] hover:text-[#691930]/10 font-semibold text-sm rounded-lg py-2 flex justify-center items-center gap-1 transition-all duration-300">
            <HelpOutlineIcon fontSize="small" /> Query
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
