/**
 * @param {string} s
 * @return {number}
 */
const findTheLongestSubstring = function (s) {
  const indexMap = { a: [], e: [], i: [], o: [], u: [] };
  const reg = /[aeiou]/;

  for (let i = 0, len = s.length; i < len; i++) {
    const ch = s[i];
    if (reg.test(s[i])) {
      indexMap[ch].push(i);
    }
  }

  let maxLen = 0;
  function findMax(start, end) {
    if (end - start + 1 < maxLen || start > end) {
      return 0;
    } else if (start === end) {
      return s[start] && reg.test(s[start]) ? 0 : 1;
    }

    for (const key in indexMap) {
      const validIndexes = [];
      for (const index of indexMap[key]) {
        if (index >= start && index <= end) {
          validIndexes.push(index);
        } else if (index > end) {
          break;
        }
      }
      if (validIndexes.length % 2 !== 0) {
        if (validIndexes.length === 1) {
          maxLen = Math.max(
            maxLen,
            findMax(start, validIndexes[0] - 1),
            findMax(validIndexes[0] + 1, end)
          );
          return maxLen;
        } else {
          maxLen = Math.max(
            maxLen,
            findMax(start, validIndexes[0] - 1),
            findMax(validIndexes[0] + 1, end),
            findMax(start, validIndexes[validIndexes.length - 1] - 1),
            findMax(validIndexes[validIndexes.length - 1] + 1, end)
          );
          return maxLen;
        }
      }
    }

    maxLen = Math.max(maxLen, end - start + 1);
    return maxLen;
  }

  return findMax(0, s.length - 1);
};

console.log(findTheLongestSubstring("eleetminicoworoep"), 13);
// console.log(findTheLongestSubstring("a"), 0);
// console.log(findTheLongestSubstring("b"), 1);
// console.log(findTheLongestSubstring("ad"), 1);
// console.log(findTheLongestSubstring("aad"), 3);
// console.log(findTheLongestSubstring("aadda"), 4);
// console.log(findTheLongestSubstring("aeiouaeiouadd"), 12);
// console.log(findTheLongestSubstring("eleetminicoworoep"), 13);
// console.log(findTheLongestSubstring("leetcodeisgreat"), 5);
// console.log(findTheLongestSubstring("bcbcbc"), 6);

console.log(
  findTheLongestSubstring(
    "iiouuaiauaeeeeeioiooaiauaeeeiiauouuiuuoeiuiuieooeiaoaauieiioaaueaoouaiuooauuuaueuiaieoioioauiiouiiiaiuoeioeeoaoioooiaaueaaeieouaeiaueiouiiuuuiieueoeoaiiieieuoaeuiaeoioeiuoaeieiiuuuao"
  )
);
// console.log(
//   findTheLongestSubstring(
//     "tyrwpvlifrgjghlcicyocusukhmjbkfkzsjhkdrtsztchhazhmcircxcauajyzlppedqyzkcqvffyeekjdwqtjegerxbyktzvrxwgfjnrfbwvhiycvoznriroroamkfipazunsabwlseseeiimsmftchpafqkquovuxhhkpvphwnkrtxuiuhbcyqulfqyzgjjwjrlfwwxotcdtqsmfeingsxyzbpvmwulmqfrxbqcziudixceytvvwcohmznmfkoetpgdntrndvjihmxragqosaauthigfjergijsyivozzfrlpndygsmgjzdzadsxarjvyxuecqlszjnqvlyqkadowoljrmkzxvspdummgraiutxxxqgotqnxwjwfotvqglqavmsnmktsxwxcpxhuujuanxueuymzifycytalizwnvrjeoipfoqbiqdxsnclcvoafqwfwcmuwitjgqghkiccwqvloqrxbfjuxwriltxhmrmfpzitkwhitwhvatmknyhzigcuxfsosxetioqfeyewoljymhdwgwvjcdhmkpdfbbztaygvbpwqxtokvidtwfdhmhpomyfhhjorsmgowikpsdgcbazapkmsjgmfyuezaamevrbsmiecoujabrbqebiydncgapuexivgvomkuiiuuhhbszsflntwruqblrnrgwrnvcwixtxycifdebgnbbucqpqldkberbovemywoaxqicizkcjbmbxikxeizmzdvjdnhqrgkkqzmspdeuoqrxswqrajxfglmqkdnlescbjzurknjklikxxqqaqdekxkzkscoipolxmcszbebqpsizhwsxklzulmjotkrqfaeivhsedfynxtbzdrviwdgicusqucczgufqnaslpwzjhgtphnovlrgz"
//   )
// );
