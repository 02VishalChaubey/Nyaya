import React, { useState } from 'react'
import { Landmark, Search, BookOpen, ChevronRight, Scale, Info } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import { fetchLandmarkCases } from '../api/client.js'
import { landmarkCases as fallbackLandmarkCases } from '../data/rights.js'

export default function LandmarkCasesSection() {
  const [filterArticle, setFilterArticle] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: casesData } = useApi(
    fetchLandmarkCases,
    [],
    fallbackLandmarkCases
  )

  const landmarkCases = casesData || fallbackLandmarkCases

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
    <section id="landmark-cases" className="my-14 rounded-2xl border border-navy/15 bg-paper p-6 sm:p-9 shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brass-dark/10 text-brass-dark">
              <Landmark size={16} />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
              Constitutional Jurisprudence
            </span>
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-navy sm:text-2xl">
            Landmark Supreme Court Cases
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-2xl leading-relaxed">
            These historic judgments by the Supreme Court of India shaped the interpretation, reasonable restrictions, and inviolable limits of Part III Fundamental Rights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case, article, doctrine..."
              className="w-full rounded-lg border border-border bg-page/50 py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
            />
          </div>

          <select
            value={filterArticle}
            onChange={(e) => setFilterArticle(e.target.value)}
            className="rounded-lg border border-border bg-page/50 px-3 py-1.5 text-xs font-medium text-navy focus:border-navy focus:bg-paper focus:outline-none focus:ring-1 focus:ring-navy"
          >
            {articles.map((art) => (
              <option key={art.value} value={art.value}>
                {art.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-border/80 bg-page/30">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 bg-page text-[11px] font-bold uppercase tracking-wider text-ink/60">
              <th className="py-3.5 px-4 font-semibold text-navy">Case Name</th>
              <th className="py-3.5 px-4 font-semibold text-navy">Related Article / Right</th>
              <th className="py-3.5 px-4 font-semibold text-navy">Importance &amp; Constitutional Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-paper">
            {filteredCases.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-page/50 transition-colors"
              >
                <td className="py-3.5 px-4 font-semibold text-navy">
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
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center rounded-md border border-navy/15 bg-navy/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-navy">
                    {c.relatedArticle}
                  </span>
                </td>
                <td className="py-3.5 px-4 leading-relaxed text-ink/80">
                  <p className="font-medium text-ink/90">{c.importance}</p>
                  {c.keyTakeaway && (
                    <p className="mt-1 text-[11px] text-ink/60 italic">
                      {c.keyTakeaway}
                    </p>
                  )}
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
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-navy/5 p-3 text-xs text-ink/70">
        <Info size={15} className="mt-0.5 shrink-0 text-navy" />
        <span>
          <strong>Judicial Evolution:</strong> The Supreme Court expanded Article 21 from a narrow procedural check in <em>A.K. Gopalan</em> (1950) into an expansive umbrella covering dignity, speedy trial, clean environment, and privacy (<em>Maneka Gandhi</em> &amp; <em>Puttaswamy</em>).
        </span>
      </div>
    </section>
  )
}
