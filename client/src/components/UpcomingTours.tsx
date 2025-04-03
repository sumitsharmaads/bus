import React, { useEffect, useState } from "react";
import { get } from "../service";

type Tour = {
  tourname: string;
  destination: string;
  startDate: string;
  duration: string;
  image: {
    id: string;
    url: string;
  };
};
export const UpcomingTours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await get<{ data: Tour[] }>("tours/upcoming-tours");
        if (response.data.data) {
          setTours(response.data.data);
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <section>
      {tours && tours?.length > 0 && (
        <div
          className="container mx-auto px-4 py-10"
          style={{ backgroundColor: "#fef7f7" }}
        >
          <h2 className="text-4xl font-bold text-center text-[#c22a54] mb-12">
            Upcoming Visits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="relative bg-cover bg-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-64"
                style={{ backgroundImage: `url(${tour?.image?.url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tour.tourname}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Date: {new Date(tour.startDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm text-gray-300">
                    Duration: {tour.duration}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-[#c22a54] text-white font-semibold rounded-full hover:bg-[#e53e3e] transition">
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
