type GameNumbers = string;

interface Rule {
  (fullNum: GameNumbers): boolean;
}

function at(num: number | string, position: number): Rule {
  return (fulln: GameNumbers) => {
    return fulln[position] == String(num);
  };
}

function exsit(num: number | string): Rule {
  return (fulln: GameNumbers) => fulln.includes(String(num));
}

function checkCount(count: number, ...rules: Rule[]): Rule {
  return (fulln: GameNumbers) => {
    let n = 0;
    for (const fn of rules) {
      if (fn(fulln)) {
        n++;
        if (n > count) {
          return false;
        }
      }
    }
    return n === count;
  };
}

function genRule(numb: string) {
  const [n0, n1, n2, n3] = [...numb];

  function bothAB(n: number) {
    return checkCount(n, exsit(n0), exsit(n1), exsit(n2), exsit(n3));
  }
  function onlyA(n: number) {
    return checkCount(n, at(n0, 0), at(n1, 1), at(n2, 2), at(n3, 3));
  }

  return function rule(a: number, b: number) {
    return checkCount(2, bothAB(a + b), onlyA(a));
  };
}

class Game {
  rules: Rule[];
  constructor() {
    this.rules = [];
  }

  verify(numb: string, result: string) {
    const rule = genRule(numb);
    const a = Number(result[0]);
    const b = Number(result[2]);
    this.rules.push(rule(a, b));
  }

  randomGuess() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const answer: number[] = [];
    while (answer.length < 4) {
      const a = Math.floor(Math.random() * arr.length);
      if (!answer.includes(a)) answer.push(a);
    }
    return answer.join("");
  }

  *getNextGuess() {
    yield this.randomGuess();

    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        if (a === b) continue;
        for (let c = 0; c <= 9; c++) {
          if (c === a || c === b) continue;
          for (let d = 0; d <= 9; d++) {
            if (d === a || d === b || d === c) continue;
            const num = "" + a + b + c + d;
            let match = true;
            for (let i = 0; i < this.rules.length; i++) {
              const rule = this.rules[i];
              if (!rule(num)) {
                match = false;
                break;
              }
            }
            if (match) {
              yield num;
            }
          }
        }
      }
    }
  }
}

// const g = new Game();
// const it = g.getNextGuess();

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const input = require("prompt-sync")();

// let times = 0;
// let done = false;
// while (!done) {
//   times++;
//   const nt = it.next();
//   if (!nt.done) {
//     const pn = nt.value;
//     let result = String(input(pn + " ---> ")).toUpperCase();
//     if (!result.includes("A")) {
//       result = result[0] + "A" + (result[1] || "0") + "B";
//     }
//     console.log(result);
//     if (result.toUpperCase() === "4A0B") {
//       done = true;
//     } else {
//       g.verify(String(pn), result);
//     }
//   } else {
//     console.log("nt id done, no numbers left");
//     done = true;
//   }
// }
// console.log("done with %s times", times);

function genAnswer() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const answer: number[] = [];
  while (answer.length < 4) {
    const a = Math.floor(Math.random() * arr.length);
    if (!answer.includes(a)) answer.push(a);
  }
  return answer.join("");
}

function checkResult(guess: string, answer: string) {
  let a = 0,
    b = 0;
  for (let i = 0; i < 4; i++) {
    if (answer[i] === guess[i]) a++;
    else if (answer.includes(guess[i])) b++;
  }
  return a + "A" + b + "B";
}

function test() {
  const answer = genAnswer();
  console.log("answer is %s ", answer);
  const g = new Game();
  const it = g.getNextGuess();

  let times = 0;
  let done = false;
  while (!done) {
    times++;
    const nt = it.next();
    if (!nt.done) {
      const pn = nt.value;
      const result = checkResult(pn, answer);
      console.log(pn, " ----> ", result);
      if (result.toUpperCase() === "4A0B") {
        done = true;
      } else {
        g.verify(String(pn), result);
      }
    } else {
      console.log("nt id done, no numbers left");
      done = true;
    }
  }
  console.log("done with %s times", times);
}

test();

export {};
