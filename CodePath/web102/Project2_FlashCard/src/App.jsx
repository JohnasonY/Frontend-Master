import "./App.css";
import Header from "./components/Header";
const App = () => {
  return (
    <div className="App">
      <Header
        cardCount={10}
        selectedDifficulty="easy"
        onDifficultyChange={() => {}}
      />
    </div>
  );
};

export default App;
