import { useEffect, useState } from 'react'
import CrewmateCard from '../../components/CrewmateCard/CrewmateCard'
import { isSupabaseConfigured, supabase } from '../../supabase/client'
import './CrewGallery.css'

function CrewGallery() {
  const [crewmates, setCrewmates] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCrewmates = async () => {
      if (!isSupabaseConfigured) {
        setError('Add your Supabase URL and anon key to .env to load the gallery.')
        setIsLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setCrewmates(data)
      }

      setIsLoading(false)
    }

    fetchCrewmates()
  }, [])

  return (
    <section className="page gallery-page">
      <div className="page-heading">
        <p className="eyebrow">Roster</p>
        <h1>Your Fresh Squad</h1>
        <p>Newest crewmates appear first.</p>
      </div>

      {isLoading && <p className="status-message">Loading crewmates...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!isLoading && !error && crewmates.length === 0 && (
        <p className="status-message">No crewmates yet. Create your first squad member.</p>
      )}

      <div className="card-grid">
        {crewmates.map((crewmate) => (
          <CrewmateCard crewmate={crewmate} key={crewmate.id} />
        ))}
      </div>
    </section>
  )
}

export default CrewGallery
