/**
 * https://leetcode.cn/problems/cuyjEf/
 */
class Solution {
  /**
   * @param {number[]} weights
   */
  constructor(weights) {
    const totalWeights = weights.reduce((sum, value) => sum + value, 0);

    let sum = 0;
    this.items = [];
    /**
     * 0------------------------------------------------>totalSum
     * 0---item0----|---item1----|...|---item x----|...
     */
    for (const value of weights) {
      sum += value / totalWeights;
      this.items.push(sum);
    }
  }

  /**
   * @returns {number}
   */
  pickIndex() {
    /**
     * 0------------------------------------------------>totalSum
     * 0---item0----|---item1----|...|---item x----|...
     * 0-----------------random---------------------
     */
    const n = Math.random();
    for (let i = 0; i < this.items.length; i++) {
      if (n > this.items[i]) continue;
      return i;
    }
  }
}
