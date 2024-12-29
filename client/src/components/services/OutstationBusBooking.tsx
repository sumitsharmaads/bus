import { Input, Option, Radio, Select } from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { getTodayDateTime } from "../../utils";
import { GoogleMapProvider } from "../../contexts/GoogleMapProvider";
import { AutoCompletePlaces } from "../../common/AutoCompletePlaces";

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
  const minDate = useMemo(() => getTodayDateTime(), []);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [formValue, setFormValue] = useState<{
    city: string;
    purpose: string;
    travelDate: string;
    returnDate: string;
  }>({
    city: "",
    purpose: "",
    travelDate: minDate,
    returnDate: "",
  });

  const handleChange = useCallback(
    (key: "city" | "purpose" | "travelDate" | "returnDate", value: string) => {
      setFormValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <form className="space-y-4">
        <div className="mt-2">
          <Radio
            name="one-way"
            label="One way"
            crossOrigin={""}
            checked={tripType === "one-way"}
            onClick={(e) => {
              setTripType("one-way");
              setFormValue((prev) => ({ ...prev, returnDate: "" }));
            }}
          />
          <Radio
            name="round-trip"
            label="Round Trip"
            crossOrigin={""}
            checked={tripType === "round-trip"}
            onClick={(e) => setTripType("round-trip")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              label="From City"
              value={formValue.city}
              onChange={(value) => handleChange("city", value || "")}
            >
              {LocalCityOptions.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              label="Purpose"
              value={formValue.purpose}
              onChange={(value) => handleChange("purpose", value || "")}
            >
              {purposeOptions.map((purpuse) => (
                <Option key={purpuse} value={purpuse}>
                  {purpuse}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <AutoCompletePlaces />
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
            />
          </div>
          {tripType === "round-trip" && (
            <div className="mt-4">
              <Input
                type="date"
                color="blue"
                label="Return Date"
                crossOrigin="anonymous"
                value={formValue.returnDate || ""}
                onChange={(e) => {
                  handleChange("returnDate", e.target.value || "");
                }}
                min={minDate}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
