import React from 'react'
import { Eye, CheckCircle2, Monitor, Keyboard } from 'lucide-react'

export default function Accessibility() {
  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-3xl">
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <Eye size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Digital Inclusion Statement</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy tracking-tight">
            Accessibility Statement
          </h1>
          <p className="mt-2 font-mono text-xs text-ink/60">
            Commitment to Universal Access to Indian Law
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm sm:text-base text-ink/85 leading-relaxed font-sans">
          <p className="text-sm sm:text-base text-ink/80">
            Equal access to legal information is essential to constitutional democracy. Nyaya is designed in accordance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards and the Guidelines for Indian Government Websites (GIGW) accessibility principles.
          </p>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-3">
              Accessibility Features Implemented
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-sm border border-border bg-white p-4">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-navy">High Contrast &amp; Legible Typography</h3>
                  <p className="text-xs text-ink/70 mt-1">
                    Text is rendered in high-contrast ink against clean, glare-free paper backgrounds with generous line-height to reduce visual fatigue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-sm border border-border bg-white p-4">
                <Keyboard size={16} className="text-navy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-navy">Full Keyboard Operability</h3>
                  <p className="text-xs text-ink/70 mt-1">
                    All navigational controls, search shortcuts, interactive chapter accordions, and dialogs can be accessed without a mouse using standard Tab and Enter key sequences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-sm border border-border bg-white p-4">
                <Monitor size={16} className="text-navy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-navy">Screen Reader &amp; ARIA Semantics</h3>
                  <p className="text-xs text-ink/70 mt-1">
                    Structural landmark elements (<code className="text-[11px] bg-page px-1 py-0.5 rounded">main</code>, <code className="text-[11px] bg-page px-1 py-0.5 rounded">nav</code>, <code className="text-[11px] bg-page px-1 py-0.5 rounded">header</code>, <code className="text-[11px] bg-page px-1 py-0.5 rounded">footer</code>) and ARIA attributes ensure compatibility with assistive technologies including NVDA, JAWS, and VoiceOver.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              Continuous Improvement
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              We periodically test interactive features, mobile navigation drawers, and statutory tables to maintain accessible font scaling, touch targets of at least 44×44px, and smooth zoom up to 200% without loss of content.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
