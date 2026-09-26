import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  Gavel,
  FileText,
  PhoneCall,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import FundamentalRightsCharts from '../components/FundamentalRightsCharts.jsx'
import ConstitutionalOriginsBanner from '../components/ConstitutionalOriginsBanner.jsx'
import LandmarkCasesSection from '../components/LandmarkCasesSection.jsx'
import Article13Section from '../components/Article13Section.jsx'
import FundamentalRightsQuiz from '../components/FundamentalRightsQuiz.jsx'
import RelatedInformation from '../components/RelatedInformation.jsx'
import SourcesVerification from '../components/SourcesVerification.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { getIcon } from '../components/iconMap.js'
import SourceReference from '../components/SourceReference.jsx'
import { isVerifiedNote, extractSourceUrl } from '../utils/sources.js'
import { useBreadcrumbContext } from '../context/BreadcrumbContext.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchRights } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'
import { laws as fallbackLaws } from '../data/laws.js'

// Map each fundamental right to its corresponding substantive statutory law or remedy
const RIGHT_ACTION_MAP = {
  equality: {
    to: '/laws/indian-contract-1872',
    label: 'Explore Contract & Civil Equality (1872)',
    category: 'Civil Law & Contracts',
  },
  freedom: {
    to: '/laws/bnss-2023',
    label: 'Explore Arrest & Procedural Safeguards (BNSS)',
    category: 'Criminal Procedure Code',
  },
  exploitation: {
    to: '/laws/bns-2023',
    label: 'Explore Penal Offence Protections (BNS)',
    category: 'Substantive Criminal Law',
  },
  religion: {
    to: '/laws/hindu-marriage-1955',
    label: 'Explore Family & Civil Rights (1955)',
    category: 'Family & Religious Law',
  },
  'cultural-educational': {
    to: '/laws/consumer-protection-2019',
    label: 'Explore Consumer & Public Rights (2019)',
    category: 'Consumer Protection',
  },
  'constitutional-remedies': {
    to: '/harmed',
    label: 'Report Violation & Incident Guidance',
    category: 'Practical Redressal Tool',
  },
}

export default function FundamentalRights() {
  const {
    data: fundamentalRights,
    loading,
    usingFallback,
  } = useApi(fetchRights, [], fallbackRights)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [expandedCards, setExpandedCards] = useState({
    equality: true,
    freedom: true,
  })
  const [activeTabByRight, setActiveTabByRight] = useState({}) // { [rightId]: 'articles' | 'restrictions' | 'violations' | 'remedy' }
  const [selectedArticleGraph, setSelectedArticleGraph] = useState('article-21')

  const { setActiveArticle } = useBreadcrumbContext()

  // Keep breadcrumbs in sync with selected/targeted constitutional article
  useEffect(() => {
    const rawHash = window.location.hash.toLowerCase()
    if (rawHash.includes('14') || rawHash.includes('art-14')) {
      setActiveArticle('Article 14')
      setSelectedArticleGraph('article-14')
    } else if (rawHash.includes('19') || rawHash.includes('art-19')) {
      setActiveArticle('Article 19')
      setSelectedArticleGraph('article-19')
    } else if (rawHash.includes('21a') || rawHash.includes('art-21a')) {
      setActiveArticle('Article 21A')
      setSelectedArticleGraph('article-21')
    } else if (rawHash.includes('21') || rawHash.includes('art-21')) {
      setActiveArticle('Article 21')
      setSelectedArticleGraph('article-21')
    } else if (rawHash.includes('32') || rawHash.includes('art-32')) {
      setActiveArticle('Article 32')
      setSelectedArticleGraph('article-32')
    } else if (selectedArticleGraph === 'article-14') {
      setActiveArticle('Article 14')
    } else if (selectedArticleGraph === 'article-19') {
      setActiveArticle('Article 19')
    } else if (selectedArticleGraph === 'article-32') {
      setActiveArticle('Article 32')
    } else if (selectedArticleGraph === 'article-21') {
      // Default initial view or explicit 21 selection
      if (rawHash.includes('equality')) {
        setActiveArticle('Article 14')
      } else {
        setActiveArticle(null)
      }
    } else {
      setActiveArticle(null)
    }
  }, [selectedArticleGraph, setActiveArticle])

  // Every fundamental right on this page derives from the same underlying
  // source — the Constitution of India — so its verification data is
  // resolved once here rather than fabricated per-right.
  const constitutionLaw = fallbackLaws.find((l) => l.id === 'constitution-of-india')
  const constitutionSourceLabel = constitutionLaw?.officialSource
  const constitutionVerifiedNoteRaw = constitutionLaw?.lastVerified
  const constitutionVerified = isVerifiedNote(constitutionVerifiedNoteRaw)
  const constitutionSourceUrl = constitutionVerified ? extractSourceUrl(constitutionSourceLabel) : null
  const constitutionVerifiedNote = constitutionVerified ? constitutionVerifiedNoteRaw : null

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const setRightTab = (rightId, tab) => {
    setActiveTabByRight((prev) => ({
      ...prev,
      [rightId]: tab,
    }))
  }

  const filteredRights = useMemo(() => {
    return fundamentalRights.filter((r) => {
      const matchesFilter = selectedFilter === 'all' || r.id === selectedFilter
      const matchesSearch =
        !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.articles.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.restrictions &&
          r.restrictions.some(
            (res) =>
              res.ground.toLowerCase().includes(searchQuery.toLowerCase()) ||
              res.description.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (r.violationConsequences &&
          r.violationConsequences.some(
            (v) =>
              v.consequence.toLowerCase().includes(searchQuery.toLowerCase()) ||
              v.details.toLowerCase().includes(searchQuery.toLowerCase())
          ))
      return matchesFilter && matchesSearch
    })
  }, [fundamentalRights, selectedFilter, searchQuery])

  return (
    <>
      <Hero
        eyebrow="Part III of the Constitution • Articles 12–35"
        title="Fundamental Rights, Restrictions & Violation Remedies"
        subtitle="Explore India's constitutional guarantees, the precise legal grounds under which the State can restrict them, and what happens when an authority or individual violates these rights."
        size="md"
      />

      <section className="container-content py-10 sm:py-14">
        {usingFallback && <OfflineNotice className="mb-6 max-w-lg" />}

        {/* Quick Section Jump Navigation */}
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-4 text-xs">
          <span className="font-semibold text-ink/60">Quick navigation:</span>
          <a href="#origins" className="font-medium text-navy hover:text-brass-dark transition-colors">
            Philosophy &amp; US Origin
          </a>
          <a href="#rights-breakdown" className="font-medium text-navy hover:text-brass-dark transition-colors">
            6 Core Rights Breakdown
          </a>
          <a href="#article-13" className="font-medium text-navy hover:text-brass-dark transition-colors">
            Article 13 (Judicial Review)
          </a>
          <a href="#landmark-cases" className="font-medium text-navy hover:text-brass-dark transition-colors">
            Landmark Cases Table
          </a>
          <a href="#practice-questions" className="font-medium text-oxblood-dark hover:text-oxblood transition-colors">
            Practice MCQs Quiz
          </a>
        </div>

        {/* Foundational Understanding & US Adaptation Banner */}
        <div id="origins">
          <ConstitutionalOriginsBanner />
        </div>

        {/* Analytical Interactive Charts Section */}
        <div className="mb-12">
          <FundamentalRightsCharts />
        </div>

        {/* Emergency Violation Assistance Strip */}
        <div className="mb-10 rounded-md border border-oxblood/30 bg-oxblood/5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-oxblood/10 text-oxblood">
                <ShieldAlert size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-navy sm:text-base">
                  Facing an active fundamental right violation right now?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Unlawful detention, denial of FIR, custodial harassment, or arbitrary eviction can be immediately challenged via constitutional Writs.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <Link
                to="/harmed"
                className="inline-flex items-center gap-1.5 rounded-lg bg-oxblood-dark px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-oxblood-dark transition-colors"
              >
                Assess Violation <ArrowRight size={13} />
              </Link>
              <a
                href="tel:15100"
                className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 bg-paper px-3.5 py-2 text-xs font-semibold text-navy hover:bg-navy/5 transition-colors"
                title="National Legal Services Authority (NALSA) 24x7 Helpline"
              >
                <PhoneCall size={13} className="text-emerald-700" /> NALSA: 15100
              </a>
            </div>
          </div>
        </div>

        {/* Expandable Sources & Verification System */}
        <SourcesVerification
          className="mb-8"
          sources={[
            {
              documentName: 'The Constitution of India (Part III: Fundamental Rights, Articles 12–35)',
              sourceName: 'Legislative Department, Ministry of Law and Justice (legislative.gov.in)',
              sourceUrl: 'https://legislative.gov.in',
              lastVerified: 'Legislative Department, Ministry of Law and Justice',
              sourceType: 'official',
              citation: 'Constitution of India (Enacted 26 Nov 1949, in force 26 Jan 1950)',
              notes: 'Authoritative text as amended up to the Constitution (One Hundred and Sixth Amendment) Act, 2023.',
            },
            {
              documentName: 'Supreme Court Ratio Decidendi & Constitutional Precedents (Art. 141)',
              sourceName: 'Supreme Court of India (main.sci.gov.in)',
              sourceUrl: 'https://main.sci.gov.in',
              lastVerified: 'Supreme Court Registry & SCR Reports',
              sourceType: 'official',
              citation: 'Articles 32, 136 & 141, Constitution of India',
              notes: 'Binding judicial declarations defining the basic structure doctrine, proportionality review, and procedural due process.',
            },
            {
              documentName: 'Part III Statutory Cross-References & Educational Syntheses',
              sourceName: 'Nyaya Constitutional Law Research Group',
              sourceUrl: null,
              lastVerified: 'Editorial Board Cross-Verification',
              sourceType: 'secondary',
              citation: 'Civic Legal Education Series',
              notes: 'Plain-language citizen summaries and reasonable restriction syntheses developed for civic education.',
            },
          ]}
        />

        {/* Filter and Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy sm:text-xl">
              Constitutional Pillars &amp; Statutory Limits
            </h2>
            <p className="text-xs text-ink/65">
              Select any right to inspect its operative articles, reasonable restrictions, and penal consequences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px]">
              <label htmlFor="rights-search-input" className="sr-only">
                Search articles, restrictions, penalties
              </label>
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
                aria-hidden="true"
              />
              <input
                id="rights-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, restrictions, penalties..."
                className="w-full rounded-lg border border-border bg-paper py-2 pl-8 pr-3 text-xs text-ink placeholder:text-ink/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy min-h-[36px]"
              />
            </div>

            <select
              aria-label="Filter by fundamental right category"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded-lg border border-border bg-paper px-3 py-2 text-xs font-medium text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy min-h-[36px]"
            >
              <option value="all">All 6 Fundamental Rights</option>
              <option value="equality">Right to Equality (14–18)</option>
              <option value="freedom">Right to Freedom (19–22)</option>
              <option value="exploitation">Right against Exploitation (23–24)</option>
              <option value="religion">Freedom of Religion (25–28)</option>
              <option value="cultural-educational">Cultural &amp; Educational (29–30)</option>
              <option value="constitutional-remedies">Constitutional Remedies (32)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingState label="Loading fundamental rights and constitutional datasets..." />
        ) : filteredRights.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-10 text-center">
            <p className="text-sm font-semibold text-navy">No matching fundamental right found</p>
            <p className="mt-1 text-xs text-ink/60">
              Try modifying your search query or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedFilter('all')
              }}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brass-dark hover:text-navy"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div id="rights-breakdown" className="space-y-8 scroll-mt-24">
            {filteredRights.map((right) => {
              const Icon = getIcon(right.icon)
              const action = RIGHT_ACTION_MAP[right.id] || {
                to: '/laws',
                label: 'Browse Statutory Codes',
                category: 'Indian Law',
              }
              const isExpanded = expandedCards[right.id] ?? false
              const activeTab = activeTabByRight[right.id] || 'core' // default to 3-pillar core breakdown

              return (
                <article
                  key={right.id}
                  id={right.id}
                  className="scroll-mt-24 border border-border rounded-md"
                >
                  {/* Header */}
                  <div className="border-b border-border p-6 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3.5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-paper shadow-xs">
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-bold text-navy sm:text-2xl">
                              {right.title}
                            </h2>
                            {right.hindi && (
                              <span className="rounded-md bg-navy/10 px-2 py-0.5 text-xs font-medium text-navy">
                                {right.hindi}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 font-mono text-xs font-semibold text-brass-dark">
                            {right.articles}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-navy/20 bg-paper px-2.5 py-1 text-[11px] font-semibold text-navy">
                          {right.nature || 'Universal Guarantee'}
                        </span>
                        <BookmarkButton
                          item={{
                            id: `fr-${right.id}`,
                            title: `${right.title} (${right.articles})`,
                            category: 'Constitutional Rights',
                            type: 'right',
                            description: right.summary,
                            url: `/fundamental-rights#${right.id}`,
                          }}
                          size="sm"
                        />
                        <button
                          type="button"
                          onClick={() => toggleExpand(right.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-paper px-3 py-1 text-xs font-medium text-ink/80 hover:bg-page transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              Collapse <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              Deep View <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Summary and Example */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink/50">
                          Constitutional Guarantee
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-ink/80">
                          {right.summary}
                        </p>
                      </div>
                      <div className="border-l-2 border-border pl-3 text-xs leading-relaxed text-ink/75">
                        <span className="font-semibold text-navy">Everyday Application:</span>
                        <p className="mt-0.5 text-ink/65">{right.example}</p>
                      </div>
                    </div>

                    {/* Enforceability note */}
                    {right.enforceability && (
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-ink/60">
                        <span className="font-semibold text-navy">Enforceability Scope:</span>
                        <span>{right.enforceability}</span>
                      </div>
                    )}
                  </div>

                  {/* Deep Details Section (Expandable or Default Visible) */}
                  {isExpanded && (
                    <div className="p-6 sm:p-7">
                      {/* Sub-Tabs for this Right */}
                      <div className="mb-6 flex flex-wrap gap-2 border-b border-border/70 pb-3">
                        <button
                          type="button"
                          onClick={() => setRightTab(right.id, 'core')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'core'
                              ? 'bg-navy text-white shadow-2xs'
                              : 'bg-paper text-ink/75 border border-border/70 hover:text-navy hover:bg-page'
                          }`}
                        >
                          <BookOpen size={13} />
                          Core Breakdown (Rights, Restrictions &amp; Violations)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightTab(right.id, 'violations')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'violations'
                              ? 'bg-oxblood-dark text-white shadow-2xs'
                              : 'bg-paper text-ink/75 border border-border/70 hover:text-navy hover:bg-page'
                          }`}
                        >
                          <ShieldAlert size={13} />
                          What Happens If Violated? (Penalties &amp; Writs)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightTab(right.id, 'restrictions')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'restrictions'
                              ? 'bg-brass-dark text-white shadow-2xs'
                              : 'bg-paper text-ink/75 border border-border/70 hover:text-navy hover:bg-page'
                          }`}
                        >
                          <AlertTriangle size={13} />
                          Reasonable Restrictions (Why State Can Limit)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightTab(right.id, 'articles')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'articles'
                              ? 'bg-navy text-white shadow-2xs'
                              : 'bg-paper text-ink/75 border border-border/70 hover:text-navy hover:bg-page'
                          }`}
                        >
                          <FileText size={13} />
                          Constitutional Articles ({right.articlesList ? right.articlesList.length : 'All'})
                        </button>
                        <button
                          type="button"
                          onClick={() => setRightTab(right.id, 'remedy')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'remedy'
                              ? 'bg-emerald-700 text-white shadow-2xs'
                              : 'bg-paper text-ink/75 border border-border/70 hover:text-navy hover:bg-page'
                          }`}
                        >
                          <Gavel size={13} />
                          Citizen Redress Pathway
                        </button>
                      </div>

                      {/* TAB CONTENT 0: CORE 3-PILLAR BREAKDOWN */}
                      {activeTab === 'core' && (
                        <div className="space-y-4">
                          <div className="grid gap-6 border-t border-border pt-5 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
                            {/* 1. The Rights */}
                            <div className="md:pr-5">
                              <div className="flex items-center gap-2 text-navy">
                                <BookOpen size={15} className="text-navy" />
                                <h4 className="text-xs font-semibold uppercase tracking-wide">
                                  1. The Rights
                                </h4>
                              </div>
                              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink/85">
                                {right.theRights ? (
                                  right.theRights.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                                    <span>{right.summary}</span>
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* 2. Proper Restrictions / Exceptions */}
                            <div className="md:px-5">
                              <div className="flex items-center gap-2 text-brass-dark">
                                <AlertTriangle size={15} className="text-brass-dark" />
                                <h4 className="text-xs font-semibold uppercase tracking-wide">
                                  2. Proper Restrictions / Exceptions
                                </h4>
                              </div>
                              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink/85">
                                {right.properRestrictionsSummary ? (
                                  right.properRestrictionsSummary.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-dark" />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : right.restrictions ? (
                                  right.restrictions.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-dark" />
                                      <span>
                                        <strong>{r.ground}:</strong> {r.description}
                                      </span>
                                    </li>
                                  ))
                                ) : (
                                  <li>Subject to public order, morality, and general public interest.</li>
                                )}
                              </ul>
                            </div>

                            {/* 3. What happens if violated? */}
                            <div className="md:pl-5">
                              <div className="flex items-center gap-2 text-oxblood-dark">
                                <ShieldAlert size={15} className="text-oxblood-dark" />
                                <h4 className="text-xs font-semibold uppercase tracking-wide">
                                  3. What Happens If Violated?
                                </h4>
                              </div>
                              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink/85">
                                {right.violationConsequencesSummary ? (
                                  right.violationConsequencesSummary.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : right.violationConsequences ? (
                                  right.violationConsequences.map((v, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" />
                                      <span>
                                        <strong>{v.consequence}:</strong> {v.details}
                                      </span>
                                    </li>
                                  ))
                                ) : (
                                  <li>Discriminatory laws can be challenged under Article 13 and declared null and void.</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT 1: WHAT HAPPENS IF VIOLATED? */}
                      {activeTab === 'violations' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-oxblood-dark">
                              Legal Consequences &amp; Liabilities for Violators
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Enforced under Article 13 &amp; Supreme Court Doctrines
                            </span>
                          </div>

                          <div className="divide-y divide-border border-t border-border">
                            {right.violationConsequences ? (
                              right.violationConsequences.map((vc, idx) => (
                                <div key={idx} className="py-3.5">
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-navy text-xs sm:text-sm">
                                      {vc.consequence}
                                    </span>
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                        vc.severity === 'Severe' || vc.severity === 'Critical' || vc.severity === 'Immediate'
                                          ? 'bg-oxblood/10 text-oxblood-dark'
                                          : 'bg-brass/15 text-brass-dark'
                                      }`}
                                    >
                                      {vc.severity}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                                    {vc.details}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="py-3.5 text-xs text-ink/70">
                                Violating this constitutional right triggers Article 13 judicial invalidation, writ of mandamus/certiorari, and potential criminal/civil liability.
                              </div>
                            )}
                          </div>

                          {/* Precedent Note */}
                          <div className="border-l-2 border-border pl-3 text-xs text-ink/70">
                            <span className="font-semibold text-navy">Judicial Accountability Precedent:</span> In <em>Rudul Sah v. State of Bihar</em> and <em>Nilabati Behera</em>, the Supreme Court established that sovereign immunity cannot protect public officials who breach fundamental rights; the State must pay punitive compensation to the citizen.
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT 2: REASONABLE RESTRICTIONS */}
                      {activeTab === 'restrictions' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                              Constitutional Grounds for State Restrictions
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Must satisfy the Supreme Court Proportionality Test
                            </span>
                          </div>

                          <div className="divide-y divide-border border-t border-border">
                            {right.restrictions ? (
                              right.restrictions.map((res, idx) => (
                                <div key={idx} className="py-3.5">
                                  <div className="flex items-start gap-2">
                                    <AlertTriangle
                                      size={14}
                                      className="mt-0.5 shrink-0 text-brass-dark"
                                    />
                                    <span className="text-xs font-semibold text-navy">
                                      {res.ground}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                                    {res.description}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="py-3.5 text-xs text-ink/70">
                                Subject to reasonable restrictions in the interests of public order, morality, and general welfare.
                              </div>
                            )}
                          </div>

                          <div className="border-l-2 border-brass/50 pl-3 text-xs leading-relaxed text-ink/70">
                            <span className="font-semibold text-navy">The Proportionality Test:</span> The State cannot impose disproportionate, excessive, or indefinite restrictions. Any law curbing rights must have a legitimate goal, a rational nexus, and represent the least intrusive measure possible (<em>Puttaswamy II</em>).
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT 3: SPECIFIC ARTICLES */}
                      {activeTab === 'articles' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-navy">
                              Operative Articles &amp; Clauses
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Part III, Constitution of India
                            </span>
                          </div>

                          <div className="divide-y divide-border border-t border-border">
                            {right.articlesList ? (
                              right.articlesList.map((art, idx) => {
                                const artNumClean = art.number.toLowerCase().replace(/[^0-9a-z]/g, '').replace('article', '').replace('art', '')
                                return (
                                  <div
                                    key={idx}
                                    id={`article-${artNumClean}`}
                                    className="scroll-mt-24 py-3 transition-colors hover:bg-stone-50/80 px-2 rounded-xs"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-semibold text-navy">
                                          {art.number}
                                        </span>
                                        <BookmarkButton
                                          item={{
                                            id: `article-${artNumClean}`,
                                            title: `${art.number}: ${art.title}`,
                                            category: 'Constitution of India (Part III)',
                                            type: 'article',
                                            description: art.description,
                                            url: `/fundamental-rights#article-${artNumClean}`,
                                          }}
                                          size="sm"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedArticleGraph(`article-${artNumClean}`)
                                          setActiveArticle(`Article ${artNumClean.toUpperCase()}`)
                                          window.location.hash = `article-${artNumClean}`
                                        }}
                                        className="text-[11px] font-medium text-brass-dark hover:text-navy hover:underline"
                                      >
                                        Explore Connections →
                                      </button>
                                    </div>
                                    <h4 className="mt-1 text-xs font-semibold text-navy">
                                      {art.title}
                                    </h4>
                                    <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
                                      {art.description}
                                    </p>
                                  </div>
                                )
                              })
                            ) : (
                              <p className="py-3 text-xs text-ink/60">Articles covered: {right.articles}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT 4: CITIZEN REDRESS PATHWAY */}
                      {activeTab === 'remedy' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                              Citizen Action Protocol &amp; Court Authorities
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Fast-track constitutional remedies
                            </span>
                          </div>

                          {right.citizenRemedy ? (
                            <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
                              <div className="sm:pr-4">
                                <span className="text-[11px] font-semibold uppercase text-ink/50">
                                  Primary Prerogative Writ
                                </span>
                                <h5 className="mt-1 text-sm font-semibold text-navy">
                                  {right.citizenRemedy.primaryWrit}
                                </h5>
                                <p className="mt-1 text-xs text-ink/70">
                                  Orders the authority to perform its duty or quash illegal proceedings.
                                </p>
                              </div>

                              <div className="sm:px-4">
                                <span className="text-[11px] font-semibold uppercase text-ink/50">
                                  Jurisdictional Court
                                </span>
                                <h5 className="mt-1 text-sm font-semibold text-navy">
                                  {right.citizenRemedy.courtAuthority}
                                </h5>
                                <p className="mt-1 text-xs text-ink/70">
                                  State High Court is often faster and has wider jurisdiction than Supreme Court.
                                </p>
                              </div>

                              <div className="sm:pl-4">
                                <span className="text-[11px] font-semibold uppercase text-ink/50">
                                  Immediate Citizen Action
                                </span>
                                <h5 className="mt-1 text-xs font-semibold text-navy">
                                  {right.citizenRemedy.immediateStep}
                                </h5>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-ink/70">
                              File a Writ Petition under Article 226 before the State High Court.
                            </p>
                          )}

                          {right.statutoryActs && (
                            <div className="border-t border-border pt-3">
                              <span className="text-xs font-semibold text-navy">
                                Backed by Statutory Acts:
                              </span>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                {right.statutoryActs.map((act, i) => (
                                  <span key={i} className="text-xs text-ink/75">
                                    {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Bottom Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-page/40 px-6 py-3.5 sm:px-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                        {action.category}
                      </span>
                      <span className="text-ink/30">•</span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(right.id)}
                        className="text-xs font-medium text-navy hover:text-brass-dark transition-colors"
                      >
                        {isExpanded ? 'Hide Details' : 'View Restrictions & Violations'}
                      </button>
                      <span className="text-ink/30">•</span>
                      <SourceReference
                        sourceLabel={constitutionSourceLabel}
                        sourceUrl={constitutionSourceUrl}
                        verifiedNote={constitutionVerifiedNote}
                        compact
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/harmed"
                        className="inline-flex items-center gap-1 rounded-sm border border-oxblood/20 bg-oxblood/10 px-3 py-1 text-xs font-semibold text-oxblood-dark hover:bg-oxblood/20 transition-all"
                      >
                        Report Issue
                      </Link>
                      <Link
                        to={action.to}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-navy/20 bg-paper px-3.5 py-1 text-xs font-semibold text-navy shadow-2xs hover:border-navy hover:bg-navy/5 transition-all"
                      >
                        {action.label} <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Article 13 Judicial Review & Severability Section */}
        <Article13Section />

        {/* Landmark Supreme Court Cases Table */}
        <LandmarkCasesSection />

        {/* Practice MCQs Preparation Quiz */}
        <FundamentalRightsQuiz />

        {/* Reusable Verified Related Information Component */}
        <div className="mt-14 border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-1 block">Part III Statutory Connections</span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy">
                Inter-Statutory & Precedential Cross-Links
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-sm border border-stone-200 text-xs">
              <span className="font-mono text-ink/50 text-[11px] px-1.5 font-semibold">Inspect Article:</span>
              <button
                type="button"
                onClick={() => setSelectedArticleGraph('article-21')}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  selectedArticleGraph === 'article-21'
                    ? 'bg-navy text-white font-semibold shadow-2xs'
                    : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                }`}
              >
                Article 21 (Life & Liberty)
              </button>
              <button
                type="button"
                onClick={() => setSelectedArticleGraph('article-14')}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  selectedArticleGraph === 'article-14'
                    ? 'bg-navy text-white font-semibold shadow-2xs'
                    : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                }`}
              >
                Article 14 (Equality)
              </button>
              <button
                type="button"
                onClick={() => setSelectedArticleGraph('article-19')}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  selectedArticleGraph === 'article-19'
                    ? 'bg-navy text-white font-semibold shadow-2xs'
                    : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                }`}
              >
                Article 19 (Freedoms)
              </button>
              <button
                type="button"
                onClick={() => setSelectedArticleGraph('article-32')}
                className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                  selectedArticleGraph === 'article-32'
                    ? 'bg-navy text-white font-semibold shadow-2xs'
                    : 'text-ink/70 hover:text-navy hover:bg-stone-200/60'
                }`}
              >
                Article 32 (Remedies & Writs)
              </button>
            </div>
          </div>

          <RelatedInformation
            type="article"
            id={selectedArticleGraph}
            title={`Statutory & Precedential Connections for ${
              selectedArticleGraph === 'article-21'
                ? 'Article 21 (Life & Personal Liberty)'
                : selectedArticleGraph === 'article-14'
                ? 'Article 14 (Equality Before Law)'
                : selectedArticleGraph === 'article-19'
                ? 'Article 19 (Six Fundamental Freedoms)'
                : 'Article 32 (Constitutional Remedies)'
            }`}
            subtitle="Verified inter-statutory pathways connecting this constitutional guarantee to substantive penal sections, procedural arrest/bail codes (BNSS), binding Supreme Court ratio decidendi, and practical citizen SOPs."
            className="!mt-2"
          />
        </div>

        {/* Global Constitutional Remedies Reference Banner */}
        <div className="mt-14 border-t border-border pt-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">Article 32 &amp; Article 226</span>
              <h3 className="font-display text-xl font-semibold text-navy">
                The Judicial Enforcement Architecture
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                A right without a remedy is merely a declaration. The Constitution empowers courts to nullify arbitrary laws and command public officials directly.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/laws/bnss-2023"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-brass-dark"
                >
                  <ArrowRight size={13} /> Arrest &amp; Bail Code (BNSS 2023)
                </Link>
                <Link
                  to="/legal-terms"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-brass-dark"
                >
                  <ArrowRight size={13} /> Writ &amp; PIL Legal Definitions
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:col-span-2">
              <div>
                <h5 className="text-xs font-semibold text-navy">Article 13(2) Invalidation</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  The State shall not make any law which takes away or abridges Part III rights; any law made in contravention of this clause shall be void ab initio.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-navy">Article 32 vs Article 226</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Article 32 in the Supreme Court is limited to Fundamental Rights. Article 226 in High Courts covers both Fundamental Rights and any ordinary statutory violations.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-navy">Public Interest Litigation (PIL)</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Any public-spirited citizen or NGO can file a petition on behalf of marginalized individuals who cannot access the courts themselves.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-navy">Free Legal Services (NALSA)</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Under Article 39A and the Legal Services Authorities Act, 1987, women, children, undertrials, and low-income citizens are entitled to free government legal counsel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

