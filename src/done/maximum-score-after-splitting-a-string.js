/**
 * @param {String} s
 * @returns
 */
function maxScore(s) {
  const length = s.length;
  const zeroLength = s.replace(/1/g, "").length;
  const oneLength = length - zeroLength;

  let max = 0;
  let zeroCount = 0;

  for (let i = 0; i < length - 1; i++) {
    if (s[i] === "0") {
      zeroCount++;
    }
    max = Math.max(max, 2 * zeroCount + oneLength - i - 1);
  }
  return max;
}

let s = "";
for (let i = 0; i < 500; i++) {
  s += i & 1 ? "0" : "1";
}
console.log(maxScore("0101011000000001"));
console.log(maxScore(s));
console.log(maxScore("00"));
console.log(maxScore("11"));
console.log(maxScore("01"));
