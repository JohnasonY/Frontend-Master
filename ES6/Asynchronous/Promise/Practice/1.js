/**
 * delay an amount of time
 * @param {Number} duration
 * @returns {Promise} a promise object, this promise object get fulfilled after the duration
 */
function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

delay(1000).then(() => {
  console.log("succeed!");
});
