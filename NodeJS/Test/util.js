let count = 0; //need to be hidden
/**
 * each time call this function, return a value larger than the prvious call by one
 */
function incrementByOne() {
  return ++count;
}

// export to be used by other modules
module.exports = {
  incrementByOne,
};
