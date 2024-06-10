import assert from "assert/strict";
/**
 * https://wiki.amoscloud.com/zh/ProgramingPractice/NowCoder/Adecco/Topic0004
 */
function getPaths(n: number): number {
  const memo = new Map<number, number>();

  function _getDepth(n: number): number {
    if (memo.has(n)) return memo.get(n) as number;
    if (n <= 0) return 0;
    if (n < 3) return 1;
    if (n === 3) return 2;

    const count = _getDepth(n - 1) + _getDepth(n - 3);
    memo.set(n, count);
    return count;
  }

  return _getDepth(n);
}

assert.equal(getPaths(50), 122106097);

export {};
