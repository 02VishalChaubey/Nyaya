import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Home as HomeIcon } from 'lucide-react'
import { useBreadcrumbContext } from '../context/BreadcrumbContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { laws } from '../data/laws.js'
import { legalTerms } from '../data/legalTerms.js'

/**
 * Clean short label resolver for laws
 */
function getLawShortLabel(lawId) {
  if (!lawId) return 'Law'
  const id = lawId.toLowerCase()
  if (id === 'bns-2023' || id === 'bns') return 'BNS'
  if (id === 'bnss-2023' || id === 'bnss') return 'BNSS'
  if (id === 'constitution-of-india') return 'Constitution'
  if (id === 'consumer-protection-2019') return 'Consumer Protection Act'
  if (id === 'it-act-2000') return 'IT Act'
  if (id === 'hindu-marriage-1955') return 'Hindu Marriage Act'
  if (id === 'industrial-disputes-1947') return 'Industrial Disputes Act'
  if (id === 'transfer-of-property-1882') return 'Transfer of Property Act'
  if (id === 'indian-contract-1872') return 'Indian Contract Act'

  const found = laws.find((l) => l.id === lawId)
  if (found) {
    if (found.shortTitle) return found.shortTitle
    // Strip trailing year and parenthesis if long
    return found.name.split(',')[0].replace(/\(.*?\)/g, '').trim()
  }
  return lawId.toUpperCase()
}

/**
 * Format section string cleanly (e.g. "sec-103" -> "Section 103")
 */
function formatSectionLabel(sec) {
  if (!sec) return ''
  const clean = sec.toString().replace(/^(section-|sec-)/i, '').replace(/[^0-9A-Za-z]/g, '')
  return clean ? `Section ${clean}` : 'Section'
}

/**
 * Format article string cleanly (e.g. "article-14" -> "Article 14")
 */
function formatArticleLabel(art) {
  if (!art) return ''
  const str = art.toString().toLowerCase()
  if (str.includes('14')) return 'Article 14'
  if (str.includes('19')) return 'Article 19'
  if (str.includes('21a') || str.includes('21-a')) return 'Article 21A'
  if (str.includes('21')) return 'Article 21'
  if (str.includes('32')) return 'Article 32'
  if (str.includes('equality')) return 'Right to Equality'
  if (str.includes('freedom')) return 'Right to Freedom'
  if (str.includes('exploitation')) return 'Right against Exploitation'
  if (str.includes('religion')) return 'Right to Freedom of Religion'
  if (str.includes('cultural')) return 'Cultural & Educational Rights'
  if (str.includes('remed')) return 'Constitutional Remedies'
  
  const cleanNum = str.replace(/[^0-9a-z]/g, '').replace('article', '').replace('art', '')
  return cleanNum ? `Article ${cleanNum.toUpperCase()}` : 'Article'
}

/**
 * Format legal term string cleanly (e.g. "bail" -> "Bail")
 */
function formatTermLabel(termId) {
  if (!termId) return ''
  const cleanId = termId.replace(/^#/, '').toLowerCase().trim()
  const found = legalTerms.find((t) => t.id === cleanId)
  if (found) return found.term
  // Capitalize hyphenated words
  return cleanId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function Breadcrumbs() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isHindi } = useLanguage()
  const { customCrumbs, activeArticle, activeSection, activeTerm } = useBreadcrumbContext()

  const pathname = location.pathname
  const hash = location.hash ? location.hash.replace(/^#/, '') : ''

  // Never display breadcrumbs on home landing page
  if (pathname === '/') {
    return null
  }

  // Back navigation handler: smart browser history back with route fallback
  const handleBack = () => {
    // If browser has history inside this session, use history.back()
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
      return
    }

    // Otherwise fallback to parent route based on current path
    if (pathname.startsWith('/laws/')) {
      navigate('/laws')
    } else if (pathname.startsWith('/harmed/result') || pathname.startsWith('/what-happened/result')) {
      navigate('/harmed')
    } else if (pathname === '/fundamental-rights') {
      navigate('/')
    } else {
      navigate('/')
    }
  }

  // 1. If page explicitly defined custom crumbs, use them
  let crumbs = []

  if (customCrumbs && Array.isArray(customCrumbs) && customCrumbs.length > 0) {
    crumbs = customCrumbs
  } else {
    // 2. Automatic route & hash resolution
    const homeCrumb = { label: isHindi ? 'मुख्य पृष्ठ' : 'Home', to: '/' }

    if (pathname === '/know-your-rights' || pathname === '/rights-hub' || pathname === '/rights') {
      // Home / Know Your Rights
      crumbs = [homeCrumb, { label: 'Know Your Rights' }]
    } else if (pathname === '/fundamental-rights') {
      // Home / Constitution / Fundamental Rights [/ Article X]
      const resolvedArticle = activeArticle || (hash ? formatArticleLabel(hash) : null)
      crumbs = [
        homeCrumb,
        { label: 'Constitution', to: '/fundamental-rights' },
        resolvedArticle
          ? { label: 'Fundamental Rights', to: '/fundamental-rights' }
          : { label: 'Fundamental Rights' },
      ]
      if (resolvedArticle) {
        crumbs.push({ label: resolvedArticle })
      }
    } else if (pathname === '/laws' || pathname === '/laws/') {
      // Home / Laws
      crumbs = [homeCrumb, { label: 'Laws' }]
    } else if (pathname === '/bns' || pathname === '/laws/bns-2023') {
      // Home / Laws / BNS [/ Section X]
      const resolvedSec = activeSection || (hash ? formatSectionLabel(hash) : null)
      crumbs = [
        homeCrumb,
        { label: 'Laws', to: '/laws' },
        resolvedSec
          ? { label: 'BNS', to: '/laws/bns-2023' }
          : { label: 'BNS' },
      ]
      if (resolvedSec) {
        crumbs.push({ label: resolvedSec })
      }
    } else if (pathname === '/bnss' || pathname === '/laws/bnss-2023') {
      // Home / Laws / BNSS [/ Section X]
      const resolvedSec = activeSection || (hash ? formatSectionLabel(hash) : null)
      crumbs = [
        homeCrumb,
        { label: 'Laws', to: '/laws' },
        resolvedSec
          ? { label: 'BNSS', to: '/laws/bnss-2023' }
          : { label: 'BNSS' },
      ]
      if (resolvedSec) {
        crumbs.push({ label: resolvedSec })
      }
    } else if (pathname.startsWith('/laws/')) {
      // Home / Laws / [Law Name] [/ Section X]
      const lawId = pathname.replace('/laws/', '').split('/')[0]
      const shortTitle = getLawShortLabel(lawId)
      const resolvedSec = activeSection || (hash ? formatSectionLabel(hash) : null)
      crumbs = [
        homeCrumb,
        { label: 'Laws', to: '/laws' },
        resolvedSec
          ? { label: shortTitle, to: `/laws/${lawId}` }
          : { label: shortTitle },
      ]
      if (resolvedSec) {
        crumbs.push({ label: resolvedSec })
      }
    } else if (pathname === '/legal-terms') {
      // Home / Legal Terms [/ Bail]
      const resolvedTerm = activeTerm || (hash ? formatTermLabel(hash) : null)
      crumbs = [
        homeCrumb,
        resolvedTerm
          ? { label: 'Legal Terms', to: '/legal-terms' }
          : { label: 'Legal Terms' },
      ]
      if (resolvedTerm) {
        crumbs.push({ label: resolvedTerm })
      }
    } else if (pathname === '/compare' || pathname === '/compare-laws') {
      // Home / Compare Laws
      crumbs = [
        homeCrumb,
        { label: 'Laws', to: '/laws' },
        { label: 'Compare Laws' },
      ]
    } else if (pathname === '/harmed' || pathname === '/what-happened') {
      // Home / What Happened?
      crumbs = [homeCrumb, { label: 'What Happened?' }]
    } else if (pathname === '/harmed/result' || pathname === '/what-happened/result') {
      // Home / What Happened? / Assessment Result
      crumbs = [
        homeCrumb,
        { label: 'What Happened?', to: '/harmed' },
        { label: 'Assessment Result' },
      ]
    } else if (pathname === '/search') {
      // Home / Search
      crumbs = [homeCrumb, { label: 'Legal Search' }]
    } else if (pathname === '/saved' || pathname === '/bookmarks') {
      crumbs = [homeCrumb, { label: isHindi ? 'सहेजे गए संसाधन' : 'Saved Legal Content' }]
    } else if (pathname === '/tools' || pathname === '/legal-tools') {
      crumbs = [homeCrumb, { label: isHindi ? 'कानूनी उपकरण' : 'Legal Tools' }]
    } else if (pathname === '/workflow' || pathname === '/ai-workflow' || pathname === '/information-workflow' || pathname === '/ask') {
      crumbs = [homeCrumb, { label: isHindi ? 'एआई सूचना कार्यप्रवाह' : 'AI Legal Workflow' }]
    } else if (pathname === '/sources-methodology') {
      // Home / Methodology & Sources
      crumbs = [homeCrumb, { label: 'Methodology & Sources' }]
    } else if (pathname === '/about') {
      // Home / About Nyaya
      crumbs = [homeCrumb, { label: 'About Nyaya' }]
    } else if (pathname === '/how-nyaya-works') {
      crumbs = [homeCrumb, { label: 'How Nyaya Works' }]
    } else if (pathname === '/case-law' || pathname === '/cases') {
      crumbs = [homeCrumb, { label: 'Case Law' }]
    } else if (pathname === '/disclaimer') {
      crumbs = [homeCrumb, { label: 'Disclaimer' }]
    } else if (pathname === '/privacy') {
      crumbs = [homeCrumb, { label: 'Privacy' }]
    } else if (pathname === '/terms') {
      crumbs = [homeCrumb, { label: 'Terms' }]
    } else if (pathname === '/accessibility') {
      crumbs = [homeCrumb, { label: 'Accessibility' }]
    } else {
      // Generic fallback
      const segments = pathname.split('/').filter(Boolean)
      crumbs = [homeCrumb]
      let currentPath = ''
      segments.forEach((seg, idx) => {
        currentPath += `/${seg}`
        const isLast = idx === segments.length - 1
        const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')
        crumbs.push(isLast ? { label } : { label, to: currentPath })
      })
    }
  }

  if (!crumbs || crumbs.length <= 1) {
    return null
  }

  return (
    <div className="border-b border-border/80 bg-[#FAF8F5]/90 backdrop-blur-xs text-xs text-ink/75">
      <div className="container-content flex items-center justify-between gap-4 py-2.5">
        {/* Semantic Accessible Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="min-w-0 flex-1 overflow-x-auto scrollbar-none py-0.5"
        >
          <ol
            className="flex items-center flex-nowrap whitespace-nowrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1
              const isFirst = index === 0

              return (
                <li
                  key={`${crumb.label}-${index}`}
                  className="inline-flex items-center"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {index > 0 && (
                    <span
                      className="mx-2 select-none font-mono text-ink/35 text-[11px]"
                      aria-hidden="true"
                    >
                      /
                    </span>
                  )}

                  {isLast ? (
                    <span
                      aria-current="page"
                      itemProp="name"
                      className="font-semibold text-navy truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                      title={crumb.label}
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.to || '/'}
                      itemProp="item"
                      className="inline-flex items-center gap-1 text-ink/65 hover:text-navy hover:underline transition-colors focus:outline-hidden focus:ring-1 focus:ring-brass rounded-xs px-0.5"
                    >
                      {isFirst && (
                        <HomeIcon
                          size={12}
                          className="text-brass-dark shrink-0 -mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  )}

                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Universal Contextual Back Navigation */}
        <div className="shrink-0 flex items-center pl-2 border-l border-border/70">
          <button
            type="button"
            onClick={handleBack}
            aria-label={isHindi ? 'पिछले पृष्ठ पर वापस जाएं' : 'Navigate back to previous page'}
            className="inline-flex items-center gap-1 rounded-xs px-2 py-1 text-[11px] font-medium text-ink/70 hover:text-navy hover:bg-black/5 transition-colors focus:outline-hidden focus:ring-1 focus:ring-brass"
          >
            <ArrowLeft size={12} className="text-navy/70" aria-hidden="true" />
            <span className="hidden sm:inline">{isHindi ? 'पीछे जाएं' : 'Back'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
