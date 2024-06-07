import MinHeap from "./done/utils/minHeap.js";
/**
 * https://wiki.amoscloud.com/zh/ProgramingPractice/NowCoder/Adecco/Topic0069
 */
function goodFriends(children: number[]): number[] {
  const friends: number[] = new Array(children.length).fill(0);
  type Child = {
    index: number;
    height: number;
  };
  const heap = new MinHeap<Child>((a, b) => a.height - b.height);

  for (const [index, height] of children.entries()) {
    let first = heap.getMin();
    while (first && first.height < height) {
      friends[first.index] = index;
      heap.remove();
      first = heap.getMin();
    }

    heap.insert({
      index,
      height,
    });
  }

  return friends;
}

// 1 2 6 5 5 6 0 0
console.log("friends", goodFriends([123, 124, 125, 121, 119, 122, 126, 123]));

export {};
