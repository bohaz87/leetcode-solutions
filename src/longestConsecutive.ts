function longestConsecutive(nums: number[]): number {
  const nodeSet = new Set(nums);
  let maxLen = 0;

  for (let n of nums) {
    if (!nodeSet.has(n - 1)) {
      let len = 1;
      while (nodeSet.has(n + 1)) {
        n++;
        len++;
      }
      maxLen = Math.max(maxLen, len);
    }
  }

  return maxLen;
}

function randomTest() {
  const arr: number[] = [];
  for (let i = 0; i < 100000; i++) {
    arr[i] = i;
  }
  arr.sort(() => (Math.random() > 0.5 ? -1 : 1));

  // console.log(arr);
  console.log(longestConsecutive(arr));
}

console.time("Test10");
for (let i = 0; i < 10; i++) randomTest();
console.timeEnd("Test10");

// console.log(longestConsecutive([100, 4, 5, 6, 200, 1, 3, 2, 3, 7]));

export {};
