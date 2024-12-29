import React from "react";
import { CommonStyledComponentProps } from "./types";

export const Loader: React.FC<CommonStyledComponentProps> = ({
  className,
  style,
}) => {
  return (
    <svg className={className || ""} style={style} viewBox="-10 -10 20 20">
      <circle
        className="stroke-current stoke-2 opacity-5 fill-none"
        cx={0}
        cy={0}
        r={8}
      />
      <circle
        className="animate-spin stroke-current stroke-2 fill-none"
        strokeDasharray="16 40"
        cx={0}
        cy={0}
        r={8}
      />
    </svg>
  );
};
