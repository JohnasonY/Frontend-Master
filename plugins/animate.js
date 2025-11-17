if (!this.myPlugin) {
    this.myPlugin = {};
}

this.myPlugin.Animate = function (config) {
    // default configuration
    var defaultConfig = {
        interval: 16, // time interval for each data change
        duration: 1000, // total time for data change
        begin: {}, // 
        end: {}
    }
    // mixin default config with user given config
    this.config = myPlugin.mixin(defaultConfig, config);
    this.timer = null; // timer id for setTimeInterval
    // the number of times for data change
    this.timeNum = Math.ceil(this.config.duration / this.config.interval);
    // current number of time in data changing
    this.curtimeNum = 0;
    // current data status
    this.curData = myPlugin.clone(this.config.begin);
    // the difference of all data change from begin to end
    this.diff = {};
    // the difference of each data change in each time
    this.eachDiff = {};
    for (var prop in this.config.begin) {
        this.diff[prop] = this.config.end[prop] - this.config.begin[prop];
        this.eachDiff[prop] = this.diff[prop] / this.timeNum;
    }
}

/**
 * start animaiton
 */
this.myPlugin.Animate.prototype.start = function () {
    // if there is an animation exist or animation reach the end
    if (this.timer || this.curtimeNum === this.timeNum) {
        return;
    }
    var that = this;
    if (this.config.onstart) {
        this.config.onstart.call(that);
    }
    this.timer = setInterval(function () {
        // increment number of time
        that.curtimeNum++;
        for (var prop in that.curData) {
            if (that.curtimeNum === that.timeNum) {
                // last change
                that.curData[prop] = that.config.end[prop];
            } else {
                that.curData[prop] += that.eachDiff[prop];
            }
        }
        if (that.config.onmove) {
            that.config.onmove.call(that);
        }
        if (that.curtimeNum === that.timeNum) {
            that.stop();
            if (that.config.onover) {
                that.config.onover.call(that);
            }
        }
    }, this.config.interval);
}

/**
 * stop animation
 */
this.myPlugin.Animate.prototype.stop = function () {
    clearInterval(this.timer);
    this.timer = null;
}