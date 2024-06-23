export function sumFourDivisors(nums: number[]): number {
  let sum = 0;
  for (const n of nums) {
    const divisors = getFourDivisors(n);
    if (divisors) {
      sum += 1 + divisors[0] + divisors[1] + n;
    }
  }
  return sum;
}

function getFourDivisors(n: number): number[] | null {
  if (n <= 5) {
    return null;
  }

  const divisors = [];
  const half = n >> 1;

  if (!(n & 1)) {
    divisors.push(2, half);

    if (!(half & 1)) {
      return null;
    }
  }

  for (let i = 3; i < half; i++) {
    if (n % i === 0) {
      if (divisors.length < 2) {
        divisors.push(i);
      } else {
        divisors.length = 0;
        break;
      }
    }
  }

  return divisors.length === 2 ? divisors : null;
}
