import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  BookOpen,
  FileText,
  Gavel,
  BookMarked,
  Compass,
  ArrowRight,
  ArrowLeftRight,
  ShieldCheck,
  ChevronRight,
  Layers,
} from 'lucide-react'
import { getRelatedInformation } from '../utils/relatedInformationEngine.js'

/**
 * Reusable "Related Information" Component for Nyaya
 * Renders verified statutory, constitutional, precedential, and procedural
 * connections derived deterministically from the dataset.
 */
export default function RelatedInformation({
  type = 'article',
  id,
  sectionNumber,
  articleNumber,
  lawId,
  title,
  subtitle,
  compact = false,
  className = '',
}) {
  const data = getRelatedInformation({
    type,
    id,
    sectionNumber,
    articleNumber,
    lawId,
  })

  const [activeTab, setActiveTab] = useState('all')

  if (!data || data.totalConnections === 0) {
    return null
  }

  // Compact variant for embedding inside section cards, sidebars, or drawers
  if (compact) {
    return (
      <div className={`rounded-sm border border-stone-200 bg-[#FBF9F5] p-3 text-xs ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-stone-200/80 mb-2.5">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-navy/70">
            <Layers size={13} className="text-brass-dark" />
            <span>Statutory Connections</span>
          </div>
          <span className="text-[10px] font-mono text-ink/40">
            {data.totalConnections} verified links
          </span>
        </div>

        <div className="space-y-2">
          {/* Related Articles */}
          {data.relatedArticles.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase text-ink/50 block mb-1">
                Constitutional Basis
              </span>
              <div className="flex flex-wrap gap-1">
                {data.relatedArticles.slice(0, 3).map((art) => (
                  <Link
                    key={art.id}
                    to={art.url}
                    className="inline-flex items-center gap-1 rounded-xs bg-white border border-stone-200 px-2 py-0.5 text-[11px] font-medium text-navy hover:border-brass hover:text-brass-dark transition-colors"
                  >
                    <Scale size={10} className="text-brass-dark" />
                    <span>{art.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Sections */}
          {data.relatedSections.length > 0 && (
            <div className="pt-1.5 border-t border-stone-200/60">
              <span className="text-[10px] font-mono uppercase text-ink/50 block mb-1">
                Related Clauses
              </span>
              <div className="space-y-1">
                {data.relatedSections.slice(0, 2).map((sec) => (
                  <Link
                    key={sec.id}
                    to={sec.url}
                    className="group block text-[11px] text-ink/80 hover:text-navy"
                  >
                    <span className="font-medium text-navy group-hover:underline">
                      {sec.title}
                    </span>
                    {sec.relationReason && (
                      <span className="text-ink/50 text-[10px] ml-1.5 hidden sm:inline">
                        — {sec.relationReason}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms */}
          {data.relatedTerms.length > 0 && (
            <div className="pt-1.5 border-t border-stone-200/60">
              <span className="text-[10px] font-mono uppercase text-ink/50 block mb-1">
                Codified Terms
              </span>
              <div className="flex flex-wrap gap-1">
                {data.relatedTerms.slice(0, 3).map((t) => (
                  <Link
                    key={t.id}
                    to={t.url}
                    className="inline-flex items-center gap-0.5 rounded-xs bg-white border border-stone-200 px-1.5 py-0.5 text-[11px] text-ink/80 hover:text-brass-dark hover:border-brass transition-colors"
                  >
                    <span>{t.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Case */}
          {data.relatedCases.length > 0 && (
            <div className="pt-1.5 border-t border-stone-200/60">
              <span className="text-[10px] font-mono uppercase text-ink/50 block mb-1">
                Key Judicial Precedent
              </span>
              <Link
                to={data.relatedCases[0].url}
                className="group block text-[11px] text-ink/80 hover:text-navy"
              >
                <div className="font-serif font-semibold text-navy group-hover:text-brass-dark">
                  {data.relatedCases[0].title}
                </div>
                <div className="text-[10px] text-ink/60 line-clamp-1 mt-0.5">
                  {data.relatedCases[0].ruling}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Full Editorial Bottom-of-Page Architecture
  const displayTitle = title || 'Statutory Connections & Jurisprudential Links'
  const displaySubtitle =
    subtitle ||
    `Verified relationships linking this provision across Part III of the Constitution, procedural codes, binding Supreme Court case law, and practical citizen guides.`

  return (
    <section
      aria-label="Related Legal Information"
      className={`rounded-sm border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 mt-12 mb-6 ${className}`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass-dark mb-1.5">
            <Layers size={14} />
            <span>Statutory Knowledge Graph</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy tracking-tight">
            {displayTitle}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-3xl leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xs bg-stone-100 border border-stone-200 px-2.5 py-1 text-[11px] font-mono text-ink/60 shrink-0">
          <ShieldCheck size={13} className="text-forest" />
          <span>{data.totalConnections} Verified Connections</span>
        </div>
      </div>

      {/* Filter Tabs for quick indexing */}
      <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200/60 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-xs transition-colors ${
            activeTab === 'all'
              ? 'bg-navy text-white font-semibold'
              : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
          }`}
        >
          All Connections ({data.totalConnections})
        </button>

        {data.relatedArticles.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1 rounded-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'articles'
                ? 'bg-navy text-white font-semibold'
                : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
            }`}
          >
            <span>Constitution</span>
            <span className="text-[10px] font-mono opacity-80">({data.relatedArticles.length})</span>
          </button>
        )}

        {data.relatedSections.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1 rounded-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'sections'
                ? 'bg-navy text-white font-semibold'
                : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
            }`}
          >
            <span>Sections</span>
            <span className="text-[10px] font-mono opacity-80">({data.relatedSections.length})</span>
          </button>
        )}

        {data.relatedCases.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1 rounded-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'cases'
                ? 'bg-navy text-white font-semibold'
                : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
            }`}
          >
            <span>Precedents</span>
            <span className="text-[10px] font-mono opacity-80">({data.relatedCases.length})</span>
          </button>
        )}

        {data.relatedTerms.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1 rounded-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-navy text-white font-semibold'
                : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
            }`}
          >
            <span>Legal Terms</span>
            <span className="text-[10px] font-mono opacity-80">({data.relatedTerms.length})</span>
          </button>
        )}

        {data.relatedGuides.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1 rounded-xs transition-colors flex items-center gap-1.5 ${
              activeTab === 'guides'
                ? 'bg-navy text-white font-semibold'
                : 'text-ink/60 hover:text-navy hover:bg-stone-200/50'
            }`}
          >
            <span>Guides</span>
            <span className="text-[10px] font-mono opacity-80">({data.relatedGuides.length})</span>
          </button>
        )}
      </div>

      {/* Main Content Sections */}
      <div className="mt-6 space-y-6">
        {/* STATUTORY CONCORDANCE (IPC ↔ BNS) NOTICE IF RELEVANT */}
        {data.relatedConcordance && (activeTab === 'all' || activeTab === 'sections') && (
          <div className="rounded-sm border border-brass/30 bg-amber-50/40 p-4">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-brass-dark font-semibold">
                <ArrowLeftRight size={13} />
                <span>Statutory Transition Concordance</span>
              </span>
              <span className="text-[11px] font-semibold text-forest">
                {data.relatedConcordance.badge}
              </span>
            </div>
            <h4 className="font-serif text-sm font-bold text-navy">
              {data.relatedConcordance.title}
            </h4>
            <p className="mt-1 text-xs text-ink/75 leading-relaxed">
              {data.relatedConcordance.difference}
            </p>
            <div className="mt-2.5">
              <Link
                to={data.relatedConcordance.url}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brass-dark hover:text-navy"
              >
                <span>View Full IPC ↔ BNS Comparison Dossier</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* SECTION 1: CONSTITUTIONAL ARTICLES */}
        {(activeTab === 'all' || activeTab === 'articles') && data.relatedArticles.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale size={15} className="text-brass-dark" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Part III Constitutional Guarantees
              </h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  to={art.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-3.5 hover:border-brass hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-brass-dark font-semibold">
                    <span>{art.badge}</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h5 className="mt-1 font-serif text-sm font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {art.title}
                  </h5>
                  <p className="mt-0.5 text-xs text-ink/65 line-clamp-1">
                    {art.subtitle}
                  </p>
                  <p className="mt-1.5 text-[11px] text-ink/50 leading-relaxed">
                    {art.relationReason}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: STATUTORY CLAUSES & PROCEDURAL SECTIONS */}
        {(activeTab === 'all' || activeTab === 'sections') && data.relatedSections.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-oxblood" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Statutory Counterparts & Procedural Sections
              </h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.relatedSections.map((sec) => (
                <Link
                  key={sec.id}
                  to={sec.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-3.5 hover:border-navy hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink/50 uppercase tracking-wide">
                    <span>{sec.subtitle}</span>
                    <span className="text-forest font-semibold">Codified</span>
                  </div>
                  <h5 className="mt-1 font-serif text-sm font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {sec.title}
                  </h5>
                  <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                    {sec.relationReason}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: BINDING PRECEDENTS & CASE LAW */}
        {(activeTab === 'all' || activeTab === 'cases') && data.relatedCases.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gavel size={15} className="text-navy" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Binding Supreme Court Precedents
              </h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.relatedCases.map((c) => (
                <Link
                  key={c.id}
                  to={c.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-4 hover:border-navy hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink/50 uppercase">
                    <span>{c.subtitle}</span>
                    <span className="text-navy font-semibold">{c.badge}</span>
                  </div>
                  <h5 className="mt-1.5 font-serif text-base font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {c.title}
                  </h5>
                  <p className="mt-1.5 text-xs text-ink/75 leading-relaxed line-clamp-3">
                    {c.ruling}
                  </p>
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-brass-dark group-hover:underline">
                    <span>Read judgment summary & ratio</span>
                    <ChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: RELATED LAWS & STATUTES */}
        {(activeTab === 'all' || activeTab === 'laws') && data.relatedLaws.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={15} className="text-forest" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Governing Acts & Statutes
              </h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedLaws.map((law) => (
                <Link
                  key={law.id}
                  to={law.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-3.5 hover:border-navy hover:shadow-2xs transition-all"
                >
                  <span className="text-[10px] font-mono text-ink/50 uppercase">
                    {law.subtitle}
                  </span>
                  <h5 className="mt-1 font-serif text-sm font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {law.title}
                  </h5>
                  <p className="mt-1 text-xs text-ink/65 line-clamp-2 leading-relaxed">
                    {law.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: CODIFIED LEGAL TERMS */}
        {(activeTab === 'all' || activeTab === 'terms') && data.relatedTerms.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookMarked size={15} className="text-brass-dark" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Codified Legal Terms
              </h4>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {data.relatedTerms.map((term) => (
                <Link
                  key={term.id}
                  to={term.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-3 hover:border-brass transition-all"
                >
                  <span className="text-[10px] font-mono text-ink/40 uppercase block">
                    {term.subtitle}
                  </span>
                  <h5 className="mt-0.5 font-serif text-sm font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {term.title}
                  </h5>
                  <p className="mt-1 text-[11px] text-ink/60 line-clamp-2 leading-relaxed">
                    {term.plainLanguage}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: PRACTICAL GUIDES & SOPS */}
        {(activeTab === 'all' || activeTab === 'guides') && data.relatedGuides.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass size={15} className="text-tertiary" />
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Procedural Citizen Guides
              </h4>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.relatedGuides.map((guide) => (
                <Link
                  key={guide.id}
                  to={guide.url}
                  className="group block rounded-sm border border-stone-200 bg-white p-4 hover:border-brass transition-all"
                >
                  <div className="text-[10px] font-mono text-ink/50 uppercase">
                    {guide.subtitle}
                  </div>
                  <h5 className="mt-1 font-serif text-sm font-bold text-navy group-hover:text-brass-dark transition-colors">
                    {guide.title}
                  </h5>
                  <p className="mt-1 text-xs text-ink/70 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-brass-dark flex items-center gap-1 group-hover:underline">
                    <span>View Step-by-Step SOP</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
