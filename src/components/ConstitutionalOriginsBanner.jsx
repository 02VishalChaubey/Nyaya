import React from 'react'
import { Scale } from 'lucide-react'
import { constitutionalOrigins } from '../data/rights.js'
import { laws as fallbackLaws } from '../data/laws.js'
import { isVerifiedNote, extractSourceUrl } from '../utils/sources.js'
import SourceReference from './SourceReference.jsx'

export default function ConstitutionalOriginsBanner() {
  const constitutionLaw = fallbackLaws.find((l) => l.id === 'constitution-of-india')
  const sourceLabel = constitutionLaw?.officialSource
  const verifiedNoteRaw = constitutionLaw?.lastVerified
  const verified = isVerifiedNote(verifiedNoteRaw)
  const sourceUrl = verified ? extractSourceUrl(sourceLabel) : null
  const verifiedNote = verified ? verifiedNoteRaw : null

  return (
    <section className="mb-12 border-b border-border pb-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex-1">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">Constitutional Foundation &amp; Philosophy</span>

          <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
            What are Fundamental Rights?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {constitutionalOrigins.intro}
          </p>

          <p className="mt-4 border-l-2 border-navy/30 pl-3 text-xs leading-relaxed text-ink/75">
            <strong className="font-semibold text-navy">Enforceability &amp; beneficiaries: </strong>
            {constitutionalOrigins.scope}
          </p>

          <div className="mt-4">
            <SourceReference
              sourceLabel={sourceLabel}
              sourceUrl={sourceUrl}
              verifiedNote={verifiedNote}
              compact
            />
          </div>
        </div>

        {/* US Comparison & Indian Synthesis */}
        <div className="w-full lg:w-[380px] shrink-0 lg:border-l lg:border-border lg:pl-8">
          <div className="flex items-center gap-2">
            <Scale size={15} className="text-brass-dark" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-navy">
              US Bill of Rights vs. Indian Adaptation
            </h3>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-ink/75">
            {constitutionalOrigins.usComparison}
          </p>

          <div className="mt-3.5 space-y-2.5 border-t border-border pt-3 text-xs leading-relaxed text-ink/70">
            <p>
              <strong className="font-semibold text-navy">Reasonable restrictions: </strong>
              {constitutionalOrigins.restrictionsExample}
            </p>
            <p>
              <strong className="font-semibold text-navy">Article 32 direct remedy: </strong>
              {constitutionalOrigins.remedySummary}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
