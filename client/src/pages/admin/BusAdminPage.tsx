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
} from "@mui/material";
import { Add, Edit, Delete, Save } from "@mui/icons-material";
import axios from "axios";

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
      const response = await axios.get("/api/buses/");
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

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      if (editingBus && editingBus._id) {
        await axios.put(`/api/buses/update/${editingBus._id}`, formValues);
      } else {
        await axios.post("/api/buses/add", formValues);
      }
      fetchBuses();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving bus:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Bus Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenModal()}
      >
        Add Bus
      </Button>
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
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingBus ? "Edit Bus" : "Add Bus"}
          </Typography>
          <TextField
            fullWidth
            label="Bus Number"
            name="busNumber"
            value={formValues.busNumber}
            // onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bus Type"
            name="busType"
            value={formValues.busType}
            //onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Seating Capacity"
            name="seatingCapacity"
            type="number"
            value={formValues.seatingCapacity}
            // onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Operator Name"
            name="operatorName"
            value={formValues.operatorName}
            // onChange={handleFormChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              //onChange={handleFormChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
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
