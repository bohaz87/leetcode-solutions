class MinHeap {
  constructor(compareFn, initHeapData = []) {
    this.compareFn = compareFn;
    this.heap = [];
    initHeapData.forEach((d) => this.insert(d));
  }

  getMin() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  insert(node) {
    this.heap.push(node);
    const heap = this.heap;
    const length = heap.length;
    if (length > 1) {
      let current = length - 1;
      let parent = Math.ceil(current / 2) - 1;
      while (parent >= 0 && this.compareFn(heap[parent], heap[current]) > 0) {
        [heap[parent], heap[current]] = [heap[current], heap[parent]];
        current = parent;
        parent = Math.ceil(current / 2) - 1;
      }
    }
  }

  remove() {
    if (this.heap.length === 0) {
      return null;
    }

    const smallest = this.heap[0];
    if (this.heap.length > 2) {
      const heap = this.heap;
      heap[0] = heap.pop();
      const length = heap.length;
      let current = 0;
      let leftIndex = current * 2 + 1;
      let rightIndex = current * 2 + 2;

      while (
        current < length &&
        ((leftIndex < length &&
          this.compareFn(heap[current], heap[leftIndex]) > 0) ||
          (rightIndex < length &&
            this.compareFn(heap[current], heap[rightIndex]) > 0))
      ) {
        const swapWithLeft =
          rightIndex >= length ||
          this.compareFn(heap[leftIndex], heap[rightIndex]) < 0;
        if (swapWithLeft) {
          [heap[current], heap[leftIndex]] = [heap[leftIndex], heap[current]];
          current = leftIndex;
          leftIndex = leftIndex * 2 + 1;
          rightIndex = leftIndex + 1;
        } else {
          [heap[current], heap[rightIndex]] = [heap[rightIndex], heap[current]];
          current = rightIndex;
          leftIndex = rightIndex * 2 + 1;
          rightIndex = leftIndex + 1;
        }
      }
    } else {
      this.heap.shift();
    }

    return smallest;
  }
}

function maxEvents(events) {
  // sort by start date
  events.sort((a, b) => {
    return a[0] - b[0];
  });
  console.log(events);

  let count = 0;
  const currentEvents = new MinHeap((a, b) => a[1] - b[1]);
  let eventIndex = 0;
  let today = events[0][0];
  console.log("today", today);
  while (eventIndex < events.length || currentEvents.getMin()) {
    let i = eventIndex;
    for (; i < events.length; i++) {
      if (events[i][0] === today) {
        currentEvents.insert(events[i]);
      } else {
        break;
      }
    }
    eventIndex = i;

    if (currentEvents.getMin()) {
      // attend the first event
      if (currentEvents.getMin()[1] >= today) {
        currentEvents.remove();
        count++;
      }

      // remove other events if their endDate === today
      while (currentEvents.getMin() && currentEvents.getMin()[1] <= today) {
        currentEvents.remove();
      }
    }

    today++;
  }

  return count;
}

// console.log(
//   maxEvents([
//     [1, 2],
//     [2, 3],
//     [3, 4],
//   ]),
//   3
// );

// console.log(
//   maxEvents([
//     [1, 1],
//     [1, 1],
//     [1, 5],
//     [1, 5],
//     [1, 5],
//     [2, 3],
//     [2, 3],
//   ]),
//   5
// );

// console.log(
//   maxEvents([
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [1, 2],
//   ]),
//   4
// );
