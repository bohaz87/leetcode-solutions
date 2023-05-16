/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  } else if (nums.length <= 3) {
    return Math.max(...nums);
  }

  /**
   * @param {number} start
   * @param {number} end
   */
  function _rob(start, end) {
    if (start > end) {
      return 0;
    } else if (start === end) {
      return nums[start];
    }

    const mid = Math.floor((start + end) / 2);

    // [...... a, b, c ......]
    return Math.max(
      nums[mid] + _rob(start, mid - 2) + _rob(mid + 2, end),
      _rob(start, mid - 1) + _rob(mid + 1, end)
    );
  }

  return Math.max(_rob(0, nums.length - 2), _rob(1, nums.length - 1));
};

// console.log(rob([2, 3, 2]), 3);
// console.log(rob([1, 2, 3, 1]), 4);
// console.log(rob([]), 0);
console.log(rob3([1]), 1);
