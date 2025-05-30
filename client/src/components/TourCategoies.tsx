import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import TerrainIcon from "@mui/icons-material/Terrain";
import WeekendIcon from "@mui/icons-material/Weekend";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import { useRef } from "react";
import { Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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

export const TourCategories: React.FC = () => {
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
        <div className="relative ">
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
            className="flex overflow-x-auto scroll-smooth space-x-6 pb-4 hide-scrollbar "
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
