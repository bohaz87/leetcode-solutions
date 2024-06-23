function isValid(str: string) {
  const arr = [];
  for (const ch of str) {
    if (ch === "(") {
      arr.push(ch);
    } else if (ch === ")") {
      const l = arr.pop();
      if (l !== "(") {
        return false;
      }
    }
  }
  return true;
}

function isAllValid(str: string) {
  if (!str.length) return false;
  const arr = [];
  for (const ch of str) {
    if (ch === "(") {
      arr.push(ch);
    } else if (ch === ")") {
      const l = arr.pop();
      if (l !== "(") {
        return false;
      }
    }
  }
  return arr.length === 0;
}

const removeInvalidParentheses = function (s: string): string[] {
  let arr = new Set<string>();
  arr.add("");

  for (const ch of s) {
    const newArr = new Set<string>();
    for (const str of arr) {
      switch (ch) {
        case "(":
          newArr.add(str);
          newArr.add(str + ch);
          break;
        case ")":
          newArr.add(str);
          if (isValid(str + ch)) {
            newArr.add(str + ch);
            // todo remove from arr which less then clone
          }
          break;
        default:
          newArr.add(str + ch);
      }
    }
    arr = newArr;
  }
  let maxLen = 0;
  const ret: string[] = [];
  arr.forEach((str) => {
    if (maxLen <= str.length && isAllValid(str)) {
      if (maxLen < str.length) {
        ret.length = 0;
      }
      maxLen = str.length;
      ret.push(str);
    }
  });
  return ret.length === 0 ? [""] : ret;
};

// console.log(removeInvalidParentheses("(()"));
// console.log(removeInvalidParentheses("(()"));
console.log(removeInvalidParentheses("(a)())()()()((())(()))(b)"));
// console.log(removeInvalidParentheses(")("));
