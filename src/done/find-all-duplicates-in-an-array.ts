function findDuplicates(nums: number[]): number[] {
  const duplicates: number[] = [];
  const marks: boolean[] = Array(nums.length);
  nums.forEach((n) => {
    if (marks[n]) {
      duplicates.push(n);
    } else {
      marks[n] = true;
    }
  });
  return duplicates;
}

console.log(findDuplicates([1, 1, 2]));
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]));
