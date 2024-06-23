import MinHeap from "./done/utils/minHeap";

export class KthLargest {
  heap: MinHeap<number>;
  k: number;

  constructor(k: number, nums: number[]) {
    this.heap = new MinHeap((a: number, b: number) => a - b, []);
    this.k = k;
    for (const val of nums) {
      this.#insert(val);
    }
  }

  #insert(val: number) {
    if (this.heap.size < this.k) {
      this.heap.insert(val);
    } else {
      const min = this.heap.getMin()!;
      if (min < val) {
        this.heap.remove();
        this.heap.insert(val);
      }
    }
  }

  add(val: number) {
    this.#insert(val);
    console.log(this.heap.getMin());
    return this.heap.getMin();
  }
}
