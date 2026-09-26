import { isVerifiedNote } from '../utils/sources.js'
import SourceBadge from './SourceBadge.jsx'
import OfficialSourceLink from './OfficialSourceLink.jsx'

/**
 * The standard "Source / Last verified / Open official source" block used
 * throughout the app for law, section, article, and case-law content.
 *
 * Nothing here is fabricated: `sourceUrl` must already have been resolved
 * (see src/utils/sources.js) from real data, `verifiedNote` must be a real
 * note from the data (or omitted), and when neither is available the block
 * says so plainly instead of implying a source that doesn't exist.
 *
 * `compact` renders a single inline line (for section lists, glossary
 * rows, case citations); the default renders the fuller labelled block
 * (for law/right-level "Key Information" panels).
 */
export default function SourceReference({ sourceLabel, sourceUrl, verifiedNote, compact = false }) {
  const verified = isVerifiedNote(verifiedNote)
  const hasSource = !!sourceLabel

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <SourceBadge verified={verified} />
        {hasSource && <span className="text-ink/70">{sourceLabel}</span>}
        {verifiedNote && verified && (
          <span className="text-ink/50">verified {verifiedNote}</span>
        )}
        <OfficialSourceLink url={sourceUrl} />
      </div>
    )
  }

  return (
    <dl className="space-y-4 text-sm">
      <div>
        <dt className="font-medium text-ink/60">Source</dt>
        <dd className="mt-1 flex items-center gap-2">
          <span className={verified ? 'font-semibold text-navy' : 'text-ink/60'}>
            {hasSource ? sourceLabel : 'Source not available'}
          </span>
          <SourceBadge verified={verified} />
        </dd>
      </div>

      {verified && verifiedNote ? (
        <div>
          <dt className="font-medium text-ink/60">Last verified</dt>
          <dd className="mt-1 text-ink/70">{verifiedNote}</dd>
        </div>
      ) : (
        <div>
          <p className="border-l-2 border-brass/60 pl-3 text-xs leading-relaxed text-ink/70">
            This content has not yet been verified against an official source. Treat it as
            illustrative, not a citable legal reference.
          </p>
        </div>
      )}

      <div>
        <OfficialSourceLink url={sourceUrl} />
      </div>
    </dl>
  )
}
