function diameterOfBinaryTree(root) {
  if (!root) return 0;
  let diameter = 0;
  const dfs = (node) => {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    diameter = Math.max(diameter, left + right);
    return Math.max(left, right) + 1;
  };
  dfs(root);
  return diameter;
}
