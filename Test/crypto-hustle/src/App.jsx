import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./Components/CoinInfo";
import SideNav from "./Components/SideNav";
import CryptoNews from "./Components/CryptoNews";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  useEffect(() => {
    async function fetchAllCoinData() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1",
        {
          headers: {
            "x-cg-demo-api-key": API_KEY,
          },
        },
      );
      const data = await response.json();
      setList(data);
    }
    fetchAllCoinData().catch(console.error);
  }, []);
  console.log(list);
  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? filteredResults
              ? filteredResults.map((coin) => {
                  return (
                    <CoinInfo
                      key={coin.id}
                      id={coin.id}
                      image={coin.image}
                      name={coin.name}
                      symbol={coin.symbol}
                      price={coin.current_price}
                    />
                  );
                })
              : null
            : list
              ? list.map((coin) => {
                  return (
                    <CoinInfo
                      key={coin.id}
                      id={coin.id}
                      image={coin.image}
                      name={coin.name}
                      symbol={coin.symbol}
                      price={coin.current_price}
                    />
                  );
                })
              : null}
        </ul>
      </div>
      <SideNav />
      <CryptoNews />
    </>
  );
}

export default App;
