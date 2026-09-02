import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Loader2 } from 'lucide-react'
import { situationCategories as fallbackSituationCategories } from '../data/situations.js'
import { fetchSituationCategories, analyzeSituation } from '../api/client.js'
import { useApi } from '../hooks/useApi.js'
import { getIcon } from './iconMap.js'
import OfflineNotice from './OfflineNotice.jsx'
import Button from './Button.jsx'

export default function SituationForm() {
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()

  const { data: situationCategories, usingFallback } = useApi(
    fetchSituationCategories,
    [],
    fallbackSituationCategories
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (!description.trim() || submitting) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      const result = await analyzeSituation({ description, category: selectedCategory })
      navigate('/harmed/result', { state: { result } })
    } catch (err) {
      // Backend unreachable — still let the person see how the result page
      // looks, using the same offline pattern as the rest of the site.
      setSubmitError(err)
      navigate('/harmed/result', { state: { result: null, offline: true } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
      {usingFallback && <OfflineNotice className="mb-6" />}

      <label htmlFor="situation" className="block text-sm font-semibold text-navy">
        What happened?
      </label>
      <textarea
        id="situation"
        rows={7}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe what happened in your own words..."
        className="mt-2 w-full resize-y rounded-md border border-border bg-page/40 p-4 text-sm leading-relaxed text-ink
          outline-none focus:border-brass placeholder:text-ink/40"
        required
      />

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy">
          Does this relate to one of these areas? <span className="font-normal text-ink/50">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {situationCategories.map((cat) => {
            const Icon = getIcon(cat.icon)
            const active = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(active ? null : cat.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-navy bg-navy text-paper'
                    : 'border-border text-ink/70 hover:border-navy/40'
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">
          This sends your description to the backend for a placeholder match —
          nothing is stored or reviewed by a person.
        </p>
        <Button type="submit" icon={submitting ? Loader2 : Send} iconPosition="right" disabled={submitting}>
          {submitting ? 'Finding information...' : 'Find Relevant Information'}
        </Button>
      </div>

      {submitError && (
        <p className="mt-3 text-xs text-oxblood">
          Couldn't reach the backend — showing a sample result instead.
        </p>
      )}
    </form>
  )
}
