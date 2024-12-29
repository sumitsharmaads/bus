import { useMemo } from "react";
import { Loader } from "./Loader";

interface ButtonProps {
  size?: "big" | "small" | "normal";
  flat?: boolean;
  iconButton?: boolean;
  variant?: "primary" | "text" | "secondary" | "custom";
  loading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<
  ButtonProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({
  loading,
  disabled,
  flat,
  variant = "text",
  iconButton,
  size = "normal",
  onClick,
  className,
  children, // Now the correct prop name
}) => {
  const baseStyle = useMemo(() => {
    const shadow =
      disabled || loading
        ? "shadow-gray-dark/70 shadow"
        : "shadow-gray-dark/70 shadow hover: shadow-md hover: shadow-gray-dark/70 focus:shadow-gray-dark/70 focus:shadow-md";
    return {
      text:
        disabled || loading
          ? "rounded text-gray-dark"
          : "rounded-text-primary bg-transparent hover:bg-primary/5",
      secondary: `rounded ${
        disabled || loading
          ? "text-gray-dark bg-gray-lighter"
          : "text-primary bg-light"
      } ${shadow}`,
      primary: `rounded ${
        disabled || loading
          ? "text-gray-dark bg-drak-light"
          : "text-light bg-primary hover:bg-primary-dark focus:bg-primary-dark"
      } ${flat ? "" : shadow}`,
      custom: "",
    }[variant];
  }, [variant, loading, disabled]);

  const buttomSize = useMemo(() => {
    return {
      big: iconButton ? "h-11 w-11 rounded-full" : "leading-4 py-3 px-[15px]",
      normal: iconButton ? "h-8 w-8 rounded-full" : "leading-4 py-2 px-[15px]",
      small: iconButton ? "h-5 w-5 rounded-full" : "leading-4 py-1 px-[15px]",
    }[size];
  }, [size]);

  return (
    <button
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
      }}
      className={`relative text-sm overflow-hidden transition-all duration-200 ease-in-out uppercase font-poppins inline-flex items-center justify-center ${buttomSize} ${baseStyle} ${className}`}
    >
      {(!loading || !iconButton) && children}
      {loading && <Loader className={`h-4 w-4 ${!iconButton ? "ml-2" : ""}`} />}
    </button>
  );
};
