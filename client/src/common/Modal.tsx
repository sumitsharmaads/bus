import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export type ModalProps = {
  open: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  title: string;
  children: React.ReactNode;
  handleClose?: () => void;
  handleConfirm?: () => void;
  showConfirm?: boolean;
  confirmBtnName?: string;
  wrapperClassName?: string;
  showCloseIcon?: boolean;
  disableFooter?: boolean;
} & (
  | { showConfirm: false | undefined; handleConfirm?: never }
  | { showConfirm: true; handleConfirm: () => void }
  | { showCloseIcon: false | undefined; handleClose?: () => void }
  | { showCloseIcon: true; handleClose: () => void }
  | {
      disableFooter: true;
      handleConfirm?: never;
      showConfirm?: boolean;
      confirmBtnName?: string;
    }
);

export const Modal: React.FC<ModalProps> = ({
  open,
  size = "xs",
  title,
  children,
  handleClose,
  handleConfirm,
  showConfirm,
  confirmBtnName,
  wrapperClassName,
  showCloseIcon,
  disableFooter = false,
}) => {
  const modalHandler = () => handleClose?.();
  return (
    <Dialog
      open={open}
      size={size}
      handler={modalHandler}
      className={wrapperClassName}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      {showCloseIcon ? (
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => handleClose?.()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
      ) : (
        <DialogHeader>{title}</DialogHeader>
      )}
      <DialogBody className="m-2 p-2 overflow-y-auto max-h-[90%] h-full">
        {children}
      </DialogBody>
      {!disableFooter && (
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleClose?.()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {showConfirm && (
            <Button
              variant="gradient"
              color="green"
              onClick={() => handleConfirm?.()}
            >
              <span>{confirmBtnName || "Confirm"}</span>
            </Button>
          )}
        </DialogFooter>
      )}
    </Dialog>
  );
};
