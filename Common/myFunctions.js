/**
 * determine whether a number is an odd number
 * @param {number} n the given number
 * @returns {boolean}
 */
function isOdd(n) {
    return (n % 2 === 1);
}

/**
 * determine whether a number is a prime number
 * @param {number} n the given number
 * @returns {boolean}
 */
function isPrime(n) {
    for (var i = 2; i <= n - 1; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

/**
 * Calculate the sum of an array
 * @param {Array} arr The array to be calculated its sum
 * @returns {number} The sum of the array
 */
function sumOfArray(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

/**
 * Return the maximum number in an array
 * @param {Array} arr The array to be find its maximum
 * @returns {number} the maximum number in the array
 */
function maxOfArray(arr) {
    var max = undefined;

    for (var i = 0; i <= arr.length; i++) {
        if (max === undefined || arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

/**
 * Return the minimum number in an array
 * @param {Array} arr The array to be find its minimum
 * @returns {number} The minimum number in the array
 */
function minOfArray(arr) {
    var min = undefined;

    for (var i = 0; i <= arr.length; i++) {
        if (min === undefined || arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

/**
 * Determine whether the given array is a sparse array
 * @param {Array} arr The given array to be determined
 * @returns {boolean}
 */
function hasEmptyInArray(arr) {
    var count = 0;
    for (var index in arr) {
        count++;
    }
    return (arr.length !== count);
}

/**
 * Determine whether the given year is a leap year
 * @param {number} year The given year
 * @returns {boolean}
 */
function isLeap(year) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return true;
    }
    return false;
}

/**
 * Return the number of days in a specific month of a given year
 * @param {number} year 
 * @param {number} month 
 * @returns {number}
 */
function getDays(year, month) {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else if (isLeap(year) && month === 2) {
        return 29;
    } else if (!isLeap(year) && month === 2) {
        return 28;
    }
}

/**
 * Find the number appears most frequently in a numeric array, along with its frequency
 * @param {Array} arr 
 * @returns {object} {mostFreqEle: The element appears most, mostFreqCount: The frequency}
 */
function getTopFreqInArray(arr) {
    var freq = {};

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] in freq) {
            freq[arr[i]] += 1;
        } else {
            freq[arr[i]] = 1;
        }
    }

    var mostFreqEle, mostFreqCount = 0;
    for (var prop in freq) {
        if (freq[prop] > mostFreqCount) {
            mostFreqEle = prop;
            mostFreqCount = freq[prop];
        }
    }

    return {
        mostFreqEle: mostFreqEle,
        mostFreqCount: mostFreqCount
    }
}