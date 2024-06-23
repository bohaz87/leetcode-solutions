const getSum = function (a, b) {
  function addOne(n) {
    return Math.ceil([n, ".1"].join(""));
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
