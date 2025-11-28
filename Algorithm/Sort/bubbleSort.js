// time complexity: O(n^2)
// space complexity: O(1)
// stable
function bubbleSort(arr) {
  let n = arr.length;
  // outer loop controls bubble times
  for (let i = 0; i < n - 1; i++) {
    // for each time scan through the array from start to end, set swapped to false
    let swapped = false;
    // inner loop controls comparison times
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    // after inner loop, determine if swap occured
    // if swap did not happen, the array is sorted
    if (!swapped) {
      break;
    }
  }
}

let arr = [5, 3, 8, 4, 2];
bubbleSort(arr);
console.log(arr);
