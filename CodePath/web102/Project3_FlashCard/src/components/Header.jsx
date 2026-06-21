import "./Header.css";

const difficulties = ["easy", "medium", "hard"];

function Header({ cardCount, selectedDifficulty, onDifficultyChange }) {
  return (
    <header className="header">
      <h1>Country Flag Master</h1>
      <p className="description">
        Test your knowledge of flags from around the world
      </p>
      <nav className="difficulty-options" aria-label="Select difficulty">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            type="button"
            aria-pressed={selectedDifficulty === difficulty}
            onClick={() => onDifficultyChange(difficulty)}
          >
            {difficulty}
          </button>
        ))}
      </nav>
      <p className="cardCount">Number of cards: {cardCount}</p>
    </header>
  );
}

export default Header;
