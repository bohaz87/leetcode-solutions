/**
 * @param {string[]} nums
 * @param {string} target
 * @return {number}
 */
const numOfPairs = function (nums, target) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (!target.includes(nums[i])) {
      continue;
    }

    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      if (nums[i] + nums[j] === target) {
        console.log([i, j]);
        count++;
      }
    }
  }
  return count;
};

// numOfPairs(["777", "7", "77", "77"], "7777");
// numOfPairs(["123", "4", "12", "34"], "1234");
numOfPairs(["1", "1", "1"], "11");
