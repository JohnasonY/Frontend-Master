(function () {
    var config = {
        smallImgSrc: "images/mouse.jpg",
        bigImgSrc: "images/mouseBigSize.jpg",
        smallDiv: document.getElementById("smallDiv"),
        bigDiv: document.getElementById("bigDiv"),
        moveDiv: document.getElementById("moveDiv"),
        smallImgSize: { //same as small div size
            width: 350,
            height: 350
        },
        bigImgSize: {
            width: 800,
            height: 800
        },
        bigDivSize: {
            width: 540,
            height: 540
        }
    }
    // move div size / small div size = big div size / big img size
    // calculate move div size based on the formula
    config.moveDivSize = {
        width: config.bigDivSize.width / config.bigImgSize.width * config.smallImgSize.width,
        height: config.bigDivSize.height / config.bigImgSize.height * config.smallImgSize.height
    }


    init();

    function init() {
        initMoveDiv();
        /**
         * initialize move div's dimension
         */
        function initMoveDiv() {
            config.moveDiv.style.width = config.moveDivSize.width + "px";
            config.moveDiv.style.height = config.moveDivSize.height + "px";
        }

        initDivBg();
        /**
         * initialize small and big div's background image
         */
        function initDivBg() {
            // small div background image
            config.smallDiv.style.background = `url(${config.smallImgSrc}) no-repeat left top/100% 100%`;
            // big div background image
            config.bigDiv.style.background = `url(${config.bigImgSrc}) no-repeat`;
        }

        // register mouse in event for small div
        config.smallDiv.onmouseenter = function () {
            // make move div visible
            config.moveDiv.style.display = "block";
            // make big div visible
            config.bigDiv.style.display = "block";
        }

        // register mouse out event for small div
        config.smallDiv.onmouseleave = function () {
            // make move div invisible
            config.moveDiv.style.display = "none";
            // make big div invisible
            config.bigDiv.style.display = "none";
        }

        // register mouse move event for small div
        config.smallDiv.onmousemove = function (e) {
            // get mouse location on small div
            var mouseLocation = getMouseOffset(e);
            // set move div location based on mouse location
            setMoveDiv(mouseLocation);
            // set big div background image location
            setBigDivBgImg();
        }

        /**
         * get mouse location on small div
         * @param {MouseEvent} e 
         * @returns 
         */
        function getMouseOffset(e) {
            // event target is small div
            if (e.target === config.smallDiv) {
                return {
                    left: e.offsetX,
                    top: e.offsetY
                }
            } else {
                // event target is move div
                var moveDivStyle = getComputedStyle(config.moveDiv),
                    moveDivLeft = parseFloat(moveDivStyle.left);
                moveDivTop = parseFloat(moveDivStyle.top);
                return {
                    left: e.offsetX + moveDivLeft + 1,
                    top: e.offsetY + moveDivTop + 1
                }
            }

        }

        /**
         * set move div location
         * @param {object} mouseLocation 
         */
        function setMoveDiv(mouseLocation) {
            // move div's left = mouse's left - move div's width / 2
            // move div's top = mouse's top - move div's height / 2
            var moveDivLeft = mouseLocation.left - config.moveDivSize.width / 2,
                moveDivTop = mouseLocation.top - config.moveDivSize.height / 2;

            // edge cases
            if (moveDivLeft < 0) {
                moveDivLeft = 0;
            }
            if (moveDivTop < 0) {
                moveDivTop = 0;
            }
            if (moveDivLeft > config.smallImgSize.width - config.moveDivSize.width) {
                moveDivLeft = config.smallImgSize.width - config.moveDivSize.width;
            }
            if (moveDivTop > config.smallImgSize.height - config.moveDivSize.height) {
                moveDivTop = config.smallImgSize.height - config.moveDivSize.height;
            }
            config.moveDiv.style.left = moveDivLeft + "px";
            config.moveDiv.style.top = moveDivTop + "px";
        }

        /**
         * set big div background image location
         */
        function setBigDivBgImg() {
            // move div's left / small div's width = big div's left / big image's width
            // // move div's top / small div's height = big div's top / big image's height
            var moveDivStyle = getComputedStyle(config.moveDiv),
                moveDivLeft = parseFloat(moveDivStyle.left),
                moveDivTop = parseFloat(moveDivStyle.top);
            var bgImgLeft = moveDivLeft / config.smallImgSize.width * config.bigImgSize.width,
                bgImgTop = moveDivTop / config.smallImgSize.height * config.bigImgSize.height;

            config.bigDiv.style.backgroundPosition = `-${bgImgLeft}px -${bgImgTop}px`;
        }
    }

})()