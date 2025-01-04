import React from "react";

export const Home: React.FC = () => {
  return (
    <section
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('images/heroImage.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8">
        <h3 className="text-sm md:text-base font-semibold text-[#C22A54] tracking-wider uppercase font-poppins">
          Best Destinations Around the World
        </h3>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          The World Awaits: Travel with Us
        </h1>
        <p className="text-sm md:text-lg mt-4 max-w-xl mx-auto">
          Manage the planning; focused on making memories. Our friendly team
          makes sure that everything is taken care of, helping you to have a
          hassle-free and delightful trip.
        </p>
        <button className="mt-6 px-6 py-2 bg-[#C22A54] text-white rounded-full shadow-lg hover:bg-[#E53E3E] transition duration-300">
          Know More
        </button>
      </div>

      {/* Simplified Search Bar */}
      <div className="absolute -bottom-8 flex justify-center w-full px-4 md:px-8">
        <div className="bg-[#202542] bg-opacity-90 p-4 rounded-full flex items-center w-full max-w-lg">
          {/* Destination Input */}
          <div className="flex flex-col items-start relative flex-grow">
            <label className="text-white text-sm">Destination</label>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white absolute left-3 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h4l3 10h4l3-8h4"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter destination"
                className="pl-10 pr-4 py-2 w-full bg-transparent text-white placeholder-white outline-none border-b-[2px] border-primary"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="ml-4 px-4 py-2 bg-[#C22A54] text-white rounded-full shadow-md hover:bg-[#E53E3E] transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};
