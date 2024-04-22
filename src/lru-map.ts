import assert from "assert/strict";

class LRUCache<T> {
  public readonly capacity: number;
  private cache: Map<string | number, T>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  put(key: string | number, value: T) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else {
      this.cache.set(key, value);

      if (this.cache.size > this.capacity) {
        // remove the first element in cache
        for (const entry of this.cache) {
          this.cache.delete(entry[0]);
          break;
        }
      }
    }
  }

  get(key: string | number) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key) as T;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
}

let cache = new LRUCache(0);
cache.put(1, 1);
assert.equal(cache.get(1), -1);

cache = new LRUCache(1);
cache.put(1, 1);
assert.equal(cache.get(1), 1);
cache.put(2, 2);
assert.equal(cache.get(1), -1);
assert.equal(cache.get(2), 2);
assert.equal(cache.get(2), 2);
cache.put(2, 2.1);
assert.equal(cache.get(2), 2.1);
assert.equal(cache.get(2), 2.1);

cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
assert.equal(cache.get(1), 1);
assert.equal(cache.get(2), 2);
assert.equal(cache.get(1), 1);
assert.equal(cache.get(2), 2);
cache.put(2, 2.1);
cache.put(1, 1.1);
assert.equal(cache.get(1), 1.1);
assert.equal(cache.get(2), 2.1);
assert.equal(cache.get(1), 1.1);
assert.equal(cache.get(2), 2.1);
cache.put(3, 3);
assert.equal(cache.get(1), -1);
assert.equal(cache.get(2), 2.1);
assert.equal(cache.get(3), 3);
