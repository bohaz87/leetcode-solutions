/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
  let k = 0;
  let n = NaN;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== n) {
      nums[k] = nums[i];
      k++;
      n = nums[i];
    }
  }
  console.log(k, nums);
  return k;
};

removeDuplicates([1, 1, 2]);
removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
