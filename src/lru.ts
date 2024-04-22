import assert from "assert/strict";

type LRUKey = string | number;

interface LRUNodeBase<T> {
  key: null | LRUKey;
  value: null | T;
  pre?: null | LRUNodeBase<T>;
  next?: null | LRUNodeBase<T>;
}

interface LRUNode<T> extends LRUNodeBase<T> {
  key: LRUKey;
  value: T;
  pre: LRUNode<T> | HEAD<T>;
  next: LRUNode<T> | TAIL<T>;
}

interface HEAD<T> extends LRUNodeBase<T> {
  key: null;
  value: null;
  pre: null;
  next: LRUNode<T> | TAIL<T>;
}

interface TAIL<T> extends LRUNodeBase<T> {
  key: null;
  value: null;
  pre: LRUNode<T> | HEAD<T>;
  next: null;
}

class LRUCache<T> {
  public readonly capacity: number;
  private head: HEAD<T>;
  private tail: TAIL<T>;
  private cache: Map<LRUKey, LRUNode<T>>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = {
      key: null,
      value: null,
      pre: null,
      next: null as unknown as TAIL<T>,
    };
    this.tail = { key: null, value: null, pre: this.head, next: null };
    this.head.next = this.tail;
    this.cache = new Map();
  }

  put(key: LRUKey, value: T) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key) as LRUNode<T>;
      node.value = value;
      this.moveNodeToHead(node);
    } else {
      const pre = this.head;
      const next = this.head.next;
      const node: LRUNode<T> = { key, value, next, pre };
      pre.next = node;
      next.pre = node;
      this.cache.set(key, node);
    }

    if (this.cache.size > this.capacity) {
      const node = this.tail.pre as LRUNode<T>;
      const pre = node.pre;
      const next = node.next;

      // remove reference
      node.pre = null as unknown as LRUNode<T>;
      node.next = null as unknown as LRUNode<T>;
      this.cache.delete(node.key);

      pre.next = next;
      next.pre = pre;
    }
  }

  get(key: LRUKey) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const node = this.cache.get(key) as LRUNode<T>;
    this.moveNodeToHead(node);
    return node.value;
  }

  private moveNodeToHead(node: LRUNode<T>) {
    if (node === this.head.next) {
      return;
    }
    // remove node from it's old position
    const pre = node.pre;
    const next = node.next;
    pre.next = next;
    next.pre = pre;

    // insert node after this.head
    const [first, second, third] = [this.head, node, this.head.next];
    first.next = second;
    second.pre = first;
    second.next = third;
    third.pre = second;
  }

  toString() {
    const values = [];
    let node = this.head.next;
    while (node !== this.tail) {
      values.push(node.value);
      node = node.next as LRUNode<T>;
    }
    return values;
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
