import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  Gavel,
  CheckCircle2,
  FileText,
  PhoneCall,
  Search,
  Scale,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import FundamentalRightsCharts from '../components/FundamentalRightsCharts.jsx'
import { getIcon } from '../components/iconMap.js'
import { useApi } from '../hooks/useApi.js'
import { fetchRights } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'

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
        image={
          <div className="flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center">
            <img
              src="/images/3d-constitution-book.svg"
              alt="3D Constitution of India Book"
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>
        }
      />

      <section className="container-content py-10 sm:py-14">
        {usingFallback && <OfflineNotice className="mb-6 max-w-lg" />}

        {/* Analytical Interactive Charts Section */}
        <div className="mb-12">
          <FundamentalRightsCharts />
        </div>

        {/* Emergency Violation Assistance Strip */}
        <div className="mb-10 rounded-xl border border-rose-500/30 bg-rose-500/5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
                <ShieldAlert size={20} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-navy sm:text-base">
                  Facing an active fundamental right violation right now?
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Unlawful detention, denial of FIR, custodial harassment, or arbitrary eviction can be immediately challenged via constitutional Writs.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <Link
                to="/harmed"
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-800 transition-colors"
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

        {/* Filter and Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy sm:text-xl">
              Constitutional Pillars &amp; Statutory Limits
            </h3>
            <p className="text-xs text-ink/65">
              Select any right to inspect its operative articles, reasonable restrictions, and penal consequences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, restrictions, penalties..."
                className="w-full rounded-lg border border-border bg-paper py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded-lg border border-border bg-paper px-3 py-1.5 text-xs font-medium text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
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
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
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
          <div className="space-y-8">
            {filteredRights.map((right) => {
              const Icon = getIcon(right.icon)
              const action = RIGHT_ACTION_MAP[right.id] || {
                to: '/laws',
                label: 'Browse Statutory Codes',
                category: 'Indian Law',
              }
              const isExpanded = expandedCards[right.id] ?? false
              const activeTab = activeTabByRight[right.id] || 'violations' // default to showing violations

              return (
                <article
                  key={right.id}
                  id={right.id}
                  className="card-surface scroll-mt-24 overflow-hidden rounded-2xl border border-navy/15 transition-all hover:border-navy/35 hover:shadow-cardHover"
                >
                  {/* Card Header Banner */}
                  <div className="border-b border-border/70 bg-linear-to-r from-navy/5 via-paper to-paper p-6 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3.5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-paper shadow-xs">
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
                      <div className="rounded-lg border border-border/80 bg-page/60 p-3 text-xs leading-relaxed text-ink/75">
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
                          onClick={() => setRightTab(right.id, 'violations')}
                          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                            activeTab === 'violations'
                              ? 'bg-rose-700 text-white shadow-2xs'
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
                              ? 'bg-amber-700 text-white shadow-2xs'
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

                      {/* TAB CONTENT 1: WHAT HAPPENS IF VIOLATED? */}
                      {activeTab === 'violations' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                              Legal Consequences &amp; Liabilities for Violators
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Enforced under Article 13 &amp; Supreme Court Doctrines
                            </span>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {right.violationConsequences ? (
                              right.violationConsequences.map((vc, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 transition-all hover:border-rose-500/40 hover:bg-rose-500/10"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-navy text-xs sm:text-sm">
                                      {vc.consequence}
                                    </span>
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                        vc.severity === 'Severe' || vc.severity === 'Critical' || vc.severity === 'Immediate'
                                          ? 'bg-rose-500/20 text-rose-800'
                                          : 'bg-amber-500/20 text-amber-800'
                                      }`}
                                    >
                                      {vc.severity}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-ink/75">
                                    {vc.details}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-lg border border-border p-4 text-xs text-ink/70">
                                Violating this constitutional right triggers Article 13 judicial invalidation, writ of mandamus/certiorari, and potential criminal/civil liability.
                              </div>
                            )}
                          </div>

                          {/* Precedent Note */}
                          <div className="rounded-lg border border-border/80 bg-paper p-3.5 text-xs text-ink/70">
                            <span className="font-semibold text-navy">Judicial Accountability Precedent:</span> In <em>Rudul Sah v. State of Bihar</em> and <em>Nilabati Behera</em>, the Supreme Court established that sovereign immunity cannot protect public officials who breach fundamental rights; the State must pay punitive compensation to the citizen.
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT 2: REASONABLE RESTRICTIONS */}
                      {activeTab === 'restrictions' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                              Constitutional Grounds for State Restrictions
                            </span>
                            <span className="text-[11px] text-ink/55">
                              Must satisfy the Supreme Court Proportionality Test
                            </span>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {right.restrictions ? (
                              right.restrictions.map((res, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 transition-all hover:border-amber-500/40"
                                >
                                  <div className="flex items-start gap-2">
                                    <AlertTriangle
                                      size={14}
                                      className="mt-0.5 shrink-0 text-amber-700"
                                    />
                                    <span className="text-xs font-bold text-navy">
                                      {res.ground}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-ink/75">
                                    {res.description}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-lg border border-border p-4 text-xs text-ink/70">
                                Subject to reasonable restrictions in the interests of public order, morality, and general welfare.
                              </div>
                            )}
                          </div>

                          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs leading-relaxed text-ink/70">
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

                          <div className="grid gap-3 sm:grid-cols-2">
                            {right.articlesList ? (
                              right.articlesList.map((art, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-lg border border-border/80 bg-paper p-3.5 shadow-2xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold text-navy">
                                      {art.number}
                                    </span>
                                  </div>
                                  <h4 className="mt-1 text-xs font-semibold text-navy">
                                    {art.title}
                                  </h4>
                                  <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
                                    {art.description}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-ink/60">Articles covered: {right.articles}</p>
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
                            <div className="grid gap-4 sm:grid-cols-3">
                              <div className="rounded-lg border border-border/80 bg-paper p-4">
                                <span className="text-[11px] font-bold uppercase text-ink/50">
                                  Primary Prerogative Writ
                                </span>
                                <h5 className="mt-1 text-sm font-bold text-navy">
                                  {right.citizenRemedy.primaryWrit}
                                </h5>
                                <p className="mt-1 text-xs text-ink/70">
                                  Orders the authority to perform its duty or quash illegal proceedings.
                                </p>
                              </div>

                              <div className="rounded-lg border border-border/80 bg-paper p-4">
                                <span className="text-[11px] font-bold uppercase text-ink/50">
                                  Jurisdictional Court
                                </span>
                                <h5 className="mt-1 text-sm font-bold text-navy">
                                  {right.citizenRemedy.courtAuthority}
                                </h5>
                                <p className="mt-1 text-xs text-ink/70">
                                  State High Court is often faster and has wider jurisdiction than Supreme Court.
                                </p>
                              </div>

                              <div className="rounded-lg border border-border/80 bg-paper p-4">
                                <span className="text-[11px] font-bold uppercase text-ink/50">
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
                            <div className="rounded-lg border border-border/80 bg-page/50 p-3">
                              <span className="text-xs font-bold text-navy">
                                Backed by Statutory Acts:
                              </span>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {right.statutoryActs.map((act, i) => (
                                  <span
                                    key={i}
                                    className="rounded-md border border-border bg-paper px-2.5 py-0.5 text-xs text-ink/80"
                                  >
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
                    <div className="flex items-center gap-3">
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
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/harmed"
                        className="inline-flex items-center gap-1 rounded-sm border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-500/20 transition-all"
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

        {/* Global Constitutional Remedies Reference Banner */}
        <div className="mt-14 rounded-2xl border border-navy/15 bg-paper p-7 sm:p-9 shadow-xs">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="rounded-full bg-navy/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-navy">
                Article 32 &amp; Article 226
              </span>
              <h3 className="mt-3 text-xl font-bold text-navy">
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

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
              <div className="rounded-xl border border-border/80 bg-page/50 p-4">
                <h5 className="text-xs font-bold text-navy">Article 13(2) Invalidation</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  The State shall not make any law which takes away or abridges Part III rights; any law made in contravention of this clause shall be void ab initio.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-page/50 p-4">
                <h5 className="text-xs font-bold text-navy">Article 32 vs Article 226</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Article 32 in the Supreme Court is limited to Fundamental Rights. Article 226 in High Courts covers both Fundamental Rights and any ordinary statutory violations.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-page/50 p-4">
                <h5 className="text-xs font-bold text-navy">Public Interest Litigation (PIL)</h5>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  Any public-spirited citizen or NGO can file a petition on behalf of marginalized individuals who cannot access the courts themselves.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-page/50 p-4">
                <h5 className="text-xs font-bold text-navy">Free Legal Services (NALSA)</h5>
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

