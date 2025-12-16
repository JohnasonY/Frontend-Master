/**
 * loader handling image, make image files module to be able to be complied by webpack
 * @param {*} buffer binary content in image file
 * @returns js code that can run after webpack compilation
 */
function imgLoader(buffer) {
  const base64 = getBase64(buffer);
  let code = `module.exports = \`${base64}\``;
  return code;
}
imgLoader.raw = true; // convert img file content to binary

function getBase64(buffer) {
  const prefix = "data:image/png;base64,";
  return prefix + buffer.toString("base64");
}
module.exports = imgLoader;
