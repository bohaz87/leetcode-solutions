const search = function (nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.ceil((end + start) / 2);
    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};

console.log(search([0, 1], 0));
console.log(search([0, 1], 1));
console.log(search([0, 1], 3));
console.log(search([-1, 0, 3, 5, 9, 12], 9));
console.log(search([-1, 0, 3, 5, 9, 12], -1));
console.log(search([-1, 0, 3, 5, 9, 12], 12));
console.log(search([-1, 0, 3, 9, 12], -1));
console.log(search([-1, 0, 3, 9, 12], 12));
console.log(search([-1, 0, 3, 9, 12], 3));
