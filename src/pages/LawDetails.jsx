import { Link, useParams } from 'react-router-dom'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import SectionCard from '../components/SectionCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import BNSGazetteViewer from '../components/BNSGazetteViewer.jsx'
import BNSSGazetteViewer from '../components/BNSSGazetteViewer.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLawDetail, fetchCategories } from '../api/client.js'
import { laws as fallbackLaws } from '../data/laws.js'
import { categories as fallbackCategories } from '../data/categories.js'

export default function LawDetails({ forcedId }) {
  const params = useParams()
  const lawId = forcedId || params.lawId

  const fallbackLaw = fallbackLaws.find((l) => l.id === lawId) || null

  const {
    data: law,
    loading,
    usingFallback: lawFallback,
  } = useApi(() => fetchLawDetail(lawId), [lawId], fallbackLaw)

  const { data: categories, usingFallback: categoriesFallback } = useApi(
    fetchCategories,
    [],
    fallbackCategories
  )

  if (loading) {
    return (
      <div className="container-content py-14">
        <LoadingState label="Loading law..." />
      </div>
    )
  }

  if (!law) {
    return (
      <section className="container-content py-20 text-center">
        <h1 className="text-2xl font-semibold text-navy">Law not found</h1>
        <p className="mt-3 text-ink/60">
          We couldn't find that entry. It may have been removed or the link is incorrect.
        </p>
        <Link
          to="/laws"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brass-dark hover:text-navy"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to Explore Laws
        </Link>
      </section>
    )
  }

  const categoryId = typeof law.category === 'string' ? law.category : law.category?.id
  const category = categories.find((c) => c.id === categoryId)

  // In fallback mode, related laws are just ids — resolve them to full
  // objects locally. When the API is live, related_laws already arrives
  // as [{id, name}] from the serializer.
  const related = lawFallback
    ? fallbackLaws.filter((l) => law.relatedLaws?.includes(l.id))
    : law.related_laws || []

  const isBNS = law.id === 'bns-2023'
  const isBNSS = law.id === 'bnss-2023'

  return (
    <div className="container-content py-10 sm:py-14">
      <Link
        to="/laws"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-navy"
      >
        <ArrowLeft size={15} aria-hidden="true" /> Back to Explore Laws
      </Link>

      {(lawFallback || categoriesFallback) && <OfflineNotice className="mt-6 max-w-lg" />}

      {isBNS ? (
        /* Dedicated Full-Experience BNS Page Layout */
        <div className="mt-6 space-y-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="article-tab">{law.year}</span>
              {category && (
                <span className="text-xs font-medium uppercase tracking-wide text-oxblood/80">
                  {category.title}
                </span>
              )}
              <span className="rounded-md bg-navy/10 px-2 py-0.5 font-mono text-xs font-bold text-navy">
                Act 45 of 2023
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {law.name}
            </h1>
            <p className="mt-3 max-w-3xl text-ink/75 leading-relaxed text-sm sm:text-base">
              {law.description}
            </p>
          </div>

          {/* Dedicated Interactive Gazette & Comprehensive Notes Component */}
          <BNSGazetteViewer />

          {/* Statutory Reference Aside at bottom of BNS page */}
          <div className="rounded-xl border border-navy/15 bg-paper p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-navy/70">
              Statutory Provenance &amp; Verification
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <dt className="font-medium text-ink/60">Official Source</dt>
                <dd className="mt-1 flex items-center gap-1.5 text-navy font-semibold">
                  {law.officialSource || law.official_source}
                  <ExternalLink size={13} className="text-navy/50" aria-hidden="true" />
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink/60">Gazette Publication</dt>
                <dd className="mt-1 text-ink/75">{law.lastVerified || law.last_verified}</dd>
              </div>
              {related.length > 0 && (
                <div>
                  <dt className="font-medium text-ink/60">Related Legal Codes</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-2">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/laws/${r.id}`}
                        className="rounded-md border border-navy/15 bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy hover:bg-navy/10"
                      >
                        {r.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      ) : isBNSS ? (
        /* Dedicated Full-Experience BNSS Page Layout */
        <div className="mt-6 space-y-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="article-tab">{law.year}</span>
              {category && (
                <span className="text-xs font-medium uppercase tracking-wide text-oxblood/80">
                  {category.title}
                </span>
              )}
              <span className="rounded-md bg-navy/10 px-2 py-0.5 font-mono text-xs font-bold text-navy">
                Act 46 of 2023 • Bill No. 122 of 2023
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {law.name}
            </h1>
            <p className="mt-3 max-w-3xl text-ink/75 leading-relaxed text-sm sm:text-base">
              {law.description}
            </p>
          </div>

          {/* Dedicated Interactive BNSS Gazette & Procedural Code Component */}
          <BNSSGazetteViewer />

          {/* Statutory Reference Aside at bottom of BNSS page */}
          <div className="rounded-xl border border-navy/15 bg-paper p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-navy/70">
              Statutory Provenance &amp; Verification
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <dt className="font-medium text-ink/60">Official Source</dt>
                <dd className="mt-1 flex items-center gap-1.5 text-navy font-semibold">
                  {law.officialSource || law.official_source || 'The Gazette of India (Extraordinary)'}
                  <ExternalLink size={13} className="text-navy/50" aria-hidden="true" />
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink/60">Gazette Publication</dt>
                <dd className="mt-1 text-ink/75">{law.lastVerified || law.last_verified || 'Enacted 25 Dec 2023 • Effective 1 July 2024'}</dd>
              </div>
              {related.length > 0 && (
                <div>
                  <dt className="font-medium text-ink/60">Related Legal Codes</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-2">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/laws/${r.id}`}
                        className="rounded-md border border-navy/15 bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy hover:bg-navy/10"
                      >
                        {r.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      ) : (
        /* Standard Law Page Layout */
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="article-tab">{law.year}</span>
              {category && (
                <span className="text-xs font-medium uppercase tracking-wide text-oxblood/80">
                  {category.title}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {law.name}
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">{law.description}</p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-navy">Search within this law</h2>
              <div className="mt-2 max-w-md">
                <SearchBar placeholder={`Search within ${law.name}...`} />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-navy">Sections</h2>
              <div className="mt-4 space-y-3">
                {law.sections.map((section) => (
                  <SectionCard key={section.id} section={section} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
                Important
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-ink/60">Official source</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-navy">
                    {law.officialSource || law.official_source}
                    <ExternalLink size={13} className="text-navy/50" aria-hidden="true" />
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-ink/60">Last verified</dt>
                  <dd className="mt-1 text-ink/70">{law.lastVerified || law.last_verified}</dd>
                </div>
                {related.length > 0 && (
                  <div>
                    <dt className="font-medium text-ink/60">Related laws</dt>
                    <dd className="mt-2 flex flex-col gap-1.5">
                      {related.map((r) => (
                        <Link
                          key={r.id}
                          to={`/laws/${r.id}`}
                          className="text-brass-dark hover:text-navy hover:underline"
                        >
                          {r.name}
                        </Link>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
