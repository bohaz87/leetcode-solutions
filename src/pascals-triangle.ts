function generate(numRows: number): number[][] {
  if (numRows === 1) return [[1]];
  if (numRows === 2) return [[1], [1, 1]];

  const ret: number[][] = [[1], [1, 1]];
  let last = ret[ret.length - 1];

  for (let i = 3; i <= numRows; i++) {
    last = last.reduce(
      (r, v, i, arr) => {
        if (i > 0) {
          r.push(v + arr[i - 1]);
        }
        return r;
      },
      [1] as number[]
    );

    last.push(1);
    ret.push(last);
  }

  return ret;
}

export default generate;
