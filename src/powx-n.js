/* eslint-disable no-case-declarations */
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  switch (n) {
    case 0:
      return 1;
    case 1:
      return x;
    default:
      const a = myPow(x, Math.floor(n / 2));
      const b = myPow(x, n % 2);
      const ret = a * a * b;
      return ret;
  }
};

console.log(myPow(2, 10));
console.log(myPow(2.1, 3));
console.log(myPow(2, -2));
console.log(myPow(0.1, 1000));
console.log(myPow(-1, 10000));
