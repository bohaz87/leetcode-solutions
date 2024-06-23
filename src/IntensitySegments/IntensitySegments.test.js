import { IntensitySegments } from "./IntensitySegments";
import assert from "assert";

describe("IntensitySegments", () => {
  test("IntensitySegments", () => {
    const segments = new IntensitySegments();
    // Here is an example sequence:
    // (data stored as an array of start point and value for each segment.) const segments = new IntensitySegments();
    expect(segments.toString()).toEqual("[]"); // Should be "[]"
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]"); // Should be: "[[10,1],[30,0]]"
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]"); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
    segments.add(10, 40, -2);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]"); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
    segments.set(10, 20, 0);
    expect(segments.toString()).toEqual("[[30,-1],[40,0]]");
    segments.set(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,0],[30,-1],[40,0]]");
    segments.set(10, 40, 0);
    expect(segments.toString()).toEqual("[]");
    segments.set(-100, 100, 0);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,1],[30,0]]"); // Should be "[[10,1],[30,0]]"
    segments.add(20, 40, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,2],[30,1],[40,0]]"); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
    segments.add(10, 40, -1);
    expect(segments.toString()).toEqual("[[20,1],[30,0]]"); // Should be "[[20,1],[30,0]]"
    segments.add(10, 40, -1);
    expect(segments.toString()).toEqual("[[10,-1],[20,0],[30,-1],[40,0]]"); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
    segments.set(-100, 100, 0);
    expect(segments.toString()).toEqual("[]");
    // edge cases
    segments.add(1, 1, 1);
    expect(segments.toString()).toEqual("[]");
    segments.add(1, -1, 1);
    expect(segments.toString()).toEqual("[]");
    segments.add(1, 2, 1);
    expect(segments.toString()).toEqual("[[1,1],[2,0]]");
    segments.add(1, 2, 0);
    expect(segments.toString()).toEqual("[[1,1],[2,0]]");
    segments.set(1, 2, 0);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,0]]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,2],[20,0]]");
    segments.add(10, 20, -1);
    expect(segments.toString()).toEqual("[[10,1],[20,0]]");
    segments.add(10, 20, -1);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 20, -1);
    expect(segments.toString()).toEqual("[[10,-1],[20,0]]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,0]]");
    segments.add(10, 30, 1);
    expect(segments.toString()).toEqual("[[10,2],[20,1],[30,0]]");
    segments.add(0, 40, 1);
    expect(segments.toString()).toEqual("[[0,1],[10,3],[20,2],[30,1],[40,0]]");
    segments.add(15, 25, 2);
    expect(segments.toString()).toEqual(
      "[[0,1],[10,3],[15,5],[20,4],[25,2],[30,1],[40,0]]"
    );
    segments.add(35, 45, 2);
    expect(segments.toString()).toEqual(
      "[[0,1],[10,3],[15,5],[20,4],[25,2],[30,1],[35,3],[40,2],[45,0]]"
    );
    segments.add(25, 45, 3);
    expect(segments.toString()).toEqual(
      "[[0,1],[10,3],[15,5],[20,4],[25,5],[30,4],[35,6],[40,5],[45,0]]"
    );
    segments.add(41, 50, 4);
    expect(segments.toString()).toEqual(
      "[[0,1],[10,3],[15,5],[20,4],[25,5],[30,4],[35,6],[40,5],[41,9],[45,4],[50,0]]"
    );
    segments.set(10, 45, 4);
    expect(segments.toString()).toEqual("[[0,1],[10,4],[45,4],[50,0]]");
    segments.set(10, 50, -4);
    expect(segments.toString()).toEqual("[[0,1],[10,-4],[50,0]]");
    segments.set(1, 30, 2);
    expect(segments.toString()).toEqual("[[0,1],[1,2],[30,-4],[50,0]]");
    segments.set(-1, 25, 2);
    expect(segments.toString()).toEqual("[[-1,2],[30,-4],[50,0]]");
    segments.set(1, 10, 2);
    expect(segments.toString()).toEqual("[[-1,2],[30,-4],[50,0]]");
    segments.add(10, 20, -6);
    expect(segments.toString()).toEqual(
      "[[-1,2],[10,-4],[20,2],[30,-4],[50,0]]"
    );
    segments.add(30, 60, 4);
    expect(segments.toString()).toEqual(
      "[[-1,2],[10,-4],[20,2],[30,0],[50,4],[60,0]]"
    );
    segments.add(10, 20, 4);
    expect(segments.toString()).toEqual(
      "[[-1,2],[10,0],[20,2],[30,0],[50,4],[60,0]]"
    );
    segments.add(-1, 10, -2);
    expect(segments.toString()).toEqual("[[20,2],[30,0],[50,4],[60,0]]");
    segments.add(20, 30, -2);
    expect(segments.toString()).toEqual("[[50,4],[60,0]]");
    segments.add(50, 60, -4);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,0]]");
    segments.set(10, 20, 2);
    expect(segments.toString()).toEqual("[[10,2],[20,0]]");
    segments.set(10, 30, 2);
    expect(segments.toString()).toEqual("[[10,2],[30,0]]");
    segments.set(0, 30, 1);
    expect(segments.toString()).toEqual("[[0,1],[30,0]]");
    segments.add(0, 30, 1);
    expect(segments.toString()).toEqual("[[0,2],[30,0]]");
    segments.add(0, 30, -1);
    expect(segments.toString()).toEqual("[[0,1],[30,0]]");
    segments.add(0, 10, 1);
    expect(segments.toString()).toEqual("[[0,2],[10,1],[30,0]]");
    segments.set(1, 5, 1);
    expect(segments.toString()).toEqual("[[0,2],[1,1],[5,2],[10,1],[30,0]]");
    segments.set(1, 30, 1);
    expect(segments.toString()).toEqual("[[0,2],[1,1],[30,0]]");
    segments.set(0, 30, 1);
    expect(segments.toString()).toEqual("[[0,1],[30,0]]");
    segments.set(10, 40, 2);
    expect(segments.toString()).toEqual("[[0,1],[10,2],[40,0]]");
    segments.set(20, 40, 0);
    expect(segments.toString()).toEqual("[[0,1],[10,2],[20,0]]");
    segments.set(-10, 20, 3);
    expect(segments.toString()).toEqual("[[-10,3],[20,0]]");
    segments.set(-10, 5, 1);
    expect(segments.toString()).toEqual("[[-10,1],[5,3],[20,0]]");
    segments.set(10, 15, 4);
    expect(segments.toString()).toEqual("[[-10,1],[5,3],[10,4],[15,3],[20,0]]");
    segments.set(16, 30, 5);
    expect(segments.toString()).toEqual(
      "[[-10,1],[5,3],[10,4],[15,3],[16,5],[30,0]]"
    );
    segments.add(1, 18, 1);
    expect(segments.toString()).toEqual(
      "[[-10,1],[1,2],[5,4],[10,5],[15,4],[16,6],[18,5],[30,0]]"
    );
    segments.add(20, 48, -1);
    expect(segments.toString()).toEqual(
      "[[-10,1],[1,2],[5,4],[10,5],[15,4],[16,6],[18,5],[20,4],[30,-1],[48,0]]"
    );
    segments.set(30, 20, 1);
    expect(segments.toString()).toEqual(
      "[[-10,1],[1,2],[5,4],[10,5],[15,4],[16,6],[18,5],[20,4],[30,-1],[48,0]]"
    );
    segments.set(-10, 48, 1);
    expect(segments.toString()).toEqual("[[-10,1],[48,0]]");
    segments.add(-20, 50, 1);
    expect(segments.toString()).toEqual("[[-20,1],[-10,2],[48,1],[50,0]]");
    segments.add(-30, 30, 1);
    expect(segments.toString()).toEqual(
      "[[-30,1],[-20,2],[-10,3],[30,2],[48,1],[50,0]]"
    );
    segments.set(-100, 100, 0);
    expect(segments.toString()).toEqual("[]");
    segments.add(10, 20, 1);
    expect(segments.toString()).toEqual("[[10,1],[20,0]]");
    segments.add(-10, -5, 1);
    expect(segments.toString()).toEqual("[[-10,1],[-5,0],[10,1],[20,0]]");
  });
  it("should add intensity segments correctly", function () {
    const segments = new IntensitySegments();
    segments.add(10, 30, 1);
    assert.strictEqual(segments.toString(), "[[10,1],[30,0]]");
    segments.add(20, 40, 2);
    assert.strictEqual(segments.toString(), "[[10,1],[20,3],[30,2],[40,0]]");
  });
  it("should set intensity segments correctly", function () {
    const segments = new IntensitySegments();
    segments.set(10, 30, 1);
    assert.strictEqual(segments.toString(), "[[10,1],[30,0]]");
    segments.set(20, 40, 2);
    assert.strictEqual(segments.toString(), "[[10,1],[20,2],[40,0]]");
  });
  it("should handle overlapping segments correctly", function () {
    const segments = new IntensitySegments();
    segments.add(10, 20, 1);
    segments.add(15, 25, 2);
    assert.strictEqual(segments.toString(), "[[10,1],[15,3],[20,2],[25,0]]");
  });
  it("should clean leading and trailing zero intensities", function () {
    const segments = new IntensitySegments();
    segments.add(10, 20, 1);
    segments.add(30, 40, 1);
    segments.set(10, 20, 0);
    assert.strictEqual(segments.toString(), "[[30,1],[40,0]]");
  });
});
