const maxScoreWords = function (
  words: string[],
  letters: string[],
  scores: number[]
): number {
  const codeA = "a".charCodeAt(0);

  const table: string[] = Array(26).fill("a");
  table.map((ch, i) => String.fromCharCode(codeA + i));

  const tableWithCount = letters.reduce((t, ch) => {
    t[ch] = t[ch] + 1 || 1;
    return t;
  }, {} as Record<string, number>);
  console.log("tableWithCount", tableWithCount);

  const scoreMap = scores.reduce((map, s, i) => {
    map[String.fromCharCode(codeA + i)] = s;
    return map;
  }, {} as Record<string, number>);

  // console.log(scoreMap);

  const wordsWithScore = words
    .map((word) => {
      const score = word
        .split("")
        .reduce((score, char) => score + scoreMap[char], 0);

      return {
        word,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  // console.log(wordsWithScore);

  function checkWord(word: string, table: Record<string, number>) {
    const chars = Array.from(word);
    let match = true;
    chars.forEach((ch) => {
      if (table[ch] >= 1) {
        table[ch]--;
      } else {
        match = false;
      }
    });
    return match;
  }

  function checkWords(words: typeof wordsWithScore) {
    const tableCopy = { ...tableWithCount };
    return !words.some((word) => {
      return !checkWord(word.word, tableCopy);
    });
  }

  function getScore(words: typeof wordsWithScore) {
    return words.reduce((score, word) => {
      score += word.score;
      return score;
    }, 0);
  }

  const all: typeof wordsWithScore[] = [];
  for (let i = wordsWithScore.length; i >= 0; i--) {
    all.push(...Combinatorics(wordsWithScore, i));
  }

  const allWithScore = all
    .map((o) => ({ item: o, score: getScore(o) }))
    .sort((a, b) => b.score - a.score);

  const match = allWithScore.find((item) => checkWords(item.item));

  return match?.score || 0;
};

function Combinatorics<K>(arr: K[], m: number): K[][] {
  const n = arr.length;
  if (m === 1) {
    return arr.map((v) => [v]);
  } else {
    const ret: K[][] = [];
    for (let i = 0; i < n; i++) {
      const copy = arr.slice(i + 1);
      Combinatorics(copy, m - 1).forEach((o) => ret.push([arr[i], ...o]));
    }
    return ret;
  }
}

console.log(Combinatorics([1, 2, 3, 4], 2));

// console.log(
//   maxScoreWords(
//     ["xxxz", "ax", "bx", "cx"],
//     ["z", "a", "b", "c", "x", "x", "x"],
//     [
//       4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,
//       10,
//     ]
//   )
// );

// console.log(
//   maxScoreWords(
//     ["dog", "cat", "dad", "good"],
//     ["a", "a", "c", "d", "d", "d", "g", "o", "o"],
//     [
//       1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0,
//     ]
//   )
// );

console.log(
  maxScoreWords(
    ["da", "ac", "aba", "abcc", "cadc"],
    ["a", "a", "a", "a", "b", "c", "c", "c", "d", "d", "d"],
    [
      3, 7, 9, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]
  ),
  49
);
