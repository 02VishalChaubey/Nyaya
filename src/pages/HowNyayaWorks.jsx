import React from 'react'
import { Link } from 'react-router-dom'
import { Layers, ArrowRight } from 'lucide-react'
import LegalTreeChart from '../components/LegalTreeChart.jsx'

export default function HowNyayaWorks() {
  const steps = [
    {
      num: '01',
      title: 'Statutory Sourcing & Codification',
      desc: 'All statutory text on Nyaya is sourced directly from India Code (indiacode.nic.in), official e-Gazettes of the Government of India, and official Acts passed by the Parliament of India. We do not use third-party commentary as primary statutory authority.',
    },
    {
      num: '02',
      title: 'Structural Mapping & Concordance',
      desc: 'Following the 2024 criminal law transition, we cross-reference modern enactments against their historic counterparts (such as IPC 1860 to BNS 2023, and CrPC 1973 to BNSS 2023) so citizens can trace legacy provisions to current law without confusion.',
    },
    {
      num: '03',
      title: 'Plain-Language Explanations',
      desc: 'Complex statutory clauses with multiple exceptions and provisos are broken down into plain language. Our explanations define key terms, provide clear context, and illustrate practical applications while preserving statutory precision.',
    },
    {
      num: '04',
      title: 'Transparent Verification Status',
      desc: 'Every section and legal term in our database displays its statutory citation, Act number, year of enactment, and verification status. Content is tagged as verified when cross-checked against primary gazettes.',
    },
    {
      num: '05',
      title: 'Contextual Assistance & Information Retrieval',
      desc: 'When users describe everyday situations (e.g. cyber fraud, arrest procedures, consumer grievances), Nyaya matches the factual scenario against codified statutes to display relevant sections and procedural rights.',
    },
  ]

  return (
    <div className="bg-paper min-h-screen text-ink py-10 sm:py-16">
      <div className="container-content max-w-4xl">
        <header className="border-b border-border/80 pb-8 sm:pb-12">
          <div className="inline-flex items-center gap-2 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-4">
            <Layers size={13} className="text-brass-dark" aria-hidden="true" />
            <span>Architecture &amp; Editorial Standards</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight">
            How Nyaya Works
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
            Nyaya operates on a structured editorial methodology combining primary statutory records, plain-language translation, and verifiable citation trails.
          </p>
        </header>

        <div className="mt-10 sm:mt-12 space-y-12">
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy mb-6">
              Our 5-Step Editorial &amp; Data Pipeline
            </h2>

            <div className="space-y-4">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="rounded-sm border border-border bg-white p-5 sm:p-6 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-brass-dark px-2 py-0.5 rounded-xs bg-page border border-border">
                      {s.num}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-navy">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans pl-9">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-border/70 pt-10">
            <LegalTreeChart />
          </section>

          <section className="border-t border-border/70 pt-10">
            <h2 className="font-display text-2xl font-semibold text-navy mb-4">
              Machine Assistance &amp; Search Technology
            </h2>
            <div className="rounded-sm border border-border bg-page/60 p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-ink/80 leading-relaxed">
              <p>
                To help users discover statutory sections from colloquial search queries, Nyaya employs keyword indexing and algorithmic text matching.
              </p>
              <p>
                <strong>Boundary of Automation:</strong> Search algorithms help retrieve relevant sections from our statutory database; they do not generate synthetic legal facts, draft court pleadings, or act as an autonomous legal agent. All displayed answers link to actual statutory citations.
              </p>
            </div>
          </section>

          <section className="border-t border-border/70 pt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-sm border border-border bg-white p-5 sm:p-6">
              <div>
                <h3 className="font-display text-base font-semibold text-navy">
                  Learn more about our verified sources
                </h3>
                <p className="mt-1 text-xs text-ink/70">
                  Read our complete verification standards and primary legislative authorities.
                </p>
              </div>
              <Link
                to="/sources-methodology"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs bg-navy text-white text-xs font-medium hover:bg-navy-light transition-colors shrink-0"
              >
                <span>Sources &amp; Methodology</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
