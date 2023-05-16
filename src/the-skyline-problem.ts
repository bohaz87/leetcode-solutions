interface SkylineData {
  xCoordinate: number;
  height: number;
}

class SkyLine {
  data: SkylineData[];

  constructor() {
    this.data = [] as SkylineData[];
  }

  addBuilding(building: [number, number, number]): void {
    const [left, right, height] = building;
    if (this.data.length === 0) {
      this.data.push(
        {
          xCoordinate: left,
          height,
        },
        {
          xCoordinate: right,
          height: 0,
        }
      );
      return;
    }

    const end = this.data[this.data.length - 1];
    if (end.xCoordinate < left) {
      this.data.push(
        {
          xCoordinate: left,
          height,
        },
        {
          xCoordinate: right,
          height: 0,
        }
      );
      return;
    } else if (end.xCoordinate === left) {
      this.data.pop();
      if (height === end.height) {
        end.xCoordinate = right;
      } else {
        end.height = height;
        this.data.push({ xCoordinate: right, height: 0 });
      }
      return;
    } else {
      for (let i = this.data.length - 1; i >= 0; i--) {
        const d = this.data[i];
        if (d.xCoordinate > left) {
          if (d.height < height) {
            d.height = -1;
          }
        } else {
          this.data.splice(i + 1, 0, {
            xCoordinate: left,
            height: height,
          });
          break;
        }
      }
      this.data.push({
        xCoordinate: right,
        height: 0,
      });
    }
  }

  format(): [number, number][] {
    return this.data.map((skl) => [skl.xCoordinate, skl.height]);
  }
}

const getSkyline = function (buildings: [number, number, number][]) {
  const skl = new SkyLine();
  buildings.forEach((b) => skl.addBuilding(b));

  return skl.format();
};

console.log(
  getSkyline([
    [2, 9, 10],
    [3, 7, 15],
    [5, 12, 12],
    [15, 20, 10],
    [19, 24, 8],
  ])
);
console.log([
  [2, 10],
  [3, 15],
  [7, 12],
  [12, 0],
  [15, 10],
  [20, 8],
  [24, 0],
]);
console.log(
  getSkyline([
    [0, 2, 3],
    [2, 5, 3],
  ])
);
