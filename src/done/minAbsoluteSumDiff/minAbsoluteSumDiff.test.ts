import minAbsoluteSumDiff from "./minAbsoluteSumDiff";
import fs from "fs";
import path from "path";
import { strict as assert } from "assert";
import url from "url";

describe("minAbsoluteSumDiff", () => {
  test("minAbsoluteSumDiff", () => {
    assert.equal(minAbsoluteSumDiff([1, 7, 5], [2, 3, 5]), 3);
    assert.equal(minAbsoluteSumDiff([2, 4, 6, 8, 10], [2, 4, 6, 8, 10]), 0);
    assert.equal(
      minAbsoluteSumDiff([1, 10, 4, 4, 2, 7], [9, 3, 5, 1, 7, 4]),
      20
    );
    assert.equal(
      minAbsoluteSumDiff(
        [
          57, 42, 21, 28, 30, 25, 22, 12, 55, 3, 47, 18, 43, 29, 20, 44, 59, 9,
          43, 7, 8, 5, 42, 53, 99, 34, 37, 88, 87, 62, 38, 68, 31, 3, 11, 61,
          93, 34, 63, 27, 20, 48, 38, 5, 71, 100, 88, 54, 52, 15, 98, 59, 74,
          26, 81, 38, 11, 44, 25, 69, 79, 81, 51, 85, 59, 84, 83, 99, 31, 47,
          31, 23, 83, 70, 82, 79, 86, 31, 50, 17, 11, 100, 55, 15, 98, 11, 90,
          16, 46, 89, 34, 33, 57, 53, 82, 34, 25, 70, 5, 1,
        ],
        [
          76, 3, 5, 29, 18, 53, 55, 79, 30, 33, 87, 3, 56, 93, 40, 80, 9, 91,
          71, 38, 35, 78, 32, 58, 77, 41, 63, 5, 21, 67, 21, 84, 52, 80, 65, 38,
          62, 99, 80, 13, 59, 94, 21, 61, 43, 82, 29, 97, 31, 24, 95, 52, 90,
          92, 37, 26, 65, 89, 90, 32, 27, 3, 42, 47, 93, 25, 14, 5, 39, 85, 89,
          7, 74, 38, 12, 46, 40, 25, 51, 2, 19, 8, 21, 62, 58, 29, 32, 77, 62,
          9, 74, 98, 10, 55, 25, 62, 48, 48, 24, 21,
        ]
      ),
      3441
    );
    const dataArr = fs
      .readFileSync(
        path.join(
          path.dirname(url.fileURLToPath(import.meta.url)),
          "./data.txt"
        ),
        {
          encoding: "utf-8",
        }
      )
      .split("\n");

    const nums1 = JSON.parse(dataArr[0]);
    const nums2 = JSON.parse(dataArr[1]);
    assert.equal(minAbsoluteSumDiff(nums1, nums2), 317732165);
  });
});
