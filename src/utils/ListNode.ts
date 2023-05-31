export default class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;

  constructor(val?: T, next?: ListNode<T> | null) {
    this.val = val === undefined ? (0 as unknown as T) : val;
    this.next = next === undefined ? null : next;
  }

  static fromArray<T>(arr: T[]): ListNode<T> | null {
    if (!arr.length) return null;

    const head = new ListNode(arr[0]);
    let node = head;

    for (let i = 1; i < arr.length; i++) {
      node.next = new ListNode(arr[i]);
      node = node.next;
    }

    return head;
  }
}
