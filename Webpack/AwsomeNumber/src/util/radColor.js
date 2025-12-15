var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
/**
 * generate a number between (including)min and max
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * get a random color in the colors array
 * @returns {colors}
 */
export default function () {
  let radIndex = getRandom(0, colors.length - 1);
  return colors[radIndex];
}
