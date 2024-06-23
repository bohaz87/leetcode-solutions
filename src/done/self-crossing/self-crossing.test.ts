import fs from "fs";
import path from "path";
import isSelfCrossing from "./self-crossing";
import url from "url";

describe("isSelfCrossing", () => {
  test("isSelfCrossing", () => {
    expect(isSelfCrossing([1, 1, 2, 2, 1, 1])).toEqual(true);
    expect(isSelfCrossing([1, 1, 2, 1, 1])).toEqual(true);
    expect(isSelfCrossing([2, 1, 1, 2])).toEqual(true);
    expect(isSelfCrossing([1, 2, 3, 4])).toEqual(false);
    expect(isSelfCrossing([1, 1, 1, 1])).toEqual(true);
    expect(isSelfCrossing([3, 3, 4, 2, 2])).toEqual(false);

    const dataArr: string = fs.readFileSync(
      path.join(path.dirname(url.fileURLToPath(import.meta.url)), "./data.txt"),
      {
        encoding: "utf-8",
      }
    );

    const nums1 = JSON.parse(dataArr);
    isSelfCrossing(nums1);
  });
});
