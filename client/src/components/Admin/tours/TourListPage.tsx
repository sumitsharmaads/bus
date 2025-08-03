import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Container,
  Box,
  Paper,
  Stack,
  Grid,
  IconButton,
  Collapse,
  Autocomplete,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import {
  Edit,
  Delete,
  Publish,
  Unpublished,
  FilterAlt,
  ExpandMore,
  ExpandLess,
  LocationOn,
  AccessTime,
  PeopleAlt,
} from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";
import { patch, post } from "../../../service";
import { BasicDetailsType } from "./AddBasicTourDetails";
import { TourTravelType } from "../types";
import { Link } from "react-router-dom";

const AutocompleteField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  fetchOptions: (query: string) => Promise<string[]>;
}> = ({ label, name, value, onChange, fetchOptions }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    query: string
  ) => {
    if (!query) return;
    setLoading(true);
    try {
      const fetchedOptions = await fetchOptions(query);
      setOptions(fetchedOptions);
    } catch (error) {
      console.error(`Error fetching options for ${name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => onChange(newValue || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: loading ? (
              <CircularProgress size={20} />
            ) : (
              params.InputProps.endAdornment
            ),
          }}
        />
      )}
    />
  );
};

type TourListDetailsType = BasicDetailsType & { _id: string };
const TourListPage: React.FC = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tours, setTours] = useState<TourTravelType["tours"][]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    places: "",
    source: "",
    startDate: "",
    tourname: "",
    status: "",
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  const fetchTours = async () => {
    try {
      const filteredSearch = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, value]) => value)
      );

      if (filteredSearch.startDate) {
        filteredSearch.startDate =
          new Date(filteredSearch.startDate).toISOString().split("T")[0] +
          "T00:00:00.000Z";
      }

      const response = await post<{
        data: {
          result: TourTravelType["tours"][];
          count: number;
        };
      }>("/tours/admin/getAll", {
        page: currentPage,
        items: itemsPerPage,
        search: filteredSearch,
        isCount: true,
      });
      if (response?.data?.data?.result) {
        const { result, count } = response?.data?.data;
        setTours(result ?? []);
        setPageCount(Math.ceil((count || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const fetchPlaces = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/places?query=${query}`
      );
      return response.data.places || [];
    } catch (error) {
      console.error("Error fetching places:", error);
      return [];
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const clearFilters = () => {
    setSearchFilters({
      destination: "",
      places: "",
      source: "",
      startDate: "",
      tourname: "",
      status: "",
    });
  };

  const handlePublish = async (id: number | string) => {
    if (!id) return;
    try {
      const response = await patch(`/tours/${id}`, {
        status: 2,
      });
      if (response.data) {
        fetchTours();
      }
    } catch (error) {}
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={4}
        sx={{ padding: 4, mb: 4, borderRadius: 3, backgroundColor: "#fff" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FilterAlt /> Filters
          </Typography>
          <IconButton onClick={() => setFilterVisible(!filterVisible)}>
            {filterVisible ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={filterVisible} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Tour Name"
                name="tourname"
                value={searchFilters.tourname}
                onChange={(e) => handleFilterChange("tourname", e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AutocompleteField
                label="Destination"
                name="destination"
                value={searchFilters.destination}
                onChange={(value) => handleFilterChange("destination", value)}
                fetchOptions={fetchPlaces}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AutocompleteField
                label="Places"
                name="places"
                value={searchFilters.places}
                onChange={(value) => handleFilterChange("places", value)}
                fetchOptions={fetchPlaces}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AutocompleteField
                label="Source"
                name="source"
                value={searchFilters.source}
                onChange={(value) => handleFilterChange("source", value)}
                fetchOptions={fetchPlaces}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={searchFilters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={searchFilters.status}
                  onChange={(e) =>
                    handleFilterChange("status", e.target.value as string)
                  }
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="1">Published</MenuItem>
                  <MenuItem value="2">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
                onClick={fetchTours}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>

      <Grid container spacing={3}>
        {/* {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour?._id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              {tour?.image?.url && (
                <Box
                  sx={{
                    height: 180,
                    background: `url(${tour?.image.url}) center/cover no-repeat`,
                  }}
                />
              )}
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {tour?.tourname}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Places:</strong>{" "}
                    {tour?.places?.map((p) => p.name).join(", ")}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Dates:</strong> {tour?.startDate?.slice(0, 10)} -{" "}
                    {tour?.endDate?.slice(0, 10)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Days/Nights:</strong> {tour?.days} Days /{" "}
                    {tour?.night} Nights
                  </Typography>
                  <Typography variant="body2">
                    <strong>Capacity:</strong> {tour?.capacity} people
                  </Typography>

                  <Typography variant="body2">
                    <strong>Min Fare:</strong> ₹{tour?.minfair}
                  </Typography>

                  <Chip
                    label={tour?.status === 1 ? "Draft" : "Published"}
                    color={tour?.status === 1 ? "warning" : "success"}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </CardContent>

              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Button startIcon={<Edit />} variant="outlined">
                  Edit
                </Button>
                {tour?.status === 1 && (
                  <Button
                    startIcon={<Delete />}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                )}
                {tour?.status === 1 && (
                  <Button
                    startIcon={<Publish />}
                    variant="outlined"
                    color={"success"}
                  >
                    {"Publish"}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))} */}
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour?._id}>
            <Card elevation={4} sx={{ borderRadius: 4, overflow: "hidden" }}>
              {tour?.image?.url && (
                <Box
                  sx={{
                    height: 180,
                    backgroundImage: `url(${tour?.image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {tour?.tourname}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <LocationOn
                    fontSize="small"
                    sx={{ verticalAlign: "middle", mr: 0.5 }}
                  />
                  {tour?.places?.map((p) => p.name).join(", ")}
                </Typography>

                <Stack direction="row" spacing={2} mt={1} alignItems="center">
                  <Typography variant="body2">
                    <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {tour?.startDate?.slice(0, 10)} -{" "}
                    {tour?.endDate?.slice(0, 10)}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} mt={1} alignItems="center">
                  <Typography variant="body2">
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    {tour?.days} Days / {tour?.night} Nights
                  </Typography>
                  <Typography variant="body2">
                    <PeopleAlt fontSize="small" sx={{ mr: 0.5 }} />
                    {tour?.capacity} People
                  </Typography>
                </Stack>

                <Typography variant="h6" mt={1} color="error.main">
                  ₹{tour?.minfair?.toLocaleString("en-IN")}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Link to={`${tour?._id}/edit`}>
                  <Button startIcon={<Edit />} variant="outlined">
                    Edit
                  </Button>
                </Link>
                {tour?.status === 1 && (
                  <Button
                    startIcon={<Delete />}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                )}
                {tour?.status === 1 && (
                  <Button
                    startIcon={<Publish />}
                    variant="outlined"
                    color={"success"}
                    onClick={async () => {
                      if (tour._id) await handlePublish(tour._id);
                    }}
                  >
                    {"Publish"}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};

export default TourListPage;
