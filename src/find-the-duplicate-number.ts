/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums: number[]) {
  const len = nums.length;

  const flagLen = 30;
  const flags = Array(Math.ceil(len / flagLen)).fill(0);

  for (let i = 0; i < len; i++) {
    const flagIndex = Math.floor(nums[i] / flagLen);
    const flag = flags[flagIndex];
    const movement = (nums[i] % flagLen) - 1;
    if ((flag >> movement) & 1) {
      return nums[i];
    } else {
      flags[flagIndex] = flag | (1 << movement);
    }
  }
};

console.log(findDuplicate([1, 3, 4, 2, 2]), 2);
console.log(findDuplicate([3, 1, 3, 4, 2]), 3);
console.log(findDuplicate([2, 2, 2, 2, 2]), 2);
console.log(
  findDuplicate([
    13, 46, 8, 11, 20, 17, 40, 13, 13, 13, 14, 1, 13, 36, 48, 41, 13, 13, 13,
    13, 45, 13, 28, 42, 13, 10, 15, 22, 13, 13, 13, 13, 23, 9, 6, 13, 47, 49,
    16, 13, 13, 39, 35, 13, 32, 29, 13, 25, 30, 13,
  ]),
  13
);
