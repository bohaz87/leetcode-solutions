/**
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * @link https://leetcode.cn/problems/permutations-ii/description/
 * @param nums
 */
function permuteUnique(nums: number[]): number[][] {
  const len = nums.length;
  if (len === 0) {
    return [];
  } else if (len === 1) {
    return [[...nums]];
  } else if (len === 2) {
    if (nums[0] === nums[1]) return [nums];
    else return [[...nums], [nums[1], nums[0]]];
  }
  const memo = new Set();
  const result = [];
  for (let i = 0; i < len; i++) {
    if (memo.has(nums[i])) {
      continue;
    }
    memo.add(nums[i]);
    const clone = [...nums];
    clone.splice(i, 1);
    const subPermute = permuteUnique(clone);
    result.push(...subPermute.map((sub) => [nums[i], ...sub]));
  }
  return result;
}

export {};

/**
 * [[1,1,2],
 * [1,2,1],
 * [2,1,1]]
 */
console.log(permuteUnique([1, 1, 2, 2]));
// console.log(permuteUnique([1, 2, 3]));
