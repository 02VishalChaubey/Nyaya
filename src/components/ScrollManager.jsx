import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Robust Scroll Position and Hash Anchor Manager
 * - Resets window scroll to top (0, 0) on route pathname change (if no hash)
 * - Retries hash anchor scrolling for dynamically rendered statutory sections & articles
 */
export default function ScrollManager() {
  const location = useLocation()
  const prevPathname = useRef(location.pathname)

  useEffect(() => {
    const rawHash = location.hash ? location.hash.replace(/^#/, '') : ''

    if (!rawHash) {
      // If pathname actually changed and no hash is targeted, scroll to top
      if (prevPathname.current !== location.pathname) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      prevPathname.current = location.pathname
      return
    }

    prevPathname.current = location.pathname

    // Attempt to locate target element with intelligent fallbacks
    const cleanNum = rawHash.replace(/[^0-9A-Za-z]/g, '')
    const selectors = [
      rawHash,
      `sec-${cleanNum}`,
      `section-${cleanNum}`,
      `article-${cleanNum}`,
      `art-${cleanNum}`,
      `letter-${rawHash.toUpperCase()}`,
      `letter-${rawHash.toLowerCase()}`,
    ]

    let found = false

    const tryScroll = () => {
      if (found) return true

      for (const id of selectors) {
        const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          found = true
          return true
        }
      }
      return false
    }

    // Attempt immediate scroll
    if (tryScroll()) return

    // Staggered retries for asynchronous content (e.g. Bare Act chapters or Gazette sections)
    const timer1 = setTimeout(tryScroll, 60)
    const timer2 = setTimeout(tryScroll, 180)
    const timer3 = setTimeout(tryScroll, 400)
    const timer4 = setTimeout(tryScroll, 800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [location.pathname, location.hash])

  return null
}
