import * as map from "./map.js";
import { renderItems } from "./ui.js";

let playerRow, playerCol; // player's current row and column index

/**
 * run only once to get the player's initialized location
 */
function getPlayerLocation() {
  for (let row = 0; row < map.rowNum; row++) {
    for (let col = 0; col < map.colNum; col++) {
      // get the type of item
      let type = map.mapArr[row][col];
      if (type === map.PLAYER) {
        // update playerRow and playerCol
        playerRow = row;
        playerCol = col;
        break;
      }
    }
  }
}
getPlayerLocation();

/**
 * Get the next item type based on the given current location and next direction
 * @param {object} currentInfo Current item location: {row: 0~mapArr.length-1, col: 0~(mapArr[0].length)-1}
 * @param {string} direction up || down || left || right
 * @returns {object} {row: xxx, col: xxx, label: 0~3}
 */
function getNextInfo(currentInfo, direction) {
  let itemLabel = undefined;
  let nextInfo;
  if (direction === "up") {
    itemLabel = map.mapArr[currentInfo.row - 1][currentInfo.col];
    nextInfo = { row: currentInfo.row - 1, col: currentInfo.col };
  } else if (direction === "down") {
    itemLabel = map.mapArr[currentInfo.row + 1][currentInfo.col];
    nextInfo = { row: currentInfo.row + 1, col: currentInfo.col };
  } else if (direction === "left") {
    itemLabel = map.mapArr[currentInfo.row][currentInfo.col - 1];
    nextInfo = { row: currentInfo.row, col: currentInfo.col - 1 };
  } else {
    itemLabel = map.mapArr[currentInfo.row][currentInfo.col + 1];
    nextInfo = { row: currentInfo.row, col: currentInfo.col + 1 };
  }
  nextInfo.label = itemLabel;
  return nextInfo;
}

function swapPlayerAndNext(playerInfo, direction) {
  let temp = map.mapArr[playerInfo.row][playerInfo.col];
  if (direction === "up") {
    map.mapArr[playerInfo.row][playerInfo.col] =
      map.mapArr[playerInfo.row - 1][playerInfo.col];
    map.mapArr[playerInfo.row - 1][playerInfo.col] = temp;
  } else if (direction === "down") {
    map.mapArr[playerInfo.row][playerInfo.col] =
      map.mapArr[playerInfo.row + 1][playerInfo.col];
    map.mapArr[playerInfo.row + 1][playerInfo.col] = temp;
  } else if (direction === "left") {
    map.mapArr[playerInfo.row][playerInfo.col] =
      map.mapArr[playerInfo.row][playerInfo.col - 1];
    map.mapArr[playerInfo.row][playerInfo.col - 1] = temp;
  } else {
    // swap with right
    map.mapArr[playerInfo.row][playerInfo.col] =
      map.mapArr[playerInfo.row][playerInfo.col + 1];
    map.mapArr[playerInfo.row][playerInfo.col + 1] = temp;
  }
}

/**
 * Move player based on the given direction
 * Only modify the map array
 * @param {string} direction up || down || left || right
 */
function playerMove(direction) {
  // Player's current location
  let playerInfo = { row: playerRow, col: playerCol };
  let playerNext = getNextInfo(playerInfo, direction);
  if (playerNext.label === map.WALL) {
    return;
  } else if (playerNext.label === map.SPACE) {
    swapPlayerAndNext(playerInfo, direction);
    playerRow = playerNext.row;
    playerCol = playerNext.col;
  }

  renderItems();
}

export { playerMove };
