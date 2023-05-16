function checkValidString(s: string): boolean {
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === "(") {
      stack.push(ch);
    } else if (ch === "*") {
      stack.push(ch);
    } else if (ch === ")") {
      let starCount = 0;
      let matched = false;
      do {
        const last = stack.pop();

        if (!last) {
          return false;
        }

        if (last === "(") {
          matched = true;
          break;
        } else {
          starCount++;
        }
      } while (stack.length);

      if (!matched) {
        if (starCount) {
          starCount--;
        } else {
          return false;
        }
      }

      while (starCount) {
        stack.push("*");
        starCount--;
      }
    }
    // console.log(stack.join(""));
  }

  // console.log("---");
  const s2: string[] = [];
  let front = true;
  for (const ch of stack) {
    if (ch === "(") {
      s2.push("(");
      front = false;
    } else {
      if (!front && !s2.pop()) {
        return false;
      } else if (s2.length === 0) {
        front = true;
      }
    }
    // console.log(s2.join(""));
  }

  return s2.length === 0;
}

// console.log(checkValidString("()"), true);
// console.log(checkValidString("(*)"), true);
// console.log(checkValidString("(*))"), true);
// console.log(checkValidString("(*)))"), false);
// console.log(checkValidString("((*))"), true);
// console.log(checkValidString("(((*))"), true);
// console.log(checkValidString("((((*))"), false);

console.log(
  checkValidString(
    "((((()(()()()*()(((((*)()*(**(())))))(())()())(((())())())))))))(((((())*)))()))(()((*()*(*)))(*)()"
  ),
  true
);
