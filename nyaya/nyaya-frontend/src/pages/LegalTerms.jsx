import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLegalTerms } from '../api/client.js'
import { legalTerms as fallbackTerms } from '../data/legalTerms.js'
import { laws as fallbackLaws } from '../data/laws.js'

export default function LegalTerms() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const {
    data: terms,
    loading,
    usingFallback,
  } = useApi(() => fetchLegalTerms({ q: query }), [query], fallbackTerms)

  // In fallback mode, filter client-side (the backend normally does this).
  const results = useMemo(() => {
    if (!usingFallback || !query) return terms
    const q = query.toLowerCase()
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.fullForm?.toLowerCase().includes(q)
    )
  }, [terms, usingFallback, query])

  return (
    <>
      <Hero
        eyebrow="Glossary"
        title="Legal Terms"
        subtitle="Plain-language definitions for common legal words you'll come across."
        size="md"
      >
        <SearchBar
          size="lg"
          placeholder="Search legal terms..."
          initialValue={query}
          onSearch={setQuery}
        />
      </Hero>

      <section className="container-content py-12 sm:py-16">
        {usingFallback && <OfflineNotice className="mb-6" />}

        {loading ? (
          <LoadingState label="Loading terms..." />
        ) : results.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((term) => {
              // API results already nest related_laws as [{id, name}];
              // fallback mock data only stores ids, so resolve those locally.
              const related = usingFallback
                ? fallbackLaws.filter((l) => term.relatedLaws?.includes(l.id))
                : term.related_laws || []

              return (
                <article key={term.id} className="card-surface p-6">
                  <h2 className="font-display text-lg font-semibold text-navy">
                    {term.term}
                    {(term.fullForm || term.full_form) && (
                      <span className="ml-2 text-sm font-normal text-ink/50">
                        ({term.fullForm || term.full_form})
                      </span>
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{term.definition}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="text-sm font-medium text-brass-dark hover:text-navy"
                    >
                      Learn more
                    </button>
                    {related.map((law) => (
                      <Link
                        key={law.id}
                        to={`/laws/${law.id}`}
                        className="article-tab hover:border-brass hover:text-navy"
                      >
                        {law.name}
                      </Link>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-border p-10 text-center text-ink/60">
            No terms match "{query}". Try a different word.
          </div>
        )}
      </section>
    </>
  )
}
