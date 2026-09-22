# PokemonRow

Displays one Pokémon's artwork, Pokédex number, name, types, height, and weight.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `pokemon` | `Pokemon` | Yes | The Pokémon record rendered by the row. |

The `pokemon` object requires:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Pokédex number. |
| `name` | `string` | Pokémon name. |
| `image` | `string` | Artwork URL. |
| `types` | `string[]` | One or more Pokémon types. |
| `height` | `number` | Height in decimeters, as returned by PokéAPI. |
| `weight` | `number` | Weight in hectograms, as returned by PokéAPI. |

## Example

```jsx
import PokemonRow from './components/PokemonRow'

const pikachu = {
  id: 25,
  name: 'pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  height: 4,
  weight: 60,
}

function Example() {
  return (
    <ul>
      <PokemonRow pokemon={pikachu} />
    </ul>
  )
}
```
