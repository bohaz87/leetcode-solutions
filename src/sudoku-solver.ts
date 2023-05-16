type CellValue = number | null;
type resolveCallback = (count: number) => void;

class Cell {
  value: CellValue;
  possibleValues: number[] = [];
  groups: Group[] = [];

  constructor(value: CellValue) {
    this.value = value;
  }

  linkGroup(group: Group) {
    this.groups.push(group);
  }

  initPossibleValues() {
    if (this.value) {
      return;
    }

    if (this.groups.length !== 3) {
      throw new Error("bad group length");
    }

    // const value = this.groups.reduce((value: number, group) => {
    //   value &= group.possibleValues;
    //   return value;
    // }, 511);

    const value =
      this.groups[0].possibleValues &
      this.groups[1].possibleValues &
      this.groups[2].possibleValues;
    // if (value !== value2) {
    //   throw new Error("what");
    // }

    this.possibleValues.length = 0;
    let i = 0;
    while (i < 9) {
      if ((value >> i) & 1) {
        this.possibleValues.push(i + 1);
      }
      i++;
    }

    if (!this.possibleValues.length) {
      throw new Error("invalid possible values");
    }
  }

  resolveWithPossibleValue(callback: resolveCallback): void {
    if (this.possibleValues.length === 1) {
      this.resolveWith(this.possibleValues[0], callback);
    }
  }

  onResolved(callback: resolveCallback): void {
    let count = 0;
    const fn: resolveCallback = (c) => (count += c);

    for (const group of this.groups) {
      for (const cell of group.cells) {
        if (cell !== this && !cell.value) {
          cell.initPossibleValues();
          cell.resolveWithPossibleValue(fn);
        }
      }
    }
    callback(count);
  }

  resolveWith(value: number, callback: resolveCallback): void {
    if (!this.possibleValues.includes(value)) {
      throw new Error("bad value");
    }

    this.value = value;
    this.possibleValues = [];

    function f(a: number, b: number) {
      return ((a >> b) << b) | (a & (511 >> (10 - b))); // 511 is parsetInt('111111111', 2)
    }

    this.groups.forEach((group) => {
      group.possibleValues = f(group.possibleValues, value);
    });

    this.onResolved((n) => callback(n + 1));
  }

  toString(): string {
    return this.value === null ? " " : String(this.value);
  }
}

class Group {
  cells: Cell[] = [];
  possibleValues = 0;

  constructor(cells: Cell[] = []) {
    cells.forEach((cell) => {
      this.cells.push(cell);
      cell.linkGroup(this);
    });

    let values = 0;
    for (let i = 0; i < 9; i++) {
      if (this.cells[i].value) {
        values |= 1 << ((this.cells[i].value as number) - 1);
      }
    }
    values = values ^ 511;
    this.possibleValues = values;
  }
}

class Board {
  private cells: Cell[][];
  private groups: Group[];
  private emptyCount = 0;

  constructor(data: CellValue[][]) {
    this.cells = [];
    this.groups = [];

    for (let i = 0; i < 9; i++) {
      this.cells[i] = [];

      for (let j = 0; j < 9; j++) {
        if (data[i][j] === null) {
          this.emptyCount++;
          this.cells[i][j] = new Cell(null);
        } else {
          this.cells[i][j] = new Cell(data[i][j]);
        }
      }
    }

    this.initGroup();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells[i][j].initPossibleValues();
      }
    }
  }

  clone() {
    const data: CellValue[][] = [];
    for (let i = 0; i < 9; i++) {
      data[i] = [];
      for (let j = 0; j < 9; j++) {
        data[i][j] = this.cells[i][j].value;
      }
    }
    return new Board(data);
  }

  private initGroup() {
    for (let i = 0; i < 9; i++) {
      this.groups.push(new Group(this.cells[i]));

      const column = [];
      for (let j = 0; j < 9; j++) {
        column.push(this.cells[j][i]);
      }

      this.groups.push(new Group(column));
    }

    for (let i = 0; i < 9; i = i + 3) {
      for (let j = 0; j < 9; j = j + 3) {
        const box = [];
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            box.push(this.cells[i + x][j + y]);
          }
        }
        this.groups.push(new Group(box));
      }
    }
  }

  resolve(): Board | undefined {
    this.resolveCells();
    if (this.isResolved()) {
      return this;
    } else {
      return this.guess();
    }
  }

  resolveCells(): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells[i][j].resolveWithPossibleValue(this.onCellValueChange);
        if (this.isResolved()) {
          return;
        }
      }
    }
  }

  guess(): Board | undefined {
    const old: Board[] = [this];
    let clone = this.clone();

    for (const [i, row] of this.cells.entries()) {
      for (const [j, cell] of row.entries()) {
        if (!cell.value) {
          for (const value of cell.possibleValues) {
            let done;
            try {
              clone.cells[i][j].resolveWith(value, clone.onCellValueChange);
              done = clone.resolve();
            } catch (e) {
              const last = old.pop();
              if (last) {
                clone = last.clone();
              } else {
                throw new Error(String(e));
              }
            }

            if (done) {
              return done;
            } else {
              old.push(clone);
              clone = clone.clone();
            }
          }
          throw new Error("should already returned");
        }
      }
    }
  }

  isResolved() {
    return this.emptyCount === 0;
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     if (!this.cells[i][j].value) {
    //       return false;
    //     }
    //   }
    // }
    // return true;
  }

  onCellValueChange = (count: number) => {
    this.emptyCount -= count;
    if (this.emptyCount < 0) {
      throw new Error("invalid empty count");
    }
  };

  toString() {
    return this.cells.map((row) => "[" + row.join(", ") + "]").join("\n");
  }

  getCells() {
    return this.cells;
  }

  print() {
    console.clear();
    console.log(this.toString());
  }
}

const solveSudoku = function (data: string[][]) {
  const board = new Board(
    data.map((row) =>
      row.map((value) => (value === "." ? null : parseInt(value)))
    )
  );
  const ret = board.resolve();
  const cells = ret?.getCells();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      data[i][j] = String(cells?.[i][j].value);
    }
  }
  console.log(ret?.toString());
};

// console.log(
//   solveSudoku([
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"],
//   ])
// );

// console.log(
//   solveSudoku([
//     [".", ".", "9", "7", "4", "8", ".", ".", "."],
//     ["7", ".", ".", ".", ".", ".", ".", ".", "."],
//     [".", "2", ".", "1", ".", "9", ".", ".", "."],
//     [".", ".", "7", ".", ".", ".", "2", "4", "."],
//     [".", "6", "4", ".", "1", ".", "5", "9", "."],
//     [".", "9", "8", ".", ".", ".", "3", ".", "."],
//     [".", ".", ".", "8", ".", "3", ".", "2", "."],
//     [".", ".", ".", ".", ".", ".", ".", ".", "6"],
//     [".", ".", ".", "2", "7", "5", "9", ".", "."],
//   ])
// );

console.log(
  solveSudoku([
    [" ", "4", "6", "9", ".", "3", ".", ".", "."],
    [".", ".", "3", ".", "5", ".", ".", "6", "."],
    ["9", ".", ".", ".", ".", "2", ".", ".", "3"],
    [".", ".", "5", ".", ".", "6", ".", ".", "."],
    ["8", ".", ".", ".", ".", ".", ".", "1", "."],
    [".", "1", ".", "7", "8", ".", "2", "5", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "8", "1", "3", ".", ".", ".", ".", "7"],
    [".", ".", ".", "8", ".", ".", "1", ".", "4"],
  ])
);
