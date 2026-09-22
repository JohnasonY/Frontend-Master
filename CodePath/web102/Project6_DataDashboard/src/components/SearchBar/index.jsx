import './SearchBar.css'

export default function SearchBar({ searchInput, setSearchInput }) {
  return (
    <label className="search-control">
      <span className="sr-only">Search Pokemon by name</span>
      <input
        type="search"
        placeholder="Search Pokemon by name..."
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </label>
  )
}
