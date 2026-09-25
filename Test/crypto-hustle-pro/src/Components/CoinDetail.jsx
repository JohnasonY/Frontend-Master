import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const COINGECKO_API = "https://api.coingecko.com/api/v3";

const coinGeckoOptions = {
  headers: {
    "x-cg-demo-api-key": API_KEY,
  },
};

const formatUsd = value =>
  value != null
    ? value.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "N/A";

const formatNumber = value =>
  value != null ? value.toLocaleString("en-US") : "N/A";

const stripHtml = html => {
  const documentText = new DOMParser().parseFromString(html || "", "text/html");
  return documentText.body.textContent || "No description available.";
};

export default function CoinDetail() {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCoinDetail = async () => {
      setFullDetails(null);
      setError("");
      const normalizedSymbol = symbol.toLowerCase();

      const searchResponse = await fetch(
        `${COINGECKO_API}/search?query=${normalizedSymbol}`,
        coinGeckoOptions,
      );

      if (!searchResponse.ok) {
        throw new Error("Unable to search CoinGecko for this coin.");
      }

      const searchJson = await searchResponse.json();
      const coinMatch = searchJson.coins
        ?.filter(coin => coin.symbol.toLowerCase() === normalizedSymbol)
        .sort((a, b) => (a.market_cap_rank ?? Infinity) - (b.market_cap_rank ?? Infinity))[0];

      if (!coinMatch) {
        throw new Error(`No CoinGecko coin found for ${symbol.toUpperCase()}.`);
      }

      const detailsResponse = await fetch(
        `${COINGECKO_API}/coins/${coinMatch.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        coinGeckoOptions,
      );

      if (!detailsResponse.ok) {
        throw new Error("Unable to load CoinGecko details for this coin.");
      }

      setFullDetails(await detailsResponse.json());
    };

    if (symbol) {
      getCoinDetail().catch(error => {
        console.error(error);
        setError(error.message);
      });
    }
  }, [symbol]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!fullDetails) {
    return <p>Loading...</p>;
  }

  const marketData = fullDetails.market_data;
  const homepage = fullDetails.links?.homepage?.find(link => link);
  const description = stripHtml(fullDetails.description?.en);

  return (
    <div>
      <h1>{fullDetails.name}</h1>

      {fullDetails.image?.small && (
        <img
          className="images"
          src={fullDetails.image.small}
          alt={`Small icon for ${fullDetails.name} crypto coin`}
        />
      )}

      <div>{description}</div>

      <br />

      <div>
        This coin was built with the algorithm{" "}
        {fullDetails.hashing_algorithm || "N/A"}
      </div>

      <table>
        <tbody>
          <tr>
            <th>Launch Date</th>
            <td>{fullDetails.genesis_date || "N/A"}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              {homepage ? (
                <a href={homepage} target="_blank" rel="noreferrer">
                  Website
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <th>Current Price</th>
            <td>{formatUsd(marketData?.current_price?.usd)}</td>
          </tr>
          <tr>
            <th>Market Cap Rank</th>
            <td>{fullDetails.market_cap_rank || "N/A"}</td>
          </tr>
          <tr>
            <th>24 Hour Volume</th>
            <td>{formatUsd(marketData?.total_volume?.usd)}</td>
          </tr>
          <tr>
            <th>Highest Price during the Day</th>
            <td>{formatUsd(marketData?.high_24h?.usd)}</td>
          </tr>
          <tr>
            <th>Lowest Price during the Day</th>
            <td>{formatUsd(marketData?.low_24h?.usd)}</td>
          </tr>
          <tr>
            <th>Change in 24 Hours</th>
            <td>{formatUsd(marketData?.price_change_24h)}</td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>{formatUsd(marketData?.market_cap?.usd)}</td>
          </tr>
          <tr>
            <th>Circulating Supply</th>
            <td>{formatNumber(marketData?.circulating_supply)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
