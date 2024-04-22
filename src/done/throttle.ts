function throttle<T extends unknown[]>(fn: (...args: T) => void, time: number) {
  let tid: NodeJS.Timeout | null;

  return (...args: T) => {
    if (tid) return;
    fn(...args);
    tid = setTimeout(() => {
      tid = null;
    }, time);
  };
}

const fn = function () {
  return 1;
};
const f = throttle(fn, 10);
f();

export {};
