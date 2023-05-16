"use strict";
function numMovesStones(a, b, c) {
    const [x, y, z] = [a, b, c].sort((a, b) => a - b);
    const max = y - x - 1 + z - y - 1;
    let min = 0;
    if (x + 1 === y && y + 1 === z) {
        min = 0;
    }
    else if (z - y <= 2 || y - x <= 2) {
        min = 1;
    }
    else {
        min = 2;
    }
    return [min, max];
}
console.log(numMovesStones(1, 2, 5));
console.log(numMovesStones(4, 3, 2));
console.log(numMovesStones(3, 5, 1));
