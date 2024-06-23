import TreeNode from "./btree";

describe("tree node", () => {
  test("from array", () => {
    const root = TreeNode.fromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
    expect(root.val).toBe(3);
    expect(root.left?.val).toBe(5);
    expect(root.right?.val).toBe(1);

    expect(root.left?.left?.val).toBe(6);
    expect(root.left?.right?.val).toBe(2);

    expect(root.right?.left?.val).toBe(0);
    expect(root.right?.right?.val).toBe(8);

    expect(root.left?.left?.left).toBe(null);
    expect(root.left?.left?.right).toBe(null);

    expect(root.left?.right?.left?.val).toBe(7);
    expect(root.left?.right?.right?.val).toBe(4);
  });
});
