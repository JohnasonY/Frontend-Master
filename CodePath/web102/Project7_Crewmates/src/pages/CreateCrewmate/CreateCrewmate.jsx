import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CrewmateForm from '../../components/CrewmateForm/CrewmateForm'
import { isSupabaseConfigured, supabase } from '../../supabase/client'
import './CreateCrewmate.css'

function CreateCrewmate() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createCrewmate = async (formData) => {
    if (!isSupabaseConfigured) {
      setError('Add your Supabase URL and anon key to .env before creating crewmates.')
      return
    }

    setError('')
    setIsSubmitting(true)

    const { error: insertError } = await supabase.from('crewmates').insert(formData)

    setIsSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    navigate('/gallery')
  }

  return (
    <section className="page create-page">
      <div className="page-heading">
        <p className="eyebrow">Recruit</p>
        <h1>Create a Crewmate</h1>
        <p>Pick a name, category, species, team color, and weapon type.</p>
      </div>

      {error && <p className="status-message error-message">{error}</p>}

      <CrewmateForm
        isSubmitting={isSubmitting}
        onSubmit={createCrewmate}
        submitLabel="Create Crewmate"
      />
    </section>
  )
}

export default CreateCrewmate
