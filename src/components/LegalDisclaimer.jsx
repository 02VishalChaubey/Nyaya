import { Info, AlertTriangle } from 'lucide-react'

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
  const isWarning = tone === 'warning'
  const Icon = isWarning ? AlertTriangle : Info

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
      <p>
        {title && <strong className="font-semibold text-ink">{title} </strong>}
        {children}
      </p>
    </div>
  )
}
