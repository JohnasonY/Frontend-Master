import './HeightFilter.css'

export default function HeightFilter({ minHeight, maxHeight, setMinHeight, setMaxHeight }) {
  const hasInvalidRange = minHeight !== '' && maxHeight !== '' && Number(minHeight) > Number(maxHeight)

  function updateHeight(setHeight, value) {
    if (value === '' || Number(value) >= 0) setHeight(value)
  }

  return (
    <div className="height-filter">
      <label>
        <span>Min height (m)</span>
        <input
          type="number"
          min="0"
          max={maxHeight || undefined}
          step="0.1"
          placeholder="Min"
          value={minHeight}
          onChange={(event) => updateHeight(setMinHeight, event.target.value)}
          aria-invalid={hasInvalidRange}
        />
      </label>
      <label>
        <span>Max height (m)</span>
        <input
          type="number"
          min={minHeight || '0'}
          step="0.1"
          placeholder="Max"
          value={maxHeight}
          onChange={(event) => updateHeight(setMaxHeight, event.target.value)}
          aria-invalid={hasInvalidRange}
        />
      </label>
      {hasInvalidRange && <p role="alert">Minimum cannot exceed maximum.</p>}
    </div>
  )
}
