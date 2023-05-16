/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const rowAndMaximumOnes = function (mat) {
  let ret = [0, 0];
  for (const [index, arr] of mat.entries()) {
    let count = 0;
    for (const item of arr) {
      if (item === 1) {
        count++;
      }
    }
    if (count > ret[1]) {
      ret = [index, count];
    }
  }
  return ret;
};

rowAndMaximumOnes([
  [0, 1],
  [1, 0],
]);
