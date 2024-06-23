function threeSum(nums: number[], sum = 0): number[][] {
  nums = nums.sort((a, b) => a - b);

  const ret: [number, number, number][] = [];
  const len = nums.length;
  let lastA: number | null = null;
  for (let i = 0; i < len; i++) {
    const a: number = nums[i];
    if (a === lastA) continue;
    if (3 * a > sum) break;

    lastA = a;
    let lastB = null;

    for (let start = i + 1, end = len - 1; start < end; start++) {
      const b: number = nums[start];
      if (b === lastB) continue;
      if (a + 2 * b > sum) break;

      lastB = b;
      const c: number = sum - a - b;
      while (end > start && nums[end] >= c) {
        if (nums[end] === c) {
          ret.push([a, b, c]);
          end--;
          break;
        }
        end--;
      }
    }
  }

  return ret;
}

export { threeSum };
