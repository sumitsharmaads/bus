import React from "react";

const tourGuide = [
  {
    title: "Chotila",
    image: "images/Chotila_Temple_8960.png",
    description:
      "Planning a vacation to Gujarat? This beautiful state of India is famous for its historical monuments, beaches, and temples.",
  },
  {
    title: "Jammu and Kashmir",
    image: "images/Chotila_Temple_8960.png",
    description:
      "Many visitors rank Kashmir as one of India's top destinations because it provides exceptional experiences for nature lovers.",
  },
  {
    title: "Konark",
    image: "images/Chotila_Temple_8960.png",
    description:
      "The state of Odisha in India has made Konark famous because of the architectural masterpiece known as the Konark Sun Temple.",
  },
];

export const TourGuide = () => {
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="max-w-6xl mx-auto p-4">
        {/* Heading Section */}
        <h1 className="text-3xl font-bold mb-4">Top Travel Guides</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Travel Guide"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Travel Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourGuide.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image */}
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-56 object-cover"
              />

              {/* Card Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold">{guide.title}</h2>
                <p className="text-gray-600 text-sm mt-2">
                  {guide.description.length > 55
                    ? `${guide.description.substring(0, 55)}...`
                    : guide.description}
                </p>

                {/* Button */}
                <button className="mt-4 w-full bg-orange-500 hover:bg-red-500 text-white font-semibold py-2 rounded transition">
                  KNOW MORE & GET CUSTOMIZE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
