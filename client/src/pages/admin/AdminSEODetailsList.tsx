import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  SelectChangeEvent,
  Grid,
  Pagination,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Delete,
  FilterAlt,
  ExpandLess,
  ExpandMore,
  Search,
  Clear,
} from "@mui/icons-material";
import { get } from "../../service";
import { routeOptions } from "../../utils/constant";
import { Link, useLocation } from "react-router-dom";

export interface AdminSEOInterface {
  _id?: string;
  route: string;
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  url?: string;
}
const AdminSEODetailsList: React.FC = () => {
  const itemsPerPage = 10;
  const location = useLocation();
  const [filterVisible, setFilterVisible] = useState<boolean>(true);
  const [seos, setSeos] = useState<AdminSEOInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [filters, setFilters] = useState<{ route: string }>({
    route: "",
  });

  useEffect(() => {
    void fetchSeosData();
  }, []);

  const handleFilterSelectChange = (e: SelectChangeEvent<string>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSeosData = async () => {
    const { route } = filters;
    let requestURL = `seo/getAll?page=${currentPage}&limit=${itemsPerPage}`;
    if (route) {
      const encodedRoute = encodeURIComponent(route);
      requestURL = requestURL + `&route=${encodedRoute}`;
    }
    try {
      const response = await get<{
        success: boolean;
        data: AdminSEOInterface[];
        total: number | null;
      }>(requestURL);

      if (response.data?.data) {
        setSeos(response.data.data);
        setPageCount(Math.ceil((response.data.total || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleClearFilters = () => {
    setFilters({ route: "" });
  };

  const handleSearch = () => fetchSeosData();

  const getRouteKey = (value: string): string | undefined => {
    const entry = Object.entries(routeOptions).find(([, val]) => val === value);
    return entry?.[0];
  };

  return (
    <div>
      <Typography variant="h4">Bus Management</Typography>
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
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Routes</InputLabel>
                <Select
                  name="route"
                  value={filters.route}
                  onChange={handleFilterSelectChange}
                  label="State"
                >
                  <MenuItem value="">All Routes</MenuItem>
                  {Object.entries(routeOptions).map(([route, path]) => (
                    <MenuItem key={route} value={path}>
                      {route}
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seos.map((seo) => (
              <TableRow key={seo._id}>
                <TableCell>
                  <Link to={seo.route} className="text-blue-800">
                    {getRouteKey(seo.route)}
                  </Link>
                </TableCell>
                <TableCell>{seo.title}</TableCell>
                <TableCell>{seo.description}</TableCell>
                <TableCell>{seo.keywords}</TableCell>
                <TableCell>
                  <Link to={`${seo._id}/edit`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>

                  <IconButton color="error">
                    <Delete />
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
    </div>
  );
};

export default AdminSEODetailsList;
