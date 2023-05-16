const task = (function () {
  let task;
  if (
    typeof process !== "undefined" &&
    typeof process.nextTick === "function"
  ) {
    task = (fn: () => void) => process.nextTick(fn);
  } else if (typeof MutationObserver !== "undefined") {
    const targetNode = document.createElement("div");
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true,
    };
    const callbacks: (() => void)[] = [];
    const observer = new MutationObserver(() => {
      callbacks.forEach((cb) => cb());
      callbacks.length = 0;
    });
    observer.observe(targetNode, observerOptions);
    task = (fn: () => void) => {
      if (callbacks.length === 0) {
        targetNode.innerText = String(Math.random());
      }
      callbacks.push(fn);
    };
  } else {
    task = (fn: () => void) => setTimeout(fn, 0);
  }
  return task;
})();

export default task;
