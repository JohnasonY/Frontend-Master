if (!this.myPlugin) {
    this.myPlugin = {};
}

/**
 * obj2 mix into obj1 to generate a new object
 * If they have same properties, obj2 will replace with obj1's property values 
 */
this.myPlugin.mixin = function (obj1, obj2) {
    // var newObj = {};
    // // copy all obj2's properties to newObj
    // for (var prop in obj2) {
    //     newObj[prop] = obj2[prop];
    // }

    // // find properties in obj1 but not in obj2, copy them to newObj
    // for (var prop in obj1) {
    //     if (!(prop in obj2)) {
    //         newObj[prop] = obj1[prop];
    //     }
    // }
    // return newObj;
    return Object.assign({}, obj1, obj2)
}

/**
 * clone a object
 * @param {boolean} deep clone or not
 */
this.myPlugin.clone = function (obj, deep) {
    if (Array.isArray(obj)) {
        if (deep) {
            // deep clone
            var newArr = [];
            for (var i = 0; i < obj.length; i++) {
                newArr.push(this.clone(obj[i], deep));
            }
            return newArr;
        } else {
            return obj.slice();
        }

    } else if (typeof obj === "object") {
        var newObj = {};
        for (var prop in obj) {
            if (deep) {
                // deep clone
                newObj[prop] = this.clone(obj[prop], deep);
            } else {
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    } else {
        // obj is function or primitive data type
        return obj;
    }
}

/**
 * If this function being called repeatedly less than duration, execute callback only when wait time meet
 * @param {function}
 * @param {number}
 */
this.myPlugin.debounce = function (callback, waitTime) {
    var timer;

    // each time call return function, restart timing. After wait time, execute callback
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        var args = arguments;
        timer = setTimeout(function () {
            callback.apply(null, args);
        }, waitTime);
    }
}

/**
 * If this function being called repeatedly, execute callback after each wait time
 * @param {function}
 * @param {number}
 * @param {boolean}
 */
this.myPlugin.throttle = function (callback, waitTime, immediately) {
    if (immediately === undefined) {
        immediately = true;
    }
    if (immediately) {
        var time;
        return function () {
            // No timing or current time exceeds wait time
            if (!time || Date.now() - time >= waitTime) {
                callback.apply(null, arguments);
                time = Date.now();
            }
        }
    } else {
        var timer;
        // If in timing, do nothing. Else set time out to execute callback. After wait time, can set timing again.
        return function () {
            if (timer) {
                return;
            }
            var args = arguments;
            timer = setTimeout(function () {
                callback.apply(null, args);
                timer = null;
            }, waitTime)
        }
    }
}
