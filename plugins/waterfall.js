if (!this.myPlugin) {
    this.myPlugin = {};
}

/**
 * create waterfall images layout
 * @param {object}
 */
this.myPlugin.createWaterFall = function (config) {
    var defaultConfig = {
        container: document.body,
        imgsSrc: [],
        minHorGap: 10,
        vertGap: 10,
        imgWidth: 220,
    }
    // config mixin defaultConfig
    // If some configurations did not pass, give default setting
    config = Object.assign({}, defaultConfig, config);
    // store each image DOM
    var imgsDOM = [];

    handleContainer();
    createImgs();
    // setImgsPosition();

    // handling event for window size changing
    var debounce = myPlugin.debounce(setImgsPosition, 300);
    window.onresize = function () {
        debounce();
    }

    /**
     * create imgs dom and set their props and styles
     */
    function createImgs() {
        var debounce = myPlugin.debounce(setImgsPosition, 50);
        for (var i = 0; i < config.imgsSrc.length; i++) {
            var img = document.createElement("img");
            img.src = config.imgsSrc[i];
            img.style.width = config.imgWidth + "px";
            img.style.position = "absolute";
            img.style.transition = ".5s"; // img moving animation
            imgsDOM.push(img);
            img.onload = debounce;
            config.container.appendChild(img);
        }
    }

    /**
     * set container position to relative
     */
    function handleContainer() {
        var style = getComputedStyle(config.container);
        if (style.position === "static") {
            config.container.style.position = "relative";
        }
    }

    /**
     * set each img position
     */
    function setImgsPosition() {
        var info = getHorizontalInfo();
        var arr = new Array(info.imgsNum); // store the top value for the next image on each column
        arr.fill(0);
        imgsDOM.forEach(function (img) {
            // set current img top and left
            // top
            var minTop = Math.min.apply(null, arr);
            img.style.top = minTop + "px";
            var index = arr.indexOf(minTop);
            // update array for the next top
            arr[index] += img.clientHeight + config.vertGap;
            // left
            img.style.left = index * (config.imgWidth + info.horGap) + "px";
        });
        // set container height
        var maxTop = Math.max.apply(null, arr);
        config.container.style.height = maxTop - config.vertGap + "px";


        /**
         * get horiziontal information of the layout.
         * @return {object}
         */
        function getHorizontalInfo() {
            var info = {};
            // get container client width
            info.containerWidth = config.container.clientWidth;
            // calculate the number of imgs in one row
            // #imgs * imgWidth + (#imgs - 1) * minHGap = containerWidth
            // #imgs = (containerWidth + minHGap) / (imgWidth + minHGap)
            info.imgsNum = (config.container.clientWidth + config.minHorGap) / (config.imgWidth + config.minHorGap);
            // floor down image number
            info.imgsNum = Math.floor(info.imgsNum);
            // calculate each actual horizontal gap for the images
            info.horGap = (info.containerWidth - info.imgsNum * config.imgWidth) / (info.imgsNum - 1);
            return info;
        }
    }
}