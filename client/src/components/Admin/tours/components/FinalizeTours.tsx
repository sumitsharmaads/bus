import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCreateTours } from "../../../../contexts/TourTravelProvider";
import { ArrowBack, Save } from "@mui/icons-material";
import { TourTravelsActionsType, TourTravelType } from "../../types";
import { post, put, remove } from "../../../../service";
import { successPopup } from "../../../../utils/errors/alerts";
import { useNavigate } from "react-router-dom";

const FinalizeTours = () => {
  const { state, dispatch, isEdit, fetchTour, isPusblished } = useCreateTours();
  const navigate = useNavigate();

  const tour = state.tours;

  if (!tour) return null;

  const saveChanges = async () => {
    try {
      if (isEdit) {
        const response = await put<{
          success: boolean;
          result: TourTravelType["tours"];
        }>(`tours/${state.tours?._id}`, tour);
        if (response.data.success && response.data.result) {
          successPopup("Updated data sucessfully");
          navigate("/admin/tours");
        }
      } else {
        const response = await post<{
          success: boolean;
          result: TourTravelType["tours"];
        }>("tours", tour);
        if (response.data.success && response.data.result) {
          dispatch({
            type: TourTravelsActionsType.UPDATE_ID,
            payload: response.data.result?._id,
          });
          successPopup("Saved data sucessfully");
          navigate("/admin/tours");
        }
      }
    } catch (error) {
      console.warn("error");
    }
  };

  const deleteTour = async () => {
    const response = await remove<{
      success: boolean;
    }>(`tours/${state.tours?._id}`);
    if (response.data.success) {
      successPopup("Tour deleted sucessfully, navigating back to tours");
      navigate("/admin/tours");
    }
  };

  return (
    <Box className="w-full" p={2}>
      {/* Basic Tour Info */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>1. Basic Tour Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <b>Tour Name:</b> {tour.tourname}
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Fare:</b> ₹{tour.minfair}
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Capacity:</b> {tour.capacity}
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Dates:</b> {tour.startDate} to {tour.endDate}
            </Grid>
            <Grid item xs={12}>
              <b>Description:</b> {tour.description}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Itinerary */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>2. Itinerary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tour.itenary?.map((item, index) => (
            <Box key={index} mb={2}>
              <Typography fontWeight={600}>
                Day {index + 1}: {item.title}
              </Typography>
              <Typography>{item.shortDescription}</Typography>
              <Typography>Options: {item.toggles.join(", ")}</Typography>
              <Typography>
                Sightseeing: {item.sightseeing?.join(", ")}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Source & Places */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>3. Source & Destinations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontWeight={600}>Sources:</Typography>
          {tour.source?.map((src, i) => (
            <Box key={i} mb={1}>
              <Typography>
                📍 {src.location?.name}, {src.location?.state}
              </Typography>
              <Typography>Fare: ₹{src.fare}</Typography>
              <Typography>
                Boarding Points: {src.onBoarding.join(", ")}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600}>Places:</Typography>
          {tour.places?.map((place, i) => (
            <Typography key={i}>
              🏞️ {place.name}, {place.state}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Bus & Captain */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>4. Bus & Captain Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tour.bus && (
            <>
              <Typography>
                <b>Bus Number:</b> {tour.bus.busNumber}
              </Typography>
              <Typography>
                <b>Type:</b> {tour.bus.busType}
              </Typography>
              <Typography>
                <b>Capacity:</b> {tour.bus.seatingCapacity}
              </Typography>
            </>
          )}
          {tour.captin && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography>
                <b>Captain:</b> {tour.captin.fullname} ({tour.captin.phone})
              </Typography>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* SEO Info */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>5. SEO Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Title:</b> {tour.seo?.title}
          </Typography>
          <Typography>
            <b>Description:</b> {tour.seo?.description}
          </Typography>
          <Typography>
            <b>Keywords:</b> {tour.seo?.keywords}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box display="flex" justifyContent="space-between" mt={3}>
        {/* Left: Back */}
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          size="small"
          onClick={() =>
            dispatch({
              type: TourTravelsActionsType.BACK,
            })
          }
        >
          Back
        </Button>

        {/* Right: Save & Next */}
        <Box display="flex" gap={1}>
          <Button
            startIcon={<Save />}
            variant="contained"
            color="success"
            size="small"
            onClick={saveChanges}
          >
            {isEdit ? "Update Changes" : "Save Changes"}
          </Button>
          {isEdit && !isPusblished && (
            <Button
              startIcon={<Save />}
              variant="contained"
              color={"secondary"}
              size="small"
              onClick={deleteTour}
            >
              {"Delete Tour"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FinalizeTours;
