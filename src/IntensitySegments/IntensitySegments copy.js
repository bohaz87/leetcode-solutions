/**
 * @typedef {{segAt: number, intensity: number}} IntensityBreak
 * @property {number} segAt number indicate the start of intensity break
 * @property {number} intensity the intensity amount
 */

/**
 * Program that manages “intensity” by segments.
 * Segments are intervals from -infinity to infinity,
 */
export class IntensitySegments {
  constructor() {
    /**
     * @private
     *
     * @type {IntensityBreak[]}
     */
    this.data = [];
  }

  /**
   * @private
   *
   * Find indexes of this.data
   *
   * `indexBeforeFrom` should be the last index where `segStart <= from`,
   * `indexAfterTo` should be the first index where `segStart >= to`
   *
   * @param {number} from
   * @param {number} to
   * @return {[indexBeforeFrom: number|null, indexAfterTo: number|null]} null means of seg break is beofer from or after to
   */
  findStartEnd(from, to) {
    let indexBeforeFrom = null;
    let indexAfterTo = null;

    for (let i = 0, len = this.data.length; i < len; i++) {
      const segBreak = this.data[i];
      if (segBreak.segAt <= from) {
        indexBeforeFrom = i;
      }
      if (indexAfterTo === null && segBreak.segAt >= to) {
        indexAfterTo = i;
        break;
      }
    }

    return [indexBeforeFrom, indexAfterTo];
  }
  /**
   * Add intensity for range [from, to)
   *
   * @param {number} from indicate the seg start, which is included
   * @param {number} to indecate the seg end, which is **NOT** included
   * @param {number} amount the amount of increment
   * @returns {void}
   */
  add(from, to, amount) {
    if (from >= to) {
      // throw 'bad arguments error'?
      return;
    }
    if (amount === 0) {
      // do nothing
      return;
    }
    let [indexBeforeFrom, indexAfterTo] = this.findStartEnd(from, to);
    // memo it here as index may change
    const intensityForTo =
      indexAfterTo === null ? 0 : this.data[indexAfterTo - 1]?.intensity || 0;

    if (indexBeforeFrom === null) {
      this.data.unshift({ segAt: from, intensity: amount });
      indexBeforeFrom = 0;
      // indexes increase as we add a new item
      indexAfterTo !== null && indexAfterTo++;
    } else if (this.data[indexBeforeFrom].segAt === from) {
      this.data[indexBeforeFrom].intensity += amount;
    } else {
      this.data.splice(indexBeforeFrom + 1, 0, {
        segAt: from,
        intensity: this.data[indexBeforeFrom].intensity + amount,
      });
      // indexes increase as we add a new item
      indexBeforeFrom++;
      indexAfterTo !== null && indexAfterTo++;
    }

    if (indexAfterTo === null) {
      this.data.push({ segAt: to, intensity: 0 });
      indexAfterTo = this.data.length - 1;
    } else if (this.data[indexAfterTo].segAt === to) {
      // ignore
    } else {
      this.data.splice(indexAfterTo, 0, {
        segAt: to,
        intensity: intensityForTo,
      });
    }

    // increase all breaks between (indexBeforeFrom, indexAfterTo) by amount
    for (let i = indexBeforeFrom + 1; i < indexAfterTo; i++) {
      this.data[i].intensity += amount;
    }

    this.makeClean();
  }

  /**
   * Set intensity for range [from, to)
   *
   * @param {number} from indicate the seg start, which is included
   * @param {number} to indecate the seg end, which is **NOT** included
   * @param {number} amount the amount will set for range
   * @returns {void}
   */
  set(from, to, amount) {
    if (from >= to) {
      // throw 'bad arguments error'?
      return;
    }
    let [indexBeforeFrom, indexAfterTo] = this.findStartEnd(from, to);
    // memo it here as index may change
    const intensityForTo =
      indexAfterTo === null ? 0 : this.data[indexAfterTo - 1]?.intensity || 0;

    if (indexBeforeFrom === null) {
      this.data.unshift({ segAt: from, intensity: amount });
      indexBeforeFrom = 0;
      // indexes increase as we add a new item
      indexAfterTo !== null && indexAfterTo++;
    } else if (this.data[indexBeforeFrom].segAt === from) {
      this.data[indexBeforeFrom].intensity = amount;
    } else {
      if (amount !== this.data[indexAfterTo - 1]?.intensity) {
        this.data.splice(indexBeforeFrom + 1, 0, {
          segAt: from,
          intensity: amount,
        });
        // indexes increase as we add a new item
        indexBeforeFrom++;
        indexAfterTo !== null && indexAfterTo++;
      }
    }

    if (indexAfterTo === null) {
      this.data.push({ segAt: to, intensity: 0 });
      indexAfterTo = this.data.length - 1;
    } else if (this.data[indexAfterTo].segAt === to) {
      // ignore
    } else {
      if (intensityForTo !== amount) {
        this.data.splice(indexAfterTo, 0, {
          segAt: to,
          intensity: intensityForTo,
        });
      }
    }

    // remove all breaks between (startIndex , lastIndex)
    // as they all should been set to `amount` now
    if (indexAfterTo - indexBeforeFrom - 1 > 0) {
      this.data.splice(indexBeforeFrom + 1, indexAfterTo - indexBeforeFrom - 1);
    }
    this.makeClean();
  }

  /**
   * @private
   *
   * remove leading zero amout
   * and remove tailing zero amout if there's more then one
   */
  makeClean() {
    // remove leading zero amout
    while (this.data.length && this.data[0].intensity === 0) {
      this.data.shift();
    }

    // remove tailing zero amout
    while (
      this.data.length > 2 &&
      this.data[this.data.length - 1].intensity === 0 &&
      this.data[this.data.length - 2].intensity === 0
    ) {
      this.data.pop();
    }
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
  toString() {
    const breaksStr = this.data
      .map((breakNode) => `[${breakNode.segAt},${breakNode.intensity}]`)
      .join(",");
    return `[${breaksStr}]`;
  }
}
