import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getIcon } from './iconMap.js'

/**
 * `compact` is used on the Home page grid; the full version (Fundamental
 * Rights page) shows the example text and a larger layout.
 */
export default function RightCard({ right, compact = false }) {
  const Icon = getIcon(right.icon)

  return (
    <article className="card-surface flex h-full flex-col p-6 transition-shadow hover:shadow-cardHover">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy/5 text-navy">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="article-tab">{right.articles}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-navy">{right.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{right.summary}</p>

      {!compact && right.example && (
        <p className="mt-3 rounded-sm bg-navy/5 p-3 text-xs leading-relaxed text-ink/60">
          {right.example}
        </p>
      )}

      <Link
        to={`/fundamental-rights#${right.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brass-dark hover:text-navy transition-colors"
      >
        Learn more <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  )
}
