import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Building2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

const TREE_DATA = {
  root: {
    title: 'Constitution of India (1950)',
    subtitle: 'The Supreme Law of the Republic',
    hindi: 'भारत का संविधान',
    description:
      'The foundational charter establishing sovereign democratic governance, fundamental citizen entitlements, and separation of powers between Legislature, Executive, and Judiciary.',
    badge: 'Supreme Lex',
    to: '/laws',
  },
  branches: [
    {
      id: 'rights',
      name: 'Fundamental Rights',
      hindi: 'मौलिक अधिकार',
      scope: 'Part III • Articles 12–35',
      icon: BookOpen,
      accent: 'text-navy bg-navy/5 border-navy/20',
      badgeColor: 'border-navy/25 text-navy bg-navy/5',
      summary:
        'Enforceable constitutional rights protecting liberty, dignity, equality, and free expression against state overreach.',
      to: '/fundamental-rights',
      nodes: [
        {
          id: 'equality',
          title: 'Right to Equality',
          articles: 'Arts. 14–18',
          details: 'Rule of law, equal protection, prohibition of discrimination by caste, gender, religion, or birth.',
          to: '/laws/indian-contract-1872',
        },
        {
          id: 'freedom',
          title: 'Right to Freedom & Speech',
          articles: 'Arts. 19–22',
          details: 'Freedom of speech, peaceful assembly, movement, occupation, and protection in respect of conviction.',
          to: '/laws/bnss-2023',
        },
        {
          id: 'liberty',
          title: 'Protection of Life & Liberty',
          articles: 'Article 21',
          details: 'Core human right to dignified life, privacy, speedy trial, medical care, and legal counsel.',
          to: '/laws/bns-2023',
        },
        {
          id: 'remedies',
          title: 'Constitutional Remedies (Writs)',
          articles: 'Article 32',
          details: 'Guaranteed right to move courts directly for enforcement of rights and citizen grievance redress.',
          to: '/harmed',
        },
      ],
    },
    {
      id: 'judiciary',
      name: 'Judicial Hierarchy',
      hindi: 'न्यायपालिका सोपान',
      scope: 'Articles 124–147, 214–237',
      icon: Building2,
      accent: 'text-brass-dark bg-brass/5 border-brass/30',
      badgeColor: 'border-brass/40 text-brass-dark bg-brass/10',
      summary:
        'Integrated single judicial system that adjudicates legal disputes, interprets laws, and issues binding constitutional writs.',
      to: '/legal-terms',
      nodes: [
        {
          id: 'sc',
          title: 'Supreme Court of India (Apex)',
          articles: 'Arts. 32, 136, 142',
          details: 'Highest constitutional court and final appellate authority. Law declared is binding on all Indian courts.',
          to: '/legal-terms#pil',
        },
        {
          id: 'hc',
          title: 'High Courts of States (25 Courts)',
          articles: 'Articles 226 & 227',
          details: 'State apex courts with wide powers to issue writs for both fundamental and legal rights violation.',
          to: '/legal-terms#writ',
        },
        {
          id: 'subordinate',
          title: 'District & Sessions Courts',
          articles: 'Trial Level',
          details: 'Primary forums handling civil suits, bail applications, property disputes, and criminal trials.',
          to: '/laws?category=criminal',
        },
      ],
    },
  ],
}

export default function LegalTreeChart() {
  const [activeBranchId, setActiveBranchId] = useState('all')

  const activeBranch = TREE_DATA.branches.find((b) => b.id === activeBranchId)
  const isAll = activeBranchId === 'all'

  return (
    <div className="rounded-md border border-border bg-paper">
      <div className="p-6 sm:p-10 lg:p-12">
        {/* Header with Title and Branch Selectors */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-1 block">Interactive Architecture</span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Hierarchy of Indian Law &amp; Justice
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
              Explore how India's supreme charter branches into constitutional rights, court jurisdictions, and codified laws. Click any node to navigate directly to detailed explanations.
            </p>
          </div>

          {/* Branch filters — these represent an actual filter, so pill styling applies */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveBranchId('all')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                isAll
                  ? 'bg-navy text-paper'
                  : 'border border-border text-ink/70 hover:border-navy hover:text-navy'
              }`}
            >
              Complete Tree
            </button>
            {TREE_DATA.branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBranchId(b.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeBranchId === b.id
                    ? 'bg-navy text-paper'
                    : 'border border-border text-ink/70 hover:border-navy hover:text-navy'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tree Root Node: Constitution of India */}
        <div className="mt-10 flex flex-col items-center">
          <Link
            to={TREE_DATA.root.to}
            className="group relative flex w-full max-w-xl flex-col items-center rounded-md border-2 border-brass/70 bg-paper p-6 text-center transition-colors hover:border-brass-dark focus:outline-none focus:ring-2 focus:ring-brass"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brass/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brass-dark">
                {TREE_DATA.root.badge}
              </span>
              <span className="font-serif text-xs font-medium text-ink/60">
                {TREE_DATA.root.hindi}
              </span>
            </div>
            <h4 className="mt-2 font-display text-xl font-semibold text-navy group-hover:text-brass-dark transition-colors sm:text-2xl">
              {TREE_DATA.root.title}
            </h4>
            <p className="mt-1 text-xs font-medium text-brass-dark sm:text-sm">
              {TREE_DATA.root.subtitle}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink/70 sm:text-sm">
              {TREE_DATA.root.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-brass-dark transition-colors">
              Explore All Statutory Acts &amp; Codes <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tree connector lines */}
          <div className="relative flex h-14 w-full max-w-4xl items-center justify-center">
            <div className="absolute top-0 h-7 w-0.5 bg-navy/25" />
            <div className="absolute top-7 hidden h-0.5 w-[70%] bg-navy/20 lg:block" />
            <div className="absolute top-7 left-[15%] hidden h-7 w-0.5 bg-navy/25 lg:block" />
            <div className="absolute top-7 right-[15%] hidden h-7 w-0.5 bg-navy/25 lg:block" />
          </div>
        </div>

        {/* Tree Branches Grid */}
        <div className={`mt-2 grid gap-6 ${isAll ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto grid-cols-1'}`}>
          {(isAll ? TREE_DATA.branches : [activeBranch].filter(Boolean)).map((branch) => {
            const Icon = branch.icon
            return (
              <div
                key={branch.id}
                className="flex flex-col rounded-md border border-border bg-paper p-5 sm:p-6 transition-colors hover:border-navy/40"
              >
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border ${branch.accent}`}>
                      <Icon size={18} />
                    </span>
                    <div>
                      <h5 className="font-display font-semibold text-navy">{branch.name}</h5>
                      <span className="text-[11px] font-medium text-ink/55">
                        {branch.hindi}
                      </span>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${branch.badgeColor}`}>
                    {branch.scope}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-ink/70">
                  {branch.summary}
                </p>

                {/* Branch Sub-Nodes (Leaf nodes) */}
                <div className="mt-4 flex flex-1 flex-col gap-2.5 border-t border-border pt-4">
                  {branch.nodes.map((node) => (
                    <Link
                      key={node.id}
                      to={node.to}
                      className="group relative flex flex-col rounded-sm border border-border p-3 transition-colors hover:border-navy hover:bg-paper-dim/40 focus:outline-none focus:ring-2 focus:ring-navy"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-navy group-hover:text-brass-dark transition-colors">
                          {node.title}
                        </span>
                        <span className="shrink-0 text-[10px] font-medium text-ink/50 group-hover:text-navy">
                          {node.articles}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-ink/65">
                        {node.details}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-brass-dark opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Read Section</span>
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Explore Branch Footer Link */}
                <Link
                  to={branch.to}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded border border-navy/20 bg-paper py-2 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5"
                >
                  <span>Explore All {branch.name}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Closing summary + related links */}
        <div className="mt-10 border-t border-border pt-8">
          <div className="max-w-2xl">
            <h4 className="font-display text-lg font-semibold text-navy">
              No law overrides the Constitution
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              No individual statute or police action in India can override the fundamental guarantees enshrined in Part III of the Constitution. Every district court and police station operates beneath the overarching authority of the Supreme Court and High Courts.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                to="/legal-terms"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark transition-colors"
              >
                Glossary &amp; Writs <ArrowRight size={12} />
              </Link>
              <Link
                to="/laws"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark transition-colors"
              >
                Browse Statutory Codes <ArrowRight size={12} />
              </Link>
              <Link
                to="/harmed"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark transition-colors"
              >
                Citizen Grievance Tool <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
