import { useState } from "react";
import "./Guess.css";

export default function Guess({
  correctAnswer,
  alreadyAnsweredCorrectly,
  onCorrect,
  onWrong,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState("notChecked");
  const hasCorrectAnswer = alreadyAnsweredCorrectly || isCorrect === "correct";

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  /**
   * Check if user answer match with correct answer (case insensitive)
   */
  const handleCheck = () => {
    if (hasCorrectAnswer) {
      return;
    }

    if (
      correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase()
    ) {
      setIsCorrect("correct");
      onCorrect();
    } else {
      setIsCorrect("wrong");
      onWrong();
    }
  };

  return (
    <div className="Guess">
      <b>Guess the answer here:</b>
      <input
        type="text"
        placeholder="Put your answer here"
        id="guess-answer"
        className={isCorrect}
        value={userAnswer}
        onChange={handleChange}
      />
      <button
        className="submit-guess"
        type="button"
        onClick={handleCheck}
        disabled={hasCorrectAnswer}
      >
        Submit Guess
      </button>
    </div>
  );
}
