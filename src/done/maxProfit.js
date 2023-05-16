var maxProfit = function (prices) {
  let lastMin  = Number.MAX_SAFE_INTEGER
  let lastMax = Number.MIN_SAFE_INTEGER
  let max = 0

  for (let i = 0, len = prices.length; i < len; i++) {
    const current = prices[i];

    if (current < lastMin) {
      lastMin = current
      lastMax = current + max
    } else if (current > lastMax) {
      max = current - lastMin
      lastMax = current
    }
  }

  return max;
};

export default maxProfit;
