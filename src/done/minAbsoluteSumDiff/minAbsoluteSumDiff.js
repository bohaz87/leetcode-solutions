/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minAbsoluteSumDiff = function (A, B) {
  const len = A.length;
  const diff = Array(len);
  for (let i = 0; i < len; i++) {
    diff[i] = Math.abs(A[i] - B[i]);
  }
  const sum = diff.reduce((sum, val) => sum + val, 0);
  // console.log("sum is %d", sum);

  if (sum === 0) {
    return 0;
  }

  const maxDiff = Math.max(...diff);
  // console.log("max diff is", maxDiff);

  const sortedA = [...new Set(A)].sort((a, b) => a - b);
  const aMin = sortedA[0];
  const aMax = sortedA[sortedA.length - 1];

  let maxImprovement = 0;
  for (let i = 0; i < len; i++) {
    const b = B[i];

    if (diff[i] < maxImprovement) {
      continue;
    }

    if (
      Math.abs(aMin - b) < maxImprovement &&
      Math.abs(aMax - b) < maxImprovement
    ) {
      continue;
    }

    const nearestNuma = findNearest(sortedA, b);
    // console.log("nearestNuma", nearestNuma, 'near', b);
    const newDiff = Math.abs(nearestNuma - b);
    const improvement = diff[i] - newDiff;

    if (improvement === maxDiff) {
      // console.log("found max, done", maxDiff);
      return (sum - maxDiff) % (10 ** 9 + 7);
    }

    if (maxImprovement < improvement) {
      maxImprovement = improvement;
      // console.log("maxCanReduce changed to %s", maxImprovement);
    }
  }
  // console.log("maxImprovement", maxImprovement);
  return (sum - maxImprovement) % (10 ** 9 + 7);
};

function findNearest(arr, b) {
  const len = arr.length;
  if (b <= arr[0] || arr.length === 1) {
    return arr[0];
  }

  if (b >= arr[len - 1]) {
    return arr[len - 1];
  }

  const halfLen = parseInt(len / 2);
  if (Math.abs(arr[halfLen] - b) > Math.abs(arr[halfLen - 1] - b)) {
    return findNearest(arr.slice(0, halfLen), b);
  } else {
    return findNearest(arr.slice(halfLen), b);
  }
}

// let a = [1, 10, 4, 4, 2, 7].sort((a, b) => a - b);
// console.log(findNearest(a, 9));

export default minAbsoluteSumDiff;
