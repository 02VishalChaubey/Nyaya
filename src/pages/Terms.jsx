import React from 'react'
import { FileText } from 'lucide-react'

export default function Terms() {
  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-3xl">
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <FileText size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Usage Agreement</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy tracking-tight">
            Terms of Use
          </h1>
          <p className="mt-2 font-mono text-xs text-ink/60">
            Terms Governing Access to Nyaya Legal Information Resources
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm sm:text-base text-ink/85 leading-relaxed font-sans">
          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              1. Permitted Informational Use
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Access to Nyaya is granted solely for non-commercial educational, civic, academic, and research purposes. You may read, search, cite, and reference statutory sections, concordance tables, and constitutional summaries presented on this platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              2. Prohibited Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-ink/75">
              <li>Do not present information generated or retrieved from Nyaya as certified legal advice or representation.</li>
              <li>Do not attempt to disrupt the platform infrastructure, perform denial-of-service attacks, or scrape internal APIs aggressively.</li>
              <li>Do not misrepresent affiliation with Nyaya or imply official government sponsorship.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              3. Accuracy of Statutory Information
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Parliamentary enactments, state notifications, and judicial rulings undergo periodic legislative amendments. While Nyaya strives to maintain synchronized concordance with the Gazette of India and India Code, users are advised to verify statutory amendments with official gazettes before relying upon them in legal proceedings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              In no event shall the authors, maintainers, or contributors of Nyaya be held liable for any claim, loss, damage, or legal consequence arising from the use of, or inability to use, the information provided on this platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
