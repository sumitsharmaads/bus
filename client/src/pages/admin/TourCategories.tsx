import React, { useRef } from "react";
import { Box, IconButton, Typography, Fab, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import TerrainIcon from "@mui/icons-material/Terrain";
import WeekendIcon from "@mui/icons-material/Weekend";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

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

const TourCategorySlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  return (
    <Box className="relative w-full overflow-hidden px-4 py-8 bg-gray-50">
      {/* Scroll Buttons */}
      <IconButton
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
      >
        <ChevronRight />
      </IconButton>

      {/* Cards Container */}
      <Box
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-12"
      >
        {categories.map((cat, index) => (
          <Box
            key={index}
            className={`min-w-[180px] h-[120px] rounded-2xl shadow-md flex flex-col justify-center items-center ${cat.bg}`}
          >
            <Box className="text-rose-600 text-3xl">{cat.icon}</Box>
            <Typography className="mt-2 font-medium text-black text-center">
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Floating FAB */}
      <Fab
        color="secondary"
        className="absolute bottom-[-24px] right-4 shadow-lg"
        size="medium"
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default TourCategorySlider;
