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
        console.log(playerRow, playerCol);
        break;
      }
    }
  }
}
getPlayerLocation();

/**
 * move player based on the given direction
 * @param {string} direction up || down || left || right
 */
function playerMove(direction) {}

export { playerMove };
