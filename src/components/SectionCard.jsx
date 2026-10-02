import { useState } from 'react'
import { ChevronDown, Copy, Share2, Check } from 'lucide-react'
import OfficialSourceLink from './OfficialSourceLink.jsx'
import LastVerified from './LastVerified.jsx'
import RelatedInformation from './RelatedInformation.jsx'
import BookmarkButton from './BookmarkButton.jsx'

/**
 * A single numbered statutory section, rendered as part of a continuous
 * document-style list (see LawDetails) rather than as an individually
 * boxed card — closer to how a printed Bare Act reads.
 *
 * `content` in the underlying data is a plain-language paraphrase, not the
 * verbatim statutory text, so this component never presents it as an
 * official quotation — see the "Legal text" note below.
 */
export default function SectionCard({
  section,
  lawName,
  lawId,
  sourceLabel,
  sourceUrl,
  verifiedNote,
  siblingSections = [],
  isOpen,
  onToggle,
}) {
  const [copiedCitation, setCopiedCitation] = useState(false)
  const [copiedShare, setCopiedShare] = useState(false)
  const cleanSec = section.id.replace(/^(sec-|section-)/i, '')
  const anchorId = `sec-${cleanSec}`
  const panelId = `section-panel-${cleanSec}`

  const preview = section.content?.length > 140
    ? `${section.content.slice(0, 140).trim()}…`
    : section.content

  const citation = `${lawName}, ${section.number} — ${section.title}${
    sourceLabel ? ` (${sourceLabel})` : ''
  }`

  async function handleCopyCitation(e) {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(citation)
      setCopiedCitation(true)
      setTimeout(() => setCopiedCitation(false), 1800)
    } catch {
      // Clipboard API unavailable — silently ignore, citation text is
      // already visible on screen for manual copying.
    }
  }

  async function handleShare(e) {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}#sec-${cleanSec}`
    window.location.hash = `sec-${cleanSec}`
    if (navigator.share) {
      try {
        await navigator.share({ title: citation, url })
        return
      } catch {
        // User cancelled the share sheet, or share failed — fall through
        // to clipboard as a backup.
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopiedShare(true)
      setTimeout(() => setCopiedShare(false), 1800)
    } catch {
      // Nothing more we can do without clipboard access.
    }
  }

  const related = siblingSections.filter((s) => s.id !== section.id).slice(0, 3)

  return (
    <div id={anchorId} className="scroll-mt-24 border-b border-border py-4 first:pt-0 last:border-b-0">
      <button
        type="button"
        className="flex w-full min-h-[44px] items-start justify-between gap-4 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass rounded-xs p-1 -m-1"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>
          <span className="font-mono text-xs font-bold text-navy mr-2">{section.number}</span>
          <span className="font-medium text-navy">{section.title}</span>
          {!isOpen && preview && (
            <span className="mt-1 block text-xs leading-relaxed text-ink/70 sm:hidden">
              {preview}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`mt-0.5 shrink-0 text-navy/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {!isOpen && preview && (
        <p className="mt-1.5 hidden max-w-2xl text-xs leading-relaxed text-ink/70 sm:block">
          {preview}
        </p>
      )}

      {isOpen && (
        <div id={panelId} className="mt-4 space-y-4 pl-1 text-sm">
          <div>
            <h3 className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
              Official Title
            </h3>
            <p className="mt-1 font-display font-medium text-navy text-base">
              {section.number} — {section.title}
            </p>
          </div>

          {/* Original Statutory Text (when available) */}
          {section.statutoryText ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-semibold text-maroon uppercase tracking-wide flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-maroon"></span>
                  <span>Law / Statutory Text (Original Legal Wording)</span>
                </h3>
                <span className="font-mono text-[11px] text-ink/50 bg-paper-dim px-2 py-0.5 rounded border border-border">
                  Verbatim Act
                </span>
              </div>
              <div className="rounded-xs border-l-3 border-maroon bg-paper-dim/60 p-3.5 font-serif text-[13px] leading-relaxed text-ink/90 whitespace-pre-line select-text">
                {section.statutoryText}
              </div>
            </div>
          ) : null}

          {/* Explained Simply */}
          <div>
            <h3 className="text-xs font-semibold text-navy/80 uppercase tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-brass"></span>
              <span>Explained Simply</span>
            </h3>
            <p className="mt-1.5 leading-relaxed text-ink/80 text-sm">
              {section.explainedSimply || section.content}
            </p>
          </div>

          {section.statutoryText ? (
            <div className="rounded-xs border border-border/70 bg-paper-dim/40 px-3 py-2 text-xs leading-relaxed text-ink/65">
              <strong className="font-semibold text-navy">Legal Distinction: </strong>
              The statutory box above reproduces the enacted Central Act text. The &ldquo;Explained Simply&rdquo; commentary is provided for citizen understanding and does not substitute for judicial interpretation.
              {section.otherLawsNote && (
                <p className="mt-1 text-ink/80">
                  <strong className="font-medium text-navy">Note on Other Laws: </strong>
                  {section.otherLawsNote}
                </p>
              )}
            </div>
          ) : (
            <p className="border-l-2 border-border pl-3 text-xs leading-relaxed text-ink/65">
              <strong className="font-semibold text-ink/75">Legal text: </strong>
              The verbatim statutory wording is not reproduced here — the explanation above is a
              plain-language paraphrase. Consult the official source below for the exact legal text.
            </p>
          )}

          <div>
            <h3 className="text-xs font-semibold text-navy/70 uppercase tracking-wide">
              Source &amp; Section
            </h3>
            <p className="mt-1 font-mono text-xs text-ink/70">
              {lawName} • {section.number}
            </p>
            {sourceUrl ? (
              <div className="mt-1">
                <OfficialSourceLink url={sourceUrl} label={sourceLabel} className="text-sm font-normal" />
              </div>
            ) : (
              <p className="mt-1 text-ink/70">{sourceLabel || 'India Code (indiacode.nic.in)'}</p>
            )}
            <LastVerified note={verifiedNote} className="mt-1.5" />
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-navy/70">
                Related sections
              </h3>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {related.map((r) => (
                  <a
                    key={r.id}
                    href={`#section-${r.id}`}
                    className="text-xs font-medium text-navy hover:text-brass-dark focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brass"
                  >
                    {r.number} — {r.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Verified Statutory & Jurisprudential Connections */}
          <RelatedInformation
            compact={true}
            type="section"
            sectionNumber={section.number}
            lawId={lawId}
            className="mt-3"
          />

          <div className="flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs font-semibold">
            <BookmarkButton
              item={{
                id: `sec-${lawId}-${cleanSec}`,
                title: `${lawName}, ${section.number}: ${section.title}`,
                category: lawName,
                type: 'section',
                description: section.content || preview,
                url: `/laws/${lawId}#sec-${cleanSec}`,
              }}
              variant="button"
              size="sm"
            />

            <button
              type="button"
              onClick={handleCopyCitation}
              aria-label={`Copy citation for ${section.number}`}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-2 py-1 text-navy hover:text-brass-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass rounded transition-colors"
            >
              {copiedCitation ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              <span>{copiedCitation ? 'Citation copied' : 'Copy citation'}</span>
            </button>

            {sourceUrl && <OfficialSourceLink url={sourceUrl} />}

            <button
              type="button"
              onClick={handleShare}
              aria-label={`Share ${section.number}`}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-2 py-1 text-navy hover:text-brass-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass rounded transition-colors"
            >
              {copiedShare ? <Check size={13} aria-hidden="true" /> : <Share2 size={13} aria-hidden="true" />}
              <span>{copiedShare ? 'Link copied' : 'Share section'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
