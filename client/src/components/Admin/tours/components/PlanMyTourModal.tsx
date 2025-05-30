import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PlanMyTourModalProps {
  open: boolean;
  onClose: () => void;
}

const PlanMyTourModal: React.FC<PlanMyTourModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    departureDate: "",
    days: "",
    adults: "",
    children: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Replace with actual API call
    onClose();
    alert("Your enquiry has been submitted successfully!");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: "rounded-xl" }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle className="flex justify-between items-center border-b">
          <Typography variant="h6" className="text-[#C22A54] font-bold">
            Plan Your Custom Tour
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-6">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Travelling From (City)"
                name="from"
                value={formData.from}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Departure Date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Duration (Days)"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Children (5-12 yrs)"
                name="children"
                value={formData.children}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={3}
                fullWidth
                label="Any Special Requests?"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            className="mt-6"
            sx={{
              background: "linear-gradient(to right, #C22A54, #E53E3E)",
              color: "#fff",
              paddingY: "10px",
              fontWeight: "bold",
              borderRadius: "999px",
              "&:hover": {
                background: "#B81D48",
              },
            }}
          >
            SEND ENQUIRY
          </Button>

          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>✅ We assure the privacy of your contact data.</p>
            <p>
              ✅ Only our team will use this to contact you. No spam guaranteed.
            </p>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PlanMyTourModal;
