import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon as ChevronRightCircleIconFilled } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Modal } from "../../common";
import { ServiceStepper } from "./ServiceStepper";
import { LocalServiceForm } from "./LocalServiceForm";
import { ServiceInfoForm } from "./ServiceInfoForm";
import { OutstationBusBooking } from "./OutstationBusBooking";
import { useRentalServiceContext } from "../../contexts/RentealServiceContext";

type RadioOptionProps = {
  value: "local" | "outstation";
  selectedService: "local" | "outstation" | null;
  onChange: (value: "local" | "outstation") => void;
  label: string;
  description: string;
};

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  selectedService,
  onChange,
  label,
  description,
}) => {
  const isSelected = selectedService === value;
  return (
    <li className="flex items-center space-x-4 border border-gray-200 cursor-pointer">
      <input
        type="radio"
        value={value}
        name="busServiceRadio"
        id={value}
        className="hidden"
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      <label
        htmlFor={value}
        className="text-lg font-medium text-gray-800 flex items-center justify-between w-full p-2 cursor-pointer"
        onClick={() => onChange(value)}
      >
        <span className="block">
          {label}
          <span className="block text-sm text-gray-500">{description}</span>
        </span>
        {isSelected ? (
          <ChevronRightCircleIconFilled className="h-6 w-6 text-blue-600 bg-blue-gray-50 rounded-xl" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        )}
      </label>
    </li>
  );
};

export const BookBusCard: React.FC = () => {
  const { busService, changeBusService } = useRentalServiceContext();
  const [showModal, setShowModal] = useState(false);

  const handleRadioChange = (value: "local" | "outstation") => {
    changeBusService(value);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card className="mt-6">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex mb-2 justify-center"
          >
            Bus Rental Service
          </Typography>
          <Typography variant="small" className="text-gray-600 mb-4">
            Whether you're looking for a convenient local commute or planning an
            intercity journey, we offer bus rental services tailored to your
            needs. Select your preferred service and proceed with the booking.
          </Typography>

          <ul className="sk-radio arrow custom-scroll grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <RadioOption
              value="local"
              selectedService={busService}
              onChange={handleRadioChange}
              label="Local Bus Service"
              description="Ideal for city commutes and local travel."
            />
            <RadioOption
              value="outstation"
              selectedService={busService}
              onChange={handleRadioChange}
              label="Outstation Bus Service"
              description="Perfect for inter-city and long-distance travel."
            />
          </ul>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            className={`${busService ? "bg-primary text-white" : ""}`}
            disabled={!busService}
            onClick={() => setShowModal(true)}
          >
            Book Bus
          </Button>
        </CardFooter>
      </Card>
      <Modal
        open={showModal}
        handleClose={handleCloseModal}
        size={"sm"}
        showCloseIcon={true}
        title={`${
          busService === "outstation" ? "Outstation" : "Local"
        } Bus Booking`}
        showConfirm={false}
        wrapperClassName="overflow-x-hidden"
        disableFooter={true}
      >
        <ServiceStepper
          totalSteps={2}
          stepsData={{
            1:
              busService === "outstation" ? (
                <OutstationBusBooking />
              ) : (
                <LocalServiceForm />
              ),
            2: <ServiceInfoForm handleClose={handleCloseModal} />,
          }}
        />
      </Modal>
    </>
  );
};
