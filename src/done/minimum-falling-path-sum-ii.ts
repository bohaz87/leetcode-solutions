function sumMin(a: number[], b: number[]) {
  let min1 = Number.MAX_VALUE;
  let min2 = min1;
  let min1index = -1;
  let min2index = -1;

  for (let i = 0, len = b.length; i < len; i++) {
    const newVal: number = a[i !== a[0] ? 1 : 3] + b[i];

    if (min2 <= newVal) {
      continue;
    } else if (min1 > newVal) {
      min2 = min1;
      min2index = min1index;
      min1 = newVal;
      min1index = i;
    } else if (min2 > newVal) {
      min2 = newVal;
      min2index = i;
    }
  }

  a[0] = min1index;
  a[1] = min1;
  a[2] = min2index;
  a[3] = min2;
}

function minFallingPathSum2(matrix: number[][]): number {
  const len = matrix.length;
  const o = [-1, 0, -1, 0];
  for (let row = len - 1; row >= 0; row--) {
    sumMin(o, matrix[row]);
  }

  return o[1];
}

console.log(
  minFallingPathSum2([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
  13
);

console.log(
  minFallingPathSum2([
    [1, 2],
    [2, 1],
  ]),
  2
);

console.log(
  minFallingPathSum2([
    [1, 2],
    [1, 2],
  ]),
  3
);

console.log(
  minFallingPathSum2([
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
  ]),
  4
);

console.log(
  minFallingPathSum2([
    [1, 2, -3],
    [1, 1, -99],
    [1, 1, 1],
  ]),
  4
);

console.log(
  minFallingPathSum2([
    [50, -18, -38, 39, -20, -37, -61, 72, 22, 79],
    [82, 26, 30, -96, -1, 28, 87, 94, 34, -89],
    [55, -50, 20, 76, -50, 59, -58, 85, 83, -83],
    [39, 65, -68, 89, -62, -53, 74, 2, -70, -90],
    [1, 57, -70, 83, -91, -32, -13, 49, -11, 58],
    [-55, 83, 60, -12, -90, -37, -36, -27, -19, -6],
    [76, -53, 78, 90, 70, 62, -81, -94, -32, -57],
    [-32, -85, 81, 25, 80, 90, -24, 10, 27, -55],
    [39, 54, 39, 34, -45, 17, -2, -61, -81, 85],
    [-77, 65, 76, 92, 21, 68, 78, -13, 39, 22],
  ]),
  -807
);

console.log(minFallingPathSum2([[7]]), 7);
import fs from "fs";
const data = JSON.parse(
  fs.readFileSync("./src/data.json", {
    encoding: "utf-8",
  })
);
console.log(minFallingPathSum2(data), 200);

console.log(
  minFallingPathSum2([
    [1, 99, 99],
    [0, 2, 1],
    [99, 99, 4],
  ]),
  7
);
