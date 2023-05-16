function minFallingPathSum(matrix: number[][]): number {
  if (matrix.length === 1) {
    return Math.min(...matrix[0]);
  }

  const colLen = matrix[0].length;
  for (let row = matrix.length - 2; row >= 0; row--) {
    matrix[row] = matrix[row].map((element, col) => {
      const nextRow = matrix[row + 1];
      const nextArr = [nextRow[col]];
      if (col > 0) {
        nextArr.push(nextRow[col - 1]);
      }
      if (col < colLen - 1) {
        nextArr.push(nextRow[col + 1]);
      }
      return element + Math.min(...nextArr);
    });
  }

  return Math.min(...matrix[0]);
}

console.log(
  minFallingPathSum([
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9],
  ]),
  13
);

console.log(
  minFallingPathSum([
    [-19, 57],
    [-40, -5],
  ]),
  -59
);

console.log(minFallingPathSum([[-48]]), -48);
console.log(
  minFallingPathSum([
    [17, 82],
    [1, -44],
  ]),
  -27
);
