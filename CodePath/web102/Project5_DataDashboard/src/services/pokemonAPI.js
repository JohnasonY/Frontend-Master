const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemon(limit = 30) {
  const listResponse = await fetch(`${API_URL}?limit=${limit}`)
  if (!listResponse.ok) throw new Error('The API request failed.')

  const { results } = await listResponse.json()
  const details = await Promise.all(results.map(async ({ url }) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error('A Pokémon record could not be loaded.')
    return response.json()
  }))

  return details.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.sprites.other['official-artwork'].front_default || item.sprites.front_default,
    types: item.types.map(({ type }) => type.name),
    height: item.height,
    weight: item.weight,
  }))
}
