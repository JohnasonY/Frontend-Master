// interpolation search
// Improvement of binary search
// 1. array must be sorted
// 2. the gap between two elements needed to be the same as possible
function interpolationSearch(arr, target) {
  let low = 0, // starting index
    high = arr.length - 1; // ending index
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // calculate mid
    let mid =
      low +
      Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      // target on the left side
      high = mid - 1;
    } else {
      // target on the right side
      low = mid + 1;
    }
  }
  return -1;
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 85;
const result = interpolationSearch(arr, target);
console.log(result);
