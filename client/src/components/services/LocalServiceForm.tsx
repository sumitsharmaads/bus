import { Input, Option, Radio, Select } from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { getTodayDateTime } from "../../utils";

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
  const minDate = useMemo(() => getTodayDateTime(), []);
  const [formValue, setFormValue] = useState<{
    city: string;
    purpose: string;
    travelDate: string;
  }>({
    city: "",
    purpose: "",
    travelDate: minDate,
  });

  const handleChange = useCallback(
    (key: "city" | "purpose" | "travelDate", value: string) => {
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
        </div>
      </form>
    </div>
  );
};
