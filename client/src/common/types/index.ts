import { colors } from "@material-tailwind/react/types/generic";

export type PopupPosition = {
  position: "left" | "right";
  direction: "up" | "down";
};

export type PersistStorageType = {
  popupPosition: PopupPosition;
  position: {
    x: number;
    y: number;
  };
};

export type CommonStyledComponentProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type color = "inherit" | "current" | "black" | "white" | colors;
