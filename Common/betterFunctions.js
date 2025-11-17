var myFunctions = {
    /**
     * determine whether a number is an odd number
     * @param {number} n the given number
     * @returns {boolean}
     */
    isOdd: function (n) {
        return (n % 2 === 1);
    },

    /**
     * determine whether a number is a prime number
     * @param {number} n the given number
     * @returns {boolean}
     */
    isPrime: function (n) {
        for (var i = 2; i <= n - 1; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    },

    /**
     * Calculate the sum of an array
     * @param {Array} arr The array to be calculated its sum
     * @returns {number} The sum of the array
     */
    sumOfArray: function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },

    /**
     * Return the maximum number in an array
     * @param {Array} arr The array to be find its maximum
     * @returns {number} the maximum number in the array
     */
    maxOfArray: function (arr) {
        var max = undefined;

        for (var i = 0; i <= arr.length; i++) {
            if (max === undefined || arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },

    /**
     * Return the minimum number in an array
     * @param {Array} arr The array to be find its minimum
     * @returns {number} The minimum number in the array
     */
    minOfArray: function (arr) {
        var min = undefined;

        for (var i = 0; i <= arr.length; i++) {
            if (min === undefined || arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    },

    /**
     * Determine whether the given array is a sparse array
     * @param {Array} arr The given array to be determined
     * @returns {boolean}
     */
    hasEmptyInArray: function (arr) {
        var count = 0;
        for (var index in arr) {
            count++;
        }
        return (arr.length !== count);
    },

    /**
     * Determine whether the given year is a leap year
     * @param {number} year The given year
     * @returns {boolean}
     */
    isLeap: function (year) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return true;
        }
        return false;
    },

    /**
     * Return the number of days in a specific month of a given year
     * @param {number} year 
     * @param {number} month 
     * @returns {number}
     */
    getDays: function (year, month) {
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            return 31;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        } else if (this.isLeap(year) && month === 2) {
            return 29;
        } else if (!(this.isLeap(year)) && month === 2) {
            return 28;
        }
    },

    /**
     * Find the number appears most frequently in a numeric array, along with its frequency
     * @param {Array} arr 
     * @returns {object} {mostFreqEle: The element appears most, mostFreqCount: The frequency}
     */
    getTopFreqInArray: function (arr) {
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
    },

    /**
     * Sort an array based on the given condition
     * @param {Array} arr 
     * @param {Function} compare Compare two elements:
     * This function has two parameters, representing two elements in the array.
     * Return a number. If the returned value is positive, the first element > the second element.
     * If the returned value is 0, the first element === the second element
     * If the returned value is negative, the first element < the second element
     */
    sort: function (arr, compare) {
        if (!compare) {
            compare = function (a, b) {
                if (a > b) {
                    return 1;
                } else if (a === b) {
                    return 0;
                } else {
                    return -1;
                }
            }
        }
        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                if (compare(arr[j], arr[j + 1]) > 0) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    },


    /**
     * Filter an array based on the given condition
     * @param {Array} arr 
     * @param {Function} filterRule Filter a specific element:
     * If the element satisfies the condition, return true. Return false otherwise.
     * @returns A new array containing the elements that satisfy the given condition.
     */
    filter: function (arr, filterRule) {
        var result = []
        for (var i = 0; i < arr.length; i++) {
            if (filterRule(arr[i])) {
                result.push(arr[i])
            }
        }
        return result;
    },

    /**
     * Find the first element in the array that meets the given condition
     * @param {Array} arr 
     * @param {Function} findRule Determine whether the given parameter meets the condition:
     * If it meets the condition, return true. Return false otherwise.
     * @returns The first element meets the given condition in the array
     */
    find: function (arr, findRule) {
        var result;
        for (var i = 0; i < arr.length; i++) {
            if (findRule(arr[i])) {
                result = arr[i];
                break;
            }
        }
        return result;
    },

    /**
     * Count the number of elements in the array that meet the given condition
     * @param {Array} arr 
     * @param {Function} countRule Determine whether the given parameter meets the condition:
     * If it meets the condition, return true. Return false otherwise.
     * @returns The number of elements in the array that meet the given condition
     */
    count: function (arr, countRule) {
        var result = 0;
        for (var i = 0; i < arr.length; i++) {
            if (countRule(arr[i])) {
                result++;
            }
        }
        return result;
    },

    /**
     * Get a random number between min(inclusive) and max(inclusive)
     * @param {number} min inclusive
     * @param {number} max inclusive
     *@return {number}
     */
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },


    /**
     * Get an object representing the character appears most in a string
     * @param {string} str 
     * @returns {object} {mostFreqEle: the character appears most, mostFreqCount: how many times that char appears}
     */
    getTopFreqInString: function (str) {
        var newArr = str.split("")
        return (this.getTopFreqInArray(newArr))
    },


    getRandomChar: function () {
        var rad = Math.random()
        var radCode;
        if (rad <= 0.3333) {
            radCode = this.getRandom(48, 57);
        } else if (rad <= 0.6666) {
            radCode = this.getRandom(65, 90);
        } else {
            radCode = this.getRandom(97, 122);
        }
        return String.fromCharCode(radCode);
    },

    getFixedLenRandStr: function (len) {
        var result = "";
        for (var i = 0; i < len; i++) {
            result += this.getRandomChar();
        }
        return result;
    },

    sortStr: function (str) {
        var charArr = str.split("");
        this.sort(charArr, function (a, b) {
            return a.charCodeAt(0) - b.charCodeAt(0);
        })
        return charArr.join("");
    },

    extractInfoFromID: function (ID) {
        var birthDateStr = ID.substr(6, 4 + 2 + 2);
        var birthYear = Number.parseInt(birthDateStr.substr(0, 4));
        var birthMonth = Number.parseInt(birthDateStr.substr(4, 2));
        var birthDay = Number.parseInt(birthDateStr.substr(6, 2));

        var genderDigit = Number.parseInt(ID.substr(-2, 1));
        // console.log(genderDigit, typeof genderDigit);

        var gender;
        this.isOdd(genderDigit) ? gender = "male" : gender = "female";
        return {
            birthYear,
            birthMonth,
            birthDay,
            gender
        }
    },

    getFriendlyDate: function (dateObj) {
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth();
        var date = dateObj.getDate();

        var hours = dateObj.getHours();
        var minutes = dateObj.getMinutes();
        var seconds = dateObj.getSeconds();

        return `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`
    },

    calculateAge: function (year, month, day) {
        var now = new Date();
        var age = now.getFullYear() - year;
        var birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
        if (birthdayThisYear > now) {
            age--;
        }
        return age;
    },

    getDayInCurrMonth: function () {
        var dateObj = new Date();
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth();
        var daysInCurrMonth = this.getDays(year, month + 1);
        var dayMap = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        };
        var monthMap = {
            0: "January",
            1: "Feburary",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }

        var result = {};
        for (var i = 1; i <= daysInCurrMonth; i++) {
            result[`${monthMap[month]} ${i}, ${year}`] = dayMap[new Date(year, month, i).getDay()];
        }
        return result;

    }
}

var arr = [{
    name: "Jax",
    age: 18,
    weight: 60
}, {
    name: "John",
    age: 21,
    weight: 70
}, {
    name: "Tony",
    age: 17,
    weight: 50
}];

myFunctions.sort(arr, function (a, b) {
    return (a.age - b.age);
});

var filterResult = myFunctions.filter(arr, function (a) {
    return a.weight >= 60;
})

var findResult = myFunctions.find(arr, function (a) {
    return a.age >= 19;
})

var countResult = myFunctions.count(arr, function (a) {
    return a.age >= 18;
})

// console.log(arr);

// console.log(filterResult);

// console.log(findResult);

// console.log(countResult);

// var str = "abcaabbcdaabaaa";
// console.log(myFunctions.getTopFreqInString(str));

// var str = "hello world";
// var strArr = str.split(" ");
// strArr.forEach(function (word, index) {
//     strArr[index] = word.charAt(0).toUpperCase() + word.substring(1);
// });
// strArr = strArr.join("");
// console.log(strArr);

// var str = myFunctions.getFixedLenRandStr(6);
// console.log(str);

// var str = "acbdfthqwqrazscasg";
// var newStr = myFunctions.sortStr(str);
// console.log(newStr);

// var ID = "524713199703020014";
// var result = myFunctions.extractInfoFromID(ID);
// console.log(result);

// console.log(myFunctions.getFriendlyDate(new Date()));

// console.log(myFunctions.calculateAge(2000, 10, 28));

// console.log(myFunctions.getDayInCurrMonth());