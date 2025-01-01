import React, { Dispatch, SetStateAction, useContext } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { useRentalServiceContext } from "../../contexts/RentealServiceContext";

export type ServiceStepperProps = {
  totalSteps: number;
  stepsData: Record<number, React.ReactNode>;
};
export const ServiceStepper: React.FC<ServiceStepperProps> = ({
  totalSteps,
  stepsData,
}) => {
  const { steps } = useRentalServiceContext();

  return (
    <div className="w-full">
      <Stepper activeStep={steps - 1} color={"blue"}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <Step key={index}>{index + 1}</Step>
        ))}
      </Stepper>

      <div className="mb-2">{stepsData[steps]}</div>
    </div>
  );
};
