import ListNode from "./utils/ListNode";

const head1 = ListNode.fromArray([1, 2, 3, 4, 5]) as ListNode<number>;
console.log(ListNode.reverseBetween(head1.clone(), 2, 4).toString());
// console.log(ListNode.reverseBetween(head1.clone(), 1, 5).toString());
// console.log(ListNode.reverseBetween(head1.clone(), 0, 5).toString());
// console.log(ListNode.reverseBetween(head1.clone(), 0, 6).toString());
// console.log(ListNode.reverseBetween(head1.clone(), 2, 7).toString());
// console.log(ListNode.reverseBetween(head1.clone(), 3, 8).toString());
