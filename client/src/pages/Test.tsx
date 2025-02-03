import React from "react";

const Test: React.FC = () => {
  const dummyData = {
    tourName: "Gangtok Itinerary",
    rating: 4.5,
    reviews: 19,
    image: "https://via.placeholder.com/800x400", // Replace with actual image URL
    location: "Siliguri",
    duration: "3 Nights / 4 Days",
    bestSeason: "Jan, Feb, Mar, Apr, May, Jun, Sep, Oct, Nov, Dec",
    price: 9007,
    discount: 7,
    originalPrice: 11034,
    inclusions: ["Flight", "Transfer", "Breakfast", "Hotel", "Sightseeing"],
    description: `Sikkim's capital, Gangtok, is a well-liked travel destination for people looking for peace, culture, and amazing Himalayan views. Whether heading to Gangtok for a quick or longer stay, this detailed itinerary will let you see the finest of the city and its surroundings.`,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-6">
        {/* Title and Image */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-orange-600 mb-2">
            {dummyData.tourName}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-500 text-xl">&#9733;</span>
            <span className="text-lg font-semibold">{dummyData.rating}</span>
            <span className="text-sm text-gray-500">
              • {dummyData.reviews} Rating
            </span>
          </div>
          <img
            src={dummyData.image}
            alt={dummyData.tourName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </section>

        {/* Details Section */}
        <section className="mt-6 bg-white rounded-lg shadow-md p-6">
          {/* Location and Duration */}
          <div className="flex flex-wrap justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                <span className="text-gray-600">📍 Location:</span>{" "}
                {dummyData.location}
              </h2>
              <p className="text-gray-600">{dummyData.duration}</p>
            </div>
            <div>
              <p className="text-sm text-green-600">
                ✅ Part Payment Available
              </p>
              <p className="text-sm text-green-600">✅ Free Cancellation</p>
            </div>
          </div>

          {/* Best Season */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-bold">Best Season:</h3>
            <p className="text-gray-600">{dummyData.bestSeason}</p>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg p-6 text-white flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                {dummyData.discount}% OFF
                <span className="line-through ml-2 text-sm text-gray-200">
                  ₹{dummyData.originalPrice}
                </span>
              </p>
              <h3 className="text-2xl font-bold">₹{dummyData.price}/-</h3>
              <p className="text-sm">Taxes extra per person</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold">
                Call Now
              </button>
              <button className="bg-orange-800 px-6 py-2 rounded-lg font-bold">
                Send Query
              </button>
            </div>
          </div>
        </section>

        {/* Inclusions */}
        <section className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Inclusions</h2>
          <div className="flex flex-wrap space-x-4">
            {dummyData.inclusions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-2 rounded-md shadow-md text-gray-800 text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">About the Tour Package</h2>
          <p className="text-gray-600 leading-7">{dummyData.description}</p>
        </section>
      </main>
    </div>
  );
};

export default Test;
