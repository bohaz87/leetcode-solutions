"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reorderList = function (head) {
    const nodes = [];
    while (head) {
        nodes.push(head);
        head = head.next;
    }
    function* getIndex() {
        let i = 0;
        let j = nodes.length - 1;
        while (i < j) {
            yield i;
            i++;
            yield j;
            j--;
        }
        if (i === j)
            yield i;
    }
    const it = getIndex();
    let ir = it.next();
    console.log(ir.value);
    if (!ir.done) {
        head = nodes[ir.value];
        ir = it.next();
        console.log(ir.value);
    }
    while (!ir.done) {
        head.next = nodes[ir.value];
        head = head.next;
        ir = it.next();
        console.log(ir.value);
    }
    head.next = null;
};
exports.default = reorderList;
