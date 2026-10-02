import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Shield,
  ShoppingBag,
  Briefcase,
  Home as HomeIcon,
  Users,
  Wifi,
  Landmark,
  Scale,
  Search,
  X,
  ExternalLink,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Compass,
} from 'lucide-react'
import { rightsCategories, getAllRightsTopics } from '../data/rightsHub.js'
import { fetchRightsHub } from '../api/client.js'
import { useApi } from '../hooks/useApi.js'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

// Map category icons safely
const CATEGORY_ICONS = {
  'police-enforcement': Shield,
  'consumer-rights': ShoppingBag,
  'workplace-rights': Briefcase,
  'tenant-property': HomeIcon,
  'women-child': Users,
  'cyber-digital': Wifi,
  'constitutional-rights': Landmark,
  'access-justice': Scale,
}

const CATEGORY_HINDI = {
  'police-enforcement': { title: 'पुलिस व कानून प्रवर्तन', short: 'पुलिस व हिरासत' },
  'consumer-rights': { title: 'उपभोक्ता अधिकार व सुरक्षा', short: 'उपभोक्ता अधिकार' },
  'workplace-rights': { title: 'कार्यस्थल अधिकार व श्रम कानून', short: 'कार्यस्थल अधिकार' },
  'tenant-property': { title: 'किरायेदार व संपत्ति सुरक्षा', short: 'किरायेदार व संपत्ति' },
  'women-child': { title: 'महिलाएं व बाल संरक्षण अधिकार', short: 'महिलाएं व बच्चे' },
  'cyber-digital': { title: 'साइबर व डिजिटल नागरिक अधिकार', short: 'साइबर व डिजिटल' },
  'constitutional-rights': { title: 'मौलिक संवैधानिक स्वतंत्रताएं', short: 'संवैधानिक स्वतंत्रता' },
  'access-justice': { title: 'न्याय व कानूनी सहायता तक पहुंच', short: 'न्याय तक पहुंच' },
}

export default function RightsHub() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, isHindi } = useLanguage()

  // API data with instant offline dataset fallback
  const {
    data: categories,
    loading,
    usingFallback,
  } = useApi(fetchRightsHub, [], rightsCategories)

  // Parse URL query params
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'all'
  const initialSearch = queryParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  // Sync state if URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('category') || 'all'
    const q = params.get('q') || ''
    setSelectedCategory(cat)
    setSearchQuery(q)
  }, [location.search])

  // Hash-based smooth scroll for deep-linked topics
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [location.hash, loading])

  // Update query params when user changes category or search
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    const params = new URLSearchParams(location.search)
    if (categoryId === 'all') {
      params.delete('category')
    } else {
      params.set('category', categoryId)
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchQuery(val)
    const params = new URLSearchParams(location.search)
    if (val.trim()) {
      params.set('q', val)
    } else {
      params.delete('q')
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const clearSearch = () => {
    setSearchQuery('')
    const params = new URLSearchParams(location.search)
    params.delete('q')
    navigate({ search: params.toString() }, { replace: true })
  }

  // Filter topics based on active category and search query
  const filteredCategories = useMemo(() => {
    const activeCategories =
      selectedCategory === 'all'
        ? categories
        : categories.filter((c) => c.id === selectedCategory)

    const query = searchQuery.toLowerCase().trim()
    if (!query) {
      return activeCategories
    }

    return activeCategories
      .map((cat) => {
        const matchingTopics = cat.topics.filter((topic) => {
          const matchTitle = topic.title.toLowerCase().includes(query)
          const matchLaw = topic.relevantLaw.toLowerCase().includes(query)
          const matchArea = topic.legalArea.toLowerCase().includes(query)
          const matchExplanation = topic.explanation.toLowerCase().includes(query)
          const matchExample = topic.practicalExample.toLowerCase().includes(query)
          const matchKeywords =
            topic.keywords &&
            topic.keywords.some((kw) => kw.toLowerCase().includes(query))
          return (
            matchTitle ||
            matchLaw ||
            matchArea ||
            matchExplanation ||
            matchExample ||
            matchKeywords
          )
        })

        return {
          ...cat,
          topics: matchingTopics,
        }
      })
      .filter((cat) => cat.topics.length > 0)
  }, [categories, selectedCategory, searchQuery])

  // Total topics count
  const totalTopicsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + (cat.topics?.length || 0), 0)
  }, [categories])

  const visibleTopicsCount = useMemo(() => {
    return filteredCategories.reduce(
      (sum, cat) => sum + (cat.topics?.length || 0),
      0
    )
  }, [filteredCategories])

  return (
    <div className="min-h-screen bg-page text-ink pb-16 sm:pb-24">
      {/* Offline Notice if applicable */}
      {usingFallback && <OfflineNotice context="Rights Hub" />}

      {/* Header Section */}
      <header className="border-b border-border/80 bg-paper pt-10 pb-8 sm:pt-14 sm:pb-12">
        <div className="container-content max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-2 block">
                {isHindi ? 'नागरिक कानूनी संदर्भ · अपने अधिकार जानें' : 'Citizen Legal Reference · Know Your Rights'}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight">
                {isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed max-w-2xl">
                {isHindi
                  ? 'भारत में अपने दैनिक वैधानिक और संवैधानिक अधिकारों का स्पष्ट, नागरिक-अनुकूल संकलन। पुलिस पूछताछ, कार्यस्थल, किरायेदारी, उपभोक्ता विवाद और न्यायालयों में अपने कानूनी अधिकारों को जानें।'
                  : 'A clear, citizen-friendly reference to your everyday statutory and constitutional protections in India. Explore what the law guarantees you during police encounters, at work, as a tenant or consumer, online, and before the courts.'}
              </p>

              {/* Search Input Bar */}
              <div className="mt-8 max-w-xl">
                <div className="relative flex items-center">
                  <label htmlFor="rights-hub-search" className="sr-only">
                    {isHindi ? 'अधिकार, कानून या स्थिति खोजें' : 'Search rights, statutes, or everyday situations'}
                  </label>
                  <Search
                    size={18}
                    className="absolute left-3.5 text-ink/45 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="rights-hub-search"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={
                      isHindi
                        ? 'अधिकार खोजें, जैसे "गिरफ्तारी", "किरायेदार बिजली", "मातृत्व अवकाश", "ज़ीरो एफआईआर"...'
                        : 'Search rights, e.g. "arrest", "landlord electricity", "maternity", "zero fir"...'
                    }
                    className="w-full rounded-xs border border-border bg-page py-3 pl-10 pr-10 text-sm text-ink placeholder:text-ink/45 focus:border-navy focus:bg-paper focus:outline-hidden focus:ring-1 focus:ring-navy transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label={isHindi ? 'खोज साफ़ करें' : 'Clear search'}
                      className="absolute right-3 p-1 text-ink/45 hover:text-navy transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-ink/60">
                  <span>
                    {isHindi
                      ? `${totalTopicsCount} में से ${visibleTopicsCount} वैधानिक अधिकार प्रदर्शित`
                      : `Showing ${visibleTopicsCount} of ${totalTopicsCount} codified rights`}
                  </span>
                  <span className="hidden sm:inline">
                    {isHindi
                      ? 'केंद्रीय अधिनियमों और सर्वोच्च न्यायालय के निर्णयों से सत्यापित'
                      : 'Verified against Central Acts & SC Precedents'}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Anchor: Legal Shield Illustration */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <img
                src="/images/3d-legal-shield.svg"
                alt="Legal Protections Shield illustration"
                className="w-36 sm:w-44 lg:w-52 h-auto object-contain select-none"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container-content max-w-5xl py-8 sm:py-10">
        {/* Category Filter Tabs */}
        <nav
          aria-label="Filter Rights by Category"
          className="border-b border-border/80 pb-4 mb-8"
        >
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-ink/60 mb-3">
            {isHindi ? 'कानूनी क्षेत्र चुनें' : 'Select Legal Sphere'}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-sm border transition-colors ${
                selectedCategory === 'all'
                  ? 'border-navy bg-navy text-paper shadow-2xs font-semibold'
                  : 'border-border bg-paper text-ink/75 hover:bg-page hover:text-navy'
              }`}
            >
              <Compass size={14} aria-hidden="true" />
              <span>{isHindi ? `सभी क्षेत्र (${totalTopicsCount})` : `All Spheres (${totalTopicsCount})`}</span>
            </button>

            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] || FileText
              const isSelected = selectedCategory === cat.id
              const count = cat.topics?.length || 0
              const label = isHindi && CATEGORY_HINDI[cat.id] ? CATEGORY_HINDI[cat.id].short : (cat.shortTitle || cat.title)

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-sm border transition-colors ${
                    isSelected
                      ? 'border-navy bg-navy text-paper shadow-2xs font-semibold'
                      : 'border-border bg-paper text-ink/75 hover:bg-page hover:text-navy'
                  }`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      isSelected ? 'text-paper/70' : 'text-ink/45'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Codified Spheres Editorial Index when viewing all */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12 border border-border/80 bg-paper p-6 sm:p-8 rounded-xs shadow-2xs">
            <div className="border-b border-border/80 pb-3 mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">
                {isHindi ? 'नागरिक अधिकारों की संहिताबद्ध अनुक्रमणिका' : 'Index of Codified Spheres'}
              </h2>
              <span className="font-mono text-xs text-maroon font-bold">
                8 {isHindi ? 'कानूनी क्षेत्र' : 'Spheres'} · {totalTopicsCount} {isHindi ? 'अधिकार' : 'Codified Rights'}
              </span>
            </div>
            <div className="divide-y divide-border/60">
              {categories.map((cat, idx) => {
                const count = cat.topics?.length || 0
                const label = isHindi && CATEGORY_HINDI[cat.id] ? CATEGORY_HINDI[cat.id].title : cat.title
                const num = String(idx + 1).padStart(2, '0')
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5 hover:bg-page/70 px-2 transition-colors rounded-xs"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="font-mono text-xs font-bold text-maroon shrink-0 pt-0.5 sm:pt-0">{num}</span>
                      <div>
                        <span className="font-display font-semibold text-navy group-hover:text-maroon transition-colors text-base sm:text-lg block">
                          {label}
                        </span>
                        <span className="text-xs text-ink/65 line-clamp-1">{cat.description}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="font-mono text-[11px] text-ink/50 bg-page px-2 py-0.5 rounded-xs border border-border/60">
                        {count} {isHindi ? 'अधिकार' : 'rights'}
                      </span>
                      <ArrowRight size={13} className="text-ink/40 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Results Area */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-sm border border-border bg-paper p-8 text-center sm:p-12">
            <Search size={32} className="mx-auto text-ink/40 mb-3" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-navy">
              {isHindi ? 'कोई मेल खाता अधिकार नहीं मिला' : 'No matching rights found'}
            </h2>
            <p className="mt-2 text-sm text-ink/65 max-w-md mx-auto leading-relaxed">
              {isHindi
                ? `"${searchQuery}" से मेल खाता कोई वैधानिक अधिकार नहीं मिला। "पुलिस", "रिफंड", "वेतन" या "बेदखली" जैसे सरल शब्दों से पुनः खोजें।`
                : `We couldn't find any codified right matching "${searchQuery}". Try using simpler search terms like "police", "refund", "wages", or "eviction".`}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-sm bg-navy px-4 py-2 text-xs font-medium text-paper hover:bg-navy-light transition-colors"
              >
                {isHindi ? 'खोज साफ़ करें' : 'Clear Search Query'}
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="rounded-sm border border-border bg-page px-4 py-2 text-xs font-medium text-navy hover:bg-paper transition-colors"
              >
                {isHindi ? 'सभी श्रेणियां देखें' : 'View All Categories'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {filteredCategories.map((category) => {
              const CategoryIcon = CATEGORY_ICONS[category.id] || FileText
              const categoryTitle = isHindi && CATEGORY_HINDI[category.id]
                ? `${CATEGORY_HINDI[category.id].title} (${category.title})`
                : category.title

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-20"
                >
                  {/* Category Title & Description */}
                  <div className="border-b border-border/80 pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy/10 text-navy border border-navy/15">
                        <CategoryIcon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                          {categoryTitle}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed max-w-3xl">
                      {category.description}
                    </p>
                  </div>

                  {/* Topic Items Stack */}
                  <div className="space-y-6">
                    {category.topics.map((topic) => (
                      <article
                        key={topic.id}
                        id={topic.id}
                        className="rounded-sm border border-border/90 bg-paper p-6 sm:p-7 shadow-xs hover:border-navy/35 transition-colors scroll-mt-24"
                      >
                        {/* Topic Header: Title & Law Citation */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-border/70 pb-4">
                          <div className="max-w-3xl">
                            <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy leading-snug">
                              {topic.title}
                            </h3>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                              <span className="font-medium text-navy/80">
                                {topic.legalArea}
                              </span>
                              <span className="text-ink/30" aria-hidden="true">
                                ·
                              </span>
                              <span className="font-mono text-[11px] font-medium text-brass-dark">
                                {topic.relevantLaw}
                              </span>
                            </div>
                          </div>
                          <div className="shrink-0 pt-0.5">
                            <BookmarkButton
                              item={{
                                id: `topic-${topic.id}`,
                                title: topic.title,
                                category: categoryTitle || topic.legalArea,
                                type: 'topic',
                                description: topic.explanation,
                                url: `/know-your-rights?category=${category.id}#${topic.id}`,
                              }}
                              variant="button"
                              size="sm"
                            />
                          </div>
                        </div>

                        {/* Plain Language Explanation */}
                        <div className="mt-4">
                          <h4 className="sr-only">Explanation of Right</h4>
                          <p className="text-sm sm:text-base leading-relaxed text-ink/85">
                            {topic.explanation}
                          </p>
                        </div>

                        {/* Practical Real-World Example Callout */}
                        {topic.practicalExample && (
                          <div className="mt-5 rounded-r-sm border-l-3 border-brass-dark bg-page/85 p-4 text-xs sm:text-sm text-ink/85 leading-relaxed">
                            <span className="font-semibold text-navy block mb-1">
                              {isHindi ? 'व्यावहारिक वास्तविक परिदृश्य:' : 'Practical Real-World Scenario:'}
                            </span>
                            <p>{topic.practicalExample}</p>
                          </div>
                        )}

                        {/* Practical Action Steps Checklist */}
                        {topic.actionPoints && topic.actionPoints.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-border/60">
                            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2.5">
                              {isHindi ? 'व्यावहारिक अधिकार एवं तत्काल उठाए जाने वाले कदम' : 'Rights in Practice & Immediate Steps'}
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-ink/80">
                              {topic.actionPoints.map((step, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 leading-relaxed"
                                >
                                  <CheckCircle2
                                    size={15}
                                    className="text-emerald-700 shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Related Nyaya Pages & Official Government Source */}
                        <div className="mt-6 pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Internal Links to related Nyaya pages */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-xs font-medium text-navy/70 mr-1">
                              {isHindi ? 'न्याय पर संबंधित विषय:' : 'Related on Nyaya:'}
                            </span>
                            {topic.relatedPages.map((page, idx) => (
                              <Link
                                key={idx}
                                to={page.to}
                                className="inline-flex items-center gap-1 rounded-xs border border-border bg-page px-2.5 py-1 text-xs text-navy hover:border-navy hover:bg-paper transition-colors font-medium"
                              >
                                <BookOpen size={12} className="text-brass-dark" aria-hidden="true" />
                                <span>{page.title}</span>
                              </Link>
                            ))}
                          </div>

                          {/* Official Source Link */}
                          {topic.officialSource && (
                            <div className="self-start sm:self-auto">
                              <a
                                href={topic.officialSource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-brass-dark hover:text-navy hover:underline transition-colors font-medium"
                                title={`Verified on ${topic.officialSource.portal}`}
                              >
                                <span>{isHindi ? 'आधिकारिक स्रोत:' : 'Official Source:'} {topic.officialSource.portal}</span>
                                <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* Guided Situations CTA Box */}
        <div className="mt-14 rounded-sm border border-navy/20 bg-paper p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-1 block">
                {isHindi ? 'क्या कोई विशिष्ट कानूनी समस्या या शिकायत है?' : 'Have a specific grievance or incident?'}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy">
                {isHindi ? 'सरल भाषा में बताएं कि क्या घटना घटी' : 'Describe What Happened in Plain English'}
              </h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                {isHindi
                  ? 'यदि आप किसी सक्रिय विवाद, गलत हिरासत, वित्तीय धोखाधड़ी या मकान मालिक उत्पीड़न का सामना कर रहे हैं, तो अपनी समस्या बताएं और लागू कानूनी प्रावधान जानें।'
                  : 'If you are dealing with an active dispute, wrongful detention, financial fraud, or landlord harassment, use our guided situation tool to match your narrative against codified statutes.'}
              </p>
            </div>
            <Link
              to="/harmed"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-5 py-3 text-xs font-semibold text-paper shadow-xs hover:bg-navy-light transition-colors shrink-0"
            >
              <span>{isHindi ? 'क्या घटना घटी बताएं' : 'Describe What Happened'}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Institutional Legal Disclaimer */}
        <div className="mt-10">
          <LegalDisclaimer />
        </div>
      </div>
    </div>
  )
}
