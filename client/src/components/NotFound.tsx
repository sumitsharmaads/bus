import React from "react";

export const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[25rem] max-h-[40rem] bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="#/"
            className=" bg-[#212832] text-white px-4 py-2 rounded inline-block shadow-lg transition duration-300"
          >
            Go Back Home
          </a>
        </div>
        <div className="mt-8">
          {/* <img
            src="https://example.com/image.png" // Replace with a relevant image URL
            alt="Not Found Illustration"
            className="mx-auto w-1/2 md:w-1/3"
          /> */}
        </div>
      </div>
    </div>
  );
};
