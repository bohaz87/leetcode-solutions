class RandomizedSet {
  map: Map<number, number>;
  cache: number[];

  constructor() {
    this.map = new Map<number, number>();
    this.cache = [];
  }

  insert(val: number): boolean {
    if (this.map.has(val)) return false;

    this.cache.push(val);
    this.map.set(val, this.cache.length - 1);
    return true;
  }

  remove(val: number): boolean {
    if (this.map.has(val)) {
      const id = this.map.get(val) as number;
      if (id !== this.cache.length - 1) {
        const last = this.cache.pop() as number;
        this.cache[id] = last;
        this.map.set(last, id);
      } else {
        this.cache.pop();
      }
      this.map.delete(val);
      return true;
    }
    return false;
  }

  getRandom(): number {
    return this.cache[Math.floor(Math.random() * this.cache.length)];
  }
}

export {};

import leetcode from "./utils/leetcode";
leetcode.test(
  [
    RandomizedSet,
    "insert",
    "remove",
    "insert",
    "remove",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
    "getRandom",
  ],
  [[], [0], [0], [-1], [0], [], [], [], [], [], [], [], [], [], []],

  [null, true, true, true, false, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
);

leetcode.test(
  [
    RandomizedSet,
    "insert",
    "insert",
    "remove",
    "insert",
    "remove",
    "getRandom",
  ],
  [[], [0], [1], [0], [2], [1], []],
  [null, true, true, true, true, true, 2]
);
