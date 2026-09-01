import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import { getIcon } from '../components/iconMap.js'
import { useApi } from '../hooks/useApi.js'
import { fetchRights } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'

export default function FundamentalRights() {
  const {
    data: fundamentalRights,
    loading,
    usingFallback,
  } = useApi(fetchRights, [], fallbackRights)

  return (
    <>
      <Hero
        eyebrow="Part III of the Constitution"
        title="Fundamental Rights"
        subtitle="The Constitution of India guarantees certain fundamental rights to protect individual liberty, equality and dignity."
        size="md"
      />

      <section className="container-content py-14 sm:py-16">
        {usingFallback && <OfflineNotice className="mb-6 max-w-lg" />}

        {loading ? (
          <LoadingState label="Loading fundamental rights..." />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {fundamentalRights.map((right) => {
              const Icon = getIcon(right.icon)
              return (
                <article
                  key={right.id}
                  id={right.id}
                  className="card-surface scroll-mt-24 p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy/5 text-navy">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="article-tab">{right.articles}</span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-navy">{right.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{right.summary}</p>

                  <p className="mt-4 rounded-sm border border-border bg-page/50 p-3 text-xs leading-relaxed text-ink/60">
                    {right.example}
                  </p>

                  <Link
                    to={`/laws?category=constitutional`}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-sm border border-navy/20 px-4 py-2 text-sm font-medium text-navy hover:border-navy hover:bg-navy/5 transition-colors"
                  >
                    Explore <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
