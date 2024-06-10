/**
 * @file
 * https://leetcode.cn/circle/discuss/niKSMZ/
 */

describe("splitString", () => {
  it("work", () => {
    expect(splitString(3, "12abc-abCABc-4aB@")).toBe("12abc-abc-ABC-4aB-@");
    expect(splitString(12, "12abc-abCABc-4aB@")).toBe("12abc-abCABc4aB@");
    expect(splitString(4, "12abc-abCABc-4aB@")).toBe("12abc-abCA-bc4a-B@");
    expect(splitString(5, "12abc-abCABc-4aB@")).toBe("12abc-ABCAB-c4ab@");
  });
});

function splitString(n: number, str: string): string {
  let ret = "";
  let afterFirst = false;
  let count = 0;
  let currentWord = "";
  let uppercaseCount = 0;
  let lowercaseCount = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (ch === "-") {
      if (afterFirst) {
        continue;
      } else {
        afterFirst = true;
      }
    } else {
      if (!afterFirst) {
        ret += ch;
      } else {
        currentWord += ch;
        count++;
        if (/[a-z]/.test(ch)) {
          lowercaseCount++;
        } else if (/[A-Z]/.test(ch)) {
          uppercaseCount++;
        }

        if (count === n || i === str.length - 1) {
          if (lowercaseCount > uppercaseCount) {
            currentWord = currentWord.toLowerCase();
          } else if (lowercaseCount < uppercaseCount) {
            currentWord = currentWord.toUpperCase();
          }
          ret += "-" + currentWord;
          count = 0;
          currentWord = "";
          lowercaseCount = 0;
          uppercaseCount = 0;
        }
      }
    }
  }
  return ret;
}
