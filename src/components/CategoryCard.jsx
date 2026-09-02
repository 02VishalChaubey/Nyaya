import { Link } from 'react-router-dom'
import { getIcon } from './iconMap.js'

export default function CategoryCard({ category }) {
  const Icon = getIcon(category.icon)

  return (
    <Link
      to={`/laws?category=${category.id}`}
      className="card-surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-cardHover"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-oxblood/5 text-oxblood group-hover:bg-oxblood/10 transition-colors">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-semibold text-navy">{category.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink/60">{category.description}</p>
      </div>
    </Link>
  )
}
