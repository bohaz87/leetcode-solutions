export default function combinatorics<K>(arr: K[], m: number): K[][] {
  const n = arr.length;
  if (m === 1) {
    return arr.map((v) => [v]);
  } else {
    const ret: K[][] = [];
    for (let i = 0; i < n; i++) {
      const copy = arr.slice(i + 1);
      combinatorics(copy, m - 1).forEach((o) => ret.push([arr[i], ...o]));
    }
    return ret;
  }
}
