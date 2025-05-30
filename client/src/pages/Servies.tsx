import React from "react";
import { BookBusCard, HeroSection, ServiceBox } from "../components/services";
import { RentalServiceContextProvider } from "../contexts/RentealServiceContext";
import WithSEO from "../SEO/WithSEO";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import CelebrationIcon from "@mui/icons-material/Celebration";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

const useCases = [
  { label: "Weddings", icon: <CelebrationIcon /> },
  { label: "College Trips", icon: <GroupsIcon /> },
  { label: "Corporate Events", icon: <LocationCityIcon /> },
  { label: "Religious Tours", icon: <TempleBuddhistIcon /> },
  { label: "Airport Transfers", icon: <FlightTakeoffIcon /> },
  { label: "Family Trips", icon: <DirectionsBusFilledIcon /> },
  { label: "Campaigns", icon: <CampaignIcon /> },
  { label: "City Sightseeing", icon: <TravelExploreIcon /> },
];

const fleet = [
  { src: "volvo1.webp", label: "Volvo AC", tag: "Luxury" },
  { src: "mini1.webp", label: "MiniBus", tag: "Family" },
  { src: "luxury1.webp", label: "Sleeper Coach", tag: "Events" },
  { src: "interior1.webp", label: "Premium Interiors", tag: "Elite" },
];

const Services: React.FC = () => {
  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <RentalServiceContextProvider>
          <BookBusCard />
        </RentalServiceContextProvider>
        {/* HOW TO BOOK */}
        <div className="mt-28 text-center">
          <h2 className="text-3xl font-bold mb-8">How to Book a Bus</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <ClipboardDocumentCheckIcon className="h-10 w-10 text-white" />
                ),
                title: "Choose Service",
                desc: "Local or Outstation ride options",
              },
              {
                icon: <UserGroupIcon className="h-10 w-10 text-white" />,
                title: "Fill Details",
                desc: "Your travel plan & purpose",
              },
              {
                icon: <CheckCircleIcon className="h-10 w-10 text-white" />,
                title: "Confirm Booking",
                desc: "Submit and receive confirmation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition"
              >
                <div className="bg-[#C22A54] w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* About Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100 animate-fade-in-up">
            {/* Text Section */}
            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#C22A54] leading-snug">
                Dadhich Bus Services: <br /> Premium Bus Rentals
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Dadhich Bus Services excels in providing top-quality bus rental
                solutions, specializing in Volvo and minibus rentals that cater
                to diverse travel needs. With a strong focus on quality and
                customer satisfaction, we maintain a fleet of well-equipped,
                comfortable buses suitable for groups of all sizes.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our Volvo buses offer a luxurious travel experience, boasting
                modern amenities and spacious interiors to ensure every journey
                is pleasant and memorable. Our minibuses provide a perfect blend
                of comfort and convenience for smaller groups.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Whether it’s a day trip or long-distance excursion, Dadhich Bus
                Services ensures a reliable and memorable journey.
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full h-full flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition hover:scale-105 duration-300">
                <img
                  src="images/public/rental_hero_image.webp?tr=w-500,h-333"
                  alt="Dadhich Bus Travel"
                  className="object-cover w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Dadhich Bus Services?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "booking", label: "Easy Booking" },
              { icon: "verified", label: "Professional Drivers" },
              { icon: "bus", label: "Big Fleet of Vehicles" },
              { icon: "interior", label: "Luxury Interiors" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="bg-[#C22A54] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
                  <img
                    src={`/images/svg/${item.icon}.svg`}
                    alt={item.label}
                    className="w-10 h-10"
                  />
                </div>
                <p className="font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Features Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <ServiceBox iconName="booking" message="Easy Booking" />
          <ServiceBox iconName="verified" message="Professional Drivers" />
          <ServiceBox iconName="bus" message="Big Fleet of Vehicles" />
          <ServiceBox iconName="interior" message="Luxury Interiors" />
        </div> */}
        {/* USE CASES */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-10">
            Perfect For Every Journey
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {useCases.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border hover:shadow-xl hover:scale-[1.02] transition p-6 text-center flex flex-col items-center"
              >
                <div className="bg-[#C22A54]/10 text-[#C22A54] w-14 h-14 mb-4 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">
            Compare Our Bus Services
          </h2>
          <TableContainer
            component={Paper}
            elevation={4}
            className="rounded-xl overflow-hidden"
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f4f4f5" }}>
                <TableRow>
                  <TableCell>
                    <strong>Feature</strong>
                  </TableCell>
                  <TableCell>Local Bus</TableCell>
                  <TableCell>Outstation Bus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["Ideal For", "City Travel", "Long Distances"],
                  ["Booking Type", "Hourly", "Per Trip"],
                  ["Fleet", "Mini Buses", "Volvo Coaches"],
                  ["AC Available", "Optional", "Yes"],
                  ["Driver Included", "Yes", "Yes"],
                ].map(([feature, local, out], i) => (
                  <TableRow key={i} hover>
                    <TableCell>{feature}</TableCell>
                    <TableCell>{local}</TableCell>
                    <TableCell>{out}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* FLEET GALLERY */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-10">
            Explore Our Fleet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {fleet.map((bus, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
              >
                <img
                  src={`/images/fleet/${bus.src}`}
                  alt={bus.label}
                  className="w-full h-[200px] object-cover transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#C22A54] text-white text-xs px-3 py-1 rounded-full shadow">
                  {bus.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-sm">
                  {bus.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* FAQ */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Can I book a bus for a wedding or event?",
              a: "Absolutely! We provide tailored rentals for weddings, birthdays, and corporate events.",
            },
            {
              q: "How early should I book the bus?",
              a: "We recommend booking at least 5 days in advance for best vehicle availability.",
            },
            {
              q: "Are your buses sanitized and well-maintained?",
              a: "Yes, we sanitize and inspect our buses before every trip to ensure comfort and safety.",
            },
          ].map((item, i) => (
            <Accordion
              key={i}
              className="mb-4 rounded-lg shadow border border-gray-200"
              sx={{ bgcolor: "background.paper" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${i}`}
              >
                <Typography fontWeight={600} color="#C22A54">
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize={14} color="text.secondary">
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WithSEO(Services, { title: "Dadhich Bus Services | Services" });
