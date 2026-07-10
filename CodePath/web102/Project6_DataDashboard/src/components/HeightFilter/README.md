# HeightFilter

Displays controlled minimum and maximum height inputs in meters. It rejects negative values and reports when the minimum exceeds the maximum.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `minHeight` | `string` | Yes | Current minimum height, or an empty string for no minimum. |
| `maxHeight` | `string` | Yes | Current maximum height, or an empty string for no maximum. |
| `setMinHeight` | `(value: string) => void` | Yes | Updates the minimum height. |
| `setMaxHeight` | `(value: string) => void` | Yes | Updates the maximum height. |

## Example

```jsx
import { useState } from 'react'
import HeightFilter from './components/HeightFilter'

function HeightExample() {
  const [minHeight, setMinHeight] = useState('')
  const [maxHeight, setMaxHeight] = useState('')

  return (
    <HeightFilter
      minHeight={minHeight}
      maxHeight={maxHeight}
      setMinHeight={setMinHeight}
      setMaxHeight={setMaxHeight}
    />
  )
}
```
