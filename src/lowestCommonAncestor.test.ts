import TreeNode from "./utils/btree";

function lowestCommonAncestor(
  root: TreeNode,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  let anc = root;

  function goThrough(node: TreeNode | null): boolean {
    if (node === null) return false;
    const lson = goThrough(node.left);
    const rson = goThrough(node.right);

    if (
      (lson && rson) ||
      node.val === q?.val ||
      (node.val === p?.val && (lson || rson))
    ) {
      anc = node;
    }

    return lson || rson || node.val === q?.val || node.val === p?.val;
  }
  goThrough(root);
  return anc;
}

describe("LowestCommonAncestor", () => {
  it("cae 1", () => {
    const root = TreeNode.fromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    expect(lowestCommonAncestor(root, root.left, root.right)?.val).toBe(3);
  });
  it("case 2", () => {
    const root = TreeNode.fromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    expect(
      lowestCommonAncestor(root, TreeNode.find(root, 5), TreeNode.find(root, 4))
        ?.val
    ).toBe(5);
  });
  it("case 3", () => {
    const root = TreeNode.fromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    expect(
      lowestCommonAncestor(root, TreeNode.find(root, 5), TreeNode.find(root, 1))
        ?.val
    ).toBe(3);
  });
});
