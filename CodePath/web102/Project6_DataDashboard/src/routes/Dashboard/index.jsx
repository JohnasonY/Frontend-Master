import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../../components/Header";
import HeightFilter from "../../components/HeightFilter";
import PokemonList from "../../components/PokemonList";
import SearchBar from "../../components/SearchBar";
import StatisticsCard from "../../components/StatisticsCard";
import TypeFilter from "../../components/TypeFilter";
import { fetchPokemon } from "../../services/pokemonAPI";
import "./Dashboard.css";

const CHART_COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#f59e0b",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#4b5563",
];

export default function Dashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [activeVisualization, setActiveVisualization] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
        setIsLoading(true);
        const data = await fetchPokemon(30);
        setPokemon(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    return pokemon.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesType =
        selectedType === "all" || item.types.includes(selectedType);
      const heightInMeters = item.height / 10;
      const matchesMinimum =
        minHeight === "" || heightInMeters >= Number(minHeight);
      const matchesMaximum =
        maxHeight === "" || heightInMeters <= Number(maxHeight);
      return matchesName && matchesType && matchesMinimum && matchesMaximum;
    });
  }, [pokemon, searchInput, selectedType, minHeight, maxHeight]);

  const typeDistribution = useMemo(() => {
    const typeCounts = pokemon.reduce((counts, item) => {
      item.types.forEach((type) => {
        counts[type] = (counts[type] || 0) + 1;
      });
      return counts;
    }, {});

    return Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [pokemon]);

  const averageWeightByType = useMemo(() => {
    const typeWeights = pokemon.reduce((groups, item) => {
      item.types.forEach((type) => {
        if (!groups[type]) groups[type] = { totalWeight: 0, count: 0 };
        groups[type].totalWeight += item.weight / 10;
        groups[type].count += 1;
      });
      return groups;
    }, {});

    return Object.entries(typeWeights)
      .map(([type, value]) => ({
        type,
        averageWeight: Number((value.totalWeight / value.count).toFixed(1)),
      }))
      .sort((a, b) => b.averageWeight - a.averageWeight)
      .slice(0, 8);
  }, [pokemon]);

  const averageWeight = pokemon.length
    ? (
        pokemon.reduce((sum, item) => sum + item.weight, 0) /
        pokemon.length /
        10
      ).toFixed(1)
    : "0.0";
  const tallestPokemon = pokemon.length
    ? pokemon.reduce((tallest, item) =>
        item.height > tallest.height ? item : tallest,
      )
    : null;

  return (
    <>
      <Header />

      <section
        className="statistics-grid"
        aria-label="Pokemon summary statistics"
      >
        <StatisticsCard
          value={pokemon.length || "-"}
          label="Pokemon discovered"
          tone="blue"
        />
        <StatisticsCard
          value={`${averageWeight} kg`}
          label="Average weight"
          tone="purple"
        />
        <StatisticsCard
          value={
            tallestPokemon
              ? `${(tallestPokemon.height / 10).toFixed(1)} m`
              : "-"
          }
          label={
            tallestPokemon
              ? `Tallest: ${tallestPokemon.name}`
              : "Tallest Pokemon"
          }
          tone="pink"
        />
      </section>

      <section className="visualizations-section" aria-label="Pokemon charts">
        <div className="visualizations-header">
          <div>
            <h2>Data visualizations</h2>
          </div>
          <div
            className="chart-toggle"
            role="tablist"
            aria-label="Choose dashboard visualization"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeVisualization === "all"}
              className={activeVisualization === "all" ? "active" : ""}
              onClick={() => setActiveVisualization("all")}
            >
              All
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeVisualization === "types"}
              className={activeVisualization === "types" ? "active" : ""}
              onClick={() => setActiveVisualization("types")}
            >
              Type counts
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeVisualization === "weights"}
              className={activeVisualization === "weights" ? "active" : ""}
              onClick={() => setActiveVisualization("weights")}
            >
              Weight by type
            </button>
          </div>
        </div>

        <div
          className={`charts-grid ${activeVisualization !== "all" ? "single-chart" : ""}`}
        >
          {(activeVisualization === "all" ||
            activeVisualization === "types") && (
            <article className="chart-panel">
          <div className="chart-heading">
            <h2>Most common types</h2>
            <p>Dual-type Pokemon count in each matching type.</p>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={typeDistribution}
                margin={{ top: 8, right: 12, bottom: 0, left: -24 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" tickLine={false} axisLine={false} />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(37, 99, 235, 0.08)" }} />
                <Bar
                  dataKey="count"
                  name="Pokemon"
                  radius={[6, 6, 0, 0]}
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
            </article>
          )}

          {(activeVisualization === "all" ||
            activeVisualization === "weights") && (
            <article className="chart-panel">
          <div className="chart-heading">
            <h2>Heaviest type groups</h2>
            <p>Average weight by type in kilograms.</p>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={averageWeightByType}
                  dataKey="averageWeight"
                  nameKey="type"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={3}
                  label={({ type }) => type}
                >
                  {averageWeightByType.map((entry, index) => (
                    <Cell
                      key={entry.type}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} kg`, "Average weight"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
            </article>
          )}
        </div>
      </section>

      <section className="data-panel">
        <div className="panel-heading">
          <div>
            <h2>Explore the collection</h2>
          </div>
        </div>

        <div className="filters">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <TypeFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <HeightFilter
            minHeight={minHeight}
            maxHeight={maxHeight}
            setMinHeight={setMinHeight}
            setMaxHeight={setMaxHeight}
          />
        </div>

        {isLoading && (
          <div className="status-message">Loading Pokemon data...</div>
        )}
        {error && (
          <div className="status-message error">
            Unable to load the Pokedex. {error}
          </div>
        )}
        {!isLoading && !error && <PokemonList pokemon={filteredPokemon} />}
      </section>
    </>
  );
}
