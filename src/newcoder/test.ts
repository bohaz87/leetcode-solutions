import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let N = 0;
let M = 0;
let lineCount = 0;
let scores: number[];
const queryResults: number[] = [];

rl.on("line", function (line: string) {
  const tokens = line.split(" ");
  if (lineCount === 0) {
    [N, M] = [Number(tokens[0]), Number(tokens[1])];
  } else if (lineCount === 1) {
    scores = tokens.map((str) => Number(str));
  } else {
    if (tokens[0] === "Q") {
      const start = Number(tokens[1]);
      const end = Number(tokens[2]);
      let max = scores[start];
      for (let i = start; i <= end; i++) {
        max = Math.max(scores[i - 1], max);
      }
      queryResults.push(max);
    } else if (tokens[0] === "U") {
      scores[Number(tokens[1]) - 1] = Number(tokens[2]);
    }
  }

  lineCount++;
  if (lineCount - 2 === M) {
    queryResults.forEach((n) => console.log(n));
  }
});

export {};
