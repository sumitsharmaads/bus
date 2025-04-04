import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { get } from "../service";
import { useNavigate } from "react-router-dom";
//import { ChevronLeft, ChevronRight } from "lucide-react"; // or use @heroicons/react

type destinationType = {
  name: string;
  listings: number;
  image: string;
  state: string;
};
const destinations: destinationType[] = [
  {
    name: "Punjab",
    listings: 0,
    image: "images/states/punjab.jpg",
    state: "Punjab",
  },
  {
    name: "Haryana",
    listings: 0,
    image: "images/states/haryana.jpg",
    state: "Haryana",
  },
  {
    name: "Delhi",
    listings: 0,
    image: "images/states/delhi.jpg",
    state: "Delhi",
  },
  {
    name: "Rajasthan",
    listings: 0,
    image: "images/states/rajasthan.jpg",
    state: "Rajasthan",
  },
  {
    name: "Bihar",
    listings: 0,
    image: "images/states/bihar.jpg",
    state: "Bihar",
  },
  {
    name: "Uttar Pradesh",
    listings: 0,
    image: "images/states/uttar_pardesh.jpg",
    state: "Uttar Pradesh",
  },
  {
    name: "Paschim Bengal",
    listings: 0,
    image: "images/states/pachim_bengal.jpg",
    state: "Paschim Bengal",
  },
  {
    name: "Uttrakhand",
    listings: 0,
    image: "images/states/uttrakhand.jpg",
    state: "Uttrakhand",
  },
  {
    name: "Himachal Pradesh",
    listings: 0,
    image: "images/states/himachal_pardesh.jpg",
    state: "Himachal Pradesh",
  },
  {
    name: "Jammu and Kashmir",
    listings: 0,
    image: "images/states/jammu_kashmir.jpg",
    state: "Jammu and Kashmir",
  },
];

const TopDestinations = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<destinationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{
          success: boolean;
          data: {
            state: string;
            count: number;
          }[];
        }>("tours/state-breakup");

        if (response?.data?.data) {
          // new RegExp(`\\b${item.state.split(" ")[0]}\\b`, "i").test(
          //   destination.state
          // )
          const updatedData = destinations.map((destination) => {
            const stateData = response.data.data.find((item) =>
              new RegExp(item.state, "i").test(destination.state)
            );
            if (stateData) {
              destination.listings = stateData.count;
            } else {
              destination.listings = 0;
            }

            return destination;
          });
          updatedData.sort((a, b) => b.listings - a.listings);
          console.log("updatedData", updatedData);
          setData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewAll = () => {
    navigate("/tours");
  };
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
        <button
          className="border border-gray-400 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-100 transition"
          onClick={() => handleViewAll()}
        >
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
        {data.map((item, index) => (
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
