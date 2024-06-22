const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let N: number | null = null;
let numbers = new Set<number>();

rl.on("line", function (line: string) {
  if (lineCount === 0) {
    N = Number(line);
  } else if (lineCount <= N!) {
    numbers.add(Number(line));
  }

  lineCount++;
  if (lineCount - 1 === N) {
    rl.close();
    const arr = Array.from(numbers).sort((a: number, b: number) => a - b);
    arr.forEach((n) => console.log(n));
  }
});

export {};
