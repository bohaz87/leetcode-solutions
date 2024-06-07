/**
 * https://wiki.amoscloud.com/zh/ProgramingPractice/NowCoder/Adecco/Topic0005-%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6
 */

function scheduler(max: number, tasks: number[]): number {
  let seconds = 0;
  let taskIndex = 0;
  let prevRequired = 0;

  while (taskIndex < tasks.length || prevRequired > 0) {
    if (prevRequired > max) {
      prevRequired -= max;
    } else {
      prevRequired = Math.max(prevRequired - max, 0);
    }
    if (prevRequired < max && ++taskIndex < tasks.length) {
      prevRequired += tasks[taskIndex];
    }
    seconds++;
  }
  return seconds;
}

import assert from "assert/strict";
assert.equal(scheduler(3, [1]), 1);
assert.equal(scheduler(3, [1, 2]), 2);
assert.equal(scheduler(3, [1, 2, 3]), 3);
assert.equal(scheduler(3, [1, 2, 3, 4]), 5);
assert.equal(scheduler(3, [1, 2, 3, 4, 5]), 6);
assert.equal(scheduler(4, [5, 4, 1, 1, 1]), 5);
export {};
