import isPrime from "./isPrime.js";

/**
 * class for instantiating a timer for generating numbers
 */
export default class NumberTimer {
  /**
   * timer for continue generating numbers
   * @param {*} duration time interval for generating the next number
   */
  constructor(duration = 1000) {
    this.duration = duration;
    this.number = 1; // current number
    this.onNumberCreated = null; // when a number is generated, call the callback function
    this.timerId = null;
  }

  /**
   * start a timer to generate numbers
   * @returns undefined if a timer is started already
   */
  start() {
    if (this.timerId) {
      // timer was started
      return;
    }
    // no timer is started, start a new timer
    this.timerId = setInterval(() => {
      this.onNumberCreated &&
        this.onNumberCreated(this.number, isPrime(this.number));
      this.number++;
    }, this.duration);
  }

  /**
   * stop the timer and erase timer id
   */
  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}
