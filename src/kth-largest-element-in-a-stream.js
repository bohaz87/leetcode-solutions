import MinHeap from "./done/utils/minHeap";

class KthLargest {
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k, nums) {
    this.heap = new MinHeap((a, b) => a - b, []);
    this.k = k;
    for (const val of nums) {
      this.#insert(val);
    }
  }

  #insert(val) {
    if (this.heap.size < this.k) {
      this.heap.insert(val);
    } else {
      const min = this.heap.getMin();
      if (min < val) {
        this.heap.remove();
        this.heap.insert(val);
      }
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val) {
    this.#insert(val);
    console.log(this.heap.getMin());
    return this.heap.getMin();
  }
}

function test(a, b) {
  const obj = new KthLargest(...b[0]);
  for (let i = 1; i < b.length; i++) {
    obj[a[i]](...b[i]);
  }
}
test(
  ["KthLargest", "add", "add", "add", "add", "add"],
  [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
);
