import { Button, Input, Option, Radio, Select } from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import { getTodayDateTime, inputDateTimeRegex, nameRegex } from "../../utils";
import { LocalServiceType } from "../../types/forms";
import { LabelError } from "../../common";
import { useRentalServiceContext } from "../../contexts/RentealServiceContext";

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

export const LocalServiceForm: React.FC = () => {
  const { onChange, changeStep, state } = useRentalServiceContext();
  const minDate = useMemo(() => getTodayDateTime(), []);
  const [formValue, setFormValue] = useState<LocalServiceType>(
    (state[1] as LocalServiceType) || {
      source: "",
      purpose: "",
      travelDate: minDate,
    }
  );

  const [errors, setErrors] = useState<LocalServiceType>();
  const [touched, setTouched] = useState<
    Record<keyof LocalServiceType, boolean>
  >({
    source: false,
    purpose: false,
    travelDate: false,
  });

  const handleChange = useCallback(
    (key: keyof LocalServiceType, value: string) => {
      setFormValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback((key: keyof LocalServiceType) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const validateState = useMemo(() => {
    let sourceError = "";
    let purposeError = "";
    let travelDateError = "";
    if (!nameRegex.test(formValue.source || "")) {
      sourceError = "Please select source city.";
    }
    if (!nameRegex.test(formValue.purpose || "")) {
      purposeError = "Please select trip purpose.";
    }
    if (!inputDateTimeRegex.test(formValue.travelDate)) {
      travelDateError = "Please select a valid date and time";
    }
    setErrors({
      source: sourceError,
      purpose: purposeError,
      travelDate: travelDateError,
    });
    return !sourceError && !purposeError && !travelDateError;
  }, [formValue]);

  const handleNext = () => {
    setTouched({
      source: true,
      purpose: true,
      travelDate: true,
    });
    if (validateState) {
      onChange(1, formValue);
      changeStep(2);
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              color={"blue"}
              label="From City"
              value={formValue.source}
              onChange={(value) => handleChange("source", value || "")}
              onBlur={() => handleBlur("source")}
            >
              {LocalCityOptions.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
            {errors?.source && touched.source && (
              <LabelError errorMessage={errors.source} color="red" />
            )}
          </div>
          <div>
            <Select
              color={"blue"}
              label="Purpose"
              value={formValue.purpose}
              onChange={(value) => handleChange("purpose", value || "")}
              onBlur={() => handleBlur("purpose")}
            >
              {purposeOptions.map((purpuse) => (
                <Option key={purpuse} value={purpuse}>
                  {purpuse}
                </Option>
              ))}
            </Select>
            {errors?.purpose && touched.purpose && (
              <LabelError errorMessage={errors.purpose} color="red" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-4">
            <Input
              type="datetime-local"
              color="blue"
              label="Travel Date"
              crossOrigin="anonymous"
              value={formValue.travelDate || ""}
              onChange={(e) => {
                handleChange("travelDate", e.target.value || "");
              }}
              min={minDate}
              onBlur={() => handleBlur("travelDate")}
            />
            {errors?.travelDate && touched.travelDate && (
              <LabelError errorMessage={errors.travelDate} color="red" />
            )}
          </div>
        </div>
      </form>
      <div className="mt-4 flex items-center justify-end w-full">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
