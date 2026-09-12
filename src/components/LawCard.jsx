import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/categories.js'

export default function LawCard({ law }) {
  const category = categories.find((c) => c.id === law.category)

  return (
    <Link
      to={`/laws/${law.id}`}
      className="card-surface group flex h-full flex-col p-6 transition-all hover:shadow-cardHover hover:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy block cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span className="article-tab">{law.year}</span>
        {category && (
          <span className="text-xs font-medium uppercase tracking-wide text-oxblood/80">
            {category.title}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy group-hover:text-brass-dark transition-colors">
        {law.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{law.description}</p>

      <div className="mt-5 inline-flex items-center gap-1.5 self-start rounded-sm border border-navy/20 px-4 py-2 text-sm font-medium text-navy group-hover:border-navy group-hover:bg-navy/5 transition-colors">
        View Law <ArrowRight size={15} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}
