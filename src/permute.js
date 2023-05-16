/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  const len = nums.length;
  if (len === 0) {
    return [];
  } else if (len === 1) {
    return [[...nums]];
  } else if (len === 2) {
    return [[...nums], [nums[1], nums[0]]];
  }

  const result = [];
  for (let i = 0; i < len; i++) {
    const clone = [...nums];
    clone.splice(i, 1);
    const subPermute = permute(clone);
    result.push(...subPermute.map((sub) => [nums[i], ...sub]));
  }
  return result;
};

console.log(permute([]));
console.log(permute([1]));
console.log(permute([1, 2]));
console.log(permute([1, 2, 3]));
