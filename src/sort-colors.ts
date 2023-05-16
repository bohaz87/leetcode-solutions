/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
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

function sortColors2(nums: number[]): void {
  let a = 0;
  let b = 0;

  nums.forEach((n, i) => {
    if (n === 0) {
      nums[i] = 2;
      nums[a + b] = 1;
      nums[a] = 0;
      a++;
    } else if (n === 1) {
      nums[i] = 2;
      nums[a + b] = 1;
      b++;
    }
  });
}

// let a = [2, 0, 2, 1, 1, 0];
// sortColors2(a);
// console.log(a);

// a = [2, 0, 1];
// sortColors2(a);
// console.log(a);
