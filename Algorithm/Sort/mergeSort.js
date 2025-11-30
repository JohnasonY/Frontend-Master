// time: O(nlogn)
// space: O(n)
// stable

// conquer
function merge(left, right) {
  let result = []; // store sorted elements
  let leftIndex = 0, // left array starting index
    rightIndex = 0; // right array starting index
  while (leftIndex < left.length && rightIndex < right.length) {
    // determine whether left array value or right array value smaller
    if (left[leftIndex] <= right[rightIndex]) {
      // left array value smaller
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      // right array value smaller
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // left or right array ran out of elements
  // push the rest of another array's elements into result
  if (leftIndex < left.length) {
    // left array has remaining elements
    result = result.concat(left.slice(leftIndex));
  }

  if (rightIndex < right.length) {
    // right array has remaining elements
    result = result.concat(right.slice(rightIndex));
  }

  return result;
}

// divide
function mergeSort(arr) {
  const n = arr.length;
  // base case
  if (n < 2) {
    // the array can not be divided into smaller arrays
    return arr;
  }
  // split array into arrays with half of length
  const mid = Math.floor(n / 2);
  // left half
  const left = mergeSort(arr.slice(0, mid));
  // right half
  const right = mergeSort(arr.slice(mid));
  // merge left half and right half
  return merge(left, right);
}

const arr = [38, 27, 43, 3, 9, 82, 10];
const sortedArr = mergeSort(arr);
console.log(sortedArr);
