import React, { useState } from "react";
import { WhatsappIcon, FacebookIcon, Instagram } from "../svg"; // Replace with your SVG components
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export const SocialSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed top-1/2 left-0 transform -translate-y-1/2 flex items-center ${
        isExpanded ? "w-24" : "w-14"
      } bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white rounded-r-xl shadow-lg transition-all duration-500 ease-in-out z-50`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="h-10 w-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-r-xl transition duration-300"
      >
        <ChevronRightIcon
          className={`h-6 w-6 transform ${
            isExpanded ? "rotate-180" : ""
          } transition-transform duration-300`}
        />
      </button>

      {/* Social Icons */}
      <div
        className={`flex flex-col items-start ml-1 space-y-2 p-1 overflow-hidden ${
          isExpanded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/your-phone-number"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 group"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 shadow-md group-hover:scale-110 transform transition duration-300">
            <WhatsappIcon className="h-6 w-6 text-white" />
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 group"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 shadow-md group-hover:scale-110 transform transition duration-300">
            <FacebookIcon className="h-6 w-6 text-white" />
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 group"
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-500 shadow-md group-hover:scale-110 transform transition duration-300">
            <Instagram className="h-6 w-6 text-white" />
          </div>
        </a>
      </div>
    </div>
  );
};
