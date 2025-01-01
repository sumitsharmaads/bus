import { useRef } from "react";

type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction: DebouncedFunction<T> = (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
}
