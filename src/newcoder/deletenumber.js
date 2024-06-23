import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", function (line) {
  console.log(remove(Number(line)));
});

function remove(n) {
  const head = { index: 0, next: null };
  let node = head;
  for (let i = 1; i < n; i++) {
    const current = { index: i, next: null };
    node.next = current;
    node = current;
  }
  node.next = head;

  let pre = node;
  node = head;
  let i = 0;
  while (node !== node.next) {
    if (i === 2) {
      pre.next = node.next;
      node = node.next;
      i = 0;
    } else {
      pre = node;
      node = node.next;
      i++;
    }
  }
  return node.index;
}
