import React from "react";
import { FaqAndTerms } from "../components/FaqAndTerms";
import { Link } from "react-router-dom";
import { PublicRoutes } from "../navigation";
// replace with actual image path

const AboutUs: React.FC = () => {
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />

      <div className="bg-white pt-1 pb-12 px-4 md:px-10">
        {/* Header Section */}
        <div className="text-center py-20 bg-gradient-to-br from-white via-gray-100 to-white">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            About Dadhich Bus Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience reliable, luxurious, and safe journeys with Rajasthan’s
            most trusted bus rental service.
          </p>
        </div>

        {/* About Content Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16 px-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Dadhich tour and travels, your trusted travel partner
              for exploring the sacred and historical or religious sites or
              places Rajasthan’s such as Khatu shyam, Ramdevra and other
              destinations. Our mission is to provide seamless travel
              experiences. Ensuring a memorable journey with great services,
              comfortable accommodations and hassle free transportations of our
              tour and travels.
            </p>
            <p className="text-gray-600 leading-relaxed mt-1">
              If anyone wants to seek spiritual solace or an enriching cultural
              adventure, we are here to guide you through religious rich
              heritage. Join us and embark on a journey filled with devotion,
              history and unforgettable experiences.
            </p>
          </div>
          <div>
            <img
              src={
                "/images/public/carosuel/dc86d586f2471430f899b6694f037b33.jpg"
              }
              alt="Luxury Bus"
              className="rounded-2xl shadow-lg h-72 w-full object-cover"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-red-50 to-white px-6 py-10 rounded-xl shadow-md max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to revolutionize road travel by making it premium,
            comfortable, and stress-free. We aim to be the most preferred bus
            travel partner for every group—large or small—providing reliable
            services, trained drivers, and a fleet that’s built for both luxury
            and safety.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-2 text-gray-700">
            {[
              "Modern fleet with well-maintained buses",
              "Easy online booking and cancellation",
              "Experienced drivers and support staff",
              "Timely and safe journeys",
              "Affordable fares with no hidden charges",
              "24/7 customer support",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✔️</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Final CTA */}
        <div className="relative mt-24 bg-[#1e1e1e] rounded-2xl text-white px-6 py-16 shadow-xl">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Let's Get You Moving!</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
              Whether you need a luxury bus for a family tour or a reliable
              rental for business travel, Dadhich Bus Services is just a click
              or call away. Book now or talk to our team!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+919511547154"
                className="bg-[#c1121f] hover:bg-red-700 transition text-white font-semibold px-6 py-3 rounded-full shadow-md"
              >
                📞 Call Us
              </a>
              <Link
                to={PublicRoutes.HOME}
                className="bg-white text-[#c1121f] hover:bg-gray-200 transition font-semibold px-6 py-3 rounded-full shadow-md"
              >
                🧭 Book a Tour
              </Link>
              <Link
                to={PublicRoutes.SERVICES}
                className="bg-white text-[#c1121f] hover:bg-gray-200 transition font-semibold px-6 py-3 rounded-full shadow-md"
              >
                🚌 Rent a Bus
              </Link>
            </div>
          </div>

          {/* Subtle background gradient effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#c1121f]/20 to-transparent rounded-2xl" />
        </div>

        <FaqAndTerms />
      </div>
    </section>
  );
};

export default AboutUs;
