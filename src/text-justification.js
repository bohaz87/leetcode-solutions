/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function (words, maxWidth) {
  const res = [];
  let currentWordsLen = 0;
  let currentWords = [];

  for (let word of words) {
    // at least one space between each word
    if (currentWordsLen + word.length + currentWords.length <= maxWidth) {
      currentWords.push(word);
      currentWordsLen += word.length;
    } else {
      const spacesLen = maxWidth - currentWordsLen;
      const spacesBetweenLen =
        currentWords.length > 1
          ? Math.floor(spacesLen / (currentWords.length - 1))
          : 0;
      const extraSpacesLen =
        spacesLen - spacesBetweenLen * (currentWords.length - 1);
      const spaceBetween = "".padEnd(spacesBetweenLen, " ");

      if (extraSpacesLen) {
        // add one extra space to each word, from left to right
        for (let i = 0; i < extraSpacesLen && i < currentWords.length; i++) {
          currentWords[i] += " ";
        }
      }
      res.push(currentWords.join(spaceBetween).padEnd(maxWidth, " "));
      currentWords = [word];
      currentWordsLen = word.length;
    }
  }

  // last line
  res.push(currentWords.join(" ").padEnd(maxWidth, " "));
  res.forEach((i) => console.log("|%s|", i));
  return res;
};

fullJustify(
  [
    "Science",
    "is",
    "what",
    "we",
    "understand",
    "well",
    "enough",
    "to",
    "explain",
    "to",
    "a",
    "computer.",
    "Art",
    "is",
    "everything",
    "else",
    "we",
    "do",
  ],
  20
);
// fullJustify(
//   ["This", "is", "an", "example", "of", "text", "justification."],
//   16
// );
// fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16);
// fullJustify(
//   [
//     "Science",
//     "is",
//     "what",
//     "we",
//     "understand",
//     "well",
//     "enough",
//     "to",
//     "explain",
//     "to",
//     "a",
//     "computer.",
//     "Art",
//     "is",
//     "everything",
//     "else",
//     "we",
//     "do",
//   ],
//   20
// );
