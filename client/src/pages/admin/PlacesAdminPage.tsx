import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Collapse,
  Grid,
  SelectChangeEvent,
  Pagination,
} from "@mui/material";
import {
  Add,
  Edit,
  FilterAlt,
  ExpandMore,
  ExpandLess,
  Search,
  Clear,
  UploadFile,
  Download,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { post } from "../../service";

interface State {
  name: string;
  short: string;
}

const states: { name: string; short: string }[] = [
  { name: "Andhra Pradesh", short: "AP" },
  { name: "Arunachal Pradesh", short: "AR" },
  { name: "Assam", short: "AS" },
  { name: "Bihar", short: "BR" },
  { name: "Chhattisgarh", short: "CG" },
  { name: "Goa", short: "GA" },
  { name: "Gujarat", short: "GJ" },
  { name: "Haryana", short: "HR" },
  { name: "Himachal Pradesh", short: "HP" },
  { name: "Jharkhand", short: "JH" },
  { name: "Karnataka", short: "KA" },
  { name: "Kerala", short: "KL" },
  { name: "Madhya Pradesh", short: "MP" },
  { name: "Maharashtra", short: "MH" },
  { name: "Manipur", short: "MN" },
  { name: "Meghalaya", short: "ML" },
  { name: "Mizoram", short: "MZ" },
  { name: "Nagaland", short: "NL" },
  { name: "Odisha", short: "OR" },
  { name: "Punjab", short: "PB" },
  { name: "Rajasthan", short: "RJ" },
  { name: "Sikkim", short: "SK" },
  { name: "Tamil Nadu", short: "TN" },
  { name: "Telangana", short: "TG" },
  { name: "Tripura", short: "TR" },
  { name: "Uttar Pradesh", short: "UP" },
  { name: "Uttarakhand", short: "UK" },
  { name: "West Bengal", short: "WB" },

  // Union Territories
  { name: "Andaman and Nicobar Islands", short: "AN" },
  { name: "Chandigarh", short: "CH" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", short: "DN" },
  { name: "Lakshadweep", short: "LD" },
  { name: "Delhi", short: "DL" },
  { name: "Puducherry", short: "PY" },
  { name: "Ladakh", short: "LA" },
  { name: "Jammu and Kashmir", short: "JK" },
];

export interface Place {
  _id?: string;
  id?: number;
  state: string;
  name: string;
  accentcity?: string;
  latitude?: string;
  longitude?: string;
}

const PlacesAdminPage: React.FC = () => {
  const itemsPerPage = 10;
  const [places, setPlaces] = useState<Place[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ name: string; state: string }>({
    name: "",
    state: "",
  });
  const [pageCount, setPageCount] = useState(1);
  const [skippedRecords, setSkippedRecords] = useState<Place[]>([]);
  const [openSampleModal, setOpenSampleModal] = useState(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(true);

  useEffect(() => {
    fetchPlaces();
  }, [currentPage]);

  const fetchPlaces = async () => {
    try {
      const nonEmptyFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value.trim() !== "")
      );
      const response = await post<{
        data: {
          count: number;
          result: Place[];
        };
      }>("places/admin/getAll", {
        condition: {
          search: nonEmptyFilters,
          isCount: true,
          page: currentPage,
          items: itemsPerPage,
        },
      });
      if (response?.data?.data?.result) {
        const { result, count } = response?.data?.data;
        setPlaces(response.data.data.result);
        setPageCount(Math.ceil((count || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Failed to fetch places:", error);
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSelectChange = (e: SelectChangeEvent<string>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    fetchPlaces();
  };

  const handleClearFilters = () => {
    setFilters({ name: "", state: "" });
    fetchPlaces();
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target?.result) return;
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Place[] = XLSX.utils.sheet_to_json(sheet);

      try {
        const response = await post<{
          data: {
            skippedCount: number;
            skippedRecords: Place[];
          };
        }>("places/upload", {
          places: jsonData,
        });
        setSkippedRecords(response.data?.data?.skippedRecords || []);
        fetchPlaces();
      } catch (error) {
        console.error("Bulk upload failed:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDownloadSkippedRecords = () => {
    if (skippedRecords.length === 0) return;

    const ws = XLSX.utils.json_to_sheet(skippedRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SkippedRecords");

    XLSX.writeFile(wb, "Skipped_Places.xlsx");
  };
  return (
    <div>
      <Paper
        elevation={4}
        sx={{ padding: 4, mb: 4, borderRadius: 3, backgroundColor: "#f5f5f5" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
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
                label="City"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={filters.state}
                  onChange={handleFilterSelectChange}
                  label="State"
                >
                  <MenuItem value="">All States</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state.short} value={state.name}>
                      {state.name} ({state.short})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<Search />}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Clear />}
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" startIcon={<UploadFile />}>
          <input
            type="file"
            accept=".xlsx, .csv"
            onChange={handleFileUpload}
            style={{
              opacity: 0,
              width: "100%",
              position: "absolute",
              cursor: "pointer",
            }}
          />
          Upload Places
        </Button>
        {skippedRecords.length > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<Download />}
            onClick={handleDownloadSkippedRecords}
          >
            Download Skipped Records
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Download />}
          onClick={() => setOpenSampleModal(true)}
        >
          Sample Excel
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Accent City</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places.map((place) => (
              <TableRow key={place.id}>
                <TableCell>{place.id}</TableCell>
                <TableCell>{place.state}</TableCell>
                <TableCell>{place.name}</TableCell>
                <TableCell>{place.accentcity}</TableCell>
                <TableCell>{place.latitude}</TableCell>
                <TableCell>{place.longitude}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => setOpenModal(true)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Modal open={openSampleModal} onClose={() => setOpenSampleModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Sample Excel Format
          </Typography>
          <Typography variant="body2" mb={2}>
            Please use the following format when preparing the Excel file for
            uploading city/place data:
          </Typography>
          <ul className="pl-5 text-sm mt-0 mb-4">
            <li>
              <b>id</b>: Unique identifier for the place (can be numeric or
              text).
            </li>
            <li>
              <b>state</b>: Select a value from the predefined dropdown list of
              Indian states/UTs.
            </li>
            <li>
              <b>name</b>: Name of the city/place (e.g., Mumbai).
            </li>
            <li>
              <b>accentcity</b>: Local or regional name of the city, if
              different (e.g., Bambai).
            </li>
            <li>
              <b>latitude</b>: Geographic latitude of the location (optional).
            </li>
            <li>
              <b>longitude</b>: Geographic longitude of the location (optional).
            </li>
          </ul>
          <Button
            variant="contained"
            color="primary"
            href="/files/places_sample_file.xlsx"
            download
          >
            Download Sample File
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PlacesAdminPage;
