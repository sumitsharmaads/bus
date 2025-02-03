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
} from "@mui/material";
import {
  Edit,
  Delete,
  Publish,
  Unpublished,
  FilterAlt,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import axios from "axios";
import { post } from "../../../service";
import { BasicDetailsType } from "./AddBasicTourDetails";

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

  const [tours, setTours] = useState<TourListDetailsType[]>([]);

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
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTours();
  }, [currentPage, searchFilters]);

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
          result: TourListDetailsType[];
          count: number;
        };
      }>("/tours/admin/getAll", {
        page: currentPage,
        items: itemsPerPage,
        search: filteredSearch,
        isCount: true,
      });
      console.log(response.data);
      if (response?.data?.data?.result) {
        setTours(response?.data?.data?.result ?? []);
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
        {tours.map((tour: any) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card elevation={5} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                <Avatar
                  src={tour.image?.url}
                  alt={tour.tourname}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="h6" fontWeight={600} className="font-bold">
                  {tour.tourname}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Destination: {tour.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum Fare: {tour.minfair}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {tour.startDate} - {tour.endDate}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={
                    tour.status === "Published"
                      ? "success.main"
                      : "warning.main"
                  }
                >
                  Status: {tour.status}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                <Button variant="outlined" color="primary" startIcon={<Edit />}>
                  Edit
                </Button>
                {tour.status === "Draft" && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color={tour.status === "Published" ? "warning" : "success"}
                  startIcon={
                    tour.status === "Published" ? <Unpublished /> : <Publish />
                  }
                >
                  {tour.status === "Published" ? "Unpublish" : "Publish"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={5}
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
