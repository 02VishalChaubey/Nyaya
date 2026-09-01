import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldAlert } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import RightCard from '../components/RightCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchRights, fetchCategories } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'
import { categories as fallbackCategories } from '../data/categories.js'

export default function Home() {
  const navigate = useNavigate()

  const {
    data: fundamentalRights,
    loading: rightsLoading,
    usingFallback: rightsFallback,
  } = useApi(fetchRights, [], fallbackRights)

  const {
    data: categories,
    loading: categoriesLoading,
    usingFallback: categoriesFallback,
  } = useApi(fetchCategories, [], fallbackCategories)

  function handleSearch(query) {
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <>
      <Hero
        eyebrow="A public legal-information service"
        title="Know Your Rights. Understand the Law."
        subtitle="Explore Indian laws, understand your fundamental rights, and learn what legal protections may apply to your situation — explained in simple language."
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/fundamental-rights" size="lg" icon={ArrowRight}>
            Explore Fundamental Rights
          </Button>
          <Button to="/harmed" size="lg" variant="secondary" icon={ShieldAlert}>
            I Have Been Harmed
          </Button>
        </div>
      </Hero>

      {/* Fundamental Rights */}
      <section className="container-content py-16 sm:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="article-tab mb-3">Articles 12–35</span>
            <h2 className="text-2xl font-semibold sm:text-3xl">Fundamental Rights</h2>
          </div>
          <Button to="/fundamental-rights" variant="ghost" icon={ArrowRight} className="self-start sm:self-auto">
            View all rights
          </Button>
        </div>

        {rightsFallback && <OfflineNotice className="mt-4" />}

        {rightsLoading ? (
          <LoadingState label="Loading fundamental rights..." />
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fundamentalRights.map((right) => (
              <RightCard key={right.id} right={right} compact />
            ))}
          </div>
        )}
      </section>

      {/* Explore Indian Laws */}
      <section className="border-t border-border bg-paper/60 py-16 sm:py-20">
        <div className="container-content">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">Explore Indian Laws</h2>
            <Button to="/laws" variant="ghost" icon={ArrowRight} className="self-start sm:self-auto">
              Browse all categories
            </Button>
          </div>

          {categoriesFallback && <OfflineNotice className="mt-4" />}

          {categoriesLoading ? (
            <LoadingState label="Loading categories..." />
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Something Happened to You? */}
      <section className="container-content py-16 sm:py-20">
        <div className="card-surface flex flex-col items-start gap-6 border-l-4 border-l-brass p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">Something Happened to You?</h2>
            <p className="mt-3 text-ink/70 leading-relaxed">
              Tell us what happened in your own words. Learn about the legal
              areas and protections that may be relevant.
            </p>
          </div>
          <Button to="/harmed" size="lg" icon={ArrowRight} className="shrink-0">
            Describe My Situation
          </Button>
        </div>
      </section>

      {/* Search */}
      <section className="border-t border-border bg-paper/60 py-16 sm:py-20">
        <div className="container-content max-w-2xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Search Indian Laws</h2>
          <p className="mt-3 text-ink/70">
            Look up specific laws, rights, sections, or legal terms.
          </p>
          <div className="mt-6">
            <SearchBar
              size="lg"
              placeholder="Search laws, rights, sections, or legal terms..."
              onSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-content pb-16 sm:pb-20">
        <LegalDisclaimer>
          This platform provides general legal information for educational
          purposes. It does not provide legal advice or determine the outcome
          of a legal case.
        </LegalDisclaimer>
      </section>
    </>
  )
}
