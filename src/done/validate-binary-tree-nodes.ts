interface BNode {
  parent: BNode[];
  left?: BNode;
  right?: BNode;
  value: number;
}

function validateBinaryTreeNodes2(
  n: number,
  leftChild: number[],
  rightChild: number[]
): boolean {
  const nodes: BNode[] = [];

  for (let i = 0; i < n; i++) {
    nodes.push({ value: i, parent: [] });
  }

  for (let i = 0; i < n; i++) {
    const currentNode = nodes[i];
    if (leftChild[i] !== -1) {
      currentNode.left = nodes[leftChild[i]];
      nodes[leftChild[i]].parent.push(currentNode);
    }
    if (rightChild[i] !== -1) {
      currentNode.right = nodes[rightChild[i]];
      nodes[rightChild[i]].parent.push(currentNode);
    }
  }

  const roots: BNode[] = [];
  for (let i = 0; i < n; i++) {
    const currentNode = nodes[i];
    if (currentNode.parent.length === 0) {
      roots.push(currentNode);
      if (roots.length > 1) {
        return false;
      }
    } else if (currentNode.parent.length > 1) {
      return false;
    }
  }

  if (roots.length !== 1) {
    return false;
  }

  const nextNodes: BNode[] = [roots[0]];
  for (let i = 0; i < n; i++) {
    const currentNode = nextNodes[i];
    if (!currentNode) {
      return false;
    }
    if (currentNode.left) {
      nextNodes.push(currentNode.left);
    }
    if (currentNode.right) {
      nextNodes.push(currentNode.right);
    }
  }

  return nextNodes.length === n;
}
