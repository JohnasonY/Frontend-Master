// time: O(nlogn)
// space: O(logn)
// unstable
function partition(array, left, right) {
  // find a pivot
  // In this example, we take the last element as the pivot
  let pivot = array[right];
  let pivotIndex = right;
  while (left < right) {
    // left keeps moving to the right
    while (left < right && array[left] < pivot) {
      left++;
    }
    // found an elment greater than the pivot
    // right keeps moviing to the left
    while (left < right && array[right] >= pivot) {
      right--;
    }
    // found an element less than the pivot
    // swap the value of left and right
    [array[left], array[right]] = [array[right], array[left]];
  }
  // left >= right
  // swap the value of pivot and the value of left
  [array[left], array[pivotIndex]] = [array[pivotIndex], array[left]];
  return left;
}

function quickSort(array) {
  function QuickSort(array, left, right) {
    // determine if the array can continue spilting into subarrays
    if (left < right) {
      // pick an element as a pivot
      // make elements less than pivot to the left, and elements greater than pivot to the right
      // return pivot index
      let index = partition(array, left, right);
      // after getting the index of pivot, continue QuickSort in left subarray and right subarray
      QuickSort(array, left, index - 1);
      QuickSort(array, index + 1, right);
    }
  }
  QuickSort(array, 0, array.length - 1);
}

const arr = [3, 5, 8, 1, 2, 9, 4, 7];
quickSort(arr);
console.log(arr);
