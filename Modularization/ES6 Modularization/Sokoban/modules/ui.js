import * as map from "./map.js";

// game board div
const gameBoard = document.getElementById("gameBoard");
// one item's width
const itemWidth = 45;
// one item's height
const itemHeight = 45;

/**
 * Initialize the game board container
 * Set width and height of the container
 */
function initGameBoard() {
  gameBoard.style.width = map.colNum * itemWidth + "px";
  gameBoard.style.height = map.rowNum * itemHeight + "px";
}

/**
 * Check if the given row and column index is in correct postion
 * @param {*} row Row index
 * @param {*} col Column index
 */
function isCorrectPostion(row, col) {
  for (let i = 0; i < map.correctPosition.length; i++) {
    let curCorrectPos = map.correctPosition[i];
    if (row === curCorrectPos.row && col === curCorrectPos.col) {
      return true;
    }
  }
  return false;
}

/**
 * Render one item based on the given row and column and the current map array
 * @param {number} row Row index
 * @param {number} col Column index
 */
function renderOneItem(row, col) {
  let itemDiv = document.createElement("div");
  // set item to predefined style
  itemDiv.classList.add("item");
  // set location based on the row and column
  // left = column index * item width
  itemDiv.style.left = col * itemWidth + "px";
  // top = row index * item height
  itemDiv.style.top = row * itemHeight + "px";
  // set item to a specific one based on the number(type) in map
  const type = map.mapArr[row][col];
  const isCorrectPos = isCorrectPostion(row, col);
  if (type === map.SPACE) {
    if (isCorrectPos) {
      // empty space and correct postion
      itemDiv.classList.add("correctPosition");
    }
  } else if (type === map.BOX) {
    // a box item
    if (isCorrectPos) {
      itemDiv.classList.add("correctBox");
    } else {
      itemDiv.classList.add("box");
    }
  } else if (type === map.PLAYER) {
    // player item
    itemDiv.classList.add("player");
  } else if (type === map.WALL) {
    // wall item
    itemDiv.classList.add("wall");
  }
  // append to the game board
  gameBoard.appendChild(itemDiv);
}

/**
 * Render all items based on the map array
 */
function renderItems() {
  // clear the previous content
  gameBoard.innerHTML = "";
  for (let row = 0; row < map.rowNum; row++) {
    for (let col = 0; col < map.colNum; col++) {
      renderOneItem(row, col);
    }
  }
}

// Initialize the game board size once
initGameBoard();

export { renderItems };
