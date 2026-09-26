import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Renders "Last verified — [note]" only when a real verification note is
 * known. Renders nothing at all otherwise — an absent or placeholder date
 * is never displayed as though it were a real one.
 */
export default function LastVerified({ note, className = '' }) {
  const { isHindi } = useLanguage()
  if (!note) return null

  return (
    <p className={`text-xs text-ink/60 ${className}`}>
      <span className="font-semibold text-ink/70">
        {isHindi ? 'अंतिम सत्यापन: ' : 'Last verified: '}
      </span>
      {note}
    </p>
  )
}
