import { useEffect, useRef } from 'react'
import './TypeFilter.css'

const TYPES = [
  ['all', 'All Types'],
  ['normal', 'Normal'],
  ['fire', 'Fire'],
  ['water', 'Water'],
  ['grass', 'Grass'],
  ['electric', 'Electric'],
  ['ice', 'Ice'],
  ['fighting', 'Fighting'],
  ['poison', 'Poison'],
  ['ground', 'Ground'],
  ['flying', 'Flying'],
  ['psychic', 'Psychic'],
  ['bug', 'Bug'],
  ['rock', 'Rock'],
  ['ghost', 'Ghost'],
  ['dragon', 'Dragon'],
  ['dark', 'Dark'],
  ['steel', 'Steel'],
  ['fairy', 'Fairy'],
]

export default function TypeFilter({ selectedType, setSelectedType }) {
  const filterRef = useRef(null)
  const selectedLabel = TYPES.find(([value]) => value === selectedType)?.[1] ?? 'All Types'

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (filterRef.current?.open && !filterRef.current.contains(event.target)) {
        filterRef.current.removeAttribute('open')
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  function selectType(event, value) {
    setSelectedType(value)
    event.currentTarget.closest('details').removeAttribute('open')
  }

  return (
    <details className="filter-control" ref={filterRef}>
      <summary aria-label="Filter Pokemon by type">{selectedLabel}</summary>
      <div className="filter-menu" role="listbox" aria-label="Pokemon types">
        {TYPES.map(([value, label]) => (
          <button
            type="button"
            role="option"
            aria-selected={selectedType === value}
            className={selectedType === value ? 'selected' : ''}
            onClick={(event) => selectType(event, value)}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>
    </details>
  )
}
