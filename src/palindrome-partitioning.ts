function isPalindrome(s: string, start: number, end: number) {
  for (let i = start, j = end; i < j; i++, j--) {
    if (s[i] !== s[j]) {
      return false;
    }
  }
  return true;
}

function buildSubPalindrome(s: string) {
  const arr: number[] = [];

  for (let i = 0, len = s.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isPalindrome(s, i, j)) {
        arr.push((1 << i) | (1 << j));
      }
    }
  }

  return arr;
}

function partition(s: string): string[][] {
  const subPalindrome = buildSubPalindrome(s);
  const max = subPalindrome.reduce((m, v) => {
    m |= v;
    return m;
  }, 0);
  const ret: string[][] = [];
  for (let i = 0; i < max; i++) {
    // if (i & max) {
    //   continue;
    // }
    let iStr = i.toString(2);
    const countOne = iStr.replace(/0/g, "").length;
    if (countOne & 1) {
      continue;
    }
    iStr = iStr.padStart(s.length, "0");

    let current: string[] | null = [];
    let start: number | null = null;
    for (let j = 0; j < s.length; j++) {
      if (iStr[j] === "1") {
        if (start === null) {
          start = j;
        } else {
          if (subPalindrome.includes((1 << start) | (1 << j))) {
            current.push(s.substring(start, j + 1));
            start = null;
          } else {
            current = null;
            break;
          }
        }
      } else if (start === null) {
        current.push(s[j]);
      }
    }
    if (start === null && current) {
      ret.push(current);
    }
  }
  return ret;
}

// console.log(partition("a"));
// console.log(partition("aa"));
// console.log(partition("ab"));
console.log(partition("aab"));
// console.log(partition("cdd"));
// console.log(partition("aaabaa"));
console.log(partition("cbbbcc"));
console.log(partition("cbbbcc").length, 9);
// console.log(partition("ccaacabacb"));
// console.log(partition("aaabaaaabaabaaba"));
console.time();
console.log(partition("dddddddddddd"));
// console.log(partition("bbbbbbbbbbbbbbbb"));
console.timeEnd();
for (let i = 2; i <= 6; i++) {
  console.time("" + i);
  for (let j = 0; j < 1000; j++) {
    for (let size = 0; size < 16; size++) {
      let str = "";
      for (let k = 0; k < size; k++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 2));
      }
      partition(str);
    }
  }
  console.timeEnd("" + i);
}
