import TreeNode from "./utils/btree";
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }

  /**
   * @type {Map<number, number[]>}
   */
  const levels = new Map();

  /**
   *
   * @param {TreeNode} node
   * @param {number} depth
   */
  function _travel(node, depth) {
    if (!levels.get(depth)) {
      levels.set(depth, []);
    }
    levels.get(depth).push(node.val);
    if (node.left) {
      _travel(node.left, depth + 1);
    }
    if (node.right) {
      _travel(node.right, depth + 1);
    }
  }

  _travel(root, 0);

  const arr = [];
  for (const [key, value] of levels.entries()) {
    arr[key] = value;
  }
  return arr.reverse();
};

console.log(
  levelOrderBottom(TreeNode.fromArray([3, 9, 20, null, null, 15, 7]))
);
