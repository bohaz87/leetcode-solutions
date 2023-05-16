/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
const validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  const nodes = new Array(n);

  for (let i = 0; i < n; i++) {
    const node = (nodes[i] ??= {});
    const lvalue = leftChild[i];
    const rvalue = rightChild[i];

    let lc;
    if (lvalue !== -1) {
      lc = nodes[lvalue] ??= {};
    }
    let rc;
    if (rvalue !== -1) {
      rc = nodes[rvalue] ??= {};
    }

    if (
      node.left !== undefined ||
      node.right !== undefined ||
      lc?.parent !== undefined ||
      rc?.parent !== undefined
    ) {
      return false;
    }

    if (lc) {
      node.left = lvalue;
      lc.parent = i;
    }

    if (rc) {
      node.right = rvalue;
      rc.parent = i;
    }
  }

  let root;
  for (const node of nodes) {
    if (node.parent === undefined) {
      if (!root) {
        root = node;
      } else {
        return false;
      }
    }
  }

  function countNode(node) {
    if (!node) return 0;
    const stack = [node];
    let count = 0;
    do {
      node = stack.pop();
      count++;

      if (node.left !== undefined) {
        stack.push(nodes[node.left]);
      }
      if (node.right !== undefined) {
        stack.push(nodes[node.right]);
      }
    } while (stack.length);

    return count;
  }
  return countNode(root) === n;
};

console.log(validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1]), true);
console.log(validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1]), false);
console.log(validateBinaryTreeNodes(2, [1, 0], [-1, -1]), false);
console.log(validateBinaryTreeNodes(4, [3, -1, 1, -1], [-1, -1, 0, -1]), true);
console.log(validateBinaryTreeNodes(4, [1, 0, 3, -1], [-1, -1, -1, -1]), false);
console.log(
  validateBinaryTreeNodes(5, [1, 2, 3, 0, -1], [-1, -1, -1, -1, -1]),
  false
);
