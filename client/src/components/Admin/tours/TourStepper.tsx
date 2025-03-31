import { Box, StepLabel, Stepper, Step, StepContent } from "@mui/material";
import { useCreateTours } from "../../../contexts/TourTravelProvider";
import { useEffect, useMemo } from "react";
import {
  AddCaptinBus,
  BasicTour,
  ItenarySections,
  ToursSourcePlaces,
} from "./components";
import AddSEODetails from "./components/AddSEODetails";
import FinalizeTours from "./components/FinalizeTours";
import { useParams } from "react-router-dom";
import { get } from "../../../service";
import { TourTravelsActionsType, TourTravelType } from "../types";

const TourStepper: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useCreateTours();

  useEffect(() => {
    if (id) {
      fetchTour();
    }
  }, [id]);

  const fetchTour = async () => {
    const tempId = state?.tours?._id || id;
    const response = await get<{
      result: TourTravelType["tours"];
    }>(`tours/${tempId}`);
    if (response.data.result) {
      dispatch({
        type: TourTravelsActionsType.GET_TOURS,
        payload: response.data.result,
      });
    }
  };
  const steps = useMemo(
    () => [
      {
        title: "Add needful Informations",
        component: <BasicTour />,
      },
      {
        title: "Add Basic Informations",
        component: <ToursSourcePlaces />,
      },
      {
        title: "Add Itenary",
        component: <ItenarySections />,
      },
      {
        title: "Add Bus or Captin",
        component: <AddCaptinBus />,
      },
      {
        title: "Add SEO",
        component: <AddSEODetails />,
      },
      { title: "Check and Save details", component: <FinalizeTours /> },
    ],
    []
  );
  return (
    <Box>
      <Stepper activeStep={state.steps} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel
              className="w-[96]"
              //   optional={
              //     index === steps.length - 1 ? (
              //       <Typography variant="caption">Last step</Typography>
              //     ) : null
              //   }
            >
              {step.title}
            </StepLabel>
            <StepContent>{step.component}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TourStepper;
