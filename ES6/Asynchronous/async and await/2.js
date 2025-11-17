/**
 * delay an amount of time
 * @param {number} duration
 * @return {Promise}
 */
async function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// utilize delay function，delay 3 times，each time delay 1s, output OK after each delay
// delay 1s->OK->delay 1s->OK->delay 1s->OK
(async () => {
  for (let i = 0; i < 3; i++) {
    await delay(1000);
    console.log("OK");
  }
})();
