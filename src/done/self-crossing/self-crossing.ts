type Direction = 0 | 1 | 2 | 3;

function getEndPoint(
  start: Point,
  direction: Direction,
  distance: number
): Point {
  const { x, y } = start;
  switch (direction) {
    case 0:
      return new Point(x, y + distance);
    case 1:
      return new Point(x - distance, y);
    case 2:
      return new Point(x, y - distance);
    case 3:
    default:
      return new Point(x + distance, y);
  }
}

/**
 * @param {number[]} distance
 * @return {boolean}
 */
const isSelfCrossing = function (distance: number[]): boolean {
  const lines = [];

  let start = new Point(0, 0);
  let direction = 0;
  for (let i = 0; i < distance.length; i++, direction = (direction + 1) % 4) {
    const end = getEndPoint(start, direction as Direction, distance[i]);
    lines.push(new Line(start, end));
    start = end;
  }

  for (let i = 3; i < lines.length; i++) {
    for (let j = Math.max(i - 5, 0); j < i - 1; j++) {
      if (Line.isCrossing(lines[i], lines[j])) {
        console.log(
          `line ${i} and ${j} is Corssing`,
          lines[i].toString(),
          lines[j].toString()
        );
        return true;
      }
    }
  }
  return false;
};

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  start: Point;
  end: Point;
  isParallelWith: "x" | "y";
  constructor(start: Point, end: Point) {
    if (start.x > end.x || start.y > end.y) {
      this.start = end;
      this.end = start;
    } else {
      this.start = start;
      this.end = end;
    }
    this.isParallelWith = this.start.y === this.end.y ? "x" : "y";
  }

  toString() {
    return `[(${this.start.x}, ${this.start.y}), (${this.end.x}, ${this.end.y})]`;
  }

  /**
   * @param {Line} lineA
   * @param {Line} lineB
   * @returns
   */
  static isParallel(lineA: Line, lineB: Line) {
    return lineA.isParallelWith === lineB.isParallelWith;
  }

  static isCrossing(lineA: Line, lineB: Line) {
    if (Line.isParallel(lineA, lineB)) {
      if (lineA.isParallelWith === "x") {
        return (
          lineA.start.y === lineB.start.y &&
          (lineA.start.x === lineB.start.x ||
            lineA.start.x === lineB.end.x ||
            lineA.end.x === lineB.start.x ||
            lineA.end.x === lineB.end.x)
        );
      } else if (lineA.isParallelWith === "y") {
        return (
          lineA.start.x === lineB.start.x &&
          (lineA.start.y === lineB.start.y ||
            lineA.start.y === lineB.end.y ||
            lineA.end.y === lineB.start.y ||
            lineA.end.y === lineB.end.y)
        );
      }
    }

    let parallelWithXLine: Line, parallelWithYLine: Line;
    if (lineA.isParallelWith === "x") {
      parallelWithXLine = lineA;
      parallelWithYLine = lineB;
    } else {
      parallelWithXLine = lineB;
      parallelWithYLine = lineA;
    }

    return (
      // A.x1 <= B.x <= A.x2
      parallelWithXLine.start.x <= parallelWithYLine.start.x &&
      parallelWithYLine.start.x <= parallelWithXLine.end.x &&
      // B.y1 <= A.y <= B.y2
      parallelWithYLine.start.y <= parallelWithXLine.start.y &&
      parallelWithXLine.start.y <= parallelWithYLine.end.y
    );
  }
}

export default isSelfCrossing;
