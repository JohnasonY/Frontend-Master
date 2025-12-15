/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/event.js */ \"./src/page/event.js\");\n\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/index.js?\n}");

/***/ }),

/***/ "./src/page/appendNumber.js":
/*!**********************************!*\
  !*** ./src/page/appendNumber.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_radColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/radColor.js */ \"./src/util/radColor.js\");\n\r\n\r\n\r\nlet divContainer = document.getElementById(\"divContainer\");\r\nlet divCenter = document.getElementById(\"divCenter\");\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n, isPrime) {\r\n  let span = document.createElement(\"span\");\r\n  span.innerText = n;\r\n  if (isPrime) {\r\n    let color = (0,_util_radColor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n    span.style.color = color;\r\n    createCenterPrimeNumber(n, color);\r\n  }\r\n  divContainer.appendChild(span);\r\n  createCenterNumber(n);\r\n}\r\n\r\nfunction createCenterNumber(n) {\r\n  divCenter.innerText = n;\r\n}\r\n\r\nfunction createCenterPrimeNumber(n, color) {\r\n  let div = document.createElement(\"div\");\r\n  div.className = \"center\";\r\n  div.style.color = color;\r\n  div.innerText = n;\r\n  document.body.appendChild(div);\r\n  // force the page to render\r\n  getComputedStyle(div).left;\r\n  div.style.transform = `translate(${(0,_util_radColor_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)(-200, 200)}px, ${(0,_util_radColor_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)(\r\n    -200,\r\n    200\r\n  )}px)`;\r\n  div.style.opacity = 0;\r\n}\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/page/appendNumber.js?\n}");

/***/ }),

/***/ "./src/page/event.js":
/*!***************************!*\
  !*** ./src/page/event.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_NumberTimer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/NumberTimer.js */ \"./src/util/NumberTimer.js\");\n/* harmony import */ var _appendNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appendNumber.js */ \"./src/page/appendNumber.js\");\n\r\n\r\n\r\nlet numberTimer = new _util_NumberTimer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nnumberTimer.onNumberCreated = function (n, isPrime) {\r\n  (0,_appendNumber_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(n, isPrime);\r\n};\r\n\r\nlet isStarted = false;\r\nwindow.onclick = function () {\r\n  if (isStarted) {\r\n    numberTimer.stop();\r\n    isStarted = false;\r\n  } else {\r\n    numberTimer.start();\r\n    isStarted = true;\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/page/event.js?\n}");

/***/ }),

/***/ "./src/util/NumberTimer.js":
/*!*********************************!*\
  !*** ./src/util/NumberTimer.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NumberTimer)\n/* harmony export */ });\n/* harmony import */ var _isPrime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isPrime.js */ \"./src/util/isPrime.js\");\n\r\n\r\n/**\r\n * class for instantiating a timer for generating numbers\r\n */\r\nclass NumberTimer {\r\n  /**\r\n   * timer for continue generating numbers\r\n   * @param {*} duration time interval for generating the next number\r\n   */\r\n  constructor(duration = 1000) {\r\n    this.duration = duration;\r\n    this.number = 1; // current number\r\n    this.onNumberCreated = null; // when a number is generated, call the callback function\r\n    this.timerId = null;\r\n  }\r\n\r\n  /**\r\n   * start a timer to generate numbers\r\n   * @returns undefined if a timer is started already\r\n   */\r\n  start() {\r\n    if (this.timerId) {\r\n      // timer was started\r\n      return;\r\n    }\r\n    // no timer is started, start a new timer\r\n    this.timerId = setInterval(() => {\r\n      this.onNumberCreated &&\r\n        this.onNumberCreated(this.number, (0,_isPrime_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.number));\r\n      this.number++;\r\n    }, this.duration);\r\n  }\r\n\r\n  /**\r\n   * stop the timer and erase timer id\r\n   */\r\n  stop() {\r\n    clearInterval(this.timerId);\r\n    this.timerId = null;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/util/NumberTimer.js?\n}");

/***/ }),

/***/ "./src/util/isPrime.js":
/*!*****************************!*\
  !*** ./src/util/isPrime.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * determine if the given number is a prime number\r\n * @param {*} num integer to be determined if a prime number\r\n * @returns true if the number is prime number, false otherwise\r\n */\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(num) {\r\n  if (num < 2) {\r\n    return false;\r\n  }\r\n  //if num can be integer divided by a number from 2 to n-1, then num is not a prime number\r\n  for (let i = 2; i <= num - 1; i++) {\r\n    if (num % i === 0) {\r\n      return false;\r\n    }\r\n  }\r\n  return true;\r\n}\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/util/isPrime.js?\n}");

/***/ }),

/***/ "./src/util/radColor.js":
/*!******************************!*\
  !*** ./src/util/radColor.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getRandom: () => (/* binding */ getRandom)\n/* harmony export */ });\nvar colors = [\"#f26395\", \"#62efab\", \"#ef7658\", \"#ffe868\", \"#80e3f7\", \"#d781f9\"];\r\n/**\r\n * generate a number between (including)min and max\r\n * @param {*} min\r\n * @param {*} max\r\n * @returns\r\n */\r\nfunction getRandom(min, max) {\r\n  return Math.floor(Math.random() * (max - min + 1) + min);\r\n}\r\n\r\n/**\r\n * get a random color in the colors array\r\n * @returns {colors}\r\n */\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  let radIndex = getRandom(0, colors.length - 1);\r\n  return colors[radIndex];\r\n}\r\n\n\n//# sourceURL=webpack://awsomenumber/./src/util/radColor.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;