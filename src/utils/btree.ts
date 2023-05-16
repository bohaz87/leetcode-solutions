class TreeNode<T = number> {
  val: T | null;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  static fromArray<T>(arr: (T | null)[]): TreeNode<T> | null {
    if (arr.length === 0 || arr[0] === null) {
      return null;
    }

    const root = new TreeNode<T>(arr[0]);
    let i = 1;
    const stack = [root];

    function buildTree(node: TreeNode<T>) {
      if (i >= arr.length) return;

      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i] as T);
      }
      i++;

      if (arr[i] !== null) {
        node.right = new TreeNode(arr[i] as T);
      }
      i++;

      if (node.right) {
        stack.push(node.right);
      }

      if (node.left) {
        stack.push(node.left);
      }
    }

    while (stack.length) {
      buildTree(stack.pop() as TreeNode<T>);
    }

    return root;
  }

  print(): void {
    function _print(node: TreeNode<T>, depth = 0, prefix: string) {
      console.log(" ".repeat(depth), prefix, node.val);
      if (node.left) {
        _print(node.left, depth + 1, "-");
      }
      if (node.right) {
        _print(node.right, depth + 1, "+");
      }
    }
    _print(this, 0, "");
  }
}

export default TreeNode;
