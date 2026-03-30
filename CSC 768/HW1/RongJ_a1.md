# Assignment #1 Historical Ciphers

## Language chose: HTML and JavaScript

1. I finished this problem by using **frequency analysis attack**

   First I need to count each letter frequency in the ciphertext

   ```js
   /**
    * Count each letter frequency in a given ciphertext
    * @param {string} cipherText
    * @returns {object} key: letter value: frequency
    */
   function countLetterFreq(ciphertext)
   ```

   This function helps me count frequency and store them in an object with key is letter and value is its corresponding frequency.

   ---

   Next is to draw each letter frequency of the ciphertext in a bar chart, I accomplished it by using a library called **chart.js**

   ![image-20260214141605830](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214141605830.png)

   We can see the most frequent letters in ciphertext are E and O.

   ---

   ![image-20260214141908893](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214141908893.png)

   By comparing the average letter frequencies for English text, I fist tried whether E(plain letter) encrypted into D(cipher letter).

   This function helps me get the key in number based on the given plain letter and cipher letter.

   ```js
   /**
    * Get key number based on the given plain letter and cipher letter
    * @param {char} plainLetter
    * @param {char} cipherLetter
    * @returns {number} 0-25
    */
   function getKey(plainLetter, cipherLetter)
   ```

   ---

   This function helps me get the possible plaintext based on the ciphertext and possible key

   ```js
   /**
    * decrypt ciphertext by left shifting each letter # of key locations
    * @param {string} ciphertext
    * @param {number} key 0-25
    * @returns {string} possible plaintext
    */
   function leftShiftByKey(ciphertext, key)
   ```

   ---

   Try whether E(plain) -> D(cipher)

   ![image-20260214143146040](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214143146040.png)

   which does not seem correct as a plaintext

   ---

   Try whether E(plain) -> O(cipher)

   ![image-20260214143240715](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214143240715.png)

   It is a normal plaintext starting with "A MILLIONAIRE"...

   ---

   Therefore, the key is 10 and plaintext is above on the screenshot.

   ---

2. Decryption of Vigenère cipher

   First I need to get the key length by index of coincidence.

   Since the given ciphertext contains spaces, I need to remove them.

   ```js
   /**
    * remove any spaces and punctuation from a ciphertext
    * @param {string} ciphertext
    * @returns {string}
    */
   function formatCiphertext(ciphertext)
   ```

   ---

   My guess key length ranges from 1 to 10. Therefore, for each my guess key length k, I need to spilt the ciphertext into k groups and compute each group's index of coincidence. Then for each k, I calculate the average IC of all the groups. For the average that is closest to 0.065, that would be my best guess key length.

   ---

   This is the helper function to calculate index of coincidence in a given text group

   ```js
   /**
    * Calculate IC in a given group
    * @param {string} text 
    * @returns {number} IC
    */
   function computeIC(text)
   ```

   The formula to calculate is:
   $$
   IC = \frac{\sum f_i(f_i-1)}{N(N-1)}
   $$
   where fi is each letter frequency and N is the length of the text

   ---

   The function to calculate each key length's IC and store them in an object:

   ```js
   /**
    * Calculate average IC for each possible key length
    * @param {number} minK the minimum possible key length
    * @param {number} maxK the maximum possible key length
    * @param {string} ciphertext
    * @returns {object} key: key length, value: its average IC
    */
   function avgICmap(minK, maxK, ciphertext)
   ```

   ---

   ![image-20260214162514778](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214162514778.png)

   This the key length and its corresponding average IC map, in which when key length is 6, the average IC is closest to 0.065.

   Therefore, the best guess key length is 6. Based on the key length, I spilt the ciphertext into 6 groups by taking every sixth letter. 

   ![image-20260214164956612](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214164956612.png)

   Each group was treated as a Caesar cipher, and I performed frequency analysis on each group like in question 1.

   ---

   Letter frequency in each group

   Group 1:

   ![image-20260214170032573](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170032573.png)

   Group 2:

   ![image-20260214170156667](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170156667.png)

   Group 3:

   ![image-20260214170234970](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170234970.png)

   Group 4:

   ![image-20260214170300088](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170300088.png)

   Group 5:

   ![image-20260214170339729](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170339729.png)

   Group 6:

   ![image-20260214170405600](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214170405600.png)

   ---

   For each group, I identified the two most frequent ciphertext letters. I assumed that each of these letters could correspond to the letter E in English and computed the corresponding shifts. This produced two candidate key letters for each group.

   Helper function to get letter key based on plain letter and cipher letter:

   ```js
   /**
    * Get key in letter based on plain letter and cipher letter
    * @param {string} plainLetter 
    * @param {string} cipherLetter 
    * @returns {string} 
    */
   function getLetterKey(plainLetter, cipherLetter)
   ```

   | plain letter: E        | gROUP 1 | gROUP 2 | GROUP 3 | Group 4 | Group 5    | Group 6 |
   | ---------------------- | ------- | ------- | ------- | ------- | ---------- | ------- |
   | POSSIBLE CIPHER LETTER | G, T    | P, M    | T, P    | U, A, P | X, E, S, I | V, E    |

   ---

   Here is the possible keys for each group:

   ![image-20260214174008409](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214174008409.png)

   One reasonable key is **cipher** even though the H does not exist in group 4.

   ---

   Try CIPHER as the key:

   Function to do Vigenère decryption:

   ```js
   /**
    * Vigenère decryption: P = (C - K) mod 26
    * @param {string} ciphertext
    * @param {string} key
    * @returns {string} plaintext
    */
   function vigenereDecrypt(ciphertext, key)
   ```

   The plaintext is below:

   ![image-20260214180542881](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260214180542881.png)

   It is clear that decryption succeeded with plaintext beginning with "The almond tree was..."

   Therefore, the key is CIPHER, and the recovered plaintext is meaningful in English.

   ---

3. I finished this problem in Node.js platform since browser can not access files in our computer without user's permission.

   First I have the helper function to XOR each plaintext byte with the key byte to generate ciphertext bytes

   ```js
   /**
    * XOR plaintext every byte with key to generate an arrary containing ciphertext bytes
    * @param {Array} bytes each element is 0-255
    * @param {number} key 0-255
    * @returns
    */
   function xorEncHelper(bytes, key)
   ```

   ---

   Then I have the encryption function to generate ciphertext in hex, and write ciphertext into output file:

   The data flow of the encryption algorithm:

   plaintext -> plaintext bytes -> each byte XOR with key -> ciphertext bytes -> ciphertext in hex

   ```js
   /**
    * XOR each byte of plaintext in a plaintext file with key to produce ciphertext in hex
    * @param {*} plaintextFileName 
    * @param {*} ciphertextFileName 
    * @param {*} keyFileName 
    */
   function xorEncryption(plaintextFileName, ciphertextFileName, keyFileName)
   ```

   ---

   Finally I have the decryption function to recover plaintext in character from ciphertext in hex

   The data flow of the decryption algorithm:

   ciphertext in hex -> ciphertext bytes -> each byte XOR with key -> plaintext bytes -> plaintext

   ```js
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
   )
   ```

   ---

   Test case:

   Original Plaintext:

   ![image-20260215004920157](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260215004920157.png)

   Key:

   ![image-20260215004949091](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260215004949091.png)

   Ciphertext:

   ![image-20260215005023437](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260215005023437.png)

   Recovered text:

   ![image-20260215005044518](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20260215005044518.png)