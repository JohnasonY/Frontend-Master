module.exports = {
  /**
   * Shuffle the elements of a given array
   * @param {Array} arr An array
   */
  shuffle(arr) {
    arr.sort((a, b) => {
      return Math.random() - 0.5;
    });
  },
};
