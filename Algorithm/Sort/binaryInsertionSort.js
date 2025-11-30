// time: O(n^2)
// space: O(1)
// stable
function binaryInsertionSort(arr) {
  // starts from the second element, because the first element is in the sorted subarray
  for (let i = 1; i < arr.length - 1; i++) {
    let current = arr[i]; // current element to be inserted
    let left = 0,
      right = i - 1;

    // binary search to find the correct insertion location
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < current) {
        // the correct location is on the right side of mid
        left = mid + 1;
      } else {
        // the correct location is on the left side of mid
        right = mid - 1;
      }
    }
    // left > right
    // the correct location is found: left

    // right shift elements from left to i-1 by 1
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    // insert
    arr[left] = current;
  }
}

const arr = [7, 20, 27, 36, 55, 60, 28, 36, 67, 44, 16];
binaryInsertionSort(arr);
console.log(arr);
