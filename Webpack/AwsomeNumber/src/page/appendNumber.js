import radColor from "../util/radColor.js";
import { getRandom } from "../util/radColor.js";

let divContainer = document.getElementById("divContainer");
let divCenter = document.getElementById("divCenter");

export default function (n, isPrime) {
  let span = document.createElement("span");
  span.innerText = n;
  if (isPrime) {
    let color = radColor();
    span.style.color = color;
    createCenterPrimeNumber(n, color);
  }
  divContainer.appendChild(span);
  createCenterNumber(n);
}

function createCenterNumber(n) {
  divCenter.innerText = n;
}

function createCenterPrimeNumber(n, color) {
  let div = document.createElement("div");
  div.className = "center";
  div.style.color = color;
  div.innerText = n;
  document.body.appendChild(div);
  // force the page to render
  getComputedStyle(div).left;
  div.style.transform = `translate(${getRandom(-200, 200)}px, ${getRandom(
    -200,
    200
  )}px)`;
  div.style.opacity = 0;
}
