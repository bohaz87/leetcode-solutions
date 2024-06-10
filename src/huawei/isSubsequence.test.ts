/**
 *
 * https://www.nowcoder.com/questionTerminal/5382ff24fbf34a858b15f93e2bd85307
 */

import { table } from "console";
import exp from "constants";

describe("isSub", () => {
  test("work", () => {
    expect(isSubsequence("abc", "ahbgdc")).toBe(true);
    expect(isSubsequence("axc", "ahbgdc")).toBe(false);
    expect(isSubsequence("abcd", "aaaaaaaaabbbbbbbbcccccccccdddddddd")).toBe(
      true
    );
    expect(
      isSubsequence(
        "abcde",
        "aaaaaaaaabbbbbbbbcccccccccddddddddfffffffffffffggggg"
      )
    ).toBe(false);
    expect(
      isSubsequence(
        "rjufvjafbxnbgriwgokdgqdqewn",
        "mjmqqjrmzkvhxlyruonekhhofpzzslupzojfuoztvzmmqvmlhgqxehojfowtrinbatjujaxekbcydldglkbxsqbbnrkhfdnpfbuaktupfftiljwpgglkjqunvithzlzpgikixqeuimmtbiskemplcvljqgvlzvnqxgedxqnznddkiujwhdefziydtquoudzxstpjjitmiimbjfgfjikkjycwgnpdxpeppsturjwkgnifinccvqzwlbmgpdaodzptyrjjkbqmgdrftfbwgimsmjpknuqtijrsnwvtytqqvookinzmkkkrkgwafohflvuedssukjgipgmypakhlckvizmqvycvbxhlljzejcaijqnfgobuhuiahtmxfzoplmmjfxtggwwxliplntkfuxjcnzcqsaagahbbneugiocexcfpszzomumfqpaiydssmihdoewahoswhlnpctjmkyufsvjlrflfiktndubnymenlmpyrhjxfdcq"
      )
    ).toBe(false);
  });
});

function isSubsequence(a: string, b: string) {
  if (a === b) return true;
  if (a === "") return true;
  if (a.length > b.length) return false;

  let aIndex = 0;

  for (let i = 0, len = b.length; i < len; i++) {
    if (a[aIndex] === b[i]) {
      aIndex++;

      if (aIndex === a.length) return true;
    }

    if (b.length - i < a.length - aIndex) {
      return false;
    }
  }

  return false;
}
