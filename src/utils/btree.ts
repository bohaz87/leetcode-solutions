class TreeNode<T = number> {
  val?: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  static fromArray(arr: [null]): null;
  static fromArray<T>(
    arr: (T | null)[]
  ): (typeof arr)["length"] extends 0 ? null : TreeNode<T>;
  static fromArray<T>(arr: (T | null)[]): TreeNode<T> | null {
    if (arr.length === 0 || arr[0] === null) {
      return null;
    }

    const root = new TreeNode<T>(arr[0]);
    let i = 1;
    const queue = [root];

    function buildTree(node: TreeNode<T>) {
      if (i >= arr.length) return;

      if (arr[i] !== null) {
        node.left = new TreeNode(arr[i] as T);
        queue.push(node.left);
      }
      i++;

      if (arr[i] !== null) {
        node.right = new TreeNode(arr[i] as T);
        queue.push(node.right);
      }
      i++;
    }

    while (queue.length) {
      buildTree(queue.shift() as TreeNode<T>);
    }

    return root;
  }

  static find<T>(root: null | TreeNode<T>, val: T): TreeNode<T> | null {
    if (root === null) return null;

    if (root.val === val) {
      return root;
    }
    return this.find(root.left, val) || this.find(root.right, val);
  }

  print(): void {
    let str = "";
    function _print(node: TreeNode<T>, depth = 0, prefix: string) {
      str += (" ".repeat(depth), prefix, node.val) + "\r\n";
      if (node.left) {
        _print(node.left, depth + 1, "-");
      }
      if (node.right) {
        _print(node.right, depth + 1, "+");
      }
    }
    _print(this, 0, "");
    console.log(str);
  }
}

export default TreeNode;
