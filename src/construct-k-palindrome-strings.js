/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const canConstruct = function (s, k) {
  if (s.length < k) {
    return false;
  }

  const countMap = {};
  for (const ch of s) {
    countMap[ch] = countMap[ch] || 0;
    countMap[ch]++;
  }

  let a = 0;
  let b = 0;

  for (const ch in countMap) {
    const c = countMap[ch];
    if (c % 2 === 0) {
      a += c / 2;
    } else {
      b++;
      a += (c - 1) / 2;
    }
  }

  return b <= k && (k - b) / 2 <= a;
};

console.log(canConstruct("annabelle", 2), true);
console.log(canConstruct("leetcode", 3), false);
console.log(canConstruct("true", 4), true);
console.log(canConstruct("yzyzyzyzyzyzyzy", 2), true);
console.log(canConstruct("cr", 7), false);
console.log(canConstruct("aaa", 2), true);
console.log(canConstruct("qlkzenwmmnpkopu", 15), true);
