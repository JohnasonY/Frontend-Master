function seqSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

const arr = [10, 20, 30, 40];
const target = 30;
console.log(seqSearch(arr, target));
