import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import HeightFilter from './components/HeightFilter'
import NavBar from './components/NavBar'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import StatisticsCard from './components/StatisticsCard'
import TypeFilter from './components/TypeFilter'
import { fetchPokemon } from './services/pokemonAPI'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [minHeight, setMinHeight] = useState('')
  const [maxHeight, setMaxHeight] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPokemon() {
      try {
        setIsLoading(true)
        const data = await fetchPokemon(30)
        setPokemon(data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemon()
  }, [])

  const filteredPokemon = useMemo(() => {
    const query = searchInput.trim().toLowerCase()
    return pokemon.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query)
      const matchesType = selectedType === 'all' || item.types.includes(selectedType)
      const heightInMeters = item.height / 10
      const matchesMinimum = minHeight === '' || heightInMeters >= Number(minHeight)
      const matchesMaximum = maxHeight === '' || heightInMeters <= Number(maxHeight)
      return matchesName && matchesType && matchesMinimum && matchesMaximum
    })
  }, [pokemon, searchInput, selectedType, minHeight, maxHeight])

  const averageWeight = pokemon.length
    ? (pokemon.reduce((sum, item) => sum + item.weight, 0) / pokemon.length / 10).toFixed(1)
    : '0.0'
  const tallestPokemon = pokemon.length
    ? pokemon.reduce((tallest, item) => item.height > tallest.height ? item : tallest)
    : null

  return (
    <div className="app-shell">
      <NavBar />
      <main className="dashboard">
        <Header />

        <section className="statistics-grid" aria-label="Pokemon summary statistics">
          <StatisticsCard value={pokemon.length || '—'} label="Pokémon discovered" tone="blue" />
          <StatisticsCard value={`${averageWeight} kg`} label="Average weight" tone="purple" />
          <StatisticsCard
            value={tallestPokemon ? `${(tallestPokemon.height / 10).toFixed(1)} m` : '—'}
            label={tallestPokemon ? `Tallest · ${tallestPokemon.name}` : 'Tallest Pokémon'}
            tone="pink"
          />
        </section>

        <section className="data-panel">
          <div className="panel-heading">
            <div>
              <h2>Explore the collection</h2>
            </div>
          </div>

          <div className="filters">
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            <HeightFilter
              minHeight={minHeight}
              maxHeight={maxHeight}
              setMinHeight={setMinHeight}
              setMaxHeight={setMaxHeight}
            />
          </div>

          {isLoading && <div className="status-message">Loading Pokémon data…</div>}
          {error && <div className="status-message error">Unable to load the Pokédex. {error}</div>}
          {!isLoading && !error && <PokemonList pokemon={filteredPokemon} />}
        </section>
      </main>
    </div>
  )
}

export default App
