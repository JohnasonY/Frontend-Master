import { playerMove, isWin } from "./player.js";
import { renderItems } from "./ui.js";

// first time render
renderItems();
// is game over or not
let isOver = false;
window.onkeydown = function (e) {
  if (isOver) {
    return;
  }
  let isMoved = false;
  if (e.key === "ArrowUp") {
    isMoved = playerMove("up");
  } else if (e.key === "ArrowDown") {
    isMoved = playerMove("down");
  } else if (e.key === "ArrowLeft") {
    isMoved = playerMove("left");
  } else if (e.key === "ArrowRight") {
    isMoved = playerMove("right");
  }
  // player move scuessfully, render again
  if (isMoved) {
    renderItems();
    if (isWin()) {
      isOver = true;
    }
  }
};
