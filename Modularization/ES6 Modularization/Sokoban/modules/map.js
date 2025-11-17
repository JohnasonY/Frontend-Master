// Each item's label
const SPACE = 0,
  PLAYER = 1,
  WALL = 2,
  BOX = 3;

// only record the content of the map (box, player, wall, blank)
/**
 * 0. space
 * 1. player
 * 2. wall
 * 3. box
 */
const mapArr = [
  [0, 0, 2, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 0, 1, 0, 2, 0, 0],
  [0, 0, 2, 0, 3, 0, 2, 0, 0],
  [2, 2, 2, 0, 0, 0, 2, 2, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 0, 3, 3, 3, 3, 3, 0, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 2, 0, 3, 3, 3, 0, 2, 2],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 3, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0],
];

/**
 * Boxes' correct positions
 */
const correctPosition = [
  { row: 3, col: 4 },
  { row: 4, col: 4 },
  { row: 5, col: 2 },
  { row: 5, col: 3 },
  { row: 5, col: 4 },
  { row: 5, col: 5 },
  { row: 5, col: 6 },
  { row: 6, col: 4 },
  { row: 7, col: 4 },
  { row: 8, col: 4 },
  { row: 9, col: 4 },
  { row: 10, col: 4 },
];

/**
 * The number of rows and columns in the map
 */
const rowNum = mapArr.length,
  colNum = mapArr[0].length;

export { SPACE, PLAYER, WALL, BOX, mapArr, correctPosition, rowNum, colNum };
