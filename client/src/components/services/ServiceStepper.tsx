import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export type ServiceStepperProps = {
  totalSteps: number;
  stepsData: Record<number, React.ReactNode>;
};
export const ServiceStepper: React.FC<ServiceStepperProps> = ({
  totalSteps,
  stepsData,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const onSave = async () => {};

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        {Array.from({ length: totalSteps }, (_, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            {index + 1}
          </Step>
        ))}
      </Stepper>
      <div>{stepsData[activeStep + 1]}</div>
      <div className="mt-16 flex items-center">
        {activeStep !== 0 && (
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
        )}
        <div className="ml-auto flex space-x-4">
          {totalSteps - 1 !== activeStep && (
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          )}
          {totalSteps - 1 === activeStep && (
            <Button
              onClick={onSave}
              className="w-full text-white font-medium rounded-lg bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
