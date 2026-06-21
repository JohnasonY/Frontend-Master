import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import FlashCard from "./components/FlashCard";
import Guess from "./components/Guess";

import {
  countries_easy,
  countries_medium,
  countries_hard,
} from "./data/countries";

const countriesByDifficulty = {
  easy: countries_easy,
  medium: countries_medium,
  hard: countries_hard,
};

const flagImages = import.meta.glob("./assets/flags/**/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

// function getRandomCountry(difficulty, currentCountryCode) {
//   const countries = countriesByDifficulty[difficulty];
//   const availableCountries = countries.filter(
//     (country) => country.code !== currentCountryCode,
//   );
//   const randomIndex = Math.floor(Math.random() * availableCountries.length);

//   return availableCountries[randomIndex];
// }

function shuffleCountries(country) {
  const copy = [...country]; // keep original country array unchanged

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // swap
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
}

const App = () => {
  // shuffle once at the beginning
  const randCountries = shuffleCountries(countriesByDifficulty.easy);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [country, setCountry] = useState(randCountries[0]); // current country displayed on the card
  const [countries, setCountries] = useState(randCountries); // current countries array
  const [curIndex, setCurIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [, setMasteredCards] = useState([]);
  const [streak, setStreak] = useState(0); // current streak
  const [longestStreak, setLongestStreak] = useState(0); // longest streak
  const [countedCorrectCardKeys, setCountedCorrectCardKeys] = useState(
    () => new Set(),
  );
  const hasCards = country !== null && countries.length > 0;
  const flagPath = hasCards
    ? `./assets/flags/${selectedDifficulty}/${country.code}.svg`
    : "";
  const currentCardKey = hasCards
    ? `${selectedDifficulty}-${country.code}`
    : "";
  const alreadyAnsweredCorrectly = countedCorrectCardKeys.has(currentCardKey);

  function handleDifficultyChange(difficulty) {
    setSelectedDifficulty(difficulty);
    // go back to the first card
    setCurIndex(0);
    setIsCardFlipped(false);
    setMasteredCards([]);
    setCountedCorrectCardKeys(new Set());
    const randCountries = shuffleCountries(countriesByDifficulty[difficulty]);
    setCountries(randCountries);
    setCountry(randCountries[0]);
  }

  function handleNextCard() {
    let nextIndex = curIndex + 1;
    if (nextIndex >= countries.length) {
      // out of bound
      return;
    }
    setIsCardFlipped(false);
    setCurIndex(nextIndex);
    setCountry(countries[nextIndex]);
  }

  function handlePrevCard() {
    let prevIndex = curIndex - 1;
    if (prevIndex < 0) {
      // out of bound
      return;
    }
    setIsCardFlipped(false);
    setCurIndex(prevIndex);
    setCountry(countries[prevIndex]);
  }

  function handleShuffleCountries() {
    if (!hasCards) {
      return;
    }

    const randCountries = shuffleCountries(
      countries,
    );
    setIsCardFlipped(false);
    setCountries(randCountries);
    setCountry(randCountries[curIndex]);
  }

  function handleFlipCard() {
    setIsCardFlipped((current) => !current);
  }

  function handleCorrect() {
    if (alreadyAnsweredCorrectly) {
      return;
    }

    setCountedCorrectCardKeys((prevCardKeys) => {
      const nextCardKeys = new Set(prevCardKeys);
      nextCardKeys.add(currentCardKey);
      return nextCardKeys;
    });
    setStreak((prevStreak) => {
      const newStreak = prevStreak + 1;
      setLongestStreak((prevLongestStreak) =>
        Math.max(prevLongestStreak, newStreak),
      );
      return newStreak;
    });
  }

  function handleWrong() {
    setStreak(0);
  }

  function handleMarkMastered() {
    if (!hasCards) {
      return;
    }

    const masteredCard = country;
    const remainingCountries = countries.filter(
      (card) => card.code !== masteredCard.code,
    );
    const nextIndex =
      curIndex >= remainingCountries.length
        ? remainingCountries.length - 1
        : curIndex;

    setMasteredCards((prevMasteredCards) => {
      const alreadyMastered = prevMasteredCards.some(
        (card) =>
          card.code === masteredCard.code &&
          card.difficulty === selectedDifficulty,
      );

      return alreadyMastered
        ? prevMasteredCards
        : [
            ...prevMasteredCards,
            { ...masteredCard, difficulty: selectedDifficulty },
          ];
    });
    setCountries(remainingCountries);
    setIsCardFlipped(false);

    if (remainingCountries.length === 0) {
      setCurIndex(0);
      setCountry(null);
      return;
    }

    setCurIndex(nextIndex);
    setCountry(remainingCountries[nextIndex]);
  }

  return (
    <div className="App">
      <Header
        cardCount={countries.length}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      <p id="streak">
        Current Streak: {streak}, longest streak: {longestStreak}
      </p>
      {hasCards ? (
        <>
          <FlashCard
            flagImage={flagImages[flagPath]}
            country={country}
            difficulty={selectedDifficulty}
            isFlipped={isCardFlipped}
            onFlip={handleFlipCard}
          />
          <Guess
            key={`${selectedDifficulty}-${country.code}`}
            correctAnswer={country.name}
            alreadyAnsweredCorrectly={alreadyAnsweredCorrectly}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        </>
      ) : (
        <p className="empty-cards">All cards mastered.</p>
      )}
      <div className="navigate">
        <button
          className="button prev"
          type="button"
          onClick={handlePrevCard}
          disabled={!hasCards || curIndex === 0}
          style={{
            cursor: !hasCards || curIndex === 0 ? "not-allowed" : "pointer",
            backgroundColor: !hasCards || curIndex === 0 ? "#dddddd" : "",
          }}
        >
          Prev
        </button>
        <button
          className="button next"
          type="button"
          onClick={handleNextCard}
          disabled={!hasCards || curIndex === countries.length - 1}
          style={{
            cursor:
              !hasCards || curIndex === countries.length - 1
                ? "not-allowed"
                : "pointer",
            backgroundColor:
              !hasCards || curIndex === countries.length - 1
                ? "#dddddd"
                : "",
          }}
        >
          Next
        </button>
        <button
          className="button mastered-button"
          type="button"
          onClick={handleMarkMastered}
          disabled={!hasCards}
        >
          Mark as Mastered
        </button>
      </div>
      <button
        className="shuffle"
        type="button"
        onClick={handleShuffleCountries}
        disabled={!hasCards}
      >
        Shuffle Cards
      </button>
    </div>
  );
};

export default App;
