/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number} the index of the element
 */
export default function binarySearch(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    const mid = Math.ceil((end + start) / 2);
    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  // start === end now
  if (target === nums[start]) {
    return start;
  } else {
    return -1;
  }
}
