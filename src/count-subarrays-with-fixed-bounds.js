/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
const countSubarrays = function (nums, minK, maxK) {
  let count = 0;
  let start = 0;
  let min;
  let max;

  for (const [index, value] of nums.entries()) {
    if (value > maxK || value < minK || index + 1 === nums.length) {
      // for start to index -1, this sub array matches
      if (min === minK && max === maxK) {
        const n = (index + 1 === nums.length ? index + 1 : index) - start;
        console.log(n);
        if (n >= 0) {
          // at least two numbers
          count += (n * (n - 1)) / 2;
        }
      }
      start = index + 1;
    } else {
      // if (min === value) {
      //   min = value;
      // }
      min = Math.min(value, minK);
      max = Math.max(value, maxK);
    }
  }
  return count;
};

console.log(countSubarrays([1, 3, 5, 2, 7, 5], 1, 5));
// console.log(countSubarrays([1, 1, 1, 1], 1, 1));
