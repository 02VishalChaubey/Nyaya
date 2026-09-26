import React, { useState, useMemo } from 'react'
import {
  FileText,
  Scale,
  Search,
  Landmark,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Clock,
  FileCheck,
  ShieldAlert,
} from 'lucide-react'
import {
  bnssChapters,
  bnssCoreSections,
  crpcToBnssMatrix,
  bnssScheduleForms,
  bnssInnovations,
  bnssQuiz,
} from '../data/bnssDetailedNotes.js'
import OfficialSourceLink from './OfficialSourceLink.jsx'

export default function BNSSGazetteViewer({ sourceLabel, sourceUrl, verifiedNote } = {}) {
  const [activeTab, setActiveTab] = useState('sections') // 'sections', 'matrix', 'reforms', 'forms', 'chapters', 'quiz'
  const [sectionSearch, setSectionSearch] = useState('')
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('all')
  const [expandedSection, setExpandedSection] = useState(null)

  // Matrix search
  const [matrixSearch, setMatrixSearch] = useState('')

  // Forms search
  const [formSearch, setFormSearch] = useState('')

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

  const quizScore = bnssQuiz.reduce((acc, q) => {
    if (quizRevealed[q.id] && quizAnswers[q.id] === q.correctAnswer) {
      return acc + 1
    }
    return acc
  }, 0)

  // Filtered Sections
  const filteredSections = useMemo(() => {
    const rawQ = sectionSearch.trim().toLowerCase()
    const strippedQ = rawQ
      .replace(/\b(bnss|bns|sec|section|act|2023)\b/gi, '')
      .trim()

    return bnssCoreSections.filter((sec) => {
      // Chapter filter
      if (selectedChapterFilter !== 'all') {
        if (!sec.chapter.toLowerCase().includes(selectedChapterFilter.toLowerCase())) {
          return false
        }
      }

      if (!rawQ) return true

      // If user typed broad query like "bnss", show all
      if (['bnss', 'bnss 2023', 'bnss section', 'bnss sections', 'crpc', 'nagarik'].includes(rawQ)) {
        return true
      }

      const matchNum = sec.section.toLowerCase().includes(rawQ) || (strippedQ && sec.section.toLowerCase().includes(strippedQ))
      const matchTitle = sec.title.toLowerCase().includes(rawQ) || (strippedQ && sec.title.toLowerCase().includes(strippedQ))
      const matchDesc = sec.description.toLowerCase().includes(rawQ) || (strippedQ && sec.description.toLowerCase().includes(strippedQ))
      const matchCrpc = sec.crpcEquivalent.toLowerCase().includes(rawQ) || (strippedQ && sec.crpcEquivalent.toLowerCase().includes(strippedQ))
      const matchReforms = sec.keyReforms.toLowerCase().includes(rawQ)
      const matchTags = sec.tags.some((t) => t.toLowerCase().includes(rawQ) || (strippedQ && t.toLowerCase().includes(strippedQ)))

      return matchNum || matchTitle || matchDesc || matchCrpc || matchReforms || matchTags
    })
  }, [sectionSearch, selectedChapterFilter])

  // Dynamic chapter options based on available sections
  const dynamicChapterOptions = useMemo(() => {
    const map = new Map()
    bnssCoreSections.forEach((s) => {
      const chKey = s.chapter.split(':')[0].trim()
      const count = map.get(chKey) || 0
      map.set(chKey, count + 1)
    })
    return Array.from(map.entries()).map(([chKey, count]) => ({
      key: chKey,
      count,
    }))
  }, [])

  // Filtered Matrix
  const filteredMatrix = useMemo(() => {
    if (!matrixSearch.trim()) return crpcToBnssMatrix
    const q = matrixSearch.toLowerCase().trim()
    return crpcToBnssMatrix.filter(
      (m) =>
        m.oldCrpc.toLowerCase().includes(q) ||
        m.newBnss.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.changeSummary.toLowerCase().includes(q)
    )
  }, [matrixSearch])

  // Filtered Statutory Forms
  const filteredForms = useMemo(() => {
    if (!formSearch.trim()) return bnssScheduleForms
    const q = formSearch.toLowerCase().trim()
    return bnssScheduleForms.filter(
      (f) =>
        f.formNo.toString().toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.section.toLowerCase().includes(q) ||
        f.purpose.toLowerCase().includes(q)
    )
  }, [formSearch])

  return (
    <div id="bnss-gazette-viewer" className="space-y-8">
      {/* Top Banner with Statutory Authority */}
      <div className="rounded-md border border-navy p-6 sm:p-8 text-white bg-navy">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brass/15 border border-brass/30 px-3 py-1 text-xs font-semibold text-brass-light">
              Official Criminal Procedure Code • Enacted 2023 • In Force 1 July 2024
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Bharatiya Nagarik Suraksha Sanhita, 2023
            </h2>
            <p className="max-w-2xl text-paper/70 text-sm sm:text-base leading-relaxed">
              Replacing the Code of Criminal Procedure, 1973 (CrPC), the BNSS modernizes Indian criminal justice with 533 Clauses across 39 Chapters. It institutionalizes Zero FIR, electronic reporting, mandatory crime-scene forensic collection (Sec 176(3)), videographed searches (Sec 105), fast-track trials, and trial in absentia of absconding proclaimed offenders (Sec 356).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 min-w-[280px]">
            <div className="rounded-md border border-white/15 bg-white/5 p-3 text-center">
              <div className="font-mono text-2xl font-semibold text-brass-light">533</div>
              <div className="text-xs text-paper/60">Clauses</div>
            </div>
            <div className="rounded-md border border-white/15 bg-white/5 p-3 text-center">
              <div className="font-mono text-2xl font-semibold text-brass-light">39</div>
              <div className="text-xs text-paper/60">Chapters</div>
            </div>
            <div className="rounded-md border border-white/15 bg-white/5 p-3 text-center">
              <div className="font-mono text-2xl font-semibold text-brass-light">56</div>
              <div className="text-xs text-paper/60">Statutory Forms</div>
            </div>
            <div className="rounded-md border border-white/15 bg-white/5 p-3 text-center">
              <div className="font-mono text-2xl font-semibold text-brass-light">1973</div>
              <div className="text-xs text-paper/60">CrPC Repealed</div>
            </div>
          </div>
        </div>

        {/* Quick Statutory Reference Strip */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-paper/70">
          <span className="flex items-center gap-1.5">
            <Landmark size={14} className="text-brass-light" /> <strong>Act No.</strong> 46 of 2023
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-brass-light" /> <strong>Effective Date:</strong> 1 July 2024
          </span>
          <span className="flex items-center gap-1.5">
            <Scale size={14} className="text-brass-light" /> <strong>Schedules:</strong> First (Classification) &amp; Second (56 Forms)
          </span>
          {sourceLabel && (
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <strong>Source:</strong>
              {sourceUrl ? (
                <OfficialSourceLink
                  url={sourceUrl}
                  label={sourceLabel}
                  className="text-brass-light hover:text-white"
                />
              ) : (
                <span>{sourceLabel}</span>
              )}
              {verifiedNote && <span className="text-paper/50">· verified {verifiedNote}</span>}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div role="tablist" aria-label="BNSS Gazette Sections" className="border-b border-navy/15 flex flex-wrap gap-1 sm:gap-2">
        {[
          { id: 'sections', label: 'Codified Sections & Clauses', icon: FileText, count: bnssCoreSections.length },
          { id: 'matrix', label: 'CrPC to BNSS Matrix', icon: Scale, count: crpcToBnssMatrix.length },
          { id: 'reforms', label: 'Key Innovations', icon: Award, count: bnssInnovations.length },
          { id: 'forms', label: '56 Statutory Forms', icon: FileCheck, count: bnssScheduleForms.length },
          { id: 'chapters', label: 'All 39 Chapters', icon: Layers, count: 39 },
          { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass min-h-[44px] ${
                isActive
                  ? 'border-navy text-navy bg-navy/5'
                  : 'border-transparent text-ink/75 hover:text-navy hover:border-navy/30'
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive ? 'bg-navy text-white' : 'bg-paper-dim text-ink/80'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* TAB 1: CODIFIED SECTIONS & CLAUSES */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* Controls: Search & Chapter filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <label htmlFor="bnss-section-search" className="sr-only">
                Search BNSS section, Zero FIR, bail, remand, or forensics
              </label>
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/60" aria-hidden="true" />
              <input
                id="bnss-section-search"
                type="text"
                value={sectionSearch}
                onChange={(e) => setSectionSearch(e.target.value)}
                placeholder="Search BNSS section (e.g. 173, 176, Zero FIR, bail, remand, forensics)..."
                className="w-full rounded-md border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink/60 focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy min-h-[42px]"
              />
              {sectionSearch && (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => setSectionSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs font-bold text-ink/60 hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="bnss-chapter-filter" className="sr-only">
                Filter by BNSS Chapter
              </label>
              <select
                id="bnss-chapter-filter"
                value={selectedChapterFilter}
                onChange={(e) => setSelectedChapterFilter(e.target.value)}
                className="rounded-md border border-navy/20 bg-white px-3 py-2.5 text-xs font-medium text-ink focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy min-h-[42px]"
              >
                <option value="all">All Chapters ({bnssCoreSections.length} sections)</option>
                {dynamicChapterOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.key} ({opt.count} sections)
                  </option>
                ))}
              </select>

              {(sectionSearch || selectedChapterFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSectionSearch('')
                    setSelectedChapterFilter('all')
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-oxblood hover:underline px-2 py-1 min-h-[42px]"
                >
                  <RotateCcw size={12} aria-hidden="true" /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-ink/70">
            <span>
              Showing <strong>{filteredSections.length}</strong> of {bnssCoreSections.length} codified statutory sections
            </span>
            <span className="text-[11px] text-ink/50">Click any section to expand full statutory breakdown</span>
          </div>

          {/* Codified Sections — continuous document-style list */}
          {filteredSections.length > 0 ? (
            <div className="divide-y divide-border border-y border-border">
              {filteredSections.map((item) => {
                const isExpanded = expandedSection === item.section
                const secNum = item.section.replace(/[^0-9]/g, '')
                return (
                  <div key={item.section} id={`sec-${secNum}`} className="py-5 scroll-mt-24 transition-colors">
                    <div
                      className="cursor-pointer select-none"
                      onClick={() => setExpandedSection(isExpanded ? null : item.section)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-semibold text-navy">
                              {item.section}
                            </span>
                            <span className="text-[11px] font-semibold text-oxblood/90">
                              Old: {item.crpcEquivalent}
                            </span>
                          </div>
                          <h3 className="font-display text-base font-semibold text-navy leading-snug pt-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-ink/60">{item.chapter}</p>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 p-1.5 text-navy/60 hover:text-navy transition-colors"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Key reform — inline, not a boxed callout */}
                      <p className="mt-3 text-xs text-ink/75 border-l-2 border-border pl-3 leading-relaxed">
                        <strong className="text-navy">Key Reform:</strong> {item.keyReforms}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-ink/55"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3.5 border-t border-border pt-4 text-xs text-ink/85">
                        <div>
                          <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-1">
                            Statutory Substance &amp; Procedure:
                          </h4>
                          <p className="leading-relaxed text-ink/80">{item.description}</p>
                        </div>

                        {item.specialSafeguards && item.specialSafeguards.length > 0 && (
                          <div className="border-l-2 border-brass/50 pl-3">
                            <h4 className="font-semibold text-brass-dark flex items-center gap-1.5">
                              <ShieldAlert size={14} className="text-brass-dark" /> Mandatory Safeguards &amp; Provisos:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-ink/80 mt-1.5">
                              {item.specialSafeguards.map((sg, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  {sg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-border text-[11px] text-ink/70">
                          <span>
                            <strong>Prescribed Timeline:</strong> {item.timeline}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-navy/20 bg-paper-dim p-8 text-center space-y-3">
              <Search size={32} className="mx-auto text-ink/40" />
              <h3 className="font-display text-base font-semibold text-navy">No matching BNSS sections found</h3>
              <p className="text-xs text-ink/65 max-w-md mx-auto">
                No sections matched "{sectionSearch}". Try common terms like <strong>173</strong> (Zero FIR),{' '}
                <strong>176</strong> (forensics), <strong>35</strong> (arrest), <strong>481</strong> (undertrial bail), or{' '}
                <strong>356</strong> (in absentia).
              </p>
              <button
                onClick={() => {
                  setSectionSearch('')
                  setSelectedChapterFilter('all')
                }}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy/90"
              >
                <RotateCcw size={13} /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CrPC TO BNSS CONVERSION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={matrixSearch}
                onChange={(e) => setMatrixSearch(e.target.value)}
                placeholder="Search matrix (e.g. 154, 167, bail, arrest, maintenance, remand)..."
                className="w-full rounded-md border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
              />
              {matrixSearch && (
                <button
                  onClick={() => setMatrixSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/40 hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="text-xs text-ink/70">
              Showing <strong>{filteredMatrix.length}</strong> statutory correspondences
            </span>
          </div>

          <div className="overflow-x-auto rounded-md border border-navy/15 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="py-3 px-4 font-semibold w-28">Old CrPC 1973</th>
                  <th className="py-3 px-4 font-semibold w-28">New BNSS 2023</th>
                  <th className="py-3 px-4 font-semibold w-48">Procedural Subject</th>
                  <th className="py-3 px-4 font-semibold">Transformative Modification &amp; Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-paper-dim transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-oxblood whitespace-nowrap">
                      {row.oldCrpc}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-navy whitespace-nowrap bg-navy/5">
                      {row.newBnss}
                    </td>
                    <td className="py-3 px-4 font-semibold text-navy">{row.subject}</td>
                    <td className="py-3 px-4 text-ink/80 leading-relaxed">{row.changeSummary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KEY INNOVATIONS */}
      {activeTab === 'reforms' && (
        <div className="space-y-6">
          <div className="rounded-md border border-navy/15 bg-paper-dim p-5">
            <h3 className="font-display text-lg font-bold text-navy">Transformative Pillars of BNSS 2023</h3>
            <p className="text-xs text-ink/70 mt-1">
              The Bharatiya Nagarik Suraksha Sanhita incorporates 8 major shifts from colonial-era criminal procedure to modern, rights-guaranteed, technology-driven justice administration.
            </p>
          </div>

          <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {bnssInnovations.map((item, idx) => (
              <div key={idx} className="space-y-2 lg:px-5 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-navy">
                    {item.clause}
                  </span>
                  <span className="text-[10px] font-semibold text-brass-dark">
                    Reform #{idx + 1}
                  </span>
                </div>
                <h4 className="font-display text-sm font-semibold text-navy leading-snug">{item.title}</h4>
                <p className="text-xs text-ink/75 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 56 STATUTORY FORMS */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={formSearch}
                onChange={(e) => setFormSearch(e.target.value)}
                placeholder="Search 56 statutory forms (e.g. Form 1, arrest warrant, summons, bail bond, attachment)..."
                className="w-full rounded-md border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
              />
              {formSearch && (
                <button
                  onClick={() => setFormSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/40 hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs text-ink/70">
              Showing <strong>{filteredForms.length}</strong> of 56 forms under Second Schedule (Section 524)
            </div>
          </div>

          <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-border">
            {filteredForms.map((f) => (
              <div key={f.formNo} className="space-y-1.5 border-b border-border pb-4 lg:border-b-0 lg:px-5 lg:pb-0 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-navy">
                    FORM No. {f.formNo}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-ink/55">
                    {f.section}
                  </span>
                </div>
                <h4 className="font-display text-sm font-semibold text-navy leading-snug">{f.title}</h4>
                <p className="text-xs text-ink/70 leading-relaxed">{f.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ALL 39 CHAPTERS OVERVIEW */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          <div className="rounded-md border border-navy/15 bg-paper-dim p-5">
            <h3 className="font-display text-lg font-bold text-navy">Complete Arrangement of Clauses (1 to 533)</h3>
            <p className="text-xs text-ink/70 mt-1">
              Official 39-Chapter structure enacted in the Bharatiya Nagarik Suraksha Sanhita, 2023.
            </p>
          </div>

          <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-border">
            {bnssChapters.map((ch, idx) => (
              <div key={idx} className="space-y-1.5 border-b border-border pb-4 lg:border-b-0 lg:px-5 lg:pb-0 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-navy">
                    {ch.number}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-brass-dark">
                    {ch.clauses}
                  </span>
                </div>
                <h4 className="font-display text-sm font-semibold text-navy leading-snug">{ch.title}</h4>
                <p className="text-xs text-ink/70 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: KNOWLEDGE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between rounded-md border border-navy/15 bg-paper-dim p-4">
            <div>
              <h3 className="font-display text-base font-bold text-navy">BNSS 2023 Procedural Assessment</h3>
              <p className="text-xs text-ink/65">Test your comprehension of India's new criminal procedure code.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-ink/60">Score</div>
                <div className="font-mono text-lg font-bold text-navy">
                  {quizScore} / {bnssQuiz.length}
                </div>
              </div>
              <button
                onClick={handleQuizReset}
                className="rounded-lg border border-navy/20 p-2 text-navy hover:bg-navy/10 transition-colors"
                title="Reset Quiz"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-border border-t border-border">
            {bnssQuiz.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id]
              const isRevealed = quizRevealed[q.id]
              const isCorrect = selectedOpt === q.correctAnswer

              return (
                <div key={q.id} className="py-6 first:pt-6 space-y-4">
                  <h4 className="font-display text-sm font-semibold text-navy leading-snug">
                    {idx + 1}. {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx
                      let btnStyle = 'border-border hover:bg-paper-dim text-ink/80'

                      if (isRevealed) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold'
                        } else if (isOptionSelected) {
                          btnStyle = 'border-oxblood bg-oxblood-faint text-oxblood-dark line-through'
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-navy bg-navy/10 text-navy font-semibold'
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isRevealed}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          className={`w-full text-left rounded-md border p-3 text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isRevealed && optIdx === q.correctAnswer && (
                            <CheckCircle size={16} className="text-emerald-600 shrink-0 ml-2" />
                          )}
                          {isRevealed && isOptionSelected && optIdx !== q.correctAnswer && (
                            <XCircle size={16} className="text-oxblood shrink-0 ml-2" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {selectedOpt !== undefined && !isRevealed && (
                    <button
                      onClick={() => handleQuizCheck(q.id)}
                      className="rounded-md bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                    >
                      Check Answer
                    </button>
                  )}

                  {isRevealed && (
                    <p
                      className={`border-l-2 pl-3 text-xs leading-relaxed ${
                        isCorrect ? 'border-emerald-500 text-emerald-900' : 'border-brass text-brass-dark'
                      }`}
                    >
                      <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
