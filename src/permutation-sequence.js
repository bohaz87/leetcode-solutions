/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getPermutation = function (n, k) {
  const arr = Array(n)
    .fill(0)
    .map((_val, i) => i + 1);

  const getCount = (function (max) {
    const r = [0, 1];
    for (let i = 2; i <= max; i++) {
      r.push(i * r[i - 1]);
    }
    return (n) => r[n];
  })(n);

  const ret = [];
  while (k >= 1) {
    if (k === 1) {
      ret.push(...arr);
      break;
    }

    const count = getCount(arr.length - 1);
    const index = Math.ceil(k / count) - 1;
    ret.push(arr[index]);

    k = k - index * count;
    arr.splice(index, 1);
  }

  return ret.join("");
};

console.log(getPermutation(9, 1));
console.log(getPermutation(3, 3));
console.log(getPermutation(4, 9));
console.log(getPermutation(3, 1));
