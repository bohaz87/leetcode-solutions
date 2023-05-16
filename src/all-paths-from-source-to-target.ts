interface INode {
  from: number[];
  cache?: number[][];
}

function allPathsSourceTarget(graph: number[][]): number[][] {
  const nodes: INode[] = [];
  for (let i = 0; i < graph.length; i++) {
    if (!nodes[i]) {
      nodes[i] = { from: [] };
    }
    for (const j of graph[i]) {
      if (!nodes[j]) {
        nodes[j] = { from: [i] };
      } else {
        nodes[j].from.push(i);
      }
    }
  }

  function _allPathsSourceTarget(nodexIndex: number): number[][] {
    if (nodes[nodexIndex].cache) {
      return nodes[nodexIndex].cache as number[][];
    }
    const paths = nodes[nodexIndex].from.reduce((ret, ni) => {
      if (ni === 0) {
        ret.push([0, nodexIndex]);
      } else {
        _allPathsSourceTarget(ni).forEach((p) => {
          ret.push([...p, nodexIndex]);
        });
      }
      return ret;
    }, [] as number[][]);
    nodes[nodexIndex].cache = paths;
    return paths;
  }

  return _allPathsSourceTarget(graph.length - 1);
}

console.log(allPathsSourceTarget([[1, 2], [3], [3], []]));
console.log(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]));
