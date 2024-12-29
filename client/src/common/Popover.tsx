import { forwardRef, useEffect, useMemo, useRef } from "react";

interface PopoverProps {
  position: "left" | "right";
  direction: "up" | "down";
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wrapperClassName?: string;
}

const popoverPosition = {
  right: "left-full ml-2",
  left: "right-full mr-2",
};

const directionStyle = {
  up: "-translate-y-full mb-2",
  down: "translate-y-full mt-2",
};

const Popover = forwardRef<HTMLElement | null, PopoverProps>(
  (
    {
      position = "left",
      direction = "up",
      title,
      children,
      onClose,
      wrapperClassName,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLElement | null>(null);

    const combindedPosition = useMemo(
      () => `${popoverPosition[position]} ${directionStyle[direction]}`,
      [position, direction]
    );

    useEffect(() => {
      const handleClickOutSide = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node) &&
          (!ref ||
            !(ref as React.RefObject<HTMLElement>)?.current?.contains(
              event.target as Node
            ))
        ) {
          onClose();
        }

        document.addEventListener("mousedown", handleClickOutSide);
        return () =>
          document.removeEventListener("mousedown", handleClickOutSide);
      };
    }, [onClose, ref]);

    return (
      <div
        className={`absolute z-10 min-w-64 w-96 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 ${combindedPosition} ${
          wrapperClassName || ""
        }`}
        ref={(r) => {
          modalRef.current = r;
        }}
      >
        <div className="px-3 py-2 primary uppercase text-lg p-4 font-bold border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <div className="px-3 py-2 break-words overflow-auto">{children}</div>
      </div>
    );
  }
);

Popover.displayName = "Popover";
export { Popover };
