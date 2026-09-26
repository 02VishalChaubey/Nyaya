import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LawCard from '../components/LawCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLaws, fetchCategories } from '../api/client.js'
import { laws as fallbackLaws } from '../data/laws.js'
import { categories as fallbackCategories } from '../data/categories.js'

const SORTS = [
  { id: 'name', label: 'Name (A–Z)' },
  { id: 'year-desc', label: 'Newest first' },
  { id: 'year-asc', label: 'Oldest first' },
]

export default function LawExplorer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState('name')

  const {
    data: categories,
    usingFallback: categoriesFallback,
  } = useApi(fetchCategories, [], fallbackCategories)

  // The backend does the actual category/text filtering — deps re-trigger
  // the fetch whenever the category or search query changes.
  const {
    data: laws,
    loading: lawsLoading,
    usingFallback: lawsFallback,
  } = useApi(
    () => fetchLaws({ category: activeCategory === 'all' ? undefined : activeCategory, q: query }),
    [activeCategory, query],
    fallbackLaws
  )

  function setCategory(id) {
    const next = new URLSearchParams(searchParams)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setSearchParams(next)
  }

  // When falling back to local mock data, filtering/searching happens
  // client-side instead (the backend normally does this).
  const results = useMemo(() => {
    let list = laws || []

    if (lawsFallback) {
      list = list.filter((law) => {
        const matchesCategory = activeCategory === 'all' || law.category === activeCategory
        const matchesQuery =
          !query ||
          law.name.toLowerCase().includes(query.toLowerCase()) ||
          law.description.toLowerCase().includes(query.toLowerCase())
        return matchesCategory && matchesQuery
      })
    }

    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'year-desc') list = [...list].sort((a, b) => b.year - a.year)
    if (sort === 'year-asc') list = [...list].sort((a, b) => a.year - b.year)

    return list
  }, [laws, lawsFallback, activeCategory, query, sort])

  return (
    <>
      <Hero
        eyebrow="Browse the law index"
        title="Explore Indian Laws"
        subtitle="Browse by category, or search for a specific statute, section, or topic."
        size="md"
      >
        <SearchBar
          size="lg"
          placeholder="Search laws by name or description..."
          initialValue={query}
          onSearch={setQuery}
        />
      </Hero>

      <section className="container-content py-12 sm:py-14">
        {(categoriesFallback || lawsFallback) && <OfflineNotice className="mb-6" />}

        {/* Featured BNS 2023 Gazette & Notes Card */}
        <div className="mb-8 rounded-md border border-navy/20 bg-navy p-6 text-paper">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-sm bg-brass/15 px-2 py-0.5 text-xs font-semibold text-brass-light border border-brass/30">
                  Featured
                </span>
                <span className="font-mono text-xs text-paper/70">Act No. 45 of 2023</span>
              </div>
              <h2 className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">
                Bharatiya Nyaya Sanhita, 2023 (BNS) — Gazette Notes &amp; Navigator
              </h2>
              <p className="mt-1 text-sm text-paper/80 max-w-2xl leading-relaxed">
                Explore official Gazette notes, 20 chapters, 358-section structure, IPC-to-BNS conversion matrix, key penal reforms, and interactive knowledge checks.
              </p>
            </div>
            <Link
              to="/laws/bns-2023"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded bg-brass-light px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-brass-light/90 shrink-0 min-h-[44px]"
            >
              Open BNS Notes <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={activeCategory === 'all'}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
              activeCategory === 'all'
                ? 'border-navy bg-navy text-paper'
                : 'border-border text-ink/70 hover:border-navy/40'
            }`}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                activeCategory === cat.id
                  ? 'border-navy bg-navy text-paper'
                  : 'border-border text-ink/70 hover:border-navy/40'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="mt-6 flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink/70">
            Showing <span className="font-medium text-navy">{results.length}</span>{' '}
            {results.length === 1 ? 'law' : 'laws'}
          </p>
          <div className="flex items-center gap-2 text-sm text-ink/70">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <label htmlFor="sort-laws" className="text-xs font-medium text-ink/70">
              Sort by:
            </label>
            <select
              id="sort-laws"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-sm border border-border bg-paper px-2.5 py-1.5 text-sm min-h-[36px] outline-none focus:border-brass focus-visible:ring-1 focus-visible:ring-brass"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {lawsLoading ? (
          <LoadingState label="Loading laws..." />
        ) : results.length > 0 ? (
          <div className="mt-2 border-t border-border">
            {results.map((law) => (
              <LawCard key={law.id} law={law} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-md border border-dashed border-border p-10 text-center text-ink/60">
            No laws match your search. Try a different keyword or category.
          </div>
        )}
      </section>
    </>
  )
}
