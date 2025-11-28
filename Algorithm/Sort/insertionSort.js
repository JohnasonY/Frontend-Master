// time: O(n^2)
// space: O(1)
// stable
function insertionSort(arr) {
  // starts from the second element, the current element is the one to be inserted
  // assume the first element is sorted, the first element is the sorted subarray
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]; // the current element to be inserted
    // current compare with the elements in the sorted subarray, find the correct location\
    let j = i - 1; // j: the last index in the sorted subarray
    // move sorted subarray forward
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    // finish while loop
    // the location to be inserted is found
    arr[j + 1] = current;
  }
}

const arr = [5, 3, 8, 4, 2];
insertionSort(arr);
console.log(arr);
