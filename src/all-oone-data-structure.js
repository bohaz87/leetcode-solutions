const AllOne = function () {
  this.data = [];
  this.keyIndex = {};
};

/**
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
  // console.log("inc", key);
  let index = this.keyIndex[key];
  if (index >= 0) {
    const obj = this.data[index];
    obj.val++;

    while (index - 1 >= 0) {
      if (this.data[index - 1].val < obj.val) {
        const pre = this.data[index - 1];
        this.data[index - 1] = obj;
        this.data[index] = pre;

        this.keyIndex[pre.key] = index;
        this.keyIndex[obj.key] = index - 1;
      } else {
        break;
      }
      index--;
    }
  } else {
    this.data.push({ key, val: 1 });
    this.keyIndex[key] = this.data.length - 1;
  }
};

/**
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
  // console.log("dec", key);
  let index = this.keyIndex[key];
  if (index >= 0) {
    const obj = this.data[index];
    obj.val--;

    if (obj.val === 0) {
      this.data.splice(index, 1);
      delete this.keyIndex[key];

      while (index < this.data.length) {
        this.keyIndex[this.data[index].key]--;
        index++;
      }
    } else {
      while (index + 1 < this.data.length) {
        const next = this.data[index + 1];
        if (obj.val < next.val) {
          this.data[index + 1] = obj;
          this.data[index] = next;

          this.keyIndex[obj.key] = index + 1;
          this.keyIndex[next.key] = index;
        } else {
          break;
        }
      }
    }
  }
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
  return this.data[0] ? this.data[0].key : "";
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
  const len = this.data.length;
  return this.data[len - 1] ? this.data[len - 1].key : "";
};

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

function drive(arr1, arr2) {
  const o = new AllOne(arr2[0]);
  console.log(o);
  for (let i = 1; i < arr1.length; i++) {
    console.log(o[arr1[i]](...arr2[i]));
  }
}
drive(
  [
    "AllOne",
    "inc",
    "inc",
    "inc",
    "inc",
    "inc",
    "inc",
    "dec",
    "dec",
    "getMinKey",
    "dec",
    "getMaxKey",
    "getMinKey",
  ],
  [
    [],
    ["a"],
    ["b"],
    ["b"],
    ["c"],
    ["c"],
    ["c"],
    ["b"],
    ["b"],
    [],
    ["a"],
    [],
    [],
  ]
);
