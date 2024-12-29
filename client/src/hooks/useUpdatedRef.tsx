import { useEffect, useRef } from "react";

export function useUpdatedRef<T>(data: T) {
  const ref = useRef<T>(data);
  useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref;
}
