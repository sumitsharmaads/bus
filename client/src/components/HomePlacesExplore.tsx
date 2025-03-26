import React from "react";
import { Grid, Button } from "@mui/material";
import { HomePlaceCard } from "../common/HomePlaceCard";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../navigation";

// Sample data (Replace this with dynamic data if needed)
const destinations = [
  {
    title: "Chotila",
    description:
      "Planning a vacation to Gujarat? This beautiful state of India is famous for its historical monuments.",
    image: "images/Chotila_Temple_8960.png",
  },
  {
    title: "Pahalgam",
    description:
      "Pahalgam lies in the Anantnag district of Jammu & Kashmir. It provides beautiful scenery.",
    image: "images/public/home/pahalgam.png",
  },
  {
    title: "Pattaya",
    description:
      "Explore the beautiful beaches and nightlife of Pattaya, Thailand.",
    image: "images/public/home/pattaya.png",
  },
  {
    title: "Jammu and Kashmir",
    description:
      "Many visitors rank Kashmir as one of India's top destinations because of its scenic beauty.",
    image: "images/public/home/kashmir.png",
  },
  {
    title: "Phuket",
    description:
      "Thailand's largest island - Phuket serves all national attractions. This tropical island exists in S.",
    image: "images/public/home/phuket.png",
  },
  {
    title: "Thailand",
    description:
      "History and modernity come together in Thailand’s tapestry of culture and tradition.",
    image: "images/public/home/thailand.png",
  },
  {
    title: "Konark",
    description:
      "The state of Odisha in India has made Konark famous because of its architectural masterpiece.",
    image: "images/public/home/konark.png",
  },
  {
    title: "Janakpur",
    description:
      "Janakpur is known for its historical and religious importance, associated with the Hindu epic.",
    image: "images/public/home/janakpur.png",
  },
  {
    title: "Ha Long",
    description:
      "A place where nature meets beauty and adventure dance with serenity.",
    image: "images/public/home/halong.png",
  },
];

export const HomePlacesExplore: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto p-6">
      <div className="flex justify-between items-center w-full pb-4">
        <h2 className="text-3xl font-bold font-['Volkhov']">Places to visit</h2>
        <Button
          className="!bg-[#C22A543B] !text-[#000]"
          onClick={() => {
            navigate(PublicRoutes.TOUR_GUIDES);
          }}
        >
          View More
        </Button>
      </div>
      <Grid container spacing={3} className="bg-gray-50 p-2">
        {destinations.slice(0, 6).map((destination, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <HomePlaceCard
              description={destination.description}
              image={destination.image}
              title={destination.title}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
