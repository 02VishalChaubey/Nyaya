import { Database } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Inline notice shown when a component relies on the verified local statutory database.
 */
export default function OfflineNotice({
  message,
  className = '',
}) {
  const { t } = useLanguage()
  const displayMessage = message || t('disclaimers.offlineNotice', 'Operating with verified local statutory database.')

  return (
    <div
      role="status"
      className={`flex items-center gap-2 rounded-sm border border-brass/30 bg-brass/5 px-3 py-2 text-xs text-brass-dark ${className}`}
    >
      <Database size={13} aria-hidden="true" />
      <span>{displayMessage}</span>
    </div>
  )
}
