import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface ReactDatePickerProps {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  label?: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  className?: string;
  format?: string; // Example: "DD/MM/YYYY"
}

export const ReactDatePicker: React.FC<ReactDatePickerProps> = ({
  value = null,
  onChange,
  label = "Select Date",
  disabled = false,
  minDate,
  maxDate,
  className,
  format = "DD/MM/YYYY",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={onChange}
        label={label}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            className,
          },
        }}
      />
    </LocalizationProvider>
  );
};
