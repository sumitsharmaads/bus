import React from "react";

export const NotFound: React.FC = () => {
  return (
    <section>
      {/* Top Divider Line */}
      <div className="px-2 h-[2px] bg-[#C22A54] transition-all duration-300 ease-in-out" />

      {/* Main Content */}
      <div className="flex items-center justify-center h-[25rem] max-h-[40rem] bg-gray-50">
        <div className="text-center">
          {/* 404 Error */}
          <h1 className="text-6xl font-bold text-[#C22A54] font-poppins">
            404
          </h1>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-[#202542] mt-4 font-poppins">
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mt-2 max-w-md mx-auto font-poppins">
            The page you're looking for doesn't exist or may have been moved.
            Let us help you find the way back!
          </p>

          {/* Back Home Button */}
          <div className="mt-6">
            <a
              href="#/"
              className="bg-[#C22A54] text-white px-6 py-2 rounded-full shadow-md font-poppins hover:bg-[#E53E3E] transition duration-300"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
