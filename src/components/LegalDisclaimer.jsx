import { Info, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Reusable disclaimer banner. `tone="info"` for general educational notices,
 * `tone="warning"` for the stronger caution shown on situation results.
 */
export default function LegalDisclaimer({
  tone = 'info',
  title,
  children,
  className = '',
}) {
  const { t, isHindi } = useLanguage()
  const isWarning = tone === 'warning'
  const Icon = isWarning ? AlertTriangle : Info

  const resolvedTitle =
    title ||
    (isWarning
      ? isHindi
        ? 'सावधानी: यह केवल शैक्षणिक सूचना है, कानूनी परामर्श नहीं'
        : 'Notice: Educational Information, Not Legal Advice'
      : t('disclaimers.generalTitle', 'Educational Information Notice'))

  const defaultContent = (
    <p>
      {t(
        'disclaimers.generalText',
        'Nyaya is an educational platform designed to help citizens understand Indian laws. It does not provide legal advice, representation, or formal opinions. For active disputes or court litigation, consult a licensed advocate.'
      )}
    </p>
  )

  return (
    <div
      role="note"
      className={`flex gap-3 rounded-md border p-4 text-sm leading-relaxed ${
        isWarning
          ? 'border-oxblood/30 bg-oxblood/5 text-oxblood-light'
          : 'border-border bg-paper text-ink/80'
      } ${className}`}
    >
      <Icon
        size={20}
        className={`mt-0.5 shrink-0 ${isWarning ? 'text-oxblood' : 'text-navy/60'}`}
        aria-hidden="true"
      />
      <div className="space-y-1">
        {resolvedTitle && <strong className="font-semibold text-ink">{resolvedTitle} </strong>}
        {children || defaultContent}
      </div>
    </div>
  )
}
