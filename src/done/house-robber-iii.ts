class TreeNode {
  static fromArray(arg0: (number | null)[]) {
    throw new Error("Method not implemented.");
  }
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function robFromOneNode(node: TreeNode | null): [number, number] {
  if (!node) {
    return [0, 0];
  }

  const leftMoney = robFromOneNode(node?.left);
  const rightMoney = robFromOneNode(node?.right);
  return [
    node?.val + leftMoney[1] + rightMoney[1],
    Math.max(
      leftMoney[0] + rightMoney[0],
      leftMoney[1] + rightMoney[1],
      leftMoney[0] + rightMoney[1],
      leftMoney[1] + rightMoney[0]
    ),
  ];
}

function rob3(root: TreeNode | null): number {
  const [m1, m2] = robFromOneNode(root);
  return m1 > m2 ? m1 : m2;
}

function buildRoot(values: (number | null)[]): TreeNode {
  const mappedValues = values.map((x) => (x === null ? undefined : x));
  const nodes = [new TreeNode(mappedValues[0])];
  let nodeIndex = 0;

  for (let i = 1; i < mappedValues.length; i += 2) {
    const parentNode = nodes[nodeIndex];
    const left = mappedValues[i] ? new TreeNode(mappedValues[i]) : null;
    const right = mappedValues[i + 1]
      ? new TreeNode(mappedValues[i + 1])
      : null;
    parentNode.left = left;
    parentNode.right = right;
    if (left) {
      nodes.push(left);
    }
    if (right) {
      nodes.push(right);
    }
    nodeIndex++;
  }
  // console.log(nodes[0]);
  return nodes[0];
}

console.log(rob3(buildRoot([3, 2, 3, null, 3, null, 1])), 7);

console.log(rob3(buildRoot([3, 4, 5, 1, 3, null, 1])), 9);

console.log(rob3(buildRoot([4, 1, null, 2, null, 3])), 7);
console.log(rob3(buildRoot([4, 1, null, 2, 2, 8, null])), 14);
