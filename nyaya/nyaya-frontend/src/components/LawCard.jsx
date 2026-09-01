import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/categories.js'

export default function LawCard({ law }) {
  const category = categories.find((c) => c.id === law.category)

  return (
    <article className="card-surface flex h-full flex-col p-6 transition-shadow hover:shadow-cardHover">
      <div className="flex items-center gap-2">
        <span className="article-tab">{law.year}</span>
        {category && (
          <span className="text-xs font-medium uppercase tracking-wide text-oxblood/80">
            {category.title}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy">
        {law.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{law.description}</p>

      <Link
        to={`/laws/${law.id}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start rounded-sm border border-navy/20 px-4 py-2 text-sm font-medium text-navy hover:border-navy hover:bg-navy/5 transition-colors"
      >
        View Law <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  )
}
