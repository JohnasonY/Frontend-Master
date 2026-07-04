# SearchBar

Displays a controlled search input that updates the Pokémon name query as the user types.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `searchInput` | `string` | Yes | Current search query. |
| `setSearchInput` | `(value: string) => void` | Yes | Updates the search query. |

## Example

```jsx
import { useState } from 'react'
import SearchBar from './components/SearchBar'

function SearchExample() {
  const [searchInput, setSearchInput] = useState('')

  return (
    <SearchBar
      searchInput={searchInput}
      setSearchInput={setSearchInput}
    />
  )
}
```
