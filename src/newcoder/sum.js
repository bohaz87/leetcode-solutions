import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T = null;
let lineCount = 0;
const numbers = [];

rl.on("line", (line) => {
  if (lineCount === 0) {
    T = Number(line);
  } else if (lineCount <= T) {
    const tokens = line.split(" ");
    numbers.push(Number(tokens[0]) + Number(tokens[1]));
  }
  lineCount++;

  if (lineCount === T + 1) {
    rl.close();
  }
});

rl.on("close", () => {
  numbers.forEach((n) => console.log(n));
});
