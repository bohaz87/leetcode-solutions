/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// const removeZeroSumSublists = function (head) {
//   const arr = [];
//   let node = head;
//   while (node) {
//     if (node.val !== 0) {
//       arr.push(node.val);
//     }

//     if (node.val < 0) {
//       let sum = 0;
//       for (let i = arr.length - 2; i >= 0; i--) {
//         sum += arr[i];
//         if (sum + node.val > 0) {
//           break;
//         } else if (sum + node.val === 0) {
//           arr.splice(i);
//         }
//       }
//     }

//     node = node.next;
//   }
// };

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function arr2List(arr: number[]) {
  let prev = new ListNode(arr[0]);
  const head = prev;

  for (let i = 1; i < arr.length; i++) {
    const n = new ListNode(arr[i]);
    prev.next = n;
    prev = n;
  }
  return head;
}

function removeZeroSumSublists(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  let node: ListNode | null = head;
  let sum = 0;
  const sumMemo = new Map<number, ListNode>();
  const root = new ListNode(0, node);
  sumMemo.set(0, root);

  while (node) {
    const newSum = sum + node.val;
    if (sumMemo.has(newSum)) {
      const n = sumMemo.get(newSum) as ListNode;

      let os = newSum;
      let pn = n;
      while (pn.next !== node) {
        os += (pn.next as ListNode).val;
        sumMemo.delete(os);
        pn = pn.next as ListNode;
      }

      n.next = node.next;
    } else {
      sumMemo.set(newSum, node);
    }

    sum = newSum;
    node = node.next;
  }

  return root.next;
}

const a = arr2List([1, 2, -3, 3, 1]);
console.log(removeZeroSumSublists(a));
console.log(removeZeroSumSublists(arr2List([1, 2, 3, -3, 4])));
console.log(removeZeroSumSublists(arr2List([1, 2, 3, -3, -2])));
console.log(removeZeroSumSublists(arr2List([1, 3, 2, -3, -2, 5, 5, -5, 1])));
