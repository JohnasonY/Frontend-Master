// Data souce:
// https://editorial.rottentomatoes.com/guide/popular-movies/
//
// Crawling 30 most popular movies so far

// third party lib
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Get html file content in string
 * @returns {string} HTML in string
 */
async function getPageHtml() {
  try {
    const resp = await axios.get(
      "https://editorial.rottentomatoes.com/guide/popular-movies/"
    );
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}
/**
 * analyze one movie div content and return info in a object
 * @param {div} moveDiv movie div
 * @param {object} $ cherrio object
 * @returns {object} {name: xxx, year: xxx, imgSrc: xxx, rate: xxx, criticsConsensus: xxx, starring: [xxx, xxx, xxx]}
 */
function getOneMoive($, movieDiv) {
  // get movie name
  let name = movieDiv.find("div.article_movie_title H2 a").text();
  // get movie year
  let year = movieDiv
    .find("div.article_movie_title H2 span.subtle.start-year")
    .text();
  year = year.replace(/[()]/g, ""); // remove ()
  // get image source
  let imgSrc = movieDiv.find("img.article_poster").attr("src");
  // get movie rating in percentage
  let rate = movieDiv
    .find("div.article_movie_title H2 span.tMeterScore")
    .text();
  // get critics-consensus
  let criticsConsensus = movieDiv.find("div.info.critics-consensus").text();
  criticsConsensus = criticsConsensus.replace(/Critics Consensus: /g, ""); // remove "Critics Consensus:"
  criticsConsensus = criticsConsensus.replace(/^\s+/, ""); // remove leading spaces
  // get starring
  let starring = [];
  let starringList = movieDiv.find("div.info.cast a");
  for (let i = 0; i < starringList.length; i++) {
    let curStar = starringList[i];
    curStar = $(curStar).text();
    starring.push(curStar);
  }
  return {
    name,
    year,
    imgSrc,
    rate,
    criticsConsensus,
    starring,
  };
}

/**
 * Get all movies data
 * @returns {Array} contains all movies' objects
 */
async function getAllMoivesData() {
  const html = await getPageHtml();
  // cheerio object
  const $ = cheerio.load(html);
  // with selector, get all movies div in virtual dom
  const moviesDivs = $("div.row.countdown-item");
  // store each movie info in a single object
  let moviesArr = [];
  for (let i = 0; i < moviesDivs.length; i++) {
    const curMovieDiv = moviesDivs[i];
    const curMovieInfoObj = getOneMoive($, $(curMovieDiv));
    moviesArr.push(curMovieInfoObj);
  }
  return moviesArr;
}

module.exports = getAllMoivesData;
