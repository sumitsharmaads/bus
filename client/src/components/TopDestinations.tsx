import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import React, { useRef } from "react";
//import { ChevronLeft, ChevronRight } from "lucide-react"; // or use @heroicons/react

const destinations = [
  { name: "TAMIL NADU", listings: 15, image: "/images/tamilnadu.jpg" },
  { name: "GUJARAT", listings: 14, image: "/images/gujarat.jpg" },
  { name: "ASSAM", listings: 13, image: "/images/assam.jpg" },
  { name: "SIKKIM", listings: 19, image: "/images/sikkim.jpg" },
  { name: "MEGHALAYA", listings: 16, image: "/images/meghalaya.jpg" },
  { name: "RAJASTHAN", listings: 23, image: "/images/rajasthan.jpg" },
  { name: "UTTAR PRADESH", listings: 16, image: "/images/uttarpradesh.jpg" },
  { name: "WEST BENGAL", listings: 16, image: "/images/westbengal.jpg" },
];

const TopDestinations = () => {
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
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-gray-50 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Explore Top <span className="text-red-600">Destinations</span>
        </h2>
        <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-100 transition">
          View all
        </button>
      </div>

      {/* Scroll Buttons - Desktop only */}
      <div className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll("left")}
          className="bg-white shadow-md hover:bg-gray-200 p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scroll("right")}
          className="bg-white shadow-md hover:bg-gray-200 p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hide-scrollbar"
      >
        {destinations.map((item, index) => (
          <div
            key={index}
            className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[250px] rounded-xl overflow-hidden relative shadow-md flex-shrink-0 group hover:scale-105 transition-transform"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[230px] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3">
              <h3 className="font-bold text-sm md:text-base">{item.name}</h3>
              <p className="text-xs">{item.listings} Listings</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
