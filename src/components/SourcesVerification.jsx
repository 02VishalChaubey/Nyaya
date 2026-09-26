import React, { useState, useId } from 'react'
import {
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react'
import {
  normalizeSourceItem,
  buildSourceFromLaw,
} from '../utils/sources.js'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Reusable Institutional Sources & Verification System for Nyaya
 *
 * Supports:
 * - Source name (e.g. Gazette of India Extraordinary, No. 53)
 * - Official source URL (e.g. https://egazette.gov.in)
 * - Law / Document name (e.g. Bharatiya Nyaya Sanhita, 2023)
 * - Last verified date (e.g. 25 Dec 2023, Legislative Department)
 * - Source type ('official' vs 'secondary')
 *
 * Features:
 * - Clean expandable disclosure pattern:
 *     Sources & Verification
 *     [View sources]
 * - Does not clutter the page when collapsed.
 * - Accessible external links with security attributes (target="_blank" rel="noopener noreferrer").
 * - Unobtrusive educational legal disclaimer.
 */
export default function SourcesVerification({
  sources = [],
  law = null,
  lawName = null,
  sourceName = null,
  sourceUrl = null,
  lastVerified = null,
  sourceType = 'official',
  citation = null,
  notes = null,
  title = null,
  defaultExpanded = false,
  className = '',
}) {
  const { t, isHindi } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const contentId = useId()

  const resolvedTitle = title || (isHindi ? 'स्रोत एवं सत्यापन' : 'Sources & Verification')

  // Build array of normalized source objects from various inputs
  const resolvedSources = React.useMemo(() => {
    let list = []

    if (Array.isArray(sources) && sources.length > 0) {
      list = sources.map(normalizeSourceItem).filter(Boolean)
    } else if (law) {
      const src = buildSourceFromLaw(law)
      const actMatch = (law.aliases || []).find((a) => /^act\s+\d+\s+of\s+\d{4}$/i.test(a.trim()))
      const resolvedCitation = law.actNumber || actMatch || (law.year ? `Enacted in ${law.year}` : null)
      list = [
        normalizeSourceItem({
          lawName: law.name || law.title || lawName,
          sourceName: src.label || law.officialSource || 'Gazette of India / India Code',
          sourceUrl: src.url,
          lastVerified: src.verifiedNote,
          sourceType: 'official',
          citation: resolvedCitation,
          notes: law.lastVerified || null,
        }),
      ]
    } else if (sourceName || lawName || sourceUrl) {
      list = [
        normalizeSourceItem({
          lawName: lawName || 'Indian Statutory Enactment',
          sourceName: sourceName || 'Official Legislative Record',
          sourceUrl,
          lastVerified,
          sourceType,
          citation,
          notes,
        }),
      ]
    }

    // If completely empty, provide structured pending verification record
    if (list.length === 0) {
      list = [
        {
          documentName: lawName || 'Indian Legal Reference',
          sourceName: 'Official Gazette / India Code repository record on file',
          sourceUrl: null,
          lastVerified: null,
          sourceType: 'secondary',
          isVerified: false,
          citation: null,
          notes: 'Formal Gazette citation pending editorial verification. No unverified links are shown.',
        },
      ]
    }

    return list
  }, [sources, law, lawName, sourceName, sourceUrl, lastVerified, sourceType, citation, notes])

  const officialCount = resolvedSources.filter((s) => s.sourceType === 'official').length
  const secondaryCount = resolvedSources.length - officialCount

  return (
    <div
      className={`rounded-sm border border-border/80 bg-paper transition-colors ${className}`}
    >
      {/* Header bar with clean expandable trigger */}
      <div
        className="flex items-center justify-between gap-3 p-3.5 sm:px-4 sm:py-3 text-xs cursor-pointer select-none hover:bg-stone-50/70 transition-colors"
        onClick={() => setIsExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <ShieldCheck
            size={16}
            className="text-navy shrink-0"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
            <span className="font-semibold text-navy truncate">
              {resolvedTitle}
            </span>
            <span className="text-ink/35 hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-[11px] text-ink/65 truncate">
              {officialCount > 0 && `${officialCount} ${isHindi ? 'आधिकारिक स्रोत' : `official source${officialCount > 1 ? 's' : ''}`}`}
              {officialCount > 0 && secondaryCount > 0 && ' · '}
              {secondaryCount > 0 && `${secondaryCount} ${isHindi ? 'द्वितीयक संदर्भ' : `secondary reference${secondaryCount > 1 ? 's' : ''}`}`}
            </span>
          </div>
        </div>

        {/* Clean expandable toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded((v) => !v)
          }}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="inline-flex items-center gap-1 font-semibold text-navy hover:text-brass-dark px-2 py-1 rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass transition-colors shrink-0"
        >
          <span>
            {isExpanded
              ? t('sources.hideSources', '[Hide sources]')
              : t('sources.viewSources', '[View sources]')}
          </span>
          {isExpanded ? (
            <ChevronUp size={13} aria-hidden="true" />
          ) : (
            <ChevronDown size={13} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Expandable Section Details */}
      {isExpanded && (
        <div
          id={contentId}
          className="border-t border-border/70 p-4 sm:p-5 bg-page/40 space-y-4 text-xs animate-fade-in"
        >
          {/* Institutional note on methodology */}
          <p className="text-ink/75 leading-relaxed">
            {t(
              'sources.methodologyIntro',
              'Statutory texts and constitutional provisions indexed on Nyaya are cross-verified against enacted parliamentary gazettes and India Code repositories. Sources are clearly distinguished below:'
            )}
          </p>

          {/* Sources list */}
          <div className="space-y-3">
            {resolvedSources.map((item, index) => (
              <div
                key={index}
                className="rounded-sm border border-border/80 bg-paper p-3.5 space-y-2 shadow-2xs"
              >
                {/* Top Row: Law name and Source Type Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={14} className="text-navy shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-navy font-display text-sm truncate">
                      {item.documentName}
                    </span>
                    {item.citation && (
                      <span className="font-mono text-[10px] text-ink/55 hidden md:inline">
                        ({item.citation})
                      </span>
                    )}
                  </div>

                  {/* Clearly distinguish official vs secondary */}
                  <div className="shrink-0">
                    {item.sourceType === 'official' ? (
                      <span className="inline-flex items-center gap-1 rounded-xs border border-emerald-300/80 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-850">
                        <CheckCircle2 size={11} className="text-emerald-700" aria-hidden="true" />
                        <span>{t('sources.officialSourceBadge', 'Official Statutory Source')}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-xs border border-border bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-ink/70">
                        <BookOpen size={11} className="text-ink/60" aria-hidden="true" />
                        <span>{t('sources.secondarySourceBadge', 'Secondary Educational Source')}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Source Name & Portal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink/80 pt-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink/50 block">
                      {t('sources.authorityLabel', 'Published Authority / Repository')}
                    </span>
                    <span className="font-medium text-navy text-xs">
                      {item.sourceName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink/50 block">
                      {t('sources.statusLabel', 'Verification Status')}
                    </span>
                    {item.lastVerified ? (
                      <span className="font-mono text-[11px] text-emerald-800 font-medium">
                        {isHindi ? 'सत्यापित: ' : 'Verified: '}{item.lastVerified}
                      </span>
                    ) : item.isVerified ? (
                      <span className="font-mono text-[11px] text-emerald-800 font-medium">
                        {t('sources.verifiedNote', 'Verified authentic')}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] text-brass-dark font-medium flex items-center gap-1">
                        <AlertTriangle size={11} />
                        <span>{t('sources.inProgressNote', 'Verification in progress')}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Link or Safe Availability State */}
                <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-brass-dark hover:underline transition-colors"
                      title={isHindi ? 'आधिकारिक सरकारी रिपॉजिटरी खोलें' : 'Open external official repository'}
                    >
                      <span>{t('actions.openPortal', 'Open official source portal')}</span>
                      <ExternalLink size={12} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-ink/55 italic">
                      {t('sources.directLinkMissing', 'Direct portal link not available in public register')}
                    </span>
                  )}

                  {item.notes && (
                    <span className="text-[11px] text-ink/65 truncate max-w-sm">
                      {item.notes}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Unobtrusive educational legal disclaimer */}
          <div className="rounded-xs border-l-2 border-brass/70 bg-page/70 p-2.5 text-[11px] text-ink/75 leading-relaxed">
            <span className="font-semibold text-navy">
              {isHindi ? 'कानूनी सूचना: ' : 'Legal Information Notice: '}
            </span>
            {t(
              'sources.disclaimerNotice',
              'Statutory records are referenced for public legal education. While verified against official government gazettes and parliamentary publications, laws undergo periodic amendments. For formal court proceedings, consult an enrolled advocate or examine the official Gazette of India.'
            )}
          </div>
        </div>
      )}
    </div>
  )
}
