import React, { useState, useMemo } from 'react'
import {
  BookOpen,
  Scale,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Search,
  Landmark,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  Gavel,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Users,
  Car,
  Lock,
  ExternalLink,
  Info,
} from 'lucide-react'
import {
  bnsGazetteInfo,
  bnsKeyReforms,
  bnsChapters,
  bnsCoreSections,
  ipcToBnsMatrix,
  bnsQuiz,
} from '../data/bnsDetailedNotes.js'

export default function BNSGazetteViewer() {
  const [activeTab, setActiveTab] = useState('sections') // 'reforms', 'matrix', 'chapters', 'sections', 'defences', 'quiz'
  const [sectionSearch, setSectionSearch] = useState('')
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('all')
  const [expandedSection, setExpandedSection] = useState(null)

  // Matrix search
  const [matrixSearch, setMatrixSearch] = useState('')

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizRevealed, setQuizRevealed] = useState({})

  const handleQuizSelect = (qId, optionIdx) => {
    if (quizRevealed[qId]) return
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
  }

  const handleQuizCheck = (qId) => {
    setQuizRevealed((prev) => ({ ...prev, [qId]: true }))
  }

  const handleQuizReset = () => {
    setQuizAnswers({})
    setQuizRevealed({})
  }

  const quizScore = bnsQuiz.reduce((acc, q) => {
    if (quizRevealed[q.id] && quizAnswers[q.id] === q.correctAnswer) {
      return acc + 1
    }
    return acc
  }, 0)

  // Dynamic chapter list with live section counts
  const availableChapters = useMemo(() => {
    const chapterMap = new Map()
    bnsCoreSections.forEach((sec) => {
      const ch = sec.chapter
      chapterMap.set(ch, (chapterMap.get(ch) || 0) + 1)
    })
    return Array.from(chapterMap.entries()).map(([chapter, count]) => ({
      chapter,
      count,
    }))
  }, [])

  // Filtered sections with smart normalization (resolves "bns section", "bns 103", "sec 103", IPC numbers)
  const filteredSections = useMemo(() => {
    const rawQ = sectionSearch.toLowerCase().trim()

    return bnsCoreSections.filter((sec) => {
      const matchesChapter =
        selectedChapterFilter === 'all' ||
        sec.chapter.toLowerCase().includes(selectedChapterFilter.toLowerCase())

      if (!rawQ) return matchesChapter

      // If user typed general queries like "bns", "bns 2023", "bns section", "bns sections", "sanhita":
      // All BNS sections are valid matches!
      const isGeneralBnsQuery =
        rawQ === 'bns' ||
        rawQ === 'bns 2023' ||
        rawQ === 'bns section' ||
        rawQ === 'bns sections' ||
        rawQ === 'bns laws' ||
        rawQ === 'nyaya sanhita' ||
        rawQ === 'bharatiya nyaya sanhita'

      if (isGeneralBnsQuery) return matchesChapter

      // Strip redundant prefixes like "bns", "section", "sec" to extract numbers or core concepts
      const strippedQ = rawQ
        .replace(/\b(bns|bnss|section|sec|act|2023)\b/gi, '')
        .trim()

      const matchTerms = [rawQ]
      if (strippedQ && strippedQ !== rawQ) {
        matchTerms.push(strippedQ)
      }

      const secNum = sec.section.toLowerCase()
      const secTitle = sec.title.toLowerCase()
      const secDesc = sec.description.toLowerCase()
      const secIpc = sec.ipcEquivalent.toLowerCase()
      const secPunish = (sec.punishment || '').toLowerCase()
      const secIll = (sec.keyIllustration || '').toLowerCase()
      const secTags = (sec.tags || []).map((t) => t.toLowerCase())
      const secChapter = sec.chapter.toLowerCase()

      const matchesSearch = matchTerms.some((term) => {
        return (
          secNum.includes(term) ||
          secTitle.includes(term) ||
          secDesc.includes(term) ||
          secIpc.includes(term) ||
          secPunish.includes(term) ||
          secIll.includes(term) ||
          secChapter.includes(term) ||
          secTags.some((t) => t.includes(term))
        )
      })

      return matchesChapter && matchesSearch
    })
  }, [sectionSearch, selectedChapterFilter])

  // Filtered matrix
  const filteredMatrix = useMemo(() => {
    if (!matrixSearch) return ipcToBnsMatrix
    const q = matrixSearch.toLowerCase()
    return ipcToBnsMatrix.filter(
      (m) =>
        m.offence.toLowerCase().includes(q) ||
        m.oldIpc.toLowerCase().includes(q) ||
        m.newBns.toLowerCase().includes(q) ||
        m.changeNote.toLowerCase().includes(q)
    )
  }, [matrixSearch])

  return (
    <div className="space-y-10">
      {/* Official Gazette Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-navy/20 bg-gradient-to-br from-paper via-paper to-page p-6 sm:p-9 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-paper">
                <Landmark size={13} />
                Official Gazette of India
              </span>
              <span className="rounded-md border border-navy/20 bg-navy/5 px-2.5 py-1 font-mono text-xs font-semibold text-navy">
                {bnsGazetteInfo.actNo}
              </span>
              <span className="rounded-md border border-amber-600/20 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900">
                Assented: {bnsGazetteInfo.enactmentDate}
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {bnsGazetteInfo.actName}
            </h2>

            <p className="mt-2 text-xs font-mono text-ink/60">
              {bnsGazetteInfo.gazetteRef} • {bnsGazetteInfo.authority}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              An Act to consolidate and amend the provisions relating to offences and for matters connected therewith or incidental thereto.
              Enacted by the Parliament in the 74th Year of the Republic of India, completely repealing and replacing the colonial Indian Penal Code, 1860 (Act No. 45 of 1860) under Section 358.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
              <div className="rounded-lg border border-border/80 bg-paper p-3 text-center">
                <span className="block font-mono text-lg font-bold text-navy">20</span>
                <span className="text-ink/60 font-medium">Chapters</span>
              </div>
              <div className="rounded-lg border border-border/80 bg-paper p-3 text-center">
                <span className="block font-mono text-lg font-bold text-navy">358</span>
                <span className="text-ink/60 font-medium">Sections</span>
              </div>
              <div className="rounded-lg border border-border/80 bg-paper p-3 text-center">
                <span className="block font-mono text-lg font-bold text-emerald-700">1860 → 2023</span>
                <span className="text-ink/60 font-medium">IPC Modernised</span>
              </div>
              <div className="rounded-lg border border-border/80 bg-paper p-3 text-center">
                <span className="block font-mono text-lg font-bold text-brass-dark">Sec 4(f)</span>
                <span className="text-ink/60 font-medium">Community Service</span>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="w-full lg:w-80 shrink-0 rounded-xl border border-navy/15 bg-navy/5 p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
              <ShieldCheck size={16} className="text-navy" />
              Jurisdiction &amp; Reach
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-ink/75">
              {bnsGazetteInfo.applicability}
            </p>
            <div className="mt-3.5 border-t border-navy/10 pt-3 text-[11px] text-ink/60 space-y-1">
              <p>• Applies to citizens abroad</p>
              <p>• Ships &amp; aircraft registered in India</p>
              <p>• Cyber attacks targeting Indian servers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'sections'
              ? 'bg-navy text-white shadow-2xs'
              : 'border border-border/80 bg-paper text-ink/75 hover:bg-page hover:text-navy'
          }`}
        >
          <BookOpen size={14} />
          Codified Sections &amp; Notes ({filteredSections.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reforms')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'reforms'
              ? 'bg-navy text-white shadow-2xs'
              : 'border border-border/80 bg-paper text-ink/75 hover:bg-page hover:text-navy'
          }`}
        >
          <Sparkles size={14} />
          Key Reforms &amp; Innovations
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'matrix'
              ? 'bg-navy text-white shadow-2xs'
              : 'border border-border/80 bg-paper text-ink/75 hover:bg-page hover:text-navy'
          }`}
        >
          <Scale size={14} />
          IPC vs. BNS Conversion Matrix
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('chapters')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'chapters'
              ? 'bg-navy text-white shadow-2xs'
              : 'border border-border/80 bg-paper text-ink/75 hover:bg-page hover:text-navy'
          }`}
        >
          <Layers size={14} />
          All 20 Chapters Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('defences')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'defences'
              ? 'bg-navy text-white shadow-2xs'
              : 'border border-border/80 bg-paper text-ink/75 hover:bg-page hover:text-navy'
          }`}
        >
          <ShieldCheck size={14} />
          Private Defence &amp; Exceptions
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
            activeTab === 'quiz'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'border border-emerald-600/30 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
          }`}
        >
          <HelpCircle size={14} />
          BNS Knowledge Quiz
        </button>
      </div>

      {/* TAB 1: CODIFIED SECTIONS BROWSER WITH OFFICIAL ILLUSTRATIONS */}
      {activeTab === 'sections' && (
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border/80 bg-paper p-4 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                value={sectionSearch}
                onChange={(e) => setSectionSearch(e.target.value)}
                placeholder="Search section number (e.g. 103, 304), title, or crime..."
                className="w-full rounded-lg border border-border bg-page/50 py-2 pl-9 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            {/* Chapter Category Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-medium text-ink/60">Chapter:</span>
              <select
                value={selectedChapterFilter}
                onChange={(e) => setSelectedChapterFilter(e.target.value)}
                className="rounded-lg border border-border bg-page/50 px-3 py-1.5 text-xs font-medium text-navy focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
              >
                <option value="all">All Chapters ({bnsCoreSections.length} sections)</option>
                {availableChapters.map(({ chapter, count }) => (
                  <option key={chapter} value={chapter}>
                    {chapter} ({count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Clear */}
          {(sectionSearch || selectedChapterFilter !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-ink/60">Filtered by:</span>
              {sectionSearch && (
                <span className="inline-flex items-center gap-1 rounded-full border border-navy/20 bg-navy/5 px-2.5 py-0.5 font-medium text-navy">
                  Query: "{sectionSearch}"
                  <button
                    type="button"
                    onClick={() => setSectionSearch('')}
                    className="hover:text-rose-600 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedChapterFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full border border-brass-dark/30 bg-brass-dark/10 px-2.5 py-0.5 font-medium text-brass-dark">
                  {selectedChapterFilter}
                  <button
                    type="button"
                    onClick={() => setSelectedChapterFilter('all')}
                    className="hover:text-rose-600 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSectionSearch('')
                  setSelectedChapterFilter('all')
                }}
                className="text-[11px] font-semibold text-navy hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Section Cards */}
          <div className="space-y-4">
            {filteredSections.map((sec) => {
              const isExpanded = expandedSection === sec.section

              return (
                <div
                  key={sec.section}
                  className="rounded-xl border border-navy/15 bg-paper p-5 shadow-xs transition-all hover:border-navy/30"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-navy px-2.5 py-0.5 font-mono text-xs font-bold text-paper">
                          {sec.section}
                        </span>
                        <span className="font-mono text-xs font-medium text-ink/60">
                          {sec.chapter}
                        </span>
                        <span className="rounded-md border border-brass-dark/30 bg-brass-dark/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-brass-dark">
                          Formerly: {sec.ipcEquivalent}
                        </span>
                      </div>

                      <h3 className="mt-2 text-base sm:text-lg font-bold text-navy">
                        {sec.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/80">
                        {sec.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedSection(isExpanded ? null : sec.section)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border/80 bg-page/60 px-3 py-1.5 text-xs font-medium text-navy hover:bg-page transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Hide Details <ChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          View Penalty &amp; Illustrations <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Highlighted Punishment Banner */}
                  <div className="mt-3.5 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
                    <Gavel size={15} className="mt-0.5 shrink-0 text-amber-700" />
                    <div>
                      <strong className="font-semibold text-amber-950">Prescribed Punishment: </strong>
                      <span className="text-amber-900">{sec.punishment}</span>
                    </div>
                  </div>

                  {/* Expanded Content: Official Illustration & Key Tags */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3 border-t border-border/70 pt-4 text-xs">
                      {sec.keyIllustration && (
                        <div className="rounded-xl border border-navy/10 bg-navy/5 p-4">
                          <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-navy">
                            <Info size={14} className="text-navy" />
                            Official Gazette Illustration / Practical Example:
                          </h4>
                          <p className="mt-2 leading-relaxed text-ink/85 italic">
                            "{sec.keyIllustration}"
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-ink/50">Tags:</span>
                        {sec.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-page px-2 py-0.5 font-mono text-[11px] text-ink/70"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {filteredSections.length === 0 && (
              <div className="rounded-xl border border-dashed border-border/90 bg-page/40 p-8 text-center sm:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <Search size={22} />
                </div>
                <h4 className="mt-3 text-sm sm:text-base font-bold text-navy">
                  No matching BNS sections found
                </h4>
                <p className="mx-auto mt-1 max-w-md text-xs text-ink/70 leading-relaxed">
                  {sectionSearch && selectedChapterFilter !== 'all'
                    ? `No sections in "${selectedChapterFilter}" matched query "${sectionSearch}".`
                    : sectionSearch
                    ? `No sections matched query "${sectionSearch}". Try searching by section number (e.g. "103", "304", "69") or offence name.`
                    : `No sections currently catalogued under "${selectedChapterFilter}".`}
                </p>

                {/* Quick Suggestion Chips */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-[11px] font-semibold text-ink/60">Try searching:</span>
                  {[
                    { label: 'Section 103 (Murder & Lynching)', q: '103' },
                    { label: 'Section 69 (Deceitful Promise)', q: '69' },
                    { label: 'Section 304 (Snatching)', q: '304' },
                    { label: 'Section 4 (Community Service)', q: '4' },
                    { label: 'Section 152 (Sovereignty)', q: '152' },
                    { label: 'Section 111 (Organised Crime)', q: '111' },
                  ].map((chip) => (
                    <button
                      key={chip.q}
                      type="button"
                      onClick={() => {
                        setSectionSearch(chip.q)
                        setSelectedChapterFilter('all')
                      }}
                      className="rounded-lg border border-border bg-paper px-2.5 py-1 text-[11px] font-medium text-navy hover:border-navy hover:bg-page transition-colors"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setSectionSearch('')
                      setSelectedChapterFilter('all')
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-paper hover:bg-navy-light transition-colors"
                  >
                    View All {bnsCoreSections.length} Sections
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: KEY REFORMS & INNOVATIONS */}
      {activeTab === 'reforms' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-navy/15 bg-paper p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy/10 text-navy">
                <Sparkles size={16} />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
                Transformative Architecture
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
              Major Legislative Innovations in BNS 2023
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink/70 max-w-3xl leading-relaxed">
              The Bharatiya Nyaya Sanhita departs significantly from Lord Macaulay's 1860 code by decolonising criminal jurisprudence, prioritising crimes against women and children, introducing restorative punishments, and addressing 21st-century digital threats.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bnsKeyReforms.map((reform, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-border/80 bg-page/30 p-5 hover:border-navy/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-navy/10 px-2 py-0.5 font-mono text-[11px] font-bold text-navy">
                        {reform.section}
                      </span>
                      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                        {reform.badge}
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-navy">
                      {reform.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-ink/75">
                      {reform.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: IPC VS BNS CONVERSION MATRIX */}
      {activeTab === 'matrix' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-navy/15 bg-paper p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brass-dark/10 text-brass-dark">
                    <Scale size={16} />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
                    Cross-Reference Table
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
                  IPC (1860) to BNS (2023) Conversion Matrix
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ink/70">
                  Quick lookup mapping old Indian Penal Code sections to their corresponding provisions in the new Sanhita.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
                />
                <input
                  type="text"
                  value={matrixSearch}
                  onChange={(e) => setMatrixSearch(e.target.value)}
                  placeholder="Search offence or old IPC..."
                  className="w-full rounded-lg border border-border bg-page/50 py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
                />
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-border/80 bg-page/30">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-page text-[11px] font-bold uppercase tracking-wider text-ink/60">
                    <th className="py-3.5 px-4 font-semibold text-navy">Offence / Subject</th>
                    <th className="py-3.5 px-4 font-semibold text-rose-800">Old IPC (1860)</th>
                    <th className="py-3.5 px-4 font-semibold text-navy">New BNS (2023)</th>
                    <th className="py-3.5 px-4 font-semibold text-navy">Prescribed Punishment</th>
                    <th className="py-3.5 px-4 font-semibold text-navy">Key Changes / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-paper">
                  {filteredMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-page/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-navy">
                        {row.offence}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center rounded-md border border-rose-500/20 bg-rose-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-rose-800">
                          {row.oldIpc}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center rounded-md border border-navy/20 bg-navy/5 px-2.5 py-1 font-mono text-[11px] font-bold text-navy">
                          {row.newBns}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-ink/80">
                        {row.punishment}
                      </td>
                      <td className="py-3.5 px-4 leading-relaxed text-ink/75 text-[11px]">
                        {row.changeNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: ALL 20 CHAPTERS ARCHITECTURAL OVERVIEW */}
      {activeTab === 'chapters' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-navy/15 bg-paper p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy/10 text-navy">
                <Layers size={16} />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
                Structure of Sanhita
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
              Complete 20 Chapters Architectural Map
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-ink/70">
              The 358 sections of BNS are grouped logically into 20 comprehensive chapters.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {bnsChapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-page/40 p-5 hover:border-navy/30 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span className="font-mono text-xs font-bold text-navy">
                      {ch.number}
                    </span>
                    <span className="rounded-md bg-navy/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-brass-dark">
                      {ch.sections}
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-bold text-navy">
                    {ch.name}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-ink/75">
                    {ch.summary}
                  </p>

                  <ul className="mt-3 space-y-1 text-[11px] text-ink/65 border-t border-border/50 pt-2.5">
                    {ch.keyPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-navy/60" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: GENERAL EXCEPTIONS & PRIVATE DEFENCE (SECTIONS 14 - 44) */}
      {activeTab === 'defences' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-navy/15 bg-paper p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700">
                <ShieldCheck size={16} />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                Chapter III Analysis
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
              General Exceptions &amp; The Right of Private Defence
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink/70 max-w-3xl leading-relaxed">
              Chapter III (Sections 14 to 44) provides complete legal defences. Under Section 3(1), every single offence in BNS is statutorily read subject to these general exceptions.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Private Defence of Body - When Death May Be Caused */}
              <div className="rounded-xl border border-navy/20 bg-page/40 p-5">
                <div className="flex items-center gap-2 text-navy border-b border-border/80 pb-3">
                  <ShieldAlert size={18} className="text-navy" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Section 38: Defence of Body (Causing Death)
                  </h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink/80">
                  The right of private defence of the body extends to the voluntary causing of death of the assailant in 7 specific assault situations:
                </p>
                <ol className="mt-3 space-y-2 text-xs leading-relaxed text-ink/80 list-decimal list-inside font-medium">
                  <li>Assault causing reasonable apprehension of death</li>
                  <li>Assault causing reasonable apprehension of grievous hurt</li>
                  <li>Assault with intention of committing rape</li>
                  <li>Assault with intention of gratifying unnatural lust</li>
                  <li>Assault with intention of kidnapping or abducting</li>
                  <li>Assault with intention of wrongfully confining a person without recourse to public authorities</li>
                  <li className="text-navy font-bold">
                    Throwing or administering acid (or attempts) reasonably causing apprehension of grievous hurt (New BNS Specifics)
                  </li>
                </ol>
              </div>

              {/* Private Defence of Property - When Death May Be Caused */}
              <div className="rounded-xl border border-brass-dark/20 bg-page/40 p-5">
                <div className="flex items-center gap-2 text-brass-dark border-b border-border/80 pb-3">
                  <Lock size={18} className="text-brass-dark" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Section 41: Defence of Property (Causing Death)
                  </h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink/80">
                  The right of private defence of property extends to voluntary causing of death of the wrongdoer in 4 dangerous offences:
                </p>
                <ol className="mt-3 space-y-2 text-xs leading-relaxed text-ink/80 list-decimal list-inside font-medium">
                  <li>Robbery</li>
                  <li>House-breaking after sunset and before sunrise</li>
                  <li>Mischief by fire or explosive substance on human dwelling, tent, or vessel</li>
                  <li>Theft, mischief, or house-trespass under circumstances causing apprehension of death or grievous hurt</li>
                </ol>

                <div className="mt-4 rounded-lg bg-paper p-3 text-[11px] text-ink/70 border border-border/70">
                  <strong className="text-navy">Proportionality Rule (Section 37):</strong> The right in no case extends to inflicting more harm than is necessary to inflict for the purpose of defence.
                </div>
              </div>
            </div>

            {/* General Exceptions Grid */}
            <div className="mt-6 border-t border-border/80 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                Other Primary Exceptions in Chapter III
              </h4>
              <div className="grid gap-3 sm:grid-cols-3 text-xs">
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 20</span>
                  <h5 className="mt-1 font-bold text-navy">Child Under 7 (Doli Incapax)</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Absolute immunity: nothing is an offence done by a child under seven.</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 22</span>
                  <h5 className="mt-1 font-bold text-navy">Unsoundness of Mind</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Incapability of knowing the nature of the act or that it is contrary to law.</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 23</span>
                  <h5 className="mt-1 font-bold text-navy">Involuntary Intoxication</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Intoxication administered without knowledge or against one's will.</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 19</span>
                  <h5 className="mt-1 font-bold text-navy">Doctrine of Necessity</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Act done in good faith without criminal intent to prevent greater harm.</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 30</span>
                  <h5 className="mt-1 font-bold text-navy">Emergency Surgery</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Surgeon acting in good faith for patient benefit when consent is impossible.</p>
                </div>
                <div className="rounded-lg border border-border/80 bg-paper p-3.5">
                  <span className="font-mono text-[11px] font-bold text-navy">Section 33</span>
                  <h5 className="mt-1 font-bold text-navy">Act Causing Slight Harm</h5>
                  <p className="mt-1 text-[11px] text-ink/70">Harm so slight that no person of ordinary sense and temper would complain.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: BNS KNOWLEDGE ASSESSMENT QUIZ */}
      {activeTab === 'quiz' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-navy/15 bg-paper p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700">
                    <HelpCircle size={16} />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Self-Test &amp; Law Preparation
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-navy sm:text-2xl">
                  Bharatiya Nyaya Sanhita Practice Quiz
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ink/70">
                  Assess your understanding of new penal provisions, punishments, and exceptions from the official Gazette text.
                </p>
              </div>

              {Object.keys(quizRevealed).length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-lg border border-navy/15 bg-navy/5 px-3 py-1.5 text-xs font-semibold text-navy">
                    <Award size={15} className="text-brass-dark" />
                    Score: {quizScore} / {bnsQuiz.length}
                  </div>
                  <button
                    type="button"
                    onClick={handleQuizReset}
                    className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 hover:text-navy transition-colors"
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-6">
              {bnsQuiz.map((q, idx) => {
                const isSubmitted = !!quizRevealed[q.id]
                const selected = quizAnswers[q.id]

                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-border/80 bg-page/40 p-5 transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-paper">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-navy leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selected === oIdx
                        const isCorrect = q.correctAnswer === oIdx

                        let buttonStyle =
                          'border-border/80 bg-paper text-ink/80 hover:bg-page hover:border-navy/40'

                        if (isSubmitted) {
                          if (isCorrect) {
                            buttonStyle =
                              'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          } else if (isSelected && !isCorrect) {
                            buttonStyle =
                              'border-rose-500 bg-rose-50 text-rose-900 line-through'
                          } else {
                            buttonStyle = 'border-border/50 bg-paper/50 text-ink/50'
                          }
                        } else if (isSelected) {
                          buttonStyle =
                            'border-navy bg-navy/5 text-navy font-semibold ring-1 ring-navy'
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleQuizSelect(q.id, oIdx)}
                            className={`flex items-center justify-between rounded-lg border p-3 text-left text-xs transition-all ${buttonStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isCorrect && (
                              <CheckCircle size={15} className="shrink-0 text-emerald-600" />
                            )}
                            {isSubmitted && isSelected && !isCorrect && (
                              <XCircle size={15} className="shrink-0 text-rose-500" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {!isSubmitted && selected !== undefined && (
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleQuizCheck(q.id)}
                          className="rounded-md bg-navy px-3.5 py-1.5 text-xs font-semibold text-paper shadow-2xs hover:bg-navy/90 transition-colors"
                        >
                          Check Answer
                        </button>
                      </div>
                    )}

                    {isSubmitted && (
                      <div className="mt-3 rounded-lg border border-border/80 bg-paper p-3 text-xs leading-relaxed text-ink/75">
                        <span className="font-semibold text-navy">Gazette Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
