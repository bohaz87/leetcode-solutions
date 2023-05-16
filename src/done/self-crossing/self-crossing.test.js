
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import isSelfCrossing from './self-crossing.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(isSelfCrossing([1,1,2,2,1,1]), true)
console.log(isSelfCrossing([1, 1, 2, 1, 1]), true);
console.log(isSelfCrossing([2, 1, 1, 2]), true);
console.log(isSelfCrossing([1, 2, 3, 4]), false);
console.log(isSelfCrossing([1, 1, 1, 1]), true);
console.log(isSelfCrossing([3, 3, 4, 2, 2]), false);

const dataArr = fs
  .readFileSync(path.join(__dirname, "./data.txt"), {
    encoding: "utf-8",
  })

const nums1 = JSON.parse(dataArr)
console.time()
console.log(isSelfCrossing(nums1));
console.timeEnd()
