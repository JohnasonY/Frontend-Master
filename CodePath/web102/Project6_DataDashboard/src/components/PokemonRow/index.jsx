import { Link } from 'react-router-dom'
import './PokemonRow.css'

export default function PokemonRow({ pokemon }) {
  const number = String(pokemon.id).padStart(3, '0')

  return (
    <li className="pokemon-row">
      <Link className="pokemon-row-link" to={`/pokemon/${pokemon.id}`} aria-label={`View details for ${pokemon.name}`}>
        <div className="pokemon-identity">
          <div className="sprite-wrap">
            <img src={pokemon.image} alt="" loading="lazy" />
          </div>
          <div>
            <span className="pokemon-number">#{number}</span>
            <h3>{pokemon.name}</h3>
          </div>
        </div>
        <div className="type-list">
          {pokemon.types.map((type) => <span className={`type-chip type-${type}`} key={type}>{type}</span>)}
        </div>
        <span className="metric"><strong>{(pokemon.height / 10).toFixed(1)}</strong> m</span>
        <span className="metric"><strong>{(pokemon.weight / 10).toFixed(1)}</strong> kg</span>
      </Link>
    </li>
  )
}
