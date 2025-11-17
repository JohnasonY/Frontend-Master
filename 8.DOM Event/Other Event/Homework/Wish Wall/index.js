var config = {
    wishWallDOM: document.querySelector(".container"),
    inputDOM: document.querySelector(".txt"),
    itemHTML: `<div class="item">
        replaceTxt
        <span class="close">X</span>
    </div>`,
}

config.inputDOM.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && config.inputDOM.value.trim() !== "") {
        // create a new item element
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = config.itemHTML.replace("replaceTxt", config.inputDOM.value);
        // get rid of the outer div
        var newWish = tempDiv.firstChild;
        // append to wishwall DOM
        config.wishWallDOM.appendChild(newWish);
        // randomly set new wish item's color
        var randRed = getRandNum(0, 255),
            randGreen = getRandNum(0, 255),
            randBlue = getRandNum(0, 255)
        newWish.style.backgroundColor = `rgb(${randRed}, ${randGreen}, ${randBlue})`;

        // randomly set new wish item's location
        // 1.get wish item dimension
        var wishItemStyle = getComputedStyle(newWish),
            wishItemWidth = parseFloat(wishItemStyle.width),
            wishItemHeight = parseFloat(wishItemStyle.height);

        // 2.calculate the max left and max top for the wish item on page
        var maxLeft = document.documentElement.clientWidth - wishItemWidth,
            maxTop = document.documentElement.clientHeight - wishItemHeight;

        // 3.get a random left and top for the new wish item
        var randLeft = getRandNum(0, maxLeft),
            randTop = getRandNum(0, maxTop);

        // 4.set wish item's left and top to randLeft and randTop
        newWish.style.left = randLeft + "px";
        newWish.style.top = randTop + "px";

        config.inputDOM.value = "";

        function getRandNum(min, max) {
            return Math.floor(Math.random() * (max + 1 - min) + min);
        }
    }

})

// register delete event for all wish item
document.addEventListener("click", function (e) {
    if (e.target.className === "close") {
        e.target.parentNode.remove();
    }
})

// register drag event for all wish item
document.addEventListener("mousedown", function (e) {
    if (e.target.className === "item") {

        // define the moveHandler outside so we can remove it later
        function moveHandler(e) {
            var itemStyle = getComputedStyle(e.target),
                itemLeft = parseFloat(itemStyle.left),
                itemTop = parseFloat(itemStyle.top),
                itemWidth = parseFloat(itemStyle.width),
                itemHeight = parseFloat(itemStyle.height);

            var newItemLeft = itemLeft + e.movementX,
                newItemTop = itemTop + e.movementY;

            if (newItemLeft < 0) {
                newItemLeft = 0;
            }
            if (newItemTop < 0) {
                newItemTop = 0;
            }
            if (newItemLeft + itemWidth > document.documentElement.clientWidth) {
                newItemLeft = document.documentElement.clientWidth - itemWidth;
            }
            if (newItemTop + itemHeight > document.documentElement.clientHeight) {
                newItemTop = document.documentElement.clientHeight - itemHeight;
            }

            e.target.style.left = newItemLeft + "px";
            e.target.style.top = newItemTop + "px";
        }

        window.addEventListener("mousemove", moveHandler);

        window.addEventListener("mouseup", function mouseUpHandler() {
            window.removeEventListener("mousemove", moveHandler);
            window.removeEventListener("mouseup", mouseUpHandler);
        });
    }
});