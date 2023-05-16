/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = function (n) {
  let sum = n;
  while (true) {
    if (sum < 10) {
      return sum === 1 || sum === 7;
    }
    sum = sum
      .toString()
      .split("")
      .reduce((s, x) => s + x ** 2, 0);
  }
};
