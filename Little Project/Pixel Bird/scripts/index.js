/**
 * return a timer object, which includes start and stop function
 * @param {object} thisArg the object that this points to
 * @param {number} interval time interval calling callback function
 * @param {Function} callback callback function when timer starts
 */
function createTimer(thisArg, interval, callback) {
    var timer;
    return {
        start: function () {
            if (timer) {
                return;
            }
            timer = setInterval(callback.bind(thisArg), interval);
        },
        stop: function () {
            clearInterval(timer);
            timer = null;
        }
    }
}

/**
 * Get a random integer between min and max(including)
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

// game object
var game = {
    isStarted: false,
    isOver: false,
    overDOM: document.getElementById("gameOver"),
    dom: document.getElementById("gameBoard"),
    start: function () {
        sky.timer.start();
        land.timer.start();
        bird.spriteTimer.start();
        bird.dropTimer.start();
        pipeManager.createPipePairTimer.start();
        pipeManager.movePipePairTimer.start();
        collisionManager.collisionDetector.start();
    },
    stop: function () {
        sky.timer.stop();
        land.timer.stop();
        bird.spriteTimer.stop();
        bird.dropTimer.stop();
        pipeManager.createPipePairTimer.stop();
        pipeManager.movePipePairTimer.stop();
        collisionManager.collisionDetector.stop();
    }
}
game.width = game.dom.clientWidth;
game.height = game.dom.clientHeight;

// sky object
var sky = {
    left: 0,
    dom: document.getElementById("sky")
}
sky.timer = createTimer(sky, 16, function () {
    this.left--;
    if (this.left <= -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})


// land object
var land = {
    left: 0,
    dom: document.getElementById("land")
}
land.height = land.dom.clientHeight;
land.top = game.height - land.height;
land.timer = createTimer(land, 16, function () {
    this.left -= 2;
    if (this.left <= -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})

// bird object
var bird = {
    top: 150,
    left: 150,
    velocity: 0,
    time: 16,
    gravity: 0.002,
    dom: document.getElementById("bird"),
    curSpriteIndex: 0, // current sprite index: 0 ~ 2
    show() { // show current sprite based on the index
        if (this.curSpriteIndex === 0) {
            this.dom.style.backgroundPosition = "-8px -10px";
        } else if (this.curSpriteIndex === 1) {
            this.dom.style.backgroundPosition = "-60px -10px";
        } else if (this.curSpriteIndex === 2) {
            this.dom.style.backgroundPosition = "-113px -10px";
        }
        // show current position
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    },
    jump() {
        this.velocity = -0.5;
    }
}
bird.width = bird.dom.clientWidth;
bird.height = bird.dom.clientHeight;
// timer for sprite change
bird.spriteTimer = createTimer(bird, 250, function () {
    this.curSpriteIndex = (this.curSpriteIndex + 1) % 3;
    this.show();
})
// timer for bird drop
bird.dropTimer = createTimer(bird, bird.time, function () {
    var dis = this.velocity * this.time + 0.5 * this.gravity * this.time ** 2;
    var that = this;
    setTop(this.top + dis);

    function setTop(newTop) {
        if (newTop < 0) { // the bird goes too far top
            that.top = 0;
        } else if (newTop > land.top - that.height) { // the bird goes too far down
            that.top = land.top - that.height;
        } else { //without hitting the egdes
            that.top = newTop;
        }
    }
    this.velocity = this.velocity + this.gravity * this.time;
    this.show();
})

bird.show();

var pipeContainer = document.getElementById("pipeContainer");
/**
 * Pipe constructor. When new one, create a pipe object
 * @param {string} position top/bottom
 * @param {number} height the height of the pipe
 */
function Pipe(position, height) {
    // new pipe's dom
    var pipeDOM = document.createElement("div");
    this.pipeDOM = pipeDOM;
    // pipe's width: 52
    this.width = Pipe.width;
    pipeDOM.style.width = Pipe.width + "px";
    this.position = position;
    // pipe's height
    this.height = height;
    pipeDOM.style.height = height + "px";
    if (position === "top") { // if the pipe on top
        pipeDOM.style.background = "url(./img/pipeDown.png)";
        pipeDOM.style.backgroundPosition = "left bottom"
        this.top = 0;
    } else if (position === "bottom") { // if the pipe on bottom
        pipeDOM.style.background = "url(./img/pipeUp.png)";
        this.top = land.top - this.height;
    }
    pipeDOM.style.top = this.top + "px";
    pipeDOM.style.position = "absolute";
    // pipe's left
    this.left = game.width;
    pipeDOM.style.left = this.left + "px";
    // append to pipe container
    pipeContainer.appendChild(pipeDOM);
}
// show method for each instanced object
Pipe.prototype.show = function () {
    this.pipeDOM.style.left = this.left + "px";
    this.pipeDOM.style.top = this.top + "px";
}
Pipe.width = 52; // fixed pipe width

/**
 * Pipe pair constrcutor. When new one, create a pair of pipe
 * @param {number} pipeGap Gap between two pipes
 * @param {number} minHeight The minimum height of a pipe
 * @param {number} maxHeight The maximum height of a pipe
 */
function PipePair(pipeGap, minHeight, maxHeight) {
    // create top pipe
    var topPipeHeight = getRandomNum(minHeight, maxHeight);
    this.topPipe = new Pipe("top", topPipeHeight);
    // create bottom pipe
    var bottomPipeHeight = land.top - topPipeHeight - pipeGap;
    this.bottomPipe = new Pipe("bottom", bottomPipeHeight);
}

// manage pipe's properties and method
var pipeManager = {
    pipeGap: 150,
    minHeight: 50,
    maxHeight: 200,
    pipePairs: [], // array storing pipe piar objects
    createPipeInterval: 2000, // create one pair of pipe after each 1s
    movePipeInterval: 1000 // move one pair of pipe after each 1s
}
/**
 * create one pair of pipe (top and bottom)
 */
pipeManager.createPipePair = function () {
    this.pipePairs.push(new PipePair(this.pipeGap, this.minHeight, this.maxHeight));
}
pipeManager.createPipePairTimer = createTimer(pipeManager, pipeManager.createPipeInterval, function () {
    this.createPipePair();
})
/**
 * move one pair of pipe
 */
pipeManager.movePipePair = function () {
    for (var i = 0; i < this.pipePairs.length; i++) {
        var pair = this.pipePairs[i];
        // move top pipe
        pair.topPipe.left -= 2;
        pair.topPipe.show();
        // move bottom pipe
        pair.bottomPipe.left -= 2;
        pair.bottomPipe.show();
        // if the pipe pair goes beyond the board, remove it

        if (pair.bottomPipe.left < -Pipe.width) {
            // remove pipe pair DOM
            pair.topPipe.pipeDOM.remove();
            pair.bottomPipe.pipeDOM.remove();
            // remove pair object in the array
            this.pipePairs.splice(i, 1);
            i--;
        }

    }
}
pipeManager.movePipePairTimer = createTimer(pipeManager, 16, function () {
    this.movePipePair();
})

// manage collision
var collisionManager = {
    /**
     * detect whether collision occur, return true if yes
     */
    isCollided: function () {
        // the bird collides with the land
        if (bird.top >= land.top - bird.height) {
            return true;
        }
        // the bird collides with the pipe
        for (var i = 0; i < pipeManager.pipePairs.length; i++) {
            var pair = pipeManager.pipePairs[i];
            if (this.isBirdAndPipeCollided(pair.topPipe) || this.isBirdAndPipeCollided(pair.bottomPipe)) {
                return true;
            }
        }
        return false;
    },
    isBirdAndPipeCollided(pipe) {
        var bx = bird.left + bird.width / 2; // x distance to bird's center point
        var by = bird.top + bird.height / 2; // y distance to bird's center point
        var px = pipe.left + pipe.width / 2; // x distance to pipe's center point
        var py = pipe.top + pipe.height / 2; // y distance to pipe's center point
        // if the distance between center point of the bird and the pipe less than or equal to their width sum/2, collide
        if (Math.abs(bx - px) <= (bird.width + pipe.width) / 2 &&
            Math.abs(by - py) <= (bird.height + pipe.height) / 2) {
            return true;
        } else {
            return false;
        }

    }
}
collisionManager.collisionDetector = createTimer(collisionManager, 16, function () {
    if (this.isCollided()) {
        game.stop();
        game.overDOM.style.display = "block";
        game.isOver = true;
    }
})

/**
 * register control event for the whole window
 * @param {*} e 
 * @returns 
 */
window.onkeydown = function (e) {
    if (e.key === "Enter") {
        if (game.isOver) {
            location.reload();
            return;
        }
        if (game.isStarted === false) {
            game.start();
            game.isStarted = true;
        } else {
            game.stop();
            game.isStarted = false;
        }
    } else if (e.key === " ") {
        bird.jump();
    }
}