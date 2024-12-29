import React, { useMemo } from "react";
import { CommonStyledComponentProps } from "./types";
import { classNameOrEmptyString } from "../utils";

type IconProps = {
  type?: "outlined" | "round" | "sharp";
  /**
   * {@link https://fonts.google.com/icons}
   */
  name: string;
  fill?: boolean;
} & CommonStyledComponentProps;

export const Icon: React.FC<IconProps> = ({
  className,
  fill,
  style,
  type = "outlined",
  name,
}) => {
  const iconType = useMemo(() => {
    return `material-symbols-${type}`;
  }, [type]);

  return (
    <span
      className={`material-symbols ${
        fill ? "material-symbols-filled" : ""
      } ${iconType} ${classNameOrEmptyString(className)}`}
      style={style}
    >
      {name}
    </span>
  );
};
