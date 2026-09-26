import React from 'react'
import { Lock } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-3xl">
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <Lock size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Information Security &amp; Privacy Policy</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 font-mono text-xs text-ink/60">
            Commitment to Data Minimization &amp; Citizen Privacy
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm sm:text-base text-ink/85 leading-relaxed font-sans">
          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              1. Principles of Data Minimization
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Nyaya is built on the belief that reading the law and understanding constitutional rights should never require surrendering personal data. We do not require accounts, sign-ins, phone numbers, email addresses, or government identification to browse statutes, compare codes, or search legal definitions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              2. Situation Explorer (&ldquo;What Happened?&rdquo;)
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              When using the questionnaire or situation tool to assess potential legal remedies, your responses are evaluated directly in your local browser session. We do not record sensitive personal case details, names, or addresses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              3. Analytics &amp; Cookies
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Nyaya does not use third-party advertising trackers, cross-site profiling cookies, or data brokers. Standard, anonymous web server logs (such as request timestamps and HTTP status codes) are retained solely for network security and diagnosing technical errors.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              4. Digital Personal Data Protection (DPDP) Act Compliance
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              In accordance with Indian data protection principles, no personal data is collected or processed without explicit purpose and necessity. As Nyaya does not collect identifiable personal data from general visitors, no data profiling or monetization is conducted.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
