"use strict";
function maximumUnits(boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]);
    let unitsCount = 0;
    let boxTypeIndex = 0;
    for (let currentBoxCount = 0; currentBoxCount < truckSize && boxTypeIndex < boxTypes.length;) {
        const [boxCount, unitPerBox] = boxTypes[boxTypeIndex];
        if (currentBoxCount + boxCount < truckSize) {
            unitsCount += boxCount * unitPerBox;
            boxTypeIndex++;
            currentBoxCount += boxCount;
        }
        else {
            unitsCount += (truckSize - currentBoxCount) * unitPerBox;
            break;
        }
    }
    return unitsCount;
}
console.log(maximumUnits([
    [1, 3],
    [2, 2],
    [3, 1],
], 4), 8);
console.log(maximumUnits([
    [5, 10],
    [2, 5],
    [4, 7],
    [3, 9],
], 10), 91);
console.log(maximumUnits([
    [1, 3],
    [5, 5],
    [2, 5],
    [4, 2],
    [4, 1],
    [3, 1],
    [2, 2],
    [1, 3],
    [2, 5],
    [3, 2],
], 10), 10);
