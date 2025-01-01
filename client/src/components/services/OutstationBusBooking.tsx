import {
  Button,
  Input,
  Option,
  Radio,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  getTodayDateTime,
  inputDateRegex,
  inputDateTimeRegex,
  nameRegex,
} from "../../utils";
import { AutoComplete, LabelError } from "../../common";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import { post } from "../../service";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { OutStationServiceType } from "../../types/forms";
import { useRentalServiceContext } from "../../contexts/RentealServiceContext";

type OptionType = {
  name: string;
  state: string;
};
const LocalCityOptions = ["Fatehabad", "Hisar", "Sirsa", "Delhi", "Adampur"];
const purposeOptions = [
  "Wedding",
  "Birthday party",
  "Elections",
  "School tour",
  "Tour",
  "Event",
  "Other",
];

export const OutstationBusBooking: React.FC = () => {
  const { onChange, changeStep, state } = useRentalServiceContext();
  const minDate = useMemo(() => getTodayDateTime(), []);
  const [formValue, setFormValue] = useState<OutStationServiceType>(
    (state[1] as OutStationServiceType) || {
      source: "",
      purpose: "",
      travelDate: minDate,
      returnDate: "",
      destination: "",
      tour: "one way",
    }
  );
  const [touched, setTouched] = useState<
    Record<keyof Omit<OutStationServiceType, "tour">, boolean>
  >({
    source: false,
    purpose: false,
    travelDate: false,
    returnDate: false,
    destination: false,
  });
  const [errors, setErrors] = useState<Omit<OutStationServiceType, "tour">>();
  const handleChange = useCallback(
    (name: keyof OutStationServiceType, value: string) => {
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const key = event.target.name;
      setTouched((prevState) => ({
        ...prevState,
        [key]: true,
      }));
    },
    []
  );

  const handlePlaceSearch = async (
    value: string,
    setOptions: Dispatch<SetStateAction<OptionType[] | undefined>>
  ) => {
    try {
      const response = await post<{
        result: {
          result: OptionType[];
        };
      }>("places/cities", {
        condition: {
          search: { name: value },
        },
      });
      if (response?.data?.result?.result) {
        setOptions(response.data.result.result || []);
      } else {
        setOptions([]);
      }
    } catch (error) {
      setOptions([]);
    }
  };

  const validateState = useMemo(() => {
    let sourceError = "";
    let destinationError = "";
    let purposeError = "";
    let travelDateError = "";
    let returnDateError = "";
    if (!nameRegex.test(formValue.source || "")) {
      sourceError = "Please select source city.";
    }
    if (!nameRegex.test(formValue.destination || "")) {
      destinationError = "Please select destination city";
    }
    if (!nameRegex.test(formValue.purpose || "")) {
      purposeError = "Please select trip purpose.";
    }
    if (!inputDateTimeRegex.test(formValue.travelDate)) {
      travelDateError = "Please select a valid date and time";
    }
    if (
      formValue?.tour === "round trip" &&
      !inputDateRegex.test(formValue?.returnDate || "")
    ) {
      returnDateError = "Please select a valid date";
    }
    setErrors({
      source: sourceError,
      destination: destinationError,
      purpose: purposeError,
      travelDate: travelDateError,
      returnDate: returnDateError,
    });
    return (
      !sourceError &&
      !destinationError &&
      !purposeError &&
      !travelDateError &&
      !returnDateError
    );
  }, [formValue]);

  const handleNext = () => {
    setTouched({
      source: true,
      destination: true,
      returnDate: true,
      purpose: true,
      travelDate: true,
    });
    if (validateState) {
      onChange(1, formValue);
      changeStep((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center items-center ">
      <form className="space-y-4">
        <div className="mt-2">
          <Radio
            color={"blue"}
            name="one way"
            label="One way"
            value={"one way"}
            crossOrigin={""}
            checked={formValue.tour === "one way"}
            onClick={(e) => {
              setFormValue((prev) => ({
                ...prev,
                tour: "one way",
                returnDate: "",
              }));
            }}
          />
          <Radio
            color={"blue"}
            name="round-trip"
            label="Round Trip"
            crossOrigin={""}
            checked={formValue.tour === "round trip"}
            onClick={(e) =>
              setFormValue((prev) => ({
                ...prev,
                tour: "round trip",
              }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              color={"blue"}
              label="From City"
              name={"source"}
              value={formValue.source}
              onChange={(value) => handleChange("source", value || "")}
              onBlur={() => setTouched((prev) => ({ ...prev, source: true }))}
            >
              {LocalCityOptions.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
            {errors?.source && touched.source && (
              <LabelError errorMessage={errors?.source} color="red" />
            )}
          </div>
          <div>
            <Select
              color={"blue"}
              label="Purpose"
              value={formValue.purpose}
              onChange={(value) => handleChange("purpose", value || "")}
              onBlur={() => setTouched((prev) => ({ ...prev, purpose: true }))}
            >
              {purposeOptions.map((purpuse) => (
                <Option key={purpuse} value={purpuse}>
                  {purpuse}
                </Option>
              ))}
            </Select>
            {errors?.purpose && touched.purpose && (
              <LabelError errorMessage={errors?.purpose} color="red" />
            )}
          </div>
        </div>
        <div className="mt-4">
          <AutoComplete<OptionType>
            color={"blue"}
            handleSearch={(value, setOptions) => {
              handlePlaceSearch(value, setOptions);
            }}
            name="destination"
            label="To City"
            handleBlur={(event, inputSelectionFlag) => {
              handleBlur(event);
              if (!inputSelectionFlag) handleChange("destination", "");
            }}
            handleSelect={(data, setValue) => {
              setFormValue((prev) => ({ ...prev, destination: data.name }));
              setValue(data.name);
            }}
            field={(option) => (
              <div className="col flex items-center">
                <MapPinIcon className="mr-2 text-gray-500 h-3" />
                <div>
                  <h5 className="row text-base">{option.name}</h5>
                  <p className="row text-xs">{option.state}</p>
                </div>
              </div>
            )}
          />
          {errors?.destination && touched.destination && (
            <LabelError errorMessage={errors?.destination} color="red" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-4">
            <Input
              type="datetime-local"
              color="blue"
              label="Travel Date"
              name="travelDate"
              crossOrigin="anonymous"
              value={formValue.travelDate || ""}
              onChange={(e) => {
                handleChange("travelDate", e.target.value || "");
              }}
              onBlur={handleBlur}
              min={minDate}
            />
            {errors?.travelDate && touched.travelDate && (
              <LabelError errorMessage={errors.travelDate} color="red" />
            )}
          </div>
          {formValue.tour === "round trip" && (
            <div className="mt-4">
              <Input
                type="date"
                color="blue"
                label="Return Date"
                name={"returnDate"}
                crossOrigin="anonymous"
                value={formValue.returnDate || ""}
                onChange={(e) => {
                  handleChange("returnDate", e.target.value || "");
                }}
                onBlur={handleBlur}
                min={minDate}
              />
              {errors?.returnDate && touched.returnDate && (
                <LabelError errorMessage={errors.returnDate} color="red" />
              )}
            </div>
          )}
        </div>
      </form>
      <div className="mt-4 flex items-center justify-end w-full">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
