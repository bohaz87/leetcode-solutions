function countZero(row: number[]) {
  let count = 0;
  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i] === 0) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

function minSwaps(grid: number[][]): number {
  const counts = [];
  for (let i = 0; i < grid.length; i++) {
    counts.push(countZero(grid[i]));
  }
  const sorted = [...counts];
  sorted.sort();
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] < i) {
      return -1;
    }
  }

  let steps = 0;
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] < counts.length - i - 1) {
      steps += counts.length - i - 1 - counts[i];
    }
  }

  return steps;
}

console.log(
  minSwaps([
    [0, 0, 1],
    [1, 1, 0],
    [1, 0, 0],
  ])
);

console.log(
  minSwaps([
    [0, 0, 1],
    [1, 0, 0],
    [1, 0, 0],
  ])
);

console.log(
  minSwaps([
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ])
);

console.log(
  minSwaps([
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ])
);

console.log(
  minSwaps([
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 1],
  ])
);
