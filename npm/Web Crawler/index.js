const getAllMoivesData = require("./getMoivesData");
const fs = require("fs");

getAllMoivesData().then((moviesArr) => {
  const json = JSON.stringify(moviesArr);
  fs.writeFile("popMovies.json", json, () => {
    console.log("write success!!!");
  });
});
