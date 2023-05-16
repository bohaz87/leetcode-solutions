/**
 * @param {string} s
 * @return {number[]}
 */
const partitionLabels = function (s) {
  const arr = {};

  for (let i = 0, len = s.length; i < len; i++) {
    const ch = s[i];
    const o = (arr[ch] = arr[ch] || { start: i, end: i });
    o.end = i;
  }
  const parts = [];
  for (const { start, end } of Object.values(arr)) {
    if (parts.length === 0) {
      parts.push({ start, end });
    } else {
      const lp = parts[parts.length - 1];
      const { end: le } = lp;
      if (le < start) {
        parts.push({ start, end });
      } else if (le < end) {
        lp.end = Math.max(le, end);
      }
    }
  }
  return parts.map(({ start, end }) => end - start + 1);
};

console.log(partitionLabels("ababcbacadefegdehijhklij"));
console.log(partitionLabels("eccbbbbdec"));
console.log(partitionLabels("abcd"));
console.log(partitionLabels("eaaaabaaec"));
console.log(partitionLabels("abcbdc"));
