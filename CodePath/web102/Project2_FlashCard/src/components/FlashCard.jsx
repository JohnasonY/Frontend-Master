import { useState } from "react";

function FlashCard({ flagImage, country }) {
  const [isFlipped, setIsFlipped] = useState(false);
  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  return (
    <button className="flashcard" onClick={handleFlip}>
      <img src={flagImage} alt="Mystery country flag" />
      {isFlipped && <span>{country.name}</span>}
    </button>
  );
}

export default FlashCard;
