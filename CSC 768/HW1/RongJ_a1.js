/**
 * Assignment #1 Historical Ciphers
 */

/**
 * 1. By frquency analysis attack
 */

/**
 * Count each letter frequency in a given ciphertext
 * @param {string} cipherText
 * @returns {object} key: letter value: frequency
 */
function countLetterFreq(ciphertext) {
  const letterFreq = {};
  for (const letter of ciphertext) {
    if (letter in letterFreq) {
      letterFreq[letter]++;
    } else {
      // not in the frequency object
      letterFreq[letter] = 1;
    }
  }
  return letterFreq;
}

const CIPHERTEXT =
  "KWSVVSYXKSBOKRKBNRKDKXNKNBEXUKBOKDKLKBGROXDROIQODDROSBLOOBCDROIXYDSMOKPVISXOKMRWEQDROWSVVSYXKSBOZYVSDOVIKCUCDROLKBDOXNOBPYBKXYDROBLOOBDROXZBYMOONCDYCSZSDDRORKBNRKDCZSVVCYEDTECDOXYEQRDYQODBSNYPDROPVIKXNAEKPPCDROBOCDSDCXYGDRONBEXUCDEBXROCDSMUCRSCRKXNSXDYDROLOOBQBKLCDROPVILIDROGSXQCKXNCRYEDCCZSDSDYEDCZSDSDYEDBOKNOBCNSQOCDPOLBEKBIDGYDRYECKXNDOX";
// the length of the ciphertext
const ciphertextLength = CIPHERTEXT.length;
// each letter frequency in the ciphertext
const freq = countLetterFreq(CIPHERTEXT);

// draw letter frequency of ciphertext in bar chart
const labels = Object.keys(freq);
const values = Object.values(freq);

new Chart(document.getElementById("freqChart"), {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Letter Frequency",
        data: values,
      },
    ],
  },
});

// The highest letter frequency in ciphertext is D and O

/**
 * Get key number based on the given plain letter and cipher letter
 * @param {char} plainLetter
 * @param {char} cipherLetter
 * @returns {number} 0-25
 */
function getKey(plainLetter, cipherLetter) {
  return (cipherLetter.charCodeAt(0) - plainLetter.charCodeAt(0) + 26) % 26;
}

/**
 * decrypt ciphertext by left shifting each letter # of key locations
 * @param {string} ciphertext
 * @param {number} key 0-25
 * @returns {string} possible plaintext
 */
function leftShiftByKey(ciphertext, key) {
  let plaintext = "";
  for (const letter of ciphertext) {
    if (letter >= "A" && letter <= "Z") {
      const code = letter.charCodeAt(0) - 65;
      const shifted = (code - key + 26) % 26;
      plaintext += String.fromCharCode(shifted + 65);
    } else {
      plaintext += letter;
    }
  }
  return plaintext;
}

// first try whether E(plain) -> D(cipher)
const possibleKey1 = getKey("E", "D");
const possiblePlaintext1 = leftShiftByKey(CIPHERTEXT, possibleKey1);
console.log("Key: " + possibleKey1, "Plaintext: " + possiblePlaintext1); //LXTWWTZYLTCPLSLCOSLELYOLOCFYVLCPLELMLCHSPYESPJRPEESPTCMPPCDESPJYZETNPLQWJTYPLNSXFRESPXTWWTZYLTCPAZWTEPWJLDVDESPMLCEPYOPCQZCLYZESPCMPPCESPYACZNPPODEZDTATEESPSLCOSLEDATWWDZFEUFDEPYZFRSEZRPECTOZQESPQWJLYOBFLQQDESPCPDETEDYZHESPOCFYVDEFCYSPDETNVDSTDSLYOTYEZESPMPPCRCLMDESPQWJMJESPHTYRDLYODSZFEDDATETEZFEDATETEZFECPLOPCDOTRPDEQPMCFLCJEHZESZFDLYOEPY

// E(plain) -> D(cipher) does not seem correct
// we try E(plain) -> O(cipher)
const possibleKey2 = getKey("E", "O");
const possiblePlaintext2 = leftShiftByKey(CIPHERTEXT, possibleKey2);
console.log("Key: " + possibleKey2, "Plaintext: " + possiblePlaintext2); //AMILLIONAIREAHARDHATANDADRUNKAREATABARWHENTHEYGETTHEIRBEERSTHEYNOTICEAFLYINEACHMUGTHEMILLIONAIREPOLITELYASKSTHEBARTENDERFORANOTHERBEERTHENPROCEEDSTOSIPITTHEHARDHATSPILLSOUTJUSTENOUGHTOGETRIDOFTHEFLYANDQUAFFSTHERESTITSNOWTHEDRUNKSTURNHESTICKSHISHANDINTOTHEBEERGRABSTHEFLYBYTHEWINGSANDSHOUTSSPITITOUTSPITITOUTREADERSDIGESTFEBRUARYTWOTHOUSANDTEN
// we decrypted the ciphertext successfully by the key of 10

/**
 * 2. Vigenere cipher
 */
const VIG_CIPHERTEXT =
  "VPTHP DQVSA VVGEP ZMEVM CAEKK DTIPF UADTX YGLPF WNGZT SSEIM GVJKG VTUHZ POLPX YOIVU MWKKT UXVXM CPRXU WUJSI TCVHX VFXXU OJMQT ZXYGP JUXZP OHLEJ QVLHW FXMGD MKJPD BRUUI CKKLP AEBXR YINMS IUQMT SEVPH ALVXQ CLCRT LHDII GJJZC RIIXU EJVPT DICNW GNEEK HTKJR TUTYW KTMPA IUVPT PVMKV TZEEF BWLQF TMAHG BCLPP WZEIA UIZIP QVVJJ CGYMV FBDKS KJMEY YEKVV ALVAA WVYCF PPCIU QVTPR EQDTT FVT";

/**
 * remove any spaces and punctuation from a ciphertext
 * @param {string} ciphertext
 * @returns {string}
 */
function formatCiphertext(ciphertext) {
  return ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
}

// ciphertext with no space and punctuation
const formatedCiphertext = formatCiphertext(VIG_CIPHERTEXT);

/**
 * Calculate IC in a given group
 * @param {string} text
 * @returns {number} IC
 */
function computeIC(text) {
  const freq = new Array(26).fill(0);

  for (const letter of text) {
    freq[letter.charCodeAt(0) - 65]++;
  }

  const textLength = text.length;
  if (textLength <= 1) {
    return 0;
  }

  // formula of IC: sum of (f*(f-1)) / N(N-1)
  let sum = 0;
  for (const f of freq) {
    sum += f * (f - 1);
  }

  return sum / (textLength * (textLength - 1));
}

/**
 * Calculate average IC for each possible key length
 * @param {number} minK the minimum possible key length
 * @param {number} maxK the maximum possible key length
 * @param {string} ciphertext
 * @returns {object} key: key length, value: its average IC
 */
function avgICmap(minK, maxK, ciphertext) {
  const result = {};

  for (let k = minK; k <= maxK; k++) {
    // create k groups
    const groups = Array.from({ length: k }, () => "");

    // distribute letters
    for (let i = 0; i < ciphertext.length; i++) {
      groups[i % k] += ciphertext[i];
    }

    // compute IC for each group
    let totalIC = 0;
    for (const group of groups) {
      totalIC += computeIC(group);
    }

    result[k] = totalIC / k;
  }

  return result;
}

const myMinKeyLength = 1,
  myMaxKeyLength = 10;

const keyLength_IC_map = avgICmap(
  myMinKeyLength,
  myMaxKeyLength,
  formatedCiphertext,
);

console.log(keyLength_IC_map);

/**
 * spilt letters in ciphertext into groups by taking every key length letter.
 * @param {string} ciphertext
 * @param {number} keyLength
 * @returns {Array}
 */
function splitIntoGroups(ciphertext, keyLength) {
  const groups = Array.from({ length: keyLength }, () => "");

  for (let i = 0; i < ciphertext.length; i++) {
    groups[i % keyLength] += ciphertext[i];
  }

  return groups;
}

// create letter frequency bar chart for each group
const keyLength = 6;
const groups = splitIntoGroups(formatedCiphertext, keyLength);

groups.forEach((group, index) => {
  const freq = countLetterFreq(group);

  const labels = Object.keys(freq);
  const values = Object.values(freq);

  // create canvas dynamically
  const canvas = document.createElement("canvas");
  canvas.id = `freqChartGroup${index}`;
  document.body.appendChild(canvas);

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Group ${index + 1} Frequency`,
          data: values,
        },
      ],
    },
  });
});

/**
 * Get key in letter based on plain letter and cipher letter
 * @param {string} plainLetter
 * @param {string} cipherLetter
 * @returns {string}
 */
function getLetterKey(plainLetter, cipherLetter) {
  const shift =
    (cipherLetter.charCodeAt(0) - plainLetter.charCodeAt(0) + 26) % 26;

  return String.fromCharCode(shift + 65);
}

const possibleKeys = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};
// console.log("Group 1 poissible keys:");
possibleKeys[1].push(getLetterKey("E", "G"));
possibleKeys[1].push(getLetterKey("E", "T"));

// console.log("Group 2 poissible keys:");
possibleKeys[2].push(getLetterKey("E", "P"));
possibleKeys[2].push(getLetterKey("E", "M"));

// console.log("Group 3 poissible keys:");
possibleKeys[3].push(getLetterKey("E", "T"));
possibleKeys[3].push(getLetterKey("E", "P"));

// console.log("Group 4 poissible keys:");
possibleKeys[4].push(getLetterKey("E", "U"));
possibleKeys[4].push(getLetterKey("E", "A"));
possibleKeys[4].push(getLetterKey("E", "P"));

// console.log("Group 5 poissible keys:");
possibleKeys[5].push(getLetterKey("E", "X"));
possibleKeys[5].push(getLetterKey("E", "E"));
possibleKeys[5].push(getLetterKey("E", "S"));
possibleKeys[5].push(getLetterKey("E", "I"));

// console.log("Group 6 poissible keys:");
possibleKeys[6].push(getLetterKey("E", "V"));
possibleKeys[6].push(getLetterKey("E", "E"));

console.log(possibleKeys);

/**
 * Vigenère decryption: P = (C - K) mod 26
 * @param {string} ciphertext
 * @param {string} key
 * @returns {string} plaintext
 */
function vigenereDecrypt(ciphertext, key) {
  const ct = formatCiphertext(ciphertext);
  const k = formatCiphertext(key);

  let pt = "";
  for (let i = 0; i < ct.length; i++) {
    const c = ct.charCodeAt(i) - 65;
    const kv = k.charCodeAt(i % k.length) - 65;
    pt += String.fromCharCode(((c - kv + 26) % 26) + 65);
  }
  return pt;
}

const KEY = "CIPHER";
const plaintext = vigenereDecrypt(formatedCiphertext, KEY);
console.log(plaintext);

/**
 * 3. XOR Encryption and Decryption
 */

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
