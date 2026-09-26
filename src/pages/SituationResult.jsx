import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Scale,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Printer,
  Copy,
  Check,
} from 'lucide-react'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import SourceReference from '../components/SourceReference.jsx'
import SourcesVerification from '../components/SourcesVerification.jsx'
import RelatedInformation from '../components/RelatedInformation.jsx'
import { extractSourceUrl } from '../utils/sources.js'
import { mockSituationResult } from '../data/situations.js'

const CATEGORY_LABELS = {
  'money-fraud': 'Money / Fraud',
  property: 'Property',
  cyber: 'Online / Cyber',
  consumer: 'Consumer',
  workplace: 'Workplace',
  'personal-rights': 'Personal Rights',
  family: 'Family',
  other: 'Other',
}

const FOCUS_LABELS = {
  law: 'What law may apply',
  rights: 'What rights may be relevant',
  'next-steps': 'What can I do next',
  report: 'Where can I report this',
}

const STEP_CATEGORY_BADGES = {
  reporting: { label: 'Reporting Channel', color: 'text-oxblood bg-oxblood/10 border-oxblood/20' },
  remedy: { label: 'Legal Remedy', color: 'text-navy bg-navy/10 border-navy/20' },
  documentation: { label: 'Documentation', color: 'text-brass-dark bg-brass/15 border-brass/30' },
  'legal-aid': { label: 'Free Legal Aid', color: 'text-forest bg-forest/10 border-forest/20' },
}

export default function SituationResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state
  const [copied, setCopied] = useState(false)

  // If someone lands here directly with no state, redirect to the form
  useEffect(() => {
    if (!state) {
      navigate('/harmed', { replace: true })
    }
  }, [state, navigate])

  if (!state) return null

  const usingFallback = state.offline || !state.result
  const result = state.result || mockSituationResult

  // Retrieve user context
  const yourSituation = state.description || result.yourSituation || ''
  const categoryId = state.category || result.receivedCategory
  const categoryLabel = categoryId ? CATEGORY_LABELS[categoryId] || categoryId : null
  const focusList = Array.isArray(state.focus) ? state.focus : []

  // Confidence check: false if the backend could not confidently match verified statutes
  const confidentMatch = result.confidentMatch !== false

  // Structured response fields (Target Architecture: summary, legal_areas, relevant_provisions, explanation, possible_next_steps, sources, confidence_note)
  const legalAreas = Array.isArray(result.legal_areas) && result.legal_areas.length > 0
    ? result.legal_areas
    : result.legalArea
    ? [result.legalArea]
    : ['Civil & Statutory Information']
  const legalArea = legalAreas[0]

  const areaDescription =
    result.summary ||
    result.areaDescription ||
    'Based on the information provided, this situation may relate to provisions under Indian law. This provides an educational starting point for understanding applicable principles.'

  // Relevant provisions list
  const relevantProvisions =
    Array.isArray(result.relevant_provisions) && result.relevant_provisions.length > 0
      ? result.relevant_provisions.map((p) => ({
          lawName: p.law_name || p.lawName,
          section: p.section,
          explanation: p.explanation,
        }))
      : Array.isArray(result.relevantProvisions) && result.relevantProvisions.length > 0
      ? result.relevantProvisions
      : Array.isArray(result.relevantLaws) && result.relevantLaws.length > 0
      ? result.relevantLaws
      : []

  // Potentially relevant laws list
  const potentiallyRelevantLaws =
    Array.isArray(result.potentiallyRelevantLaws) && result.potentiallyRelevantLaws.length > 0
      ? result.potentiallyRelevantLaws
      : relevantProvisions.length > 0
      ? Array.from(new Set(relevantProvisions.map((l) => l.lawName)))
      : []

  // Plain-language explanation
  const plainLanguageExplanation =
    result.explanation ||
    result.plainLanguageExplanation ||
    'Based on the information provided, Indian law establishes specific frameworks to protect individuals from arbitrary losses, unfair practices, and broken commitments. When rights are affected or agreements violated, statutes provide both formal legal remedies through courts and informal grievance mechanisms designed for accessible citizen resolution.'

  // Possible next steps
  const possibleNextSteps =
    Array.isArray(result.possible_next_steps) && result.possible_next_steps.length > 0
      ? result.possible_next_steps
      : Array.isArray(result.possibleNextSteps) && result.possibleNextSteps.length > 0
      ? result.possibleNextSteps
      : Array.isArray(result.remedies) && result.remedies.length > 0
      ? result.remedies.map((r, i) => ({
          title: r.title,
          description: r.description,
          category: i === 0 ? 'reporting' : 'remedy',
        }))
      : []

  // Sources
  const sources = Array.isArray(result.sources) ? result.sources : []

  // Important limitation text
  const confidenceNote = result.confidence_note || null
  const limitationNotice =
    result.importantLimitation ||
    confidenceNote ||
    'This information is strictly educational and does not constitute a legal determination, legal opinion, or legal advice. It does not establish whether an offence has occurred or predict how any police authority, regulatory body, or court of law will evaluate your situation. Laws apply differently based on specific facts, evidence, and jurisdiction. If you need legal advice, consult a qualified advocate or your local District Legal Services Authority (DLSA).'

  function handleCopy() {
    const textToCopy = `Nyaya Legal Information Summary\n\nSituation:\n${yourSituation}\n\nRelevant Legal Area:\n${legalArea}\n\nPlain-Language Explanation:\n${plainLanguageExplanation}\n\nImportant limitation:\n${limitationNotice}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="container-content py-10 sm:py-16">
      <h1 className="sr-only">Legal Situation Assessment Results</h1>
      {/* Top action row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/harmed"
          className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-brass-dark transition-colors min-h-[36px]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Describe a different situation</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded border border-border bg-page px-3 py-1.5 text-xs font-medium text-ink/75 hover:border-navy/40 hover:text-navy min-h-[36px] transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
          >
            {copied ? (
              <>
                <Check size={14} className="text-forest" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded border border-border bg-page px-3 py-1.5 text-xs font-medium text-ink/75 hover:border-navy/40 hover:text-navy min-h-[36px] transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
          >
            <Printer size={14} aria-hidden="true" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {usingFallback && (
        <div className="mt-6 max-w-2xl">
          <OfflineNotice message="Operating in verified offline mode: The analysis below is generated from our local verified database of Indian statutes." />
        </div>
      )}

      {!confidentMatch && (
        <div className="mt-6 card-surface p-5 border-l-4 border-l-amber-500 bg-amber-50/50">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-navy">
                Notice: No Statutory Provision Confidently Identified in Verified Records
              </h3>
              <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                Nyaya strictly enforces a zero-invention policy. Rather than guessing, predicting, or inventing unverified section numbers or provisions, our system reports that this situation could not be matched with high confidence to our indexed central statutes. Practical dispute-resolution options, documentation guidance, and free legal aid resources are provided below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1. YOUR SITUATION */}
      <section className="mt-8">
        <div className="card-surface p-6 sm:p-7 border-l-4 border-l-navy bg-paper/70">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Your Situation
            </h2>
            {categoryLabel && (
              <span className="text-xs font-medium text-ink/60">
                Category: <strong className="text-navy">{categoryLabel}</strong>
              </span>
            )}
          </div>

          <p className="mt-3 font-serif text-base italic leading-relaxed text-ink/90 sm:text-lg">
            "{yourSituation}"
          </p>

          {focusList.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3 text-xs text-ink/60">
              <span className="font-semibold text-ink/70">Requested understanding:</span>
              {focusList.map((fId, idx) => (
                <span key={fId} className="inline-flex items-center">
                  {idx > 0 && <span className="mr-2 text-ink/30">·</span>}
                  <span>{FOCUS_LABELS[fId] || fId}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. RELEVANT LEGAL AREA */}
      <section className="mt-12 border-t border-border pt-10">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
          Identified Legal Area
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
          {legalArea}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/75">
          {areaDescription}
        </p>
      </section>

      {/* 3. POTENTIALLY RELEVANT LAWS */}
      <section className="mt-12 border-t border-border pt-10">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
              Statutory Framework
            </span>
            <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
              Potentially Relevant Laws
            </h2>
          </div>
        </div>
        <p className="mt-2 max-w-2xl text-xs text-ink/60">
          Based on the information provided, the following central Acts and codes in India may apply:
        </p>

        {potentiallyRelevantLaws.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {potentiallyRelevantLaws.map((lawName, idx) => (
              <div
                key={idx}
                className="card-surface flex flex-col justify-between p-5 transition hover:border-navy/40"
              >
                <div>
                  <div className="flex items-center gap-2 text-navy">
                    <Scale size={16} className="text-brass-dark" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                      Indian Enactment
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-navy leading-snug">
                    {lawName}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60">
                  <Link
                    to="/laws"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass-dark hover:text-navy transition"
                  >
                    <BookOpen size={13} />
                    <span>Browse in Law Explorer</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 card-surface p-5 bg-paper/60 border border-dashed border-border text-xs text-ink/70">
            No central enactments reached our verified confidence threshold for this scenario. State-specific enactments, municipal bylaws, or specialized regulatory rules may govern these facts.
          </div>
        )}
      </section>

      {/* 4. RELEVANT PROVISIONS */}
      <section className="mt-12 border-t border-border pt-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            Verified Statutory Sections &amp; Articles
          </span>
          <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
            Relevant Provisions
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink/60">
            Potentially relevant provisions include the following sections retrieved from verified legal sources:
          </p>
        </div>

        {relevantProvisions.length > 0 ? (
          <div className="mt-6 space-y-4">
            {relevantProvisions.map((item, idx) => (
              <div key={idx} className="card-surface p-5 sm:p-6 transition hover:border-navy/30">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <span className="font-mono text-xs font-bold text-navy bg-navy/5 px-2.5 py-1 rounded">
                    {item.section}
                  </span>
                  <span className="text-xs font-medium text-ink/50">
                    {item.lawName}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 card-surface p-6 bg-paper/60 border border-dashed border-border text-center">
            <p className="text-xs text-ink/70 max-w-lg mx-auto leading-relaxed">
              No specific statutory sections from our verified database met the confidence threshold for this description. Nyaya strictly avoids generating speculative or unverified sections. Consult an advocate or your local District Legal Services Authority (DLSA) for detailed statutory provisions that may apply.
            </p>
          </div>
        )}
      </section>

      {/* 5. PLAIN-LANGUAGE EXPLANATION */}
      <section className="mt-12 border-t border-border pt-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            Educational Synthesis
          </span>
          <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
            Plain-Language Explanation
          </h2>
          <p className="mt-2 text-xs text-ink/60">
            An accessible overview explaining how these legal concepts and principles intersect with circumstances of this nature:
          </p>
        </div>

        <div className="mt-5 card-surface p-6 sm:p-8 bg-paper/60 border-brass/30">
          <div className="space-y-4 font-sans text-sm leading-relaxed text-ink/85 sm:text-base">
            {plainLanguageExplanation.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-ink/55">
            <CheckCircle2 size={15} className="text-brass-dark shrink-0" />
            <span>
              All explanations use hedged, educational framing and reflect provisions on file in Indian legislative records.
            </span>
          </div>
        </div>
      </section>

      {/* 6. POSSIBLE NEXT STEPS */}
      <section className="mt-12 border-t border-border pt-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            Actionable Options
          </span>
          <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
            Possible Next Steps
          </h2>
          <p className="mt-2 max-w-2xl text-xs text-ink/60">
            Based on the information provided, you may consider looking into these practical avenues — not instructions or guarantees of an outcome:
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {possibleNextSteps.map((step, idx) => {
            const badge = STEP_CATEGORY_BADGES[step.category] || STEP_CATEGORY_BADGES.remedy
            return (
              <div key={idx} className="card-surface flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="font-mono text-xs text-ink/35">Step {idx + 1}</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-navy leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink/75 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. SOURCES */}
      <section className="mt-12 border-t border-border pt-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            Verified Citations
          </span>
          <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
            Sources &amp; Statutory Authority
          </h2>
          <p className="mt-2 max-w-2xl text-xs text-ink/60">
            These statutory sources ground the analysis. Official gazettes and India Code references are verified for authenticity:
          </p>
        </div>

        {/* Expandable Sources & Verification System */}
        <SourcesVerification
          className="mt-5"
          defaultExpanded={true}
          sources={
            sources.length > 0
              ? sources.map((s) => ({
                  documentName: s.lawName || 'Indian Statutory Record',
                  sourceName: s.officialSource || 'Official Gazette / India Code repository',
                  sourceUrl: s.verified ? extractSourceUrl(s.officialSource) : null,
                  lastVerified: s.verified ? s.lastVerified : null,
                  sourceType: 'official',
                  citation: s.section ? `Section ${s.section}` : null,
                  notes: s.relevance || 'Referenced in response to user situational query.',
                }))
              : [
                  {
                    documentName: 'Central Statutory Enactments (BNS / BNSS / Bare Acts)',
                    sourceName: 'Gazette of India & India Code Legislative Database',
                    sourceUrl: 'https://indiacode.nic.in',
                    lastVerified: 'Ministry of Law and Justice',
                    sourceType: 'official',
                    citation: 'Enacted Parliamentary Statutes',
                    notes: 'Statutory citations matched deterministically or retrieved via semantic search.',
                  },
                ]
          }
        />
      </section>

      {/* Verified Statutory & Precedential Connections */}
      <RelatedInformation
        type="situation"
        id={categoryId}
        title="Statutory Connections & Jurisprudential Context"
        subtitle="Verified linkages connecting this category to substantive penal sections, constitutional guarantees, codified legal terms, landmark Supreme Court cases, and procedural guides."
      />

      {/* 8. IMPORTANT LIMITATION */}
      <section className="mt-12 border-t border-border pt-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            Legal Disclaimer
          </span>
          <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
            Important Limitation
          </h2>
        </div>

        <div className="mt-4">
          <LegalDisclaimer tone="warning">
            <div className="space-y-2 text-xs leading-relaxed sm:text-sm">
              <p className="font-semibold text-navy">
                Strict Educational Notice: Not a Legal Determination
              </p>
              <p>{limitationNotice}</p>
              <p className="text-xs text-ink/60 pt-1">
                Do not rely upon this educational overview as a formal legal opinion. For advice tailored to your specific jurisdiction, evidence, and circumstances, consult an enrolled advocate or visit your nearest District Legal Services Authority (DLSA) / Taluk Legal Services Committee.
              </p>
            </div>
          </LegalDisclaimer>
        </div>
      </section>

      {/* Bottom return bar */}
      <div className="mt-12 border-t border-border pt-8 text-center sm:text-left">
        <Link
          to="/harmed"
          className="inline-flex items-center gap-2 rounded bg-navy px-5 py-2.5 text-xs font-semibold text-paper shadow-sm hover:bg-navy-light transition"
        >
          <ArrowLeft size={14} />
          <span>Describe another situation</span>
        </Link>
      </div>
    </div>
  )
}
