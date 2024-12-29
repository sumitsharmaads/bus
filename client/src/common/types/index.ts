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
