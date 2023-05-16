/**
 *
 * @param {Number[][]} matrix
 */
const calculateMinimumHP = function (matrix) {
  let xlen = matrix.length;
  let ylen = matrix[0].length;

  let arr = matrix;
  if (ylen > xlen) {
    arr = Array(ylen);
    for (let i = 0; i < ylen; i++) {
      arr[i] = Array(xlen);
      for (let j = 0; j < xlen; j++) {
        arr[i][j] = matrix[j][i];
      }
    }
    xlen = ylen;
    ylen = arr[0].length;
  }

  for (let size = xlen + ylen - 2; size >= 0; size--) {
    for (
      let x = Math.min(xlen - 1, size);
      x >= 0 && size - x < ylen && size - x >= 0;
      x--
    ) {
      const y = size - x;
      let current = arr[x][y];
      const bottom = x + 1 >= xlen ? NaN : arr[x + 1][y];
      const right = y + 1 >= ylen ? NaN : arr[x][y + 1];

      if (x + 1 === xlen && y + 1 === ylen) {
        // nothing
      } else if (x + 1 === xlen) {
        current += right;
      } else if (y + 1 === ylen) {
        current += bottom;
      } else {
        current = Math.max(current + bottom, current + right);
      }
      arr[x][y] = Math.min(current, 0);
    }
  }
  return arr[0][0] > 0 ? 1 : 1 - arr[0][0];
};
