import { Link } from 'react-router-dom'
import { getSpeciesImage, getTeamColor } from '../../utils/crewmateVisuals'
import './CrewmateCard.css'

function CrewmateCard({ crewmate }) {
  const speciesImage = getSpeciesImage(crewmate.species)
  const teamColor = getTeamColor(crewmate.team_color)

  return (
    <article className="crewmate-card" style={{ '--team-color': teamColor }}>
      <Link className="card-link" to={`/crewmate/${crewmate.id}`}>
        <div className="card-image-wrap">
          <img
            alt={`${crewmate.species} crewmate`}
            className="card-species-image"
            src={speciesImage}
          />
        </div>
        <p className="eyebrow">{crewmate.species}</p>
        <h2>{crewmate.name}</h2>
        <dl className="card-stats">
          <div>
            <dt>Category</dt>
            <dd>{crewmate.category || 'Frontline'}</dd>
          </div>
          <div>
            <dt>Team Color</dt>
            <dd>{crewmate.team_color}</dd>
          </div>
          <div>
            <dt>Weapon</dt>
            <dd>{crewmate.weapon_type}</dd>
          </div>
        </dl>
      </Link>
      <Link className="secondary-button small-button" to={`/edit/${crewmate.id}`}>
        Edit
      </Link>
    </article>
  )
}

export default CrewmateCard
