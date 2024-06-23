/**
 * @typedef {{segAt: number, intensity: number}} IntensityBreak
 * @property {number} segAt number indicate the start of intensity break
 * @property {number} intensity the intensity amount
 */

export class IntensitySegments {
  private data: Map<number, number>;

  constructor() {
    this.data = new Map<number, number>();
  }

  /**
   * Add intensity for range [from, to)
   *
   * @param {number} from indicate the seg start, which is included
   * @param {number} to indicate the seg end, which is **NOT** included
   * @param {number} amount the amount of increment
   * @returns {void}
   */
  add(from: number, to: number, amount: number): void {
    if (from >= to || amount === 0) return;

    this.adjustIntensity(from, amount);
    this.adjustIntensity(to, -amount);
  }

  /**
   * Set intensity for range [from, to)
   *
   * @param {number} from indicate the seg start, which is included
   * @param {number} to indicate the seg end, which is **NOT** included
   * @param {number} amount the amount will set for range
   * @returns {void}
   */
  set(from: number, to: number, amount: number): void {
    if (from >= to) return;

    const [startIntensity, endIntensity] = this.getIntensitiesAt(from, to);
    this.add(from, to, -startIntensity);  // Reset current range to zero
    this.add(from, to, amount);  // Set desired intensity
  }

  /**
   * Adjust the intensity at a specific point and clean up zero intensities if necessary
   *
   * @param {number} point The point where intensity needs to be adjusted
   * @param {number} amount The amount to adjust
   */
  private adjustIntensity(point: number, amount: number): void {
    const newIntensity = (this.data.get(point) || 0) + amount;

    if (newIntensity === 0) {
      this.data.delete(point);
    } else {
      this.data.set(point, newIntensity);
    }
  }

  /**
   * Get the intensities at the start and end of a given range
   *
   * @param {number} from indicate the seg start, which is included
   * @param {number} to indicate the seg end, which is **NOT** included
   * @returns {[number, number]} the intensities at the start and end of the range
   */
  private getIntensitiesAt(from: number, to: number): [number, number] {
    const sortedKeys = Array.from(this.data.keys()).sort((a, b) => a - b);
    let startIntensity = 0;
    let endIntensity = 0;
    let currentIntensity = 0;

    for (const key of sortedKeys) {
      if (key >= to) {
        endIntensity = currentIntensity;
        break;
      }
      if (key >= from) {
        startIntensity = currentIntensity;
        break;
      }
      currentIntensity += this.data.get(key) || 0;
    }

    return [startIntensity, endIntensity];
  }

  /**
   * Get all IntensityBreaks in string
   *
   * @example
   * ```js
   * segments.add(10, 30, 1);
   * segments.toString() // [[10,1],[30,0]]
   * ```
   * @returns {string} the string result
   */
  toString(): string {
    const breaksStr = Array.from(this.data.entries())
      .map(([segAt, intensity]) => `[${segAt},${intensity}]`)
      .join(",");
    return `[${breaksStr}]`;
  }
}
