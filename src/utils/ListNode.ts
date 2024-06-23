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

  clone(): ListNode<T> {
    const head = new ListNode(this.val);
    let node1 = this.next;
    let node2 = head;

    while (node1) {
      node2.next = new ListNode(node1.val);
      node1 = node1.next;
      node2 = node2.next;
    }
    return head;
  }

  toString(): string {
    const arr = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let head: ListNode<T> | null = this;
    while (head) {
      arr.push(head.val);
      head = head.next;
    }

    return `ListNode [${arr.join(", ")}]`;
  }

  static delete<T>(head: ListNode<T>, val: T): ListNode<T> | null {
    let prev = head;
    let curr = head.next;

    if (prev.val === val) {
      prev.next = null;
      return curr;
    }

    while (curr) {
      if (curr.val === val) {
        prev.next = curr.next;
        curr.next = null;
        break;
      } else {
        prev = curr;
        curr = curr.next;
      }
    }

    return head;
  }

  static reverse(head: null): null;
  static reverse<T>(head: ListNode<T>): ListNode<T>;
  static reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;

    let pre = null;
    let curr: ListNode<T> | null = head;
    let next: ListNode<T> | null = head.next;

    while (curr) {
      curr.next = pre;
      pre = curr;
      curr = next;
      next = curr ? curr.next : null;
    }

    return pre as ListNode<T>;
  }

  /**
   * get the middle node of the list
   *
   *
   * [1, 2, 3] would return [2, 3]
   * [1, 2, 3, 4] would return [3, 4]
   * @param {boolean} [includeMiddle=false]
   * @returns {ListNode|null}
   */
  static getMiddleNode<T>(head: ListNode<T>): ListNode<T> {
    let slow: ListNode<T> = head;
    let fast: ListNode<T> | null = head.next;

    while (slow && fast) {
      slow = slow.next as ListNode<T>;
      fast = fast.next?.next || null;
    }

    return slow as ListNode<T>;
  }

  static merge<T>(list1: ListNode<T>, list2: ListNode<T>): ListNode<T> {
    let node1: ListNode<T> | null = list1;
    let node2: ListNode<T> | null = list2;

    while (node1 && node2) {
      const n1: ListNode<T> | null = node1.next;
      node1.next = node2;
      node1 = n1;

      const n2: ListNode<T> | null = node2.next;
      if (node1) node2.next = node1;
      node2 = n2;
    }

    return list1 as ListNode<T>;
  }

  static getKthFromEnd<T>(
    head: ListNode<T> | null,
    k: number
  ): ListNode<T> | null {
    if (!head || k === 0) return null;

    if (k > 0) return ListNode.getKthFromStart(head, -k);

    let slow: ListNode<T> | null = head,
      fast: ListNode<T> | null = head;

    while (k--) {
      fast = fast ? fast.next : null;
    }

    while (fast) {
      slow = slow ? slow.next : null;
      fast = fast.next;
    }

    return slow;
  }

  /**
   * get the Kth node, start from 1, if K > list size, return null
   * @param {ListNode} head
   * @param {number} k start from 1
   * @returns {ListNode|null}
   */
  static getKthFromStart<T>(
    head: ListNode<T> | null,
    k: number
  ): ListNode<T> | null {
    if (!head || k === 0) return null;

    if (k < 0) {
      return ListNode.getKthFromEnd(head, -k);
    }

    while (--k && head) {
      head = head.next;
    }

    return head;
  }

  static reverseBetween(head: null, left: number, right: number): null;
  static reverseBetween<T>(
    head: ListNode<T>,
    left: number,
    right: number
  ): ListNode<T>;
  static reverseBetween<T>(
    head: ListNode<T> | null,
    left: number,
    right: number
  ): ListNode<T> | null {
    if (left <= 0) left = 1;
    if (right <= left || !head) return head;
    // console.log("--head", head.toString());

    // head, ...nodeBeforeLeft leftNode... rightNode nodeAfterRight...

    const nodeBeforeLeft = ListNode.getKthFromStart(head, left - 1);
    // left > list size
    if (left > 1 && !nodeBeforeLeft) return head;

    let leftNode = nodeBeforeLeft ? nodeBeforeLeft.next : head;
    const rightNode = ListNode.getKthFromStart(head, right);

    if (!leftNode) {
      return head;
    }

    nodeBeforeLeft && (nodeBeforeLeft.next = null);
    const nodeAfterRight = rightNode?.next || null;
    rightNode && (rightNode.next = null);

    const oldLeftNode = leftNode;
    leftNode = ListNode.reverse(leftNode);
    oldLeftNode.next = nodeAfterRight;

    if (nodeBeforeLeft) {
      nodeBeforeLeft.next = leftNode;
      return head;
    } else {
      return leftNode;
    }
  }
}
