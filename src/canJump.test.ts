const canJump = function (nums: number[]): boolean {
  let k = 0;
  for (const [i, v] of nums.entries()) {
    if (i > k) return false;
    k = Math.max(k, i + nums[i]);
  }
  return true;
};

describe("canJump", () => {
  it("work", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
  });

  it("performance", () => {
    const arr: number[] = new Array(100000);
    for (let i = 0; i < 100000; i++) {
      arr[i] = Math.floor(Math.random() * 100000);
    }
    canJump(arr);
    canJump(arr);
    canJump(arr);
    canJump(arr);
    canJump(arr);
  });
});
