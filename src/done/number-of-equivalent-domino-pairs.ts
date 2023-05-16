function numEquivDominoPairs(dominoes: number[][]): number {
  return dominoes
    .map((item) => {
      if (item[0] <= item[1]) {
        return item[0] * 10 + item[1];
      } else {
        return item[1] * 10 + item[0];
      }
    })
    .reduce((countArr, index) => {
      countArr[index] = countArr[index] ? countArr[index] + 1 : 1;
      return countArr;
    }, Array<number>(100))
    .reduce((sum, count) => {
      if (count > 1) {
        sum += (count * (count - 1)) / 2;
      }
      return sum;
    }, 0);
}

console.log(
  numEquivDominoPairs([
    [1, 2],
    [2, 1],
    [3, 4],
    [5, 6],
  ]),
  1
);
console.log(
  numEquivDominoPairs([
    [1, 2],
    [1, 2],
    [1, 1],
    [1, 2],
    [2, 2],
  ]),
  3
);
