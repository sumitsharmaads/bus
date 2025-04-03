// TOURS PAGE WITH BANNER IMAGE AND RESPONSIVE FILTERS

import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Slider,
  Typography,
  Rating,
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

const dummyTours = Array.from({ length: 30 }, (_, index) => ({
  _id: `${index + 1}`,
  tourname: `Tour Package ${index + 1}`,
  image: {
    url: `https://source.unsplash.com/400x300/?travel,place${index}`,
  },
  duration: `${2 + (index % 5)} Days / ${1 + (index % 4)} Nights`,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 5 * 86400000).toISOString(),
  minfair: `${2500 + (index % 10) * 500}`,
  destination: ["Khatu Shyam", "Manali", "Kashmir", "Dubai", "Thailand"][
    index % 5
  ],
  type: ["Devotional", "Adventure", "International", "Weekend"][index % 4],
  rating: 4 + (index % 2) * 0.5,
}));

const ToursPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 30000]);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...dummyTours];
      if (searchTerm) {
        filtered = filtered.filter((tour) =>
          tour.tourname.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (destinationFilter) {
        filtered = filtered.filter(
          (tour) => tour.destination === destinationFilter
        );
      }
      if (typeFilter.length > 0) {
        filtered = filtered.filter((tour) => typeFilter.includes(tour.type));
      }
      filtered = filtered.filter((tour) => {
        const price = parseInt(tour.minfair);
        return price >= priceRange[0] && price <= priceRange[1];
      });
      if (rating) {
        filtered = filtered.filter((tour) => tour.rating >= rating);
      }
      setTours(filtered);
      setLoading(false);
    }, 500);
  }, [searchTerm, destinationFilter, typeFilter, priceRange, rating]);

  const filterSection = (
    <div className="space-y-4 w-full p-4">
      <TextField
        label="Search"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControl fullWidth size="small">
        <InputLabel>Destination</InputLabel>
        <Select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          label="Destination"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Khatu Shyam">Khatu Shyam</MenuItem>
          <MenuItem value="Manali">Manali</MenuItem>
          <MenuItem value="Kashmir">Kashmir</MenuItem>
          <MenuItem value="Thailand">Thailand</MenuItem>
          <MenuItem value="Dubai">Dubai</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Tour Type</InputLabel>
        <Select
          multiple
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as string[])}
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-1">
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </div>
          )}
        >
          <MenuItem value="Devotional">Devotional</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Hill Station">Hill Station</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="International">International</MenuItem>
          <MenuItem value="Weekend">Weekend</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography variant="caption">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={50000}
        />
      </Box>
      <Box>
        <Typography variant="caption">Minimum Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newVal) => setRating(newVal)}
        />
      </Box>
    </div>
  );

  return (
    <div className="pb-4 bg-white">
      <Helmet>
        <title>Dadhich Bus Service | Explore Tours</title>
        <meta
          name="description"
          content="Discover bus tours across India with Dadhich Bus Service. Devotional yatras, hill stations, and international packages available."
        />
        <meta
          name="keywords"
          content="bus tours, khatu shyam, travel packages, hill station, yatra"
        />
      </Helmet>

      {/* Banner Section */}
      <div className="w-full h-64 md:h-96 relative mb-6">
        <img
          src="https://source.unsplash.com/1600x500/?travel,bus"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            Start Your Journey With Dadhich Tours
          </h1>
        </div>
      </div>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg"
        rel="noreferrer"
      >
        <WhatsAppIcon fontSize="large" />
      </a>

      {/* Mobile Filter Button */}
      <div className="md:hidden fixed top-20 left-4 z-40">
        <Tooltip title="Filters">
          <IconButton
            onClick={() => setDrawerOpen(true)}
            className="bg-white shadow border rounded-full"
          >
            <FilterListIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="w-72 p-4">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {filterSection}
        </Box>
      </Drawer>

      <div className="flex gap-6 px-4 md:px-10">
        <aside className="hidden md:block w-1/4 sticky top-28 h-fit border rounded-xl shadow-sm">
          {filterSection}
        </aside>

        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white relative"
                >
                  <img
                    src={tour.image?.url}
                    alt={tour.tourname}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <FavoriteBorderIcon className="text-white bg-red-500 rounded-full p-1 cursor-pointer" />
                    <CompareArrowsIcon className="text-white bg-blue-500 rounded-full p-1 cursor-pointer" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{tour.tourname}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {tour.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      From ₹{parseInt(tour.minfair).toLocaleString()}
                    </p>
                    <div className="flex items-center text-yellow-500 mt-1">
                      <StarIcon fontSize="small" />
                      <span className="ml-1 text-sm">{tour.rating}</span>
                    </div>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      className="mt-4 rounded-full"
                      component={Link}
                      to={`/tours/${tour._id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ToursPage;
