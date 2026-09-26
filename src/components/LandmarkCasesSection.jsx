import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { landmarkCases } from '../data/rights.js'
import SourceBadge from './SourceBadge.jsx'
import SourceReference from './SourceReference.jsx'

export default function LandmarkCasesSection() {
  const [filterArticle, setFilterArticle] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const articles = [
    { value: 'all', label: 'All Cases (9)' },
    { value: 'Article 21', label: 'Article 21 (Life & Liberty)' },
    { value: 'Article 19', label: 'Article 19 (Freedoms)' },
    { value: 'Articles 14', label: 'Articles 14 & 16 (Equality)' },
    { value: 'Basic Structure', label: 'Basic Structure / DPSP' },
  ]

  const filteredCases = landmarkCases.filter((item) => {
    const matchesFilter =
      filterArticle === 'all' ||
      item.relatedArticle.toLowerCase().includes(filterArticle.toLowerCase())
    const matchesSearch =
      !searchQuery ||
      item.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.relatedArticle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.importance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.keyTakeaway &&
        item.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <section id="landmark-cases" className="my-14 border-b border-border pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">Constitutional Jurisprudence</span>
          <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
            Landmark Supreme Court Cases
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-2xl leading-relaxed">
            These historic judgments by the Supreme Court of India shaped the interpretation, reasonable restrictions, and inviolable limits of Part III Fundamental Rights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case, article, doctrine..."
              className="w-full rounded-sm border border-border bg-page/70 py-2 pl-8 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>

          <select
            value={filterArticle}
            onChange={(e) => setFilterArticle(e.target.value)}
            className="w-full sm:w-auto rounded-sm border border-border bg-page/70 px-3 py-2 text-xs font-medium text-navy focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
          >
            {articles.map((art) => (
              <option key={art.value} value={art.value}>
                {art.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Stacked Card View (< md) - Prevents tiny text and awkward horizontal scrolling */}
      <div className="mt-6 space-y-3.5 md:hidden">
        {filteredCases.map((c) => (
          <article
            key={`mobile-${c.id}`}
            className="rounded-sm border border-border bg-paper p-4 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2.5">
              <div>
                <h3 className="text-sm font-bold text-navy leading-snug">
                  {c.caseName}
                </h3>
                {c.year && (
                  <span className="font-mono text-[11px] text-ink/50 mt-0.5 block">
                    {c.year} • Supreme Court of India
                  </span>
                )}
              </div>
              <span className="inline-flex shrink-0 items-center rounded border border-navy/15 bg-navy/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-navy">
                {c.relatedArticle}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink/50 block mb-0.5">
                Constitutional Significance
              </span>
              <p className="text-xs leading-relaxed text-ink/85 font-medium">
                {c.importance}
              </p>
            </div>

            {c.keyTakeaway && (
              <div className="rounded-xs bg-stone-50 border border-border/70 p-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-navy/70 block mb-0.5">
                  Core Ratio / Takeaway
                </span>
                <p className="text-xs leading-relaxed text-ink/75 italic">
                  "{c.keyTakeaway}"
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
              <span className="text-ink/60 font-mono">Binding precedent</span>
              <SourceBadge verified={false} />
            </div>
          </article>
        ))}
      </div>

      {/* Desktop/Tablet Table View (>= md) with smooth horizontal scroll capability */}
      <div className="mt-6 hidden md:block overflow-x-auto rounded-md border border-border/80 bg-page/30">
        <table className="w-full border-collapse text-left text-xs min-w-[640px]">
          <thead>
            <tr className="border-b border-border/80 bg-page text-[11px] font-bold uppercase tracking-wider text-ink/60">
              <th className="py-3.5 px-4 font-semibold text-navy w-1/4">Case Name</th>
              <th className="py-3.5 px-4 font-semibold text-navy w-1/5">Related Article / Right</th>
              <th className="py-3.5 px-4 font-semibold text-navy w-2/5">Importance &amp; Constitutional Impact</th>
              <th className="py-3.5 px-4 font-semibold text-navy w-16">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-paper">
            {filteredCases.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-page/50 transition-colors"
              >
                <td className="py-3.5 px-4 font-semibold text-navy align-top">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-navy">
                      {c.caseName}
                    </span>
                    {c.year && (
                      <span className="font-mono text-[11px] text-ink/50">
                        {c.year} • Supreme Court
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="inline-flex items-center rounded-md border border-navy/15 bg-navy/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-navy">
                    {c.relatedArticle}
                  </span>
                </td>
                <td className="py-3.5 px-4 leading-relaxed text-ink/80 align-top">
                  <p className="font-medium text-ink/90">{c.importance}</p>
                  {c.keyTakeaway && (
                    <p className="mt-1 text-[11px] text-ink/60 italic">
                      {c.keyTakeaway}
                    </p>
                  )}
                </td>
                <td className="py-3.5 px-4 align-top">
                  <SourceBadge verified={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCases.length === 0 && (
        <div className="py-8 text-center text-xs text-ink/60">
          No cases match your search or filter.
        </div>
      )}

      {/* Summary Note */}
      <p className="mt-5 border-l-2 border-navy/30 pl-3 text-xs leading-relaxed text-ink/70">
        <strong className="font-semibold text-navy">Judicial evolution: </strong>
        The Supreme Court expanded Article 21 from a narrow procedural check in <em>A.K. Gopalan</em> (1950) into an expansive umbrella covering dignity, speedy trial, clean environment, and privacy (<em>Maneka Gandhi</em> &amp; <em>Puttaswamy</em>).
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <SourceReference sourceLabel={null} sourceUrl={null} verifiedNote={null} />
      </div>
    </section>
  )
}
