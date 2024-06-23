class SudoNode {
  private groups: SudoNode[][] | null = null;
  possibleValues: null | Set<number>;
  constructor(
    public store: SudoNode[][],
    public row: number,
    public col: number,
    public value: number,
    possibleValues?: null | Set<number>
  ) {
    if (value === 0) {
      this.possibleValues = new Set(
        possibleValues || [1, 2, 3, 4, 5, 6, 7, 8, 9]
      );
    } else {
      this.possibleValues = null;
    }
  }

  getGroups() {
    if (this.groups) return this.groups;

    // my row
    const rowGroup = this.store[this.row];

    // my column
    const columnGroup = [];
    for (let i = 0; i < 9; i++) {
      columnGroup.push(this.store[i][this.col]);
    }

    // my rect
    const rectGroup = [];
    const rectRow = Math.floor(this.row / 3) * 3;
    const rectCol = Math.floor(this.col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const col = this.store[i + rectRow][j + rectCol];
        rectGroup.push(col);
      }
    }
    this.groups = [rowGroup, columnGroup, rectGroup];
    return this.groups;
  }

  setVal(newVal: number) {
    if (this.value !== 0) {
      throw new Error(
        `value already resolved current: ${this.value}, new: ${newVal}`
      );
    }
    if (!this.possibleValues!.has(newVal)) {
      throw new Error(
        `not allowed value: ${Array.from(this.possibleValues!).join(
          ","
        )}, new: ${newVal}`
      );
    }
    this.value = newVal;
    this.possibleValues = null;
    this.reflectChange();
  }

  reflectChange() {
    const groups = this.getGroups();
    groups.forEach((group) => {
      group.forEach((col) => {
        if (col !== this && col.value === 0) {
          col.calcPossibleValus(true);
        }
      });
    });
  }

  calcPossibleValus(reflect: boolean): void {
    if (this.possibleValues === null)
      throw new Error(
        `value already resolved [${this.row}, ${this.col}]:${this.value}`
      );

    const values = this.possibleValues;
    const oldSize = this.possibleValues.size;
    this.getGroups().forEach((group) => {
      group.forEach((col) => {
        if (col !== this && col.value !== 0) {
          values.delete(col.value);
        }
      });
    });

    if (values.size === 1) {
      this.setVal(Array.from(values)[0]);
    } else if (values.size === 0) {
      throw new Error("no possible values");
    } else if (oldSize !== this.possibleValues.size) {
      reflect && this.reflectChange();
    }
  }

  clone(store: SudoNode[][]) {
    const node = new SudoNode(
      store,
      this.row,
      this.col,
      this.value,
      this.possibleValues
    );
    return node;
  }
}

class Sudu {
  data: SudoNode[][];

  constructor() {
    this.data = Array(9);
    for (let i = 0; i < 9; i++) {
      this.data[i] = Array(9);
    }
  }

  initNode(row: number, col: number, value: number) {
    const node = new SudoNode(this.data, row, col, value);
    this.data[row][col] = node;
  }

  getSolution(): Sudu | null {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.data[i][j].value === 0)
          this.data[i][j].calcPossibleValus(false);
      }
    }

    const node = this.getOneUnresolvedNode();
    if (node) {
      const possibleValues = game.data[node.row][node.col].possibleValues;
      for (const v of possibleValues!) {
        const game = this.clone();
        try {
          console.log(
            "trying to resolve, set [%d, %d] to %d",
            node.row,
            node.col,
            v
          );
          game.data[node.row][node.col].setVal(v);
          if (game.isResolved()) {
            return game;
          } else {
            const solution = game.getSolution();
            if (solution) return solution;
          }
        } catch (e) {
          console.error(
            "-----trying failed, revert back. As: ",
            (e && (e as any)?.message) || String(e)
          );
        }
      }
      return null;
    } else {
      return this;
    }
  }

  clone() {
    const game = new Sudu();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        game.data[i][j] = this.data[i][j].clone(game.data);
      }
    }
    return game;
  }

  getOneUnresolvedNode(): SudoNode | null {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.data[i][j].value === 0) {
          return this.data[i][j];
        }
      }
    }
    return null;
  }

  toString() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      const cols = [];
      for (let j = 0; j < 9; j++) {
        const val = this.data[i][j].value;
        // cols.push(val);
        if (val !== 0) {
          cols.push(val);
        } else {
          cols.push(Array.from(this.data[i][j].possibleValues!).join(""));
        }
      }
      rows.push(`${cols.join(" ")}`);
    }
    return rows.join("\n");
  }

  isResolved() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.data[i][j].value === 0) return false;
      }
    }
    return true;
  }

  isValidate() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.data[i][j].value === 0) return false;

        const groups = this.data[i][j].getGroups();
        const invalidate = groups.some((group, groupIndex) => {
          const sum = group.reduce((sum, n) => {
            sum += n.value;
            return sum;
          }, 0);
          if (sum !== 45) {
            console.error(
              `sum = ${sum} for group: ${groupIndex}, node: [${i}, ${j}]`
            );
            return true;
          }
        });

        if (invalidate) {
          return false;
        }
      }
    }
    return true;
  }
}

const game = new Sudu();
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// let lineCount = 0;
// rl.on("line", function (line: string) {
//   if (lineCount < 9) {
//     const tokens = line.split(" ");
//     tokens.forEach((token, col) => {
//       game.initNode(lineCount, col, Number(token));
//     });
//     if (lineCount === 8) {
//       game.run();
//       console.log(game.toString());
//       rl.close();
//     }
//   }
//   lineCount++;
// });

const path = require("path");
const scope = require(path.resolve(__dirname, "./sudoku.js"));
function play() {
  const str: string = scope.sudoku.generate("inhuman", false);
  let strIndex = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const ch = str[strIndex];
      const n = ch === "." ? 0 : Number(ch);
      game.initNode(i, j, n);
      strIndex++;
    }
  }
  console.log(game.toString());
  const solution = game.getSolution();
  console.log();
  console.log(solution!.toString());
  console.log(solution!.isValidate());
}

play();
