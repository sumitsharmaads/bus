import { Typography } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
export type color = "inherit" | "current" | "black" | "white" | colors;
export const LabelError = ({
  errorMessage,
  color = "black",
}: {
  errorMessage: string;
  color?: color;
}) => {
  return (
    <Typography
      color={color}
      className="mt-2 flex items-center gap-2 text-xs font-normal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clip-rule="evenodd"
        ></path>
      </svg>
      {errorMessage}
    </Typography>
  );
};
