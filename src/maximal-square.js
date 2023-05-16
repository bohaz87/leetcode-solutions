/**
 * @param {string[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) {
  // --------> x
  // |
  // |
  // |
  // y
  let max = 0;
  for (let x = 0; x < matrix[0].length; x++) {
    if (matrix[0].length - x <= max) {
      break;
    }

    for (let y = 0; y < matrix.length; y++) {
      if (matrix.length - y <= max) {
        break;
      }
      if (matrix[y][x] === "1") {
        let size = 1;
        let allMatch = true;

        while (matrix[y + size] && matrix[y + size][x + size]) {
          for (let yi = y; yi < y + size; yi++) {
            if (matrix[yi][x + size] === "0") {
              allMatch = false;
              break;
            }
          }
          if (!allMatch) {
            break;
          }

          for (let xi = x; xi < x + size; xi++) {
            if (matrix[y + size][xi] === "0") {
              allMatch = false;
              break;
            }
          }
          if (!allMatch) {
            break;
          }

          if (matrix[y + size][x + size] === "0") {
            break;
          }
          size++;
        }
        max = Math.max(max, size);
      }
    }
  }
  return max * max;
};

console.log(
  maximalSquare([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ])
);

console.log(
  maximalSquare([
    ["0", "1"],
    ["1", "0"],
  ])
);

console.log(maximalSquare([["0"]]));
