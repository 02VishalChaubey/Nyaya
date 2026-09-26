import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getIcon } from './iconMap.js'
import BookmarkButton from './BookmarkButton.jsx'

const RIGHT_DESTINATIONS = {
  equality: {
    to: '/laws/indian-contract-1872',
    domain: 'Civil Equality & Contract Law',
  },
  freedom: {
    to: '/laws/bnss-2023',
    domain: 'Criminal Procedure & Fair Arrest',
  },
  exploitation: {
    to: '/laws/bns-2023',
    domain: 'Penal Protections & Human Dignity',
  },
  religion: {
    to: '/laws/hindu-marriage-1955',
    domain: 'Family & Conscience Rights',
  },
  'cultural-educational': {
    to: '/laws/consumer-protection-2019',
    domain: 'Consumer & Citizen Safeguards',
  },
  'constitutional-remedies': {
    to: '/harmed',
    domain: 'Citizen Redressal & Help Tool',
  },
}

/**
 * `compact` is used on the Home page grid; the full version
 * shows the example text and a larger layout.
 */
export default function RightCard({ right, compact = false }) {
  const Icon = getIcon(right.icon)
  const destination = RIGHT_DESTINATIONS[right.id] || {
    to: '/laws',
    domain: 'Explore Statutory Acts',
  }

  return (
    <Link
      to={destination.to}
      className="card-surface group flex h-full flex-col p-6 transition-all hover:shadow-cardHover hover:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy block cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy/5 text-navy group-hover:bg-navy/10 transition-colors">
          <Icon size={20} aria-hidden="true" />
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-semibold text-brass-dark tracking-wide">{right.articles}</span>
          <BookmarkButton
            item={{
              id: `fundamental-right-${right.id}`,
              title: right.title,
              category: 'Fundamental Rights',
              type: 'right',
              description: right.summary,
              url: destination.to,
            }}
            size="sm"
          />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-navy group-hover:text-brass-dark transition-colors">{right.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{right.summary}</p>

      {!compact && right.example && (
        <p className="mt-3 rounded-sm bg-navy/5 p-3 text-xs leading-relaxed text-ink/60">
          {right.example}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3">
        <span className="text-[11px] font-medium text-ink/55 group-hover:text-navy transition-colors">
          {destination.domain}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brass-dark group-hover:text-navy transition-colors">
          Explore <ArrowRight size={13} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
