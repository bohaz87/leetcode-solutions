function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const n of tokens) {
    switch (n) {
      case "+": {
        stack[stack.length - 2] =
          stack[stack.length - 2] + stack[stack.length - 1];
        stack.pop();
        break;
      }
      case "-": {
        stack[stack.length - 2] =
          stack[stack.length - 2] - stack[stack.length - 1];
        stack.pop();
        break;
      }
      case "*": {
        stack[stack.length - 2] =
          stack[stack.length - 2] * stack[stack.length - 1];
        stack.pop();
        break;
      }
      case "/": {
        stack[stack.length - 2] = Math.trunc(
          stack[stack.length - 2] / stack[stack.length - 1]
        );
        stack.pop();
        break;
      }
      default:
        stack.push(Number(n));
    }
  }
  return stack[0];
}

export {};

import { equal } from "assert/strict";

equal(evalRPN(["2", "1", "+", "3", "*"]), 9);
equal(evalRPN(["4", "13", "5", "/", "+"]), 6);
equal(
  evalRPN([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ]),
  22
);
