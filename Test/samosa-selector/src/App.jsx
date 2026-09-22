import { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  function updateCount() {
    setCount(count + multiplier);
  }

  const config = {
    doubleStuffed: {
      count: 10,
      multiplier: 2,
    },
    partyPack: {
      count: 100,
      multiplier: 5,
    },
    fullfeast: {
      count: 1000,
      multiplier: 10,
    },
  };

  /**
   * sets the value of the state variable multiplier to two times its current value if the current number of counts is greater than or equal to 10
   */
  function buyDoubleStuffed() {
    if (count >= config.doubleStuffed.count) {
      setMultiplier(multiplier * config.doubleStuffed.multiplier);
      setCount(count - config.doubleStuffed.count);
    }
  }

  /**
   * sets the value of the state variable multiplier to five times its current value if the current value of count is greater than or equal to 100.
   */
  function buyPartyPack() {
    if (count >= config.partyPack.count) {
      setMultiplier(multiplier * config.partyPack.multiplier);
      setCount(count - config.partyPack.count);
    }
  }

  /**
   * sets the value of the state variable multiplier to ten times its current value if the current value of count is greater than or equal to 1000.
   */
  function buyFullFeast() {
    if (count >= config.fullfeast.count) {
      setMultiplier(multiplier * config.fullfeast.multiplier);
      setCount(count - config.fullfeast.count);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Samosa Selector</h1>
        <h2>Count: {count}</h2>
        <img
          className="samosa"
          src="https://helpful-griffin-0a0ba5.netlify.app/samosa.png"
          onClick={updateCount}
        />
      </div>
      <div className="container">
        <div className="upgrade">
          <h3>Double Stuffed 👯‍♀️</h3>
          <p>2x per click</p>
          <button onClick={buyDoubleStuffed}>10 samosas</button>
        </div>
        <div className="upgrade">
          <h3>Party Pack 🎉</h3>
          <p>5x per click</p>
          <button onClick={buyPartyPack}>100 samosas</button>
        </div>
        <div className="upgrade">
          <h3>Full Feast 👩🏽‍🍳</h3>
          <p>10x per click</p>
          <button onClick={buyFullFeast}>1000 samosas</button>
        </div>
      </div>
    </div>
  );
};

export default App;
