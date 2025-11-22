var _ = require("lodash");

var compactedArr = _.compact([0, undefined, 1.125, 56, null, false, "asgfasg", ""]);

console.log(compactedArr);
