export default class FixedQueue<T> {
  store = new Set<T>();
  currentLen = 0;
  nextIndex = 0;

  maxLen: number;
  cache: T[];

  constructor(len: number) {
    this.cache = new Array(len);
    this.maxLen = len;
  }

  add(val: T) {
    if (this.currentLen === this.maxLen) {
      this.store.delete(this.cache[this.nextIndex]);
    }
    this.store.add(val);
    this.cache[this.nextIndex] = val;
    this.currentLen = Math.min(this.currentLen + 1, this.maxLen);
    this.nextIndex++;
    if (this.nextIndex === this.maxLen) {
      this.nextIndex = 0;
    }
  }

  get currentIndex() {
    return this.nextIndex > 0 ? this.nextIndex - 1 : this.maxLen - 1;
  }

  has(val: T) {
    return this.store.has(val);
  }

  first(): undefined | T {
    if (this.currentLen === 0) return undefined;
    if (this.currentLen < this.maxLen) return this.cache[0];
    return this.cache[this.nextIndex];
  }
}
