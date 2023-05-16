/**
 * @param {string[]} words
 * @return {string}
 */
const longestWord = function (words) {
  words.sort((a, b) => {
    if (a.length !== b.length) {
      return b.length - a.length;
    } else {
      return a < b ? -1 : 1;
    }
  });
  let smallest = "";
  for (let word of words) {
    if (word.length === 1) {
      return word;
    } else if (includes(word)) {
      return word;
    }
  }

  function includes(word) {
    let wi = words.length - 1;
    for (let i = 1; i < word.length; i++) {
      const sub = word.substr(0, i);
      while (words[wi].length === i && words[wi] !== sub) {
        wi--;
      }
      if (words[wi] === sub) {
        while (words[wi].length === i) {
          wi--;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  return smallest;
};

console.log(longestWord(["w", "wo", "wor", "worl", "world"]));
console.log(
  longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])
);
