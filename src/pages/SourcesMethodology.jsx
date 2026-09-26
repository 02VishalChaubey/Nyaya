import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SourcesVerification from '../components/SourcesVerification.jsx'

const PRIMARY_SOURCES = [
  'Constitution of India',
  'India Code (indiacode.nic.in)',
  'Official Gazette publications (egazette.gov.in)',
  'Legislative Department publications (legislative.gov.in)',
  'Supreme Court / High Court judgments, where applicable',
  'Other official government sources',
]

const PRESENTATION_STEPS = [
  {
    step: '1',
    title: 'Legal material is identified',
    description:
      'A relevant Act, constitutional provision, or legal concept is identified for a given topic, right, or situation.',
  },
  {
    step: '2',
    title: 'Relevant provisions are organized',
    description:
      'Sections, articles, or clauses are grouped by subject — for example, by chapter, right, or category of law — so they can be browsed and searched.',
  },
  {
    step: '3',
    title: 'Plain-language explanations are provided',
    description:
      'Each provision is paired with a plain-language explanation of what it means. These explanations are paraphrases written for readability, not verbatim legal text.',
  },
  {
    step: '4',
    title: 'Sources are shown where available',
    description:
      'Where an official source has been identified and verified, it is shown alongside the content. Where it has not, the content is clearly marked as unverified.',
  },
]

export default function SourcesMethodology() {
  return (
    <div className="container-content py-10 sm:py-14">
      {/* Contextual Back Navigation */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-dark hover:text-navy transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
          Sources &amp; Methodology
        </h1>
        <p className="mt-4 text-ink/70 leading-relaxed">
          This page explains where the legal information on Nyaya comes from, and how it is
          organized and presented.
        </p>
      </div>

      <div className="mt-12 max-w-3xl space-y-14">
        {/* Primary sources */}
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Primary Sources</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            Nyaya aims to base legal information on primary legal sources — the texts issued by
            legislative and judicial bodies themselves — rather than secondary summaries. Primary
            sources that should be preferred include:
          </p>
          <ul className="mt-4 divide-y divide-border border-y border-border text-sm">
            {PRIMARY_SOURCES.map((s) => (
              <li key={s} className="py-2.5 text-ink/80">{s}</li>
            ))}
          </ul>

          <div className="mt-6 border-l-2 border-brass/60 pl-4">
            <p className="text-xs leading-relaxed text-ink/75">
              <strong className="font-semibold text-navy">On this project specifically: </strong>
              Nyaya does not claim that every source cited has been independently verified. At
              present, verified official-source references exist for the{' '}
              <Link to="/laws/constitution-of-india" className="text-brass-dark hover:text-navy hover:underline">
                Constitution of India
              </Link>
              , the{' '}
              <Link to="/laws/bns-2023" className="text-brass-dark hover:text-navy hover:underline">
                Bharatiya Nyaya Sanhita, 2023
              </Link>
              , and the{' '}
              <Link to="/laws/bnss-2023" className="text-brass-dark hover:text-navy hover:underline">
                Bharatiya Nagarik Suraksha Sanhita, 2023
              </Link>
              . Additional enacted central statutes indexed on this platform are derived from official legislative gazettes and India Code records; provisions undergo systematic editorial verification against parliamentary publications before receiving full concordance badges.
            </p>
          </div>
        </section>

        {/* Live Interactive Verification Example */}
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">
            Expandable Sources &amp; Verification System
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Every statute, constitutional right, and comparative mapping card provides an on-demand expandable verification drawer allowing citizens to inspect the underlying official gazette repositories versus secondary educational notes without cluttering the interface:
          </p>
          <div className="mt-4">
            <SourcesVerification
              defaultExpanded={true}
              sources={[
                {
                  documentName: 'Bharatiya Nyaya Sanhita, 2023',
                  sourceName: 'Gazette of India Extraordinary, No. 53 (egazette.gov.in)',
                  sourceUrl: 'https://egazette.gov.in',
                  lastVerified: 'Ministry of Law and Justice (Legislative Department) — 25 Dec 2023',
                  sourceType: 'official',
                  citation: 'Act No. 45 of 2023',
                  notes: 'Official enacted statute published in the Gazette of India Extraordinary.',
                },
                {
                  documentName: 'Nyaya Bare Act Paraphrases & Citizen Guidance',
                  sourceName: 'Nyaya Editorial Educational Project',
                  sourceUrl: null,
                  lastVerified: 'Editorial Review Board',
                  sourceType: 'secondary',
                  citation: 'Civic Legal Awareness Framework',
                  notes: 'Plain-language summaries written to make complex procedural codes accessible.',
                },
              ]}
            />
          </div>
        </section>

        {/* How information is presented */}
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">
            How Information Is Presented
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            Legal content on Nyaya generally follows four steps, from source material to what you
            see on the page:
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {PRESENTATION_STEPS.map((item) => (
              <div key={item.step}>
                <span className="font-mono text-xs font-semibold text-ink/40">{item.step}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contextual Legal Matching & Plain-Language Assistance */}
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">
            Contextual Retrieval &amp; Plain-Language Synthesis
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            When you describe a situation on the{' '}
            <Link to="/harmed" className="text-brass-dark hover:text-navy hover:underline">
              "What happened?"
            </Link>{' '}
            page, Nyaya matches your factual description against codified central statutes —
            identifying potentially relevant legal provisions, procedural rights, and dispute-resolution
            channels. If automated semantic retrieval is unavailable, our deterministic local statutory
            index is used directly.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">
            In all cases, the generated synthesis is strictly an educational starting point for
            orientation, not a legal opinion or judicial finding. Where applicable, it cites the
            underlying statutes, official gazette notifications, and constitutional articles — which
            constitute the actual governing legal authorities.
          </p>
        </section>

        {/* Limitations */}
        <section className="border-t border-border pt-10">
          <h2 className="font-display text-xl font-semibold text-navy">Limitations</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/80">
            <li className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oxblood" />
              <span>Nyaya provides general educational information about Indian law, not legal advice.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oxblood" />
              <span>Nyaya does not establish whether a person has committed an offence, or assess the merits of any specific case.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oxblood" />
              <span>Nyaya does not replace a qualified lawyer.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oxblood" />
              <span>Users should consult an appropriately qualified legal professional for advice specific to their circumstances.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
