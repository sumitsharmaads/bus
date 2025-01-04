import {
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { classNameOrEmptyString, throttle } from "../../utils";
import { Button } from "../Button";
import { PersistStorageType, PopupPosition } from "../types";
import {
  drawerStorage,
  getSocialDrawerState,
  setSocialDrawerState,
} from "./PersistStorage";
import { useClickAway } from "../../hooks";
import { Link } from "react-router-dom";
import { Popover } from "../Popover";

export type SocialDrawerContextType = {
  detailedPopupPosition: PopupPosition;
  setDetailedPopupPosition: React.Dispatch<React.SetStateAction<PopupPosition>>;
  id: number | null;
  toggleId: (id: number | null) => void;
  buttonRef: RefObject<HTMLElement | null>;
  closeDrawer: () => void;
};
const SocialDrawerContext = createContext<SocialDrawerContextType | undefined>(
  undefined
);

const useSocialDrawerContext = (): SocialDrawerContextType => {
  const ctx = useContext(SocialDrawerContext);
  if (!ctx) throw new Error("cannot access Social drawer items outside scope");
  return ctx;
};

interface SocialDrawerProps {
  className?: string;
  wrapperClassName?: string;
  persistState?: boolean;
  children: React.ReactNode;
  querySelectorName?: string;
}

export interface SocialDrawerComponentProps
  extends React.FC<SocialDrawerProps> {
  Item: React.FC<SocialDrawerItemProps>;
}

export const SocialDrawer: SocialDrawerComponentProps = ({
  className,
  children,
  wrapperClassName,
  persistState = true,
  querySelectorName = "footer",
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);
  const isDraggingRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [id, setId] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    position: "left",
    direction: "up",
  });

  const { registerRef } = useClickAway(() => setOpen(false));

  useEffect(() => {
    const socialDrawerState = getSocialDrawerState();
    if (socialDrawerState && persistState) {
      if (socialDrawerState.popupPosition)
        setPopupPosition(socialDrawerState.popupPosition);

      if (socialDrawerState.position && buttonRef.current) {
        buttonRef.current.style.left = `${socialDrawerState.position.x}px`;
        buttonRef.current.style.top = `${socialDrawerState.position.y}px`;
        buttonRef.current.style.right = "auto";
        buttonRef.current.style.bottom = "auto";
      }
    }
  }, [persistState, getSocialDrawerState]);

  const toggleId = useCallback((numId: number | null) => {
    setId(numId);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDraggingRef.current && buttonRef.current) {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const buttonWidth = buttonRef.current.offsetWidth;
        const buttonHeight = buttonRef.current.offsetHeight;
        const footerContainer = document.querySelector(
          querySelectorName
        ) as HTMLElement | null;
        const constrainedX = Math.min(
          Math.max(0, newX),
          screenWidth - buttonWidth
        );
        const minYPosition = 44 * 2 + 10 + 20 * 2 + 40;
        if (
          !open &&
          newY > minYPosition &&
          newY <
            screenHeight -
              ((buttonHeight || 0) + (footerContainer?.offsetHeight || 60)) &&
          newX > 55
        ) {
          const constrainedY = Math.min(
            Math.max(0, newY),
            screenHeight - buttonHeight
          );
          console.log("button ref", constrainedX, constrainedY);
          buttonRef.current.style.left = `${constrainedX}px`;
          buttonRef.current.style.top = `${constrainedY}px`;
          buttonRef.current.style.right = "auto";
          buttonRef.current.style.bottom = "auto";
          let storageData: PersistStorageType = {
            popupPosition: {
              position: "left",
              direction: "up",
            },
            position: { x: constrainedX, y: constrainedY },
          };
          if (newX - screenWidth / 2 > 0) {
            setPopupPosition({ position: "left", direction: "up" });
          } else {
            setPopupPosition({ position: "right", direction: "up" });
            storageData = {
              ...storageData,
              popupPosition: {
                position: "right",
                direction: "up",
              },
            };
          }
          if (persistState) setSocialDrawerState(storageData);
          if (newX > 10 && newY > 10) setIsDragging(true);
        }
      }
    },
    [initialX, initialY, currentX, currentY, querySelectorName, open]
  );

  const throttledMousemove = useMemo(
    () => throttle(handleMouseMove, 16),
    [handleMouseMove]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", throttledMousemove);
    document.removeEventListener("mouseup", handleMouseUp);

    setTimeout(() => setIsDragging(false), 100);
  }, [throttledMousemove]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      isDraggingRef.current = true;
      setInitialX(event.clientX);
      setInitialY(event.clientY);
      setCurrentX(buttonRef.current?.offsetLeft ?? 0);
      setCurrentY(buttonRef.current?.offsetTop ?? 0);

      document.addEventListener("mousemove", throttledMousemove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [throttledMousemove, handleMouseUp]
  );

  const handleClick = useCallback(() => {
    if (!isDragging) {
      setOpen((prevState) => {
        setId(prevState ? id : null);
        return !prevState;
      });
    }
  }, []);
  return (
    <SocialDrawerContext.Provider
      value={{
        detailedPopupPosition: popupPosition,
        setDetailedPopupPosition: setPopupPosition,
        id,
        toggleId,
        buttonRef,
        closeDrawer: () => setOpen(false),
      }}
    >
      <div
        ref={(r) => {
          buttonRef.current = r;
          registerRef(r);
        }}
        role="group"
        onMouseDown={handleMouseDown}
        className={`fixed bottom-36 right-4 flex flex-col items-end space-y-2 z-10 ${
          open ? "" : "cursor-grab"
        } ${wrapperClassName}`}
        style={{ top: "initial", left: "", right: "" }}
      >
        <div className="relative">
          <Button
            onClick={handleClick}
            variant={"primary"}
            className={`flex justify-center items-center h-14 w-14 rounded-full text-light bg-primary hover:bg-primary-dark focus:bg-primary-dark hover:shadow-md transition-transform duration-300 ${
              open ? "transform rotate-180" : ""
            } ${className || ""}`}
          >
            {open ? (
              <XMarkIcon className="font-bold" />
            ) : (
              <PlusIcon className="font-bold" />
            )}
          </Button>
          {open && children && (
            <div
              className={`absolute left-1 mb-2 bottom-full flex flex-col gap-2 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </SocialDrawerContext.Provider>
  );
};

export interface SocialDrawerItemProps {
  iconJSX: React.ReactNode;
  modalType?: "popup";
  onClose?: () => void;
  children?:
    | ((props: { open: boolean; onClose: () => void }) => React.ReactNode)
    | React.ReactNode;
  title?: string;
  id: number;
  link?: {
    self?: boolean;
    appLink?: boolean;
    otherLink?: boolean;
    address: string;
  };
  className?: string;
  popupClassName?: string;
}

SocialDrawer.Item = function SocialDrawerItem({
  iconJSX,
  modalType,
  onClose,
  children,
  title,
  id,
  link,
  className,
  popupClassName,
}) {
  const ctx = useSocialDrawerContext();
  const [isItemOpen, setIsItemOpen] = useState(false);
  useEffect(() => {
    setIsItemOpen(ctx.id === id);
  }, [ctx.id, id]);

  const handleClick = useCallback(() => {
    if (ctx.id === id) setIsItemOpen((prev) => !prev);
    else {
      setIsItemOpen(true);
      ctx.toggleId(id);
    }
  }, [ctx, id]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setIsItemOpen(false);
    ctx.toggleId(null);
    ctx.closeDrawer();
  }, [onClose, ctx]);

  const renderActionBtn = useMemo(() => {
    if (link) {
      const { self, address, appLink, otherLink } = link;
      if (!appLink)
        return (
          <a
            href={address}
            rel={title || "link"}
            target={self ? "_self" : "_blank"}
            onClick={handleClose}
            className={`h-11 w-11 mr-2 bg-gray-400 hover:bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out ${classNameOrEmptyString(
              className
            )}`}
          >
            {iconJSX}
          </a>
        );
      return (
        <Link
          to={address}
          onClick={handleClose}
          className="h-11 w-11 mr-2 bg-gray-400 hover:bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out"
        >
          {iconJSX}
        </Link>
      );
    }
    return (
      <Button
        onClick={handleClick}
        variant={"custom"}
        className={`h-11 w-11 mr-2 bg-gray-400 hover:bg-gray-500 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out ${classNameOrEmptyString(
          className
        )}`}
      >
        {iconJSX}
      </Button>
    );
  }, [handleClick, link, id]);
  return (
    <div className="relative">
      {renderActionBtn}
      {modalType === "popup" && children && (
        <Popover
          title={title ?? ""}
          position={ctx.detailedPopupPosition.position ?? "left"}
          direction={ctx.detailedPopupPosition.direction ?? "up"}
          ref={ctx.buttonRef}
          onClose={handleClose}
          wrapperClassName={popupClassName}
        >
          {typeof children === "function"
            ? children?.({
                open: isItemOpen,
                onClose: () => {
                  if (onClose) onClose();
                  setIsItemOpen(false);
                  ctx.toggleId(null);
                },
              })
            : children}
        </Popover>
      )}
    </div>
  );
};
