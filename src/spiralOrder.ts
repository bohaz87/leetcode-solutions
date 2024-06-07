function* getIndex(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): Generator<[number, number], void, void> {
  let x = minX;
  let y = minY;

  yield [x, y];
  while (++y <= maxY) {
    yield [x, y];
  }
  y--;

  /**
   * odd rows
   * [
   *  [1, 2, 3]
   *  [4, 5, 6]
   *  [6, 8, 9]
   * ]
   */
  if (minX === maxX) {
    return;
  }

  while (++x <= maxX) {
    yield [x, y];
  }
  x--;

  /**
   * only one column
   * [
   *  [1],
   *  [2],
   *  [3]
   * ]
   */
  if (minY === maxY) {
    return;
  }

  while (--y >= minY) {
    yield [x, y];
  }
  y++;

  while (--x > minX) {
    yield [x, y];
  }

  if (minY + 1 === maxY) return;
  if (minX + 1 <= maxX - 1)
    yield* getIndex(minX + 1, minY + 1, maxX - 1, maxY - 1);
}

function spiralOrder(matrix: number[][]): number[] {
  const xLen = matrix.length;
  if (xLen === 0) return [];
  const yLen = matrix[0].length;

  const ret = [];
  const gen = getIndex(0, 0, xLen - 1, yLen - 1);
  for (const [x, y] of gen) {
    ret.push(matrix[x][y]);
  }
  return ret;
}

// [1,2,3,4,8,12,11,10,9,5,6,7]
// console.log(
//   spiralOrder([
//     [1, 2, 3, 4],
//     [10, 11, 12, 5],
//     [9, 8, 7, 6],
//   ])
// );
// console.log(spiralOrder([[1, 2, 3]]));
// console.log(spiralOrder([[7], [9], [6]]));
console.log(
  spiralOrder([
    [2, 5],
    [8, 4],
    [0, -1],
  ])
);
