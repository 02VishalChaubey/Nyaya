import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  Scale,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Info,
  ExternalLink,
} from 'lucide-react'
import { topicNavigatorSituations } from '../../data/legalToolsData.js'
import BookmarkButton from '../BookmarkButton.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function LawTopicNavigator({ initialSituationId }) {
  const { isHindi } = useLanguage()
  const [selectedId, setSelectedId] = useState(
    initialSituationId || topicNavigatorSituations[0]?.id || 'sit-arrest-police'
  )

  const activeSituation = useMemo(() => {
    return (
      topicNavigatorSituations.find((s) => s.id === selectedId) ||
      topicNavigatorSituations[0]
    )
  }, [selectedId])

  return (
    <div className="space-y-6">
      {/* Situation Picker Cards */}
      <div className="rounded-sm border border-border bg-paper p-4 sm:p-5 shadow-2xs">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy mb-3">
          {isHindi ? '1. अपनी परिस्थिति चुनें' : '1. Select an Everyday Situation'}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topicNavigatorSituations.map((sit) => {
            const isSelected = sit.id === activeSituation.id
            return (
              <button
                key={sit.id}
                type="button"
                onClick={() => setSelectedId(sit.id)}
                aria-pressed={isSelected}
                className={`text-left p-3.5 rounded-sm border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-navy bg-navy/5 text-navy font-semibold shadow-2xs ring-1 ring-navy'
                    : 'border-border/80 bg-page/60 text-ink/80 hover:bg-page hover:border-brass'
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-oxblood/80">
                    {sit.category}
                  </span>
                  <div className="text-xs sm:text-sm font-display font-semibold mt-1 leading-snug">
                    {sit.title}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-brass-dark">
                  <span>{isSelected ? (isHindi ? 'वर्तमान में सक्रिय' : 'Viewing Topics') : (isHindi ? 'कानून देखें →' : 'View Topics →')}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Situation Legal Topics Navigator Panel */}
      {activeSituation && (
        <article className="rounded-sm border border-border bg-white shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-page/50 p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-brass-dark font-semibold uppercase tracking-wider bg-brass-faint/80 px-2 py-0.5 rounded-xs border border-brass/20">
                    {activeSituation.category}
                  </span>
                  <span className="text-xs font-mono text-navy font-medium">
                    {activeSituation.natureOfLaw}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy">
                  {activeSituation.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed max-w-3xl">
                  {activeSituation.scenarioDescription}
                </p>
              </div>

              <div className="shrink-0">
                <BookmarkButton
                  item={{
                    id: `navigator-${activeSituation.id}`,
                    title: `Legal Topics: ${activeSituation.title}`,
                    category: activeSituation.category,
                    type: 'topic',
                    description: activeSituation.scenarioDescription,
                    url: `/tools?tool=navigator&situation=${activeSituation.id}`,
                  }}
                  variant="button"
                  size="sm"
                />
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7 space-y-8">
            {/* 1. KEY GOVERNING STATUTES & PROVISIONS */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy pb-2 border-b border-border flex items-center gap-2">
                <Scale size={16} className="text-brass-dark" aria-hidden="true" />
                <span>{isHindi ? 'संबंधित प्रमुख संहिताओं व अधिनियम' : 'Relevant Governing Statutes & Sections'}</span>
              </h4>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {activeSituation.keyStatutes.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xs border border-border/80 bg-stone-50/60 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display font-bold text-navy text-sm sm:text-base leading-snug">
                          {stat.name}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-brass-dark font-semibold mt-1">
                        {stat.sections}
                      </p>
                      <p className="mt-2 text-xs text-ink/75 leading-relaxed">
                        {stat.role}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-border/50">
                      <Link
                        to={stat.url}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-brass-dark transition-colors group"
                      >
                        <span>{isHindi ? 'संहिता व धाराएं पढ़ें' : 'Read Statute & Sections'}</span>
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. PROCEDURAL GUIDES & OFFICIAL SOPs */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy pb-2 border-b border-border flex items-center gap-2">
                <FileText size={16} className="text-brass-dark" aria-hidden="true" />
                <span>{isHindi ? 'प्रक्रियात्मक मार्गदर्शिका व SOP' : 'Procedural Guides & Step-by-Step SOPs'}</span>
              </h4>

              <div className="mt-3 divide-y divide-border/60">
                {activeSituation.relevantGuides.map((guide, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-navy text-xs sm:text-sm">
                        {guide.title}
                      </span>
                      <p className="text-xs text-ink/70 mt-0.5">{guide.summary}</p>
                    </div>
                    <Link
                      to={guide.url}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brass-dark hover:text-navy hover:underline shrink-0"
                    >
                      <span>Explore Guide</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. PRACTICAL IMMEDIATE STEPS */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy pb-2 border-b border-border flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" aria-hidden="true" />
                <span>{isHindi ? 'व्यावहारिक तात्कालिक कदम' : 'Practical Immediate Action Steps'}</span>
              </h4>

              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-ink/85">
                {activeSituation.immediatePracticalSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-page/40 p-2.5 rounded-xs border border-border/60">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy font-mono text-[11px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. DEFINED LEGAL TERMS IN THIS DOMAIN */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy pb-2 border-b border-border flex items-center gap-2">
                <BookOpen size={16} className="text-navy" aria-hidden="true" />
                <span>{isHindi ? 'संबंधित कानूनी शब्दावली' : 'Key Legal Terminology'}</span>
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">
                {activeSituation.relevantTerms.map((term, idx) => (
                  <Link
                    key={idx}
                    to={`/legal-terms#${term.id}`}
                    className="inline-flex items-center gap-1 rounded-xs border border-border bg-stone-50 px-2.5 py-1 text-xs font-medium text-navy hover:border-navy hover:bg-paper transition-colors"
                  >
                    <span>{term.term}</span>
                    <ArrowRight size={10} className="text-ink/40" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Educational Notice */}
      <div className="rounded-sm border border-border/80 bg-stone-50 p-4 text-xs text-ink/75 leading-relaxed">
        <strong className="text-navy font-semibold">{isHindi ? 'शैक्षणिक सीमा:' : 'Educational Boundary:'}</strong>{' '}
        {isHindi
          ? 'यह नेविगेटर केवल यह समझने में मदद करता है कि किसी दी गई स्थिति में कौन से भारतीय कानून और धाराएं प्रासंगिक हो सकती हैं। यह किसी पार्टी की कानूनी देयता (liability) या जीत की संभावना का निर्धारण नहीं करता है।'
          : 'This navigator highlights statutory frameworks commonly relevant to everyday scenarios for educational awareness. It does not assess the legal merits of a specific dispute, determine liability, or substitute for advice from a qualified advocate.'}
      </div>
    </div>
  )
}
