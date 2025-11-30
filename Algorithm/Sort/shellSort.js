// time: O(nlogn)
// space: O(1)
// unstable
function shellSort(arr) {
  let n = arr.length;
  let gap = Math.floor(n / 2); // the gap from the current element to the next element for sorting the subarray

  // each loop means a single round for each gap, it will loop the numbers of times as how many gap we will have
  while (gap > 0) {
    // based on the current gap, do insertion sort for each subarray
    // this for loop strats from gap to n-1, take current element out and do insertion sort with the elements from gap apart away
    // each for loop interation, do insertion sort for the same subarray
    for (let i = gap; i < n; i++) {
      let temp = arr[i]; // temp = current element
      let j = i; // j = current index, used for looking for insertion location

      // do insertion sort for the current element based on the gap
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp; // put temp(current element) to the correct location
    }

    // update gap
    gap = Math.floor(gap / 2);
  }
}
const arr = [36, 27, 20, 60, 55, 7, 28, 36, 67, 44, 16];
shellSort(arr);
console.log(arr);
