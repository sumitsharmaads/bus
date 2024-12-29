import { useCallback, useEffect, useState } from "react";
import { useUpdatedRef } from "./useUpdatedRef";

export const useClickAway = (
  handleClick: (e: MouseEvent, node: HTMLElement) => unknown
) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const handleClickRef = useUpdatedRef(handleClick);
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (!node) return;
      const { left, right, top, bottom } = node.getBoundingClientRect();
      const doc = (node && node.ownerDocument) || document;
      const clickInsideHorizontalItemBound = event.x > left && event.x < right;
      const clickInsideVerticalItemBound = event.y > top && event.y < right;

      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target as Node) &&
        !node.contains(event.target as Node) &&
        !(clickInsideHorizontalItemBound && clickInsideVerticalItemBound)
      ) {
        handleClickRef.current(event, node);
      }
    },
    [handleClickRef, node]
  );
  useEffect(() => {
    if (node) {
      document.addEventListener("click", handleDocumentClick);
      return () => document.removeEventListener("click", handleDocumentClick);
    }
  }, [handleDocumentClick, node]);
  return { registerRef: setNode };
};
