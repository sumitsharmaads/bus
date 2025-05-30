import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  Delete,
  ExpandMore,
  Save,
  ArrowBack,
  ArrowForward,
  ContentCopy,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import {
  Itenary,
  ItenaryTourInterface,
  TourTravelsActionsType,
} from "../../types";
import { Textarea } from "@material-tailwind/react";
import { useCreateTours } from "../../../../contexts/TourTravelProvider";

type EditableItenaryField = "title" | "shortDescription" | "order";

export const ItenarySections: React.FC = () => {
  const { state, dispatch, isEdit } = useCreateTours();
  const [itenaries, setItenaries] = useState<ItenaryTourInterface["itenary"]>(
    state.tours?.itenary || []
  );
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);
  const [sightseeingInputs, setSightseeingInputs] = useState<
    Record<number, string>
  >({});
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [copyFromIndex, setCopyFromIndex] = useState<number | null>(null);

  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  const handleAddItenary = () => {
    setCopyDialogOpen(true); // Open dialog to choose copy or new itinerary
  };

  const handleConfirmCopy = () => {
    const order = itenaries?.length;
    if (copyFromIndex !== null) {
      setItenaries([
        ...itenaries,
        { ...itenaries[copyFromIndex], order: order + 1 },
      ]);
    } else {
      setItenaries([
        ...itenaries,
        {
          title: "",
          shortDescription: "",
          toggles: [],
          sightseeing: [],
          order: order + 1,
        },
      ]);
    }
    setCopyDialogOpen(false);
    setCopyFromIndex(null);
  };

  const handleDeleteItenary = (index: number) => {
    const updated = itenaries.filter((_, i) => i !== index);
    setItenaries(updated);
    setExpandedIndex(false);
  };

  const handleChange = <K extends EditableItenaryField>(
    index: number,
    field: K,
    value: Itenary[K]
  ) => {
    const updated = [...itenaries];
    updated[index][field] = value;
    setItenaries(updated);
  };

  const handleToggleChange = (index: number, value: string) => {
    setItenaries((prev) =>
      prev.map((itenary, i) => {
        if (i !== index) return itenary;
        const toggles = itenary.toggles.includes(value)
          ? itenary.toggles.filter((v) => v !== value)
          : [...itenary.toggles, value];
        return { ...itenary, toggles };
      })
    );
  };

  const handleAddSightseeing = (index: number) => {
    const value = sightseeingInputs[index]?.trim();
    if (!value) return;

    const updated = [...itenaries];
    if (!(updated[index].sightseeing || []).includes(value)) {
      updated[index].sightseeing = [
        ...(updated[index].sightseeing || []),
        value,
      ];
      setItenaries(updated);
    }
    setSightseeingInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const handleRemoveSightseeing = (index: number, sIndex: number) => {
    const updated = [...itenaries];
    updated[index].sightseeing = (updated[index].sightseeing || []).splice(
      sIndex,
      1
    );
    setItenaries(updated);
  };

  const disableBtn = useMemo(
    () => !(itenaries?.length === (state.tours?.days || 1)),
    [itenaries]
  );

  const disableAddButton = itenaries.length >= (state.tours?.days || 1);
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="subtitle2" color="textSecondary" mb={1}>
        Based on your selection of{" "}
        <b>
          {state.tours?.days || 1} Days / {state.tours?.night || 0} Night
        </b>
        , please add itinerary details for each day of the tour.
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle2">
          <b>Itinerary (*) </b>
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddItenary}
          size="small"
          disabled={disableAddButton}
        >
          Add Itinerary
        </Button>
      </Box>

      {itenaries.map((itenary, index) => (
        <Accordion
          key={index}
          expanded={expandedIndex === index}
          onChange={() => handleAccordionChange(index)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">Day {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  size="small"
                  value={itenary.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Textarea
                  label="Description"
                  name="description"
                  value={itenary.shortDescription ?? ""}
                  onChange={(e) =>
                    handleChange(index, "shortDescription", e.target.value)
                  }
                  rows={2}
                  className="w-full"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  <b>Select Facilities</b>
                </Typography>
                {[
                  "Transfer",
                  "Meals",
                  "Sightseeing",
                  "Stay",
                  "Photography",
                ].map((f) => (
                  <FormControlLabel
                    key={f}
                    control={
                      <Checkbox
                        size="small"
                        checked={itenary.toggles.includes(f)}
                        onChange={() => handleToggleChange(index, f)}
                      />
                    }
                    label={f}
                  />
                ))}
              </Grid>
              {itenary.toggles.includes("Sightseeing") && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    <b>Sightseeing Points</b>
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <TextField
                      size="small"
                      label="Enter sightseeing"
                      fullWidth
                      value={sightseeingInputs[index] || ""}
                      onChange={(e) =>
                        setSightseeingInputs((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSightseeing(index);
                        }
                      }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAddSightseeing(index)}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box mt={1}>
                    {itenary?.sightseeing?.map((s, sIndex) => (
                      <Box
                        key={sIndex}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgcolor="#f1f1f1"
                        p={1}
                        borderRadius={1}
                        mb={1}
                      >
                        <Typography>{s}</Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveSightseeing(index, sIndex)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              )}
              {/* <Grid item xs={12} display="flex" justifyContent="flex-end">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteItenary(index)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Grid> */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* Bottom Button Group */}
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
          {isEdit && (
            <Button
              startIcon={<Save />}
              variant="contained"
              color="success"
              size="small"
              onClick={() => dispatch({ type: TourTravelsActionsType.NEXT })}
            >
              Save Changes
            </Button>
          )}
          <Button
            endIcon={<ArrowForward />}
            variant="outlined"
            size="small"
            disabled={disableBtn}
            onClick={() =>
              dispatch({
                type: TourTravelsActionsType.ITENARY,
                payload: { itenary: itenaries },
              })
            }
          >
            Next
          </Button>
        </Box>
      </Box>
      {/* Copy Itinerary Dialog */}
      <Dialog open={copyDialogOpen} onClose={() => setCopyDialogOpen(false)}>
        <DialogTitle>Copy from Previous Itinerary?</DialogTitle>
        <DialogContent>
          <Typography>Select a day to copy or create a new one:</Typography>
          {itenaries.length > 0 &&
            itenaries.map((_, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                startIcon={<ContentCopy />}
                onClick={() => setCopyFromIndex(index)}
                sx={{ m: 1 }}
              >
                Copy Day {index + 1}
              </Button>
            ))}
          <Button
            variant="contained"
            size="small"
            onClick={() => setCopyFromIndex(null)}
            sx={{ m: 1 }}
          >
            Create New
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCopyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmCopy} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
