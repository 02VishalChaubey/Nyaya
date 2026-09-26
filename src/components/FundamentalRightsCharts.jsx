import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import {
  Scale,
  Gavel,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

// Prepare comparative charting dataset from fundamental rights
const COMPARATIVE_DATA = [
  {
    name: 'Equality',
    fullName: 'Right to Equality (Arts. 14–18)',
    articleSpan: 5,
    restrictionLatitude: 5, // Reasonable classification & affirmative action
    judicialScrutiny: 8, // Non-arbitrariness (Royappa doctrine)
    violationSeverity: 9,
    primaryWrit: 'Mandamus & Certiorari',
    color: '#0284c7', // Sky
  },
  {
    name: 'Freedom',
    fullName: 'Right to Freedom (Arts. 19–22)',
    articleSpan: 5,
    restrictionLatitude: 7, // 8 specified grounds under 19(2)-(6)
    judicialScrutiny: 10, // Strict Proportionality Test (Puttaswamy)
    violationSeverity: 10,
    primaryWrit: 'Habeas Corpus & Certiorari',
    color: '#d97706', // Amber/Brass
  },
  {
    name: 'Exploitation',
    fullName: 'Against Exploitation (Arts. 23–24)',
    articleSpan: 2,
    restrictionLatitude: 2, // Near absolute; strict prohibition
    judicialScrutiny: 9,
    violationSeverity: 10,
    primaryWrit: 'Habeas Corpus & Mandamus',
    color: '#e11d48', // Rose
  },
  {
    name: 'Religion',
    fullName: 'Freedom of Religion (Arts. 25–28)',
    articleSpan: 4,
    restrictionLatitude: 6, // Health, public order, social reform
    judicialScrutiny: 8, // Essential Religious Practice test
    violationSeverity: 8,
    primaryWrit: 'Mandamus & Certiorari',
    color: '#059669', // Emerald
  },
  {
    name: 'Culture/Edu',
    fullName: 'Cultural & Educational (Arts. 29–30)',
    articleSpan: 2,
    restrictionLatitude: 4, // Academic & administrative standards only
    judicialScrutiny: 9, // Minority institutional autonomy
    violationSeverity: 7,
    primaryWrit: 'Mandamus & Certiorari',
    color: '#7c3aed', // Purple
  },
  {
    name: 'Remedies',
    fullName: 'Constitutional Remedies (Art. 32)',
    articleSpan: 2,
    restrictionLatitude: 1, // Non-restrictable core; heart & soul
    judicialScrutiny: 10, // Absolute prerogative jurisdiction
    violationSeverity: 10,
    primaryWrit: 'All 5 Prerogative Writs',
    color: '#0f172a', // Navy
  },
]

// Writs Distribution Data across categories
const WRIT_DISTRIBUTION_DATA = [
  {
    writ: 'Habeas Corpus',
    fullName: 'Produce the Body (Illegal Detention)',
    relevanceCount: 95,
    typicalTarget: 'Police / Custodial Jailer',
    speed: 'Urgent (24–48 Hours)',
  },
  {
    writ: 'Mandamus',
    fullName: 'We Command (Statutory Duty Enforcement)',
    relevanceCount: 88,
    typicalTarget: 'Government Depts / Municipalities',
    speed: 'Priority (3–7 Days)',
  },
  {
    writ: 'Certiorari',
    fullName: 'Quashing Illegal / Ultra Vires Orders',
    relevanceCount: 82,
    typicalTarget: 'Tribunals / Lower Courts / Boards',
    speed: 'Expedited (1–2 Weeks)',
  },
  {
    writ: 'Prohibition',
    fullName: 'Stay of Proceedings (Jurisdiction Excess)',
    relevanceCount: 65,
    typicalTarget: 'Subordinate Quasi-Judicial Bodies',
    speed: 'Immediate Interim Stay',
  },
  {
    writ: 'Quo Warranto',
    fullName: 'By What Authority (Illegal Public Office)',
    relevanceCount: 50,
    typicalTarget: 'Usurper of Public Office / Selection',
    speed: 'Standard Hearing',
  },
]

// Custom Tooltip for Comparative Chart
function CustomComparativeTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const dataItem = COMPARATIVE_DATA.find((d) => d.name === label) || payload[0].payload
    return (
      <div className="rounded-lg border border-border/80 bg-paper p-3.5 shadow-lg max-w-xs text-xs font-sans">
        <p className="font-bold text-navy">{dataItem.fullName || label}</p>
        <div className="mt-2 space-y-1">
          <p className="text-ink/70">
            <span className="font-semibold text-navy">Operative Articles:</span> {dataItem.articleSpan}
          </p>
          <p className="text-ink/70">
            <span className="font-semibold text-brass-dark">Restriction Scope (1–10):</span> {dataItem.restrictionLatitude}/10
          </p>
          <p className="text-ink/70">
            <span className="font-semibold text-navy">Judicial Scrutiny (1–10):</span> {dataItem.judicialScrutiny}/10
          </p>
          <p className="text-ink/70">
            <span className="font-semibold text-oxblood-dark">Violation Severity:</span> {dataItem.violationSeverity}/10
          </p>
        </div>
        <div className="mt-2.5 border-t border-border/60 pt-2 text-[11px] text-ink/60">
          <span className="font-semibold text-navy">Primary Writ:</span> {dataItem.primaryWrit}
        </div>
      </div>
    )
  }
  return null
}

export default function FundamentalRightsCharts({ activeRightId, onSelectRight }) {
  const [chartTab, setChartTab] = useState('comparison') // 'comparison' | 'radar' | 'writs'

  return (
    <div className="rounded-md border border-navy/15 bg-paper p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/10 text-navy">
              <Scale size={13} />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brass-dark">
              Constitutional Analytics &amp; Doctrinal Restraints
            </span>
          </div>
          <h3 className="mt-1 text-xl font-bold text-navy sm:text-2xl">
            Rights Scope, Permissible Restrictions &amp; Remedies
          </h3>
          <p className="mt-1 text-xs text-ink/70 sm:text-sm">
            Visualizing the delicate constitutional balance between citizen liberties, reasonable state restrictions, and judicial enforcement severity.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none rounded-lg border border-border/80 bg-paper/80 p-1 text-xs max-w-full">
          <button
            type="button"
            onClick={() => setChartTab('comparison')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all whitespace-nowrap min-h-[36px] ${
              chartTab === 'comparison'
                ? 'bg-navy text-paper shadow-2xs font-semibold'
                : 'text-ink/70 hover:text-navy'
            }`}
          >
            Restriction vs Scrutiny
          </button>
          <button
            type="button"
            onClick={() => setChartTab('radar')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all whitespace-nowrap min-h-[36px] ${
              chartTab === 'radar'
                ? 'bg-navy text-paper shadow-2xs font-semibold'
                : 'text-ink/70 hover:text-navy'
            }`}
          >
            Rights Radar
          </button>
          <button
            type="button"
            onClick={() => setChartTab('writs')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all whitespace-nowrap min-h-[36px] ${
              chartTab === 'writs'
                ? 'bg-navy text-paper shadow-2xs font-semibold'
                : 'text-ink/70 hover:text-navy'
            }`}
          >
            5 Prerogative Writs
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="mt-6 rounded-md border border-border/70 bg-paper p-3.5 sm:p-6 shadow-2xs">
        {chartTab === 'comparison' && (
          <div>
            <div className="mb-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-ink/70 font-medium text-[11px] sm:text-xs">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#d97706] shrink-0" />
                  State Restriction Scope (1–10)
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink/70 font-medium text-[11px] sm:text-xs">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#0f172a] shrink-0" />
                  Judicial Scrutiny Strictness (1–10)
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink/70 font-medium text-[11px] sm:text-xs">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#0284c7] shrink-0" />
                  Operative Articles Count
                </span>
              </div>
              <span className="text-[11px] text-ink/50 italic hidden sm:inline">
                Hover columns to inspect legal metrics
              </span>
            </div>

            <div className="h-64 w-full sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={COMPARATIVE_DATA}
                  margin={{ top: 10, right: 10, left: -25, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#334155', fontSize: 10, fontWeight: 500 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomComparativeTooltip />} />
                  <Bar
                    dataKey="restrictionLatitude"
                    name="Restriction Scope"
                    fill="#d97706"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="judicialScrutiny"
                    name="Judicial Scrutiny"
                    fill="#0f172a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="articleSpan"
                    name="Articles Count"
                    fill="#0284c7"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {chartTab === 'radar' && (
          <div>
            <div className="mb-2 text-center text-xs text-ink/60">
              Multi-axial balance: Compares Judicial Scrutiny, Violation Impact, and Restriction Latitude
            </div>
            <div className="h-72 w-full sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={COMPARATIVE_DATA}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="name"
                    tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#cbd5e1" fontSize={10} />
                  <Radar
                    name="Judicial Scrutiny"
                    dataKey="judicialScrutiny"
                    stroke="#0f172a"
                    fill="#0f172a"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Violation Severity"
                    dataKey="violationSeverity"
                    stroke="#e11d48"
                    fill="#e11d48"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="Restriction Scope"
                    dataKey="restrictionLatitude"
                    stroke="#d97706"
                    fill="#d97706"
                    fillOpacity={0.25}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    iconType="circle"
                  />
                  <Tooltip content={<CustomComparativeTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {chartTab === 'writs' && (
          <div>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
              <span className="font-semibold text-navy">
                The 5 Prerogative Constitutional Writs (Articles 32 &amp; 226)
              </span>
              <span className="text-[11px] text-ink/60">
                Direct remedies enforceable against State authorities
              </span>
            </div>

            {/* Mobile Stacked Writs View (< sm) */}
            <div className="space-y-3 sm:hidden">
              {WRIT_DISTRIBUTION_DATA.map((w) => (
                <div
                  key={`mobile-${w.writ}`}
                  className="rounded-sm border border-border bg-page/50 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-navy">
                      {w.writ}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-brass-dark bg-brass/10 px-2 py-0.5 rounded">
                      {w.speed}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-ink/90">
                    {w.fullName}
                  </p>
                  <div className="text-[11px] text-ink/65 pt-1 border-t border-border/50">
                    <span className="font-semibold text-navy/70">Target: </span>
                    {w.typicalTarget}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop / Tablet Scrollable Table (>= sm) */}
            <div className="hidden sm:block overflow-x-auto rounded-md border border-border">
              <table className="w-full border-collapse text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-border bg-paper-dim text-[11px] font-semibold uppercase tracking-wide text-ink/60">
                    <th className="py-3 px-4 font-semibold text-navy">Writ</th>
                    <th className="py-3 px-4 font-semibold text-navy">Meaning</th>
                    <th className="py-3 px-4 font-semibold text-navy">Primary Target</th>
                    <th className="py-3 px-4 font-semibold text-navy">Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-paper">
                  {WRIT_DISTRIBUTION_DATA.map((w) => (
                    <tr key={w.writ} className="hover:bg-paper-dim/50 transition-colors">
                      <td className="py-3 px-4 align-top font-mono text-[11px] font-semibold text-navy">
                        {w.writ}
                      </td>
                      <td className="py-3 px-4 align-top">
                        <span className="font-medium text-ink/90">{w.fullName}</span>
                      </td>
                      <td className="py-3 px-4 align-top text-ink/70">{w.typicalTarget}</td>
                      <td className="py-3 px-4 align-top text-brass-dark font-semibold">{w.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink/60">
              These writs are typically invoked in cases of illegal custody, an unperformed public duty, jurisdictional excess, or ultra vires acts.
            </p>

            <p className="mt-3 border-l-2 border-navy/30 pl-3 text-xs leading-relaxed text-ink/70">
              <strong className="font-semibold text-navy">Article 13 doctrine: </strong>
              Any law, police rule, or executive notification inconsistent with Fundamental Rights is automatically void ab initio.
            </p>
          </div>
        )}
      </div>

      {/* Doctrinal Insight Bar */}
      <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
        <div className="flex items-start gap-3 sm:pr-5">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-navy" />
          <div>
            <h6 className="text-xs font-semibold text-navy">Non-Suspendable Articles</h6>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink/70">
              Articles 20 &amp; 21 can <em>never</em> be suspended, even during a Proclamation of National Emergency (44th Amendment).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:px-5">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-brass-dark" />
          <div>
            <h6 className="text-xs font-semibold text-navy">Reasonable Restrictions</h6>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink/70">
              Rights are not absolute. State restrictions must satisfy the <strong>Proportionality Test</strong> and statutory grounds.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:pl-5">
          <Gavel size={16} className="mt-0.5 shrink-0 text-navy" />
          <div>
            <h6 className="text-xs font-semibold text-navy">Writ Jurisdiction</h6>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink/70">
              Direct access to High Court (Art. 226) or Supreme Court (Art. 32) without undergoing protracted trial court delays.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
