// iteration implementation
function binarySearchIt(arr, target) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    // can continue to search
    let mid = Math.floor((left + right) / 2);
    // compare arr[mid] with target
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      // target on the left side
      right = mid - 1;
    } else {
      // target on the right side
      left = mid + 1;
    }
  }
  // left > right, not found
  return -1;
}

const arr = [4, 7, 9, 11, 20, 24, 30, 41];
const target1 = 30;
const target2 = 70;

// console.log(binarySearchIt(arr, target1));

// recursion implementation
function binarySearchRe(arr, target, left = 0, right = arr.length - 1) {
  //base case
  if (left > right) {
    return -1;
  }
  const mid = Math.floor((left + right) / 2);
  // compare arr[mid] with target
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] > target) {
    // target on the left
    return binarySearchRe(arr, target, left, mid - 1);
  } else {
    // target on the right
    return binarySearchRe(arr, target, mid + 1, right);
  }
}

console.log(binarySearchRe(arr, target2));
