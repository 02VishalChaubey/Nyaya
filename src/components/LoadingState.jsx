import { Loader2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function LoadingState({ label }) {
  const { t } = useLanguage()
  const displayLabel = label || t('states.loading', 'Loading legal data...')

  return (
    <div className="flex items-center justify-center gap-2.5 py-16 text-ink/50">
      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      <span className="text-sm">{displayLabel}</span>
    </div>
  )
}
