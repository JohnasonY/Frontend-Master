import { useState } from 'react'
import './CrewmateForm.css'

const speciesOptions = ['Inkling', 'Octoling']
const categoryOptions = {
  Frontline: {
    team_color: ['Orange', 'Pink', 'Yellow'],
    weapon_type: ['Shooter', 'Roller', 'Brush', 'Dualies'],
  },
  Support: {
    team_color: ['Blue', 'Green', 'Purple'],
    weapon_type: ['Slosher', 'Brella', 'Brush'],
  },
  Anchor: {
    team_color: ['Blue', 'Purple', 'Green'],
    weapon_type: ['Charger', 'Splatling'],
  },
}
const categoryNames = Object.keys(categoryOptions)
const defaultCategory = categoryNames[0]

const emptyCrewmate = {
  name: '',
  category: defaultCategory,
  species: speciesOptions[0],
  team_color: categoryOptions[defaultCategory].team_color[0],
  weapon_type: categoryOptions[defaultCategory].weapon_type[0],
}

function normalizeCrewmate(initialValues) {
  const mergedValues = { ...emptyCrewmate, ...initialValues }
  const category = categoryOptions[mergedValues.category] ? mergedValues.category : defaultCategory
  const options = categoryOptions[category]

  return {
    ...mergedValues,
    category,
    team_color: options.team_color.includes(mergedValues.team_color)
      ? mergedValues.team_color
      : options.team_color[0],
    weapon_type: options.weapon_type.includes(mergedValues.weapon_type)
      ? mergedValues.weapon_type
      : options.weapon_type[0],
  }
}

function OptionGroup({ label, field, options, value, onChange }) {
  return (
    <fieldset className="option-group">
      <legend>{label}</legend>
      <div className="option-grid">
        {options.map((option) => (
          <button
            className={value === option ? 'option-button selected' : 'option-button'}
            key={option}
            onClick={() => onChange(field, option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function CrewmateForm({
  initialValues = emptyCrewmate,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  showDelete = false,
  onDelete,
  isDeleting = false,
}) {
  const [formData, setFormData] = useState(() => normalizeCrewmate(initialValues))
  const selectedCategoryOptions = categoryOptions[formData.category]

  const updateField = (field, value) => {
    if (field === 'category') {
      const nextOptions = categoryOptions[value]

      setFormData((current) => ({
        ...current,
        category: value,
        team_color: nextOptions.team_color[0],
        weapon_type: nextOptions.weapon_type[0],
      }))
      return
    }

    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ ...formData, name: formData.name.trim() })
  }

  return (
    <form className="crewmate-form" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        onChange={(event) => updateField('name', event.target.value)}
        placeholder="Agent 8"
        required
        type="text"
        value={formData.name}
      />

      <OptionGroup
        field="category"
        label="Category"
        onChange={updateField}
        options={categoryNames}
        value={formData.category}
      />
      <OptionGroup
        field="species"
        label="Species"
        onChange={updateField}
        options={speciesOptions}
        value={formData.species}
      />
      <OptionGroup
        field="team_color"
        label="Team Color"
        onChange={updateField}
        options={selectedCategoryOptions.team_color}
        value={formData.team_color}
      />
      <OptionGroup
        field="weapon_type"
        label="Weapon Type"
        onChange={updateField}
        options={selectedCategoryOptions.weapon_type}
        value={formData.weapon_type}
      />

      <div className="form-actions">
        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
        {showDelete && (
          <button
            className="secondary-button"
            disabled={isDeleting}
            onClick={onDelete}
            type="button"
          >
            {isDeleting ? 'Deleting...' : 'Delete Crewmate'}
          </button>
        )}
      </div>
    </form>
  )
}

export default CrewmateForm
