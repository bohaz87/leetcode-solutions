const isHappy = function (n: number): boolean {
  let sum = n;

  while (sum < 10) {
    sum = sum
      .toString()
      .split("")
      .reduce((s: number, x: string) => s + Number(x) ** 2, 0);
  }

  return sum === 1 || sum === 7;
};

export default isHappy;
