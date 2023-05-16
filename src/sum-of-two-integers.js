const getSum = function (a, b) {
  function addOne(n) {
    return Math.ceil([n, ".1"].join(""));
  }

  function minusOne(n) {
    const s = n.toString(2);
    if (/1$/.test(s)) {
      return parseInt(s.replace(/1$/, "0"), 2);
    } else {
      return parseInt(
        s.replace(/1(0+)$/, (match) => "0".padEnd(match.length, "0")),
        2
      );
    }
  }

  let start = 0;
  let sum = a;

  while (start < b) {
    sum = addOne(sum);
    start = addOne(start);
  }

  return sum;
};

console.log(getSum(1, 2));
console.log(getSum(1000, -1000));
console.log(getSum(-1000, 1000));
