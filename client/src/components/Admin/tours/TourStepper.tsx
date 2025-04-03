import { Box, StepLabel, Stepper, Step, StepContent } from "@mui/material";
import { useCreateTours } from "../../../contexts/TourTravelProvider";
import { useEffect, useMemo, useRef } from "react";
import {
  AddCaptinBus,
  BasicTour,
  ItenarySections,
  ToursSourcePlaces,
} from "./components";
import AddSEODetails from "./components/AddSEODetails";
import FinalizeTours from "./components/FinalizeTours";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TourStepper: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useCreateTours();
  const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (id && !hasFetched.current) {
  //     hasFetched.current = true;
  //     fetchTour();
  //   }
  // }, [id]);

  // const fetchTour = async () => {
  //   const response = await get<{ result: TourTravelType["tours"] }>(
  //     `tours/${id}`
  //   );
  //   if (response.data.result) {
  //     dispatch({
  //       type: TourTravelsActionsType.GET_TOURS,
  //       payload: response.data.result,
  //     });
  //   }
  // };

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
            <StepLabel>{step.title}</StepLabel>
            <StepContent>{step.component}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TourStepper;
