import { ExternalLink } from 'lucide-react'

/**
 * "Open official source →" — only ever renders a real <a> when a genuine
 * URL was resolved from the data. If no URL is available, it renders a
 * plain, non-clickable note instead of a fake or best-guess link.
 */
export default function OfficialSourceLink({ url, label = 'Open official source', className = '' }) {
  if (!url) {
    return (
      <span className={`text-xs text-ink/50 ${className}`}>
        Official source link not available
      </span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass rounded-xs transition-colors ${className}`}
    >
      <span>{label}</span>
      <ExternalLink size={12} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
