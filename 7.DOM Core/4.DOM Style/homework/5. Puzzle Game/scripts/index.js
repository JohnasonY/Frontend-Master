var gameConfig = {
    boardWidth: 500,
    boardHeight: 500,
    boardBorder: "2px solid black",
    rows: 3,
    cols: 3,
    imgURL: "img/lol.png",
    gameDOM: document.getElementById("gameBoard"),
    isOver: false
}

// the width and height of each block
gameConfig.blockWidth = gameConfig.boardWidth / gameConfig.cols;
gameConfig.blockHeight = gameConfig.boardHeight / gameConfig.rows;

//the number of blocks
gameConfig.blockNum = gameConfig.rows * gameConfig.cols;

var blocksArr = []; // array containing info of each block

function isEqual(n1, n2) {
    return parseInt(n1) === parseInt(n2);
}

function Block(left, top, isVisible) {
    this.left = left;
    this.top = top;
    this.correctLeft = this.left;
    this.correctTop = this.top;
    this.isVisible = isVisible

    this.dom = document.createElement("div");
    this.dom.style.width = gameConfig.blockWidth + "px";
    this.dom.style.height = gameConfig.blockHeight + "px";
    this.dom.style.background = `url(${gameConfig.imgURL}) -${this.correctLeft}px -${this.correctTop}px`;
    this.dom.style.position = "absolute";
    this.dom.style.border = "1px solid #ffff";
    this.dom.style.boxSizing = "border-box";
    this.dom.style.cursor = "pointer";
    this.dom.style.transition = ".5s";
    if (!isVisible) {
        this.dom.style.display = "none";
    }
    gameConfig.gameDOM.appendChild(this.dom);
    this.show = function () {
        // set left and top to each block's DOM
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    this.show();

    // determine whether the block is on the correct position
    this.isCorrect = function () {
        return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
    }
}

/**
 * initialize the game
 */
function initGame() {
    // 1.initialize the board
    initBoard();
    // 2.initialize blocks inside the board
    initBlocksArray();
    // 2.1 prepare an array, each elmement is an object, recording the info of each block

    // 2.2 shuffle the starting left and top of the blocks
    shuffle();
    // 3. register click event
    regClickEvent();


    /**
     * handle click event
     */
    function regClickEvent() {
        var inVisibleBlock = blocksArr.find(function (block) {
            return !block.isVisible;
        })
        blocksArr.forEach(function (block) {
            block.dom.onclick = function () {
                if (gameConfig.isOver) {
                    return;
                }
                // determine whether two blocks can swap
                if (block.top === inVisibleBlock.top && isEqual(Math.abs(block.left - inVisibleBlock.left), gameConfig.blockWidth) ||
                    block.left === inVisibleBlock.left && isEqual(Math.abs(block.top - inVisibleBlock.top), gameConfig.blockHeight)
                ) {
                    // swap current block's left and top with invisible block
                    swapLeftAndTop(block, inVisibleBlock);

                    // determine whether the player win
                    isWin();
                }

            }
        })
    }

    /**
     * determine win the game or not
     */
    function isWin() {
        var incorrects = blocksArr.filter(function (block) {
            return !block.isCorrect();
        });
        if (incorrects.length === 0) {
            gameConfig.isOver = true;
            // game termination, remove all blocks' borders
            blocksArr.forEach(function (block) {
                block.dom.style.border = "none";
                block.dom.style.display = "block";
            })
        }
    }

    /**
     * exchange the value of left and top between two blocks
     * @param {*} b1 
     * @param {*} b2 
     */
    function swapLeftAndTop(b1, b2) {
        var temp = b1.left;
        b1.left = b2.left;
        b2.left = temp;

        temp = b1.top;
        b1.top = b2.top;
        b2.top = temp;

        b1.show();
        b2.show();
    }

    /**
     * get a random number between min(inclusive) and max(inclusive)
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    function shuffle() {
        for (var i = 0; i < blocksArr.length - 1; i++) {
            // generate a randomized index
            var randIndex = getRandom(0, blocksArr.length - 2);
            // swap left and top of the current block with the randomized index block
            swapLeftAndTop(blocksArr[i], blocksArr[randIndex]);
        }

        // re-render the left and top attribute in each block's DOM
        blocksArr.forEach(function (block) {
            block.show();
        })

    }

    /**
     * initialize the blocks array
     */
    function initBlocksArray() {
        for (var i = 0; i < gameConfig.rows; i++) {
            for (var j = 0; j < gameConfig.cols; j++) {
                // i: row   j:column
                var isVisible = true;
                if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                    isVisible = false;
                }
                var newBlock = new Block(j * gameConfig.blockWidth, i * gameConfig.blockHeight, isVisible)
                blocksArr.push(newBlock);
            }
        }
    }

    /**
     * initialize the board of the game
     */
    function initBoard() {
        gameConfig.gameDOM.style.width = gameConfig.boardWidth + "px";
        gameConfig.gameDOM.style.height = gameConfig.boardHeight + "px";
        gameConfig.gameDOM.style.border = gameConfig.boardBorder;
        gameConfig.gameDOM.style.position = "relative";
    }
}

initGame();