// Node.js file module to read and write files
const fs = require("fs");
// resolve file path
const path = require("path");

/**
 * XOR plaintext every byte with key to generate an arrary containing ciphertext bytes
 * @param {Array} bytes each element is 0-255
 * @param {number} key 0-255
 * @returns
 */
function xorEncHelper(bytes, key) {
  const bytesLength = bytes.length;
  // array contains each ciphertext byte
  const ctByteArr = new Array(bytesLength);

  // loop over each byte in plaintext
  for (let i = 0; i < bytesLength; i++) {
    // XOR plaintext byte with key to generate ciphertext byte
    ctByteArr[i] = bytes[i] ^ key;
  }

  return ctByteArr;
}

/**
 * XOR each byte of plaintext in a plaintext file with key to produce ciphertext in hex
 * @param {*} plaintextFileName 
 * @param {*} ciphertextFileName 
 * @param {*} keyFileName 
 */
function xorEncryption(plaintextFileName, ciphertextFileName, keyFileName) {
  // resolve all the files as in the current directory
  const keyPath = path.join(__dirname, keyFileName);
  const ptPath = path.join(__dirname, plaintextFileName);
  const ctPath = path.join(__dirname, ciphertextFileName);
  // read key from key file and remove leading and ending spaces
  const keyHex = fs.readFileSync(keyPath, "utf8").trim();
  // convert hex to integer
  const keyInt = parseInt(keyHex, 16);

  // read plaintext from plaintext file
  const plaintext = fs.readFileSync(ptPath, "utf8");
  // convert plaintext into bytes
  const plaintextBytes = Buffer.from(plaintext, "utf8");

  // call helper function
  const ciphertextBytes = xorEncHelper(plaintextBytes, keyInt);

  // convert ciphertext bytes into hex
  const ciphertext = Buffer.from(ciphertextBytes).toString("hex");

  // write ciphertext to ciphertext file
  fs.writeFileSync(ctPath, ciphertext);
}

/**
 * XOR decrypt ciphertext file and recover plaintext
 * @param {string} ciphertextFileName file containing ciphertext in hex
 * @param {string} outputPlaintextFileName file to write recovered plaintext
 * @param {string} keyFileName file containing 2 hex symbols
 */
function xorDecryption(
  ciphertextFileName,
  outputPlaintextFileName,
  keyFileName,
) {
  // resolve file paths
  const keyPath = path.join(__dirname, keyFileName);
  const ctPath = path.join(__dirname, ciphertextFileName);
  const ptOutPath = path.join(__dirname, outputPlaintextFileName);

  // read key
  const keyHex = fs.readFileSync(keyPath, "utf8").trim();
  const keyInt = parseInt(keyHex, 16);

  // read ciphertext hex string
  const ciphertextHex = fs.readFileSync(ctPath, "utf8").trim();
  // convert hex string to bytes
  const ciphertextBytes = Buffer.from(ciphertextHex, "hex");

  // XOR decrypt by xor ciphertext with key again to generate plaintext
  const plaintextBytes = xorEncHelper(ciphertextBytes, keyInt);
  // convert bytes back to string
  const plaintext = Buffer.from(plaintextBytes).toString("utf8");

  // write recovered plaintext
  fs.writeFileSync(ptOutPath, plaintext, "utf8");
}

// encryption
const plaintextFileName = "./plaintext.md";
const ciphertextFileName = "./ciphertext.md";
const keyFileName = "./key.md";
xorEncryption(plaintextFileName, ciphertextFileName, keyFileName);

// decryption
const outputPlaintextFileName = "./recoverText.md";
xorDecryption(ciphertextFileName, outputPlaintextFileName, keyFileName);
