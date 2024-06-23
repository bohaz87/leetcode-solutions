export function uniqueOccurrences(arr) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      map[arr[i]]++;
    } else {
      map[arr[i]] = 1;
    }
  }
  const values = Object.values(map);
  const unique = new Set(values);
  return unique.size === values.length;
}
