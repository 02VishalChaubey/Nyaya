import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Scale,
  BookMarked,
  FileText,
  Library,
  BookOpen,
  ArrowUpRight,
  Clock,
  Trash2,
  X,
  Compass,
  ShieldCheck,
  ChevronRight,
  ArrowLeftRight,
} from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { useApi } from '../hooks/useApi.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { searchAll } from '../api/client.js'
import { executeUnifiedSearch } from '../utils/legalSearchEngine.js'
import {
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
} from '../utils/recentSearches.js'

// Curated high-relevance legal research search suggestions
const LEGAL_SUGGESTIONS = [
  { label: 'right to privacy', desc: 'Constitutional guarantee under Article 21' },
  { label: 'section 103', desc: 'BNS 2023 Murder & Mob Lynching' },
  { label: 'what is bail', desc: 'Legal definition & BNSS 481/484 provisions' },
  { label: 'article 21', desc: 'Protection of Life & Personal Liberty' },
  { label: 'zero fir', desc: 'BNSS Section 173 jurisdiction-free filing' },
  { label: 'anticipatory bail', desc: 'BNSS Section 484 pre-arrest relief' },
  { label: 'section 302', desc: 'Old IPC murder mapped to BNS 103' },
  { label: 'police arrest rights', desc: '24-hour rule & D.K. Basu memo' },
  { label: 'habeas corpus', desc: 'Prerogative writ under Article 32 & 226' },
  { label: 'cyber fraud 1930', desc: 'National cybercrime helpline SOP' },
]

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'laws' | 'sections' | 'constitution' | 'cases' | 'terms' | 'guides'
  const [recentList, setRecentList] = useState([])
  const searchInputRef = useRef(null)
  const { t, isHindi } = useLanguage()

  // Load recent searches on mount
  useEffect(() => {
    setRecentList(getRecentSearches())
  }, [])

  // Sync URL query parameter when query changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    if (urlQuery !== query) {
      setQuery(urlQuery)
    }
  }, [searchParams])

  // Save to recent searches when a meaningful query is executed
  useEffect(() => {
    if (query && query.trim().length >= 2) {
      const updated = saveRecentSearch(query.trim())
      setRecentList(updated)
    }
  }, [query])

  // Handle global "/" keyboard shortcut to focus search input
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        const input = document.getElementById('site-search-input')
        input?.focus()
        input?.select()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleExecuteSearch(newQuery) {
    const trimmed = (newQuery || '').trim()
    setQuery(trimmed)
    setActiveTab('all')
    const params = new URLSearchParams()
    if (trimmed) params.set('q', trimmed)
    setSearchParams(params)
  }

  function handleClearHistory() {
    clearRecentSearches()
    setRecentList([])
  }

  function handleRemoveRecent(item, e) {
    e.stopPropagation()
    const updated = removeRecentSearch(item)
    setRecentList(updated)
  }

  // Unified Search API with identical local fallback engine
  const fallbackResults = useMemo(() => executeUnifiedSearch(query), [query])

  const {
    data: rawData,
    loading,
    usingFallback,
  } = useApi(
    () => (query ? searchAll(query) : Promise.resolve(fallbackResults)),
    [query],
    fallbackResults
  )

  // Normalize results whether returned from API or fallback engine
  const searchResults = useMemo(() => {
    if (!query) {
      return {
        query: '',
        totalCount: 0,
        groups: {
          laws: [],
          sections: [],
          comparisons: [],
          constitution: [],
          cases: [],
          terms: [],
          guides: [],
        },
      }
    }

    const payload = rawData || fallbackResults
    // If backend returns groups object:
    if (payload.groups) {
      return payload
    }
    // If backend returned classic flat arrays, normalize to groups:
    return {
      query,
      totalCount:
        (payload.laws?.length || 0) +
        (payload.sections?.length || 0) +
        (payload.comparisons?.length || 0) +
        (payload.rights?.length || 0) +
        (payload.terms?.length || 0) +
        (payload.cases?.length || 0) +
        (payload.guides?.length || 0),
      groups: {
        laws: payload.laws || [],
        sections: payload.sections || [],
        comparisons: payload.comparisons || [],
        constitution: payload.rights || [],
        cases: payload.cases || [],
        terms: payload.terms || [],
        guides: payload.guides || [],
      },
    }
  }, [rawData, fallbackResults, query])

  const groups = searchResults.groups || {
    laws: [],
    sections: [],
    comparisons: [],
    constitution: [],
    cases: [],
    terms: [],
    guides: [],
  }

  const counts = {
    all: searchResults.totalCount || 0,
    laws: groups.laws?.length || 0,
    sections: groups.sections?.length || 0,
    comparisons: groups.comparisons?.length || 0,
    constitution: groups.constitution?.length || 0,
    cases: groups.cases?.length || 0,
    terms: groups.terms?.length || 0,
    guides: groups.guides?.length || 0,
  }

  const hasAnyResults = counts.all > 0

  return (
    <div className="min-h-screen bg-page text-ink pb-20">
      {/* Research Header Banner */}
      <header className="border-b border-border bg-paper pt-10 pb-8 sm:pt-14 sm:pb-12 shadow-xs">
        <div className="container-content">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono font-medium tracking-wider uppercase text-brass-dark">
                {isHindi ? 'कानूनी संदर्भ एवं शोध (Legal Research)' : 'Legal Reference & Research'}
              </span>
              <span className="text-xs text-ink/30 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs text-ink/60 hidden sm:inline">
                {isHindi
                  ? 'भारतीय संहिताएं · मौलिक अधिकार · सर्वोच्च न्यायालय निर्णय'
                  : 'Bharatiya Codes · Fundamental Rights · Supreme Court Case Law'}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-navy tracking-tight sm:text-3xl md:text-4xl">
              {isHindi ? 'भारतीय कानून, धाराएं एवं संविधान खोजें' : 'Search Indian Law, Sections & Constitution'}
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink/75">
              {isHindi
                ? 'BNS 2023, BNSS 2023, संवैधानिक अनुच्छेदों, न्यायिक नज़ीरों और वैधानिक परिभाषाओं में आधिकारिक खोज।'
                : 'Authoritative retrieval across BNS 2023, BNSS 2023, Constitutional Articles, Supreme Court precedents, and statutory definitions.'}
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="mt-6 max-w-3xl">
            <SearchBar
              size="lg"
              placeholder={
                isHindi
                  ? 'कानून, धारा संख्या (जैसे 103, 302, 420), "जमानत क्या है", अनुच्छेद 21 खोजें...'
                  : 'Try "right to privacy", "section 103", "what is bail", or "sec 302"...'
              }
              initialValue={query}
              value={query}
              onChange={setQuery}
              onSearch={handleExecuteSearch}
              onClear={() => handleExecuteSearch('')}
              showShortcut
              autoFocus
            />

            {/* Sub-bar hint & status */}
            <div className="mt-2.5 flex items-center justify-between text-xs text-ink/60 px-1">
              <div className="flex items-center gap-2">
                {query ? (
                  <span>
                    {isHindi ? (
                      <>
                        कुल <strong className="text-navy font-semibold">{counts.all}</strong> परिणाम मिले
                      </>
                    ) : (
                      <>
                        Found <strong className="text-navy font-semibold">{counts.all}</strong> result
                        {counts.all === 1 ? '' : 's'} across{' '}
                        {[
                          counts.laws > 0 && 'Laws',
                          counts.sections > 0 && 'Sections',
                          counts.constitution > 0 && 'Constitution',
                          counts.cases > 0 && 'Cases',
                          counts.terms > 0 && 'Terms',
                          counts.guides > 0 && 'Guides',
                        ]
                          .filter(Boolean)
                          .join(', ') || 'categories'}
                      </>
                    )}
                  </span>
                ) : (
                  <span>
                    {isHindi ? (
                      <>खोज के लिए कहीं भी <kbd className="font-mono text-[11px] bg-paper-dim border border-border px-1 rounded text-ink/70">/</kbd> दबाएं</>
                    ) : (
                      <>Press <kbd className="font-mono text-[11px] bg-paper-dim border border-border px-1 rounded text-ink/70">/</kbd> anywhere to search</>
                    )}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-tertiary">
                <ShieldCheck size={14} />
                <span>{isHindi ? 'निश्चित वैधानिक अनुक्रमण' : 'Deterministic statutory indexing'}</span>
              </div>
            </div>
          </div>

          {/* Suggested Legal Query Chips */}
          <div className="mt-5 max-w-4xl border-t border-border/70 pt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-navy/70 mb-2">
              <Compass size={14} className="text-brass-dark" />
              <span>{isHindi ? 'सुझाए गए कानूनी खोज शब्द:' : 'Suggested Legal Reference Queries:'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {LEGAL_SUGGESTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleExecuteSearch(item.label)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors text-left ${
                    query.toLowerCase() === item.label
                      ? 'bg-navy text-paper border-navy'
                      : 'bg-paper text-navy border-border hover:border-brass hover:bg-brass-faint/30'
                  }`}
                  title={item.desc}
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[10px] text-ink/45 ml-1.5 hidden md:inline">· {item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container-content py-8 sm:py-10">
        {usingFallback && query && <OfflineNotice className="mb-6" />}

        {/* Empty State: Show Recent Searches & Reference Guides */}
        {!query && (
          <div className="space-y-10 max-w-4xl">
            {/* Recent Searches (Privacy-Safe Local Storage) */}
            {recentList.length > 0 && (
              <section className="bg-paper border border-border rounded-md p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-navy/70" />
                    <h2 className="font-display text-base font-semibold text-navy">
                      {isHindi ? 'हाल की खोजें (Recent Searches)' : 'Recent Searches'}
                    </h2>
                    <span className="text-[11px] font-mono text-ink/40 ml-1">
                      {isHindi
                        ? '(ब्राउज़र में स्थानीय सुरक्षित · प्रसारित नहीं)'
                        : '(Stored locally in your browser · not transmitted)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="flex items-center gap-1 text-xs text-oxblood hover:underline transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>{isHindi ? 'इतिहास साफ़ करें' : 'Clear history'}</span>
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recentList.map((item) => (
                    <div
                      key={item}
                      className="group inline-flex items-center gap-1.5 rounded border border-border bg-page px-2.5 py-1.5 text-xs text-navy hover:border-brass hover:bg-paper transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => handleExecuteSearch(item)}
                        className="font-medium hover:text-brass-dark"
                      >
                        {item}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveRecent(item, e)}
                        className="text-ink/35 hover:text-oxblood transition-colors ml-0.5"
                        title="Remove from history"
                        aria-label={`Remove ${item} from search history`}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Legal Guide Cards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={17} className="text-brass-dark" />
                <h2 className="font-display text-lg font-semibold text-navy">
                  {isHindi ? 'प्रमुख कानूनी संदर्भ संसाधन' : 'Key Legal Reference Resources'}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <QuickLinkCard
                  to="/compare"
                  title="Compare Laws: IPC 1860 ↔ BNS 2023"
                  subtitle="Statutory Concordance Ledger"
                  desc="Verified section-by-section transition ledger, plain-language differences, and constitutional transition rules."
                />
                <QuickLinkCard
                  to="/laws/bns-2023"
                  title="Bharatiya Nyaya Sanhita, 2023"
                  subtitle="Act No. 45 of 2023 · BNS"
                  desc="Complete 358 sections, mob lynching provisions, community service, and IPC cross-reference."
                />
                <QuickLinkCard
                  to="/laws/bnss-2023"
                  title="Bharatiya Nagarik Suraksha Sanhita"
                  subtitle="Act No. 46 of 2023 · BNSS"
                  desc="Modern criminal procedure, Zero FIR, 24-hr detention rule, and 1/3rd undertrial bail relief."
                />
                <QuickLinkCard
                  to="/fundamental-rights"
                  title="Part III: Fundamental Rights"
                  subtitle="Articles 12–35 · Supreme Law"
                  desc="Constitutional guarantees of equality, freedom, personal liberty, privacy, and judicial writs."
                />
                <QuickLinkCard
                  to="/legal-terms"
                  title="Codified Legal Glossary"
                  subtitle="Over 50 Statutory Definitions"
                  desc="Plain-language definitions for bail, remand, plea bargaining, habeas corpus, and summons."
                />
                <QuickLinkCard
                  to="/laws/consumer-protection-2019"
                  title="Consumer Protection Act, 2019"
                  subtitle="e-Daakhil Redressal"
                  desc="Remedies against defective goods, online shopping fraud, deficiency of service, and refunds."
                />
                <QuickLinkCard
                  to="/sources-methodology"
                  title="Statutory Sources & Gazette Notes"
                  subtitle="Verified Legislative Materials"
                  desc="Official Gazette of India texts, Parliamentary bills, and Indian Kanoon / Supreme Court citations."
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {query && loading && (
          <LoadingState
            label={
              isHindi
                ? `"${query}" के लिए कानूनी प्रावधान खोजे जा रहे हैं...`
                : `Searching legal statutes for "${query}"...`
            }
          />
        )}

        {/* No Results Found */}
        {query && !loading && !hasAnyResults && (
          <div className="rounded-md border border-dashed border-border bg-paper p-10 text-center max-w-2xl mx-auto shadow-xs">
            <h3 className="font-display text-lg font-semibold text-navy">
              {isHindi
                ? `"${query}" के लिए कोई प्रत्यक्ष वैधानिक परिणाम नहीं मिला`
                : `No direct statutory results found for "${query}"`}
            </h3>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
              {isHindi ? (
                <>
                  वर्तनी जांचें, अधिनियम का संक्षिप्त नाम (जैसे <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">BNS</code>, <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">BNSS</code>, <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">IPC</code>) प्रयोग करें, या धारा संख्या (जैसे <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">धारा 103</code>) अथवा अनुच्छेद (जैसे <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">अनुच्छेद 21</code>) से खोजें।
                </>
              ) : (
                <>
                  Check spelling, try using the Act acronym (e.g., <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">BNS</code>, <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">BNSS</code>, <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">IPC</code>), or search by section number (e.g., <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">section 103</code>) or article (e.g., <code className="font-mono bg-paper-dim px-1 py-0.5 rounded text-navy">article 21</code>).
                </>
              )}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleExecuteSearch('right to privacy')}
                className="text-xs text-brass-dark hover:underline font-medium"
              >
                Search "right to privacy"
              </button>
              <span className="text-ink/30">·</span>
              <button
                type="button"
                onClick={() => handleExecuteSearch('section 103')}
                className="text-xs text-brass-dark hover:underline font-medium"
              >
                Search "section 103"
              </button>
              <span className="text-ink/30">·</span>
              <button
                type="button"
                onClick={() => handleExecuteSearch('what is bail')}
                className="text-xs text-brass-dark hover:underline font-medium"
              >
                Search "what is bail"
              </button>
            </div>
          </div>
        )}

        {/* Results Found: Grouped by Type */}
        {query && !loading && hasAnyResults && (
          <div className="space-y-8">
            {/* Filter Tabs by Type */}
            <div className="border-b border-border flex items-center gap-2 overflow-x-auto pb-px" role="tablist" aria-label="Search results categories">
              <TabButton
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                label={isHindi ? 'सभी परिणाम' : 'All Results'}
                count={counts.all}
              />
              {counts.laws > 0 && (
                <TabButton
                  active={activeTab === 'laws'}
                  onClick={() => setActiveTab('laws')}
                  label={isHindi ? 'अधिनियम (Acts)' : 'Laws'}
                  count={counts.laws}
                />
              )}
              {counts.sections > 0 && (
                <TabButton
                  active={activeTab === 'sections'}
                  onClick={() => setActiveTab('sections')}
                  label={isHindi ? 'धाराएं (Sections)' : 'Sections'}
                  count={counts.sections}
                />
              )}
              {counts.comparisons > 0 && (
                <TabButton
                  active={activeTab === 'comparisons'}
                  onClick={() => setActiveTab('comparisons')}
                  label={isHindi ? 'तुलनात्मक (IPC ↔ BNS)' : 'Concordance (IPC ↔ BNS)'}
                  count={counts.comparisons}
                />
              )}
              {counts.constitution > 0 && (
                <TabButton
                  active={activeTab === 'constitution'}
                  onClick={() => setActiveTab('constitution')}
                  label={isHindi ? 'संविधान (Constitution)' : 'Constitution'}
                  count={counts.constitution}
                />
              )}
              {counts.cases > 0 && (
                <TabButton
                  active={activeTab === 'cases'}
                  onClick={() => setActiveTab('cases')}
                  label={isHindi ? 'निर्णय (Cases)' : 'Cases'}
                  count={counts.cases}
                />
              )}
              {counts.terms > 0 && (
                <TabButton
                  active={activeTab === 'terms'}
                  onClick={() => setActiveTab('terms')}
                  label={isHindi ? 'शब्दावली (Glossary)' : 'Legal Terms'}
                  count={counts.terms}
                />
              )}
              {counts.guides > 0 && (
                <TabButton
                  active={activeTab === 'guides'}
                  onClick={() => setActiveTab('guides')}
                  label={isHindi ? 'नागरिक गाइड' : 'Guides'}
                  count={counts.guides}
                />
              )}
            </div>

            {/* Results Groups Container */}
            <div className="space-y-12">
              {/* GROUP 1: LAWS */}
              {(activeTab === 'all' || activeTab === 'laws') && groups.laws?.length > 0 && (
                <ResultGroup
                  icon={Library}
                  title={isHindi ? 'कानून व अधिनियम (Laws & Statutes)' : 'Laws & Statutes'}
                  count={groups.laws.length}
                  badge={isHindi ? 'संसदीय अधिनियम' : 'Acts & Codes'}
                >
                  {groups.laws.map((item) => (
                    <LegalResultCard key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {/* GROUP 2: SECTIONS */}
              {(activeTab === 'all' || activeTab === 'sections') && groups.sections?.length > 0 && (
                <ResultGroup
                  icon={FileText}
                  title={isHindi ? 'धाराएं व कानूनी प्रावधान (Sections)' : 'Sections & Provisions'}
                  count={groups.sections.length}
                  badge={isHindi ? 'वैधानिक धाराएं' : 'Statutory Clauses'}
                >
                  {groups.sections.map((item) => (
                    <LegalResultCard key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {/* GROUP: STATUTORY CONCORDANCE (IPC ↔ BNS) */}
              {(activeTab === 'all' || activeTab === 'comparisons') &&
                groups.comparisons?.length > 0 && (
                  <ResultGroup
                    icon={ArrowLeftRight}
                    title={isHindi ? 'कानूनों की तुलना: IPC 1860 ↔ BNS 2023' : 'Law Concordance: IPC 1860 ↔ BNS 2023'}
                    count={groups.comparisons.length}
                    badge={isHindi ? 'तुलनात्मक तालिका' : 'Concordance Ledger'}
                  >
                    {groups.comparisons.map((item) => (
                      <LegalResultCard key={item.id} item={item} />
                    ))}
                  </ResultGroup>
                )}

              {/* GROUP 3: CONSTITUTION */}
              {(activeTab === 'all' || activeTab === 'constitution') &&
                groups.constitution?.length > 0 && (
                  <ResultGroup
                    icon={Scale}
                    title={isHindi ? 'संविधान एवं मौलिक अधिकार (Part III)' : 'Constitution & Fundamental Rights'}
                    count={groups.constitution.length}
                    badge={isHindi ? 'संविधान का भाग III' : 'Part III of the Constitution'}
                  >
                    {groups.constitution.map((item) => (
                      <LegalResultCard key={item.id} item={item} />
                    ))}
                  </ResultGroup>
                )}

              {/* GROUP 4: CASES */}
              {(activeTab === 'all' || activeTab === 'cases') && groups.cases?.length > 0 && (
                <ResultGroup
                  icon={BookMarked}
                  title={isHindi ? 'सर्वोच्च न्यायालय के ऐतिहासिक निर्णय' : 'Case Law & Supreme Court Precedents'}
                  count={groups.cases.length}
                  badge={isHindi ? 'न्यायिक नज़ीरें' : 'Landmark Judgments'}
                >
                  {groups.cases.map((item) => (
                    <LegalResultCard key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {/* GROUP 5: LEGAL TERMS */}
              {(activeTab === 'all' || activeTab === 'terms') && groups.terms?.length > 0 && (
                <ResultGroup
                  icon={BookOpen}
                  title={isHindi ? 'कानूनी शब्दावली (Legal Glossary)' : 'Legal Terms & Glossary'}
                  count={groups.terms.length}
                  badge={isHindi ? 'वैधानिक परिभाषाएं' : 'Statutory Definitions'}
                >
                  {groups.terms.map((item) => (
                    <LegalResultCard key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {/* GROUP 6: GUIDES */}
              {(activeTab === 'all' || activeTab === 'guides') && groups.guides?.length > 0 && (
                <ResultGroup
                  icon={ChevronRight}
                  title={isHindi ? 'प्रक्रियात्मक नागरिक गाइड व SOPs' : 'Procedural Guides & Standard Operating Procedures'}
                  count={groups.guides.length}
                  badge={isHindi ? 'नागरिक SOPs' : 'Citizen SOPs'}
                >
                  {groups.guides.map((item) => (
                    <LegalResultCard key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Filter tab button with unboxed counter
 */
function TabButton({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass transition-all ${
        active
          ? 'border-navy text-navy font-semibold'
          : 'border-transparent text-ink/65 hover:text-navy hover:border-border'
      }`}
    >
      <span>{label}</span>
      <span
        className={`font-mono text-[11px] px-1.5 py-0.2 rounded ${
          active ? 'bg-navy/10 text-navy font-bold' : 'bg-paper-dim text-ink/50'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

/**
 * Section container for a category of legal results
 */
function ResultGroup({ icon: Icon, title, count, badge, children }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <Icon size={17} className="text-navy" aria-hidden="true" />
          <h2 className="font-display text-lg sm:text-xl font-semibold text-navy tracking-tight">
            {title}
          </h2>
          <span className="font-mono text-xs text-ink/50">({count})</span>
        </div>
        {badge && <span className="text-xs font-mono text-ink/65 bg-page px-2 py-0.5 rounded-xs border border-border/80 self-start sm:self-auto">{badge}</span>}
      </div>
      <div className="grid gap-3.5 sm:gap-4">{children}</div>
    </section>
  )
}

/**
 * Authoritative Legal Result Card
 * Strictly renders: Title, Type, Short Explanation, and Why It Matches.
 */
function LegalResultCard({ item }) {
  const isConversion = item.badge === 'IPC → BNS' || item.badge === 'CrPC → BNSS'

  return (
    <article
      className={`rounded-xs border bg-paper p-5 sm:p-6 transition-all hover:border-navy/50 shadow-2xs ${
        isConversion ? 'border-maroon/30 bg-maroon-faint/30' : 'border-border/80'
      }`}
    >
      {/* Header with Type & Subtitle */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold tracking-wide uppercase text-maroon">
            {item.type}
          </span>
          {item.subtitle && (
            <>
              <span className="text-ink/30 text-xs">·</span>
              <span className="text-xs text-ink/65 font-medium">{item.subtitle}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-ink/60 bg-page border border-border px-1.5 py-0.5 rounded-xs">
              {item.badge}
            </span>
          )}
          <BookmarkButton
            item={{
              id: item.id || `search-${item.type}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
              title: item.title,
              category: item.subtitle || item.type,
              type: item.type?.toLowerCase()?.includes('guide')
                ? 'guide'
                : item.type?.toLowerCase()?.includes('case')
                ? 'case'
                : item.type?.toLowerCase()?.includes('term')
                ? 'term'
                : item.type?.toLowerCase()?.includes('section')
                ? 'section'
                : item.type?.toLowerCase()?.includes('law')
                ? 'law'
                : 'page',
              description: item.explanation,
              url: item.url,
            }}
            size="sm"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-2 font-display text-base sm:text-lg font-semibold text-navy leading-snug">
        <Link
          to={item.url}
          className="hover:text-maroon transition-colors inline-flex items-center gap-1.5 group"
        >
          <span>{item.title}</span>
          <ArrowUpRight
            size={15}
            className="text-ink/40 group-hover:text-maroon transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
          />
        </Link>
      </h3>

      {/* Short Explanation */}
      <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.explanation}</p>

      {/* Why It Matches (Transparent Legal Rationale) */}
      {item.whyItMatches && (
        <div className="mt-3.5 flex items-start gap-2 rounded-xs bg-page border border-border/70 p-2.5 sm:px-3 text-xs text-ink/75">
          <span className="font-semibold text-navy shrink-0">Why this matches:</span>
          <span className="leading-relaxed">{item.whyItMatches}</span>
        </div>
      )}

      {/* Footer Deep Link */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
        <span className="text-ink/50 font-mono text-[11px]">
          {item.metadata?.sectionNumber || item.metadata?.articles || item.metadata?.citation || item.type}
        </span>
        <Link
          to={item.url}
          className="font-medium text-navy hover:text-maroon transition-colors flex items-center gap-1"
        >
          <span>View full statutory text</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </article>
  )
}

/**
 * Editorial Quick Link Card for the Empty State
 */
function QuickLinkCard({ to, title, subtitle, desc }) {
  return (
    <Link
      to={to}
      className="group block rounded-xs border border-border/80 bg-paper p-5 transition-all hover:border-navy hover:shadow-2xs"
    >
      <div className="text-[11px] font-mono font-semibold uppercase text-maroon tracking-wide">{subtitle}</div>
      <h3 className="mt-1 font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-ink/65 leading-relaxed">{desc}</p>
    </Link>
  )
}
