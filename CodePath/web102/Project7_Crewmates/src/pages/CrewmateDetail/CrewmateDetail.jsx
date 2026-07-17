import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../../supabase/client'
import { getSpeciesImage, getTeamColor } from '../../utils/crewmateVisuals'
import './CrewmateDetail.css'

function buildProfile(crewmate) {
  const category = crewmate.category || 'Frontline'

  return `${crewmate.name} is a ${category} ${crewmate.species} on the ${crewmate.team_color} team who prefers the ${crewmate.weapon_type}. This squad member is ready for a clean Turf War plan.`
}

function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCrewmate = async () => {
      if (!isSupabaseConfigured) {
        setError('Add your Supabase URL and anon key to .env to load this crewmate.')
        setIsLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setCrewmate(data)
      }

      setIsLoading(false)
    }

    fetchCrewmate()
  }, [id])

  return (
    <section className="page narrow-page detail-page">
      {isLoading && <p className="status-message">Loading crewmate...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {crewmate && (
        <>
          <div className="detail-hero" style={{ '--team-color': getTeamColor(crewmate.team_color) }}>
            <div className="page-heading">
              <p className="eyebrow">{crewmate.category || 'Frontline'} {crewmate.species}</p>
              <h1>{crewmate.name}</h1>
              <p>{buildProfile(crewmate)}</p>
            </div>
            <div className="detail-image-wrap">
              <img
                alt={`${crewmate.species} crewmate`}
                className="detail-species-image"
                src={getSpeciesImage(crewmate.species)}
              />
            </div>
          </div>

          <dl className="detail-list" style={{ '--team-color': getTeamColor(crewmate.team_color) }}>
            <div>
              <dt>Category</dt>
              <dd>{crewmate.category || 'Frontline'}</dd>
            </div>
            <div>
              <dt>Team Color</dt>
              <dd>{crewmate.team_color}</dd>
            </div>
            <div>
              <dt>Weapon Type</dt>
              <dd>{crewmate.weapon_type}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{new Date(crewmate.created_at).toLocaleString()}</dd>
            </div>
          </dl>

          <div className="hero-actions">
            <Link className="primary-button" to={`/edit/${crewmate.id}`}>
              Edit Crewmate
            </Link>
            <Link className="secondary-button" to="/gallery">
              Back to Gallery
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default CrewmateDetail
