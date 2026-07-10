# TypeFilter

Displays a controlled Pokémon type dropdown. It closes after a selection or when the user clicks outside the menu.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `selectedType` | `string` | Yes | Current type value, such as `all`, `fire`, or `water`. |
| `setSelectedType` | `(value: string) => void` | Yes | Updates the selected type. |

## Example

```jsx
import { useState } from 'react'
import TypeFilter from './components/TypeFilter'

function FilterExample() {
  const [selectedType, setSelectedType] = useState('all')

  return (
    <TypeFilter
      selectedType={selectedType}
      setSelectedType={setSelectedType}
    />
  )
}
```
