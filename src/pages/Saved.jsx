import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Bookmark,
  Trash2,
  ExternalLink,
  ArrowRight,
  Filter,
  Search,
  BookOpen,
  Scale,
  Shield,
  FileText,
  Landmark,
  HardDrive,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Saved() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks()
  const { t, isHindi } = useLanguage()

  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Filter tabs with dynamic counts
  const counts = useMemo(() => {
    const res = { all: bookmarks.length, law: 0, right: 0, guide: 0, case: 0, term: 0, other: 0 }
    bookmarks.forEach((b) => {
      const type = b.type?.toLowerCase() || 'other'
      if (type === 'law' || type === 'statute' || type === 'section') {
        res.law++
      } else if (type === 'right' || type === 'article' || type === 'topic') {
        res.right++
      } else if (type === 'guide') {
        res.guide++
      } else if (type === 'case') {
        res.case++
      } else if (type === 'term') {
        res.term++
      } else {
        res.other++
      }
    })
    return res
  }, [bookmarks])

  // Filtered bookmarks list
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((item) => {
      const matchesTab = () => {
        if (activeTab === 'all') return true
        const type = item.type?.toLowerCase() || 'other'
        if (activeTab === 'law') return type === 'law' || type === 'statute' || type === 'section'
        if (activeTab === 'right') return type === 'right' || type === 'article' || type === 'topic'
        if (activeTab === 'guide') return type === 'guide'
        if (activeTab === 'case') return type === 'case'
        if (activeTab === 'term') return type === 'term'
        return true
      }

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)

      return matchesTab() && matchesSearch
    })
  }, [bookmarks, activeTab, searchQuery])

  const formatDate = (isoString) => {
    if (!isoString) return ''
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return ''
    }
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case 'law':
      case 'statute':
      case 'section':
        return {
          label: isHindi ? 'कानून / धारा' : 'Statute / Section',
          icon: Scale,
          color: 'bg-navy/10 text-navy border-navy/20',
        }
      case 'article':
      case 'right':
        return {
          label: isHindi ? 'मौलिक अधिकार' : 'Constitutional Right',
          icon: Shield,
          color: 'bg-brass/15 text-brass-dark border-brass/30',
        }
      case 'topic':
        return {
          label: isHindi ? 'अधिकार विषय' : 'Rights Topic',
          icon: BookOpen,
          color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        }
      case 'guide':
        return {
          label: isHindi ? 'प्रक्रियात्मक गाइड' : 'Procedural Guide',
          icon: FileText,
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        }
      case 'case':
        return {
          label: isHindi ? 'न्यायिक निर्णय' : 'Judicial Precedent',
          icon: Landmark,
          color: 'bg-oxblood/10 text-oxblood-dark border-oxblood/20',
        }
      case 'term':
        return {
          label: isHindi ? 'कानूनी शब्द' : 'Legal Term',
          icon: BookOpen,
          color: 'bg-amber-50 text-amber-900 border-amber-200',
        }
      default:
        return {
          label: isHindi ? 'कानूनी संसाधन' : 'Legal Resource',
          icon: FileText,
          color: 'bg-stone-100 text-ink/80 border-border',
        }
    }
  }

  return (
    <div className="bg-paper min-h-screen text-ink py-8 sm:py-14">
      <div className="container-content max-w-5xl">
        {/* Header Section */}
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-2">
                <Bookmark size={13} className="text-brass-dark" aria-hidden="true" />
                <span>{isHindi ? 'सहेजी गई सामग्री' : 'Personal Saved Library'}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy tracking-tight leading-tight">
                {isHindi ? 'सहेजे गए कानूनी संसाधन' : 'Saved Legal Content'}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-ink/70 max-w-2xl">
                {isHindi
                  ? 'त्वरित संदर्भ, ऑफ़लाइन अध्ययन और नागरिक अधिकारों की जानकारी के लिए सहेजी गई सामग्री।'
                  : 'Your bookmarked statutes, constitutional articles, procedural guides, and legal terms for quick offline access.'}
              </p>
            </div>

            {bookmarks.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-oxblood-dark hover:bg-oxblood/10 border border-oxblood/20 rounded-sm transition-colors"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  <span>{isHindi ? 'सभी हटाएं' : 'Clear all saved'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Privacy & Local Persistence Storage Callout */}
          <div className="mt-5 flex items-start gap-2.5 rounded-sm border border-border/80 bg-stone-50 p-3.5 text-xs text-ink/75 leading-relaxed">
            <HardDrive size={16} className="text-brass-dark shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-navy">
                {isHindi ? 'गोपनीयता और स्थानीय भंडारण:' : 'Device-Only Storage:'}
              </span>{' '}
              {isHindi
                ? 'यह सामग्री केवल आपके इसी ब्राउज़र के सुरक्षित स्थानीय भंडारण (LocalStorage) में सुरक्षित रखी जाती है। यह किसी भी क्लाउड सर्वर पर नहीं भेजी जाती है।'
                : 'Bookmarks are stored strictly in this browser’s local storage on this device. They are kept private, available offline, and not synced to external cloud servers.'}
            </div>
          </div>
        </header>

        {/* Clear Confirmation Banner */}
        {showClearConfirm && (
          <div className="mt-6 rounded-sm border border-oxblood/30 bg-oxblood/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-oxblood-dark">
                {isHindi ? 'क्या आप सभी सहेजी गई सामग्री हटाना चाहते हैं?' : 'Remove all saved bookmarks?'}
              </h2>
              <p className="text-xs text-ink/70 mt-1">
                {isHindi
                  ? 'यह क्रिया आपके स्थानीय ब्राउज़र से सभी सहेजे गए बुकमार्क मिटा देगी।'
                  : 'This will delete all saved items from this device. This action cannot be undone.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium border border-border rounded-sm bg-paper hover:bg-page text-ink/80 transition-colors"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearBookmarks()
                  setShowClearConfirm(false)
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-sm bg-oxblood-dark text-white hover:bg-oxblood transition-colors shadow-2xs"
              >
                {isHindi ? 'हां, सब हटाएं' : 'Yes, clear all'}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {bookmarks.length === 0 ? (
          /* Clean Empty State */
          <div className="mt-12 rounded-sm border border-dashed border-border/90 bg-page/40 p-8 sm:p-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 text-navy border border-navy/15 mb-4">
              <Bookmark size={26} className="text-brass-dark" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy">
              {isHindi ? 'अभी तक कोई सामग्री सहेजी नहीं गई है' : 'No saved resources yet'}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/65 leading-relaxed">
              {isHindi
                ? 'कानून, मौलिक अधिकार, व्यावहारिक गाइड और न्यायिक निर्णयों पर बुकमार्क आइकन (सहेजें) दबाकर उन्हें यहां त्वरित पहुंच के लिए रखें।'
                : 'Bookmark statutes, constitutional articles, procedural guides, and landmark precedents across Nyaya to revisit them quickly anytime.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/laws"
                className="inline-flex items-center gap-1.5 rounded-sm bg-navy px-4 py-2 text-xs font-semibold text-paper hover:bg-navy-light transition-colors shadow-2xs"
              >
                <Scale size={14} aria-hidden="true" />
                <span>{isHindi ? 'कानून देखें' : 'Explore Laws'}</span>
              </Link>
              <Link
                to="/know-your-rights"
                className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-paper px-4 py-2 text-xs font-semibold text-navy hover:bg-page hover:border-navy transition-colors"
              >
                <BookOpen size={14} className="text-brass-dark" aria-hidden="true" />
                <span>{isHindi ? 'अधिकार केंद्र' : 'Know Your Rights'}</span>
              </Link>
              <Link
                to="/fundamental-rights"
                className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-paper px-4 py-2 text-xs font-semibold text-navy hover:bg-page hover:border-navy transition-colors"
              >
                <Shield size={14} className="text-brass-dark" aria-hidden="true" />
                <span>{isHindi ? 'संवैधानिक अधिकार' : 'Fundamental Rights'}</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Bookmarks List View */
          <div className="mt-8 space-y-6">
            {/* Filter Tabs & Search Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: isHindi ? 'सभी' : 'All', count: counts.all },
                  { id: 'law', label: isHindi ? 'कानून' : 'Laws', count: counts.law },
                  { id: 'right', label: isHindi ? 'अधिकार व धाराएं' : 'Rights & Articles', count: counts.right },
                  { id: 'guide', label: isHindi ? 'गाइड' : 'Guides', count: counts.guide },
                  { id: 'case', label: isHindi ? 'निर्णय' : 'Precedents', count: counts.case },
                  { id: 'term', label: isHindi ? 'शब्दावली' : 'Terms', count: counts.term },
                ].map((tab) => {
                  if (tab.id !== 'all' && tab.count === 0) return null
                  const active = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-medium transition-colors ${
                        active
                          ? 'bg-navy text-paper font-semibold shadow-2xs'
                          : 'bg-page text-ink/75 hover:bg-paper hover:text-navy border border-border/70'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          active ? 'bg-paper/20 text-paper' : 'bg-navy/10 text-navy'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* In-List Search Filter */}
              {bookmarks.length > 2 && (
                <div className="relative min-w-[200px]">
                  <Search
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink/40"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isHindi ? 'सहेजी गई सूची में खोजें...' : 'Filter saved list...'}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-page/60 border border-border rounded-xs focus:outline-hidden focus:ring-1 focus:ring-navy focus:bg-paper"
                  />
                </div>
              )}
            </div>

            {/* Bookmarks Grid / List */}
            {filteredBookmarks.length === 0 ? (
              <div className="rounded-xs border border-border bg-page p-8 text-center text-xs sm:text-sm text-ink/60">
                {isHindi
                  ? 'चयनित श्रेणी या खोज के अनुसार कोई बुकमार्क नहीं मिला।'
                  : 'No bookmarks matching your filter criteria.'}
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-5">
                {filteredBookmarks.map((item) => {
                  const badge = getTypeBadge(item.type)
                  const BadgeIcon = badge.icon

                  return (
                    <article
                      key={item.id}
                      className="rounded-xs border border-border/80 bg-paper p-5 sm:p-6 shadow-2xs hover:border-navy/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        {/* Meta row: Category + Type + Date */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-xs border px-2 py-0.5 text-[11px] font-medium ${badge.color}`}
                            >
                              <BadgeIcon size={12} aria-hidden="true" />
                              <span>{badge.label}</span>
                            </span>
                            {item.category && (
                              <span className="font-mono text-xs text-oxblood/80 font-medium uppercase tracking-wider">
                                {item.category}
                              </span>
                            )}
                          </div>

                          {item.savedAt && (
                            <span className="text-[11px] font-mono text-ink/45 flex items-center gap-1">
                              <Clock size={11} aria-hidden="true" />
                              {formatDate(item.savedAt)}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="mt-3 font-display text-lg sm:text-xl font-semibold text-navy leading-snug">
                          <Link
                            to={item.url}
                            className="hover:text-brass-dark hover:underline transition-colors"
                          >
                            {item.title}
                          </Link>
                        </h2>

                        {/* Description */}
                        {item.description && (
                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75 line-clamp-3">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer: Open action + Remove action */}
                      <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between gap-4">
                        <Link
                          to={item.url}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-brass-dark transition-colors group"
                        >
                          <span>{isHindi ? 'संसाधन खोलें' : 'Open resource'}</span>
                          <ArrowRight
                            size={13}
                            className="transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeBookmark(item.id)}
                          aria-label={`${isHindi ? 'सहेजे गए से हटाएं' : 'Remove from saved'}: ${item.title}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-ink/50 hover:text-oxblood-dark transition-colors p-1 rounded-xs hover:bg-oxblood/5"
                        >
                          <Trash2 size={13} aria-hidden="true" />
                          <span className="hidden sm:inline">{isHindi ? 'हटाएं' : 'Remove'}</span>
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
