// create an array
const arr1 = [1, 2, 3];
// create an array in the length of 3
const arr2 = new Array(3);
// create an array with elements 1, 2, 3
const arr3 = new Array(1, 2, 3);
// [3]
const arr4 = Array.of(3);
// [1, 2, 3]
const arr5 = Array.of(1, 2, 3);

arr1.push(4); // [1, 2, 3, 4]
arr1.push(5, 6); // [1, 2, 3, 4, 5, 6]
const lastItem = arr1.pop(); // 6   [1, 2, 3, 4, 5]

arr1.unshift(0); // [0, 1, 2, 3, 4, 5]
const firstItem = arr1.shift(); // 0    [1, 2, 3, 4, 5]

console.log(arr1);

// splice: can delete and add elements
const deletedElem = arr1.splice(0, 2);
console.log(deletedElem); // [1, 2]
console.log(arr1); // [3, 4, 5]

arr1.splice(0, 0, 1, 2);
console.log(arr1); // [1, 2, 3, 4, 5]

// slice: return a portion of an array
const sliceArr1 = arr1.slice(1, 4);
console.log(sliceArr1); // [2, 3, 4]
console.log(arr1); // [1, 2, 3, 4, 5]

// indexOf: get the first index of the given element
console.log(arr1.indexOf(3)); // 2

// includes: search if an element in the array
console.log(arr1.includes(6));  // false
