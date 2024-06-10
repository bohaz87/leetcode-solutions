import FixedQueue from "./utils/fixedQueue";

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  if (k === 0) return false;
  const visited = new FixedQueue(k);

  for (let i = 0, len = nums.length; i < len; i++) {
    if (visited.has(nums[i])) return true;
    visited.add(nums[i]);
  }
  return false;
}

describe("containsNearbyDuplicate", () => {
  it("should work", () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toBe(false);
    expect(containsNearbyDuplicate([1, 2, 1], 0)).toBe(false);
  });
});
