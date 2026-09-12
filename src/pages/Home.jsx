import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldAlert,
  Scale,
  BookOpen,
  ShieldCheck,
  Compass,
  FolderOpen,
  Sparkles,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import FunctionBar from '../components/FunctionBar.jsx'
import RightCard from '../components/RightCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import LegalTreeChart from '../components/LegalTreeChart.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchRights, fetchCategories } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'
import { categories as fallbackCategories } from '../data/categories.js'

export default function Home() {
  const navigate = useNavigate()
  const [curatedTab, setCuratedTab] = useState('rights') // 'rights' or 'categories'

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
      {/* Core Functions Quick-Access Bar at top of Home page */}
      <FunctionBar onSearchClick={() => navigate('/search')} />

      <Hero
        background="enmachi"
        eyebrow="Enmachi • The Wisdom of the Judge"
        title="Know Your Rights. Understand the Law."
        subtitle="Explore Indian laws, understand your fundamental rights, and learn what legal protections may apply to your situation — explained in simple language."
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            to="/fundamental-rights"
            size="lg"
            variant="enmachi"
            icon={ArrowRight}
          >
            Explore Fundamental Rights
          </Button>
          <Button
            to="/harmed"
            size="lg"
            variant="secondaryDark"
            icon={ShieldAlert}
          >
            I Have Been Harmed
          </Button>
        </div>

        {/* Top Search Bar */}
        <div className="mt-7 max-w-xl">
          <SearchBar
            size="lg"
            placeholder="Search laws, rights, sections, or legal terms..."
            onSearch={handleSearch}
          />
        </div>
      </Hero>

      {/* 3D Pillars of Constitutional Jurisprudence Spotlight with Background Watermark */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-paper via-paper-dim/20 to-paper py-16 sm:py-24">
        {/* Subtle Background Pattern Image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
          style={{ backgroundImage: "url('/images/bg-legal-pattern.svg')" }}
        />

        <div className="container-content relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/15">
              <Sparkles size={12} className="text-brass-dark" />
              Constitutional Bedrock
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-4xl">
              Pillars of Indian Justice
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/70">
              Three foundational dimensions of constitutional protection that safeguard every citizen across the Republic of India.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Card 1: 3D Scales of Justice */}
            <Link
              to="/laws?category=civil"
              className="group card-surface block cursor-pointer relative overflow-hidden rounded-2xl p-7 transition-all hover:border-cyan-500/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
                <img
                  src="/images/3d-scales.svg"
                  alt="3D Scales of Justice render"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Scale size={13} />
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-700">
                  Civil &amp; Statutory Law
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-bold text-navy group-hover:text-cyan-800 transition-colors">
                Rule of Law &amp; Equality
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Guarantees equal protection before the law, civil remedies, fair contracts, and safeguards against arbitrary discrimination.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-cyan-700 transition-colors">
                Explore Civil &amp; Statutory Laws <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: 3D Constitution Book */}
            <Link
              to="/fundamental-rights"
              className="group card-surface block cursor-pointer relative overflow-hidden rounded-2xl p-7 transition-all hover:border-brass/70 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brass"
            >
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
                <img
                  src="/images/3d-constitution-book.svg"
                  alt="3D Constitution of India Book render"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-navy text-brass-light border border-brass/40">
                  <BookOpen size={13} />
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                  Articles 12 to 35
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-bold text-navy group-hover:text-brass-dark transition-colors">
                Fundamental Freedoms
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                The supreme charter protecting free speech, assembly, movement, conscience, personal privacy, and constitutional remedies.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-brass-dark transition-colors">
                Browse All 6 Core Rights <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: 3D Citizen Legal Shield */}
            <Link
              to="/harmed"
              className="group card-surface block cursor-pointer relative overflow-hidden rounded-2xl p-7 transition-all hover:border-indigo-500/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
                <img
                  src="/images/3d-legal-shield.svg"
                  alt="3D Citizen Legal Shield and Gavel render"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  <ShieldCheck size={13} />
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                  Articles 32 &amp; 226
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-bold text-navy group-hover:text-indigo-800 transition-colors">
                Citizen Redress &amp; Remedies
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Direct rights to petition the High Courts and Supreme Court via Writs, mandatory police FIR procedures, and legal aid.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-indigo-800 transition-colors">
                Assess Your Situation <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Chart Tree: Interactive Hierarchy & 3D Drawing Diagram */}
      <section className="container-content py-16 sm:py-24">
        <LegalTreeChart />
      </section>

      {/* Curated Legal Showcase (Clean, Airy, Uncluttered) */}
      <section className="border-t border-border/80 bg-paper/60 py-16 sm:py-24">
        <div className="container-content">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="article-tab mb-2">Curated Digest</span>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Explore Rights &amp; Law Categories
              </h2>
              <p className="mt-1 text-sm text-ink/70">
                Select between constitutional protections or statutory law domains.
              </p>
            </div>

            {/* Toggle Switch to keep page freely and avoid card clutter */}
            <div className="inline-flex rounded-lg border border-border/90 bg-paper p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setCuratedTab('rights')}
                className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  curatedTab === 'rights'
                    ? 'bg-navy text-paper shadow-xs'
                    : 'text-ink/70 hover:text-navy hover:bg-paper-dim'
                }`}
              >
                <Compass size={14} /> Fundamental Rights
              </button>
              <button
                type="button"
                onClick={() => setCuratedTab('categories')}
                className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  curatedTab === 'categories'
                    ? 'bg-navy text-paper shadow-xs'
                    : 'text-ink/70 hover:text-navy hover:bg-paper-dim'
                }`}
              >
                <FolderOpen size={14} /> Law Categories
              </button>
            </div>
          </div>

          {/* Curated Content View */}
          <div className="mt-10">
            {curatedTab === 'rights' ? (
              <div>
                {rightsFallback && <OfflineNotice className="mb-4" />}
                {rightsLoading ? (
                  <LoadingState label="Loading fundamental rights..." />
                ) : (
                  <>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {fundamentalRights.slice(0, 3).map((right) => (
                        <RightCard key={right.id} right={right} compact />
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button
                        to="/fundamental-rights"
                        variant="secondary"
                        size="md"
                        icon={ArrowRight}
                      >
                        View All 6 Fundamental Rights
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                {categoriesFallback && <OfflineNotice className="mb-4" />}
                {categoriesLoading ? (
                  <LoadingState label="Loading categories..." />
                ) : (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {categories.slice(0, 4).map((category) => (
                        <CategoryCard key={category.id} category={category} />
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button
                        to="/laws"
                        variant="secondary"
                        size="md"
                        icon={ArrowRight}
                      >
                        Browse All {categories.length} Law Categories
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Something Happened to You? High-Contrast Action Banner */}
      <section className="relative overflow-hidden container-content py-16 sm:py-24">
        <Link
          to="/harmed"
          className="card-surface group relative block cursor-pointer overflow-hidden rounded-2xl border-l-4 border-l-brass p-8 sm:p-12 transition-all hover:shadow-xl hover:border-l-brass-dark focus:outline-none focus:ring-2 focus:ring-brass"
        >
          {/* Subtle Background Pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-cover bg-right opacity-25 mix-blend-multiply"
            style={{ backgroundImage: "url('/images/bg-legal-pattern.svg')" }}
          />

          <div className="relative z-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="article-tab mb-3">Legal Guidance &amp; Redress</span>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl group-hover:text-brass-dark transition-colors">
                Something Happened to You?
              </h2>
              <p className="mt-3 text-ink/75 text-sm sm:text-base leading-relaxed">
                Tell us what happened in your own words. Learn about the legal
                areas, police filing rules (FIR), and constitutional protections that apply to your situation.
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center justify-center gap-2.5 rounded-lg font-body font-medium bg-navy text-paper border border-navy px-6 py-3.5 text-base group-hover:bg-navy-light group-hover:shadow-md transition-all">
                  <span>Describe My Situation</span>
                  <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
            <div className="relative shrink-0 hidden sm:flex sm:h-48 sm:w-48 lg:h-56 lg:w-56 items-center justify-center">
              <img
                src="/images/3d-legal-shield.svg"
                alt="3D Legal Shield of Protection"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </Link>
      </section>
    </>
  )
}
