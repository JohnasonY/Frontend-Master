import { useState } from "react";
import "./App.css";
//components
import SeenList from "./components/SeenList";
import Discover from "./components/Discover";
import BanList from "./components/BanList";
//services
import { getRandomAmiibo } from "./services/AmiiboAPI";

function App() {
  const [seen, setSeen] = useState([]);
  const [currentInfo, setCurrentInfo] = useState(null);
  const [banned, setBanned] = useState({
    amiiboSeries: [],
    character: [],
    gameSeries: [],
    type: [],
  });

  const handleDiscover = async () => {
    const randAmiiboInfo = await getRandomAmiibo(banned);
    if (!randAmiiboInfo) {
      alert("No Amiibo found. Try removing some banned attributes.");
      return;
    }
    setCurrentInfo(randAmiiboInfo);
    setSeen((prevSeen) => [
      ...prevSeen,
      {
        image: randAmiiboInfo.image,
        description: randAmiiboInfo.name,
      },
    ]);
  };

  const handleBan = (key, value) => {
    setBanned((prevBanned) => {
      if (prevBanned[key].includes(value)) {
        return prevBanned;
      }
      return {
        ...prevBanned,
        [key]: [...prevBanned[key], value],
      };
    });
  };

  const handleUnban = (key, value) => {
    setBanned((prevBanned) => {
      return {
        ...prevBanned,
        [key]: prevBanned[key].filter((item) => item !== value),
      };
    });
  };
  return (
    <div className="app-layout">
      <SeenList header="What have we seen so far?" seen={seen} />
      <Discover
        header="Amiibo Showcase"
        description="Enjoy a radom Amiibo that you have never seen before"
        currentInfo={currentInfo}
        onDiscover={handleDiscover}
        onBan={handleBan}
      />
      <BanList
        header="Ban List"
        description="Select an attribute in your listing to ban it"
        banned={banned}
        onUnban={handleUnban}
      />
    </div>
  );
}

export default App;
