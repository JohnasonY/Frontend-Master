import inklingImage from '../assets/inkling.png'
import octolingImage from '../assets/octoling.webp'

const speciesImages = {
  Inkling: inklingImage,
  Octoling: octolingImage,
}

const teamColors = {
  Orange: '#f97316',
  Blue: '#2563eb',
  Green: '#16a34a',
  Pink: '#ec4899',
  Purple: '#9333ea',
  Yellow: '#eab308',
}

export function getSpeciesImage(species) {
  return speciesImages[species] ?? inklingImage
}

export function getTeamColor(teamColor) {
  return teamColors[teamColor] ?? '#d1d5db'
}
