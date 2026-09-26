import React from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Disclaimer() {
  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-3xl">
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <AlertTriangle size={13} className="text-oxblood" aria-hidden="true" />
            <span>Statutory &amp; Educational Notice</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy tracking-tight">
            Legal Disclaimer
          </h1>
          <p className="mt-2 font-mono text-xs text-ink/60">
            Last Updated: 2026 • Platform Status: Educational &amp; Informational Only
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm sm:text-base text-ink/85 leading-relaxed font-sans">
          <div className="rounded-sm border border-oxblood/30 bg-oxblood/5 p-5">
            <h2 className="font-display text-base font-semibold text-oxblood">
              No Advocate-Client Relationship
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink/80">
              The use of Nyaya does not create an advocate-client relationship under the Advocates Act, 1961 or the rules framed by the Bar Council of India. Transmission or reception of information does not constitute formal legal representation.
            </p>
          </div>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              1. General Information Only
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Nyaya is designed solely as an educational and informational tool to facilitate understanding of the Constitution of India, parliamentary statutes, procedural codes, and legal terms. The content provided is neither tailored to specific disputes nor intended to serve as comprehensive legal advice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              2. Independent Legal Counsel Required
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Legal matters involve complex evaluations of local jurisdiction, factual nuances, limitation periods, evidentiary standards, and discretionary court powers. If you are facing criminal charges, civil disputes, arrest, or any urgent legal scenario, you should promptly consult an advocate enrolled with the relevant State Bar Council.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              3. Verification &amp; Official Gazettes
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              While we strive to ensure that all provisions, concordance mappings (IPC ↔ BNS, CrPC ↔ BNSS), and legal summaries accurately reflect the enacted laws of India, users should verify citations against the official publications of the Gazette of India or India Code before citing them in legal proceedings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-navy mb-2">
              4. Non-Affiliation
            </h2>
            <p className="text-xs sm:text-sm text-ink/75">
              Nyaya is an independent educational platform and is not affiliated with, endorsed by, or operated by the Ministry of Law and Justice, the Supreme Court of India, or any department of the Government of India.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
