export default class MinHeap<T> {
  #data: T[];
  #compareFn: (a: T, b: T) => number;
  constructor(compareFn: (a: T, b: T) => number, initHeapData: T[] = []) {
    this.#compareFn = compareFn;
    this.#data = [];
    initHeapData.forEach((d) => this.insert(d));
  }

  get size(): number {
    return this.#data.length;
  }

  getMin(): T | null {
    if (this.#data.length === 0) {
      return null;
    }
    return this.#data[0];
  }

  insert(value: T): void {
    this.#data.push(value);
    const heap = this.#data;
    const length = heap.length;
    if (length > 1) {
      let current = length - 1;
      let parent = Math.ceil(current / 2) - 1;
      while (
        parent >= 0 &&
        this.#compareFn(heap[parent] as T, heap[current] as T) > 0
      ) {
        [heap[parent], heap[current]] = [heap[current], heap[parent]];
        current = parent;
        parent = Math.ceil(current / 2) - 1;
      }
    }
    console.log(this.#data);
  }

  remove(): T | null {
    if (this.#data.length === 0) {
      return null;
    }

    const smallest = this.#data[0];
    if (this.#data.length > 2) {
      const heap = this.#data;
      heap[0] = heap.pop() as T;
      const length = heap.length;
      let current = 0;
      let leftIndex = current * 2 + 1;
      let rightIndex = current * 2 + 2;

      while (
        current < length &&
        ((leftIndex < length &&
          this.#compareFn(heap[current], heap[leftIndex]) > 0) ||
          (rightIndex < length &&
            this.#compareFn(heap[current], heap[rightIndex]) > 0))
      ) {
        const swapWithLeft =
          rightIndex >= length ||
          this.#compareFn(heap[leftIndex], heap[rightIndex]) < 0;
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
      this.#data.shift();
    }

    return smallest;
  }
}
