function sum(arr: number[], N: number): number {
  const newArr = [...new Set(arr)];
  if (N + N > newArr.length) {
    return -1;
  }

  newArr.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += newArr[i] + newArr[newArr.length - i - 1];
  }

  return sum;
}

export {};
