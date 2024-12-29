type ThrottleFun<T extends (...args: any[]) => void> = (
  func: T,
  wait: number
) => (...args: Parameters<T>) => void;

export const throttle: ThrottleFun<(...args: any[]) => void> = (func, wait) => {
  let timeOut: NodeJS.Timeout | null = null;
  let lastExec = 0;

  return function (this: unknown, ...args: any[]) {
    const now = Date.now();
    const remaining = wait - (now - lastExec);

    if (remaining <= 0) {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
      lastExec = now;
      func.apply(this, args);
    } else if (!timeOut) {
      timeOut = setTimeout(() => {
        lastExec = Date.now();
        timeOut = null;
        func.apply(this, args);
      }, remaining);
    }
  };
};
