import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Building2,
  ArrowRight,
  Sparkles,
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
      accent: 'text-cyan-600 bg-cyan-50 border-cyan-200 dark:bg-cyan-950/40 dark:border-cyan-500/30',
      badgeColor: 'border-cyan-500/40 text-cyan-700 bg-cyan-500/10',
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
      accent: 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-500/30',
      badgeColor: 'border-amber-500/40 text-amber-800 bg-amber-500/10',
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

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-paper/90 shadow-sm backdrop-blur-md">
      {/* Background ambient texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-10 lg:p-12">
        {/* Header with Title and Branch Selectors */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="article-tab">Interactive Architecture</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-brass-dark">
                <Sparkles size={12} /> न्याय वृक्ष • Chart Tree
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Hierarchy of Indian Law &amp; Justice
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
              Explore how India’s supreme charter branches into constitutional rights, court jurisdictions, and codified laws. Click any node to navigate directly to detailed explanations.
            </p>
          </div>

          {/* Interactive Branch Filters */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveBranchId('all')}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeBranchId === 'all'
                  ? 'bg-navy text-paper shadow-xs ring-2 ring-navy/20'
                  : 'border border-border/80 bg-paper text-ink/70 hover:border-navy hover:text-navy'
              }`}
            >
              Complete Tree
            </button>
            {TREE_DATA.branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBranchId(b.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeBranchId === b.id
                    ? 'bg-navy text-paper shadow-xs ring-2 ring-navy/20'
                    : 'border border-border/80 bg-paper text-ink/70 hover:border-navy hover:text-navy'
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
            className="group relative flex w-full max-w-xl flex-col items-center rounded-xl border-2 border-brass/70 bg-linear-to-b from-paper to-amber-500/5 p-6 text-center shadow-xs transition-all hover:border-brass-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brass"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brass/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brass-dark">
                {TREE_DATA.root.badge}
              </span>
              <span className="font-serif text-xs font-medium text-ink/60">
                {TREE_DATA.root.hindi}
              </span>
            </div>
            <h4 className="mt-2 text-xl font-bold text-navy group-hover:text-brass-dark transition-colors sm:text-2xl">
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

          {/* SVG Tree Connectors Line */}
          <div className="relative flex h-14 w-full max-w-4xl items-center justify-center">
            {/* Vertical stem from root */}
            <div className="absolute top-0 h-7 w-0.5 bg-linear-to-b from-brass to-navy/40" />
            {/* Horizontal distribution bar */}
            <div className="absolute top-7 hidden h-0.5 w-[85%] bg-navy/30 lg:block" />
            {/* Branch drops */}
            <div className="absolute top-7 left-[10%] hidden h-7 w-0.5 bg-cyan-500/50 lg:block" />
            <div className="absolute top-7 left-1/2 hidden h-7 w-0.5 -translate-x-1/2 bg-amber-500/50 lg:block" />
            <div className="absolute top-7 right-[10%] hidden h-7 w-0.5 bg-indigo-500/50 lg:block" />
          </div>
        </div>

        {/* Tree Branches Grid */}
        <div
          className={`mt-2 grid gap-6 ${
            activeBranchId === 'all'
              ? 'lg:grid-cols-3'
              : 'max-w-3xl mx-auto grid-cols-1'
          }`}
        >
          {(activeBranchId === 'all' ? TREE_DATA.branches : [activeBranch].filter(Boolean)).map((branch) => {
            const Icon = branch.icon
            return (
              <div
                key={branch.id}
                className="flex flex-col rounded-xl border border-border/90 bg-paper p-5 sm:p-6 shadow-xs transition-all hover:border-navy/40 hover:shadow-cardHover"
              >
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${branch.accent}`}>
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-navy">{branch.name}</h5>
                      </div>
                      <span className="text-[11px] font-medium text-ink/55">
                        {branch.hindi}
                      </span>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${branch.badgeColor}`}>
                    {branch.scope}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-ink/70">
                  {branch.summary}
                </p>

                {/* Branch Sub-Nodes (Leaf nodes) */}
                <div className="mt-4 flex flex-1 flex-col gap-2.5 border-t border-border/60 pt-4">
                  {branch.nodes.map((node) => (
                    <Link
                      key={node.id}
                      to={node.to}
                      className="group relative flex flex-col rounded-lg border border-border/70 bg-paper-dim/40 p-3 transition-all hover:border-navy hover:bg-paper hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-navy"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-navy group-hover:text-brass-dark transition-colors">
                          {node.title}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] font-semibold text-ink/50 group-hover:text-navy">
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
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md border border-navy/20 bg-paper py-2 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5"
                >
                  <span>Explore All {branch.name}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )
          })}

          {/* Background Image Showcase Card in place of Codified Legal Acts */}
          {activeBranchId === 'all' && (
            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-navy/30 bg-navy p-6 sm:p-7 shadow-xs transition-all hover:shadow-md min-h-[380px]"
              style={{
                backgroundImage: "url('/enmachi-bg.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Deep atmospheric overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#050B14]/90 via-[#050B14]/80 to-[#0B172E]/95"
              />

              {/* Decorative Subtle Background Pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -bottom-12 h-52 w-52 opacity-20"
                style={{
                  backgroundImage: "url('/images/bg-legal-pattern.svg')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-brass/40 bg-brass/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brass-light">
                    Lex Suprema • संप्रभुता
                  </span>
                  <span className="font-serif text-xs font-semibold text-brass-light/80">
                    न्याय • विधि • ज्ञान
                  </span>
                </div>

                <h5 className="mt-4 text-xl font-bold text-white tracking-tight">
                  Sovereign Constitutional Order
                </h5>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  The constitutional canopy under which every citizen right and judicial remedy thrives.
                </p>

                {/* 3D Visual Tree Illustration */}
                <div className="mt-6 flex items-center justify-center py-2">
                  <img
                    src="/images/3d-justice-tree.svg"
                    alt="3D Sovereign Constitutional Tree"
                    referrerPolicy="no-referrer"
                    className="h-32 w-32 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium text-brass-light">Dharma &amp; Constitution</span>
                  <Link
                    to="/laws"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 hover:text-white transition-colors"
                  >
                    Browse All Indian Acts <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3D Visual Overview Section in the Tree Footer */}
        <div className="mt-10 rounded-xl border border-navy/15 bg-linear-to-r from-navy/5 via-paper to-cyan-500/5 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-lg text-center lg:text-left">
              <span className="article-tab mb-2">3D Perspective</span>
              <h4 className="text-lg font-bold text-navy sm:text-xl">
                Isometric Hierarchy of Constitutional Order
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-ink/70 sm:text-sm">
                No individual statute or police action in India can override the fundamental guarantees enshrined in Part III of the Constitution. Every district court and police station operates beneath the overarching canopy of the Supreme Court and High Courts.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/legal-terms"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark transition-colors"
                >
                  Glossary &amp; Writs <ArrowRight size={12} />
                </Link>
                <span className="text-ink/30">•</span>
                <Link
                  to="/laws"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-cyan-700 transition-colors"
                >
                  Browse Statutory Codes <ArrowRight size={12} />
                </Link>
                <span className="text-ink/30">•</span>
                <Link
                  to="/harmed"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-indigo-700 transition-colors"
                >
                  Citizen Grievance Tool <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center">
              <div className="relative h-48 w-72 sm:h-56 sm:w-96">
                <img
                  src="/images/3d-legal-tree.svg"
                  alt="3D Isometric Legal Hierarchy Tree Illustration"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
