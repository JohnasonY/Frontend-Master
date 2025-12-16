import NumberTimer from "../util/NumberTimer.js";
import appendNumber from "./appendNumber.js";

let numberTimer = new NumberTimer();
numberTimer.onNumberCreated = function (n, isPrime) {
  appendNumber(n, isPrime);
};

let isStarted = false;
window.onclick = function () {
  if (isStarted) {
    numberTimer.stop();
    isStarted = false;
  } else {
    numberTimer.start();
    isStarted = true;
  }
};
