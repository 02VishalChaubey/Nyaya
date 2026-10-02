import React from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  BookOpen,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react'

export default function About() {
  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-4xl">
        {/* Header Block */}
        <header className="border-b border-border/80 pb-8 sm:pb-12">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <Scale size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Public Legal Education &amp; Reference</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight">
            About Nyaya
          </h1>

          <p className="mt-4 font-serif text-lg sm:text-xl text-ink/80 leading-relaxed italic border-l-2 border-brass pl-4 py-0.5">
            &ldquo;Nyaya is a legal-information platform designed to make Indian law easier to understand.&rdquo;
          </p>
        </header>

        <div className="mt-10 sm:mt-12 space-y-12 sm:space-y-16">
          {/* Section 1: Why we built it */}
          <section aria-labelledby="why-built-heading">
            <h2
              id="why-built-heading"
              className="font-display text-2xl font-semibold text-navy tracking-tight flex items-center gap-2.5"
            >
              <span className="font-mono text-sm text-brass-dark font-normal">01.</span>
              <span>Why We Built It</span>
            </h2>

            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/85 font-sans">
              <p>
                In a constitutional democracy, law governs nearly every aspect of civic life—from fundamental
                liberties and criminal procedure to tenancy, employment, consumer transactions, and family welfare.
                Yet, for most citizens, accessing and comprehending relevant statutes presents significant practical hurdles.
              </p>
              <p>
                Legal information can be difficult to understand because of:
              </p>

              <div className="grid gap-3 sm:grid-cols-3 mt-4">
                <div className="rounded-sm border border-border bg-page/70 p-4">
                  <h3 className="font-display text-sm font-semibold text-navy">Complex Terminology</h3>
                  <p className="mt-1.5 text-xs text-ink/70 leading-normal">
                    Statutory drafting often relies on archaic phrases, Latin maxims, and technical legal terms that differ from everyday English and Indian languages.
                  </p>
                </div>

                <div className="rounded-sm border border-border bg-page/70 p-4">
                  <h3 className="font-display text-sm font-semibold text-navy">Scattered Information</h3>
                  <p className="mt-1.5 text-xs text-ink/70 leading-normal">
                    Provisions, procedural rules, state amendments, and judicial interpretations are published across disparate official gazettes and portals.
                  </p>
                </div>

                <div className="rounded-sm border border-border bg-page/70 p-4">
                  <h3 className="font-display text-sm font-semibold text-navy">Lengthy Documents</h3>
                  <p className="mt-1.5 text-xs text-ink/70 leading-normal">
                    Bare acts often span hundreds of sections with extensive provisos, explanations, and cross-references that require specialized training to parse.
                  </p>
                </div>
              </div>

              <p className="pt-2">
                Nyaya was created to bridge this gap by providing structured, legible, and verifiable legal information in an approachable digital format.
              </p>
            </div>
          </section>

          {/* Section 2: What Nyaya does */}
          <section aria-labelledby="what-does-heading" className="border-t border-border/70 pt-10 sm:pt-12">
            <h2
              id="what-does-heading"
              className="font-display text-2xl font-semibold text-navy tracking-tight flex items-center gap-2.5"
            >
              <span className="font-mono text-sm text-brass-dark font-normal">02.</span>
              <span>What Nyaya Does</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed">
              Nyaya organizes statutory Indian law into transparent, readable modules to assist citizens, students, and practitioners:
            </p>

            <div className="mt-6 divide-y divide-border rounded-sm border border-border bg-white">
              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Explains Legal Concepts in Plain Language</h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Breaks down complex legal provisions into understandable explanations, illustrating their real-world intent while preserving the original legal meaning.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Organizes Indian Laws &amp; Major Codes</h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Maintains searchable repositories of key central legislation—including the Bharatiya Nyaya Sanhita (BNS 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), Consumer Protection Act, Information Technology Act, and older penal codes.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Helps Users Explore Constitutional Rights</h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Provides focused reference guides to Part III of the Constitution of India (Articles 12 through 35), covering fundamental rights, reasonable restrictions, and writ remedies under Articles 32 and 226.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Provides Codified Legal Terminology</h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Maintains an authoritative legal lexicon explaining definitions such as bail, cognizable offences, FIRs, remand, chargesheets, and anticipatory bail with direct citations to statutory sections.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Finds Potentially Relevant Information from Everyday Descriptions</h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Assists users who describe everyday grievances or practical situations (e.g., cyber harassment, landlord disputes, arrest procedures) in identifying potentially relevant statutory provisions and immediate procedural steps.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: How information is handled */}
          <section aria-labelledby="sources-heading" className="border-t border-border/70 pt-10 sm:pt-12">
            <h2
              id="sources-heading"
              className="font-display text-2xl font-semibold text-navy tracking-tight flex items-center gap-2.5"
            >
              <span className="font-mono text-sm text-brass-dark font-normal">03.</span>
              <span>How Information is Handled</span>
            </h2>

            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/85 font-sans">
              <p>
                Transparency and source discipline are central to the platform. Nyaya relies on verified primary legal materials:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="rounded-sm border border-border bg-page/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
                    <FileText size={14} className="text-brass-dark" />
                    <span>Primary Sources</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Statutory texts, bare acts, and gazette notifications published by the Ministry of Law and Justice, the Legislative Department (India Code), and official government repositories.
                  </p>
                </div>

                <div className="rounded-sm border border-border bg-page/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
                    <BookOpen size={14} className="text-brass-dark" />
                    <span>Judicial Precedents</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Citations and constitutional ratio decidendi referenced from landmark judgments of the Supreme Court of India and relevant High Courts.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-sm border border-border/80 bg-stone-50 p-4 text-xs sm:text-sm text-ink/80 leading-relaxed">
                <h4 className="font-semibold text-navy mb-1">Use of Machine Assistance</h4>
                <p>
                  Where computational algorithms or artificial intelligence assistance are utilized—such as for semantic search indexing, natural-language query routing, or text structuring—they operate under strict guardrails. Automated assistance is used to organize and locate text, not to fabricate legal facts, create novel doctrines, or generate unverified advice. All citations link back to authentic statutory enactments.
                </p>
              </div>

              <p className="pt-1">
                For a complete list of verified primary sources and editorial criteria, please visit our{' '}
                <Link to="/sources-methodology" className="font-semibold text-brass-dark hover:text-navy underline">
                  Sources &amp; Methodology
                </Link>{' '}
                page.
              </p>
            </div>
          </section>

          {/* Section 4: What Nyaya does not do */}
          <section aria-labelledby="limits-heading" className="border-t border-border/70 pt-10 sm:pt-12">
            <div className="rounded-sm border border-oxblood/30 bg-oxblood/5 p-5 sm:p-7">
              <h2
                id="limits-heading"
                className="font-display text-xl sm:text-2xl font-semibold text-oxblood flex items-center gap-2"
              >
                <AlertTriangle size={20} className="shrink-0 text-oxblood" aria-hidden="true" />
                <span>What Nyaya Does Not Do</span>
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-ink/80 leading-relaxed">
                To maintain ethical clarity and avoid citizen misdirection, Nyaya operates with strict functional boundaries:
              </p>

              <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-ink/85">
                <div className="flex items-start gap-3">
                  <XCircle size={16} className="text-oxblood shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-navy font-semibold">Does not replace a qualified lawyer:</strong>{' '}
                    Information on Nyaya cannot substitute for individualized legal advice from an advocate licensed by the Bar Council of India who has examined the specific facts, documents, and jurisdiction of your case.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle size={16} className="text-oxblood shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-navy font-semibold">Does not determine legal liability:</strong>{' '}
                    Nyaya does not assess innocence, guilt, breach of contract, or liability. Adjudication is exclusively the constitutional prerogative of competent courts, tribunals, and statutory authorities.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle size={16} className="text-oxblood shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-navy font-semibold">Does not guarantee legal outcomes:</strong>{' '}
                    Legal proceedings depend on evidentiary burdens, statutory discretion, court procedure, and judicial evaluation. No automated or informational system can guarantee a specific verdict or order.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Practical Navigation Shortcuts */}
          <section aria-labelledby="resources-heading" className="border-t border-border/70 pt-10 sm:pt-12">
            <h2
              id="resources-heading"
              className="font-display text-xl font-semibold text-navy tracking-tight"
            >
              Explore the Platform
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/fundamental-rights"
                className="group flex flex-col justify-between rounded-sm border border-border bg-page p-4 hover:border-navy hover:bg-white transition-all shadow-2xs"
              >
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy group-hover:text-brass-dark transition-colors">
                    Fundamental Rights
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    Articles 14 to 32, judicial tests, and writ procedures.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-brass-dark">
                  <span>View Rights</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/laws"
                className="group flex flex-col justify-between rounded-sm border border-border bg-page p-4 hover:border-navy hover:bg-white transition-all shadow-2xs"
              >
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy group-hover:text-brass-dark transition-colors">
                    Explore Indian Laws
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    BNS 2023, BNSS 2023, Consumer Protection, and IT Act.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-brass-dark">
                  <span>Browse Directory</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                to="/legal-terms"
                className="group flex flex-col justify-between rounded-sm border border-border bg-page p-4 hover:border-navy hover:bg-white transition-all shadow-2xs"
              >
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy group-hover:text-brass-dark transition-colors">
                    Legal Terms Glossary
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    Codified definitions from Bail to Cognizable Offences.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-brass-dark">
                  <span>Browse Lexicon</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </section>

          {/* Closing Editorial Visual: Court Pillars */}
          <div className="border-t border-border/80 pt-10 pb-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/3d-court-pillars.svg"
                alt="Institutions of Justice Pillars"
                className="w-32 sm:w-40 h-auto object-contain opacity-85 select-none"
                loading="lazy"
              />
              <p className="mt-4 font-serif text-sm italic text-ink/60 max-w-md">
                Dedicated to accessible, verified, and transparent public legal awareness under the rule of law.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
