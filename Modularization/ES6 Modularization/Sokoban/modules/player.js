import * as map from "./map.js";

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

/**
 * swap current's label and next label in the map array
 * @param {object} currentInfo {row: xxx, col: xxx}
 * @param {string} direction next label in the direction to be swapped: up || down || left || right
 */
function swapCurrentAndNext(currentInfo, direction) {
  let temp = map.mapArr[currentInfo.row][currentInfo.col];
  if (direction === "up") {
    map.mapArr[currentInfo.row][currentInfo.col] =
      map.mapArr[currentInfo.row - 1][currentInfo.col];
    map.mapArr[currentInfo.row - 1][currentInfo.col] = temp;
  } else if (direction === "down") {
    map.mapArr[currentInfo.row][currentInfo.col] =
      map.mapArr[currentInfo.row + 1][currentInfo.col];
    map.mapArr[currentInfo.row + 1][currentInfo.col] = temp;
  } else if (direction === "left") {
    map.mapArr[currentInfo.row][currentInfo.col] =
      map.mapArr[currentInfo.row][currentInfo.col - 1];
    map.mapArr[currentInfo.row][currentInfo.col - 1] = temp;
  } else {
    // swap with right
    map.mapArr[currentInfo.row][currentInfo.col] =
      map.mapArr[currentInfo.row][currentInfo.col + 1];
    map.mapArr[currentInfo.row][currentInfo.col + 1] = temp;
  }
}

/**
 * determine if player wins
 * @returns {boolean} true if player wins, false otherwise
 */
function isWin() {
  // return true only if all correction locations have boxes
  for (let i = 0; i < map.correctPosition.length; i++) {
    let correctLocation = map.correctPosition[i];
    if (map.mapArr[correctLocation.row][correctLocation.col] !== map.BOX) {
      return false;
    }
  }
  return true;
}

/**
 * Move player based on the given direction
 * Only modify the map array
 * @param {string} direction up || down || left || right
 * @returns {boolean} return true if player move successfully
 */
function playerMove(direction) {
  // Player's current location
  let playerInfo = { row: playerRow, col: playerCol };
  let playerNext = getNextInfo(playerInfo, direction); //{row: xxx, col: xxx, label: xxx}
  if (playerNext.label === map.WALL) {
    // next is wall
    return false;
  } else if (playerNext.label === map.SPACE) {
    // next is space
    swapCurrentAndNext(playerInfo, direction);
    // update player's location
    playerRow = playerNext.row;
    playerCol = playerNext.col;
    return true;
  } else if (playerNext.label === map.BOX) {
    // next is box
    // get playerNext's next
    let playerNextNext = getNextInfo(
      { row: playerNext.row, col: playerNext.col },
      direction
    );
    if (playerNextNext.label === map.SPACE) {
      // next next is space, can move
      // swap box(next) and space(next next)
      swapCurrentAndNext(playerNext, direction);
      // swap box(next) and player
      swapCurrentAndNext(playerInfo, direction);
      // update player's location
      playerRow = playerNext.row;
      playerCol = playerNext.col;
      return true;
    }
    return false;
  }
}

export { playerMove, isWin };
