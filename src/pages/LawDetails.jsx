import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileText, Download, ExternalLink, BookOpen } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import SectionCard from '../components/SectionCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import BNSGazetteViewer from '../components/BNSGazetteViewer.jsx'
import BNSSGazetteViewer from '../components/BNSSGazetteViewer.jsx'
import SourceBadge from '../components/SourceBadge.jsx'
import SourceReference from '../components/SourceReference.jsx'
import SourcesVerification from '../components/SourcesVerification.jsx'
import RelatedInformation from '../components/RelatedInformation.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLawDetail, fetchCategories } from '../api/client.js'
import { laws as fallbackLaws } from '../data/laws.js'
import { categories as fallbackCategories } from '../data/categories.js'
import { isVerifiedNote, extractSourceUrl } from '../utils/sources.js'
import { useBreadcrumbContext } from '../context/BreadcrumbContext.jsx'

// Pulls a real "Act NN of YYYY" designation out of the law's own aliases —
// never fabricated. Returns null when no such alias exists in the data.
function findActNumber(law) {
  const match = (law.aliases || []).find((a) => /^act\s+\d+\s+of\s+\d{4}$/i.test(a.trim()))
  return match || null
}

function MetadataRow({ law, category, actNumber, verified }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
      {actNumber && (
        <span className="font-mono font-semibold text-navy">{actNumber}</span>
      )}
      <span className="font-medium text-ink/70">{law.year}</span>
      {category && (
        <span className="font-medium uppercase tracking-wide text-oxblood/80">
          {category.title}
        </span>
      )}
      <SourceBadge verified={verified} label={verified ? 'Verified source' : 'Unverified — development content'} />
    </div>
  )
}

function RelatedLaws({ related }) {
  if (related.length === 0) return null
  return (
    <div className="mt-4">
      <h3 className="font-medium text-ink/60 text-sm">Related laws</h3>
      <div className="mt-2 flex flex-col gap-1.5">
        {related.map((r) => (
          <Link
            key={r.id}
            to={`/laws/${r.id}`}
            className="text-sm text-brass-dark hover:text-navy hover:underline"
          >
            {r.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function LawDetails({ forcedId }) {
  const params = useParams()
  const lawId = forcedId || params.lawId
  const [sectionQuery, setSectionQuery] = useState('')
  const [openSectionId, setOpenSectionId] = useState(null)

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

  const { setActiveSection } = useBreadcrumbContext()

  // Deep-link support for "Share section": open and scroll to the section
  // named in the URL hash, if any, once the law has loaded.
  useEffect(() => {
    if (!law) return
    const rawHash = window.location.hash.replace(/^#(section-|sec-)?/i, '')
    if (rawHash) {
      const match = law.sections?.find(
        (s) => s.id === rawHash || s.id === `sec-${rawHash}` || s.id === `section-${rawHash}` || s.number.includes(rawHash)
      )
      if (match) {
        setOpenSectionId(match.id)
        setActiveSection(match.number || `Section ${rawHash}`)
        requestAnimationFrame(() => {
          document.getElementById(match.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } else {
        setActiveSection(`Section ${rawHash}`)
      }
    } else {
      setActiveSection(null)
    }
  }, [law?.id, setActiveSection])

  // Also update activeSection if openSectionId changes manually
  useEffect(() => {
    if (openSectionId && law?.sections) {
      const sec = law.sections.find((s) => s.id === openSectionId)
      if (sec) {
        setActiveSection(sec.number)
      }
    }
  }, [openSectionId, law, setActiveSection])

  const filteredSections = useMemo(() => {
    if (!law?.sections) return []
    const q = sectionQuery.trim().toLowerCase()
    if (!q) return law.sections
    return law.sections.filter(
      (s) =>
        s.number.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.content?.toLowerCase().includes(q)
    )
  }, [law, sectionQuery])

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

  const actNumber = findActNumber(law)
  const verificationNote = law.lastVerified || law.last_verified
  const verified = isVerifiedNote(verificationNote)
  const sourceLabel = law.officialSource || law.official_source
  const sourceUrl = extractSourceUrl(sourceLabel)

  const isBNS = law.id === 'bns-2023'
  const isBNSS = law.id === 'bnss-2023'
  const isGazetteViewer = isBNS || isBNSS

  return (
    <div className="container-content py-10 sm:py-14">
      {/* Contextual Back Navigation */}
      <div className="mb-4">
        <Link
          to="/laws"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-dark hover:text-navy transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Back to All Laws Directory</span>
        </Link>
      </div>

      {(lawFallback || categoriesFallback) && <OfflineNotice className="mt-6 max-w-lg" />}

      {/* Title & metadata */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            {law.name}
          </h1>
          <MetadataRow law={law} category={category} actNumber={actNumber} verified={verified} />
        </div>
        <div className="shrink-0 pt-1">
          <BookmarkButton
            item={{
              id: `law-${law.id}`,
              title: law.name,
              category: category?.title || 'Statute / Act',
              type: 'law',
              description: law.description,
              url: `/laws/${law.id}`,
            }}
            variant="button"
            size="md"
          />
        </div>
      </div>

      {isGazetteViewer ? (
        /* Dedicated Full-Experience BNS/BNSS Page Layout */
        <div className="mt-8 space-y-10">
          {/* Overview */}
          <p className="max-w-3xl text-ink/75 leading-relaxed text-sm sm:text-base">
            {law.description}
          </p>

          {/* Key information */}
          <div className="rounded-md border border-navy/15 bg-paper p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-navy/70">
              Key Information
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              <SourceReference
                sourceLabel={sourceLabel}
                sourceUrl={sourceUrl}
                verifiedNote={verificationNote}
              />
              <RelatedLaws related={related} />
            </div>
          </div>

          {/* Reusable Sources & Verification System */}
          <SourcesVerification law={law} />

          {/* Chapters / Sections — dedicated interactive gazette component */}
          {isBNS ? (
            <BNSGazetteViewer sourceLabel={sourceLabel} sourceUrl={sourceUrl} verifiedNote={verificationNote} />
          ) : (
            <BNSSGazetteViewer sourceLabel={sourceLabel} sourceUrl={sourceUrl} verifiedNote={verificationNote} />
          )}
        </div>
      ) : (
        /* Standard Law Page Layout */
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div>
            {/* Overview */}
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-navy/70">
                Overview
              </h2>
              <p className="mt-2 max-w-2xl text-ink/70 leading-relaxed">{law.description}</p>
            </section>

            {/* Official Legal Reference Document & PDF Source */}
            {(law.officialDocumentUrl || law.id === 'hindu-marriage-1955') && (
              <div className="mt-6 rounded-xs border border-border/80 bg-paper-dim/60 p-4 sm:p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xs border border-maroon/30 bg-maroon/10 p-2 text-maroon shrink-0 mt-0.5">
                      <FileText size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-maroon">
                          Official Legal Reference Document
                        </span>
                        <span className="inline-flex items-center rounded-xs bg-navy/10 px-2 py-0.5 text-[11px] font-mono text-navy border border-navy/20">
                          PDF Available
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-base font-semibold text-navy">
                        {law.name} (Act No. 25 of 1955)
                      </h3>
                      <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                        Searchable statutory text with intact legal wording alongside plain-language &ldquo;Explained Simply&rdquo; commentary.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={law.officialDocumentUrl || '/docs/hindu-marriage-act-1955.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xs border border-navy bg-navy px-3.5 py-2 text-xs font-semibold text-paper hover:bg-navy/90 transition-colors shadow-2xs min-h-[36px]"
                    >
                      <Download size={13} aria-hidden="true" />
                      <span>Download PDF</span>
                    </a>
                    {law.externalSourceUrl && (
                      <a
                        href={law.externalSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-paper px-3 py-2 text-xs font-semibold text-ink/80 hover:text-navy hover:border-navy transition-colors min-h-[36px]"
                        title="View on India Code"
                      >
                        <ExternalLink size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">India Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Chapters / Sections */}
            <section className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-xl font-semibold text-navy">
                  Sections {law.sections && `(${law.sections.length})`}
                </h2>
                <div className="w-full max-w-xs">
                  <SearchBar
                    placeholder="Search within this law..."
                    initialValue={sectionQuery}
                    onSearch={setSectionQuery}
                  />
                </div>
              </div>

              <div className="mt-4 border-t border-border">
                {filteredSections.length > 0 ? (
                  filteredSections.map((section) => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      lawName={law.name}
                      lawId={law.id}
                      sourceLabel={sourceLabel}
                      sourceUrl={sourceUrl}
                      verifiedNote={verificationNote}
                      siblingSections={law.sections}
                      isOpen={openSectionId === section.id}
                      onToggle={() =>
                        setOpenSectionId((cur) => (cur === section.id ? null : section.id))
                      }
                    />
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-ink/60">
                    No sections match "{sectionQuery}".
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="card-surface p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
                Key Information
              </h2>
              <div className="mt-4">
                <SourceReference
                  sourceLabel={sourceLabel}
                  sourceUrl={sourceUrl}
                  verifiedNote={verificationNote}
                />
                <RelatedLaws related={related} />
              </div>
            </div>

            {/* Reusable Sources & Verification System */}
            <SourcesVerification law={law} />
          </aside>
        </div>
      )}

      {/* Verified Statutory & Precedential Relationships */}
      {law && (
        <RelatedInformation
          type="law"
          lawId={law.id}
          title={`Statutory Connections for ${law.name}`}
          subtitle={`Verified cross-references linking this enactment with related constitutional guarantees, penal codes, procedural sections, landmark precedents, and citizen SOPs.`}
        />
      )}
    </div>
  )
}
