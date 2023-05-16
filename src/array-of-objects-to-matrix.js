const jsonToMatrix = function (arr) {
  const matrix = [];

  const keys = new Set();
  for (const item of arr) {
    getKey(item).forEach((key) => keys.add(key));
  }

  const sortedKeys = [...keys].sort();
  matrix[0] = [];
  for (const key of sortedKeys) {
    matrix[0].push(key);
  }

  for (let i = 0; i < arr.length; i++) {
    matrix.push([]);
  }

  for (const key of sortedKeys) {
    for (const [index, item] of arr.entries()) {
      matrix[index + 1].push(getValue(item, key));
    }
  }

  return matrix;
};

function getKey(obj) {
  const keys = new Set();
  if (Array.isArray(obj)) {
    for (const [index, value] of obj.entries()) {
      if (typeof value === "object" && value !== null) {
        getKey(value).forEach((subKey) => {
          keys.add("" + index + "." + subKey);
        });
      } else {
        keys.add("" + index);
      }
    }
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const valueType = typeof value;
      if (valueType === "object" && value !== null) {
        const subKeys = getKey(value);
        subKeys.forEach((subKey) => {
          keys.add(key + "." + subKey);
        });
      } else {
        keys.add(key);
      }
    });
  }
  return keys;
}

function getValue(value, keyString) {
  const keys = keyString.split(".");
  for (const key of keys) {
    value = value[key];
    if (typeof value === "undefined") {
      return "";
    } else if (value === null) {
      return null;
    }
  }

  if (typeof value === "object") {
    return "";
  }
  return value;
}

console.table(getKey({ b: true }));
console.table(jsonToMatrix([{ a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } }]));
console.table(jsonToMatrix([[{ a: null }], [{ b: true }], [{ c: "x" }]]));
console.table(jsonToMatrix([[[[1]]], [[2]], [3]]));
