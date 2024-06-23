/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = function (mat) {
  const f = getXY(mat[0].length, mat.length);
  const arr = [];
  let p = f.next();
  while (!p.done) {
    let [x, y] = p.value;
    arr.push(mat[y][x]);
    p = f.next();
  }
  return arr;
};

function* getXY(xlen, ylen) {
  let dir = "⬈";
  yield [0, 0];
  let x,
    y = (x = 0);

  while (x < xlen - 1 || y < ylen - 1) {
    switch (dir) {
      case "⬈":
        if (x === xlen - 1) {
          y++;
          dir = "⬋";
        } else if (y === 0) {
          x++;
          dir = "⬋";
        } else {
          x++;
          y--;
        }
        break;
      case "⬋":
        if (y === ylen - 1) {
          x++;
          dir = "⬈";
        } else if (x === 0) {
          y++;
          dir = "⬈";
        } else {
          x--;
          y++;
        }
        break;
      default:
        throw "bad dir";
    }
    yield [x, y];
  }
}

// findDiagonalOrder([
//   [1, 2]
// ]);

// findDiagonalOrder([
//   [1, 2, 6],
//   [3, 5, 7],
//   [4, 8, 9],
// ]);

// findDiagonalOrder([
//   [1, 2],
//   [3, 4]
// ])

// findDiagonalOrder([
//   [1, 2, 6, 7],
//   [3, 5, 8, 13],
//   [4, 9, 12, 14],
//   [10, 11, 15, 16]
// ]);

/**
 *
 * @param {number[][]} mat
 * @returns {number[]}
 */
const findDiagonalOrder2 = function (mat) {
  const xlen = mat.length;
  const ylen = mat[0].length;

  if (xlen === 1) {
    return mat[0];
  }

  if (ylen === 1) {
    return mat.map((item) => item[0]);
  }

  const size = xlen * ylen;
  const arr = Array(size);

  console.time("map ");
  for (let x = 0; x < xlen; x++) {
    for (let y = 0; y < ylen; y++) {
      const sum = x + y;
      arr[x * y + (sum & 1 ? sum - x : sum - y)] = mat[x][y];
    }
  }
  console.timeEnd("map ");

  console.profile();
  console.time("sort");
  console.timeEnd("sort");
  console.profileEnd();

  return arr;
};

console.log(
  findDiagonalOrder2([
    [1, 2, 6],
    [3, 5, 7],
    [4, 8, 9],
  ])
);

// findDiagonalOrder2([
//   [1, 2],
//   [3, 4]
// ])

findDiagonalOrder2([
  [1, 2, 6, 7],
  [3, 5, 8, 13],
  [4, 9, 12, 14],
  [10, 11, 15, 16],
]);

const arr = [];
let v = 0;
for (let i = 0; i < 10000; i++) {
  arr[i] = [];
  for (let j = 0; j < 1000; j++) {
    arr[i].push(v++);
  }
}
console.time();
findDiagonalOrder(arr);
console.timeEnd();
