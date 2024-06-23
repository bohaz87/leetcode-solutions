class MyStr {
  data: string[];
  counts = {} as { [key: string]: number };
  maxLength: number;
  constructor(str: string, maxLength: number) {
    this.data = Array(maxLength);
    this.counts = {};
    for (let i = 0; i < maxLength; i++) {
      const ch = str[i] || "-";
      this.data[i] = ch;
      this.counts[ch] = this.counts[ch] || 0;
      this.counts[ch]++;
    }
    this.maxLength = maxLength;
  }

  push(ch: string) {
    const first = this.data[0];
    if (this.data.length < this.maxLength) {
      this.data.push(ch);
      this.counts[ch] = this.counts[ch] || 0;
      this.counts[ch]++;
    } else {
      this.data.shift();
      this.counts[first]--;
      if (this.counts[first] === 0) {
        delete this.counts[first];
      }

      this.data.push(ch);
      this.counts[ch] = this.counts[ch] || 0;
      this.counts[ch]++;
    }
  }

  equals(str: MyStr) {
    let match = true;
    Object.keys(this.counts).some((ch) => {
      if (this.counts[ch] !== str.counts[ch]) {
        match = false;
        return true;
      }
      return false;
    });
    return match;
  }
}
const findAnagrams = function (s: string, p: string) {
  const plen = p.length;
  const bstr = new MyStr(p, plen);
  const astr = new MyStr("", plen);
  const ret = [];

  for (let i = 0; i < s.length; i++) {
    astr.push(s[i]);
    if (bstr.equals(astr)) {
      ret.push(i - plen + 1);
    }
  }
  return ret;
};

console.log(findAnagrams("abab", "ab"));
// console.log(findAnagrams("cbaebabacd", "abc"));
// console.log(findAnagrams("b" + "a".repeat(100), "a".repeat(10)));
