function maximalRectangle(matrix: string[][]): number {
  function join(row1: string[], row2: string[]): string[] {
    const ret: string[] = [];
    for (let i = 0; i < row1.length; i++) {
      if (row1[i] === "1" && row2[i] === "1") {
        ret[i] = "1";
      } else {
        ret[i] = "0";
      }
    }
    return ret;
  }

  function count(row: string[]) {
    let max = 0;
    let c = 0;
    for (const s of row) {
      if (s === "1") {
        c++;
        max = Math.max(max, c);
      } else {
        c = 0;
      }
    }
    return max;
  }

  let max = 0;

  for (let i = 0; i < matrix.length; i++) {
    let joined = matrix[i];
    const c = count(joined);
    max = Math.max(max, c);

    for (let j = i + 1; j < matrix.length; j++) {
      joined = join(joined, matrix[j]);
      const newc = count(joined);
      if (newc * (matrix.length - i) < max) {
        break;
      } else {
        max = Math.max(max, newc * (j - i + 1));
      }
    }
  }

  return max;
}
console.log(maximalRectangle([["1"]]));

// console.log(
//   maximalRectangle([
//     ["0", "0", "0"],
//     ["0", "0", "0"],
//     ["1", "1", "1"],
//   ])
// );

// console.log(
//   maximalRectangle([
//     ["1", "1", "1", "1", "1", "1", "1", "1"],
//     ["1", "1", "1", "1", "1", "1", "1", "0"],
//     ["1", "1", "1", "1", "1", "1", "1", "0"],
//     ["1", "1", "1", "1", "1", "0", "0", "0"],
//     ["0", "1", "1", "1", "1", "0", "0", "0"],
//   ])
// );

// console.log(
//   maximalRectangle([
//     ["1", "0", "1", "1", "0", "1"],
//     ["1", "1", "1", "1", "1", "1"],
//     ["0", "1", "1", "0", "1", "1"],
//     ["1", "1", "1", "0", "1", "0"],
//     ["0", "1", "1", "1", "1", "1"],
//     ["1", "1", "0", "1", "1", "1"],
//   ])
// );

// console.log(
//   maximalRectangle([
//     ["1", "0", "1", "0", "0"],
//     ["1", "0", "1", "1", "1"],
//     ["1", "1", "1", "1", "1"],
//     ["1", "0", "0", "1", "0"],
//   ])
// );

// console.log(
//   maximalRectangle([
//     ["1", "0", "1", "1", "1"],
//     ["1", "0", "1", "1", "1"],
//     ["1", "1", "1", "1", "1"],
//     ["1", "0", "0", "1", "0"],
//   ])
// );

// console.log(
//   maximalRectangle([
//     ["1", "0", "1", "1", "0"],
//     ["1", "0", "1", "1", "1"],
//     ["1", "1", "1", "1", "1"],
//     ["1", "0", "1", "1", "0"],
//   ])
// );
