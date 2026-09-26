import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Ban,
  ArrowLeftRight,
  Copy,
  Check,
  Hash,
  X,
  BookOpen,
  Info,
  ShieldCheck,
  Columns,
  List,
} from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import RelatedInformation from '../components/RelatedInformation.jsx'
import SourcesVerification from '../components/SourcesVerification.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLawComparisons } from '../api/client.js'
import {
  lawComparisonsData as fallbackComparisons,
  COMPARISON_PAIRS,
  COMPARISON_TOPICS,
  VERIFICATION_STATUSES,
} from '../data/lawComparisons.js'

export default function CompareLaws() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  // State
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || 'all')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all')
  const [layoutMode, setLayoutMode] = useState('side-by-side') // 'side-by-side' | 'stacked'
  const [copiedId, setCopiedId] = useState(null)
  const [activeHighlightId, setActiveHighlightId] = useState(null)

  // API Call with local fallback
  const {
    data: rawComparisons,
    loading,
    usingFallback,
  } = useApi(
    () =>
      fetchLawComparisons({
        q: query,
        topic: selectedTopic !== 'all' ? selectedTopic : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
      }),
    [query, selectedTopic, selectedStatus],
    fallbackComparisons
  )

  const comparisonList = useMemo(() => {
    return Array.isArray(rawComparisons) && rawComparisons.length > 0
      ? rawComparisons
      : fallbackComparisons
  }, [rawComparisons])

  // Active law pair info (IPC 1860 ↔ BNS 2023)
  const activePair = COMPARISON_PAIRS[0]

  // Filtered comparisons
  const filteredComparisons = useMemo(() => {
    let list = comparisonList

    if (selectedTopic && selectedTopic !== 'all') {
      list = list.filter(
        (c) => c.topicId === selectedTopic || c.topic.toLowerCase() === selectedTopic.toLowerCase()
      )
    }

    if (selectedStatus && selectedStatus !== 'all') {
      list = list.filter((c) => c.mappingStatus === selectedStatus)
    }

    if (query) {
      const q = query.toLowerCase().trim()
      list = list.filter((c) => {
        return (
          c.offenceTitle.toLowerCase().includes(q) ||
          c.oldProvision.section.toLowerCase().includes(q) ||
          c.newProvision.section.toLowerCase().includes(q) ||
          c.topic.toLowerCase().includes(q) ||
          c.plainLanguageDifference.toLowerCase().includes(q) ||
          (c.searchKeywords && c.searchKeywords.some((k) => k.toLowerCase().includes(q))) ||
          (c.oldProvision.scopeText && c.oldProvision.scopeText.toLowerCase().includes(q)) ||
          (c.newProvision.scopeText && c.newProvision.scopeText.toLowerCase().includes(q))
        )
      })
    }

    return list
  }, [comparisonList, selectedTopic, selectedStatus, query])

  // URL Hash Deep Linking
  useEffect(() => {
    const hash = location.hash ? location.hash.replace('#', '') : ''
    if (hash) {
      const target = fallbackComparisons.find((c) => c.id === hash)
      if (target) {
        if (selectedTopic !== 'all' && target.topicId !== selectedTopic) {
          setSelectedTopic('all')
        }
        if (selectedStatus !== 'all' && target.mappingStatus !== selectedStatus) {
          setSelectedStatus('all')
        }
        if (query) {
          setQuery('')
        }

        setTimeout(() => {
          const el = document.getElementById(target.id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            setActiveHighlightId(target.id)
            setTimeout(() => setActiveHighlightId(null), 3500)
          }
        }, 150)
      }
    }
  }, [location.hash])

  // Update filters in URL
  const updateFilters = (newQuery, newTopic, newStatus) => {
    const params = new URLSearchParams()
    if (newQuery) params.set('q', newQuery)
    if (newTopic && newTopic !== 'all') params.set('topic', newTopic)
    if (newStatus && newStatus !== 'all') params.set('status', newStatus)
    setSearchParams(params, { replace: true })
  }

  const handleSearch = (val) => {
    setQuery(val)
    updateFilters(val, selectedTopic, selectedStatus)
  }

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
    updateFilters(query, topicId, selectedStatus)
  }

  const handleStatusSelect = (statusId) => {
    setSelectedStatus(statusId)
    updateFilters(query, selectedTopic, statusId)
  }

  const handleClearAll = () => {
    setQuery('')
    setSelectedTopic('all')
    setSelectedStatus('all')
    setSearchParams({}, { replace: true })
  }

  // Copy citation or permalink
  const copyCitation = (item) => {
    const url = `${window.location.origin}/compare#${item.id}`
    const citation = `Comparison: "${item.offenceTitle}" [${item.oldProvision.section} ↔ ${item.newProvision.section}] — Difference: ${item.plainLanguageDifference} (Source: ${item.source}). Permalink: ${url}`
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2200)
    })
  }

  // Helper for status badge
  const renderStatusBadge = (statusKey) => {
    const meta = VERIFICATION_STATUSES[statusKey] || VERIFICATION_STATUSES.verified
    let icon = <CheckCircle2 className="w-3.5 h-3.5" />
    if (statusKey === 'requires-verification') {
      icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
    } else if (statusKey === 'new-provision') {
      icon = <PlusCircle className="w-3.5 h-3.5" />
    } else if (statusKey === 'repealed-unreplaced') {
      icon = <Ban className="w-3.5 h-3.5" />
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold rounded-sm border ${meta.badgeClass}`}
        title={meta.description}
      >
        {icon}
        <span>{meta.label}</span>
      </span>
    )
  }

  return (
    <>
      {/* Editorial Comparison Masthead */}
      <div className="border-b border-border bg-[#FBF9F5] text-ink py-10 sm:py-14">
        <div className="container-content">
          <div className="max-w-4xl">
            {/* Archival Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-widest text-brass-dark bg-brass-faint/60 border border-brass/20 rounded mb-4">
              <ArrowLeftRight className="w-3.5 h-3.5 text-brass-dark" />
              <span>Statutory Concordance & Comparative Jurisprudence</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
              Compare Laws: IPC 1860 ↔ BNS 2023
            </h1>

            <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed font-sans">
              Authoritative, side-by-side legal concordance between the colonial Indian Penal Code, 1860 and India’s modernized Bharatiya Nyaya Sanhita, 2023. Grounded strictly in official gazette notifications and parliamentary committee reports.
            </p>

            {/* Constitutional Transition Rule Callout */}
            <div className="mt-6 rounded-sm bg-white border-l-4 border-brass p-4 text-xs font-sans text-ink/80 leading-relaxed shadow-2xs">
              <div className="font-mono uppercase tracking-widest font-semibold text-brass-dark mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Constitutional Rule of Transition (Article 20(1))
              </div>
              <p>{activePair.statutoryRuleOfTransition}</p>
            </div>

            {/* Statutory Dossier Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Old Law Dossier */}
              <div className="rounded-sm bg-stone-100/70 border border-stone-200/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-oxblood font-bold">
                    Predecessor Code
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-ink/60">
                    511 Sections · 23 Chapters
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-navy mt-1">
                  {activePair.oldLaw.name}
                </h3>
                <p className="text-xs font-sans text-ink/70 mt-1">
                  <strong>Status:</strong> {activePair.oldLaw.status} — {activePair.oldLaw.statusNote}
                </p>
              </div>

              {/* New Law Dossier */}
              <div className="rounded-sm bg-stone-100/70 border border-stone-200/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-forest font-bold">
                    Successor Code
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-ink/60">
                    358 Sections · 20 Chapters
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-navy mt-1">
                  {activePair.newLaw.name}
                </h3>
                <p className="text-xs font-sans text-ink/70 mt-1">
                  <strong>Status:</strong> {activePair.newLaw.status} — {activePair.newLaw.statusNote}
                </p>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="mt-8">
              <SearchBar
                size="lg"
                placeholder="Search provision, section number, or crime (e.g. '302', '420', '124A', 'snatching', 'mob lynching', 'hit and run')..."
                initialValue={query}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparative Explorer */}
      <div className="bg-[#FAF8F5] min-h-screen">
        {/* Sticky Control & Filter Bar */}
        <section className="sticky top-16 z-20 border-b border-border bg-[#F5F2EB]/95 backdrop-blur-md shadow-xs">
          <div className="container-content py-3">
            {/* Topic Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none" role="group" aria-label="Filter by topic">
              <span className="text-xs font-mono uppercase tracking-widest text-ink/60 mr-2 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Topic:
              </span>
              {COMPARISON_TOPICS.map((topic) => {
                const isActive = selectedTopic === topic.id
                return (
                  <button
                    key={topic.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleTopicSelect(topic.id)}
                    className={`shrink-0 px-3 py-1.5 text-xs font-sans rounded-sm transition-all min-h-[36px] flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                      isActive
                        ? 'bg-navy text-white font-medium shadow-xs'
                        : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                    }`}
                  >
                    <span>{topic.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-ink/60'
                      }`}
                    >
                      {topic.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Second Row: Mapping Status & View Mode */}
            <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none" role="group" aria-label="Filter by mapping rigour">
                <span className="text-xs font-mono uppercase tracking-widest text-ink/60 mr-1.5 shrink-0">
                  Mapping Rigour:
                </span>
                <button
                  type="button"
                  aria-pressed={selectedStatus === 'all'}
                  onClick={() => handleStatusSelect('all')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all min-h-[36px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                    selectedStatus === 'all'
                      ? 'bg-stone-800 text-white font-medium'
                      : 'text-ink/60 hover:text-navy hover:bg-stone-200/60'
                  }`}
                >
                  All Provisions
                </button>
                <button
                  type="button"
                  aria-pressed={selectedStatus === 'verified'}
                  onClick={() => handleStatusSelect('verified')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all min-h-[36px] flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                    selectedStatus === 'verified'
                      ? 'bg-forest text-white font-medium shadow-2xs'
                      : 'text-forest hover:bg-forest/10'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" /> Verified Mappings
                </button>
                <button
                  type="button"
                  aria-pressed={selectedStatus === 'requires-verification'}
                  onClick={() => handleStatusSelect('requires-verification')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all min-h-[36px] flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                    selectedStatus === 'requires-verification'
                      ? 'bg-amber-800 text-white font-medium shadow-2xs'
                      : 'text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" /> Requires Verification
                </button>
                <button
                  type="button"
                  aria-pressed={selectedStatus === 'new-provision'}
                  onClick={() => handleStatusSelect('new-provision')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-sm transition-all min-h-[36px] flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                    selectedStatus === 'new-provision'
                      ? 'bg-navy text-white font-medium shadow-2xs'
                      : 'text-navy hover:bg-navy/10'
                  }`}
                >
                  <PlusCircle className="w-3 h-3" /> New in BNS
                </button>
              </div>

              {/* View Layout Switcher & Clear */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="inline-flex rounded-sm border border-stone-300 p-0.5 bg-white" role="group" aria-label="Display layout">
                  <button
                    type="button"
                    aria-pressed={layoutMode === 'side-by-side'}
                    onClick={() => setLayoutMode('side-by-side')}
                    className={`px-2 py-1 text-xs font-mono flex items-center gap-1 rounded-xs transition-all min-h-[32px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                      layoutMode === 'side-by-side'
                        ? 'bg-navy text-white font-medium'
                        : 'text-ink/60 hover:text-navy'
                    }`}
                    title="Two-column comparison ledger"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Columns</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={layoutMode === 'stacked'}
                    onClick={() => setLayoutMode('stacked')}
                    className={`px-2 py-1 text-xs font-mono flex items-center gap-1 rounded-xs transition-all min-h-[32px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                      layoutMode === 'stacked'
                        ? 'bg-navy text-white font-medium'
                        : 'text-ink/60 hover:text-navy'
                    }`}
                    title="Stacked sequential reading"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Stacked</span>
                  </button>
                </div>

                {(query || selectedTopic !== 'all' || selectedStatus !== 'all') && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1 text-xs font-sans text-oxblood hover:underline px-2 py-1 min-h-[32px]"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section: Document-Like Comparative Ledger */}
        <div className="container-content py-10 sm:py-14">
          {usingFallback && <OfflineNotice className="mb-8" />}

          {/* Ledger Counter Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-ink/50">
                {query ? 'Concordance Search Results' : 'Comparative Statutory Ledger'}
              </p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy mt-0.5">
                Showing {filteredComparisons.length} of {fallbackComparisons.length} Provision Mappings
              </h2>
            </div>

            <div className="text-xs font-sans text-ink/60 max-w-sm text-right hidden sm:block">
              All section references reflect Act No. 45 of 1860 and Act No. 45 of 2023.
            </div>
          </div>

          {loading ? (
            <div className="py-20">
              <LoadingState label="Consulting statutory concordance tables..." />
            </div>
          ) : filteredComparisons.length > 0 ? (
            <>
              {/* Expandable Sources & Verification System */}
              <SourcesVerification
                className="mb-8"
                sources={[
                  {
                    documentName: 'Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)',
                    sourceName: 'The Gazette of India (Extraordinary), Part II, Section 1 (egazette.gov.in)',
                    sourceUrl: 'https://egazette.gov.in',
                    lastVerified: 'Ministry of Law and Justice (Legislative Department) — 25 Dec 2023',
                    sourceType: 'official',
                    citation: 'Act 45 of 2023 (Enforced 1 July 2024)',
                    notes: 'Official enacted bare act replacing the Indian Penal Code, 1860.',
                  },
                  {
                    documentName: 'Indian Penal Code, 1860 (Act No. 45 of 1860 — Repealed)',
                    sourceName: 'India Code Legislative Repository (indiacode.nic.in)',
                    sourceUrl: 'https://indiacode.nic.in',
                    lastVerified: 'India Code legislative database',
                    sourceType: 'official',
                    citation: 'Act 45 of 1860 (Repealed by BNS 2023 Sec 358)',
                    notes: 'Historical bare act text preserved for pending criminal proceedings under General Clauses Act Section 6.',
                  },
                  {
                    documentName: 'Statutory Concordance & Sectional Transition Tables',
                    sourceName: 'Parliamentary Standing Committee on Home Affairs (Report No. 246)',
                    sourceUrl: 'https://sansad.in',
                    lastVerified: 'Parliamentary Standing Committee on Home Affairs',
                    sourceType: 'official',
                    citation: 'Standing Committee Report No. 246 on Bharatiya Nyaya Sanhita Bill',
                    notes: 'Official parliamentary report detailing the clause-by-clause conversion from IPC to BNS.',
                  },
                  {
                    documentName: 'Plain-Language Comparative Legal Analysis',
                    sourceName: 'Nyaya Legal Research & Concordance Group',
                    sourceUrl: null,
                    lastVerified: 'Editorial Board Concordance Review',
                    sourceType: 'secondary',
                    citation: 'Editorial Comparative Commentary',
                    notes: 'Plain-language descriptions of substantive amendments, newly created offences, and punishment modifications.',
                  },
                ]}
              />

              <div className="space-y-12">
              {filteredComparisons.map((item, index) => {
                const isHighlighted = activeHighlightId === item.id
                const isCopied = copiedId === item.id
                const isRequiresVerification = item.mappingStatus === 'requires-verification'

                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className={`scroll-mt-36 rounded-sm border transition-all ${
                      isHighlighted
                        ? 'border-brass bg-brass-faint/30 ring-2 ring-brass shadow-md'
                        : isRequiresVerification
                        ? 'border-amber-300 bg-amber-50/20'
                        : 'border-stone-200/90 bg-white hover:border-stone-300 shadow-2xs'
                    }`}
                  >
                    {/* Header Banner: Topic & Offence Title */}
                    <div className="border-b border-stone-200/80 px-6 py-4 bg-[#FBF9F5]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50 font-semibold">
                            Topic: {item.topic}
                          </span>
                          <span className="text-stone-300">·</span>
                          <span className="text-[11px] font-mono text-ink/40">
                            Entry #{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy tracking-tight group">
                          <a
                            href={`#${item.id}`}
                            className="hover:text-brass-dark transition-colors inline-flex items-baseline gap-2"
                          >
                            <span>{item.offenceTitle}</span>
                            <Hash className="w-4 h-4 opacity-0 group-hover:opacity-40 text-brass-dark transition-opacity" />
                          </a>
                        </h3>
                      </div>

                      {/* Right Header: Status Badge & Tools */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {renderStatusBadge(item.mappingStatus)}

                        <button
                          type="button"
                          onClick={() => copyCitation(item)}
                          aria-label={`Copy comparative citation for ${item.offenceTitle}`}
                          className={`inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 text-xs font-mono rounded border transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                            isCopied
                              ? 'bg-forest/10 border-forest text-forest font-medium'
                              : 'bg-white border-stone-200 text-ink/60 hover:text-navy hover:border-stone-300'
                          }`}
                          title="Copy comparative citation"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-forest" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Cite</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Warning Notice if Mapping Requires Verification */}
                    {isRequiresVerification && (
                      <div className="bg-amber-100/70 border-b border-amber-200 px-6 py-2.5 flex items-start gap-2.5 text-xs text-amber-950 font-sans">
                        <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <strong>Caution — Requires Verification:</strong>{' '}
                          {item.legalEquivalenceSummary ||
                            'This provision underwent structural alteration, reworded scope, or executive abeyance. It is not an identical 1:1 legal substitute.'}
                        </div>
                      </div>
                    )}

                    {/* Comparative Provisions (Side-by-Side or Stacked) */}
                    <div
                      className={`p-6 sm:p-8 ${
                        layoutMode === 'side-by-side'
                          ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-stone-200'
                          : 'space-y-8 divide-y divide-stone-200'
                      }`}
                    >
                      {/* OLD PROVISION (IPC 1860) */}
                      <div className={layoutMode === 'side-by-side' ? 'pr-0 lg:pr-6' : 'pt-0'}>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200/70">
                          <span className="text-xs font-mono uppercase tracking-widest text-oxblood font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-oxblood" /> Old Provision: IPC 1860
                          </span>
                          <span className="text-[11px] font-mono text-ink/50 italic">
                            {item.oldProvision.status}
                          </span>
                        </div>

                        {/* Section Number & Title */}
                        <div className="mb-4">
                          <div className="text-sm font-mono font-bold text-navy">
                            {item.oldProvision.section}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-ink/90 mt-0.5">
                            {item.oldProvision.title}
                          </h4>
                        </div>

                        {/* Scope / Statutory Text */}
                        <div className="mb-4">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 font-semibold block mb-1">
                            Statutory Scope & Text
                          </span>
                          <p className="text-sm font-sans text-ink/80 leading-relaxed bg-[#F7F5F0] p-3.5 rounded-sm border border-stone-200/80 whitespace-pre-line">
                            {item.oldProvision.scopeText}
                          </p>
                        </div>

                        {/* Prescribed Punishment */}
                        <div className="mb-3">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 font-semibold block mb-0.5">
                            Prescribed Punishment
                          </span>
                          <div className="text-xs font-sans font-medium text-navy bg-white px-3 py-2 rounded-sm border border-stone-200">
                            {item.oldProvision.punishment}
                          </div>
                        </div>

                        {/* Key Characteristics */}
                        {item.oldProvision.keyCharacteristics && (
                          <div className="text-xs font-sans text-ink/60 italic">
                            {item.oldProvision.keyCharacteristics}
                          </div>
                        )}
                      </div>

                      {/* NEW PROVISION (BNS 2023) */}
                      <div
                        className={
                          layoutMode === 'side-by-side'
                            ? 'pl-0 lg:pl-6 pt-6 lg:pt-0'
                            : 'pt-8'
                        }
                      >
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200/70">
                          <span className="text-xs font-mono uppercase tracking-widest text-forest font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest" /> New Provision: BNS 2023
                          </span>
                          <span className="text-[11px] font-mono text-ink/50 italic">
                            {item.newProvision.status}
                          </span>
                        </div>

                        {/* Section Number & Title */}
                        <div className="mb-4">
                          <div className="text-sm font-mono font-bold text-navy">
                            {item.newProvision.section}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-ink/90 mt-0.5">
                            {item.newProvision.title}
                          </h4>
                        </div>

                        {/* Scope / Statutory Text */}
                        <div className="mb-4">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 font-semibold block mb-1">
                            Statutory Scope & Text
                          </span>
                          <p className="text-sm font-sans text-ink/80 leading-relaxed bg-[#F7F5F0] p-3.5 rounded-sm border border-stone-200/80 whitespace-pre-line">
                            {item.newProvision.scopeText}
                          </p>
                        </div>

                        {/* Prescribed Punishment */}
                        <div className="mb-3">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 font-semibold block mb-0.5">
                            Prescribed Punishment
                          </span>
                          <div className="text-xs font-sans font-medium text-navy bg-white px-3 py-2 rounded-sm border border-stone-200">
                            {item.newProvision.punishment}
                          </div>
                        </div>

                        {/* Key Characteristics */}
                        {item.newProvision.keyCharacteristics && (
                          <div className="text-xs font-sans text-ink/60 italic">
                            {item.newProvision.keyCharacteristics}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comparative Analysis & Plain Language Difference */}
                    <div className="border-t border-stone-200 bg-[#FAF8F3] p-6 sm:p-8">
                      <div className="max-w-4xl">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-brass-dark font-bold block mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Plain-Language Difference & Practical Impact
                        </span>
                        <p className="text-sm sm:text-base font-serif text-ink leading-relaxed">
                          {item.plainLanguageDifference}
                        </p>
                      </div>

                      {/* Verified Statutory & Precedential Cross-Links */}
                      <RelatedInformation
                        compact={true}
                        type="section"
                        lawId="bns-2023"
                        sectionNumber={item.newProvision.section}
                        className="mt-4"
                      />

                      {/* Source Citation Footer */}
                      <div className="mt-5 pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-ink/55">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                          <span>Authoritative Source: <strong className="font-normal text-ink/75">{item.source}</strong></span>
                        </div>
                        <span className="text-ink/40">Concordance Ref: {item.id}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

              {/* Bottom Editorial Related Information */}
              <div className="mt-12">
                <RelatedInformation
                  type="section"
                  lawId="bns-2023"
                  sectionNumber="103"
                  title="Concordance Cross-References & Precedential Framework"
                  subtitle="Explore how IPC ↔ BNS transitions interact with fundamental rights under Article 20(1) (ex-post facto protection), procedural BNSS clauses, landmark Supreme Court ratio decidendi, and legal terms."
                />
              </div>
            </>
          ) : (
            /* Empty Search State */
            <div className="rounded-md border border-dashed border-stone-300 bg-white p-12 text-center max-w-xl mx-auto my-12 shadow-2xs">
              <ArrowLeftRight className="w-10 h-10 text-ink/30 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-navy">
                No matching provision found
              </h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                No statutory mapping matches <strong className="text-navy">"{query}"</strong> in the selected filters. Try searching by classic section numbers (e.g., <em>302</em>, <em>420</em>, <em>379</em>, <em>124A</em>) or modern BNS sections (<em>103</em>, <em>318</em>, <em>152</em>).
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-navy text-white rounded hover:bg-navy-light transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
