# StatisticsCard

Displays one summary statistic with a value and descriptive label.

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | Yes | Statistic value displayed prominently. |
| `label` | `string` | Yes | Description shown below the value. |
| `tone` | `string` | Yes | Adds a class name for the card variant. The `pink` value also assigns the `insights` section ID. |

## Example

```jsx
import StatisticsCard from './components/StatisticsCard'

function Summary() {
  return (
    <StatisticsCard
      value={30}
      label="Pokémon discovered"
      tone="blue"
    />
  )
}
```
