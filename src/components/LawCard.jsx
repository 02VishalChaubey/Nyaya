import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/categories.js'
import BookmarkButton from './BookmarkButton.jsx'

/**
 * A single row in the law index. Deliberately list-style (not a bordered
 * card) — this is a statute index, closer to a table of contents than a
 * catalog of unrelated products.
 */
export default function LawCard({ law }) {
  const category = categories.find((c) => c.id === law.category)

  return (
    <div className="group -mx-2 flex items-start justify-between gap-4 border-b border-border px-2 py-5 transition-colors hover:bg-paper-dim/50 first:pt-0">
      <Link
        to={`/laws/${law.id}`}
        className="min-w-0 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-xs"
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="font-mono text-ink/50">{law.year}</span>
          {category && (
            <span className="font-medium uppercase tracking-wide text-oxblood/80">
              {category.title}
            </span>
          )}
        </div>
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-navy group-hover:text-brass-dark transition-colors sm:text-lg">
          {law.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{law.description}</p>
      </Link>

      <div className="flex items-center gap-2 shrink-0 mt-1">
        <BookmarkButton
          item={{
            id: `law-${law.id}`,
            title: law.name,
            category: category?.title || 'Statute / Act',
            type: 'law',
            description: law.description,
            url: `/laws/${law.id}`,
          }}
          size="sm"
        />
        <Link
          to={`/laws/${law.id}`}
          tabIndex="-1"
          aria-hidden="true"
          className="text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:text-navy p-1"
        >
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  )
}
