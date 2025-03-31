import React from "react";
import { BookBusCard, HeroSection, ServiceBox } from "../components/services";
import { RentalServiceContextProvider } from "../contexts/RentealServiceContext";
import WithSEO from "../SEO/WithSEO";

const Services: React.FC = () => {
  return (
    <section className="">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <RentalServiceContextProvider>
          <BookBusCard />
        </RentalServiceContextProvider>

        {/* About Section */}
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          {/* Left Section */}
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 ">
              Dadhich Bus Services: Premium Bus Rentals
            </h2>
            <p className="text-sm leading-relaxed ">
              Dadhich Bus Services excels in providing top-quality bus rental
              solutions, specializing in Volvo and minibus rentals that cater to
              diverse travel needs. With a strong focus on quality and customer
              satisfaction, we maintain a fleet of well-equipped, comfortable
              buses suitable for groups of all sizes.
            </p>
            <p className="text-sm leading-relaxed  mt-4">
              Our Volvo buses offer a luxurious travel experience, boasting
              modern amenities and spacious interiors to ensure every journey is
              pleasant and memorable. For smaller groups, our minibuses provide
              a perfect blend of comfort and convenience without sacrificing any
              amenities.
            </p>
            <p className="text-sm leading-relaxed  mt-4">
              Whether you need a bus for a short day trip or a long-distance
              excursion, Dadhich Bus Services ensures a reliable and enjoyable
              ride. Let us make your travel comfortable, convenient, and
              memorable.
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src="images/public/rental_hero_image.webp?tr=w-500,h-333"
              alt="Dadhich Bus Travel"
              className="rounded-lg shadow-lg object-cover w-full"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <ServiceBox iconName="booking" message="Easy Booking" />
          <ServiceBox iconName="verified" message="Professional Drivers" />
          <ServiceBox iconName="bus" message="Big Fleet of Vehicles" />
          <ServiceBox iconName="interior" message="Luxury Interiors" />
        </div>
      </div>
    </section>
  );
};

export default WithSEO(Services, { title: "Dadhich Bus Services | Services" });
