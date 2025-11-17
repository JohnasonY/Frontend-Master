var config = {
    imgWidth: 520, // One image width
    dotWidth: 12, // One round dot width
    doms: { // Related DOM Objects
        divContainer: document.querySelector(".container"),
        divImgs: document.querySelector(".container .imgs"),
        divDots: document.querySelector(".container .dots"),
        divArrow: document.querySelector(".container .arrow"),
    },
    currentIndex: 0, // actual image index showing on the screen, 0 ~ imgNumber - 1
    timer: {
        duration: 16, // time interval for image moving
        total: 500, // total time for each animation
        id: null
    },
    autoTimer: null
}
// dynamically getting the number of images on page
config.imgNumber = config.doms.divImgs.children.length;

/**
 * initialize the element size based on the number of images on carousel
 */
function initElmSize() {
    // initialize dots div's width
    config.doms.divDots.style.width = config.dotWidth * config.imgNumber + "px";
    // initialize imgs div's width
    config.doms.divImgs.style.width = config.imgWidth * (config.imgNumber + 2) + "px";
}

function initElements() {
    // create round dots
    for (var i = 0; i < config.imgNumber; i++) {
        var span = document.createElement("span");
        config.doms.divDots.appendChild(span);
    }
    // copy the first image to the last and the last image to the first
    var children = config.doms.divImgs.children;
    var fistImg = children[0].cloneNode(true),
        lastImg = children[config.imgNumber - 1].cloneNode(true);

    config.doms.divImgs.appendChild(fistImg);
    config.doms.divImgs.insertBefore(lastImg, children[0]);
}

/**
 * initialize the first image position
 */
function initPosition() {
    /*
        currentIndex    marginLeft
            0           -imgWidth
            1           -2*imgWidth
            2           -3*imgWidth
    */
    var marginLeft = (-config.currentIndex - 1) * config.imgWidth;
    config.doms.divImgs.style.marginLeft = marginLeft + "px";
}

/**
 * set round dots' status
 */
function setDotStatus() {
    for (var i = 0; i < config.doms.divDots.children.length; i++) {
        var dot = config.doms.divDots.children[i];
        if (i === config.currentIndex) {
            dot.className = "active";
        } else {
            dot.className = "";
        }
    }
}

function init() {
    initElmSize();
    initElements();
    initPosition();
    setDotStatus();
}

init();

/**
 * switch to the target image to user based on index and direction
 * @param {*} index Target index
 * @param {*} direction "left" or "right"
 */
function switchTo(index, direction) {
    if (index === config.currentIndex) {
        return;
    }
    if (!direction) {
        direction = "left";
    }
    // final margin left
    var newMarginLeft = (-index - 1) * config.imgWidth;
    // config.doms.divImgs.style.marginLeft = newMarginLeft + "px";
    animateSwitch();
    // set current index
    config.currentIndex = index;
    setDotStatus();

    /**
     * set final margin left with animation
     */
    function animateSwitch() {
        stopAnimate(); // stop the previous animaiton when switching images

        // 1. calculate movement times
        var number = Math.ceil(config.timer.total / config.timer.duration);
        var curNumber = 0; // current movement count
        // 2. calculate total distance change from currentIndex to target index
        var totalDis,
            curMarginLeft = parseFloat(getComputedStyle(config.doms.divImgs).marginLeft),
            totalWidth = config.imgNumber * config.imgWidth;
        if (direction === "left") {
            if (newMarginLeft < curMarginLeft) {
                totalDis = newMarginLeft - curMarginLeft;
            } else {
                totalDis = -(totalWidth - Math.abs(newMarginLeft - curMarginLeft));
            }
        } else {
            if (newMarginLeft > curMarginLeft) {
                totalDis = newMarginLeft - curMarginLeft;
            } else {
                totalDis = totalWidth - Math.abs(newMarginLeft - curMarginLeft);
            }
        }

        // 3. calculate each distance for chaning margin left in animation 
        var eachDis = totalDis / number;
        config.timer.id = setInterval(function () {
            // change margin left for each time
            curMarginLeft += eachDis;
            if (direction === "left" && Math.abs(curMarginLeft) > totalWidth) {
                curMarginLeft += totalWidth;
            } else if (direction === "right" && Math.abs(curMarginLeft) < config.imgWidth) {
                curMarginLeft -= totalWidth;
            }
            config.doms.divImgs.style.marginLeft = curMarginLeft + "px";
            curNumber++;
            if (curNumber === number) {
                stopAnimate();
            }
        }, config.timer.duration);
    }

    function stopAnimate() {
        clearInterval(config.timer.id);
        config.timer.id = null;
    }
}


config.doms.divArrow.onclick = function (e) {
    if (e.target.classList.contains("left")) {
        toLeft();
    } else if (e.target.classList.contains("right")) {
        toRight();
    }
}

function toLeft() {
    var index = config.currentIndex - 1;
    if (index < 0) {
        index = config.imgNumber - 1;
    }
    switchTo(index, "right");
}

function toRight() {
    var index = (config.currentIndex + 1) % config.imgNumber;
    switchTo(index, "left");
}

config.doms.divDots.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
        var index = Array.from(this.children).indexOf(e.target);
        switchTo(index, index > config.currentIndex ? "left" : "right");
    }
}

config.autoTimer = setInterval(toRight, 4000);

config.doms.divContainer.onmouseenter = function () {
    clearInterval(config.autoTimer);
    config.autoTimer = null;
}

config.doms.divContainer.onmouseleave = function () {
    if (config.autoTimer) {
        return;
    }
    config.autoTimer = setInterval(toRight, 4000);
}