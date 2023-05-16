class WordNode {
  word: string;
  minDepth: number;
  siblings: WordNode[];

  constructor(word: string) {
    this.word = word;
    this.minDepth = NaN;
    this.siblings = [];
  }

  getDepth(depth = 1, endWord: string) {
    let end = 0;
    const nodes: WordNode[][] = [[this]];
    for (let i = 0; i < nodes.length; i++) {
      const arr = nodes[i];
      for (let j = 0; j < arr.length; j++) {
        const n = arr[j];
        if (!n.minDepth) {
          n.minDepth = depth + i;
          if (n.word === endWord) {
            end = depth + i;
            break;
          }
          nodes[i + 1] = nodes[i + 1] || [];
          nodes[i + 1].push(...n.siblings);
        }
      }
      if (end) {
        break;
      }
    }
    return end;
  }
}

function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  if (wordList.length === 0) {
    return 0;
  }

  const nodes = [];
  const head = new WordNode(beginWord);
  nodes.push(head);
  wordList.forEach((word) => {
    const n = new WordNode(word);
    if (word !== beginWord) nodes.push(n);
  });

  // if (!endNode) {
  //   return 0;
  // } else if (beginWord === endWord) {
  //   return 1;
  // }

  for (let i = 0, len = nodes.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (hitAble(nodes[i].word, nodes[j].word)) {
        nodes[i].siblings.push(nodes[j]);
        nodes[j].siblings.push(nodes[i]);
      }
    }
  }

  return head.getDepth(1, endWord);
}

function hitAble(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let diffCount = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diffCount++;
    }

    if (diffCount >= 2) {
      return false;
    }
  }

  return diffCount === 1;
}

console.log(ladderLength("hot", "dog", ["hot", "dog"]));
console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);

console.log(
  ladderLength("qa", "sq", [
    "si",
    "go",
    "se",
    "cm",
    "so",
    "ph",
    "mt",
    "db",
    "mb",
    "sb",
    "kr",
    "ln",
    "tm",
    "le",
    "av",
    "sm",
    "ar",
    "ci",
    "ca",
    "br",
    "ti",
    "ba",
    "to",
    "ra",
    "fa",
    "yo",
    "ow",
    "sn",
    "ya",
    "cr",
    "po",
    "fe",
    "ho",
    "ma",
    "re",
    "or",
    "rn",
    "au",
    "ur",
    "rh",
    "sr",
    "tc",
    "lt",
    "lo",
    "as",
    "fr",
    "nb",
    "yb",
    "if",
    "pb",
    "ge",
    "th",
    "pm",
    "rb",
    "sh",
    "co",
    "ga",
    "li",
    "ha",
    "hz",
    "no",
    "bi",
    "di",
    "hi",
    "qa",
    "pi",
    "os",
    "uh",
    "wm",
    "an",
    "me",
    "mo",
    "na",
    "la",
    "st",
    "er",
    "sc",
    "ne",
    "mn",
    "mi",
    "am",
    "ex",
    "pt",
    "io",
    "be",
    "fm",
    "ta",
    "tb",
    "ni",
    "mr",
    "pa",
    "he",
    "lr",
    "sq",
    "ye",
  ])
);
