import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPokemonById } from '../../services/pokemonAPI'
import './PokemonDetail.css'

export default function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPokemonDetail() {
      try {
        setIsLoading(true)
        setError('')
        const data = await fetchPokemonById(id)
        setPokemon(data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemonDetail()
  }, [id])

  if (isLoading) {
    return <div className="detail-status">Loading Pokemon detail...</div>
  }

  if (error) {
    return (
      <section className="detail-status error">
        <p>Unable to load this Pokemon. {error}</p>
        <Link to="/">Back to dashboard</Link>
      </section>
    )
  }

  const number = String(pokemon.id).padStart(3, '0')

  return (
    <section className="detail-page">
      <Link className="back-link" to="/">Back to dashboard</Link>

      <article className="detail-hero">
        <div className="detail-copy">
          <span className="pokemon-number">#{number}</span>
          <h1>{pokemon.name}</h1>
          <div className="type-list">
            {pokemon.types.map((type) => <span className={`type-chip type-${type}`} key={type}>{type}</span>)}
          </div>
        </div>
        <img src={pokemon.image} alt={pokemon.name} />
      </article>

      <section className="detail-grid" aria-label={`${pokemon.name} extra details`}>
        <article className="detail-panel">
          <h2>Profile</h2>
          <dl className="detail-list">
            <div><dt>Height</dt><dd>{(pokemon.height / 10).toFixed(1)} m</dd></div>
            <div><dt>Weight</dt><dd>{(pokemon.weight / 10).toFixed(1)} kg</dd></div>
            <div><dt>Base experience</dt><dd>{pokemon.baseExperience}</dd></div>
            <div><dt>Known moves</dt><dd>{pokemon.movesCount}</dd></div>
          </dl>
        </article>

        <article className="detail-panel">
          <h2>Abilities</h2>
          <ul className="detail-tags">
            {pokemon.abilities.map((ability) => <li key={ability}>{ability}</li>)}
          </ul>
        </article>

        <article className="detail-panel stats-panel">
          <h2>Base stats</h2>
          <ul className="stat-bars">
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                <span>{stat.name}</span>
                <strong>{stat.value}</strong>
                <div className="stat-track">
                  <div style={{ width: `${(Math.min(stat.value, 160) / 160) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  )
}
