function powerOfTwo(n) {
  console.log(n);

  if (n === 1) return true;
  if (n === 0) return false;
  return powerOfTwo(n / 2);
}

function lastStoneWeight(arr) {
  if (arr.length === 1) return arr[0];
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return lastStoneWeight();
}

const arr = [1, 2, 3];
