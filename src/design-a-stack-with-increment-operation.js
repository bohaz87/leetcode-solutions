export class CustomStack {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.data = [];
  }

  push(x) {
    if (this.data.length !== this.maxSize) {
      this.data.push(x);
    }
  }

  pop() {
    return this.data.pop() || -1;
  }

  increment(k, val) {
    for (let i = 0, len = this.data.length; i < k && i < len; i++) {
      this.data[i] += val;
    }
  }
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
