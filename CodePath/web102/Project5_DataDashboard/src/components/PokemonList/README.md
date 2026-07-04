# PokemonList

Displays the table heading and one `PokemonRow` for every Pokémon in the supplied array. It displays an empty-result message when the array is empty.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `pokemon` | `Array<Pokemon>` | Yes | The Pokémon records to display. |

Each `Pokemon` object must contain `id`, `name`, `image`, `types`, `height`, and `weight`.

## Example

```jsx
import PokemonList from './components/PokemonList'

const pokemon = [
  {
    id: 25,
    name: 'pikachu',
    image: 'https://example.com/pikachu.png',
    types: ['electric'],
    height: 4,
    weight: 60,
  },
]

function Collection() {
  return <PokemonList pokemon={pokemon} />
}
```
