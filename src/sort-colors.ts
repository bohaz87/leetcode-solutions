/**
 Do not return anything, modify nums in-place instead.
 */
export function sortColors(nums: number[]): void {
  const countArr = [0, 0, 0];
  nums.forEach((n) => countArr[n]++);
  let i = 0;
  for (let c = 0; c < 3; c++) {
    for (let j = 0, len = countArr[c]; j < len; j++) {
      nums[i] = c;
      i++;
    }
  }
}

// let a = [2, 0, 2, 1, 1, 0];
// sortColors2(a);
// console.log(a);

// a = [2, 0, 1];
// sortColors2(a);
// console.log(a);
