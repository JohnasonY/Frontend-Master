import "./App.css";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <div className="App">
      <h1>Itinerary for 7 Days in Beijing</h1>
      <h2>
        Welcome to Beijing! Check out this calendar to explore the city and
        enjoy the highlights during you stay.
      </h2>
      <Calendar />
    </div>
  );
};

export default App;
