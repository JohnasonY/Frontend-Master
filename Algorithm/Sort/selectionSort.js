// time: O(n^2)
// space: O(1)
// unstable
function selectionSort(arr) {
  const n = arr.length;
  // i points to the starting location of the unsorted subarray
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // assume the value in index i is the smallest number
    // inner loop always starts from i+1 to the last one
    // the objective of the inner loop is to find the index of the smallest value 
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}

const arr = [5, 3, 8, 4, 2];
selectionSort(arr);
console.log(arr);
