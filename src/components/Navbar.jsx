import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Scale, Search, ArrowRight, Bookmark } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useBookmarks } from '../context/BookmarkContext.jsx'

const LINKS = [
  { to: '/', label: 'Home', navKey: 'nav.home' },
  { to: '/know-your-rights', label: 'Know Your Rights', navKey: 'nav.knowYourRights' },
  { to: '/fundamental-rights', label: 'Fundamental Rights', navKey: 'nav.fundamentalRights' },
  { to: '/tools', label: 'Legal Tools', navKey: 'nav.legalTools' },
  { to: '/workflow', label: 'AI Workflow', navKey: 'nav.aiWorkflow' },
  { to: '/compare', label: 'Compare Laws', navKey: 'nav.compareLaws' },
  { to: '/laws', label: 'Explore Laws', navKey: 'nav.exploreLaws' },
  { to: '/laws/bns-2023', label: 'BNS 2023', navKey: 'nav.bns2023' },
  { to: '/harmed', label: 'What Happened?', navKey: 'nav.whatHappened' },
  { to: '/legal-terms', label: 'Legal Terms', navKey: 'nav.legalTerms' },
]

/**
 * Intelligent route matching for active navigation tabs
 */
function isLinkActive(to, pathname) {
  if (to === '/') {
    return pathname === '/'
  }
  if (to === '/tools') {
    return pathname.startsWith('/tools') || pathname.startsWith('/legal-tools')
  }
  if (to === '/workflow') {
    return pathname.startsWith('/workflow') || pathname.startsWith('/ai-workflow') || pathname.startsWith('/information-workflow') || pathname === '/ask'
  }
  if (to === '/saved') {
    return pathname.startsWith('/saved') || pathname.startsWith('/bookmarks')
  }
  if (to === '/know-your-rights') {
    return pathname.startsWith('/know-your-rights') || pathname.startsWith('/rights-hub') || pathname === '/rights'
  }
  if (to === '/laws/bns-2023') {
    return pathname === '/laws/bns-2023' || pathname === '/bns'
  }
  if (to === '/laws') {
    // Only active for generic laws exploration or other laws (not BNS specifically)
    if (pathname === '/laws' || pathname === '/laws/') return true
    if (pathname.startsWith('/laws/') && pathname !== '/laws/bns-2023') return true
    return false
  }
  if (to === '/compare') {
    return pathname.startsWith('/compare')
  }
  if (to === '/harmed') {
    return pathname.startsWith('/harmed') || pathname.startsWith('/what-happened')
  }
  if (to === '/fundamental-rights') {
    return pathname.startsWith('/fundamental-rights')
  }
  if (to === '/legal-terms') {
    return pathname.startsWith('/legal-terms')
  }
  return pathname.startsWith(to)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()
  const { count } = useBookmarks()

  // Auto-close mobile drawer when route or hash changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Close the mobile menu whenever the viewport is resized back to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold text-navy group"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xs bg-navy text-brass-light border border-navy group-hover:bg-navy-light transition-colors">
            <Scale size={18} aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="leading-tight font-bold tracking-tight text-navy">Nyaya</span>
            <span className="font-sans text-[10px] font-medium tracking-wide text-ink/60">
              {t('nav.tagline', 'Indian Law, Explained Clearly.')}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-3.5 xl:gap-5 lg:flex h-full">
          {LINKS.map((link) => {
            const active = isLinkActive(link.to, location.pathname)
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={`text-[13px] transition-colors py-1 relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy rounded-xs ${
                  active
                    ? 'text-navy font-semibold after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-maroon'
                    : 'text-ink/70 hover:text-navy font-medium'
                }`}
              >
                {t(link.navKey, link.label)}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions: Search + Saved + Language Switcher */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            to="/search"
            aria-label={t('nav.legalSearch', 'Search Legal Database')}
            className={`flex items-center gap-2 h-9 px-3 rounded-xs border transition-colors text-xs font-medium ${
              location.pathname === '/search'
                ? 'border-navy text-navy bg-navy/5 font-semibold'
                : 'border-border text-navy/75 hover:border-navy hover:text-navy bg-page/60'
            }`}
          >
            <Search size={14} />
            <span className="hidden xl:inline">{t('nav.legalSearch', 'Legal Search')}</span>
            <kbd className="font-mono text-[10px] text-ink/45 bg-paper px-1 rounded-xs border border-border/80 shadow-2xs">
              /
            </kbd>
          </Link>

          {/* Saved Bookmarks Button */}
          <Link
            to="/saved"
            aria-label={t('nav.saved', 'Saved Legal Content')}
            title={t('nav.saved', 'Saved Legal Content')}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-xs border transition-colors text-xs font-medium ${
              location.pathname.startsWith('/saved') || location.pathname.startsWith('/bookmarks')
                ? 'border-navy text-navy bg-navy/5 font-semibold'
                : 'border-border text-navy/75 hover:border-navy hover:text-navy bg-page/60'
            }`}
          >
            <Bookmark
              size={14}
              className={count > 0 ? 'fill-maroon text-maroon' : 'text-current'}
              aria-hidden="true"
            />
            <span>{t('nav.saved', 'Saved')}</span>
            {count > 0 && (
              <span className="font-mono text-[10px] text-white bg-navy px-1.5 py-0.2 rounded-full font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Accessible Language Switcher */}
          <LanguageSwitcher showIcon={true} />
        </div>

        {/* Mobile controls: saved icon + language switcher + toggle button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/saved"
            aria-label={`${t('nav.saved', 'Saved')} (${count})`}
            className={`relative flex h-9 w-9 items-center justify-center rounded-sm border transition-colors ${
              location.pathname.startsWith('/saved') || location.pathname.startsWith('/bookmarks')
                ? 'border-navy bg-navy/5 text-navy'
                : 'border-border text-navy/75 hover:border-brass'
            }`}
          >
            <Bookmark
              size={16}
              className={count > 0 ? 'fill-brass-dark text-brass-dark' : 'text-current'}
              aria-hidden="true"
            />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-navy text-[9px] font-bold text-white font-mono shadow-2xs">
                {count}
              </span>
            )}
          </Link>
          <LanguageSwitcher size="sm" />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu', 'Close navigation menu') : t('nav.openMenu', 'Open navigation menu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {open && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-16 z-40 bg-navy/40 backdrop-blur-xs lg:hidden animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <nav
            id="mobile-menu"
            aria-label="Primary Mobile Navigation"
            className="fixed top-16 left-0 right-0 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-paper shadow-lg lg:hidden"
          >
            <div className="container-content flex flex-col gap-1 py-4">
              {/* Quick Search Shortcut */}
              <Link
                to="/search"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between min-h-[44px] rounded-sm px-3.5 py-2 text-sm font-medium border border-border/80 mb-1 transition-colors ${
                  location.pathname === '/search'
                    ? 'bg-navy/10 text-navy font-semibold border-navy'
                    : 'bg-page/60 text-navy hover:bg-page'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Search size={16} className="text-brass-dark" />
                  <span>{t('nav.searchPrompt', 'Search Indian Laws & Terms')}</span>
                </div>
                <ArrowRight size={14} className="text-ink/40" />
              </Link>

              {/* Quick Saved Bookmarks Shortcut */}
              <Link
                to="/saved"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between min-h-[44px] rounded-sm px-3.5 py-2 text-sm font-medium border border-border/80 mb-2 transition-colors ${
                  location.pathname.startsWith('/saved') || location.pathname.startsWith('/bookmarks')
                    ? 'bg-navy/10 text-navy font-semibold border-navy'
                    : 'bg-page/60 text-navy hover:bg-page'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark
                    size={16}
                    className={count > 0 ? 'fill-brass-dark text-brass-dark' : 'text-brass-dark'}
                  />
                  <span>{t('nav.saved', 'Saved Legal Content')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {count > 0 && (
                    <span className="font-mono text-xs font-bold text-navy bg-navy/10 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                  <ArrowRight size={14} className="text-ink/40" />
                </div>
              </Link>

              {LINKS.map((link) => {
                const active = isLinkActive(link.to, location.pathname)
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between min-h-[44px] rounded-sm px-3.5 py-2.5 text-sm transition-colors ${
                      active
                        ? 'bg-navy/8 text-navy font-semibold border-l-3 border-navy pl-3'
                        : 'text-ink/75 hover:bg-navy/5 hover:text-navy pl-3.5'
                    }`}
                  >
                    <span>{t(link.navKey, link.label)}</span>
                    {active && (
                      <span className="font-mono text-[10px] uppercase font-bold text-navy bg-navy/10 px-1.5 py-0.5 rounded-xs">
                        {t('nav.currentBadge', 'Current')}
                      </span>
                    )}
                  </Link>
                )
              })}

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between px-2">
                <span className="text-xs text-ink/60 font-medium">
                  {t('nav.switchLanguage', 'Language / भाषा')}:
                </span>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
