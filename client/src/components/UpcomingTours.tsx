import React, { useEffect, useState } from "react";
import { get } from "../service"; // Assuming 'get' is your API function
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type Tour = {
  _id: string;
  tourname: string;
  startDate: string;
  days: number;
  night: number;
  duration: string;
  image: {
    id: string;
    url: string;
  };
  places: string[];
};

export const UpcomingTours: React.FC = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await get<{ data: Tour[] }>("tours/upcoming-tours");
        if (response?.data?.data) {
          setTours(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleReadMore = (id: string) => {
    navigate(`/tour/${id}`);
  };
  return (
    <section className="my-12">
      {tours && tours.length > 0 && (
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Upcoming Tours
            </h2>
          </div>

          {/* Responsive Flex for horizontal scroll on larger screens */}
          <div className="flex flex-wrap justify-start gap-4">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="relative">
                  {/* Image Tag */}
                  <img
                    src={
                      tour?.image?.url ||
                      "/images/public/home/6f58de3c4b3d1d5d94614fd604778a4c.png"
                    }
                    alt={tour.tourname}
                    className="w-full h-48 object-cover"
                    crossOrigin={"anonymous"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex justify-center items-center text-white px-4">
                    <h3 className="text-lg font-semibold">{tour.tourname}</h3>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-b-lg shadow-md">
                  <p className="text-sm text-gray-600">
                    Places: {tour.places?.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Start Date: {dayjs(tour.startDate).format("DD MMM YYYY")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {tour.days}D/{tour.night}N
                  </p>
                  <button
                    className="mt-4 w-full bg-[#c22a54] text-white py-2 rounded-full hover:bg-[#e53e3e] transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleReadMore(tour._id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
