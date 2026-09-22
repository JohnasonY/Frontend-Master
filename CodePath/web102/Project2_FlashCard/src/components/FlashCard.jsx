import "./FlashCard.css";
import { useState } from "react";

const difficultyAlpha = {
  easy: 0.1,
  medium: 0.2,
  hard: 0.3,
};

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCardColor(difficulty) {
  const red = randomBetween(0, 255);
  const green = randomBetween(0, 255);
  const blue = randomBetween(0, 255);
  const alpha = difficultyAlpha[difficulty] ?? difficultyAlpha.easy;

  return {
    background: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
    hoverBackground: `rgba(${red}, ${green}, ${blue}, ${alpha + 0.1})`,
    text: "#1f1f1f",
  };
}

function FlashCard({ flagImage, country, difficulty, isFlipped, onFlip }) {
  const [cardColor] = useState(() => generateCardColor(difficulty));

  return (
    <button
      className={`flashcard ${isFlipped ? "is-flipped" : ""}`}
      onClick={onFlip}
      aria-label={
        isFlipped
          ? `${country.name}. Show flag`
          : "Mystery country flag. Show country name"
      }
      style={{
        "--card-color": cardColor.background,
        "--card-hover-color": cardColor.hoverBackground,
        "--card-text-color": cardColor.text,
      }}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <img src={flagImage} alt="Mystery country flag" />
        </div>
        <div className="flashcard-face flashcard-back">
          <span>{country.name}</span>
        </div>
      </div>
    </button>
  );
}

export default FlashCard;
