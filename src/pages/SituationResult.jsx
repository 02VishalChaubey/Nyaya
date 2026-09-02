import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import ResultCard from '../components/ResultCard.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import Button from '../components/Button.jsx'
import { mockSituationResult } from '../data/situations.js'

export default function SituationResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  // If someone lands here directly (no form submission happened), send
  // them back to the form instead of showing a result out of context.
  useEffect(() => {
    if (!state) navigate('/harmed', { replace: true })
  }, [state, navigate])

  if (!state) return null

  const usingFallback = state.offline || !state.result
  const result = state.result || mockSituationResult

  const { legalArea, areaDescription, relevantLaws, remedies, penalties } = result

  return (
    <div className="container-content py-10 sm:py-14">
      <Link
        to="/harmed"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-navy"
      >
        <ArrowLeft size={15} aria-hidden="true" /> Describe a different situation
      </Link>

      {usingFallback && <OfflineNotice className="mt-6 max-w-lg" />}

      <div className="mt-6 max-w-2xl">
        <span className="article-tab mb-4">Based on what you described</span>
        <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Possible legal area
        </h1>
        <p className="mt-3 text-xl font-semibold text-brass-dark">{legalArea}</p>
        <p className="mt-3 text-ink/70 leading-relaxed">{areaDescription}</p>
      </div>

      {/* Relevant laws */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Potentially relevant laws</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {relevantLaws.map((item, i) => (
            <ResultCard
              key={i}
              tag={item.section}
              title={item.lawName}
              description={item.explanation}
            />
          ))}
        </div>
      </section>

      {/* Remedies */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Possible legal remedies</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {remedies.map((item, i) => (
            <ResultCard key={i} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      {/* Penalties */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Possible penalties</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {penalties.map((item, i) => (
            <ResultCard key={i} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      {/* Warning */}
      <section className="mt-12 max-w-3xl">
        <LegalDisclaimer tone="warning" title="Important:">
          This information is educational and does not determine whether an
          offence has occurred or what outcome a court or authority will
          reach. The applicable law depends on the specific facts and
          jurisdiction.
        </LegalDisclaimer>

        <div className="mt-6">
          <Button variant="secondary" icon={ExternalLink}>
            View Official Source
          </Button>
        </div>
      </section>
    </div>
  )
}
