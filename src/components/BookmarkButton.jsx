import { useState } from 'react'
import { Bookmark, Check } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Reusable accessible bookmark toggle button.
 * Can be placed inside card headers, action bars, or detail page banners.
 * Automatically stops event propagation to prevent parent link clicks.
 */
export default function BookmarkButton({
  item,
  size = 'md',
  variant = 'icon',
  className = '',
  showLabel = false,
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isHindi } = useLanguage()
  const [justToggled, setJustToggled] = useState(false)

  if (!item || !item.id) return null

  const isSaved = isBookmarked(item.id)

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(item)
    setJustToggled(true)
    setTimeout(() => setJustToggled(false), 1400)
  }

  // Dimension classes
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16

  const labelText = isSaved
    ? isHindi
      ? 'सहेजा गया'
      : 'Saved'
    : isHindi
    ? 'सहेजें'
    : 'Save'

  const accessibleLabel = isSaved
    ? isHindi
      ? `सहेजे गए से हटाएं: ${item.title}`
      : `Remove from saved: ${item.title}`
    : isHindi
    ? `सहेजें: ${item.title}`
    : `Save to bookmarks: ${item.title}`

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isSaved}
        aria-label={accessibleLabel}
        className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-xs text-xs font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy ${
          isSaved
            ? 'bg-maroon-faint text-maroon hover:bg-maroon/15 border border-maroon/30'
            : 'border border-border/80 bg-paper text-ink/75 hover:text-navy hover:border-navy hover:bg-page'
        } ${className}`}
      >
        <Bookmark
          size={iconSize}
          className={`transition-transform duration-200 ${
            isSaved ? 'fill-maroon text-maroon scale-105' : 'text-current'
          }`}
          aria-hidden="true"
        />
        <span>{labelText}</span>
        {justToggled && (
          <span className="sr-only">
            {isSaved ? 'Saved to bookmarks' : 'Removed from bookmarks'}
          </span>
        )}
      </button>
    )
  }

  if (variant === 'badge' || showLabel) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isSaved}
        aria-label={accessibleLabel}
        className={`inline-flex items-center gap-1.5 min-h-[32px] px-2.5 py-1 rounded-xs text-xs font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy ${
          isSaved
            ? 'bg-maroon-faint text-maroon font-semibold border border-maroon/20'
            : 'text-ink/65 hover:text-navy hover:bg-navy/5 border border-transparent'
        } ${className}`}
      >
        <Bookmark
          size={iconSize}
          className={`transition-colors ${
            isSaved ? 'fill-maroon text-maroon' : 'text-current'
          }`}
          aria-hidden="true"
        />
        <span className="text-[11px]">{labelText}</span>
      </button>
    )
  }

  // Default subtle icon button
  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isSaved}
      aria-label={accessibleLabel}
      title={isSaved ? (isHindi ? 'सहेजा गया' : 'Saved to bookmarks') : (isHindi ? 'सहेजें' : 'Save bookmark')}
      className={`group relative flex items-center justify-center shrink-0 rounded-xs min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] p-1.5 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy ${
        isSaved
          ? 'text-maroon hover:bg-maroon/10'
          : 'text-ink/40 hover:text-navy hover:bg-navy/5'
      } ${className}`}
    >
      <Bookmark
        size={iconSize}
        className={`transition-all duration-200 ${
          isSaved
            ? 'fill-maroon text-maroon scale-110'
            : 'group-hover:scale-105'
        }`}
        aria-hidden="true"
      />
      {justToggled && (
        <span className="sr-only" role="status">
          {isSaved ? 'Saved to bookmarks' : 'Removed from bookmarks'}
        </span>
      )}
    </button>
  )
}
