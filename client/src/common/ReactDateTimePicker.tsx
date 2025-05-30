import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface ReactDateTimePickerProps {
  value?: Date | string | null;
  onChange?: (value: Dayjs | null) => void;
  label?: string;
  className?: string;
  format?: string;
  disabled?: boolean;
  maxDateTime?: Date | string | null;
  minDateTime?: Date | string | null;
}

export const ReactDateTimePicker: React.FC<ReactDateTimePickerProps> = ({
  value = null,
  onChange,
  label = "Select Date & Time",
  className,
  format = "DD/MM/YYYY hh:mm A",
  disabled = false,
  minDateTime,
  maxDateTime,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value ? dayjs(value) : null}
        onChange={onChange}
        label={label}
        format={format}
        disabled={disabled}
        maxDateTime={maxDateTime ? dayjs(maxDateTime) : undefined}
        minDateTime={minDateTime ? dayjs(minDateTime) : undefined}
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
