import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
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
        image={
          <div className="flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center">
            <img
              src="/images/3d-court-pillars.svg"
              alt="3D Pillars of Law"
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>
        }
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

        {/* Category filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={activeCategory === 'all'}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
          <p className="text-sm text-ink/60">
            Showing <span className="font-medium text-navy">{results.length}</span>{' '}
            {results.length === 1 ? 'law' : 'laws'}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-sm border border-border bg-paper px-2.5 py-1.5 text-sm outline-none focus:border-brass"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Results */}
        {lawsLoading ? (
          <LoadingState label="Loading laws..." />
        ) : results.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
