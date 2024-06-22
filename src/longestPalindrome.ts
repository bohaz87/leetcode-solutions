export function longestPalindrome(str: string): string {
  const len = str.length;
  if (len === 0 || len === 1) return str;

  let maxSub = str[0];

  for (let i = 0; i < len; i++) {
    if (i + 1 < len && str[i] === str[i + 1]) {
      let currentSub = str[i] + str[i + 1];
      let [a, b] = [i - 1, i + 2];
      while (a >= 0 && b < len && str[a] === str[b]) {
        currentSub = str[a] + currentSub + str[b];
        a--;
        b++;
      }
      maxSub = maxSub.length >= currentSub.length ? maxSub : currentSub;
    }
    if (i - 1 >= 0 && i + 1 < len && str[i - 1] === str[i + 1]) {
      let currentSub = str[i - 1] + str[i] + str[i + 1];
      let [a, b] = [i - 2, i + 2];
      while (a >= 0 && b < len && str[a] === str[b]) {
        currentSub = str[a] + currentSub + str[b];
        a--;
        b++;
      }
      maxSub = maxSub.length >= currentSub.length ? maxSub : currentSub;
    }
  }

  return maxSub;
}

import { equal } from "assert/strict";
equal(longestPalindrome("ccc"), "ccc");
equal(longestPalindrome("babad"), "bab");
equal(longestPalindrome("cbbd"), "bb");
