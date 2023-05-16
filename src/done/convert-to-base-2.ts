function baseNeg2(n: number): string {
  if (n < 2) {
    return String(n);
  }

  const base2Str = n.toString(2);
  const str: number[] = [];

  function push(n: number) {
    if (n < 0) {
      const idx = str.indexOf(-n);
      if (idx > -1) {
        str.splice(idx, 1);
      } else {
        push(-n);
      }
      return;
    }

    const idx = str.indexOf(n);
    if (idx > -1) {
      console.log("promote", n);
      str.splice(idx, 1);
      push(-(n + 1));
    } else {
      str.push(n);
      if (n & 1) {
        push(n + 1);
      }
    }
  }

  for (let i = 0, len = base2Str.length; i < len; i++) {
    if (base2Str[i] === "1") {
      push(len - i - 1);
    }
  }

  const len = Math.max(...str) + 1;
  const ret = Array(len).fill(0);
  str.forEach((i) => (ret[len - i - 1] = 1));
  return ret.join("");
}

console.log(baseNeg2(0), "0");
console.log(baseNeg2(1), "1");
console.log(baseNeg2(2), "110");
console.log(baseNeg2(3), "111");
console.log(baseNeg2(4), "100");
console.log(baseNeg2(6), "11010");
console.log(baseNeg2(14), "10010");
console.log(baseNeg2(1234), "10010");
