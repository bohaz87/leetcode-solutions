export function debounce(fn, delay, immediate) {
  let tid = null;
  return function (...args) {
    if (tid) {
      clearTimeout(tid);
    }

    if (immediate) {
      fn.apply(this, args);
      tid = setTimeout(() => {
        tid = null;
      }, delay);
    } else {
      tid = setTimeout(() => {
        fn.apply(this, args);
        tid = null;
      }, delay);
    }
  };
}
