import FixedQueue from "./fixedQueue";
describe("FixedQueue", () => {
  it("should work", () => {
    const queue = new FixedQueue(1);
    expect(queue.has(1)).toBe(false);
    queue.add(1);
    expect(queue.has(1)).toBe(true);
    queue.add(2);
    expect(queue.has(1)).toBe(false);
    expect(queue.has(2)).toBe(true);
  });
  it("should work 2", () => {
    const queue = new FixedQueue(3);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    expect(queue.has(1)).toBe(true);
    expect(queue.has(2)).toBe(true);
    expect(queue.has(3)).toBe(true);
    queue.add(4);
    expect(queue.has(1)).toBe(false);
    expect(queue.has(2)).toBe(true);
    expect(queue.has(3)).toBe(true);
    expect(queue.has(4)).toBe(true);
    queue.add(5);
    expect(queue.has(2)).toBe(false);
    expect(queue.has(3)).toBe(true);
    expect(queue.has(4)).toBe(true);
    expect(queue.has(5)).toBe(true);
  });

  it("first", () => {
    const queue = new FixedQueue(3);
    queue.add(1);
    expect(queue.first()).toBe(1);
    queue.add(2);
    expect(queue.first()).toBe(1);
    queue.add(3);
    expect(queue.first()).toBe(1);
    queue.add(4);
    expect(queue.first()).toBe(2);
    queue.add(5);
    expect(queue.first()).toBe(3);
  });
});
