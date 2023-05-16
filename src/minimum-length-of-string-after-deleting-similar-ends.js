/**
 * @param {string} s
 * @return {number}
 */
const minimumLength = function (s) {
  const arr = [...s];
  let start = 0;
  let end = s.length - 1;

  let removedCount = 0;

  while (arr[start] === arr[end] && start < end) {
    // remove arr[start], arr[end]
    removedCount += 2;

    // try remove arr[start + 1]
    while (start + 1 < end && arr[start + 1] === arr[start]) {
      removedCount++;
      start++;
    }

    // try remove arr[end + 1]
    while (start + 1 < end && arr[end - 1] === arr[end]) {
      removedCount++;
      end--;
    }

    // move to next round
    start++;
    end--;
  }

  return s.length - removedCount;
};

// console.log(minimumLength("ca"));
// console.log(minimumLength("cabaabac"));
// console.log(minimumLength("aabccabba"));
console.log(minimumLength('"abbbbbbbbbbbbbbbbbbba"'));
