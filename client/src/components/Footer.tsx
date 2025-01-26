import React from "react";
import { FacebookIcon, Instagram, WhatsappIcon } from "../svg";
import { Link } from "react-router-dom";
import { PublicRoutes } from "../navigation";
import { useWebsite } from "../contexts/WebsiteProvider";
import { InboxIcon, PhoneIcon } from "@heroicons/react/20/solid";

export const Footer: React.FC = () => {
  const { websiteInfo } = useWebsite();
  return (
    <footer className="bg-[#1A1D2E] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C22A54]">
            About Us
          </h4>
          <p className="text-sm leading-relaxed">
            Explore the world with our premium travel packages and rental
            services. We provide unforgettable experiences and ensure your
            journey is seamless and stress-free.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href={`https://wa.me/${
                websiteInfo?.socialLinks?.phone || "your-phone-number"
              }`}
              className="p-2 bg-[#C22A54] text-white rounded-full hover:bg-[#E53E3E] transition"
              aria-label="Whatsapp"
            >
              <WhatsappIcon className="h-6 w-6" />
            </a>
            <a
              href={
                websiteInfo?.socialLinks?.facebook || "https://facebook.com"
              }
              className="p-2 bg-[#C22A54] text-white rounded-full hover:bg-[#E53E3E] transition"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a
              href={
                websiteInfo?.socialLinks?.instagram || "https://instagram.com"
              }
              className="p-2 bg-[#C22A54] text-white rounded-full hover:bg-[#E53E3E] transition"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C22A54]">
            Services
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Tour Packages
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.SERVICES} className="hover:text-[#E53E3E]">
                Bus Rentals
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Guided Tours
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Group Travel
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Luxury Experiences
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C22A54]">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Home
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.ABOUT_US} className="hover:text-[#E53E3E]">
                About Us
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.CONTACT} className="hover:text-[#E53E3E]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                FAQ
              </Link>
            </li>
            <li>
              <Link to={PublicRoutes.HOME} className="hover:text-[#E53E3E]">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C22A54]">
            Contact Us
          </h4>
          <ul className="text-sm space-y-4">
            <li>{websiteInfo?.brandname || "Dadhich Bus Service"}</li>
            <li>
              <i className="fas fa-map-marker-alt text-[#C22A54] mr-2"></i>
              {websiteInfo?.contactAddress?.address1 ||
                "Tau Devi Lal Market Near Bansal Hospital"}
              , {websiteInfo?.contactAddress?.city || "Fatehabad"},{" "}
              {websiteInfo?.contactAddress?.state || "Haryana"} -{" "}
              {websiteInfo?.contactAddress?.pincode || 125050}
            </li>
            <li className="flex">
              <i className="fas fa-phone-alt text-[#C22A54] mr-2">
                <PhoneIcon color={"light-blue"} className="h-5" />
              </i>
              <a href={`tel:${websiteInfo?.phone || "+919479600044"}`}>
                {websiteInfo?.phone || "+919479600044"}
              </a>
            </li>
            <li className="flex">
              <i className="fas fa-envelope text-[#C22A54] mr-2">
                <InboxIcon color={"light-blue"} className="h-5 inline-block" />
              </i>
              <a
                href={`mailto:${
                  websiteInfo?.emails?.supportEmail || "dadhichbus@gmail.com"
                }`}
              >
                {websiteInfo?.emails?.supportEmail || "dadhichbus@gmail.com"}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#161925] py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <p>© 2025 Travel Website. All rights reserved.</p>
          {/* <p className="mt-1">
            Designed with ❤️ by{" "}
            <a href="#" className="text-[#C22A54] hover:text-[#E53E3E]">
              Your Company
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
};
