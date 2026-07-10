import PokemonRow from '../PokemonRow'
import './PokemonList.css'

export default function PokemonList({ pokemon }) {
  if (!pokemon.length) {
    return <div className="status-message">No Pokemon match those filters. Try another search.</div>
  }

  return (
    <div className="table-wrap" id="collection">
      <div className="table-header" aria-hidden="true">
        <span>Pokemon</span><span>Type</span><span>Height</span><span>Weight</span>
      </div>
      <ul className="pokemon-list">
        {pokemon.map((item) => <PokemonRow pokemon={item} key={item.id} />)}
      </ul>
    </div>
  )
}
