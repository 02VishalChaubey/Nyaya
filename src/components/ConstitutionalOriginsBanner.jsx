import React from 'react'
import { BookOpen, ShieldCheck, Scale, Compass } from 'lucide-react'
import { constitutionalOrigins } from '../data/rights.js'

export default function ConstitutionalOriginsBanner() {
  return (
    <section className="mb-12 rounded-2xl border border-navy/15 bg-paper p-6 sm:p-9 shadow-xs">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy/10 text-navy">
              <Compass size={16} />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
              Constitutional Foundation &amp; Philosophy
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold tracking-tight text-navy sm:text-2xl">
            What are Fundamental Rights?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {constitutionalOrigins.intro}
          </p>

          <div className="mt-4 rounded-xl border border-navy/10 bg-navy/5 p-4">
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-navy" />
              <p className="text-xs leading-relaxed text-ink/80">
                <strong className="font-semibold text-navy">Enforceability &amp; Beneficiaries: </strong>
                {constitutionalOrigins.scope}
              </p>
            </div>
          </div>
        </div>

        {/* US Comparison & Indian Synthesis Card */}
        <div className="w-full lg:w-[420px] shrink-0 rounded-xl border border-border/80 bg-page/70 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Scale size={16} className="text-brass-dark" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
              US Bill of Rights vs. Indian Adaptation
            </h3>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-ink/75">
            {constitutionalOrigins.usComparison}
          </p>

          <div className="mt-3.5 space-y-2.5 border-t border-border/70 pt-3 text-xs leading-relaxed text-ink/70">
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-dark" />
              <p>
                <strong className="font-semibold text-navy">Reasonable Restrictions: </strong>
                {constitutionalOrigins.restrictionsExample}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
              <p>
                <strong className="font-semibold text-navy">Article 32 Direct Remedy: </strong>
                {constitutionalOrigins.remedySummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
