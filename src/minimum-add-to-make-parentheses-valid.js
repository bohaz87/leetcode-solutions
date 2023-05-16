/**
 * @param {string} s
 * @return {number}
 */
const minAddToMakeValid = function (s) {
  const stack = [];
  let count = 0;
  for (const ch of s) {
    if (ch === "(") {
      stack.push("(");
    } else {
      if (stack[stack.length - 1] !== "(") {
        count++;
      } else {
        stack.pop();
      }
    }
  }

  return count + stack.length;
};

console.log(minAddToMakeValid("())"), 1);
console.log(minAddToMakeValid("((("), 3);
