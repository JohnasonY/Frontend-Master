const url = `/api/herolist`;
fetch(url)
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp);
  });

//file loader
//url loader
const png = require("./assets/webpack.png").default;

console.log(png);

if (Math.random() < 0.5) {
  var img = document.createElement("img");
  img.src = png;
  document.body.appendChild(img);
}
