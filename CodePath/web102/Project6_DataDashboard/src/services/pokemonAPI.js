const API_URL = 'https://pokeapi.co/api/v2/pokemon'

function formatPokemon(item) {
  return {
    id: item.id,
    name: item.name,
    image: item.sprites.other['official-artwork'].front_default || item.sprites.front_default,
    types: item.types.map(({ type }) => type.name),
    height: item.height,
    weight: item.weight,
    baseExperience: item.base_experience,
    abilities: item.abilities.map(({ ability }) => ability.name.replace('-', ' ')),
    movesCount: item.moves.length,
    stats: item.stats.map(({ base_stat: value, stat }) => ({
      name: stat.name.replace('-', ' '),
      value,
    })),
  }
}

export async function fetchPokemon(limit = 30) {
  const listResponse = await fetch(`${API_URL}?limit=${limit}`)
  if (!listResponse.ok) throw new Error('The API request failed.')

  const { results } = await listResponse.json()
  const details = await Promise.all(results.map(async ({ url }) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error('A Pokemon record could not be loaded.')
    return response.json()
  }))

  return details.map(formatPokemon)
}

export async function fetchPokemonById(id) {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('A Pokemon record could not be loaded.')

  return formatPokemon(await response.json())
}
