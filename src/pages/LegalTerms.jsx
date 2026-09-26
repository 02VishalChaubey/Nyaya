import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useLocation, Link } from 'react-router-dom'
import {
  Search,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  Filter,
  Hash,
  X,
  Compass,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import RelatedInformation from '../components/RelatedInformation.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchLegalTerms } from '../api/client.js'
import { legalTerms as fallbackTerms } from '../data/legalTerms.js'
import { laws as fallbackLaws } from '../data/laws.js'
import { useBreadcrumbContext } from '../context/BreadcrumbContext.jsx'

export default function LegalTerms() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [selectedLetter, setSelectedLetter] = useState(searchParams.get('letter') || '')
  const [copiedId, setCopiedId] = useState(null)
  const [activeHighlightId, setActiveHighlightId] = useState(null)

  // API call with fallback
  const {
    data: rawTerms,
    loading,
    usingFallback,
  } = useApi(
    () => fetchLegalTerms({ q: query, category: selectedCategory !== 'all' ? selectedCategory : undefined }),
    [query, selectedCategory],
    fallbackTerms
  )

  // Ensure terms array is well-formed
  const termsList = useMemo(() => {
    return Array.isArray(rawTerms) && rawTerms.length > 0 ? rawTerms : fallbackTerms
  }, [rawTerms])

  // Categories list with counts
  const categories = useMemo(() => {
    const counts = {}
    fallbackTerms.forEach((t) => {
      const cat = t.category || 'General & Judicial Process'
      counts[cat] = (counts[cat] || 0) + 1
    })
    return [
      { id: 'all', label: 'All Branches', count: fallbackTerms.length },
      { id: 'Criminal Procedure', label: 'Criminal Procedure (BNSS)', count: counts['Criminal Procedure'] || 0 },
      { id: 'Constitutional Law', label: 'Constitutional Law & Writs', count: counts['Constitutional Law'] || 0 },
      { id: 'Criminal Penal (BNS)', label: 'Penal Code (BNS)', count: counts['Criminal Penal (BNS)'] || 0 },
      { id: 'Civil & Contract Law', label: 'Civil & Contract Law', count: counts['Civil & Contract Law'] || 0 },
      { id: 'General & Judicial Process', label: 'Judicial Process', count: counts['General & Judicial Process'] || 0 },
      { id: 'Consumer Law', label: 'Consumer & Cyber', count: counts['Consumer Law'] || 0 },
    ]
  }, [])

  // Filtered terms
  const filteredTerms = useMemo(() => {
    let list = termsList

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase()
      list = list.filter((t) => (t.category || '').toLowerCase() === catLower)
    }

    // Letter filter
    if (selectedLetter) {
      list = list.filter((t) => t.term.trim().toUpperCase().startsWith(selectedLetter.toUpperCase()))
    }

    // Query filter (in case offline or local refinement)
    if (query) {
      const q = query.toLowerCase().trim()
      list = list.filter((t) => {
        return (
          t.term.toLowerCase().includes(q) ||
          (t.fullForm && t.fullForm.toLowerCase().includes(q)) ||
          (t.plainLanguage && t.plainLanguage.toLowerCase().includes(q)) ||
          (t.legalMeaning && t.legalMeaning.toLowerCase().includes(q)) ||
          (t.example && t.example.toLowerCase().includes(q)) ||
          (t.relevantLaw && t.relevantLaw.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.definition && t.definition.toLowerCase().includes(q))
        )
      })
    }

    // Sort alphabetically by term name
    return [...list].sort((a, b) => a.term.localeCompare(b.term))
  }, [termsList, selectedCategory, selectedLetter, query])

  // Available initial letters from the filtered/current set
  const availableLetters = useMemo(() => {
    const letters = new Set()
    fallbackTerms.forEach((t) => {
      const firstChar = t.term.trim().charAt(0).toUpperCase()
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar)
      }
    })
    return Array.from(letters).sort()
  }, [])

  // Letters active in current category
  const lettersInActiveCategory = useMemo(() => {
    const set = new Set()
    let pool = fallbackTerms
    if (selectedCategory && selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase()
      pool = pool.filter((t) => (t.category || '').toLowerCase() === catLower)
    }
    pool.forEach((t) => {
      const firstChar = t.term.trim().charAt(0).toUpperCase()
      if (/[A-Z]/.test(firstChar)) {
        set.add(firstChar)
      }
    })
    return set
  }, [selectedCategory])

  // Group terms by first letter for classical lexicon presentation
  const groupedByLetter = useMemo(() => {
    const map = {}
    filteredTerms.forEach((term) => {
      const firstChar = term.term.trim().charAt(0).toUpperCase()
      if (!map[firstChar]) {
        map[firstChar] = []
      }
      map[firstChar].push(term)
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredTerms])

  const { setActiveTerm } = useBreadcrumbContext()

  // Handle URL hash changes and smooth scrolling to targeted term
  useEffect(() => {
    const hash = location.hash ? location.hash.replace('#', '') : ''
    if (hash) {
      // Find term by id or term name
      const targetTerm = fallbackTerms.find(
        (t) => t.id === hash || t.term.toLowerCase() === hash.toLowerCase()
      )
      if (targetTerm) {
        setActiveTerm(targetTerm.term)
        // If term is outside current filter, reset filters to show it
        if (selectedCategory !== 'all' && targetTerm.category !== selectedCategory) {
          setSelectedCategory('all')
        }
        if (selectedLetter && !targetTerm.term.toUpperCase().startsWith(selectedLetter)) {
          setSelectedLetter('')
        }

        setTimeout(() => {
          const el = document.getElementById(targetTerm.id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            setActiveHighlightId(targetTerm.id)
            setTimeout(() => setActiveHighlightId(null), 3500)
          }
        }, 150)
      } else {
        const cleanLabel = hash.charAt(0).toUpperCase() + hash.slice(1)
        setActiveTerm(cleanLabel)
      }
    } else {
      setActiveTerm(null)
    }
  }, [location.hash, setActiveTerm])

  // Sync state to URL params cleanly
  const updateFilters = (newQuery, newCategory, newLetter) => {
    const params = new URLSearchParams()
    if (newQuery) params.set('q', newQuery)
    if (newCategory && newCategory !== 'all') params.set('category', newCategory)
    if (newLetter) params.set('letter', newLetter)
    setSearchParams(params, { replace: true })
  }

  const handleSearch = (val) => {
    setQuery(val)
    updateFilters(val, selectedCategory, selectedLetter)
  }

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId)
    setSelectedLetter('') // Reset letter filter on category switch
    updateFilters(query, catId, '')
  }

  const handleLetterSelect = (letter) => {
    const nextLetter = selectedLetter === letter ? '' : letter
    setSelectedLetter(nextLetter)
    updateFilters(query, selectedCategory, nextLetter)
  }

  const handleClearAll = () => {
    setQuery('')
    setSelectedCategory('all')
    setSelectedLetter('')
    setSearchParams({}, { replace: true })
  }

  // Copy citation or link
  const copyCitation = (term) => {
    const url = `${window.location.origin}/legal-terms#${term.id}`
    const citation = `"${term.term}" — Plain Language: ${term.plainLanguage} [Governed under: ${term.relevantLaw}]. Source: ${term.source}. (Nyaya Legal Lexicon: ${url})`
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(term.id)
      setTimeout(() => setCopiedId(null), 2200)
    })
  }

  // Jump to a related term
  const jumpToRelatedTerm = (relatedTermId) => {
    const target = fallbackTerms.find(
      (t) =>
        t.id === relatedTermId ||
        t.term.toLowerCase() === relatedTermId.toLowerCase() ||
        t.term.toLowerCase().replace(/[^a-z0-9]/g, '-') === relatedTermId.toLowerCase()
    )

    if (target) {
      // Clear filters so it will be visible
      if (selectedCategory !== 'all' && target.category !== selectedCategory) {
        setSelectedCategory('all')
      }
      if (selectedLetter && !target.term.toUpperCase().startsWith(selectedLetter)) {
        setSelectedLetter('')
      }
      if (query) {
        setQuery('')
      }

      window.location.hash = target.id
      setTimeout(() => {
        const el = document.getElementById(target.id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setActiveHighlightId(target.id)
          setTimeout(() => setActiveHighlightId(null), 3500)
        }
      }, 100)
    }
  }

  // Resolve law ID to readable law name
  const resolveLaw = (lawId) => {
    return fallbackLaws.find((l) => l.id === lawId)
  }

  return (
    <>
      {/* Editorial Reference Masthead */}
      <div className="border-b border-border bg-[#FBF9F5] text-ink py-10 sm:py-14">
        <div className="container-content">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-widest text-brass-dark bg-brass-faint/60 border border-brass/20 rounded mb-4">
              <BookOpen className="w-3.5 h-3.5 text-brass-dark" />
              <span>Compendium of Codified Jurisprudence · Jus Scriptum</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy">
              Legal Terms & Statutory Lexicon
            </h1>
            <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed max-w-3xl font-sans">
              Authoritative, plain-language definitions and verified statutory frameworks for essential legal concepts under Indian law. Codified and cross-referenced with the Bharatiya Nyaya Sanhita (BNS) and Bharatiya Nagarik Suraksha Sanhita (BNSS).
            </p>

            {/* Curatorial Stats Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-ink/60 border-t border-stone-200/80 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-forest" />
                <strong className="text-navy">{fallbackTerms.length}</strong> Codified Legal Terms
              </span>
              <span className="text-stone-300">|</span>
              <span>Updated for BNS & BNSS (1 July 2024 Enactment)</span>
              <span className="text-stone-300">|</span>
              <span>Verified Statutory Sources</span>
            </div>

            {/* Search Input Box */}
            <div className="mt-8">
              <div className="relative">
                <SearchBar
                  size="lg"
                  placeholder="Search legal terms, definitions, sections (e.g., 'bail', 'remand', 'habeas corpus', 'Section 481')..."
                  initialValue={query}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8F5] min-h-screen">
        {/* Institutional Control Bar: Branch Filters & A-Z Thumb Index */}
        <section className="sticky top-16 z-20 border-b border-border bg-[#F5F2EB]/95 backdrop-blur-md shadow-xs">
          <div className="container-content py-3">
            {/* Category / Branch Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none" role="group" aria-label="Filter by branch">
              <span className="text-xs font-mono uppercase tracking-widest text-ink/60 mr-2 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Branch:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`shrink-0 px-3 py-1.5 text-xs font-sans rounded-sm transition-all min-h-[36px] flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                      isActive
                        ? 'bg-navy text-white font-medium shadow-xs'
                        : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-ink/60'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Alphabetical A-Z Thumb Index Ribbon */}
            <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex items-center justify-between gap-2 overflow-x-auto" role="group" aria-label="Alphabetical letter index">
              <div className="flex items-center gap-1">
                <span className="text-xs font-mono uppercase tracking-widest text-ink/60 mr-1.5 shrink-0">
                  Lexicon Index:
                </span>
                <button
                  type="button"
                  aria-pressed={selectedLetter === ''}
                  onClick={() => handleLetterSelect('')}
                  className={`px-2 py-0.5 text-xs font-mono rounded min-h-[32px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                    selectedLetter === ''
                      ? 'bg-brass text-white font-bold'
                      : 'text-ink/60 hover:text-navy hover:bg-stone-200/60'
                  }`}
                >
                  All (A–Z)
                </button>
                {availableLetters.map((letter) => {
                  const isAvailableInBranch = lettersInActiveCategory.has(letter)
                  const isSelected = selectedLetter === letter

                  return (
                    <button
                      key={letter}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Filter terms starting with letter ${letter}`}
                      disabled={!isAvailableInBranch}
                      onClick={() => handleLetterSelect(letter)}
                      className={`w-7 h-7 text-xs font-serif font-bold transition-all rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                        isSelected
                          ? 'bg-navy text-white shadow-xs'
                          : isAvailableInBranch
                          ? 'text-navy hover:bg-stone-200/80 text-center'
                          : 'text-stone-300 cursor-not-allowed text-center'
                      }`}
                      title={
                        isAvailableInBranch
                          ? `Filter terms starting with '${letter}'`
                          : `No terms under '${letter}' in current branch`
                      }
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>

              {/* Active Filter Indicators / Clear */}
              {(query || selectedCategory !== 'all' || selectedLetter) && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-sans text-oxblood hover:underline px-2 py-0.5 min-h-[32px]"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Content Section: Reference Ledger */}
        <div className="container-content py-10 sm:py-14">
          {usingFallback && <OfflineNotice className="mb-8" />}

          {/* Search Result Counter & Context */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-ink/50">
                {query ? 'Search Results' : selectedLetter ? `Alphabetical Index: Section ${selectedLetter}` : 'Reference Ledger'}
              </p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy mt-0.5">
                Showing {filteredTerms.length} of {fallbackTerms.length} Codified Terms
              </h2>
            </div>

            {/* Quick Helper Note */}
            <div className="text-xs font-sans text-ink/60 max-w-sm text-right hidden sm:block">
              Click any cross-reference link to immediately examine interconnected legal doctrines.
            </div>
          </div>

          {loading ? (
            <div className="py-20">
              <LoadingState label="Consulting legal lexicon..." />
            </div>
          ) : filteredTerms.length > 0 ? (
            <>
              {/* Reference-Book Style Layout */}
              <div className="space-y-16">
              {groupedByLetter.map(([letter, termsInGroup]) => (
                <section
                  key={letter}
                  id={`letter-${letter}`}
                  className="scroll-mt-40 border-t-2 border-stone-300 pt-6"
                >
                  {/* Classical Letter Division Marker */}
                  <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-stone-200">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-3xl sm:text-4xl font-black text-navy tracking-tight">
                        § {letter}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-ink/50">
                        {termsInGroup.length} {termsInGroup.length === 1 ? 'Term' : 'Terms'}
                      </span>
                    </div>
                    <span className="text-xs font-serif italic text-ink/40">
                      Lexicon Series {letter}
                    </span>
                  </div>

                  {/* Terms in this letter group */}
                  <div className="divide-y divide-stone-200/80">
                    {termsInGroup.map((term) => {
                      const isHighlighted = activeHighlightId === term.id
                      const isCopied = copiedId === term.id

                      // Resolve related laws
                      const relatedLawObjects = (term.relatedLaws || [])
                        .map((lawId) => resolveLaw(lawId))
                        .filter(Boolean)

                      return (
                        <article
                          key={term.id}
                          id={term.id}
                          className={`scroll-mt-36 py-8 sm:py-10 transition-all rounded-sm ${
                            isHighlighted
                              ? 'bg-brass-faint/40 ring-2 ring-brass px-4 sm:px-6 my-2 shadow-xs'
                              : 'hover:bg-stone-50/50'
                          }`}
                        >
                          {/* Entry Folio & Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div>
                              {/* Category & Branch Kicker */}
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[11px] font-mono uppercase tracking-widest text-brass-dark font-medium bg-brass-faint/80 px-2 py-0.5 rounded border border-brass/20">
                                  {term.category || 'General Jurisprudence'}
                                </span>
                                {term.fullForm && (
                                  <span className="text-xs font-mono text-ink/50 tracking-tight">
                                    [{term.fullForm}]
                                  </span>
                                )}
                              </div>

                              {/* Term Title */}
                              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy tracking-tight group">
                                <a
                                  href={`#${term.id}`}
                                  className="hover:text-brass-dark transition-colors inline-flex items-baseline gap-2"
                                >
                                  <span>{term.term}</span>
                                  <Hash className="w-4 h-4 opacity-0 group-hover:opacity-40 text-brass-dark transition-opacity" />
                                </a>
                              </h3>
                            </div>

                            {/* Action Tools: Copy Citation, Bookmark & Search */}
                            <div className="flex items-center gap-2 shrink-0">
                              <BookmarkButton
                                item={{
                                  id: `term-${term.id}`,
                                  title: term.term,
                                  category: term.category || 'Legal Term',
                                  type: 'term',
                                  description: term.plainLanguage || term.definition,
                                  url: `/legal-terms#${term.id}`,
                                }}
                                size="sm"
                              />

                              <button
                                type="button"
                                onClick={() => copyCitation(term)}
                                aria-label={`Copy formal citation for ${term.term}`}
                                className={`inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 text-xs font-mono rounded border transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                                  isCopied
                                    ? 'bg-forest/10 border-forest text-forest font-medium'
                                    : 'bg-white border-stone-200 text-ink/60 hover:text-navy hover:border-stone-300'
                                }`}
                                title="Copy formal citation to clipboard"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-forest" />
                                    <span>Citation Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Cite Term</span>
                                  </>
                                )}
                              </button>

                              <Link
                                to={`/search?q=${encodeURIComponent(term.term)}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-white border border-stone-200 text-ink/60 hover:text-navy hover:border-stone-300 rounded transition-all"
                                title="Search for this term across laws and judgments"
                              >
                                <Search className="w-3.5 h-3.5" />
                                <span>Corpus Search</span>
                              </Link>
                            </div>
                          </div>

                          {/* 1. Plain-Language Definition Block */}
                          <div className="mt-4 mb-6 rounded-sm bg-white border-l-4 border-navy p-4 sm:p-5 shadow-2xs">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-navy/70 font-semibold block mb-1.5">
                              Plain-Language Definition
                            </span>
                            <p className="text-base sm:text-lg font-serif text-ink leading-relaxed">
                              {term.plainLanguage || term.definition}
                            </p>
                          </div>

                          {/* 2. Legal Context & Statutory Meaning */}
                          {term.legalMeaning && (
                            <div className="mb-6">
                              <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50 font-semibold block mb-2">
                                Legal Context & Statutory Framework
                              </span>
                              <p className="text-sm sm:text-base text-ink/85 leading-relaxed font-sans max-w-prose">
                                {term.legalMeaning}
                              </p>
                            </div>
                          )}

                          {/* 3. Practical Illustration / Example */}
                          {term.example && (
                            <div className="mb-6 rounded-sm bg-[#F5F2EC] border border-stone-200/90 p-4 sm:p-5">
                              <span className="text-[11px] font-mono uppercase tracking-widest text-brass-dark font-bold block mb-1.5 flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5" /> Practical Illustration (Example)
                              </span>
                              <p className="text-sm text-ink/80 leading-relaxed font-sans">
                                {term.example}
                              </p>
                            </div>
                          )}

                          {/* 4. Statutory Framework & Metadata Ledger */}
                          <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs font-sans">
                            {/* Relevant Law */}
                            <div>
                              <span className="font-mono uppercase tracking-widest text-ink/50 block mb-1.5 font-semibold">
                                Relevant Law & Provisions
                              </span>
                              <div className="text-sm font-serif font-medium text-navy">
                                {term.relevantLaw}
                              </div>

                              {/* Direct Links to Laws if mapped */}
                              {relatedLawObjects.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {relatedLawObjects.map((law) => (
                                    <Link
                                      key={law.id}
                                      to={`/laws/${law.id}`}
                                      className="inline-flex items-center gap-1 text-xs font-medium text-brass-dark hover:text-navy transition-colors bg-white px-2 py-0.5 rounded border border-stone-200 hover:border-stone-300"
                                    >
                                      <span>{law.name}</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Related Terms / Cross References */}
                            <div>
                              <span className="font-mono uppercase tracking-widest text-ink/50 block mb-1.5 font-semibold">
                                Cross-References (See Also)
                              </span>
                              {term.relatedTerms && term.relatedTerms.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5">
                                  {term.relatedTerms.map((relId) => {
                                    const relatedObj = fallbackTerms.find((t) => t.id === relId)
                                    const displayLabel = relatedObj ? relatedObj.term : relId.replace(/-/g, ' ')

                                    return (
                                      <button
                                        key={relId}
                                        type="button"
                                        aria-label={`Jump to definition of ${displayLabel}`}
                                        onClick={() => jumpToRelatedTerm(relId)}
                                        className="inline-flex items-center gap-1 min-h-[32px] px-2.5 py-1 text-xs font-serif bg-white hover:bg-stone-100 text-navy hover:text-brass-dark border border-stone-200 rounded transition-all cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
                                        title={`Jump to definition of '${displayLabel}'`}
                                      >
                                        <ChevronRight className="w-3 h-3 text-brass" />
                                        <span>{displayLabel}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                              ) : (
                                <span className="text-ink/60 italic">Standalone doctrine</span>
                              )}
                            </div>
                          </div>

                          {/* Verified Cross-Statute & Precedent Connections */}
                          <RelatedInformation
                            compact={true}
                            type="term"
                            id={term.id}
                            className="mt-3.5"
                          />

                          {/* Source Citation Footer */}
                          {term.source && (
                            <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-ink/55">
                              <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                                <span>Verified Source: <strong className="font-normal text-ink/75">{term.source}</strong></span>
                              </div>
                              <span className="text-ink/60">Reference Ref. ID: {term.id}</span>
                            </div>
                          )}
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

              {/* Bottom Full Editorial Related Information */}
              <div className="mt-14">
                <RelatedInformation
                  type="term"
                  id={query ? query : 'bail'}
                  title="Jurisprudential Connections for Codified Terminology"
                  subtitle="Verified pathways connecting codified procedural and constitutional terms to substantive Bare Act provisions, fundamental rights under Part III, binding Supreme Court precedent, and citizen SOPs."
                />
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="rounded-md border border-dashed border-stone-300 bg-white p-12 text-center max-w-xl mx-auto my-12 shadow-2xs">
              <BookOpen className="w-10 h-10 text-ink/30 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-navy">
                No matching legal terms found
              </h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                No entry matches your query <strong className="text-navy">"{query}"</strong> in the current branch. Try searching for common procedural terms like <em>bail</em>, <em>FIR</em>, <em>remand</em>, or <em>habeas corpus</em>.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
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
