/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
export const hasAllCodes = function (s, k) {
  const count = Math.pow(2, k);
  const set = new Set();
  for (let i = 0; i <= s.length - k; i++) {
    set.add(s.substring(i, k));
    if (set.size === count) return true;
  }
  return false;
};
