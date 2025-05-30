import { useState } from "react";
import { IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LinkIcon from "@mui/icons-material/Link";

// Enhanced Brand Colors
const BRAND_COLOR = "#C22A54";
const BRAND_COLOR_HOVER = "#A82046"; // Darker for hover
const BRAND_TEXT_COLOR = "#C22A54"; // For text
const BRAND_COLOR_LIGHT = "#FDECF2"; // Lighter shade for backgrounds/accents (Tailwind pink-50 equivalent)

// "Best Seller" Tag Styling
const BEST_SELLER_BG = `bg-[${BRAND_COLOR_LIGHT}]`;
const BEST_SELLER_TEXT = `text-[${BRAND_TEXT_COLOR}]`;
const BEST_SELLER_BORDER = `border border-[${BRAND_COLOR}]/30`; // Subtle border

const MUTED_ICON_COLOR = "text-gray-500";

interface TourCardProps {
  id: number;
  title: string;
  imageSrc: string;
  location: string;
  duration: string;
  startDate: string;
  price: number;
  optionsCount?: number;
  isBestSeller?: boolean;
}

export const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  imageSrc,
  location,
  duration,
  startDate,
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
      {/* {optionsCount > 1 && (
        <TourOptionsDialog
          open={optionsDialogOpen}
          onClose={() => setOptionsDialogOpen(false)}
          tourTitle={title}
        />
      )} */}
    </>
  );
};
