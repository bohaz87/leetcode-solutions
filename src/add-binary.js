/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
  const bigger = a.length > b.length ? a : b;
  const smaller = bigger === a ? b : a;

  const ret = [];
  let next = 0;

  for (let i = smaller.length - 1, j = bigger.length - 1; j >= 0; i--, j--) {
    const x = i >= 0 ? smaller[i] : 0;
    const y = bigger[j];
    // x + y + next
    let sum = (0 ^ x) + (0 ^ y) + next;

    // if sum >= 2
    if (sum >> 1) {
      // sum %= 2
      sum ^= 2;
      next = 1;
    } else {
      next = 0;
    }

    ret.push(sum);
  }

  if (next) {
    ret.push(1);
  }

  return ret.reverse().join("");
};

console.log(addBinary("0", "0"));
console.log(addBinary("11", "1"));
console.log(addBinary("1010", "1011"));
