import fs from "fs";
import path from "path";
import isSelfCrossing from "./self-crossing";

describe("isSelfCrossing", () => {
  test("isSelfCrossing", () => {
    expect(isSelfCrossing([1, 1, 2, 2, 1, 1])).toEqual(true);
    expect(isSelfCrossing([1, 1, 2, 1, 1])).toEqual(true);
    expect(isSelfCrossing([2, 1, 1, 2])).toEqual(true);
    expect(isSelfCrossing([1, 2, 3, 4])).toEqual(false);
    expect(isSelfCrossing([1, 1, 1, 1])).toEqual(true);
    expect(isSelfCrossing([3, 3, 4, 2, 2])).toEqual(false);

    const dataArr = fs.readFileSync(path.join(__dirname, "./data.txt"), {
      encoding: "utf-8",
    });

    const nums1 = JSON.parse(dataArr);
    isSelfCrossing(nums1);
  });
});
