/**
 * determine if the given number is a prime number
 * @param {*} num integer to be determined if a prime number
 * @returns true if the number is prime number, false otherwise
 */
export default function (num) {
  if (num < 2) {
    return false;
  }
  //if num can be integer divided by a number from 2 to n-1, then num is not a prime number
  for (let i = 2; i <= num - 1; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
