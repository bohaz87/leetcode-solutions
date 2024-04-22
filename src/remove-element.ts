/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number} new array length
 */
const removeElement = function (nums: number[], val: number): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  console.log(nums);
  return k;
};

console.log(removeElement([1, 1, 2], 2));
