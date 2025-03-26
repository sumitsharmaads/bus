import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
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
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Add, Edit, Delete, Save } from "@mui/icons-material";
import axios from "axios";
import { get, post, put } from "../../service";

interface Bus {
  _id?: string;
  busNumber: string;
  busType: string;
  seatingCapacity: number;
  operatorName: string;
  facilities: string[];
  isSleeper: boolean;
  status: string;
}

const BusAdminPage: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [formValues, setFormValues] = useState<Bus>({
    busNumber: "",
    busType: "",
    seatingCapacity: 0,
    operatorName: "",
    facilities: [],
    isSleeper: false,
    status: "Active",
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await get<{
        success: boolean;
        buses: Bus[];
      }>("buses");
      setBuses(response.data.buses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleOpenModal = (bus: Bus | null = null) => {
    setEditingBus(bus);
    setFormValues(
      bus || {
        busNumber: "",
        busType: "",
        seatingCapacity: 0,
        operatorName: "",
        facilities: [],
        isSleeper: false,
        status: "Active",
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingBus(null);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSave = async () => {
    try {
      if (editingBus && editingBus._id) {
        await put(`buses/update/${editingBus._id}`, formValues);
      } else {
        await post("buses/add", formValues);
      }
      fetchBuses();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving bus:", error);
    }
  };
  const handleFacilitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(value)
        ? prev.facilities.filter((facility) => facility !== value)
        : [...prev.facilities, value],
    }));
  };

  return (
    <div>
      <Typography variant="h4">Bus Management</Typography>
      <Grid container justifyContent="flex-end" className="mb-2">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
          >
            Add Bus
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bus Number</TableCell>
              <TableCell>Bus Type</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Facilities</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus._id}>
                <TableCell>{bus.busNumber}</TableCell>
                <TableCell>{bus.busType}</TableCell>
                <TableCell>{bus.seatingCapacity}</TableCell>
                <TableCell>{bus.facilities.join(", ")}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(bus)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Bus Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingBus ? "Edit Bus" : "Add Bus"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bus Number"
                name="busNumber"
                value={formValues.busNumber}
                onChange={handleTextChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bus Type"
                name="busType"
                value={formValues.busType}
                onChange={handleTextChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Seating Capacity"
                name="seatingCapacity"
                type="number"
                value={formValues.seatingCapacity}
                onChange={handleTextChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Operator Name"
                name="operatorName"
                value={formValues.operatorName}
                onChange={handleTextChange}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formValues.status}
                onChange={handleSelectChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.isSleeper}
                onChange={handleCheckboxChange}
                name="isSleeper"
              />
            }
            label="Sleeper Bus"
          />
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Select Facilities
            </Typography>
            {[
              "WiFi",
              "AC",
              "Charging Points",
              "Reclining Seats",
              "Restroom",
              "Water Bottle",
              "TV",
              "Blankets",
            ].map((facility) => (
              <FormControlLabel
                key={facility}
                control={
                  <Checkbox
                    checked={formValues.facilities.includes(facility)}
                    onChange={handleFacilitiesChange}
                    value={facility}
                  />
                }
                label={facility}
              />
            ))}
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BusAdminPage;
