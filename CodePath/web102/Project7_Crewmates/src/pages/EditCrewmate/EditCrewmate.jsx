import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CrewmateForm from '../../components/CrewmateForm/CrewmateForm'
import { isSupabaseConfigured, supabase } from '../../supabase/client'
import './EditCrewmate.css'

function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchCrewmate = async () => {
      if (!isSupabaseConfigured) {
        setError('Add your Supabase URL and anon key to .env to edit this crewmate.')
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

  const updateCrewmate = async (formData) => {
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    const { data, error: updateError } = await supabase
      .from('crewmates')
      .update(formData)
      .eq('id', id)
      .select()
      .single()

    setIsSubmitting(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setCrewmate(data)
    setSuccess('Crewmate updated.')
  }

  const deleteCrewmate = async () => {
    setError('')
    setSuccess('')
    setIsDeleting(true)

    const { error: deleteError } = await supabase.from('crewmates').delete().eq('id', id)

    setIsDeleting(false)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    navigate('/gallery')
  }

  return (
    <section className="page edit-page">
      <div className="page-heading">
        <p className="eyebrow">Update</p>
        <h1>Edit Crewmate</h1>
        <p>Change the current name and attributes, or remove this crewmate.</p>
      </div>

      {isLoading && <p className="status-message">Loading crewmate...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {success && <p className="status-message success-message">{success}</p>}

      {crewmate && (
        <>
          <CrewmateForm
            initialValues={crewmate}
            isDeleting={isDeleting}
            isSubmitting={isSubmitting}
            onDelete={deleteCrewmate}
            onSubmit={updateCrewmate}
            showDelete
            submitLabel="Update Crewmate"
          />
          <div className="under-form-link">
            <Link to={`/crewmate/${crewmate.id}`}>View detail page</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default EditCrewmate
