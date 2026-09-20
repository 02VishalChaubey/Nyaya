import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Scale, BookMarked, FileText, Library, Compass } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import { useApi } from '../hooks/useApi.js'
import { searchAll } from '../api/client.js'
import { fundamentalRights } from '../data/rights.js'
import { laws } from '../data/laws.js'
import { legalTerms } from '../data/legalTerms.js'

const OTHER_RESOURCES = [
  { title: 'Bharatiya Nyaya Sanhita (BNS 2023) Official Gazette Notes & Sections', url: '/laws/bns-2023' },
  { title: 'IPC to BNS Conversion Matrix (1860 vs 2023)', url: '/laws/bns-2023' },
  { title: 'How to file an FIR', url: '/legal-terms#fir' },
  { title: 'Understanding your right to legal aid', url: '/fundamental-rights#constitutional-remedies' },
  { title: 'Consumer complaint process, explained', url: '/laws/consumer-protection-2019' },
]

function includesQuery(text, q) {
  if (!text || !q) return false
  return text.toLowerCase().includes(q.toLowerCase())
}

// Client-side search across local data, mirrors server-side executeSearch
function fallbackSearch(q) {
  if (!q) return { rights: [], laws: [], sections: [], terms: [] }

  const query = q.toLowerCase().trim()
  const isBnsQuery =
    query === 'bns' ||
    query === 'bns 2023' ||
    query === 'bns section' ||
    query === 'bns sections' ||
    query.includes('bns') ||
    query.includes('nyaya sanhita') ||
    query.includes('penal code')

  const strippedSecQ = query
    .replace(/\b(bns|bnss|section|sec|act|2023)\b/gi, '')
    .trim()

  const matchedRights = fundamentalRights.filter(
    (r) =>
      includesQuery(r.title, q) ||
      includesQuery(r.summary, q) ||
      (r.articles && includesQuery(r.articles, q))
  )

  const matchedLaws = laws.filter(
    (l) =>
      includesQuery(l.name, q) ||
      includesQuery(l.description, q) ||
      (l.id && l.id.toLowerCase().includes(query)) ||
      (l.shortName && l.shortName.toLowerCase().includes(query)) ||
      (l.aliases && l.aliases.some((a) => a.toLowerCase().includes(query))) ||
      (isBnsQuery && l.id === 'bns-2023')
  )

  const sections = laws.flatMap((l) =>
    (l.sections || [])
      .filter((s) => {
        const isLawMatch = (isBnsQuery && l.id === 'bns-2023') || l.id.toLowerCase().includes(query)
        const matchesSec =
          includesQuery(s.title, q) ||
          includesQuery(s.number, q) ||
          (strippedSecQ && includesQuery(s.number, strippedSecQ)) ||
          (strippedSecQ && includesQuery(s.title, strippedSecQ)) ||
          (s.content && (includesQuery(s.content, q) || (strippedSecQ && includesQuery(s.content, strippedSecQ))))

        return isLawMatch || matchesSec
      })
      .map((s) => ({ ...s, lawId: l.id, lawName: l.name }))
  )

  const terms = legalTerms.filter(
    (t) =>
      includesQuery(t.term, q) ||
      (t.fullForm && includesQuery(t.fullForm, q)) ||
      includesQuery(t.definition, q)
  )

  return { rights: matchedRights, laws: matchedLaws, sections, terms }
}

export default function Search() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const {
    data: apiResults,
    loading,
    usingFallback,
  } = useApi(
    () => searchAll(query),
    [query],
    query ? fallbackSearch(query) : { rights: [], laws: [], sections: [], terms: [] }
  )

  const other = useMemo(
    () => (query ? OTHER_RESOURCES.filter((r) => includesQuery(r.title, query)) : []),
    [query]
  )

  const results = apiResults || { rights: [], laws: [], sections: [], terms: [] }
  const hasAnyResults =
    query &&
    (results.rights.length ||
      results.laws.length ||
      results.sections.length ||
      results.terms.length ||
      other.length)

  return (
    <>
      <Hero eyebrow="Search Enmachi" title="What are you looking for?" size="md">
        <SearchBar
          size="lg"
          placeholder='e.g. "What is an FIR?"'
          initialValue={query}
          autoFocus
          onSearch={setQuery}
        />
      </Hero>

      <section className="container-content py-12 sm:py-16">
        {usingFallback && query && <OfflineNotice className="mb-6" />}

        {!query && (
          <p className="text-ink/50">Start typing above to search rights, laws, sections, and terms.</p>
        )}

        {query && loading && <LoadingState label="Searching..." />}

        {query && !loading && !hasAnyResults && (
          <div className="rounded-md border border-dashed border-border p-10 text-center text-ink/60">
            No results for "{query}". Try a broader term.
          </div>
        )}

        {query && !loading && hasAnyResults && (
          <div className="space-y-12">
            {results.rights.length > 0 && (
              <ResultGroup icon={Scale} title="Fundamental Rights">
                {results.rights.map((r) => (
                  <ResultRow
                    key={r.id}
                    to={`/fundamental-rights#${r.id}`}
                    title={r.title}
                    subtitle={r.articles}
                    description={r.summary}
                  />
                ))}
              </ResultGroup>
            )}

            {results.laws.length > 0 && (
              <ResultGroup icon={Library} title="Laws">
                {results.laws.map((l) => (
                  <ResultRow
                    key={l.id}
                    to={`/laws/${l.id}`}
                    title={l.name}
                    subtitle={String(l.year)}
                    description={l.description}
                  />
                ))}
              </ResultGroup>
            )}

            {results.sections.length > 0 && (
              <ResultGroup icon={FileText} title="Sections">
                {results.sections.map((s) => (
                  <ResultRow
                    key={`${s.lawId}-${s.id}`}
                    to={`/laws/${s.lawId}`}
                    title={s.title}
                    subtitle={s.number}
                    description={`From ${s.lawName}`}
                  />
                ))}
              </ResultGroup>
            )}

            {results.terms.length > 0 && (
              <ResultGroup icon={BookMarked} title="Legal Terms">
                {results.terms.map((t) => (
                  <ResultRow
                    key={t.id}
                    to={`/legal-terms#${t.id}`}
                    title={t.term}
                    description={t.definition}
                  />
                ))}
              </ResultGroup>
            )}

            {other.length > 0 && (
              <ResultGroup icon={Compass} title="Other Resources">
                {other.map((r) => (
                  <ResultRow key={r.url} to={r.url} title={r.title} />
                ))}
              </ResultGroup>
            )}
          </div>
        )}
      </section>
    </>
  )
}

function ResultGroup({ icon: Icon, title, children }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy/70">
        <Icon size={16} aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-4 divide-y divide-border border-y border-border">{children}</div>
    </div>
  )
}

function ResultRow({ to, title, subtitle, description }) {
  return (
    <Link to={to} className="block py-4 hover:bg-navy/[0.03] transition-colors -mx-2 px-2 rounded-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-navy">{title}</h3>
        {subtitle && <span className="article-tab shrink-0">{subtitle}</span>}
      </div>
      {description && (
        <p className="mt-1 text-sm text-ink/60 line-clamp-2">{description}</p>
      )}
    </Link>
  )
}
