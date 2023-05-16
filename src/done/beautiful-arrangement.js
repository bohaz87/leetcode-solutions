/**
 * @param {number} n
 * @return {number}
 */
const countArrangement = function (n) {
  if (n <= 3) {
    return n;
  }

  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(f(i, n));
  }

  const combined = combine(...arr);
  return combined.length;
};

/**
 *
 * @param  {...String[]} args
 * @returns {String[]}
 */
function combine(...args) {
  if (args.length === 1) {
    return args[0];
  } else if (args.length === 2) {
    const result = [];
    for (let a of args[0]) {
      for (let b of args[1]) {
        if (a !== b) {
          result.push(a + b);
        }
      }
    }
    return result;
  } else {
    const [first, ...rest] = args;
    const next = combine(...rest);
    const result = [];
    for (let a of first) {
      for (let b of next) {
        if (b.indexOf(a) === -1) {
          result.push(a + b);
        }
      }
    }
    return result;
  }
}

const map = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

function f(x, n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    if (x % i === 0 || i % x === 0) {
      arr.push(map[i]);
    }
  }
  return arr;
}

countArrangement(4);
