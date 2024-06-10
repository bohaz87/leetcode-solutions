function wordPattern(pattern: string, s: string): boolean {
  const arr = s.split(" ");
  const mapa = new Map();
  const mapb = new Map();

  if (arr.length !== pattern.length) return false;

  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    const str = arr[i];

    if (mapa.has(str) || mapb.has(ch)) {
      if (mapa.get(str) !== ch || mapb.get(ch) !== str) {
        return false;
      }
    } else {
      mapa.set(str, ch);
      mapb.set(ch, str);
    }
  }
  return true;
}

describe("wordPattern", () => {
  it("should work", () => {
    expect(wordPattern("abba", "dog cat cat fish")).toBe(false);
    expect(wordPattern("abba", "dog cat cat dog")).toBe(true);
  });
});
