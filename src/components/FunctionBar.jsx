import { Link, useLocation } from 'react-router-dom'
import { Home, Scale, BookOpen, ShieldAlert, BookMarked, Search } from 'lucide-react'

const FUNCTIONS = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    icon: Home,
    tag: 'Portal',
    description: 'Overview & introduction',
  },
  {
    id: 'fundamental-rights',
    label: 'Fundamental Rights',
    to: '/fundamental-rights',
    icon: Scale,
    tag: 'Art. 12–35',
    description: 'Constitutional freedoms',
  },
  {
    id: 'laws',
    label: 'Explore Laws',
    to: '/laws',
    icon: BookOpen,
    tag: 'Central Acts',
    description: 'Criminal, civil & statutory',
  },
  {
    id: 'harmed',
    label: 'I Have Been Harmed',
    to: '/harmed',
    icon: ShieldAlert,
    tag: 'Guidance',
    description: 'Describe situation & remedies',
    highlight: true,
  },
  {
    id: 'legal-terms',
    label: 'Legal Terms',
    to: '/legal-terms',
    icon: BookMarked,
    tag: 'Glossary',
    description: 'Common legal definitions',
  },
  {
    id: 'search',
    label: 'Search',
    to: '/search',
    icon: Search,
    tag: 'Direct Query',
    description: 'Find rights, sections & laws',
  },
]

export default function FunctionBar({ onSearchClick }) {
  const location = useLocation()

  return (
    <nav
      id="home-function-bar"
      aria-label="Core Portal Functions"
      className="sticky top-16 z-30 border-b border-border/80 bg-paper/95 shadow-xs backdrop-blur-md transition-all"
    >
      <div className="container-content py-1.5">
        {/* Mobile & Tablet horizontal scroll or wrap */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none sm:gap-2.5 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {FUNCTIONS.map((item) => {
            const Icon = item.icon
            const isHome = item.to === '/'
            const isActive = isHome
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to)

            const handleClick = (e) => {
              if (item.id === 'search' && onSearchClick) {
                // If onSearchClick handler provided, trigger it
                onSearchClick(e)
              } else if (isHome && location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }

            return (
              <Link
                key={item.id}
                id={`function-bar-${item.id}`}
                to={item.to}
                onClick={handleClick}
                className={`group relative flex shrink-0 items-center justify-between gap-1.5 rounded-md border px-2.5 py-1.5 transition-all sm:px-3 sm:py-1.5 ${
                  isActive
                    ? 'border-navy bg-navy/5 text-navy shadow-xs ring-1 ring-navy/10'
                    : item.highlight
                    ? 'border-oxblood/30 bg-oxblood/5 text-ink hover:border-oxblood/60 hover:bg-oxblood/10'
                    : 'border-border/70 bg-paper hover:border-brass/70 hover:bg-paper-dim/60 text-ink'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm transition-colors ${
                      isActive
                        ? 'bg-navy text-paper'
                        : item.highlight
                        ? 'bg-oxblood/15 text-oxblood group-hover:bg-oxblood group-hover:text-white'
                        : 'bg-paper-dim text-navy/75 group-hover:bg-brass/20 group-hover:text-brass-dark'
                    }`}
                  >
                    <Icon size={13} />
                  </span>
                  <span
                    className={`truncate text-xs sm:text-[13px] ${
                      isActive
                        ? 'font-bold text-navy'
                        : 'font-medium text-navy group-hover:text-navy'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                <span className="hidden font-mono text-[9px] uppercase tracking-wider text-ink/45 group-hover:text-ink/75 xl:inline-block shrink-0">
                  {item.tag}
                </span>

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[7px] left-1/2 hidden h-[2px] w-6 -translate-x-1/2 rounded-full bg-navy lg:block"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
