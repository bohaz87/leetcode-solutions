function jump(nums: number[]): number {
  let count = 0;
  let edge = 0;
  let nextEdge = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    nextEdge = Math.max(nextEdge, nums[i] + i);

    if (i === edge) {
      count++;
      edge = nextEdge;
    }
  }

  return count;
}

describe("Jump II", () => {
  it("should work", () => {
    expect(jump([1])).toEqual(0);
    expect(jump([2])).toEqual(0);
    expect(jump([1, 2])).toEqual(1);
    expect(jump([2, 1])).toEqual(1);
    expect(jump([1, 2, 3])).toEqual(2);
    expect(jump([3, 2, 1])).toEqual(1);
  });

  it("performance test", async () => {
    const arr: number[] = [];
    for (let i = 0; i < 10000; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }

    function randomTest() {
      jump(arr);
    }

    randomTest();

    expect(randomTest);
  });
});
