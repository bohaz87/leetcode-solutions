type Index = [number, number];
type Path = Index[];
/**
 * https://oj.algomooc.com/problem.php?id=3707
 */
function bestPath(matrix: number[][]) {
  let monIndex: Index | undefined, babyIndex: Index | undefined;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === -3) {
        monIndex = [i, j];
      } else if (matrix[i][j] === -2) {
        babyIndex = [i, j];
      }
    }
  }
  if (!monIndex || !babyIndex) {
    throw "bad input";
  }

  function fastPath(
    currentIndex: Index,
    targetIndex: Index,
    visitedPath: Path
  ): Path[] {
    visitedPath.push(currentIndex);
    if (
      currentIndex[0] === targetIndex[0] &&
      currentIndex[1] === targetIndex[1]
    ) {
      return [visitedPath];
    }

    const nextIndexes: Index[] = (
      [
        [currentIndex[0] + 1, currentIndex[1]],
        [currentIndex[0] - 1, currentIndex[1]],
        [currentIndex[0], currentIndex[1] + 1],
        [currentIndex[0], currentIndex[1] - 1],
      ] as Index[]
    ).filter(
      (index) =>
        index[0] >= 0 &&
        index[0] < matrix.length &&
        index[1] >= 0 &&
        index[1] < matrix[0].length &&
        matrix[index[0]][index[1]] !== -1 &&
        !visitedPath.some(([x, y]) => x === index[0] && y === index[1])
    );
    // bad path
    if (nextIndexes.length === 0) {
      return [];
    }

    const targetNext = nextIndexes.find(
      ([x, y]) => x === targetIndex[0] && y === targetIndex[1]
    );

    // fast first
    if (targetNext) {
      return fastPath(targetNext, targetIndex, visitedPath);
    }

    const possiblePaths: Path[] = [];
    for (let i = 0; i < nextIndexes.length; i++) {
      const path = fastPath(nextIndexes[i], targetIndex, [...visitedPath]);
      if (path && path.length) {
        possiblePaths.push(...path);
      }
    }

    return possiblePaths;
  }
  const paths = fastPath(monIndex, babyIndex, []);
  const minLen = Math.min(...paths.map((p) => p.length));
  const candies = paths
    .filter((p) => p.length === minLen)
    .map((path) =>
      path.reduce((sum, [x, y]) => {
        if (matrix[x][y] > 0) {
          sum += matrix[x][y];
        }
        return sum;
      }, 0)
    );
  return Math.max(...candies);
}

import assert from "assert/strict";
assert.equal(
  bestPath([
    [3, 2, 1, -3],
    [1, -1, 1, 1],
    [1, 1, -1, 2],
    [-2, 1, 2, 3],
  ]),
  9
);

export {};
