import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { laws } from '../data/laws.js'
import { legalTerms } from '../data/legalTerms.js'
import { bnsCoreSections } from '../data/bnsDetailedNotes.js'

/**
 * Institutional Page Title Manager for Nyaya
 * Dynamically updates document.title based on route, bare act section, and legal concept.
 */
export default function PageTitleManager() {
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    const hash = location.hash ? location.hash.replace(/^#/, '').toLowerCase() : ''

    let pageTitle = 'Nyaya — Indian Law, Explained Clearly.'

    if (pathname === '/') {
      pageTitle = 'Nyaya — Indian Law, Explained Clearly.'
    } else if (pathname === '/know-your-rights' || pathname === '/rights-hub' || pathname === '/rights') {
      pageTitle = 'Know Your Rights: Citizen Legal Reference Guide | Nyaya'
    } else if (pathname === '/fundamental-rights') {
      if (hash.includes('14') || hash.includes('art-14')) {
        pageTitle = 'Article 14: Equality Before Law — Fundamental Rights | Nyaya'
      } else if (hash.includes('19')) {
        pageTitle = 'Article 19: Protection of Six Freedoms — Fundamental Rights | Nyaya'
      } else if (hash.includes('21a') || hash.includes('21-a')) {
        pageTitle = 'Article 21A: Right to Education — Fundamental Rights | Nyaya'
      } else if (hash.includes('21')) {
        pageTitle = 'Article 21: Protection of Life & Personal Liberty — Fundamental Rights | Nyaya'
      } else if (hash.includes('32')) {
        pageTitle = 'Article 32: Constitutional Remedies & Writs — Fundamental Rights | Nyaya'
      } else if (hash.includes('equality')) {
        pageTitle = 'Right to Equality (Articles 14–18) — Fundamental Rights | Nyaya'
      } else if (hash.includes('freedom')) {
        pageTitle = 'Right to Freedom (Articles 19–22) — Fundamental Rights | Nyaya'
      } else if (hash.includes('remedies')) {
        pageTitle = 'Constitutional Remedies & Writs — Fundamental Rights | Nyaya'
      } else {
        pageTitle = 'Fundamental Rights (Part III) — Constitution of India | Nyaya'
      }
    } else if (pathname === '/bns' || pathname === '/laws/bns-2023') {
      const secNum = hash.replace(/[^0-9]/g, '')
      if (secNum) {
        const found = bnsCoreSections.find((s) => s.section.includes(secNum))
        const secTitle = found ? found.title : 'Statutory Section'
        pageTitle = `Section ${secNum}: ${secTitle} — BNS 2023 | Nyaya`
      } else {
        pageTitle = 'Bharatiya Nyaya Sanhita (BNS 2023) | Nyaya'
      }
    } else if (pathname === '/bnss' || pathname === '/laws/bnss-2023') {
      const secNum = hash.replace(/[^0-9]/g, '')
      if (secNum) {
        pageTitle = `Section ${secNum} — BNSS 2023 | Nyaya`
      } else {
        pageTitle = 'Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) | Nyaya'
      }
    } else if (pathname.startsWith('/laws/')) {
      const lawId = pathname.replace('/laws/', '').split('/')[0]
      const foundLaw = laws.find((l) => l.id === lawId)
      const lawName = foundLaw ? foundLaw.name : 'Bare Act'
      pageTitle = `${lawName} | Nyaya`
    } else if (pathname === '/laws' || pathname === '/laws/') {
      pageTitle = 'Explore Indian Laws & Central Statutes | Nyaya'
    } else if (pathname === '/legal-terms') {
      if (hash) {
        const term = legalTerms.find((t) => t.id === hash)
        if (term) {
          pageTitle = `${term.term}: Legal Definition & Statutory Basis | Nyaya`
        } else {
          const formatted = hash.charAt(0).toUpperCase() + hash.slice(1)
          pageTitle = `${formatted} — Legal Terms | Nyaya`
        }
      } else {
        pageTitle = 'Legal Lexicon & Defined Terms | Nyaya'
      }
    } else if (pathname === '/compare' || pathname === '/compare-laws') {
      pageTitle = 'IPC to BNS Statutory Concordance & Comparison | Nyaya'
    } else if (pathname === '/harmed' || pathname === '/what-happened') {
      pageTitle = 'What Happened? Citizen Legal Guidance & Next Steps | Nyaya'
    } else if (pathname === '/harmed/result' || pathname === '/what-happened/result') {
      pageTitle = 'Legal Rights Assessment & Action Protocol | Nyaya'
    } else if (pathname === '/search') {
      pageTitle = 'Legal Database Search | Nyaya'
    } else if (pathname === '/saved' || pathname === '/bookmarks') {
      pageTitle = 'Saved Legal Resources & Bookmarks | Nyaya'
    } else if (pathname === '/tools' || pathname === '/legal-tools') {
      pageTitle = 'Citizen Legal Tools & Fact Preparation Aids | Nyaya'
    } else if (pathname === '/workflow' || pathname === '/ai-workflow' || pathname === '/information-workflow' || pathname === '/ask') {
      pageTitle = 'Controlled AI Legal Information Workflow | Nyaya'
    } else if (pathname === '/sources-methodology') {
      pageTitle = 'Verification Methodology & Primary Sources | Nyaya'
    } else if (pathname === '/about') {
      pageTitle = 'About Nyaya — Indian Law, Explained Clearly.'
    } else if (pathname === '/how-nyaya-works') {
      pageTitle = 'How Nyaya Works: Editorial Standards & Architecture | Nyaya'
    } else if (pathname === '/case-law' || pathname === '/cases') {
      pageTitle = 'Constitutional Case Law & Landmark Precedents | Nyaya'
    } else if (pathname === '/constitution') {
      pageTitle = 'Constitution of India (Part III: Fundamental Rights) | Nyaya'
    } else if (pathname === '/disclaimer') {
      pageTitle = 'Legal Disclaimer & Non-Advocate Notice | Nyaya'
    } else if (pathname === '/privacy') {
      pageTitle = 'Privacy Policy & Data Minimization | Nyaya'
    } else if (pathname === '/terms') {
      pageTitle = 'Terms of Use | Nyaya'
    } else if (pathname === '/accessibility') {
      pageTitle = 'Accessibility Statement & WCAG Standards | Nyaya'
    } else {
      pageTitle = 'Page Not Found — 404 | Nyaya'
    }

    document.title = pageTitle
  }, [location.pathname, location.hash])

  return null
}
