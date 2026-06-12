import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import FlashCard from "./components/FlashCard";
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

function getRandomCountry(difficulty, currentCountryCode) {
  const countries = countriesByDifficulty[difficulty];
  const availableCountries = countries.filter(
    (country) => country.code !== currentCountryCode,
  );
  const randomIndex = Math.floor(Math.random() * availableCountries.length);

  return availableCountries[randomIndex];
}

const App = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [country, setCountry] = useState(() => getRandomCountry("easy"));
  const flagPath = `./assets/flags/${selectedDifficulty}/${country.code}.svg`;

  function handleDifficultyChange(difficulty) {
    setSelectedDifficulty(difficulty);
    setCountry(getRandomCountry(difficulty));
  }

  function handleNextCard() {
    setCountry((currentCountry) =>
      getRandomCountry(selectedDifficulty, currentCountry.code),
    );
  }

  return (
    <div className="App">
      <Header
        cardCount={countriesByDifficulty[selectedDifficulty].length}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      <FlashCard
        key={`${selectedDifficulty}-${country.code}`}
        flagImage={flagImages[flagPath]}
        country={country}
        difficulty={selectedDifficulty}
      />
      <button className="next-button" type="button" onClick={handleNextCard}>
        Next
      </button>
    </div>
  );
};

export default App;
