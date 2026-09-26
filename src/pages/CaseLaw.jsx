import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Scale, Search, ShieldCheck, ArrowRight } from 'lucide-react'
import SourcesVerification from '../components/SourcesVerification.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { landmarkCases } from '../data/rights.js'

export default function CaseLaw() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')

  const tags = useMemo(() => {
    const set = new Set()
    landmarkCases.forEach((c) => {
      if (c.relatedArticle) {
        c.relatedArticle.split(/,|and/).forEach((t) => {
          const clean = t.trim()
          if (clean) set.add(clean)
        })
      }
    })
    return ['all', ...Array.from(set)]
  }, [])

  const filteredCases = useMemo(() => {
    return landmarkCases.filter((c) => {
      const matchesSearch =
        c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.year.includes(searchQuery) ||
        c.importance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.relatedArticle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag =
        selectedTag === 'all' ||
        c.relatedArticle.toLowerCase().includes(selectedTag.toLowerCase())

      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-5xl">
        {/* Header */}
        <header className="border-b border-border/80 pb-8 sm:pb-12">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <Landmark size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Judicial Precedents &amp; Precedential Doctrine</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight">
            Constitutional Case Law
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed max-w-3xl">
            In Indian jurisprudence, statutory law is interpreted and shaped by binding judgments of the Supreme Court of India under Article 141 of the Constitution. Below are seminal precedents that define fundamental liberties, basic structure, procedural justice, and personal autonomy.
          </p>
        </header>

        {/* Expandable Sources & Verification System */}
        <SourcesVerification
          className="mt-6"
          sources={[
            {
              documentName: 'Supreme Court of India Official Repository & Judgments (Art. 141)',
              sourceName: 'Supreme Court of India (main.sci.gov.in)',
              sourceUrl: 'https://main.sci.gov.in',
              lastVerified: 'Supreme Court Registry & National Judicial Data Grid (NJDG)',
              sourceType: 'official',
              citation: 'Art. 141 (Binding Precedent) & Art. 32 (Writ Jurisdiction)',
              notes: 'Official repository of constitutional bench decisions, signed judgments, and certified orders of the Supreme Court of India.',
            },
            {
              documentName: 'Constitutional Bench Analytical Digest & Ratio Decidendi Summaries',
              sourceName: 'Nyaya Constitutional Law Digest (SCR / AIR / SCC concordances)',
              sourceUrl: null,
              lastVerified: 'Cross-verified against official court records',
              sourceType: 'secondary',
              citation: 'Digest of Landmark Constitutional Judgments',
              notes: 'Paraphrased summaries of procedural and fundamental rights holdings created for public legal literacy.',
            },
          ]}
        />

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <label htmlFor="case-law-search" className="sr-only">
              Search by case name, year, or article
            </label>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50" aria-hidden="true" />
            <input
              id="case-law-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case name, year, or article..."
              className="w-full h-10 pl-9 pr-3 rounded-sm border border-border bg-page text-sm placeholder:text-ink/60 focus:border-navy focus:bg-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter judgments by topic">
            <span className="text-xs font-mono text-ink/60 uppercase">Filter:</span>
            {['all', 'Article 21', 'Article 19', 'Article 14', 'Basic Structure'].map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-2.5 py-1 min-h-[36px] rounded-xs transition-colors whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                  selectedTag === tag
                    ? 'bg-navy text-white font-medium'
                    : 'bg-page border border-border text-ink/70 hover:text-navy hover:bg-page/80'
                }`}
              >
                {tag === 'all' ? 'All Judgments' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Judgments Grid */}
        <div className="mt-8 space-y-4">
          {filteredCases.map((c) => (
            <article
              key={c.id}
              className="rounded-sm border border-border bg-white p-5 sm:p-6 transition-all hover:border-navy/50 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-navy">
                    {c.caseName}
                  </h2>
                  <span className="font-mono text-xs text-brass-dark font-medium px-2 py-0.5 rounded-xs bg-page border border-border/80">
                    {c.year}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ink/60">
                    <Scale size={13} className="text-navy/60" />
                    <span className="font-medium text-navy">{c.relatedArticle}</span>
                  </div>
                  <BookmarkButton
                    item={{
                      id: `case-${c.id}`,
                      title: `${c.caseName} (${c.year})`,
                      category: `Landmark Case · ${c.relatedArticle}`,
                      type: 'case',
                      description: `${c.importance} — ${c.keyTakeaway}`,
                      url: `/case-law`,
                    }}
                    size="sm"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
                <div>
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/50">
                    Constitutional Significance
                  </h3>
                  <p className="mt-1 text-ink/80 leading-relaxed font-sans">
                    {c.importance}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy/70">
                    Ratio Decidendi &amp; Core Takeaway
                  </h3>
                  <p className="mt-1 text-ink/90 leading-relaxed font-sans bg-stone-50 p-2.5 rounded-xs border border-border/70">
                    {c.keyTakeaway}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-ink/60">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <ShieldCheck size={12} className="text-emerald-700" />
                  Binding under Art. 141
                </span>
                <Link
                  to="/fundamental-rights"
                  className="inline-flex items-center gap-1 font-medium text-brass-dark hover:text-navy hover:underline"
                >
                  <span>Explore related constitutional rights</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </article>
          ))}

          {filteredCases.length === 0 && (
            <div className="rounded-sm border border-border bg-page p-8 text-center text-sm text-ink/60">
              No landmark judgments matching your search criteria. Try adjusting the filter.
            </div>
          )}
        </div>

        {/* Institutional Note */}
        <div className="mt-12 rounded-sm border border-border/80 bg-stone-50 p-5 text-xs text-ink/75 leading-relaxed">
          <strong className="text-navy font-semibold">Note on Judicial Citations:</strong> This digest highlights foundational constitutional judgments for general educational understanding. For official court transcripts, law reporter citations (AIR, SCC, SCR), and full bench opinions, refer directly to the Supreme Court of India repository (main.sci.gov.in) or National Judicial Data Grid.
        </div>
      </div>
    </div>
  )
}
