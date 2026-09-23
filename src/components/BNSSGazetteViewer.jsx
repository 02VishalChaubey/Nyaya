import React, { useState, useMemo } from 'react'
import {
  FileText,
  Scale,
  ShieldCheck,
  Search,
  Landmark,
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Clock,
  Video,
  Monitor,
  Unlock,
  UserX,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Info,
  ExternalLink,
} from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import { fetchBnssData } from '../api/client.js'
import {
  bnssMeta as fallbackMeta,
  bnssChapters as fallbackChapters,
  bnssCoreSections as fallbackSections,
  crpcToBnssMatrix as fallbackMatrix,
  bnssScheduleForms as fallbackForms,
  bnssInnovations as fallbackInnovations,
  bnssQuiz as fallbackQuiz,
} from '../data/bnssDetailedNotes.js'

export default function BNSSGazetteViewer() {
  const { data: bnssData } = useApi(fetchBnssData, [], null)

  const bnssMeta = bnssData?.meta || fallbackMeta
  const bnssChapters = bnssData?.chapters || fallbackChapters
  const bnssCoreSections = bnssData?.sections || fallbackSections
  const crpcToBnssMatrix = bnssData?.matrix || fallbackMatrix
  const bnssScheduleForms = bnssData?.forms || fallbackForms
  const bnssInnovations = bnssData?.innovations || fallbackInnovations
  const bnssQuiz = bnssData?.quiz || fallbackQuiz

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
      <div className="relative overflow-hidden rounded-2xl border border-navy/15 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles size={14} /> Official Criminal Procedure Code • Enacted 2023 • In Force 1 July 2024
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Bharatiya Nagarik Suraksha Sanhita, 2023
            </h2>
            <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
              Replacing the Code of Criminal Procedure, 1973 (CrPC), the BNSS modernizes Indian criminal justice with 533 Clauses across 39 Chapters. It institutionalizes Zero FIR, electronic reporting, mandatory crime-scene forensic collection (Sec 176(3)), videographed searches (Sec 105), fast-track trials, and trial in absentia of absconding proclaimed offenders (Sec 356).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 min-w-[280px]">
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-cyan-400">533</div>
              <div className="text-xs text-slate-400">Clauses</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-amber-400">39</div>
              <div className="text-xs text-slate-400">Chapters</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-emerald-400">56</div>
              <div className="text-xs text-slate-400">Statutory Forms</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-center">
              <div className="font-mono text-2xl font-bold text-indigo-400">1973</div>
              <div className="text-xs text-slate-400">CrPC Repealed</div>
            </div>
          </div>
        </div>

        {/* Quick Statutory Reference Strip */}
        <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Landmark size={14} className="text-cyan-400" /> <strong>Act No.</strong> 46 of 2023 (Bill 122 of 2023)
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-amber-400" /> <strong>Effective Date:</strong> 1 July 2024
          </span>
          <span className="flex items-center gap-1.5">
            <Scale size={14} className="text-emerald-400" /> <strong>Schedules:</strong> First (Classification) &amp; Second (56 Forms)
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-navy/15 flex flex-wrap gap-1 sm:gap-2">
        {[
          { id: 'sections', label: 'Codified Sections & Clauses', icon: FileText, count: bnssCoreSections.length },
          { id: 'matrix', label: 'CrPC to BNSS Matrix', icon: Scale, count: crpcToBnssMatrix.length },
          { id: 'reforms', label: 'Key Innovations', icon: Sparkles, count: bnssInnovations.length },
          { id: 'forms', label: '56 Statutory Forms', icon: FileCheck, count: bnssScheduleForms.length },
          { id: 'chapters', label: 'All 39 Chapters', icon: Layers, count: 39 },
          { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                isActive
                  ? 'border-navy text-navy bg-navy/5'
                  : 'border-transparent text-ink/65 hover:text-navy hover:border-navy/30'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive ? 'bg-navy text-white' : 'bg-slate-200 text-slate-700'
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
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={sectionSearch}
                onChange={(e) => setSectionSearch(e.target.value)}
                placeholder="Search BNSS section (e.g. 173, 176, Zero FIR, bail, remand, forensics)..."
                className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
              />
              {sectionSearch && (
                <button
                  onClick={() => setSectionSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/40 hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedChapterFilter}
                onChange={(e) => setSelectedChapterFilter(e.target.value)}
                className="rounded-xl border border-navy/20 bg-white px-3 py-2.5 text-xs font-medium text-ink focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
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
                  onClick={() => {
                    setSectionSearch('')
                    setSelectedChapterFilter('all')
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-oxblood hover:underline px-2 py-1"
                >
                  <RotateCcw size={12} /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-ink/70">
            <span>
              Showing <strong>{filteredSections.length}</strong> of {bnssCoreSections.length} codified statutory sections
            </span>
            <span className="text-[11px] text-ink/50">Click any card to expand full statutory breakdown</span>
          </div>

          {/* Section Cards Grid */}
          {filteredSections.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredSections.map((item) => {
                const isExpanded = expandedSection === item.section
                return (
                  <div
                    key={item.section}
                    className={`rounded-xl border transition-all duration-200 bg-white ${
                      isExpanded
                        ? 'border-navy ring-1 ring-navy shadow-md'
                        : 'border-navy/15 hover:border-navy/35 hover:shadow-xs'
                    }`}
                  >
                    <div
                      className="p-5 cursor-pointer select-none"
                      onClick={() => setExpandedSection(isExpanded ? null : item.section)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-navy bg-navy/10 px-2.5 py-0.5 rounded-md">
                              {item.section}
                            </span>
                            <span className="text-[11px] font-semibold text-oxblood/90 bg-oxblood/10 px-2 py-0.5 rounded-md">
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
                          className="rounded-lg p-1.5 text-navy/60 hover:bg-navy/10 transition-colors"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Brief reform pill */}
                      <p className="mt-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-lg p-2 leading-relaxed">
                        <strong>Key Reform:</strong> {item.keyReforms}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-navy/10 space-y-3.5 text-xs text-ink/85 bg-slate-50/50 rounded-b-xl">
                        <div>
                          <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-1">
                            Statutory Substance &amp; Procedure:
                          </h4>
                          <p className="leading-relaxed text-ink/80">{item.description}</p>
                        </div>

                        {item.specialSafeguards && item.specialSafeguards.length > 0 && (
                          <div className="rounded-lg bg-amber-50/80 border border-amber-200/80 p-3 space-y-1.5">
                            <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                              <ShieldAlert size={14} className="text-amber-700" /> Mandatory Safeguards &amp; Provisos:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-950">
                              {item.specialSafeguards.map((sg, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  {sg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] text-ink/70">
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
            <div className="rounded-2xl border border-dashed border-navy/20 bg-slate-50/50 p-8 text-center space-y-3">
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
                className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
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

          <div className="overflow-x-auto rounded-xl border border-navy/15 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0F172A] text-white">
                  <th className="py-3 px-4 font-semibold w-28">Old CrPC 1973</th>
                  <th className="py-3 px-4 font-semibold w-28">New BNSS 2023</th>
                  <th className="py-3 px-4 font-semibold w-48">Procedural Subject</th>
                  <th className="py-3 px-4 font-semibold">Transformative Modification &amp; Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-oxblood whitespace-nowrap">
                      {row.oldCrpc}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-navy whitespace-nowrap bg-navy/5">
                      {row.newBnss}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.subject}</td>
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
          <div className="rounded-xl border border-navy/15 bg-slate-50/70 p-5">
            <h3 className="font-display text-lg font-bold text-navy">Transformative Pillars of BNSS 2023</h3>
            <p className="text-xs text-ink/70 mt-1">
              The Bharatiya Nagarik Suraksha Sanhita incorporates 8 major shifts from colonial-era criminal procedure to modern, rights-guaranteed, technology-driven justice administration.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bnssInnovations.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-navy/15 bg-white p-5 space-y-2.5 shadow-xs hover:border-navy/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-navy/10 px-2 py-0.5 font-mono text-xs font-bold text-navy">
                    {item.clause}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Reform #{idx + 1}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">{item.title}</h4>
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
                className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-10 pr-9 text-sm focus:border-navy focus:outline-hidden focus:ring-1 focus:ring-navy"
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((f) => (
              <div
                key={f.formNo}
                className="rounded-xl border border-navy/15 bg-white p-4 space-y-2 hover:border-navy/35 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white bg-[#0F172A] px-2.5 py-0.5 rounded-md">
                    FORM No. {f.formNo}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-navy bg-navy/10 px-2 py-0.5 rounded-md">
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
          <div className="rounded-xl border border-navy/15 bg-slate-50/70 p-5">
            <h3 className="font-display text-lg font-bold text-navy">Complete Arrangement of Clauses (1 to 533)</h3>
            <p className="text-xs text-ink/70 mt-1">
              Official 39-Chapter structure enacted in the Bharatiya Nagarik Suraksha Sanhita, 2023.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bnssChapters.map((ch, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-navy/15 bg-white p-4 space-y-2 hover:border-navy/35 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-navy bg-navy/10 px-2 py-0.5 rounded-md">
                    {ch.number}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
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
          <div className="flex items-center justify-between rounded-xl border border-navy/15 bg-slate-50 p-4">
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

          <div className="space-y-4">
            {bnssQuiz.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id]
              const isRevealed = quizRevealed[q.id]
              const isCorrect = selectedOpt === q.correctAnswer

              return (
                <div key={q.id} className="rounded-xl border border-navy/15 bg-white p-5 space-y-4 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-sm font-semibold text-navy leading-snug">
                      {idx + 1}. {q.question}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx
                      let btnStyle = 'border-slate-200 hover:bg-slate-50 text-ink/80'

                      if (isRevealed) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold'
                        } else if (isOptionSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through'
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-navy bg-navy/10 text-navy font-semibold'
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isRevealed}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          className={`w-full text-left rounded-lg border p-3 text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isRevealed && optIdx === q.correctAnswer && (
                            <CheckCircle size={16} className="text-emerald-600 shrink-0 ml-2" />
                          )}
                          {isRevealed && isOptionSelected && optIdx !== q.correctAnswer && (
                            <XCircle size={16} className="text-rose-600 shrink-0 ml-2" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {selectedOpt !== undefined && !isRevealed && (
                    <button
                      onClick={() => handleQuizCheck(q.id)}
                      className="rounded-lg bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                    >
                      Check Answer
                    </button>
                  )}

                  {isRevealed && (
                    <div
                      className={`rounded-lg p-3 text-xs leading-relaxed ${
                        isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-950'
                      }`}
                    >
                      <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                    </div>
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
